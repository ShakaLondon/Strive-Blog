import path, { dirname, extname } from "path";

import { fileURLToPath } from "url";

import fs from "fs";

import multer from "multer";

import { v2 as cloudinary } from "cloudinary"
import { CloudinaryStorage } from "multer-storage-cloudinary"

const { CLOUDINARY_NAME, CLOUDINARY_KEY, CLOUDINARY_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
});

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

export const parseFile = multer({storage});

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

