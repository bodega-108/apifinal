"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../constrollers/productos");
const router = express_1.Router();
router.get('/skus/:categoria', productos_1.getSkusCat);
router.get('/', productos_1.getProductos);
router.get('/busquedad/:sku', productos_1.getSku);
router.get('/categoria/:categoria', productos_1.getProductoCat);
router.post('/save', productos_1.saveProductos);
router.post('/update', productos_1.update);
router.get('/ctg', productos_1.getCategoria);
router.get('/clientes', productos_1.getCliente);
router.get('/kams', productos_1.getKams);
router.get('/identificador/:id', productos_1.getIdentificadorCtg);
router.post('/save-categoria', productos_1.postCategoria);
router.post('/save-cliente', productos_1.postCliente);
router.post('/save-kams', productos_1.postKam);
router.get('/identificadores', productos_1.getAllIdentificador);
exports.default = router;
//# sourceMappingURL=producto.js.map