const express = require('express');
const mongoose = require ('mongoose');
const app = express();

//parsing json data
app.use(express.json());
app.use(express.urlencoded({ extended : true }));


//Connecting to database
const db = require('./config/keys').mongoURI;
console.log(db);

mongoose.connect(db)
.then(() => console.log("Mongo Db Connected"))
.catch(() => console.log("Mongo Db Not Connected"));

const userRouter = require('./routes/api/users');

app.use('/api/v1/users' , userRouter);

//Setting up Port
const port = process.env.PORT || 5000;

app.listen(port, ()=> console.log(`Now serving at port ${port}`))
 
