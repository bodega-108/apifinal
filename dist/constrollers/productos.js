"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.update = exports.saveProductos = exports.getProductoCat = exports.getSku = exports.getProductos = void 0;
const conexion_1 = __importDefault(require("../db/conexion"));
exports.getProductos = (req, res) => {
    const query = ` SELECT * FROM producto`;
    conexion_1.default.ejecutarQuery(query, [], (err, productos) => {
        if (err) {
            res.status(400).json({
                ok: false
            });
            return;
        }
        res.json({
            ok: true,
            productos
        });
    });
};
exports.getSku = (req, res) => {
    let sku = req.params.sku;
    let columna;
    let texto = /[a-zA-Z]/g;
    if (texto.test(sku)) {
        columna = 'nombre';
    }
    else {
        columna = 'sku';
    }
    const query = ` SELECT * FROM producto WHERE ${columna} LIKE "%${sku}%"`;
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: `No se en resultados para la busqueda ${sku}`
            });
            return;
        }
        res.json({
            ok: true,
            producto
        });
    });
};
exports.getProductoCat = (req, res) => {
    let id = req.params.categoria;
    //const query = ` SELECT p.nombre, p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.identificador_ctg=${id}`;
    const query = ` SELECT p.nombre, p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.id=${id}`;
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, productos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: `No se en resultados para la busqueda`
            });
            return;
        }
        res.json({
            ok: true,
            productos
        });
    });
};
exports.saveProductos = (req, res) => {
    const skus = req.body;
    let contador = 0;
    //let query = "INSERT INTO productos (sku, estado, nombre, id_categoria, precio, id_cliente, id_kam) VALUES ?";
    let query;
    let cadena;
    let cadenas = [];
    for (let i = 0; i < skus.length; i++) {
        contador++;
        cadena = `("${skus[i].sku}","${skus[i].estado}","${skus[i].nombre}",${skus[i].id_categoria},${skus[i].precio},${skus[i].id_cliente},${skus[i].id_kam})`;
        cadenas.push(cadena);
    }
    query = ` INSERT INTO producto (sku, estado, nombre, id_categoria, precio, id_cliente, id_kam) VALUES ${cadenas.toString()}`;
    console.log(query);
    console.log(skus);
    conexion_1.default.ejecutarQuery(query, [], (err, productos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: `No se en resultados para la busqueda`
            });
            return;
        }
        res.json({
            ok: true,
            productos
        });
    });
    // res.json({
    //             ok:true,
    //             skus
    //          });
};
exports.update = (req, res) => {
    let id = req.body.id;
    let sku = req.body.sku;
    let nombre = req.body.nombre;
    let cliente = req.body.cliente;
    let categoria = req.body.categoria;
    let precio = req.body.precio;
    let kam = req.body.kam;
    let query = ` UPDATE producto SET sku="${sku}", nombre ="${nombre}", id_categoria ="${categoria}", precio ="${precio}", id_cliente ="${cliente}",id_kam ="${kam}" WHERE id ="${id}";`;
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: `No se en resultados para la busqueda ${sku}`
            });
            return;
        }
        res.json({
            ok: true,
            producto
        });
    });
};
//# sourceMappingURL=productos.js.map