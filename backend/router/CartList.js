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
const multer = require("multer");

const upload = multer();
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
      where += `AND Cart_Created >= '${mo.format("YYYY-MM-DD")}' `;
      output.query.beginDate = mo.format("YYYY-MM-DD");
    }
  }

  if (endDate) {
    const mo = moment(endDate);
    if (mo.isValid()) {
      where += `AND Cart_Created >= '${mo.format("YYYY-MM-DD")}' `;
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
  const sql01 = `SELECT Count(1) totalRows FROM order_list JOIN order_detail ${where}`;
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
    const sql02 = `SELECT * FROM order_list JOIN order_detail ORDER BY order_list.SID ASC LIMIT ${
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

router.get("/", async (req, res) => {
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
    res.render("cartList/main", output);
  }
});

router.post("/CreateCart", async (req, res) => {
  const output = {
    success: false,
    success2:false,
    result1: null,
    result2:null,
  };
  const fetchin = req.body;
  // console.log(fetchin);
  const pushOrderList = `INSERT INTO order_list SET ?`;
  // const pushOrderList = 'INSERT INTO `order_list` (`username`,`Total_Price`,`Cart_Created`,`status`,`Discount`) VALUES (?,?,?,?,?)'
  const pushOrderDetail = `INSERT INTO order_detail SET ?`;
  const detailOrderList = {
    username: fetchin.username,
    Total_Price: fetchin.Total_Price,
    Cart_Created: new Date(),
    status: fetchin.status,
    Discount: fetchin.Discount? +fetchin.Discount : 0,
  };
  try {
    const [result1] = await db.query(pushOrderList, [detailOrderList]);
    // console.log(result1);
    const r1sid = result1.insertId;
    // console.log(r1sid);
    for (let i of fetchin.OrderDetail) {

      const detailOrderDetail = {
        Sales_Order: r1sid,
        product_sid: i.product_sid,
        username: fetchin.username,
        amount: i.quantity,
        price_amount: i.itemTotal,
        Create_at: new Date(),
      };
      
      const [result2] = await db.query(pushOrderDetail, [detailOrderDetail]);
      // console.log(result2);
      if (result2.affectedRows) { 
        output.success2 = true;
        output.result2 = result2;
      }
    }

    if (result1.affectedRows) {
      output.success = true;
      output.result1 = result1;
    }

    res.json(output);
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
