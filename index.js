import express from "express";
import Connection from "./database/db.js";
import dotenv from 'dotenv'
// we install this because frontend and backend are hosted on different servers
import cors from 'cors'; 
// We use this package because express doesn't know how to handle post requests (requests with body)
import bodyParser from "body-parser";
import Router from "./Routes/route.js";

// Nodemon dev dependancy, not used when pushed to prodiction
const app = express();
const PORT = 8000;
dotenv.config();

app.use(cors());
app.use(bodyParser.json({extended: true}))
app.use(bodyParser.urlencoded({extended: true}))
app.use('/', Router);

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME, PASSWORD);

app.listen(PORT, () => console.log(`Server up and running on ${PORT}`))