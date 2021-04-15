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
const express_1 = __importDefault(require("express"));
const producto_1 = __importDefault(require("../routes/producto"));
const cors_1 = __importDefault(require("cors"));
const connection_1 = __importDefault(require("../db/connection"));
const morgan_1 = __importDefault(require("morgan"));
const conexion_1 = __importDefault(require("../db/conexion"));
class Server {
    constructor() {
        this.apiPaths = {
            produtos: '/api/productos'
        };
        this.app = express_1.default();
        this.port = Number(process.env.PORT) || 3000;
        // this.dbConnect();
        this.conexion();
        //middlewares
        this.middlewares();
        //definir las rutas
        this.routes();
    }
    routes() {
        this.app.use(this.apiPaths.produtos, producto_1.default);
    }
    dbConnect() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('DATABASE ONLINE');
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    middlewares() {
        //CORS middleware
        this.app.use(cors_1.default());
        //LECTURA DEL BODY
        this.app.use(express_1.default.json());
        //METRICAS
        this.app.use(morgan_1.default('dev'));
        //PATH DE ARCHIVOS
        this.app.use(express_1.default.static('public'));
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
    conexion() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const mysql = new conexion_1.default();
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.default = Server;
//# sourceMappingURL=server.js.map