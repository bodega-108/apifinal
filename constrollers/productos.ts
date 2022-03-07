import {Request,Response} from 'express';
import multer from 'multer';
import  Multer  from 'multer';
import MySQL from '../db/conexion';
import path from 'path';
import fs from 'fs';
// import { transporter } from './emailer';


/**
 * Libreria para generar Excel
 */
import { exportUsersToExcel }  from './exportService.js';


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
export const getProductosExcel = (req: Request, res: Response) =>{
    
    /**
     * Preparando excel
     */
     const workSheetColumnName = [
        "id",
        "sku",
        "estado",
        "nombre",
        "precio",
        "codigo sherpa",
        "material",
        "medidas",
        "peso_producto",
        "color-diseño-panton",
        "capacidad",
        "packing_venta",
        "medidas_ctn",
        "peso_ctn",
        "esteril",
        "formato",
        "codigo_cliente",
        "codigo_isp",
        "descripcion"
    ]



    const query =` SELECT * FROM producto`;

    MySQL.ejecutarQuery(query,[],(err:any,productos:Object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false
            });
            return;
        }
        let fecha = new Date();
        const workSheetName = 'Productos';
        const filePath =path.join(__dirname,`../../outputFiles/productos-${fecha.getTime()}.xlsx`);
        const nombre = (filePath.slice(-28)).split('.');

        exportUsersToExcel(productos, workSheetColumnName, workSheetName, filePath);

        res.json({
            ok:true,
            archiExcel:nombre[0],
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
    
    
    /**
     * Preparando excel
     */
     const workSheetColumnName = [
        "id",
        "sku",
        "estado",
        "nombre",
        "precio",
        "codigo sherpa",
        "material",
        "medidas",
        "peso_producto",
        "color-diseño-panton",
        "capacidad",
        "packing_venta",
        "medidas_ctn",
        "peso_ctn",
        "esteril",
        "formato",
        "codigo_cliente",
        "codigo_isp",
        "descripcion"
    ]
    let fecha = new Date();
    MySQL.ejecutarQuery( query,[],(err:any,producto:Object[])=>{

        if(err){
            res.json({
                ok:false,
                mensaje:`No se en resultados para la busqueda ${sku}`
            });
            return;
        }
        
        const workSheetName = 'Productos';
        const filePath =path.join(__dirname,`../../outputFiles/productos-${fecha.getTime()}.xlsx`);
        const nombre = (filePath.slice(-28)).split('.');

        exportUsersToExcel(producto, workSheetColumnName, workSheetName, filePath);

        res.json({
            ok:true,
            archiExcel:nombre[0],
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
            res.json({
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
export const getSkusCat = (req: Request, res: Response)=>{
    let id = req.params.categoria;

    //const query = ` SELECT p.nombre, p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.identificador_ctg=${id}`;
    const query = ` SELECT p.sku FROM producto p INNER JOIN categoria c ON p.id_categoria = c.id WHERE c.id=${id}`;

    console.log(query);
    MySQL.ejecutarQuery( query,[],(err:any,productos:Object[])=>{

        if(err){
            res.json({
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
         cadena =`("${skus[i].sku}","${skus[i].estado}","${skus[i].nombre}",${skus[i].id_categoria},${skus[i].precio},${skus[i].id_cliente},${skus[i].id_kam},"${skus[i].codigo_sherpa}")`;
         cadenas.push(cadena); 
    
    }

    query = ` INSERT INTO producto (sku, estado, nombre, id_categoria, precio, id_cliente, id_kam, codigo_sherpa) VALUES ${cadenas.toString()}`;
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

}
export const update = (req: Request, res: Response)=>{
    let id = req.body.id;
    let sku = req.body.sku;
    let nombre = req.body.nombre;
    let cliente = req.body.cliente;
    let categoria = req.body.categoria;
    let precio = req.body.precio;
    let kam = req.body.kam;

    let query = ` UPDATE producto SET sku="${sku}", nombre ="${nombre}", id_categoria ="${categoria}", precio ="${precio}", id_cliente ="${cliente}",id_kam ="${kam}" WHERE id ="${id}";`

    console.log(query);

    MySQL.ejecutarQuery( query,[],(err:any,producto:Object[])=>{

        if(err){
            res.json({
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
export const getCategoria = (req: Request, res: Response)=>{
    
    const query = `SELECT * FROM categoria;` 
    
    MySQL.ejecutarQuery( query,[],(err:any,categoria:Object[])=>{
        
        if(err){
            res.json({
                ok:false,
                mensaje:`No se en resultados para la busqueda`
            });
            return;
        }
        res.json({
            ok:true,
            categoria
        });
    });
}

export const getCliente = (req: Request, res: Response)=>{

    const query = `SELECT * FROM cliente`;

    MySQL.ejecutarQuery( query,[],(err:any,clientes:Object[])=>{
        if(err){
            res.json({
                ok:false,
                message:"No se encontraron los resultados"

            });

            return;
           
        }
        res.json({
            ok:true,
            clientes
        });
    });
}
export const getKams = (req: Request, res: Response)=>{

    const query = `SELECT * FROM kam`;

    MySQL.ejecutarQuery( query,[],(err:any,kams:Object[])=>{
        if(err){
            res.json({
                ok:false,
                message:"No se encontraron los resultados"

            });

            return;
           
        }
        res.json({
            ok:true,
            kams
        });
    });
}
export const getIdentificadorCtg = (req: Request, res: Response)=>{

    const id_ctg = req.params.id;

    const query = `SELECT identificador_ctg FROM categoria WHERE id="${id_ctg}"`;
    console.log(query);
    
    MySQL.ejecutarQuery( query,[],(err:any,identificador:Object[])=>{
        if(err) {
            res.json({
                ok:false,
                message:"No se han encontrado registros"
            });
            return;
        }
        res.json({
            ok:true,
            identificador
        });
    });
}
export const postCategoria = (req:Request, res: Response)=>{
    
    const nombre = req.body.nombre;
    const identificador = req.body.identificadorCtg;

    const query = ` INSERT INTO categoria (nombre, identificador_ctg) VALUES ("${nombre}", ${identificador})`;

    MySQL.ejecutarQuery( query,[],(err:any,categoria:Object[])=>{
        if(err) {
            res.json({
                ok:false,
                mensaje:`Ha ocurrido un error`
            });

            return;
        }
        res.json({
            ok:true,
            mensaje:"Registro existoso"
        });
    });
}
export const postCliente = (req: Request, res: Response)=>{
    
    const nombre = req.body.nombre;
    const  id_kam = req.body.id_kam;

    const query = `INSERT INTO cliente(nombre, id_kam) VALUES("${nombre}",${id_kam})`;

    MySQL.ejecutarQuery( query,[],(err:any,cliente:Object[])=>{
        if(err) {
            res.json({
                ok:false,
                mensaje:"Lo sentimos, ha ocurrido un erro"
            });
            return;
        }
        res.json({
            ok:true,
            mensaje:"Registro existoso"
        });
    })
}
export const postKam = (req: Request, res: Response)=>{
    
    const nombre = req.body.nombre;
    const  apellido = req.body.apellido;

    const query = `INSERT INTO kam(nombre, apellido) VALUES("${nombre}","${apellido}")`;

    MySQL.ejecutarQuery( query,[],(err:any,cliente:Object[])=>{
        if(err) {
            res.json({
                ok:false,
                mensaje:"Lo sentimos, ha ocurrido un erro"
            });
            return;
        }
        res.json({
            ok:true,
            mensaje:"Registro existoso"
        });
    })
}
export const getAllIdentificador = (req: Request, res: Response)=>{
    
   const query = `SELECT identificador_ctg FROM categoria`;

   MySQL.ejecutarQuery( query,[],(err:any,identificadores:Object[])=>{
       if(err) {
           res.json({
               ok:false,
               mensaje:"Error al guardar"
           });
           return;
       }
       res.json({
           ok:true,
           identificadores
       });
   })
}

export const deleteProducto = (req:Request, res:Response)=>{
    let id = req.params.id;
    
    const query = `DELETE FROM producto WHERE id=${id}`;

    MySQL.ejecutarQuery( query,[],(err:any,producto:Object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false
            });
            return;
        }

        res.json({
            ok:true,
            producto
        });
    })
}

export const getProducto = (req:Request, res:Response) =>{
    let id = req.params.id;
    const query = `SELECT * FROM producto WHERE id=${id}`;

    MySQL.ejecutarQuery( query,[],(err:any,producto:Object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false
            });
            return;
        }

        res.json({
            ok:true,
            producto
        });
    });

}

export const editarProducto = async (req: Request, res: Response) => {
    // console.log(req.body);


    const {nombre,status,codigo_sherpa,precio,cliente,kam,material,medidas_producto,peso_producto,cdp,capacidad,packing_venta,medidas_ctn,peso_ctn,brandeado,formato_venta,codigo_isp,codigo_cliente,id,erp,short_description,adt_oro,adt_excel,progress,esteril} = req.body;
    


    const query = `UPDATE producto SET nombre="${nombre}",estado="${status}",codigo_sherpa="${codigo_sherpa}",precio="${precio}",id_cliente=${cliente},id_kam=${kam},material="${material}",medidas="${medidas_producto}", peso_producto="${peso_producto}", color_diseno_panton="${cdp}",capacidad="${capacidad}",packing_venta="${packing_venta}", medidas_ctn="${medidas_ctn}",peso_ctn="${peso_ctn}",brandeado="${brandeado}",formato="${formato_venta}",codigo_isp="${codigo_isp}",codigo_cliente="${codigo_cliente}",descripcion="${short_description}",erp="${erp}",adt_oro="${adt_oro}",adt_excel="${adt_excel}",progress="${progress}",esteril="${esteril}" WHERE id = ${id}`;
    // console.log(query);

    MySQL.ejecutarQuery( query,[],(err:any,producto:Object[])=>{
        
        if(err){
            res.status(400).json({
                ok:false
            });
            return;
        }

        res.json({
            ok:true,
            producto
        });

    } );

   
}
export const subirImagenes = (req: Request, res: Response)=>{

   
    res.json({
        ok:true
    });

    upload
}

const storage = Multer.diskStorage({
    
    destination: function (req, file, cb){
       
        cb(null, './uploads')
    },
    filename: function (req, file, cb){
       
        cb(null, `${file.originalname}`)
       
    }
});

export const upload = multer({ storage: storage});
 
// upload.single('myfile');

export const listaDeImagenes = async(req: Request, res: Response)=>{
    const id = req.params.id;
    const query = `SELECT i.nombre, i.id FROM imagenes_sku i INNER JOIN producto p ON i.id_sku = p.id WHERE p.id=${id};`;
    console.log(query);
    let foto = {
            "id":"",
            "url":""
        };
    let listaFotos :any[]= [];

    MySQL.ejecutarQuery( query,[],(err:any,producto:any[]) => {
         console.log(producto); 
        if(err){
            res.status(400).json({
                ok:false,
                image:"no-image.jpg"
            });
            return
            
        }

       res.json({
           ok:true,
            producto,
             
       });
    } );
}

export const exponerImg = async(req: Request, res: Response)=>{
    
    const sku = req.params.sku;
    console.log(sku);
    const query = `SELECT i.nombre FROM imagenes_sku i INNER JOIN producto p ON i.id_sku = p.id WHERE i.nombre="${sku}";`

    let foto= "";
    
    console.log(query);
   MySQL.ejecutarQuery( query,[],(err:any,producto:any) => {
        // console.log(producto[0].nombre); 
        if(err){
            res.status(400).json({
                ok:false
            });
            return;
        }  
          foto = path.join(__dirname,'../../uploads/',producto[0].nombre); 
          res.sendFile(foto);

    } );
} 

export const saveDataImg = async (req: Request, res: Response) => {
    const listaImagenes = req.body;
    let contador = 0;
     console.log(req.body);
   
     let query ;
     let cadena;
     let cadenas=[];
            
      for(let i = 0; i < listaImagenes.length; i++) {
          contador++;   
          cadena =`("${listaImagenes[i].nombre}","${listaImagenes[i].id_sku}")`;
          cadenas.push(cadena); 
    
     }

     console.log(cadena);

      query = `INSERT INTO imagenes_sku (nombre,id_sku) VALUES  ${cadenas.toString()}`;
    //  return res.json(query);
    MySQL.ejecutarQuery( query,[],(err:any,imagenes_sku:Object[])=>{
        if(err) {
           return res.status(400).json({
                ok:false,
                message:`ha ocurrido un error al intentar guardar`,
            });
        }

        res.json({
            ok:true,
            message:'Registro exitoso',
        });
    });
}
export const eliminarImage = async (req: Request, res: Response) => {
    let id = req.params.id;
    let nombre = req.params.nombre;
    try {
        const pathImage = path.join(__dirname,'../../uploads/',nombre); 
        console.log(pathImage);
        fs.unlinkSync(pathImage)

        const query = `DELETE FROM imagenes_sku WHERE id=${id}`;
        MySQL.ejecutarQuery( query,[],(err:any,producto:Object[])=>{
            
            if(err){
                res.status(400).json({
                    ok:false
                });
                return;
            }
            res.json({
                ok:true,
                mensaje:"registro eliminado"
            });
        });
        //file removed
      } catch(err) {
        console.error(err)
        res.json({
            ok:false,
            mensaje:"ha ocurrido un error al eliminar el archivo"
        })
      }

 
    
  
}
export const descargarExcel = async(req: Request, res: Response)=>{
    const nombre = req.params.nombre;
     
     try {
        const url = path.join(__dirname,`../../outputFiles/${nombre}.xlsx`);
        res.sendFile(url);
     }catch(err){
         res.json({
             ok:false,
             error:err
         });
     }
     
} 
// export const sendEmail = async (req: Request, res: Response) => {

//     const email = req.body.email;

//     try {
//         await transporter.sendMail({
//         from: 'Desarrollo Emonk', // sender address
//         to: email, // list of receivers
//         subject: "Test Desarroll", // Subject line
//         text: "Hello world?", // plain text body
//         html: `
//             <h1>Emonk sktock</h1>
//             <p>Estimado cliente, nuestros registros alertaron que proximamente finalizara su stock para el producto Papel Yali 50 kilogramos</p>
//         `, // html body
//         });

//         res.json({
//             ok:true,
//             message:`se notificó correctamente por mail al usuario ${email}`
//         })
//     } catch (error) {
        
//         return res.status(400).json({ message: 'Something goes wrong!'});
//     }
// }

