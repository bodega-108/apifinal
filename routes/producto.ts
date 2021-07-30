import { Router } from 'express';
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
         getSkusCat} from '../constrollers/productos';

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

export default router;