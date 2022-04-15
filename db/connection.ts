import { Sequelize } from 'sequelize';

const db = new Sequelize('generador','root','',{
    host: 'localhost',
    dialect:'mysql',
    //logging:''
});


export default db;

