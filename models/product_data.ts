const Sequelize = require('sequelize');
import db from '../db/connection';

   
    const Producto = db.define( 'Producto', {
        id: {type: Sequelize.INTEGER, primaryKey: true},      
        nombre:{ type: Sequelize.STRING},
        sku: { type: Sequelize.STRING},
        estado: { type: Sequelize.STRING},
        codigo_sherpa: { type: Sequelize.STRING}, 
        id_kam: { type: Sequelize.INTEGER}, 
        id_cliente: { type: Sequelize.INTEGER},
        descripcion: { type: Sequelize.STRING},
    });

    //como se llama el modelo en donde se vaya a usar 
    /*  const productos = Productos.findAll({ attributes: ['nombre'] })
        .then(data => {
            const results = JSON.stringify(data);
            console.log(results);
        })
        .catch(err => {
            console.log(err);
        }) */

    export default Producto;