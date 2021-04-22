import { Router } from 'express';
import { getProductos, getSku, getProductoCat, saveProductos, update } from '../constrollers/productos';

const router =  Router();

router.get('/',getProductos);

router.get('/:sku',getSku);

router.get('/categoria/:categoria',getProductoCat);

router.post('/save',saveProductos);

router.post('/update',update);
export default router;