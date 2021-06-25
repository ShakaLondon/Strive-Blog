import express from "express";

import fs from "fs";
// USE FS TO DELETE THE FILE

import path, { dirname } from "path";
import { fileURLToPath } from "url";
// USE TO LOCATE FILE

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// DIRECT TO FILE PATH

const authorsFilePath = path.join(__dirname, "authors.json");
const router = express.Router();

// CAPITAL LETTER FOR ROUTER!!

import uniqid from "uniqid";

// ASIGN ID TO JSON ENTRY

// GET ALL AUTHORS

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

    const { name, surname, email, dateOfBirth } = req.body();

    const author = {
      id: uniqid(),
      name,
      surname,
      email,
      dateOfBirth,
      createdAt: new Date(),
      updatedAt: new Date(),
      avatar: `https://ui-avatars.com/api/?name=${name}+${surname}`,
    };

    const fileAsBuffer = fs.readFileSync(authorsFilePath);
    // read json file
    const fileAsString = fileAsBuffer.toString();
    // convert JSON to string
    const fileAsJSONArray = JSON.parse(fileAsString);
    // read as an array
    fileAsJSONArray.push(author);
    // what you want to add to the array - push to array
    fs.writeFileSync(authorsFilePath.JSON.stringify(fileAsJSONArray));
    // read as string so write as string
    res.send(author);

  } catch (error) {
    res.sendStatus(500).send({ message: error.message });
  }
});

// GET ONE AUTHOR

router.get("/:id", async (req, res, next) => {
  try {
  } catch (error) {
    res.sendStatus(500).send({ message: error.message });
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

export default router;
