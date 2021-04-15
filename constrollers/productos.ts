import {Request,Response} from 'express';
import MySQL from '../db/conexion';

export const getProductos = (req: Request, res: Response) =>{
    
    const query =` SELECT * FROM producto`;

    MySQL.ejecutarQuery(query,[],(err:any,productos:Object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false
            });
            return;
        }

        res.json({
            ok:true,
            productos
        });

    });
}

export const getSku = (req: Request, res: Response) =>{
    
    let sku = req.params.sku;
    let columna;

    let texto = /[a-zA-Z]/g;

    if(texto.test(sku)){
        columna = 'nombre';
    }else{
        columna = 'sku'
    }

    const query = ` SELECT * FROM producto WHERE ${columna} LIKE "%${sku}%"`;
    MySQL.ejecutarQuery( query,[],(err:any,producto:Object[])=>{

        if(err){
            res.status(400).json({
                ok:false,
                mensaje:`No se en resultados para la busqueda ${sku}`
                
            });
            
            return;
        }
       
        res.json({
            ok:true,
            producto
        });
    });
}

export const getProductoCat = (req: Request, res: Response)=>{
    let id = req.params.categoria;

    //const query = ` SELECT p.nombre, p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.identificador_ctg=${id}`;
    const query = ` SELECT p.nombre, p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.id=${id}`;

    console.log(query);
    MySQL.ejecutarQuery( query,[],(err:any,productos:Object[])=>{

        if(err){
            res.status(400).json({
                ok:false,
                mensaje:`No se en resultados para la busqueda`
                
            });
            
            return;
        }
        res.json({
            ok:true,
            productos
        });
    });
}

export const saveProductos = (req:Request, res: Response)=>{
    const skus = req.body;


    let contador = 0;
    //let query = "INSERT INTO productos (sku, estado, nombre, id_categoria, precio, id_cliente, id_kam) VALUES ?";

    let query ;
     let cadena;
     let cadenas=[];
            
     for(let i = 0; i < skus.length; i++) {
         contador++;

        
       
      cadena =`("${skus[i].sku}","${skus[i].estado}","${skus[i].nombre}",${skus[i].id_categoria},${skus[i].precio},${skus[i].id_cliente},${skus[i].id_kam})` ;
    
        cadenas.push(cadena); 
    
    }
   

    query = ` INSERT INTO producto (sku, estado, nombre, id_categoria, precio, id_cliente, id_kam) VALUES ${cadenas.toString()}`;
     console.log(query);
    console.log(skus);


   MySQL.ejecutarQuery( query,[],(err:any,productos:Object[])=>{

    if(err){
       res.status(400).json({
           ok:false,
           mensaje:`No se en resultados para la busqueda`
           
        });   
        return;
    }
    res.json({
       ok:true,
       productos
    });
 });

// res.json({
//             ok:true,
//             skus
//          });
}