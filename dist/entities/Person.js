"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const PersonSchema = new mongoose_1.Schema({
    cnic: String,
    name: String,
    age: Number,
    gender: ['Male', 'Female'],
    address: {
        districtId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Districts'
        },
        cityId: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Cities'
        }
    },
    tests: [
        {
            tkitId: {
                type: mongoose_1.Schema.Types.ObjectId, ref: 'Kits',
            },
            result: String,
            date: Date,
            status: ['InProgress', 'Complete']
        }
    ],
    infected: Boolean,
    fullyVaccinated: Boolean,
    vaccination: [{
            vId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Vaccines'
            },
            dosage: ['1st', '2nd'],
            date: Date,
            nextVaccinationDate: Date
        }],
    travellingHistory: [{
            arrivedFrom: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Countries'
            },
            arrivalDate: Date,
        }]
});
exports.default = (0, mongoose_1.model)('Person', PersonSchema);
