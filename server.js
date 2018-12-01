const express = require('express');
const mongoose = require ('mongoose');
const path = require('path');
const app = express();

//parsing json data
app.use(express.json());
app.use(express.urlencoded({ extended : true }));

//Connecting to database
const db = require('./config/keys').mongoURI; 

mongoose.connect(db, { useNewUrlParser: true })
.then(() => console.log("Mongo Db Connected"))
.catch(() => console.log("Mongo Db Not Connected"));

//Setting up api routes
const userRouter = require('./routes/api/users');
const roomRouter = require('./routes/api/rooms');
const commentRouter = require('./routes/api/comments');
const notificationRouter = require('./routes/api/notifications');

app.use('/api/v1/users' , userRouter);
app.use('/api/v1/rooms' , roomRouter);
app.use('/api/v1/comments' , commentRouter);
app.use('/api/v1/notifications' , notificationRouter);

//code to be run only in production
if (process.env.NODE_ENV === "production"){

    //Serving Static Files
    app.use(express.static('client/build'));

    //Responding to all requests that arent to an api with the index page
    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname , 'client', 'build', 'index.html'));
    })
}

//Setting up Port
const port = process.env.PORT || 6000;

app.listen(port, ()=> console.log(`Now serving at port ${port}`)) 

