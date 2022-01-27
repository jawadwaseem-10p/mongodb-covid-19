import {Schema, model} from 'mongoose';
export const CountrySchema = new Schema({
    name: String,
})

export const CitySchema = new Schema({
    name:String,
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Countries'
    },
    population: Number,
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        }
    }
});

export const DistrictSchema = new Schema({
    name: String,
    population: Number,
    cityId: {
        type: Schema.Types.ObjectId,
        ref: 'Cities',
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
    
});

export const CountryModel = model('Countries', CountrySchema);

export const CityModel = model('Cities', CitySchema);

export const DistrictModel = model('Districts', DistrictSchema);