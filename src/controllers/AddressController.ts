/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {Request, Response} from 'express'
import { CountryModel, CityModel, DistrictModel } from '@entities/Addresses'

//Countries
export const getAllCountries = async (req:Request, res: Response) => {
const countries = await CountryModel.find();
res.json({status:200, data: countries});
}

export const addCountry = async (req: Request, res: Response) => {
    const newCountry = new CountryModel({
        name: req.body.name
    });
    await newCountry.save();
    res.json({status:201, message: "country Added"});
}

export const addCountries = async(req: Request, res: Response) => {

    const countries = req.body.countries.map((cont: string) => {
        return {
            name: cont
        }
    });
    await CountryModel.insertMany(countries);
    res.json({status:201, message: 'Countries Added'})
}