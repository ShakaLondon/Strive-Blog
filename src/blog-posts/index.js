import express from "express";

import fs from "fs";
// USE FS TO DELETE THE FILE OR WRITE TO FILE

import path, { dirname } from "path";
import { fileURLToPath } from "url";
// USE TO LOCATE FILE

import uniqid from "uniqid";
// ASIGN ID TO JSON ENTRY

import { userValidationRules, validate } from "./validation.js"
// import { validationResult } from "express-validator";
// BLOG POST VALIDATION CHAIN CHECKS ENTRY TYPE

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// DIRECTORY TO FILE PATH

const blogsFilePath = path.join(__dirname, "blog-posts.json");
// JOIN URL PATH TO DIRECTORY FILE

const router = express.Router();
// USE EXPRESS ROUTER

// CAPITAL LETTER FOR ROUTER!!


// GET BLOG ALL POSTS
router.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// CREATE NEW BLOG POST
router.post(
  "/", 
  userValidationRules(), 
  validate, 
  async (req, res, next) => {
  try {

    const { category, title, cover, nameAuth, content, value, unit, authID, avatar } = req.body;
    // ASSIGN ENTRY VALUES TO REQ.BODY

     const blogInfo = {
      id: uniqid(),
      // ASSIGN UNIQUE ID TO POST
      ...req.body,
      createdAt: new Date(),
      updatedAt: new Date(),
      // ASSIGN DATES TO POST
    };

    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    //  READ JSON FILE

    const fileAsString = fileAsBuffer.toString();
    // CHANGE JSON TO STRING

    const fileAsJSONArray = JSON.parse(fileAsString);
    // CREATE ARRAY FROM ENTRIES

    fileAsJSONArray.push(blogInfo);
    // PUSH NEW ENTRY TO ARRAY

    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    // WRITE ARRAY BACK TO FILE DIRECTORY AS STRING
    
    res.send(blogInfo);

    
  } catch (error) {
    res.send(500).send( validate );
  }
});

// GET SPECIFIC BLOG POST
router.get("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    
    const fileAsString = fileAsBuffer.toString();
    
    const fileAsJSONArray = JSON.parse(fileAsString);

    const blogEntry = fileAsJSONArray.find(blog => blog.id=== req.params.id)
    //  FILTER ARRAY TO FIND ENTRY MATCHING PARAM ID

    if (!blogEntry){
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});
    }
    // IF ENTRY IS NOT FOUND THEN RETURN ERROR

    res.send(blogEntry)
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// DELETE BLOG POST
router.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    
    const fileAsString = fileAsBuffer.toString();
    
    let fileAsJSONArray = JSON.parse(fileAsString);
    

    const blogEnt = fileAsJSONArray.find(blog => blog.id=== req.params.id);

    if (!blogEnt){
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});
    };

    fileAsJSONArray = fileAsJSONArray.filter((blog) => blog.id !== req.params.id);
    //  RETURN ALL ENTRIES EXCEPT THE ONE THAT HAS BEEN DELETED

    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    // WRITE NEW ARRAY BACK TO FILE

    res.status(204).send();
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// UPDATE BLOG POST
router.put("/:id", async (req, res, next) => {
  try {

    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    
    const fileAsString = fileAsBuffer.toString();
    
    let fileAsJSONArray = JSON.parse(fileAsString);
    

    const blogIndex = fileAsJSONArray.findIndex(blog => blog.id=== req.params.id);

    if (!blogIndex == -1){
// IF BLOG INDEX IS NOT FOUND
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});

    };

    const previousBlogData = fileAsJSONArray[blogIndex] 
    // PREVIOUS DATA FOR SPECIFIC ID

    const changedBlogs= { ...previousBlogData, ...req.body, updatedAt: new Date(), id: req.params.id}
// NEW DATA OLD DATA NEW TIME AND SAME ID FROM PARAM

    fileAsJSONArray[blogIndex] = changedBlogs
    // REPLACE INDEX WITH NEW DATA

    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    // WRITE BACK TO JSON FILE

    res.send(changedBlogs);
    
  } catch (error) {

    res.send(500).send({ message: error.message });

  }
});

export default router;
