import mysql from 'mysql';

export default class MySQL{
    
    private static _instance: MySQL;

    public cnn: mysql.Connection;

    public conectado : boolean = false;

    constructor() {
        console.log('Clases inicializa');
        
        this.cnn = mysql.createConnection({
            host:'localhost',
            user:'emonk',
            password:'Desarrollo@emonk1',
            database:'generador',
            port:3306,
            
            // host:'18.231.16.7',
            // user:'eduardo',
            // password:'dini108',
            // database:'generador',
            // port:3306,
            
        });
        this.conectarDB();

        
    }

    private conectarDB(){
        this.cnn.connect((err: mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                console.log('ERROR EN LA CONEXION');
                return;
            }

            this.conectado = true;

            console.log('Database onilne');
        });
    }

    static ejecutarQuery(query: string, [],callback: Function){

        this.instance.cnn.query(query,[],(err, results : Object[], fields )=>{
            if(err){
                console.log('Error en Qury');
                console.log(err);
                return callback(err);
            }

            if(results.length === 0){
                callback('el registro solicitado no existe');
            }else{
                callback(null, results);
            }

           
        });
    }

    public static get instance(){
        return this._instance || (this._instance = new this());
    }
}