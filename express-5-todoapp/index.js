const express = require("express");
const app = express();
const { UserModel,TodoModel } = require('./db');
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomString";
const mongoose = require("mongoose");
const authMiddleware = require("./middlewares/auth")

mongoose.connect("mongodb+srv://admin:admin@cluster0.ekgk2.mongodb.net/todo-webapp")

app.use(express.json());

app.post("/signup",async (req,res)=>{
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    await UserModel.create({
        email:email,
        password:password,
        name:name
    });

    res.json({
        message : 'You are signed up'
    })
});

app.post("/signin",async(req,res)=>{
    const email = req.body.email;
    const password = req.body.password;

    const user = await UserModel.findOne({
        email:email,
        password:password
    });

    if(user){
        const token = jwt.sign({
            id: user._id.toString()
        },JWT_SECRET);
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message : 'Incorrect details'
        })
    }
});

app.post("/todo",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const title = req.body.title;

    console.log(userId);
    console.log(title);
    
    

    const todo = await TodoModel.create({
        title:title,
        userId: userId
    });

    console.log(todo.title);
    

    res.json({
        message:"sucess"
    })
});


app.get("/todos",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    
    try {
        // Specify only the fields you want to return using projection: 'title _id'
        const todos = await TodoModel.find({ userId: userId }, 'title _id');

        res.json({
            todos: todos  // This will now only include title and _id
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching todos" });
    }
});

app.listen(3000);
