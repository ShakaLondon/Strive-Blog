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

const blogsFilePath = path.join(__dirname, "blog-posts.json");
// JOIN URL PATH TO DIRECTORY FILE

const blogsRouter = express.Router();
// USE EXPRESS ROUTER

// CAPITAL LETTER FOR ROUTER!!


// GET BLOG ALL POSTS
blogsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// SEARCH BLOG POSTS
blogsRouter.get("/search", 
searchValidationRules(),
validate,
async (req, res, next) => {
  try {
    // const { query } = req.query
    // query = title =something
    const searchInput  = req.query.searchQuery
    // const string = searchQuery.toString()

    console.log(searchInput)

    const searchQ = searchInput.replace(/_/g, ' ')

    console.log(searchQ)

    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSONArray = JSON.parse(fileAsString);

    
    const filteredResults = fileAsJSONArray.filter( (blog) => 
        blog.title.toLowerCase().includes(searchQ.toLowerCase()) || blog.category.toLowerCase().includes(searchQ.toLowerCase()) || blog.author.nameAuth.toLowerCase().includes(searchQ.toLowerCase()))

        console.log(filteredResults)

    res.send(filteredResults);

  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});


// CREATE NEW BLOG POST
blogsRouter.post(
  "/", 
  userValidationRules(), 
  validate, 
  async (req, res, next) => {
  try {

    const { category, title, cover, nameAuth, content, value, unit, authID, avatar, words } = req.body;
    // ASSIGN ENTRY VALUES TO REQ.BODY

     const blogInfo = {
      id: uniqid(),
      // ASSIGN UNIQUE ID TO POST
      category, 
      title, 
      cover, 
      nameAuth, 
      content, 
      value, 
      unit, 
      authID, 
      avatar, 
      words,
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
blogsRouter.get("/:blogid", async (req, res, next) => {
  try {

    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    
    const fileAsString = fileAsBuffer.toString();
    
    const fileAsJSONArray = JSON.parse(fileAsString);


    const blogEnt = fileAsJSONArray.find(blog => blog.id=== req.params.blogid)

    


    // let albumID = req.params.id
    // let blogID = req.params.blogid

    if (!blogEnt){
        res
        .status(404)
        .send({message: `Blog with ${blogEnt} is not found!`});
    }

    
    // IF ENTRY IS NOT FOUND THEN RETURN ERROR

    res.send(blogEnt)
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// DELETE BLOG POST
blogsRouter.delete("/:blogid", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    
    const fileAsString = fileAsBuffer.toString();
    
    let fileAsJSONArray = JSON.parse(fileAsString);
    

    const blogEnt = fileAsJSONArray.find(blog => blog.id=== req.params.blogid);

    if (!blogEnt){
        res
        .status(404)
        .send({message: `Blog with ${req.params.blogid} is not found!`});
    };

    fileAsJSONArray = fileAsJSONArray.filter((blog) => blog.id !== req.params.blogid);
    //  RETURN ALL ENTRIES EXCEPT THE ONE THAT HAS BEEN DELETED

    fs.writeFileSync(blogsFilePath, JSON.stringify(fileAsJSONArray));
    // WRITE NEW ARRAY BACK TO FILE

    res.status(204).send();
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// UPDATE BLOG POST
blogsRouter.put("/:blogid", async (req, res, next) => {
  try {

    const fileAsBuffer = fs.readFileSync(blogsFilePath);
    
    const fileAsString = fileAsBuffer.toString();
    
    let fileAsJSONArray = JSON.parse(fileAsString);
    

    const blogIndex = fileAsJSONArray.findIndex(blog => blog.id=== req.params.blogid);

    if (!blogIndex == -1){
// IF BLOG INDEX IS NOT FOUND
        res
        .status(404)
        .send({message: `Blog with ${req.params.blogid} is not found!`});

    };

    const previousBlogData = fileAsJSONArray[blogIndex] 
    // PREVIOUS DATA FOR SPECIFIC ID

    const changedBlogs= { ...previousBlogData, ...req.body, updatedAt: new Date(), id: req.params.blogid}
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

export default blogsRouter;
