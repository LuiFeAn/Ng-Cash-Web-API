import { DataSource } from 'typeorm';
import path from 'path';
import dotenv from 'dotenv';
dotenv.config();

const AppDataSource = new DataSource({

    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT as undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [
        `${path.join(__dirname,'../entities/*')}`
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
