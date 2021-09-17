"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exportService_1 = require("./exportService");
const path_1 = __importDefault(require("path"));
const users = [
    {
        id: 0,
        name: 'Peter',
        age: 31
    },
    {
        id: 1,
        name: 'John',
        age: 23
    }
];
const workSheetColumnName = [
    "ID",
    "Name",
    "Age"
];
const workSheetName = 'Users';
const filePath = path_1.default.join(__dirname, '../../outputFiles/excel-from-js.xlsx');
exportService_1.exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);
//# sourceMappingURL=plantillaExcel.js.map