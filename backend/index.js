const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json);

const PORT = 4000; //backend routering port
app.listen(PORT, () => { 
    console.log('Server is Running on port ${PORT}.');
})