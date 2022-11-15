import { DataSource } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({

    type: "postgres",
    host: process.env.BD_HOST as string,
    port: process.env.BD_PORT as undefined,
    username: process.env.BD_USER as string,
    password: process.env.BD_PASSWORD as string,
    database: process.env.BD_NAME as string,
    entities: [
        `${path.join(__dirname,'../models/*')}`
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
