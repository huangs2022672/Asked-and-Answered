const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./config/keys').mongoURI;
const mongoose = require('mongoose');
const passport = require('passport');
const users = require("./routes/api/users");
const questions = require('./routes/api/questions')
const path = require('path');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));
  app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  })
}

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
