

import fs from "fs"

import path from "path"

import { fileURLToPath } from "url"

import esbuild from "esbuild"

import vue from "esbuild-plugin-vue3"


const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const rootDir = path.join(path.join(__dirname, "..", "dist"))


if(fs.existsSync()) fs.rmSync(rootDir, { recursive: true, force: true })


await esbuild.build({

    entryPoints: [path.join(__dirname, "..", "src", "client.js")],

    bundle: true,

    outfile: path.join(rootDir, "public", "main.js"),

    plugins: [vue()],

    platform: "browser",

    format: "esm",

    define: {

        "process.env.NODE_ENV": '"production"',
    },
})

await esbuild.build({

    entryPoints: [path.join(__dirname, "..", "src", "app", "style.css")],

    bundle: true,

    platform: "browser",

    outfile: path.join(rootDir, "public", "main.css")
})

await esbuild.build({

    entryPoints: [path.join(__dirname, "index.js")],

    bundle: true,

    outfile: path.join(rootDir, "index.js"),

    platform: "node",

    format: "esm",

    packages: "external"
})

