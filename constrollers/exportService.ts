import * as XLSX from 'xlsx';
import path from 'path';

const exportExcel = (data:any, workSheetColumnNames:any, workSheetName:any, filePath:any) => {
    const workBook = XLSX.utils.book_new();
    const workSheetData = [
        workSheetColumnNames,
        ... data
    ];
    const workSheet = XLSX.utils.aoa_to_sheet(workSheetData);
    XLSX.utils.book_append_sheet(workBook, workSheet, workSheetName);
    XLSX.writeFile(workBook, path.resolve(filePath));
}

export const exportUsersToExcel = (productos:any, workSheetColumnNames:any, workSheetName:any, filePath:any) => {
    const data = productos.map((producto: { id: any; 
                                            nombre: any; 
                                            sku: any; 
                                            estado: any; 
                                            precio:any,
                                            codigo_sherpa:any;
                                            material:any
                                            medidas:any,
                                            peso_producto:any,
                                            color_diseno_panton:any,
                                            capacidad:any,
                                            packing_venta:any,
                                            medidas_ctn:any,
                                            peso_ctn:any,
                                            esteril:any,
                                            formato:any,
                                            codigo_cliente:any,
                                            codigo_isp:any,
                                            descripcion:any
                                        }) => {
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
}


