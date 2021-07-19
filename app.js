const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose')
const passport = require('passport')
const users = require("./routes/api/users")
const questions = require("./routes/api/questions")

mongoose
.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users)
app.use("/api/questions", questions)


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`))
