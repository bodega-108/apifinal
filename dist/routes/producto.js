"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../constrollers/productos");
const productos_2 = require("../constrollers/productos");
const router = express_1.Router();
router.get('/skus/:categoria', productos_2.getSkusCat);
router.get('/', productos_2.getProductos);
router.get('/busquedad/:sku', productos_2.getSku);
router.get('/categoria/:categoria', productos_2.getProductoCat);
router.post('/save', productos_2.saveProductos);
router.post('/update', productos_2.update);
router.get('/ctg', productos_2.getCategoria);
router.get('/clientes', productos_2.getCliente);
router.get('/kams', productos_2.getKams);
router.get('/identificador/:id', productos_2.getIdentificadorCtg);
router.post('/save-categoria', productos_2.postCategoria);
router.post('/save-cliente', productos_2.postCliente);
router.post('/save-kams', productos_2.postKam);
router.get('/identificadores', productos_2.getAllIdentificador);
router.get('/eliminar/:id', productos_2.deleteProducto);
router.get('/producto/:id', productos_2.getProducto);
router.post('/editar', productos_2.upload.array('imagenes', 10), productos_2.editarProducto);
router.post('/subirimagenes', productos_2.subirImagenes, productos_2.upload.array('imagenes', 10));
router.get('/imagenes/:id', productos_2.listaDeImagenes);
router.get('/img/:sku', productos_2.exponerImg);
router.post('/save-img', productos_2.saveDataImg);
router.get('/delete/:id/:nombre', productos_2.eliminarImage);
router.get('/descargarExcel/:nombre', productos_2.descargarExcel);
router.get('/generarExcelTotal', productos_1.getProductosExcel);
exports.default = router;
//# sourceMappingURL=producto.js.map