"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistrictSchema = exports.CitySchema = exports.CountrySchema = void 0;
const mongoose_1 = require("mongoose");
exports.CountrySchema = new mongoose_1.Schema({
    name: String,
});
exports.CitySchema = new mongoose_1.Schema({
    name: String,
    country: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Countries'
    },
    population: Number,
});
exports.DistrictSchema = new mongoose_1.Schema({
    name: String,
    population: Number,
    cityId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Cities',
    },
});
