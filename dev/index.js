
import layout from "../src/layout.js"

import esbuild from "esbuild"

import vue from "esbuild-plugin-vue3"

import express from "express"

import path from "path"

import { fileURLToPath } from "url"

import api from "../src/api.js"

import dotenv from "dotenv"


const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const app = express()


dotenv.config()


app.use("/api", api)

app.use( async (req, res, next) => {

    const filename = req.url.split("/")[1]

    const ext = filename.split(".")[1]

    if(ext == "js"){

        const result = await esbuild.build({

            entryPoints: [path.join(__dirname, "..", "src", "client.js")],

            bundle: true,

            sourcemap: true,

            write: false,

            plugins: [vue()],

            platform: "browser",

            format: "esm",

            define: {

                "process.env.NODE_ENV": '"production"',
            },
        })

        res.setHeader("Content-Type", "application/javascript")

        res.send(result.outputFiles[0].text)

    }
    else if(ext == "css"){
         
        const result = await esbuild.build({

            entryPoints: [path.join(__dirname, "..", "src", "app", "style.css")],

            bundle: true,

            platform: "browser",

            write: false,
        })

        res.setHeader("Content-Type", "text/css")

        res.send(result.outputFiles[0].text)
    }
    else{

        next()
    }
})


app.use((req, res) => {

    const params = {

        title: "Todo",

        description: "My awesome todo app",

        data: { username: "Patrick" }
    }

    res.send(layout(params))
})

app.listen(process.env.PORT, () => console.log("server listening on port "+process.env.PORT))







