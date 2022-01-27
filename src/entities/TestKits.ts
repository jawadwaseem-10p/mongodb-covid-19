import {Schema, model} from 'mongoose';

const TestKitSchema = new Schema({
    serialNumber: String,
    used: Boolean,
})

export default model('TestKit', TestKitSchema);