"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_1 = require("../constrollers/productos");
const router = express_1.Router();
router.get('/', productos_1.getProductos);
router.get('/:sku', productos_1.getSku);
router.get('/categoria/:categoria', productos_1.getProductoCat);
router.post('/save', productos_1.saveProductos);
exports.default = router;
//# sourceMappingURL=producto.js.map