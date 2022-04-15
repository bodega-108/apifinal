"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sequelize = require('sequelize');
const connection_1 = __importDefault(require("../db/connection"));
const Producto = connection_1.default.define('Producto', {
    id: { type: Sequelize.INTEGER, primaryKey: true },
    nombre: { type: Sequelize.STRING },
    sku: { type: Sequelize.STRING },
    estado: { type: Sequelize.STRING },
    codigo_sherpa: { type: Sequelize.STRING },
    id_kam: { type: Sequelize.INTEGER },
    id_cliente: { type: Sequelize.INTEGER },
    descripcion: { type: Sequelize.STRING },
});
//como se llama el modelo en donde se vaya a usar 
/*  const productos = Productos.findAll({ attributes: ['nombre'] })
    .then(data => {
        const results = JSON.stringify(data);
        console.log(results);
    })
    .catch(err => {
        console.log(err);
    }) */
exports.default = Producto;
//# sourceMappingURL=product_data.js.map