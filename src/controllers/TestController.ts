import logger from '@shared/Logger';
import { Request, Response } from 'express';
// import { DistrictModel, CityModel } from '@entities/Addresses';
import PersonModel from '@entities/Person';
import TestKits from '@entities/TestKits';
import PostivePatientsModel from '@entities/PostivePatients';

export const testPerson = async (req: Request, res: Response) => {

    logger.info(req.params.personId);
    //get one unused testkit from testKits
    // const unusedTestKit = 
    //get personId,
    const person = await PersonModel.findOne({ cnic: req.params.personId });
    if (!person) {
        res.json({ status: 204, message: 'Person not found' })
    }
    const testKit = await TestKits.findOne({ used: false });
    //UPDATE THE  PERSON NOW

    const { result, status, date } = req.body;
    const updateStatus = await PersonModel.updateOne({ cnic: req.params.personId }, {
        $push: {
            tests: { tkitId: testKit._id, result: result, status: status, date: new Date() }
        }
    });
    if (result === 'Positive') {
        // eslint-disable-next-line max-len
        await PostivePatientsModel.updateOne({ personId: person._id },
            {
                $set: {
                    personId: person._id, districtId: person.address.districtId,
                    cityId: person.address.cityId
                }
            },
            { upsert: true })

       await  PersonModel.updateOne({_id: person._id}, {$set:{infected: true}})
    }
    if (result === 'Negative') {
        await PostivePatientsModel.deleteOne({ personId: person._id });
    }
    logger.info(`updated status: ${JSON.stringify(updateStatus)}`);
    if (updateStatus.modifiedCount == 1) {
        //update the testkid used
        await TestKits.updateOne({ _id: testKit._id }, { $set: { used: true } })
    }
    res.json({ status: 200, message: 'Tested person' })

}