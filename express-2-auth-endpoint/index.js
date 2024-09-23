const express = require("express");

const app = express();

app.use(express.json());

const users =[];
function generateToken() {
    let options = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    let token = "";
    for (let i = 0; i < 32; i++) {
        // use a simple function here
        token += options[Math.floor(Math.random() * options.length)];
    }
    return token;
}

app.post('/signup',(req,res)=>{
    const username = req.body.username;
    const pass = req.body.password;

    if (users.find(u => u.username === username)){
        res.json({
            message:'You are already signed up'
        })
        return
    }
    users.push({
        username: username,
        password: pass
    })

    res.json({
        message:'You are signed up'
    })
});

app.post('/signin',(req,res)=>{
    const username = req.body.username;
    const pass = req.body.password;

    let foundUser = null;
    for(let i=0;i<users.length;i++){
        if(users[i].username == username && users[i].password == pass){
            foundUser = users[i];
        }
    }

    if(foundUser){
        const token = generateToken();
        foundUser.token =token;
        res.json({
            token:token
        })
    }else{
        res.status(403).send({
            message:'Invalid username or password'
        })
    }
});

app.get("/me", (req, res) => {
    const token = req.headers.authorization;
    const user = users.find(user => user.token === token);
    if (user) {
        res.send({
            username: user.username
        })
    } else {
        res.status(401).send({
            message: "Unauthorized"
        })
    }
})

app.listen(3000);