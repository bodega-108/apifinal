import express,{ Application} from 'express';
import  productosRouter from '../routes/producto'
import cors from 'cors';
import db from '../db/connection';
import morgan from 'morgan';

import MySQL from '../db/conexion';


export default  class Server{

    private app: Application;
    private port: number;

    private apiPaths = {
        produtos :'/api/productos'
    };

    constructor(){
        this.app = express();
        this.port = Number(process.env.PORT) || 3000;
        // this.dbConnect();
        this.conexion();
        //middlewares
        this.middlewares();
        //definir las rutas
        this.routes();

        
    }

    routes(){
       this.app.use(this.apiPaths.produtos, productosRouter) 
    }

    async dbConnect(){
        try{
           await  db.authenticate();
           console.log('DATABASE ONLINE');
        }catch( e: any ){
            throw new Error(e);
        }
    }
    
    middlewares(){
        //CORS middleware
        this.app.use(cors());

        //LECTURA DEL BODY
        this.app.use(express.json());

        //METRICAS
        this.app.use(morgan('dev'));

        //PATH DE ARCHIVOS
        this.app.use(express.static('public'));

    }
    listen(){
        this.app.listen(this.port,  () =>{
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        });
    }

    async conexion(){
        try{
            const mysql = new MySQL();
        }catch(e:any){
            throw new Error(e);
        }
    }


}   