import express from "express";

import cors from "cors";


import listEndpoints from "express-list-endpoints";

// BASIC SERVER CREATION
// REMEMBER TO UPDATE START SCRIPT IN PACKAGE JSON

import authorsRouter from "./authors/index.js"
import blogsRouter from "./blog-posts/index.js"
// TELL THE SERVER ABOUT THE ROUTE

const server = express();
const PORT = 3000;

server.use(cors());

server.use(express.json());

server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
// TELL SERVER YOU WANT TO USE THIS

console.log(listEndpoints(server))

server.listen(PORT, ()=> console.log("server is running on port:", PORT))

server.on("error", (error)=>console.log(`server is not running due to: ${error}`))

// for already in use error run 
// lsof -i:3000 
// kill -9 [PID] 

