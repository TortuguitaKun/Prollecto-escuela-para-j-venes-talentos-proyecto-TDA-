import express from "express";

import path from 'path';
import { fileURLToPath } from "url";
import { methods } from "./Controladores/Auteticacion";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as Autenticacion} from "./Controladores/Auteticacion.js"

const app = express();
app.set("port",3000);
app.listen(app.get("port"));
console.log("servidor corriendo",app.get("port"));

app.use(express.static(__dirname + "/Js"));

app.get("/",(req,res)=> res.sendFile(__dirname + "/HTML/index.html"));
app.get("/login",(req,res)=> res.sendFile(__dirname + "/HTML/login.html"));
app.post("/api/login",Autenticacion.login);