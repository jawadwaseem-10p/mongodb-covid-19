"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PersonController_1 = require("src/controllers/PersonController");
// import { getAllUsers, addOneUser, updateOneUser, deleteOneUser } from './Users';
// User-route
const personRouter = (0, express_1.Router)();
personRouter.get('/all', PersonController_1.getAllPerson);
personRouter.post('/', PersonController_1.savePerson);
// Export the base-router
const baseRouter = (0, express_1.Router)();
baseRouter.use('/person', personRouter);
exports.default = baseRouter;
