require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const mysql = require('mysql2');
const session = require('express-session');
const moment = require('moment-timezone');

const {
  toDateString,
  toDatetimeString,
} = require(__dirname + '/modules/date-tools');
// const { Logger } = require('concurrently');
// const path = require("path");

const db = require(__dirname + '/modules/mysql_connect.js'); //資料庫連線的模組
const MysqlStore = require("express-mysql-session")(session);//把session存進這裡。
const sessionStore = new MysqlStore({},db);//這裡三個步驟逝固定的。建立sessionStore
//在這裡做同一管理，為了其他的頁面也可以做到相同的連線。

//view engine setup
app.set("view engine", "ejs");


app.use(session({
  saveUninitialized: false,
  resave: false,
  secret:'dkfdl12fewv923fdmks202r12', // 加密cookie用的
  store: sessionStore, //因建立了資料庫。所以cookie會把加密用代號存到sql裡面，設立叫store
  cookie:{
      maxAge: 1200000,//毫秒 這樣兩分鐘
   }, //這裡可以設定cookie存活的時間。

}));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => { 
    // res.locals.admin = "hello";
    // Template Helper Function
  res.locals.toDateString = toDateString;
  res.locals.toDatetimeString = toDatetimeString;
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
      req.session.admin = {
        sid: r1[0].sid,
        username: r1[0].username,
      };
    }
    res.json(output);
    });
  
  app.get('/logout', (req, res) => {
    delete req.session.admin;
    res.redirect("/");
  });

app.route('/update')
  .get(async (req, res) => { 
    res.render('update');
  })
  .post(async(req, res) => { 

  })

app.use('/Namelist', require(__dirname + '/router/NameList'))
app.use('/Menulist', require(__dirname + '/router/MenuList'))

// app.get("/Menulist",(req, res) => {
//     res.render('menulist');
// });




app.use((req, res) => {
    res.send(`
    <img src="/img/404-01.png" alt="" width="100%" />`);
});
app.listen(process.env.PORT, () => {
    console.log(`server started: ${process.env.PORT}`);
    console.log({ NODE_ENV: process.env.NODE_ENV});
});

