import express from "express";

import fs from "fs";
// USE FS TO DELETE THE FILE OR WRITE TO FILE

import path, { dirname } from "path";
import { fileURLToPath } from "url";
// USE TO LOCATE FILE

import uniqid from "uniqid";
// ASIGN ID TO JSON ENTRY

import { userValidationRules, searchValidationRules, validate } from "./validation.js"
// import { validationResult } from "express-validator";
// BLOG POST VALIDATION CHAIN CHECKS ENTRY TYPE

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// DIRECTORY TO FILE PATH

const blogsFilePath = path.join(__dirname, "blog-posts.json")
const authorsFilePath = path.join(__dirname, "./authors.json");
// JOIN URL PATH TO DIRECTORY FILE

const authorsRouter = express.Router()
const blogsRouter = express.Router({mergeParams: true});
// USE EXPRESS ROUTER

authorsRouter.use('/:id/blogs', blogsRouter);

// CAPITAL LETTER FOR ROUTER!!
 
authorsRouter.get('/', (req, res, next) => {
  try {
    console.log("this is in")
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    res.status(200).send(fileAsJSONArray);

    next();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});
 
authorsRouter.param('/:id', (req, res, next, id) => {

  try {

    const authID = id

    console.log(authID)

    req.author = authID

    console.log("this is it now")

    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    const selectedAuthor = fileAsJSONArray.findIndex(authors => authors.id === req.author)
    //  FILTER ARRAY TO FIND ENTRY MATCHING PARAM ID

    if (!selectedAuthor == -1){
        res
        .status(404)
        .send({message: `Author with ${req.author} is not found!`});
    } else {

  const authorDet = fileAsJSONArray[blogEntry] 
  console.log(authorDet)

    res.status(200).send(authorDet);
    next(); }
  } catch (error) {
    res.send(404).send({ message: error.message });
  }
});
 
blogsRouter.get('/', (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);
    

    const authorsBlogs = fileAsJSONArray.filter((blog) => {
                                            const authObj = ({...blog.author})
                                            authObj.id === req.author})

    res.status(200).send(`Author ${({...req.author})} has blogs ${authorsBlogs}`);
    next();
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});


export default authorByBlogs;
