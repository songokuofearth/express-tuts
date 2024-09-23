const express = require("express");

const app = express();

const authMiddleware = require("./middlewares/auth");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "randomString";

app.use(express.json());

const users = [];

app.post('/signup', (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;

    if (users.find(u => u.username === username)) {
        res.json({
            message: 'You are already signed up'
        });
        return;
    }

    users.push({
        username: username,
        password: pass
    });

    res.json({
        message: 'You are signed up'
    });
});

app.post('/signin', (req, res) => {
    const username = req.body.username;
    const pass = req.body.password;

    let foundUser = null;
    for (let i = 0; i < users.length; i++) {
        if (users[i].username == username && users[i].password == pass) {
            foundUser = users[i];
        }
    }

    if (foundUser) {
        const token = jwt.sign({
            username: username
        }, JWT_SECRET, { expiresIn: '1h' }); // Token with expiration
        res.json({
            token: token
        });
    } else {
        res.status(403).send({
            message: 'Invalid username or password'
        });
    }
});

app.get("/me", authMiddleware, (req, res) => {
    const { username } = req.user; // Accessing decoded information from middleware

    const foundUser = users.find(user => user.username === username);

    if (foundUser) {
        res.send({
            username: foundUser.username
            // Password removed from response for security reasons
        });
    } else {
        res.status(401).send({
            message: "Unauthorized"
        });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
