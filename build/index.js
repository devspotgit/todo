

import express from "express"

import path from "path"

import { fileURLToPath } from "url"

import serverRouter from "../src/server_router.js"

import mongoose from "mongoose"

// import dotenv from "dotenv"


const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()


// dotenv.config()


try{

    await mongoose.connect(process.env.URI)

    console.log("db connected")
}
catch(error){

    console.log(error)
}



app.use(express.static(path.join(__dirname, "..", "dist", "public")))

app.use("/", serverRouter)

app.listen(process.env.PORT, () => console.log("server listening on port "+process.env.PORT))







