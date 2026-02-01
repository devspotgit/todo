

import mongoose from "mongoose"

const itemSchema = new mongoose.Schema({

    name: String,

    status: {

        type: String,

        default: "active"
    },

    selected: {
        
        type: Boolean,

        default: false
    },

    userId: String
})

const Item = mongoose.model("Item", itemSchema)

export default Item



