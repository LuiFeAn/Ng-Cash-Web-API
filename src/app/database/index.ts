import { DataSource } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({

    type: "postgres",
    host: "172.17.0.1",
    port: 5432,
    username: "root",
    password: "root",
    database: "ng_cash_bd",
    entities: [
        `${path.join(__dirname,'../repositories/*')}`
    ],
    migrations: [
        `${path.join(__dirname,'migrations/*')}`
    ],

});

export default AppDataSource


async function BdConnnect(){

    try{
        await AppDataSource.initialize();
        console.log(' Connected at Database 🔥🚀');
    }catch(err){
        console.log(err);
        console.log(' Unable to establish a connection to the Database 🤖');
    }

}

BdConnnect();
