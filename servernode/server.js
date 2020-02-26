const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser : true,useUnifiedTopology: true, useCreateIndex : true});

const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const answerRouter = require('./routes/answer');
const remarkRouter = require('./routes/remark');
const userRouter = require('./routes/user');
const reportRouter = require('./routes/report');
const notificationRouter = require('./routes/notification');

//app.use('/answers', answerRouter);
//app.use('/remarks', remarkRouter);
//app.use('/users', userRouter);
//app.use('/reports', reportRouter);
//app.use('/notifications', notificationRouter);

app.listen(port, () => {
    console.log(`Server is running on port : ${port}`);
});