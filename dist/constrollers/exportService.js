"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.exportUsersToExcel = void 0;
const XLSX = __importStar(require("xlsx"));
const path_1 = __importDefault(require("path"));
const exportExcel = (data, workSheetColumnNames, workSheetName, filePath) => {
    const workBook = XLSX.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ...data
    ];
    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
    XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
    XLSX.writeFile(workBook, path_1.default.resolve(filePath));
};
const exportUsersToExcel = (productos, workSheetColumnNames, workSheetName, filePath) => {
    const data = productos.map((producto) => {
        return [producto.id,
            producto.sku,
            producto.estado,
            producto.nombre,
            producto.precio,
            producto.codigo_sherpa,
            producto.material,
            producto.medidas,
            producto.peso_producto,
            producto.color_diseno_panton,
            producto.capacidad,
            producto.packing_venta,
            producto.medidas_ctn,
            producto.peso_ctn,
            producto.esteril,
            producto.formato,
            producto.codigo_cliente,
            producto.codigo_isp,
            producto.descripcion
        ];
    });
    exportExcel(data, workSheetColumnNames, workSheetName, filePath);
};
exports.exportUsersToExcel = exportUsersToExcel;
//# sourceMappingURL=exportService.js.map