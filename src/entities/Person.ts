import { Schema, model } from 'mongoose';

 const PersonSchema = new Schema({
    cnic: {
        type: Number,
        unique: true,
        validate: {
            validator: function(val:number) {
                return val.toString().length === 13
            },
            message: () => `$cnic has to be 13 digits`
        }
    },
    name: String,
    age: Number,
    gender: { type: String, enum: ['Male', 'Female']},
    address: {
        districtId: {
            type: Schema.Types.ObjectId,
            ref: 'Districts',
            required: true,
        },
        cityId: {
            type: Schema.Types.ObjectId,
            ref: 'Cities',
            required: true
        }
    },
    tests: [
        {
            tkitId: {
                type: Schema.Types.ObjectId, ref: 'Kits',
            },

            result: String,
            date: Date,
            status: {
                type: String,
                enum: ['InProgress', 'Complete']
            } 
        }
    ],
    infected: {
        type: Boolean,
        default: false
    },
    fullyVaccinated: {
        type: Boolean,
        default: false
    },
    partiallyVaccinated: {
        type: Boolean,
        default: false
    },
    vaccination: [{
        vId: {
            type: Schema.Types.ObjectId,
            ref: 'Vaccines'
        },
        dosage: {
            type: String,
            enum: ['1st', '2nd']
        },
        date: Date,
        nextVaccinationDate: Date
    }],
    travellingHistory: [{
        arrivedFrom: {
            type: Schema.Types.ObjectId,
            ref: 'Countries'
        },
        arrivalDate: Date,
    }]
});
export default model('Person', PersonSchema);