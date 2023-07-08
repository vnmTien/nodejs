const express = require('express');
const app = express();
const PORT = 3000;

const a = 5;
const b = 6; 


app.listen(PORT, () => {
    console.log('Server is listening on http://localhost:' + PORT)
});