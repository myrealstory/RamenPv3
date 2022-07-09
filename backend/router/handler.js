const express = require('express')
const app = express()
const router = express.Router();

router.get('/FoodMenu', (req, res) => { 
    const str = [{
        "name": "Gordon Chung",
        "msg": "this is my first FoodMenu",
        "username":"admin",
    }];
    res.end(JSON.stringify(str));
})

router.post('/addFood', (req, res) => {
    res.end('NA');
});

module.exports = router;

