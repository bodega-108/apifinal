import { Router } from 'express';
import { getProductos, getSku, getProductoCat, saveProductos } from '../constrollers/productos';

const router =  Router();

router.get('/',getProductos);

router.get('/:sku',getSku);

router.get('/categoria/:categoria',getProductoCat);

router.post('/save',saveProductos);

export default router;