

import express from "express"

import layout from "./layout.js"

import mongoose from "mongoose"

import User from "./model/user.js"

import Item from "./model/item.js"

import cookieParser from "cookie-parser"

import bcrypt from "bcrypt"

import dotenv from "dotenv"

dotenv.config()

try{

    await mongoose.connect(process.env.URI)

    console.log("db connected")
}
catch(error){

    console.log(error)
}

const serverRouter = express.Router()

serverRouter.use(express.json())

serverRouter.use(cookieParser())

/* ------------------------------ index page ------------------------------ */

serverRouter.get("/", async (req, res) => {

    const stringId = req.cookies?.userId

    const data = {

        user: null,

        itemList: []
    }

    if(stringId){

        const objectId = new mongoose.Types.ObjectId(stringId) 

        const user = await User.findOne({ _id: objectId })

        const items = await Item.find({ userId: stringId })

        data.user = user.email

        data.itemList = items
    }
 
    const param = {

        title: "Home",

        description: "My awesome home page",

        data: data        
    }

    res.send(layout(param))
})

/* ------------------------------ api ------------------------------ */

// signup

serverRouter.post("/api/signup", async (req, res) => {

    const body = req.body

    // check email and password validity.

    const passwordReg = /^.{8,}$/ // 8 characters at least

    const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

    if(!emailReg.test(body.email)){

        res.json({

            error:{

                message: "invalid email"
            },

            data: null
        })
    }
    
    else if(!passwordReg.test(body.password)){

        res.json({

            error:{

                message: "password must be at least 8 characters"
            },

            data: null
        })
    }

    else {

        // checking if email already in use
    
        const user = await User.findOne({ email: body.email })
    
        if(user){
    
            res.json({
    
                error:{
    
                    message: "email already in use"
                },
    
                data: null
            })
        }

        else{

            // creating new user
        
            const hashPassword = await bcrypt.hash(body.password, 10)
            
            await User.create({
        
                email: body.email,
        
                password: hashPassword
            })
        
            res.json({
        
                error: null,
        
                data: null
            })
        }
    }
})

// login

serverRouter.post("/api/login", async (req, res) => {

    const body = req.body

    const user = await User.findOne({ email: body.email })

    if(!user){

        res.json({

            error:{
                
                message: "can't find email"
            },

            data: null
        })
    }

    else{

        const match = await bcrypt.compare(body.password, user.password)
    
        if(!match){
    
            res.json({
    
                error: {
    
                    message: "password not matching"
                },
    
                data: null
            })
        }

        else{

            const userId = user._id.toString()
        
            const items = await Item.find({ userId: userId })
        
            res.cookie("userId", userId, { httpOnly: true })
        
            res.json({
        
                error: null,
        
                data: {
        
                    user: user.email,
        
                    itemList: items
                }
            })
        }
    }
})

// add item

serverRouter.post("/api/add-item", async (req, res) => {

    const userId = req.cookies.userId

    const body = req.body

    if(!body.name.trim()){

        res.json({

            error:{

                message: "item name is required"
            },

            data: null
        })
    }

    else{

        const item = new Item({

            name: body.name,

            userId: userId
        })

        await item.save()

        res.json({

            error: null,

            data: item
        })
    }
})

// rename item

serverRouter.post("/api/rename-item", async (req, res) => {

    const body = req.body

    if(!body.name.trim()){

        res.json({

            error: {

                message: "item name required"
            },

            data: null
        })
    }
    else{

        const item = await Item.findOne({ _id: body.item._id }) 

        item.name = body.name.trim()

        await item.save()

        res.json({

            error: null,

            data: null
        })
    }
})

// logout

serverRouter.post("/api/logout", (req, res) => {

    res.clearCookie("userId")

    res.json({

        error: null,

        data: null
    })
})

// delete item

serverRouter.post("/api/delete-item", async (req, res) => {

    const body = req.body
    
    for(let i=0; i<body.items.length; i++){

        await Item.deleteOne({ _id: body.items[i]._id })
    }

    res.json({

        error: null,

        data: null
    })
})

// set active

serverRouter.post("/api/set-active", async (req, res) => {

    const body = req.body

    for(let i=0; i<body.items.length; i++){

        const item = await Item.findOne({ _id: body.items[i]._id })

        item.status = "active"

        await item.save()
    }

    res.json({

        error: null,

        data: null
    })

})

// set complete

serverRouter.post("/api/set-complete", async (req, res) => {

    const body = req.body

    for(let i=0; i<body.items.length; i++){

        const item = await Item.findOne({ _id: body.items[i]._id })

        item.status = "complete"

        await item.save()
    }

    res.json({

        error: null,

        data: null
    })

})

export default serverRouter

