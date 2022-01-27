import { Schema, model } from 'mongoose';

const PostivePatientsSchema = new Schema({
    personId: {
        type: Schema.Types.ObjectId,
        unique: true
    },
    districtId: {
        type:Schema.Types.ObjectId,
        ref: 'districts'
    },
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'cities'
    }
})

export default model('PostivePatients', PostivePatientsSchema);