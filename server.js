const express = require('express');
const mongoose = require ('mongoose');
const app = express();
const cloudinary = require('cloudinary');

//parsing json data
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//Initializing Cloudinary
const cloudinaryConfig = require('./config/keys').cloudinaryConfig;
cloudinary.config(cloudinaryConfig);


//Connecting to database
const db = require('./config/keys').mongoURI;

mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("Mongo Db Connected"))
.catch(() => console.log("Mongo Db Not Connected"));

const userRouter = require('./routes/api/users');
const roomRouter = require('./routes/api/rooms');
const commentRouter = require('./routes/api/comments');
const notificationRouter = require('./routes/api/notifications');


app.use('/api/v1/users' , userRouter);
app.use('/api/v1/rooms' , roomRouter);
app.use('/api/v1/comments' , commentRouter);
app.use('/api/v1/notifications' , notificationRouter);

//Setting up Port
const port = process.env.PORT || 5000; 

app.listen(port, ()=> console.log(`Now serving at port ${port}`)) 

