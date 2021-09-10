import express from 'express';
import cors from 'cors';
import { dbConnection } from '../database/config';




export default class Server {
    app: express.Application;
    port: string;
    usersPath: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT as string;
        this.usersPath = '/api/users';

        // Conectar a base de datos
        this.connectToDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectToDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Indica el tipo de dato que vendrá
        this.app.use(express.json());

        // Directorio público
        this.app.use(express.static('public'));
    }

    routes() {        

        this.app.use(this.usersPath, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${ this.port }`);
        });
    }
}