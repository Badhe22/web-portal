const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const usersModel= require('./Models/Users')


const app = express()
app.use(express.json())
app.use(cors(
    
    {
            origin:["http://localhost:5173"],
            method:["GET","POST"],
            credentials:true
        }
    
        
    
    ))

//for database connectivity
mongoose.connect("mongodb://127.0.0.1:27017/users");

app.post("/login", (req, res) => {
    const {email, password} = req.body;
    usersModel.findOne({email : email})
    .then(user => {
        if(user) {
            if(user.password === password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

//for creating user model in mongodb
app.post("/register", (req, res) => {
  usersModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});