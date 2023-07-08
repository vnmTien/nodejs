const express = require('express');
const app = express();
const PORT = 3000;
const morgan = require('morgan');
const router = require('./routers');
const path = require('path');

app.use(express.json());
app.use(morgan("combined"));
app.use(router);
app.use(express.static(path.join(__dirname, 'data')));

app.listen (PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});