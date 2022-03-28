import express, {Application} from "express";
import userRoutes from "../routes/users.routes";
import cors from "cors";
import db from "../db/connection";



class Server {

    //private app: express.Application;
    private app: Application;
    private port: String; // | undefined
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3400';

        // Settings server
        this.dbConnection();
        this.middlewares();
        this.routes()
    }

    async dbConnection(){
        try {
            await db.authenticate();
            console.log("database online");
            
        } catch (error) {
            throw new Error("error connection");
            
        }
    }

    listen(){
        this.app.listen( this.port, ()=>{
            console.log("app running on port ",this.port);
        });
    }

    middlewares(){
        //CORS
        this.app.use( cors() );

        //mapping body
        this.app.use( express.json() );

        //folder static
        this.app.use( express.static('public') );
    }

    routes(){
        this.app.use(this.apiPaths.users, userRoutes); //is use, is not get
    }
}

export default Server;