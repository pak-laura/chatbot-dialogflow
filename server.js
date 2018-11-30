const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./db')

//IngredSchema = require('./models/IngredSchema')

const user = require('./routes/user.route');
// const mongoDB = process.env.MONGODB_URI || config.DB;
const mongoDB = config.DB;
mongoose.connect(mongoDB)
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));



const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/users', user);

const PORT = process.env.PORT || 1234;

app.listen(PORT, () => {
   console.log('server running on port ', PORT)
});