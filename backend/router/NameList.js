const express = require('express');

const db = require(__dirname + '/modules/mysql_connect');
const moment = require('moment-timezone');
const { toDateString,
    toDatetimeString, } = require(__dirname + '/../modules/date-tools');
const Joi = require('joi');
const { application } = require('express');
const session = require('express-session');


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

    let page = + req.query.page || 1;
    let beginDate = req.query.beginDate || '';
    let endDate = req.query.endDate || '';

    let search = req.query.search || '';
    let where = ' WHERE 1';

    if (search) { 
        where += `AND name LIKE ${db.escape('%' + search + '%')}`;
        output.query.search = search;
        output.showTest = db.escape('%' + search + '%');
    }
    if (beginDate) { 
        const mo = moment(beginDate);
        if (mo.isValid()) { 
            where += `AND birthday >= '${mo.format('YYYY-MM-DD')}' `;
            output.query.beginDate = mo.format('YYYY-MM-DD');
        }
    }

    if (endDate) { 
        const mo = moment(endDate);
        if (mo.isValid()) { 
            where += `AND birthday >= '${mo.format('YYYY-MM-DD')}' `;
            output.query.endDate = mo.format('YYYY-MM-DD');
        }
    }

    if (page < 1) { 
        output.code = 410;
        output.error = '頁碼太小';
        return output;
    }

    // const sql01 = `SELECT Count(1) totalRows FROM member ${where}`;
    const sql01 = `SELECT Count(salesOrder,member.mobile,cart.username,product_id,quality,TotalPrice,cart_created) totalRows FROM cart JOIN member ON member.username = cart.username ${where}`;
    const [[totalRows]] = await db.query(sql01);
    let totalPages = 0;
    if (totalRows) { 
        totalPages = Math.ceil(totalRows / output.perPage);
        if (page > totalPages) { 
            output.totalPages = totalPages;
            output.code = 420;
            output.error = '頁碼太大';
            return res.redirect(`?page=${totalPages}`);
        }
        // const sql02 = `SELECT * FROM member ${where} ORDER BY sid ASC LIMIT ${(page - 1) * output.perPage},${output.perPage}`;
        const sql02 = `SELECT salesOrder,member.mobile,cart.username,product_id,quality,TotalPrice,cart_created FROM cart JOIN member ON member.username = cart.username ORDER BY salesOrder ASC LIMIT ${(page - 1) * output.perPage},${output.perPage}`;
        // SELECT `salesOrder`,`member`.`mobile`,`cart`.`username`,`product_id`,`quality`,`TotalPrice`,`cart_created` FROM `cart` JOIN `member` ON `member`.`username` = `cart`.`username` ORDER BY `salesOrder` ASC;
        const [r2] = await db.query(sql02);
        r2.forEach(element => element.birthday = toDateString(element.birthday));
        output.rows = r2;
    }
    output.code = 200;

    output = { ...output, page, totalRows, totalPages };

    return output;

 }


router.get('/main', async (req, res) => {
    const output = await getListHandler(req, res);
    switch (output.code) { 
        case 410:
            return res.redirect(`?page=1`);
            break;
        case 420:
            return res.redirect(`?page=${output.totalPages}`);
            break;
    }
    if (!req.session.admin) {
        res.render('namelist/no_main', output);
    } else { 
        res.render('namelist/main',output);
    }
});

module.exports = router;