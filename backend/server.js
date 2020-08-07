const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')

require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// const uri = process.env.ATLAS_URI;
const uri = "mongodb+srv://admin:admin@cluster0.1jdeg.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log("MongoDB connection established")
})

const surveysRouter = require('./routes/surveys');

app.use('/surveys', surveysRouter);

app.listen(port, ()=>{
    console.log(`Server is running on port: ${port}`);
})