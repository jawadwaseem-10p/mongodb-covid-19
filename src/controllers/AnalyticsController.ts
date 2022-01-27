/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Request, Response } from 'express'
import PostivePatientsModel from '@entities/PostivePatients';

export const getMostEffectedCity = async (req: Request, res: Response) => {
    const mostEffectedCity = await PostivePatientsModel.aggregate([
        {
            $group: {
                _id: '$cityId',
                mostEffectedCity: {
                    $first: '$cityId'
                },
                count: { $sum: 1 }
            },

        },
        {
            $sort: {
                "count": -1
            }
        },
        { $limit: 1 },
        {
            $project: {
                mostEffectedCity: 1,
                totalPositiveCases: {
                    $max: "$count"
                }
            }
        },
        {
            $lookup: {
                from: 'cities',
                localField: 'mostEffectedCity',
                foreignField: '_id',
                as: 'city'
            }
        },
        { $unwind: '$city' }

    ]);
    res.json({ status: 200, data: mostEffectedCity });
}

export const getVaccinatedPeopleInfected = async (req: Request, res: Response) => {
    const vaccinatedPeopLeInfected = await PostivePatientsModel.aggregate([
        {
            $lookup: {
                from: 'people',
                localField: 'personId',
                foreignField: '_id',
                as: 'positivePatient'
            }
        }, {
            $unwind: '$positivePatient'
        },
        {
            $match: {
                'positivePatient.fullyVaccinated': true,
                'positivePatient.infected': true
            }
        }
    ]);
    res.json({ status: 200, data: vaccinatedPeopLeInfected });
}

export const countVaccinatedPeopleInfected = async (req: Request, res: Response) => {
    const countVaccinatedPeopleInfected = await PostivePatientsModel.aggregate([
        {
            $lookup: {
                from: 'people',
                localField: 'personId',
                foreignField: '_id',
                as: 'positivePatient'
            }
        },
        {
            $unwind: '$positivePatient'
        },
        {
            $match: {
                'positivePatient.fullyVaccinated': true,
                'positivePatient.infected': true
            }
        },
        {
            $count: "total_vaccinated_people_infected"
        }
    ]);
    res.json({ status: 200, data: countVaccinatedPeopleInfected })
}

export const countPartiallyVaccinatedPeople = async (req: Request, res: Response) => {
    const countVaccinatedPeopleInfected = await PostivePatientsModel.aggregate([
        {
            $lookup: {
                from: 'people',
                localField: 'personId',
                foreignField: '_id',
                as: 'positivePatient'
            }
        },
        {
            $unwind: '$positivePatient'
        },
        {
            $match: {
                'positivePatient.partiallyVaccinated': true,
                'positivePatient.infected': true
            }
        },
        {
            $count: "total_vaccinated_people_infected"
        }
    ]);
    res.json({ status: 200, data: countVaccinatedPeopleInfected })
}

export const getMostEffectedCityWithMostEffectedDistricts = async (req: Request, res: Response) => {
    const mostEffectedCityWithDistricts = await PostivePatientsModel.aggregate([
        {
            $group: {
                _id: '$cityId',
                mostEffectedCity: {
                    $first: '$cityId'
                },
                count: { $sum: 1 }
            },

        },
        {
            $sort: {
                "count": -1
            }
        },
        { $limit: 1 },
        {
            $project: {
                mostEffectedCity: 1,
                totalPositiveCases: {
                    $max: "$count"
                }
            }
        },
        {
            $lookup: {
                from: 'cities',
                localField: 'mostEffectedCity',
                foreignField: '_id',
                as: 'city'
            }
        },
        { $unwind: '$city' },
        {
            $lookup: {
                from: 'districts',
                localField: '_id',
                foreignField: 'cityId',
                as: 'districts'
            }
        },


    ]);
    const districtIds: any[] = []
    if (mostEffectedCityWithDistricts.length > 0) {
        mostEffectedCityWithDistricts.forEach((city: any) => {
            if (city.districts) {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-call
                city.districts.forEach((dis: any) => districtIds.push(dis._id));
            }
        });
    }
    if (districtIds.length > 0) {
        const mosteffectedDistricts = await PostivePatientsModel.aggregate([
            {
                $match: {
                    districtId: {
                        $in: districtIds
                    }
                }

            },
            {
                $group: {
                    _id: '$districtId',
                    totalPositiveCases: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'districts',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'district'
                }
            },
            { $unwind: '$district' },
            { $addFields: { districtName: '$district.name' } },
            {
                $project: {
                    totalPositiveCases: 1,
                    'districtName': 1
                }
            }


        ]);
        // eslint-disable-next-line max-len
        res.json({ status: 200, city: mostEffectedCityWithDistricts[0].city.name, districts: mosteffectedDistricts })
    }
    console.log('districtIds', districtIds);
    // res.json({ status: 200, data: mostEffectedCityWithDistricts })
}