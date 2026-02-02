// build/index.js
import express2 from "express";
import path from "path";
import { fileURLToPath } from "url";

// src/server_router.js
import express from "express";

// src/layout.js
function layout({ title, description, data }) {
  return `   
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="description" content="${description}">
            <link rel="stylesheet" href="/main.css">
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css">
            <title>${title}</title>
        </head>
        <body>
            <div id="root"></div>
            <script>
                const __data = ${JSON.stringify(data)}
            </script>
            <script src="/main.js" type="module"></script>
        </body>
        </html>
    `;
}

// src/server_router.js
import mongoose3 from "mongoose";

// src/model/user.js
import mongoose from "mongoose";
var userSchema = new mongoose.Schema({
  email: String,
  password: String
});
var User = mongoose.model("User", userSchema);
var user_default = User;

// src/model/item.js
import mongoose2 from "mongoose";
var itemSchema = new mongoose2.Schema({
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
});
var Item = mongoose2.model("Item", itemSchema);
var item_default = Item;

// src/server_router.js
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
var serverRouter = express.Router();
serverRouter.use(express.json());
serverRouter.use(cookieParser());
serverRouter.get("/", async (req, res) => {
  const stringId = req.cookies?.userId;
  const data = {
    user: null,
    itemList: []
  };
  if (stringId) {
    const objectId = new mongoose3.Types.ObjectId(stringId);
    const user = await user_default.findOne({ _id: objectId });
    const items = await item_default.find({ userId: stringId });
    data.user = user.email;
    data.itemList = items;
  }
  const param = {
    title: "Home",
    description: "My awesome home page",
    data
  };
  res.send(layout(param));
});
serverRouter.post("/api/signup", async (req, res) => {
  const body = req.body;
  const passwordReg = /^.{8,}$/;
  const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailReg.test(body.email)) {
    res.json({
      error: {
        message: "invalid email"
      },
      data: null
    });
  } else if (!passwordReg.test(body.password)) {
    res.json({
      error: {
        message: "password must be at least 8 characters"
      },
      data: null
    });
  } else {
    const user = await user_default.findOne({ email: body.email });
    if (user) {
      res.json({
        error: {
          message: "email already in use"
        },
        data: null
      });
    } else {
      const hashPassword = await bcrypt.hash(body.password, 10);
      await user_default.create({
        email: body.email,
        password: hashPassword
      });
      res.json({
        error: null,
        data: null
      });
    }
  }
});
serverRouter.post("/api/login", async (req, res) => {
  const body = req.body;
  const user = await user_default.findOne({ email: body.email });
  if (!user) {
    res.json({
      error: {
        message: "can't find email"
      },
      data: null
    });
  } else {
    const match = await bcrypt.compare(body.password, user.password);
    if (!match) {
      res.json({
        error: {
          message: "password not matching"
        },
        data: null
      });
    } else {
      const userId = user._id.toString();
      const items = await item_default.find({ userId });
      res.cookie("userId", userId, { httpOnly: true });
      res.json({
        error: null,
        data: {
          user: user.email,
          itemList: items
        }
      });
    }
  }
});
serverRouter.post("/api/add-item", async (req, res) => {
  const userId = req.cookies.userId;
  const body = req.body;
  if (!body.name.trim()) {
    res.json({
      error: {
        message: "item name is required"
      },
      data: null
    });
  } else {
    const item = new item_default({
      name: body.name,
      userId
    });
    await item.save();
    res.json({
      error: null,
      data: item
    });
  }
});
serverRouter.post("/api/rename-item", async (req, res) => {
  const body = req.body;
  if (!body.name.trim()) {
    res.json({
      error: {
        message: "item name required"
      },
      data: null
    });
  } else {
    const item = await item_default.findOne({ _id: body.item._id });
    item.name = body.name.trim();
    await item.save();
    res.json({
      error: null,
      data: null
    });
  }
});
serverRouter.post("/api/logout", (req, res) => {
  res.clearCookie("userId");
  res.json({
    error: null,
    data: null
  });
});
serverRouter.post("/api/delete-item", async (req, res) => {
  const body = req.body;
  for (let i = 0; i < body.items.length; i++) {
    await item_default.deleteOne({ _id: body.items[i]._id });
  }
  res.json({
    error: null,
    data: null
  });
});
serverRouter.post("/api/set-active", async (req, res) => {
  const body = req.body;
  for (let i = 0; i < body.items.length; i++) {
    const item = await item_default.findOne({ _id: body.items[i]._id });
    item.status = "active";
    await item.save();
  }
  res.json({
    error: null,
    data: null
  });
});
serverRouter.post("/api/set-complete", async (req, res) => {
  const body = req.body;
  for (let i = 0; i < body.items.length; i++) {
    const item = await item_default.findOne({ _id: body.items[i]._id });
    item.status = "complete";
    await item.save();
  }
  res.json({
    error: null,
    data: null
  });
});
var server_router_default = serverRouter;

// build/index.js
import mongoose4 from "mongoose";
var __filename = fileURLToPath(import.meta.url);
var __dirname = path.dirname(__filename);
var app = express2();
try {
  await mongoose4.connect(process.env.URI);
  console.log("db connected");
} catch (error) {
  console.log(error);
}
app.use(express2.static(path.join(__dirname, "..", "dist", "public")));
app.use("/", server_router_default);
app.listen(process.env.PORT, () => console.log("server listening on port " + process.env.PORT));
