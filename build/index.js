


import layout from "../src/layout.js"

import express from "express"

import path from "path"

import { fileURLToPath } from "url"

import api from "../src/api.js"

import dotenv from "dotenv"


const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()


dotenv.config()


app.use(express.static(path.join(__dirname, "..", "dist", "public")))

app.use("/api", api)

app.use((req, res) => {

    const params = {

        title: "Todo",

        description: "My awesome todo app",

        data: { username: "Patrick" }
    }

    res.send(layout(params))
})

app.listen(process.env.PORT, () => console.log("server listening on port "+process.env.PORT))







