/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { getAllPerson, savePerson } from 'src/controllers/PersonController';
import { addCountries, getAllCountries } from 'src/controllers/AddressController';
import { testPerson } from 'src/controllers/TestController';
import { addTestKits, getTestKits } from 'src/controllers/TestKitController';
// eslint-disable-next-line max-len
import { addNewVaccine, vaccinateNewPerson, vaccinatePerson, getAllVaccines } from 'src/controllers/VaccinationController';
// eslint-disable-next-line max-len
import {
    getMostEffectedCity, getVaccinatedPeopleInfected,
    countVaccinatedPeopleInfected, countPartiallyVaccinatedPeople,
    getMostEffectedCityWithMostEffectedDistricts
} from 'src/controllers/AnalyticsController';

// person-route
const personRouter = Router();
personRouter.get('/', getAllPerson);
personRouter.post('/', savePerson);
personRouter.post('/vaccinate/:personId', vaccinatePerson);
personRouter.post('/vaccinate', vaccinateNewPerson);



const countriesRouter = Router();
countriesRouter.get('/', getAllCountries);
// countriesRouter.post('/', addCountry);
countriesRouter.post('/multi', addCountries);


// const citiesRouter = Router();
// citiesRouter.get('/', getAllCities);
// citiesRouter.post('/', addCity);

// const districtRouter = Router();
// districtRouter.get('/', getAllDistrict);
// districtRouter.post('/', addDistrict);


//testRouter
const testRouter = Router();
testRouter.get('/');
testRouter.get('/:personId');
//test a person
testRouter.post('/:personId', testPerson);

//get tests by cityId & districtId
testRouter.get('/:cityId');
testRouter.get('/:districtId');
//-----------------------------------------------//
//testKitRouter//
const testKitRouter = Router();
testKitRouter.post('/', addTestKits);
testKitRouter.get('/', getTestKits)
//--------------------------------------------------//

//Vaccine Router
const vaccineRouter = Router();
vaccineRouter.post('/', addNewVaccine);
vaccineRouter.get('/', getAllVaccines);

//Analytics Router 
const analyticsRouter = Router();
analyticsRouter.get('/mosteffectedcity', getMostEffectedCity);
analyticsRouter.get('/vaccinatedpeopleinfected', getVaccinatedPeopleInfected);
analyticsRouter.get('/countVaccinatedPeopleInfected', countVaccinatedPeopleInfected);
analyticsRouter.get('/countPartiallyVaccinatedPeople', countPartiallyVaccinatedPeople);
analyticsRouter.get('/mostEffectedCityWithDistricts', getMostEffectedCityWithMostEffectedDistricts);
// analyticsRouter.get('/vaccinatedpeoplestats')
// Export the base-router
const baseRouter = Router();
baseRouter.use('/person', personRouter);
baseRouter.use('/countries', countriesRouter);
baseRouter.use('/test', testRouter);
baseRouter.use('/testkits', testKitRouter);
baseRouter.use('/vaccine', vaccineRouter);
baseRouter.use('/analytics', analyticsRouter);
export default baseRouter;
