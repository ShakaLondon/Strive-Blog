import path, { dirname, extname } from "path";

import { fileURLToPath } from "url";

import fs from "fs";

import multer from "multer";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const usersPublicDirectory = path.join(__dirname, "../../Client/public/img/users");

export const parseFile = multer();

export const userUploadFile = (req, res, next) => {
  try {
    const { originalname, buffer } = req.file;
    const extension = extname(originalname);
    const fileName = `${req.params.id}${extension}`;
    const pathToFile = path.join(usersPublicDirectory, fileName);
    fs.writeFileSync(pathToFile, buffer);
    const link = `http://localhost:3000/${fileName}`;
    req.file = link;
    next();
  } catch (error) {
    next(error);
  }
};