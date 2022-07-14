const path = require('path');
const { decodeBase64 } = require('bcryptjs');
const express = require('express');
const db = require(__dirname + "/../modules/mysql_connect");
const route = express.Router();


// Create and save new thing
exports.create = (req, res) => { 
  //validate request
    
}

//retreve and returan all menu / retrieve and return a single menu
exports.find = (req, res) => { 

}

//update an new idetified menu by menu id
exports.update = (req, res) => { 

}

//delete the menu item
exports.delete = (req, res) => { 

}