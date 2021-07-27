import express from "express";
// IMPORT EXPRESS SERVER

import { join } from "path"
// create routes to folders

import cors from "cors";
import path, { dirname } from "path";

import { fileURLToPath } from "url";
// IMPORT CORS

import listEndpoints from "express-list-endpoints";
// SHOW API ENDPOINTS

// BASIC SERVER CREATION
// REMEMBER TO UPDATE START SCRIPT IN PACKAGE JSON

import authorsRouter from "./authors/index.js"
import blogsRouter from "./blog-posts/index.js"
// import filesRouter from "./files/index.js"
// import authorByBlogs from "./blog-posts/index-author.js"
// TELL THE SERVER ABOUT THE ROUTES

// MIDDLEWARE ERROR HANDLERS
import { catchAllErrorHandler, entryForbiddenMiddleware, notFoundMiddleware } from "./errorHandlers.js"

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// import { getCurrentFolderPath } from "../src/lib/fs-tools.js"

const publicDirectory = path.join(__dirname, "../Client");

const server = express();
server.use(express.json());
server.use(cors());

const PORT = 3000;



server.use(express.static(publicDirectory))
server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
// server.use(bodyParser.urlencoded({ extended: false }))
// server.use(bodyParser.json())
// server.use("/authors", filesRouter)
// server.use("/blogs", filesRouter)
// server.use("/authors/:id/blogs", authorByBlogs),

// TELL SERVER YOU WANT TO USE THIS

server.use(notFoundMiddleware)
server.use(entryForbiddenMiddleware)
server.use(catchAllErrorHandler)

// MIDDLEWARES

console.table(listEndpoints(server))
// console.log(listEndpoints(server)) TO SHOW AS A LIST

server.listen(PORT, ()=> console.log("server is running on port:", PORT))

server.on("error", (error)=>console.log(`server is not running due to: ${error}`))

// FOR SERVER ALREADY IN USE ERROR RUN
// lsof -i:3000 
// kill -9 [PID] 

