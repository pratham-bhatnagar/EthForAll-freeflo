require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes/routes');
var cors = require('cors')
const mongoString = process.env.MONGO_URI;

mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
    console.log("Error:",error)
})
database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', routes);

app.listen(7878, () => {
    console.log(`Server Started at ${7878}`)
})