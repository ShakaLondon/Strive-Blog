import express from "express";

import fs from "fs";
// USE FS TO DELETE THE FILE

import path, { dirname } from "path";
import { fileURLToPath } from "url";
// USE TO LOCATE FILE

import uniqid from "uniqid";

// ASIGN ID TO JSON ENTRY

// GET ALL AUTHORS

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// DIRECT TO FILE PATH

const authorsFilePath = path.join(__dirname, "authors.json");
const router = express.Router();

// CAPITAL LETTER FOR ROUTER!!



router.get("/", async (req, res, next) => {
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

router.post("/", async (req, res, next) => {
  try {
    const { name, surname, email, dateOfBirth } = req.body;

    const author = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    const fileAsJSONArray = JSON.parse(fileAsString);

    fileAsJSONArray.push(author);

    fs.writeFileSync(authorsFilePath, JSON.stringify(fileAsJSONArray));

    res.send(author);
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// GET ONE AUTHOR

router.get("/:id", async (req, res, next) => {
  try {
    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    // read json file
    const fileAsString = fileAsBuffer.toString();
    // convert JSON to string
    const fileAsJSONArray = JSON.parse(fileAsString);
    // read as an array

    const author = fileAsJSONArray.find(author => author.id=== req.params.id)

    if (!author){
        res
        .status(404)
        .send({message: `Author with ${req.params.id} is not found!`});
        return;
    }

    res.send(author)
    
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// DELETE AUTHOR

router.delete("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// GET UPDATE AUTHOR

router.put("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    res.send(500).send({ message: error.message });
  }
});

// router.get('/*', (req, res) => {                       
//     res.sendFile(path.resolve(__dirname, '.../client/public/index.html',));                               
//   });

export default router;
