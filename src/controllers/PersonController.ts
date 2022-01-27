/* eslint-disable @typescript-eslint/no-unsafe-call */
import {Request, Response} from 'express';
import  PersonModel  from '@entities/Person';
import { DistrictModel, CityModel, CountryModel } from '@entities/Addresses';
import logger from '@shared/Logger';
export const getAllPerson = async (req: Request, res: Response) => {
    const persons = await PersonModel.find();
    res.json({status:200, data: persons});
}
export const savePerson  = async(req: Request, res: Response) => {

    logger.info(JSON.stringify(req.body));
    const {name, gender, age, cnic, district, city, travellingHistory} = req.body;
    let districtId = null;
    let cityId = null;
    if(district) {
        const dist = await DistrictModel.findOne({name: district},{_id:1, cityId: 1});
        
        if(!dist) {
            res.json({status:404, message: 'district not found'})
        }
        districtId = dist._id;
        cityId =  dist.cityId;
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    const arrivedFromCountries = travellingHistory?.map((th: any) => th.arrivedFrom)
    let countryIds 
    // console.log(arrivedFromCountries);
    if(arrivedFromCountries && arrivedFromCountries.length > 0) {
     countryIds  = await CountryModel.find({name: {$in: arrivedFromCountries}},{name:1, _id:1})
     countryIds.forEach((country) => {
         travellingHistory.forEach((th:any) => {
             if(th.arrivedFrom == country.name) {
                 th.arrivedFrom = country._id;
             }
         })
     })
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
        travellingHistory: travellingHistory
    })
    await newPerson.save();
    res.send('saved user');
}