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
exports.getpagination = exports.getTypePrdoduct = exports.getColumnsProducts = exports.getSubcategoria = exports.descargarExcel = exports.eliminarImage = exports.saveDataImg = exports.exponerImg = exports.listaDeImagenes = exports.upload = exports.subirImagenes = exports.editarProducto = exports.getProducto = exports.deleteProducto = exports.getAllIdentificador = exports.postKam = exports.postCliente = exports.postCategoria = exports.getIdentificadorCtg = exports.getKams = exports.getCliente = exports.getCategoria = exports.update = exports.saveProductos = exports.getSkusCat = exports.getProductoCat = exports.getSku = exports.getProductosExcel = exports.getProductos = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("multer"));
const conexion_1 = __importDefault(require("../db/conexion"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const server_1 = __importDefault(require("../models/server"));
const connection_1 = __importDefault(require("../db/connection"));
//import Productos from '../models/product_data'
// import { transporter } from './emailer';
/**
 * Libreria para generar Excel
 */
const exportService_js_1 = require("./exportService.js");
const getProductos = (req, res) => {
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
exports.getProductos = getProductos;
const getProductosExcel = (req, res) => {
    /**
     * Preparando excel
     */
    const workSheetColumnName = [
        "id",
        "sku",
        "estado",
        "nombre",
        "precio",
        "codigo sherpa",
        "material",
        "medidas",
        "peso_producto",
        "color-diseño-panton",
        "capacidad",
        "packing_venta",
        "medidas_ctn",
        "peso_ctn",
        "esteril",
        "formato",
        "codigo_cliente",
        "codigo_isp",
        "descripcion"
    ];
    const query = ` SELECT * FROM producto`;
    conexion_1.default.ejecutarQuery(query, [], (err, productos) => {
        if (err) {
            res.status(400).json({
                ok: false
            });
            return;
        }
        let fecha = new Date();
        const workSheetName = 'Productos';
        const filePath = path_1.default.join(__dirname, `../../outputFiles/productos-${fecha.getTime()}.xlsx`);
        const nombre = (filePath.slice(-28)).split('.');
        exportService_js_1.exportUsersToExcel(productos, workSheetColumnName, workSheetName, filePath);
        res.json({
            ok: true,
            archiExcel: nombre[0],
            productos
        });
    });
};
exports.getProductosExcel = getProductosExcel;
const getSku = (req, res) => {
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
    /**
     * Preparando excel
     */
    const workSheetColumnName = [
        "id",
        "sku",
        "estado",
        "nombre",
        "precio",
        "codigo sherpa",
        "material",
        "medidas",
        "peso_producto",
        "color-diseño-panton",
        "capacidad",
        "packing_venta",
        "medidas_ctn",
        "peso_ctn",
        "esteril",
        "formato",
        "codigo_cliente",
        "codigo_isp",
        "descripcion"
    ];
    let fecha = new Date();
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: `No se en resultados para la busqueda ${sku}`
            });
            return;
        }
        const workSheetName = 'Productos';
        const filePath = path_1.default.join(__dirname, `../../outputFiles/productos-${fecha.getTime()}.xlsx`);
        const nombre = (filePath.slice(-28)).split('.');
        exportService_js_1.exportUsersToExcel(producto, workSheetColumnName, workSheetName, filePath);
        res.json({
            ok: true,
            archiExcel: nombre[0],
            producto
        });
    });
};
exports.getSku = getSku;
const getProductoCat = (req, res) => {
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
exports.getProductoCat = getProductoCat;
const getSkusCat = (req, res) => {
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
exports.getSkusCat = getSkusCat;
const saveProductos = (req, res) => {
    const skus = req.body;
    let contador = 0;
    //let query = "INSERT INTO productos (sku, estado, nombre, id_categoria, precio, id_cliente, id_kam) VALUES ?";
    let query;
    let cadena;
    let cadenas = [];
    for (let i = 0; i < skus.length; i++) {
        contador++;
        cadena = `("${skus[i].sku}","${skus[i].estado}","${skus[i].nombre}",${skus[i].id_categoria},${skus[i].id_subcategoria},${skus[i].precio},${skus[i].id_cliente},${skus[i].id_kam},"${skus[i].codigo_sherpa}")`;
        cadenas.push(cadena);
    }
    query = ` INSERT INTO producto (sku, estado, nombre, id_categoria, id_subcategoria, precio, id_cliente, id_kam, codigo_sherpa) VALUES ${cadenas.toString()}`;
    console.log(query);
    console.log(skus);
    conexion_1.default.ejecutarQuery(query, [], (err, productos) => {
        if (err) {
            res.status(400).json({
                ok: false,
                mensaje: `No se pudo guardar el producto`
            });
            return;
        }
        res.json({
            ok: true,
            productos
        });
    });
};
exports.saveProductos = saveProductos;
const update = (req, res) => {
    let id = req.body.id;
    let sku = req.body.sku;
    let nombre = req.body.nombre;
    let cliente = req.body.cliente;
    let categoria = req.body.categoria;
    let subcategoria = req.body.subcategoria;
    let precio = req.body.precio;
    let kam = req.body.kam;
    let query = ` UPDATE producto SET sku="${sku}", nombre ="${nombre}", id_categoria ="${categoria}", id_subcategoria="${subcategoria}", precio ="${precio}", id_cliente ="${cliente}",id_kam ="${kam}" WHERE id ="${id}";`;
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        if (err) {
            res.json({
                ok: false,
                mensaje: `No se ha podido actualizar el producto con el ${sku}`
            });
            return;
        }
        res.json({
            ok: true,
            producto
        });
    });
};
exports.update = update;
const getCategoria = (req, res) => {
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
exports.getCategoria = getCategoria;
const getCliente = (req, res) => {
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
exports.getCliente = getCliente;
const getKams = (req, res) => {
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
exports.getKams = getKams;
const getIdentificadorCtg = (req, res) => {
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
exports.getIdentificadorCtg = getIdentificadorCtg;
const postCategoria = (req, res) => {
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
exports.postCategoria = postCategoria;
const postCliente = (req, res) => {
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
exports.postCliente = postCliente;
const postKam = (req, res) => {
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
exports.postKam = postKam;
const getAllIdentificador = (req, res) => {
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
exports.getAllIdentificador = getAllIdentificador;
const deleteProducto = (req, res) => {
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
exports.deleteProducto = deleteProducto;
const getProducto = (req, res) => {
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
exports.getProducto = getProducto;
const editarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { nombre, status, codigo_sherpa, subcategoria, precio, cliente, kam, material, medidas_producto, peso_producto, cdp, capacidad, packing_venta, medidas_ctn, peso_ctn, brandeado, formato_venta, codigo_isp, codigo_cliente, id, erp, short_description, adt_oro, adt_excel, progress, esteril } = req.body;
    const query = `UPDATE producto SET nombre="${nombre}",estado="${status}",codigo_sherpa="${codigo_sherpa}", id_subcategoria="${subcategoria}",precio="${precio}",id_cliente=${cliente},id_kam=${kam},material="${material}",medidas="${medidas_producto}", peso_producto="${peso_producto}", color_diseno_panton="${cdp}",capacidad="${capacidad}",packing_venta="${packing_venta}", medidas_ctn="${medidas_ctn}",peso_ctn="${peso_ctn}",brandeado="${brandeado}",formato="${formato_venta}",codigo_isp="${codigo_isp}",codigo_cliente="${codigo_cliente}",descripcion="${short_description}",erp="${erp}",adt_oro="${adt_oro}",adt_excel="${adt_excel}",progress="${progress}",esteril="${esteril}" WHERE id = ${id}`;
    // console.log(query);
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
});
exports.editarProducto = editarProducto;
const subirImagenes = (req, res) => {
    res.json({
        ok: true
    });
    exports.upload;
};
exports.subirImagenes = subirImagenes;
const storage = multer_2.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, `${file.originalname}`);
    }
});
exports.upload = multer_1.default({ storage: storage });
// upload.single('myfile');
const listaDeImagenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const query = `SELECT i.nombre, i.id FROM imagenes_sku i INNER JOIN producto p ON i.id_sku = p.id WHERE p.id=${id};`;
    console.log(query);
    let foto = {
        "id": "",
        "url": ""
    };
    let listaFotos = [];
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        console.log(producto);
        if (err) {
            res.status(400).json({
                ok: false,
                image: "no-image.jpg"
            });
            return;
        }
        res.json({
            ok: true,
            producto,
        });
    });
});
exports.listaDeImagenes = listaDeImagenes;
const exponerImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sku = req.params.sku;
    console.log(sku);
    const query = `SELECT i.nombre FROM imagenes_sku i INNER JOIN producto p ON i.id_sku = p.id WHERE i.nombre="${sku}";`;
    let foto = "";
    console.log(query);
    conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
        // console.log(producto[0].nombre); 
        if (err) {
            res.status(400).json({
                ok: false
            });
            return;
        }
        foto = path_1.default.join(__dirname, '../../uploads/', producto[0].nombre);
        res.sendFile(foto);
    });
});
exports.exponerImg = exponerImg;
const saveDataImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listaImagenes = req.body;
    let contador = 0;
    console.log(req.body);
    let query;
    let cadena;
    let cadenas = [];
    for (let i = 0; i < listaImagenes.length; i++) {
        contador++;
        cadena = `("${listaImagenes[i].nombre}","${listaImagenes[i].id_sku}")`;
        cadenas.push(cadena);
    }
    console.log(cadena);
    query = `INSERT INTO imagenes_sku (nombre,id_sku) VALUES  ${cadenas.toString()}`;
    //  return res.json(query);
    conexion_1.default.ejecutarQuery(query, [], (err, imagenes_sku) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: `ha ocurrido un error al intentar guardar`,
            });
        }
        res.json({
            ok: true,
            message: 'Registro exitoso',
        });
    });
});
exports.saveDataImg = saveDataImg;
const eliminarImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.params.id;
    let nombre = req.params.nombre;
    try {
        const pathImage = path_1.default.join(__dirname, '../../uploads/', nombre);
        console.log(pathImage);
        fs_1.default.unlinkSync(pathImage);
        const query = `DELETE FROM imagenes_sku WHERE id=${id}`;
        conexion_1.default.ejecutarQuery(query, [], (err, producto) => {
            if (err) {
                res.status(400).json({
                    ok: false
                });
                return;
            }
            res.json({
                ok: true,
                mensaje: "registro eliminado"
            });
        });
        //file removed
    }
    catch (err) {
        console.error(err);
        res.json({
            ok: false,
            mensaje: "ha ocurrido un error al eliminar el archivo"
        });
    }
});
exports.eliminarImage = eliminarImage;
const descargarExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const nombre = req.params.nombre;
    try {
        const url = path_1.default.join(__dirname, `../../outputFiles/${nombre}.xlsx`);
        res.sendFile(url);
    }
    catch (err) {
        res.json({
            ok: false,
            error: err
        });
    }
});
exports.descargarExcel = descargarExcel;
// export const sendEmail = async (req: Request, res: Response) => {
//     const email = req.body.email;
//     try {
//         await transporter.sendMail({
//         from: 'Desarrollo Emonk', // sender address
//         to: email, // list of receivers
//         subject: "Test Desarroll", // Subject line
//         text: "Hello world?", // plain text body
//         html: `
//             <h1>Emonk sktock</h1>
//             <p>Estimado cliente, nuestros registros alertaron que proximamente finalizara su stock para el producto Papel Yali 50 kilogramos</p>
//         `, // html body
//         });
//         res.json({
//             ok:true,
//             message:`se notificó correctamente por mail al usuario ${email}`
//         })
//     } catch (error) {
//         return res.status(400).json({ message: 'Something goes wrong!'});
//     }
// }
const getSubcategoria = (req, res) => {
    let id_categoria = req.params.categoria;
    const query = `SELECT s.nombre from subcategoria s INNER JOIN categoria ON s.id_categoria = categoria.id where categoria.id=${id_categoria};`;
    conexion_1.default.ejecutarQuery(query, [], (err, subcategoria) => {
        if (err) {
            res.status(400).json({
                ok: false,
                message: 'esa categoria no tiene subcategorias asociadas'
            });
            return;
        }
        res.json({
            ok: true,
            subcategoria
        });
    });
};
exports.getSubcategoria = getSubcategoria;
const getColumnsProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let limit = parseInt(req.params.size);
    let offset = parseInt(req.params.page);
    const paginate = exports.getpagination(limit, offset);
    console.log(paginate.limit, paginate.offset);
    const conexion = new server_1.default();
    conexion.dbConnect()
        .then(res => console.log(res));
    try {
        const [results, error] = yield connection_1.default.query(`SELECT COUNT(id) as total FROM producto`);
        //Para guardar el valor del total de registros de productos en un array
        let total_item;
        for (let t in results) {
            total_item = results[t];
        }
        let total_page = Math.ceil(total_item.total / paginate.limit);
        console.log(total_page);
        connection_1.default.query(`SELECT p.sku, p.nombre, p.estado, p.codigo_sherpa, p.id_kam, p.id_cliente, p.descripcion FROM producto p LIMIT ${paginate.limit} OFFSET ${paginate.offset}`)
            .then((productos) => __awaiter(void 0, void 0, void 0, function* () {
            let array_productos;
            //Guardamos los datos en un array para agregarle los campos de nombre de cliente y type
            for (let p in productos) {
                array_productos = productos[p];
            }
            connection_1.default.query(`SELECT * FROM cliente`)
                .then((clientes) => __awaiter(void 0, void 0, void 0, function* () {
                let array_clientes;
                //Guardamos todos los clientes en un array para navegar a travez del y poder identificarlo por el id
                for (let c in clientes) {
                    array_clientes = clientes[c];
                }
                //Agregamos los campos de nombre de cliente y el tipo a los datos de productos    
                for (let i = 0; i < array_productos.length; i++) {
                    let id_cliente = array_productos[i].id_cliente;
                    for (let j = 0; j < array_clientes.length; j++) {
                        if (array_clientes[j].id == id_cliente) {
                            array_productos[i].cliente = array_clientes[j].nombre;
                        }
                    }
                    let sku = array_productos[i].sku;
                    array_productos[i].tipo = exports.getTypePrdoduct(sku);
                }
                res.json({
                    ok: true,
                    total_item: total_item.total,
                    total_page: total_page,
                    next_page: paginate.next_page,
                    prev_page: paginate.prev_page,
                    array_productos
                });
            })).catch(err => {
                res.status(500).send({
                    ok: false,
                    message: err.message || 'No se pudo conectar al servidor'
                });
            });
        }))
            .catch(err => {
            res.status(500).send({
                ok: false,
                message: err.message || 'No se pudo conectar al servidor'
            });
        });
    }
    catch (err) {
        res.status(400).json({
            ok: false,
            message: 'no se logro acceder a los datos'
        });
    }
});
exports.getColumnsProducts = getColumnsProducts;
const getTypePrdoduct = (sku) => {
    let codigo = sku.substring(9);
    if (codigo === "000") {
        return "Configurable";
    }
    else {
        return "Simple";
    }
};
exports.getTypePrdoduct = getTypePrdoduct;
const getpagination = (size, page) => {
    const limit = size > 5 ? size : 5;
    const offset = page > 0 ? page - 1 : 0;
    const next_page = page == 0 ? 1 : page + 1;
    const prev_page = offset == 0 ? 0 : page - 1;
    return { limit, offset, next_page, prev_page };
};
exports.getpagination = getpagination;
//# sourceMappingURL=productos.js.map