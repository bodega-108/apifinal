"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.editarProducto = exports.getProducto = exports.deleteProducto = exports.getAllIdentificador = exports.postKam = exports.postCliente = exports.postCategoria = exports.getIdentificadorCtg = exports.getKams = exports.getCliente = exports.getCategoria = exports.update = exports.saveProductos = exports.getSkusCat = exports.getProductoCat = exports.getSku = exports.getProductos = void 0;
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
            res.json({
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
exports.getSkusCat = (req, res) => {
    let id = req.params.categoria;
    //const query = ` SELECT p.nombre, p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.identificador_ctg=${id}`;
    const query = ` SELECT p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.id=${id}`;
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, productos) => {
        if (err) {
            res.json({
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
        cadena = `("${skus[i].sku}","${skus[i].estado}","${skus[i].nombre}",${skus[i].id_categoria},${skus[i].precio},${skus[i].id_cliente},${skus[i].id_kam},"${skus[i].codigo_sherpa}")`;
        cadenas.push(cadena);
    }
    query = ` INSERT INTO producto (sku, estado, nombre, id_categoria, precio, id_cliente, id_kam, codigo_sherpa) VALUES ${cadenas.toString()}`;
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
exports.getCategoria = (req, res) => {
    const query = `SELECT * FROM categoria;`;
    conexion_1.default.ejecutarQuery(query, [], (err, categoria) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: `No se en resultados para la busqueda`
            });
            return;
        }
        res.json({
            ok: true,
            categoria
        });
    });
};
exports.getCliente = (req, res) => {
    const query = `SELECT * FROM cliente`;
    conexion_1.default.ejecutarQuery(query, [], (err, clientes) => {
        if (err) {
            res.json({
                ok: false,
                message: "No se encontraron los resultados"
            });
            return;
        }
        res.json({
            ok: true,
            clientes
        });
    });
};
exports.getKams = (req, res) => {
    const query = `SELECT * FROM kam`;
    conexion_1.default.ejecutarQuery(query, [], (err, kams) => {
        if (err) {
            res.json({
                ok: false,
                message: "No se encontraron los resultados"
            });
            return;
        }
        res.json({
            ok: true,
            kams
        });
    });
};
exports.getIdentificadorCtg = (req, res) => {
    const id_ctg = req.params.id;
    const query = `SELECT identificador_ctg FROM categoria WHERE id="${id_ctg}"`;
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, identificador) => {
        if (err) {
            res.json({
                ok: false,
                message: "No se han encontrado registros"
            });
            return;
        }
        res.json({
            ok: true,
            identificador
        });
    });
};
exports.postCategoria = (req, res) => {
    const nombre = req.body.nombre;
    const identificador = req.body.identificadorCtg;
    const query = ` INSERT INTO categoria (nombre, identificador_ctg) VALUES ("${nombre}", ${identificador})`;
    conexion_1.default.ejecutarQuery(query, [], (err, categoria) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: `Ha ocurrido un error`
            });
            return;
        }
        res.json({
            ok: true,
            mensaje: "Registro existoso"
        });
    });
};
exports.postCliente = (req, res) => {
    const nombre = req.body.nombre;
    const id_kam = req.body.id_kam;
    const query = `INSERT INTO cliente(nombre, id_kam) VALUES("${nombre}",${id_kam})`;
    conexion_1.default.ejecutarQuery(query, [], (err, cliente) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: "Lo sentimos, ha ocurrido un erro"
            });
            return;
        }
        res.json({
            ok: true,
            mensaje: "Registro existoso"
        });
    });
};
exports.postKam = (req, res) => {
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const query = `INSERT INTO kam(nombre, apellido) VALUES("${nombre}","${apellido}")`;
    conexion_1.default.ejecutarQuery(query, [], (err, cliente) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: "Lo sentimos, ha ocurrido un erro"
            });
            return;
        }
        res.json({
            ok: true,
            mensaje: "Registro existoso"
        });
    });
};
exports.getAllIdentificador = (req, res) => {
    const query = `SELECT identificador_ctg FROM categoria`;
    conexion_1.default.ejecutarQuery(query, [], (err, identificadores) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: "Error al guardar"
            });
            return;
        }
        res.json({
            ok: true,
            identificadores
        });
    });
};
exports.deleteProducto = (req, res) => {
    let id = req.params.id;
    const query = `DELETE FROM producto WHERE id=${id}`;
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        if (err) {
            res.status(400).json({
                ok: false
            });
            return;
        }
        res.json({
            ok: true,
            producto
        });
    });
};
exports.getProducto = (req, res) => {
    let id = req.params.id;
    const query = `SELECT * FROM producto WHERE id=${id}`;
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        if (err) {
            res.status(400).json({
                ok: false
            });
            return;
        }
        res.json({
            ok: true,
            producto
        });
    });
};
exports.editarProducto = (req, res) => {
    console.log(req.body);
    const { nombre, status, codigo_sherpa, precio, cliente, kam, material, medidas_producto, peso_producto, cdp, capacidad, packing_venta, medidas_ctn, peso_ctn, brandeado, formato_venta, codigo_isp, codigo_cliente, id } = req.body;
    const query = `UPDATE producto SET nombre="${nombre}",estado="${status}",codigo_sherpa="${codigo_sherpa}",precio="${precio}",id_cliente=${cliente},id_kam=${kam},material="${material}",medidas="${medidas_producto}", peso_producto="${peso_producto}", color_diseno_panton="${cdp}",capacidad="${capacidad}",packing_venta="${packing_venta}", medidas_ctn="${medidas_ctn}",peso_ctn="${peso_ctn}",brandeado="${brandeado}",formato="${formato_venta}",codigo_isp="${codigo_isp}",codigo_cliente="${codigo_cliente}" WHERE id = ${id}`;
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        if (err) {
            res.status(400).json({
                ok: false
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