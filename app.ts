import dotenv from "dotenv";
import Server from "./models/server";

// Init config dotenv
dotenv.config();

const name = 'Jean Trujillo';
console.log('Hellow World ',name);

// Init Server
const server = new Server();
server.listen();