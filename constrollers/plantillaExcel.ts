import { exportUsersToExcel } from './exportService'
import path from 'path';

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
]

const workSheetName = 'Users';
const filePath =path.join(__dirname,'../../outputFiles/excel-from-js.xlsx');

exportUsersToExcel(users, workSheetColumnName, workSheetName, filePath);