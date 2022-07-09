require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const mysql = require('mysql2');
const session = require('express-session');
// const { Logger } = require('concurrently');
// const path = require("path");

const db = require(__dirname + '/modules/mysql_connect.js'); //資料庫連線的模組
const MysqlStore = require("express-mysql-session")(session);//把session存進這裡。
const sessionStore = new MysqlStore({},db);//這裡三個步驟逝固定的。建立sessionStore
//在這裡做同一管理，為了其他的頁面也可以做到相同的連線。

//view engine setup
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => { 
    res.locals.admin = "hello";
    res.locals.session = req.session;

    next();
})




// // ------------------static folder----------------------
app.use(express.static('public'));
app.use('/bootstrap', express.static("node_modules/bootstrap/dist"));
app.use('/joi', express.static("node_modules/joi/dist"));



// -----------------404---------------
app.route("/")
    .get(async (req, res) => {
    res.render("login");
    })
    .post(async (req, res) => {
    const output = {
      success: false,
      error: '',
      code: 0,
    };
    const sql = "SELECT * FROM admin WHERE username=?";
    const [r1] = await db.query(sql, [req.body.username]);
    if (! r1.length) {
      output.code = 401;
      output.error = "帳密錯誤";
      return res.json(output);
    }
  
    output.success = await bcrypt.compare(req.body.password, r1[0].password);
    if (!output.success) {
      output.code = 402;
      output.error = "密碼錯誤";
    } else {
    //   res.session.admin = {
    //     sid: r1[0].sid,
    //     account: r1[0].username,
    //   }
    }
    res.json(output);
  });

app.get("/main",(req, res) => {
    res.render("main");
});

app.get("/FoodMenu",(req, res) => {
    res.send(`
    <h2>Here gonna build Menu part</h2>`);
});




app.use((req, res) => {
    res.send(`
    <img src="/img/404-01.png" alt="" width="100%" />`);
});
app.listen(process.env.PORT, () => {
    console.log(`server started: ${process.env.PORT}`);
    console.log({ NODE_ENV: process.env.NODE_ENV});
});