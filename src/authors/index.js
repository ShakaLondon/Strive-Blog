import express from "express";

import fs from "fs";
// USE FS TO DELETE THE FILE

import path, { dirname } from "path";
import { fileURLToPath } from "url";

// USE TO LOCATE FILE

import { userValidationRules, validate } from "./validation.js"
// IMPORT VALIDATION MIDDLEWARES


import uniqid from "uniqid";

// ASIGN ID TO JSON ENTRY
//import blogsRouter from "./blog-posts/index.js"

// GET ALL AUTHORS

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// DIRECT TO FILE PATH

const authorsFilePath = path.join(__dirname, "authors.json");
const blogsFilePath = path.join(__dirname, "../blog-posts/blog-posts.json")

const authorsRouter = express.Router();
// const blogsRouter = express.Router({mergeParams: true})





// CAPITAL LETTER FOR ROUTER!!



authorsRouter.get("/", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    const fileAsString = fileAsBuffer.toString();
    const fileAsJSON = JSON.parse(fileAsString);
    res.send(fileAsJSON);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// CREATE AUTHOR

authorsRouter.post("/",
userValidationRules(), 
  validate, 
   async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth, } = req.body;

    const author = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      emailCheck: false,
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    const emailDuplicate = fileAsJSONArray.findIndex( (author) => author.email == req.body.email )



    if (emailDuplicate != -1) {

      req.body.emailCheck = true

      const feedBack = {...req.body}
      

        res
        .status(404)
        .send({message: `Author with ${req.body.email} already exists!`}
        );

    } else {

        fileAsJSONArray.push(author);

        fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));
    
        res.send(author);

    };

    // to delete entry
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// GET ONE AUTHOR
authorsRouter.get('/:id/blogs', async(req, res, next)=>{

  const fileAsBuffer = fs.readFileSync(authorsFilePath);
    // read json file
    const fileAsString = fileAsBuffer.toString();
    // convert JSON to string
    const fileAsJSONArray = JSON.parse(fileAsString);
    // read as an array

    console.log("get route")

    const author = fileAsJSONArray.find(author => author.id=== req.params.id)

    const authorID = req.params.id

    if (!author){
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});
    } else {

      const fileAsBuffer = fs.readFileSync(blogsFilePath);
    // read json file
      const fileAsString = fileAsBuffer.toString();
    // convert JSON to string
      const fileAsJSONArray = JSON.parse(fileAsString);

      console.log("we are here") 

      const blogs = fileAsJSONArray.filter((blog) => {

        const authorDet = ({...blog.author})
        console.log(authorDet)

        
        authorDet.authID === req.params.id})

        if (blogs.length !== 0) {

          res.send(blogs)

        } else {

          res
        .status(404)
        .send({message: `No Blogs for Author with ID: ${req.params.id} have been found!`});

        }

    }
   
}, )

authorsRouter.get("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    // read json file
    const fileAsString = fileAsBuffer.toString();
    // convert JSON to string
    const fileAsJSONArray = JSON.parse(fileAsString);
    // read as an array

    console.log("get route")

    // let albumID = req.params.id

    const author = fileAsJSONArray.find(author => author.id=== req.params.id)

    // let authorID = req.params.id

    if (!author){
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});
    }

    res.send(author)
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// authorsRouter.use('/:id/blogs', function(req, res, next) {
//   req.id = req.params.id;
//   console.log(`${req.params.id}  this route is active`)
//   next()
// }, blogsRouter);

// SEARCH BLOG POSTS BY AUTHOR
// authorsRouter.get("/:id/blogs", 
// // async (req, res, next) => {
// //   try {

// //     const fileAsBuffer = fs.readFileSync(authorsFilePath);
// //     // read json file
// //     const fileAsString = fileAsBuffer.toString();
// //     // convert JSON to string
// //     const fileAsJSONArray = JSON.parse(fileAsString);
// //     // read as an array

// //     const author = fileAsJSONArray.find(author => author.id === req.params.id)

// //     console.log(author)

// //     if (!author){
// //         res
// //         .status(404)
// //         .send({message: `Author with ${req.params.id} is not found!`});
// //     }

// //     res.send(author)



    
// //   } catch (error) {
// //     res.send(500).send({ message: error.message });
// //   }
// // }, 
// async (req, res, next) => {
//   try { 

//     console.log("this is in")
//     console.log(req.params.id)

//     const blogfileAsBuffer = fs.readFileSync(blogsFilePath);
    
//     const blogfileAsString = blogfileAsBuffer.toString();
    
//     let blogfileAsJSONArray = JSON.parse(blogfileAsString);

    

//     const authorFound = await fileAsJSONArray.find((authors) => {
//       const authDet = ({...authors.author}); 
//       console.log(authDet)
//       authDet.authID=== req.params.id});

//     if (!authorFound){
//         res
//         .status(404)
//         .send({message: `No blogs found for Author: ${req.params.id}!`});
//     }

//     console.log(authorFound)

// const matchingBlogEntry = await blogfileAsJSONArray.filter((blog) => {
//       const authDet = ({...blog.author}); 
//       console.log(authDet)
//       authDet.authID === req.params.id})
//     //  FILTER ARRAY TO FIND ENTRY MATCHING PARAM ID

//     console.log(matchingBlogEntry)

//     res.send(matchingBlogEntry);

//   } catch (error) {
//     res.send(500).send({ message: error.message });
//   }}

//     );



// DELETE AUTHOR

authorsRouter.delete("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    // read json file
    const fileAsString = fileAsBuffer.toString();
    // convert JSON to string
    let fileAsJSONArray = JSON.parse(fileAsString);
    // read as an array

    const author = fileAsJSONArray.find(author => author.id=== req.params.id);

    // get result then if error say not found

    if (!author){
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});
    };

    // to delete entry

    fileAsJSONArray = fileAsJSONArray.filter((author) => author.id !== req.params.id);
    //  return all entries except the one being deleted

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));

    res.status(204).send();
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// GET UPDATE AUTHOR

authorsRouter.put("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    // read json file
    const fileAsString = fileAsBuffer.toString();
    // convert JSON to string
    let fileAsJSONArray = JSON.parse(fileAsString);
    // read as an array

    const authorIndex = fileAsJSONArray.findIndex(author => author.id=== req.params.id);

    // get index of result to replace it

    if (!authorIndex == -1){
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});
    };

    // to delete entry

    const previousAuthorData = fileAsJSONArray[authorIndex]

    const changedAuthor = { ...previousAuthorData, ...req.body, updatedAt: new Date(), id: req.params.id}

    fileAsJSONArray[authorIndex] = changedAuthor

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));

    res.send(changedAuthor);
    
  } catch (error) {

    res.send(500).send({ message: error.message });

  }
});

// router.get('/*', (req, res) => {                       
//     res.sendFile(path.resolve(__dirname, '.../client/public/index.html',));                               
//   });

export default authorsRouter;
