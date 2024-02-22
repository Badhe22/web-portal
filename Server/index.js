const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const usersModel = require('./Models/Users');
const bcrypt = require('bcrypt');

const app = express();
app.use(express.json());
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/users");

const secretKey = 'secret';

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Forbidden' });
        }

        req.user = user;
        next();
    });
};

app.post('/register', (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    usersModel.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: "Email already registered" });
            }

            bcrypt.hash(password, 10, (err, hash) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                usersModel.create({ firstName, lastName, email, password: hash })
                    .then(user => res.json({ message: "Registration successful" }))
                    .catch(err => {
                        console.error(err);
                        res.status(500).json({ error: "Internal Server Error" });
                    });
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    usersModel.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "Incorrect email or password" });
            }

            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: "Internal Server Error" });
                }

                if (result) {
                    const token = jwt.sign({ email: user.email }, secretKey);
                    return res.json({ message: "Success", token });
                } else {
                    return res.status(400).json({ message: "Incorrect email or password" });
                }
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).json({ error: "Internal Server Error" });
        });
});

app.get("/", (req, res) => {
    res.send("Server is running successfully!");
});

app.get("/protected", authenticateJWT, (req, res) => {
    res.json({ message: "This is a protected route" });
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
