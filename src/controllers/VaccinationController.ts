/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Request, Response } from 'express';
import PersonModel from '@entities/Person';
import VaccineModel from '@entities/Vaccine';
import { DistrictModel, CityModel, CountryModel } from '@entities/Addresses';
import logger from '@shared/Logger';


export const vaccinatePerson = async (req: Request, res: Response) => {
    const personId = req.params.personId;
    console.log('personId', req.params.personId)
    const { dosage, vaccine, date, nextVaccinationDate } = req.body

    const vaccineId = await VaccineModel.findOne({ name: vaccine }, { _id: 1 })

    if (!vaccineId) {
        res.json({ status: 404, message: 'vaccine not found' });
    }
    console.log('vaccineId', vaccineId);

    await PersonModel.updateOne({ cnic: personId },
        {
            $set: {
                fullyVaccinated: dosage == '2nd' ? true: false,
                partiallyVaccinated: dosage == '1st' ? true : false
            },
            $push:
            {
                vaccination:
                    { vId: vaccineId._id, dosage: dosage, date: date, nextVaccinationDate }
            }
        })

    res.json({ status: 200, message: 'person vaccinated successfully' });
}

export const vaccinateNewPerson = async (req: Request, res: Response) => {
    logger.info(JSON.stringify(req.body));
    const { name, gender, age, cnic, district, city, travellingHistory, vaccination } = req.body;
    const vaccineId = await VaccineModel.findOne({ name: vaccination.vaccine }, { _id: 1 });
    if (!vaccineId) {
        res.json({ status: 404, message: 'vaccine not found' });
    }
    let districtId = null;
    let cityId = null;
    if (district) {
        districtId = await DistrictModel.findOne({ name: district }, { _id: 1 });
    }
    if (city) {
        cityId = await CityModel.findOne({ name: city }, { _id: 1 });
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const arrivedFromCountries = travellingHistory?.map((th: any) => th.arrivedFrom)
    let countryIds
    // console.log(arrivedFromCountries);
    if (arrivedFromCountries && arrivedFromCountries.length > 0) {
        countryIds = await CountryModel.find({ name: { $in: arrivedFromCountries } }, { name: 1, _id: 1 })
        countryIds.forEach((country) => {
            travellingHistory.forEach((th: any) => {
                if (th.arrivedFrom == country.name) {
                    th.arrivedFrom = country._id;
                }
            })
        })
    }
    if(!vaccination) {
        res.json({status: 400, message: 'no vaccination data provided'})
    }



    const newPerson = new PersonModel({
        name: name,
        gender: gender,
        age: age,
        cnic: cnic,
        address: {
            districtId: districtId,
            cityId: cityId
        },
        vaccinatin: [],
        travellingHistory: travellingHistory
    })

    newPerson.vaccination.push({
        vId: vaccineId._id,
        dosage: vaccination.dosage,
        date: vaccination.date,
        nextVaccinationDate: vaccination.nextVaccinationDate
    })
    await newPerson.save();
    res.json({status: 200, message: 'New person vaccinated successfully' })
}

export const addNewVaccine = async (req: Request, res: Response) => {
    const {name, count} = req.body;
    if(!name) {
        res.json({status:400, message: 'Vaccine name not  provided'});
    }
    const newVaccine = new VaccineModel({
        name: name,
        count: count ? count: 100
    });
    await newVaccine.save();
    res.json({status: 200, message: 'New vaccine added'});
}

export const getAllVaccines = async (req: Request, res: Response) => {
    const vaccines = await VaccineModel.find({});
    res.json({status:200, data: vaccines});
}