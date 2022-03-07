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
exports.descargarExcel = exports.eliminarImage = exports.saveDataImg = exports.exponerImg = exports.listaDeImagenes = exports.upload = exports.subirImagenes = exports.editarProducto = exports.getProducto = exports.deleteProducto = exports.getAllIdentificador = exports.postKam = exports.postCliente = exports.postCategoria = exports.getIdentificadorCtg = exports.getKams = exports.getCliente = exports.getCategoria = exports.update = exports.saveProductos = exports.getSkusCat = exports.getProductoCat = exports.getSku = exports.getProductosExcel = exports.getProductos = void 0;
const multer_1 = __importDefault(require("multer"));
const multer_2 = __importDefault(require("multer"));
const conexion_1 = __importDefault(require("../db/conexion"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
// import { transporter } from './emailer';
/**
 * Libreria para generar Excel
 */
const exportService_js_1 = require("./exportService.js");
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
exports.getProductosExcel = (req, res) => {
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
exports.editarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.body);
    const { nombre, status, codigo_sherpa, precio, cliente, kam, material, medidas_producto, peso_producto, cdp, capacidad, packing_venta, medidas_ctn, peso_ctn, brandeado, formato_venta, codigo_isp, codigo_cliente, id, erp, short_description, adt_oro, adt_excel, progress, esteril } = req.body;
    const query = `UPDATE producto SET nombre="${nombre}",estado="${status}",codigo_sherpa="${codigo_sherpa}",precio="${precio}",id_cliente=${cliente},id_kam=${kam},material="${material}",medidas="${medidas_producto}", peso_producto="${peso_producto}", color_diseno_panton="${cdp}",capacidad="${capacidad}",packing_venta="${packing_venta}", medidas_ctn="${medidas_ctn}",peso_ctn="${peso_ctn}",brandeado="${brandeado}",formato="${formato_venta}",codigo_isp="${codigo_isp}",codigo_cliente="${codigo_cliente}",descripcion="${short_description}",erp="${erp}",adt_oro="${adt_oro}",adt_excel="${adt_excel}",progress="${progress}",esteril="${esteril}" WHERE id = ${id}`;
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
exports.subirImagenes = (req, res) => {
    res.json({
        ok: true
    });
    exports.upload;
};
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
exports.listaDeImagenes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.exponerImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.saveDataImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.eliminarImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.descargarExcel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
//# sourceMappingURL=productos.js.map