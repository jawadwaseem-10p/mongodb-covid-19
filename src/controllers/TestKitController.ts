import TestKitModel from '@entities/TestKits';
import {Request, Response} from 'express';
import { randomUUID } from 'crypto';


export const addTestKits = async (req: Request, res: Response) => {
    const {testKitsCount} = req.body;
    const testKits = [];
    if(testKitsCount) {
        for(let i=0; i<testKitsCount; i++) {
            testKits.push({serialNumber: randomUUID(), used: false})
        }
    }
    // logger.info(testKits);
   await TestKitModel.insertMany(testKits)
   res.json({status:200, message: 'TestKits added successfully'});

}

export const getTestKits = async (req: Request, res: Response) => {
    const testKits = await TestKitModel.find({});
    res.json({status:200, data: testKits});
}