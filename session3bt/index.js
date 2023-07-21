const express = require('express');
const router = require('./routers');
const app = express();
const PORT = 8000;
const morgan = require('morgan');
const path = require('path');
const cors = require("cors");
const dotenv = require('dotenv');
const { connectToDB } = require('./database');

dotenv.config();
app.use(cors({
    origin: "*"
}));
app.use(express.json());

connectToDB(); // connect to database
app.use(router);
app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'data')));


app.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});
