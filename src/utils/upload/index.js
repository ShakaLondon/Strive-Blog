import path, { dirname, extname } from "path";

import { fileURLToPath } from "url";

import fs from "fs";

import multer from "multer";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const userDirectory = path.join(__dirname, "../../../Client/public/img/users");
const coverDirectory = path.join(__dirname, "../../../Client/public/img/covers");

// const storage = multer.diskStorage({

//   destination: function (req, file, cb) {

//     cb(null, '../../../Client/Public/Img/users')
//   },


//   filename: function (req, file, cb) {

//     let filename = 'avatar';
//      req.body.file = filename

//     cb(null, filename)
//   }
// })

export const parseFile = multer();

export const userUploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    console.log(req.file)
    const extension = extname(originalname);
    console.log(extension)
    const fileName = `${req.params.id}${extension}`;
    console.log(fileName)
    console.log(userDirectory)
    const pathToFile = path.join(userDirectory, fileName);
    fs.writeFileSync(pathToFile, buffer);
    console.log(pathToFile)
    const link = `http://localhost:3000/public/img/users/${fileName}`;
    req.file = link;
    next();
  } catch (error) {
    next(error);
  }
};

export const coverUploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    console.log(req.file)
    const extension = extname(originalname);
    console.log(extension)
    const fileName = `${req.params.id}${extension}`;
    console.log(fileName)
    console.log(userDirectory)
    const pathToFile = path.join(coverDirectory, fileName);
    fs.writeFileSync(pathToFile, buffer);
    console.log(pathToFile)
    const link = `http://localhost:3000/public/img/covers/${fileName}`;
    req.file = link;
    next();
  } catch (error) {
    next(error);
  }
};

