import fs from "fs-extra"
import { fileURLToPath } from "url"
import { dirname, join } from "path"

const { readJSON, writeJSON, writeFile } = fs

const authorsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../authors/authors.json")
const blogsJSONPath = join(dirname(fileURLToPath(import.meta.url)), "../blog-posts/blog-posts.json")
const authorsPublicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../Public/Img/users") 
const coversPublicFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../../Public/Img/covers")

// export const getUsers = () => readJSON(usersJSONPath)
// export const getBooks = () => readJSON(booksJSONPath)

export const writeAuthors = content => writeJSON(authorsJSONPath, content)
export const writeBlogs = content => writeJSON(blogsJSONPath, content)

export const getCurrentFolderPath = currentFile => dirname(fileURLToPath(currentFile))

export const writeAuthorsPicture = (fileName, content) => writeFile(join(authorsPublicFolderPath, fileName), content)
export const writeBlogCover = (fileName, content) => writeFile(join(coversPublicFolderPath, fileName), content)
