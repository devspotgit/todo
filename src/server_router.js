

import express from "express"

import layout from "./layout.js"

const serverRouter = express.Router()

const data = {

    user: "Patrick",

    itemList: [

        { id: 0, name: "do my homework", status: "active", selected: false },
        { id: 1, name: "do my homework", status: "active", selected: false },
        { id: 2, name: "do my homework", status: "active", selected: false },
        { id: 3, name: "do my homework", status: "active", selected: false },
        { id: 4, name: "do my homework", status: "active", selected: false },
        { id: 5, name: "do my homework", status: "active", selected: false },
        { id: 6, name: "do my homework", status: "active", selected: false },
        { id: 7, name: "do my homework", status: "active", selected: false },
    ]
}

serverRouter.get("/", (req, res) => {

    const param = {

        title: "Home",

        description: "My awesome home page",

        data: data        
    }

    res.send(layout(param))
})

export default serverRouter

