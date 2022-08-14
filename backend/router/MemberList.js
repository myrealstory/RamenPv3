const express = require("express");
require("dotenv").config();

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const db = require(__dirname + "/../modules/mysql_connect");
const moment = require("moment-timezone");
const { toDateString, toDatetimeString } = require(__dirname +
  "/../modules/date-tools");
const Joi = require("joi");
const { application } = require("express");
const session = require("express-session");
const { route } = require("./MenuList");

const router = express.Router();
const app = express();

const getListHandler = async (req, res) => {
  let output = {
    perPage: 5,
    page: 1,
    totalRows: 0,
    totalPage: 0,
    code: 0,
    query: {},
    rows: [],
  };

  let page = +req.query.page || 1;
  let beginDate = req.query.beginDate || "";
  let endDate = req.query.endDate || "";

  let search = req.query.search || "";
  let where = " WHERE 1";

  if (search) {
    where += `AND name LIKE ${db.escape("%" + search + "%")}`;
    output.query.search = search;
    output.showTest = db.escape("%" + search + "%");
  }
  if (beginDate) {
    const mo = moment(beginDate);
    if (mo.isValid()) {
      where += `AND cart_created >= '${mo.format("YYYY-MM-DD")}' `;
      output.query.beginDate = mo.format("YYYY-MM-DD");
    }
  }

  if (endDate) {
    const mo = moment(endDate);
    if (mo.isValid()) {
      where += `AND cart_created >= '${mo.format("YYYY-MM-DD")}' `;
      output.query.endDate = mo.format("YYYY-MM-DD");
    }
  }

  if (page < 1) {
    output.code = 410;
    output.error = "頁碼太小";
    return output;
  }

  // const sql01 = `SELECT Count(1) totalRows FROM member ${where}`;
  // const sql01 = `SELECT Count(salesOrder,member.mobile,cart.username,product_id,quality,TotalPrice,cart_created) totalRows FROM cart JOIN member ON member.username = cart.username ${where}`;
  const sql01 = `SELECT Count(1) totalRows FROM member ${where}`;
  const [[totalRows]] = await db.query(sql01);
  let totalPages = 0;
  if (totalRows) {
    totalPages = Math.ceil(totalRows / output.perPage);
    if (page > totalPages) {
      output.totalPages = totalPages;
      output.code = 420;
      output.error = "頁碼太大";
      return res.redirect(`?page=${totalPages}`);
    }
    // const sql02 = `SELECT * FROM member ${where} ORDER BY sid ASC LIMIT ${(page - 1) * output.perPage},${output.perPage}`;
    const sql02 = `SELECT * FROM member ORDER BY sid ASC LIMIT ${
      (page - 1) * output.perPage
    },${output.perPage}`;
    // SELECT `salesOrder`,`member`.`mobile`,`cart`.`username`,`product_id`,`quality`,`TotalPrice`,`cart_created` FROM `cart` JOIN `member` ON `member`.`username` = `cart`.`username` ORDER BY `salesOrder` ASC;
    const [r2] = await db.query(sql02);
    r2.forEach(
      (element) => (element.cart_created = toDateString(element.cart_created))
    );
    output.rows = r2;
  }
  output.code = 200;

  output = { ...output, page, totalRows, totalPages };

  return output;
};

router.get("/main", async (req, res) => {
  const output = await getListHandler(req, res);
  switch (output.code) {
    case 410:
      return res.redirect(`?page=1`);
      break;
    case 420:
      return res.redirect(`?page=${output.totalPages}`);
      break;
  }
  // res.render('namelist/main', output);
  if (!req.session.admin) {
    res.render("namelist/no_main", output);
  } else {
    res.render("member/main", output);
  }
});

router.get('/login',async (req, res) => {
    res.render("member/login");
  })
  router.post('/login',async (req, res) => {
    const output = {
      success: false,
      error: "",
      code: 0,
      data: {},
    };
    const sql = "SELECT * FROM member WHERE username=?";
    const [r1] = await db.query(sql, [req.body.username]);
    if (!r1.length) {
      output.code = 401;
      output.error = "帳密錯誤";
      return res.json(output);
    }

    output.success = await bcrypt.compare(req.body.password, r1[0].password);
    if (!output.success) {
      output.code = 402;
      output.error = "密碼錯誤";
    } else {
      //成功登入
      const token = jwt.sign({
        sid: r1[0].sid,
        account: r1[0].username,
      }, process.env.JWT_SECRET);
      output.data = {
        token,
        sid: r1[0].sid,
        account: r1[0].username,
      };

      // req.session.admin = {
      //   sid: r1[0].sid,
      //   username: r1[0].username,
      // };
    }
    res.json(output);
  });

router.get('/register',async  (req, res) => { 
  res.render("member/register");
})
router.post('/register', async (req, res) => { 
  const output = {
    success: false,
    result : null,
  };

  const hash = await bcrypt.hash(req.body.password, 10);
  const Regsql = "INSERT INTO `member` SET ?";
  const inserReg = { ...req.body, created_at: new Date() ,password: hash };
  try{
    const [result] = await db.query(Regsql, [inserReg]);
  
  if (result.affectedRows) { 
    output.success = true,
    output.result = result
  }

  res.json(output);
  }catch(err){
    res.json(err);
  }
  
})

app.get("/logout", (req, res) => {
  delete req.session.admin;
  res.redirect("/login");
});

router.get("/api", async (req, res) => {
  const sqladmin = "SELECT * FROM member WHERE 1";
  const [output] = await db.query(sqladmin);
  res.json(output);
}); //如果是 /api的話就只呈現json格式




module.exports = router;
