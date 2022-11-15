import { DataSource } from "typeorm/data-source";

export const AppDataSource = new DataSource({

    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "123",
    database: "ng_cash_bd",
    entities: [
        "src/app/models/*.ts"
    ],
    subscribers: [],
    migrations: [
        "src/app/migrations/*.ts"
    ],
})
