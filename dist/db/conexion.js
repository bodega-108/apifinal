"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_1 = __importDefault(require("mysql"));
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('Clases inicializa');
        this.cnn = mysql_1.default.createConnection({
            // host:'localhost',
            user: 'root',
            password: '',
            database: 'generador',
            port: 3306,
            // host:'18.231.16.7',
            // user:'eduardo',
            // password:'dini108',
            // database:'generador',
            // port:3306,
            // Produccion
            // host:'localhost',
            // user:'emonk',
            // password:'Desarrollo@emonk1',
            // database:'generador',
            // port:3306,
        });
        this.conectarDB();
    }
    conectarDB() {
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                console.log('ERROR EN LA CONEXION');
                return;
            }
            this.conectado = true;
            console.log('Database onilne');
        });
    }
    static ejecutarQuery(query, [], callback) {
        this.instance.cnn.query(query, [], (err, results, fields) => {
            if (err) {
                console.log('Error en Qury');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('el registro solicitado no existe');
            }
            else {
                callback(null, results);
            }
        });
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
}
exports.default = MySQL;
//# sourceMappingURL=conexion.js.map