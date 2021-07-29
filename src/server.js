import express from "express";
// IMPORT EXPRESS SERVER

// import { join } from "path"
// create routes to folders

import cors from "cors";
import path, { dirname } from "path";

// import env from "dotenv"
// import dotenv from 'dotenv'

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
import { errorHandler } from "./newErrorHandlers.js"

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// import { getCurrentFolderPath } from "../src/lib/fs-tools.js"

const publicDirectory = path.join(__dirname, 'Client');





const server = express();
const PORT = process.env.PORT || 3000;

// const { PORT } = process.env;

const whiteList = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL, process.env.REACT_APP_API_URL ];

const corsOptions = {
  origin: (origin, callback) => {
    //   console.log({origin})
    if (whiteList.some((allowedUrl) => allowedUrl === origin)) {
      callback(null, true);
    //   if the origin is in the whitelist then loading page if not then err
    } else {
      const error = new Error("Not allowed by cors!");
      error.status = 403;
      callback(error);
    }
  },
};






// const whitelist = [process.env.FRONTEND_URL, process.env.FRONTEND_PROD_URL, process.env.REACT_APP_API_URL]

// server.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || whitelist.indexOf(origin) !== -1) {
//         // origin is in the list therefore it is allowed
//         callback(null, true)
//       } else {
//         // origin is not in the list then --> ERROR
//         callback(new Error("Not allowed by cors!"))
//       }
//     },
//   })
// )


server.use(express.json());
server.use(cors(corsOptions));






// server.use(cors());







server.use(express.static(publicDirectory))
server.use("/authors", authorsRouter);
server.use("/blogs", blogsRouter);
// server.use(bodyParser.urlencoded({ extended: false }))
// server.use(bodyParser.json())
// server.use("/authors", filesRouter)
// server.use("/blogs", filesRouter)
// server.use("/authors/:id/blogs", authorByBlogs),

server.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// TELL SERVER YOU WANT TO USE THIS

server.use(errorHandler)

// MIDDLEWARES

console.table(listEndpoints(server))
// console.log(listEndpoints(server)) TO SHOW AS A LIST

server.listen(PORT, ()=> console.log("server is running on port:", PORT))

server.on("error", (error)=>console.log(`server is not running due to: ${error}`))

// FOR SERVER ALREADY IN USE ERROR RUN
// lsof -i:3000 
// kill -9 [PID] 

