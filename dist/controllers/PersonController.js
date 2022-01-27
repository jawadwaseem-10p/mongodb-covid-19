"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.savePerson = exports.getAllPerson = void 0;
const Person_1 = __importDefault(require("@entities/Person"));
const Logger_1 = __importDefault(require("@shared/Logger"));
const getAllPerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const persons = yield Person_1.default.find();
    res.json({ status: 200, data: persons });
});
exports.getAllPerson = getAllPerson;
const savePerson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield Person_1.default.find();
    Logger_1.default.info(JSON.stringify(req.body));
    // const {name, gender, age, cnic} = req.body;
    const newPerson = new Person_1.default({
        name: 'Jawad',
        age: 30,
        gender: 'Male',
        cnic: '14301-1608019-5'
    });
    yield newPerson.save();
    res.send('saved user');
});
exports.savePerson = savePerson;
