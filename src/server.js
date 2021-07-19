import express from "express";
// IMPORT EXPRESS SERVER

import { join } from "path"
// create routes to folders

import cors from "cors";
// IMPORT CORS

import listEndpoints from "express-list-endpoints";
// SHOW API ENDPOINTS

// BASIC SERVER CREATION
// REMEMBER TO UPDATE START SCRIPT IN PACKAGE JSON

import authorsRouter from "./authors/index.js"
import blogsRouter from "./blog-posts/index.js"
import filesRouter from "./files/index.js"
// import authorByBlogs from "./blog-posts/index-author.js"
// TELL THE SERVER ABOUT THE ROUTES

// MIDDLEWARE ERROR HANDLERS
import { catchAllErrorHandler, entryForbiddenMiddleware, notFoundMiddleware } from "./errorHandlers.js"

import { getCurrentFolderPath } from "./lib/fs-tools.js"

const publicFolderPath = join(getCurrentFolderPath(import.meta.url), "../public")

const server = express();
const PORT = 3000;

server.use(cors());
server.use(express.json());
server.use(express.static(publicFolderPath))
server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
server.use("/authors", filesRouter)
server.use("/blogs", filesRouter)
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

