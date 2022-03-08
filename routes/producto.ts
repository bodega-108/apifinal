import { Router } from 'express';
import { gatoTamborilero, getProductosExcel, getSubcategoria } from '../constrollers/productos';
import { getProductos, 
         getSku, 
         getProductoCat, 
         saveProductos, 
         update,
         getCategoria,
         getCliente,
         getKams,
         getIdentificadorCtg,
         postCategoria,
         postCliente,
         postKam,
         getAllIdentificador,
         getSkusCat,
         deleteProducto,
        getProducto,
        editarProducto,
        subirImagenes,
        upload,
        exponerImg,
        listaDeImagenes,
        saveDataImg,
        eliminarImage,
        descargarExcel} from '../constrollers/productos';

const router =  Router();
router.get('/skus/:categoria',getSkusCat);

router.get('/',getProductos);

router.get('/busquedad/:sku',getSku);

router.get('/categoria/:categoria',getProductoCat);

router.post('/save',saveProductos);

router.post('/update',update);

router.get('/ctg',getCategoria);

router.get('/clientes',getCliente);

router.get('/kams',getKams);

router.get('/identificador/:id',getIdentificadorCtg);

router.post('/save-categoria',postCategoria);

router.post('/save-cliente',postCliente);

router.post('/save-kams',postKam);

router.get('/identificadores',getAllIdentificador);

router.get('/eliminar/:id',deleteProducto);

router.get('/producto/:id',getProducto);

router.post('/editar',upload.array('imagenes',10),editarProducto);

router.post('/subirimagenes',subirImagenes,upload.array('imagenes',10));

router.get('/imagenes/:id',listaDeImagenes);

router.get('/img/:sku',exponerImg);

router.post('/save-img',saveDataImg);

router.get('/delete/:id/:nombre',eliminarImage);

router.get('/descargarExcel/:nombre',descargarExcel);

router.get('/generarExcelTotal',getProductosExcel);

router.get('/ataque/:ataque',gatoTamborilero);

router.get('/subcategoria/:categoria', getSubcategoria);

// router.post('/emails',sendEmail);



export default router;