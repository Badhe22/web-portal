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

app.post('/register', (req, res)=>{
    // To post / insert data into database

    const {email, password} = req.body;
    usersModel.findOne({email: email})
    .then(user => {
        if(user){
            res.json("Already registered")
        }
        else{
            usersModel.create(req.body)
            .then(user => res.json(user))
            .catch(err => res.json(err))
        }
    })
    
})

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});
app.post('/login', (req, res)=>{
    // To find record from the database
    const {email, password} = req.body;
    usersModel.findOne({email: email})
    .then(user => {
        if(user){
            // If user found then these 2 cases
            if(user.password === password) {
                res.json("Success");
            }
            else{
                res.json("Wrong password");
            }
        }
        // If user not found then 
        else{
            res.json("No records found! ");
        }
    })
})


const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});