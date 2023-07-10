const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const router = require('./routers');
const path = require('path');
const cors = require("cors");
const dotenv = require('dotenv');

dotenv.config();
app.use(express.json());
// Cho phép những trang nào đc quy định truy cập vào
app.use(cors({
    origin: "*"
}));
app.use(morgan("combined"));
app.use(router);
app.use(express.static(path.join(__dirname, 'data')));

app.listen (PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});