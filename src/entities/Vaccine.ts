import {Schema, model} from 'mongoose';

const vaccineSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    count: Number
});

export default model('vaccines', vaccineSchema);