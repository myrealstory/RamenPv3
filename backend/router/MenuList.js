const express = require('express');

const db = require(__dirname + '/../modules/mysql_connect');
const moment = require('moment-timezone');
const { toDateString,
    toDatetimeString, } = require(__dirname + '/../modules/date-tools');
const Joi = require('joi');
const { application } = require('express');
const session = require('express-session');
const controller = require('../Public/controller/Controller');


const router = express.Router();
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const getListHandler = async (req, res) => {
    let output = {
        perPage: 5,
        page: 1,
        totalRows: 0,
        totalPage: 0,
        code: 0,
        query: {},
        rows: [],
        success:false,
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
            where += `AND Publish_Date >= '${mo.format('YYYY-MM-DD')}' `;
            output.query.beginDate = mo.format('YYYY-MM-DD');
        }
    }

    if (endDate) { 
        const mo = moment(endDate);
        if (mo.isValid()) { 
            where += `AND Publish_Date >= '${mo.format('YYYY-MM-DD')}' `;
            output.query.endDate = mo.format('YYYY-MM-DD');
        }
    }

    if (page < 1) { 
        output.code = 410;
        output.error = '頁碼太小';
        return output;
    }

    // const sql01 = `SELECT Count(1) totalRows FROM member ${where}`;
    // const sql01 = `SELECT Count(salesOrder,member.mobile,cart.username,product_id,quality,TotalPrice,cart_created) totalRows FROM cart JOIN member ON member.username = cart.username ${where}`;
    const sql01 = `SELECT Count(1) totalRows FROM product_detail ${where}`;
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
        const sql02 = `SELECT * FROM product_detail ${where} ORDER BY product_sid ASC LIMIT ${(page - 1) * output.perPage},${output.perPage}`;
        // SELECT `salesOrder`,`member`.`mobile`,`cart`.`username`,`product_id`,`quality`,`TotalPrice`,`cart_created` FROM `cart` JOIN `member` ON `member`.`username` = `cart`.`username` ORDER BY `salesOrder` ASC;
        const [r2] = await db.query(sql02);
        r2.forEach(element => element.cart_created = toDateString(element.cart_created));
        output.rows = r2;
    }
    output.code = 200;

    output = { ...output, page, totalRows, totalPages };

    return output;

 }


router.get('/Menulist', async (req, res) => {
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
        res.render('namelist/no_main', output);
    } else { 
        res.render('menulist/menulist', output);
    }
});

router.get('/m-add',async (req, res) => {
    if (!req.session.admin) {
        return res.render('namelist/no_main')
    }
    res.render('menulist/m-add');
})
router.post('/m-add',async (req, res) => {
    if (!req.session.admin) {
        return res.json({ success: false, error: '請先登入!' });
    }
    // res.json(req.body);

    // const schema = Joi.object({
    //     product_name: Joi.string()
    //         .min(3)
    //         .required()
    //         .label('這裡要填入菜名！'),
    //     product_description: Joi.string()
    //         .max(300).min(10)
    //         .required()
    //         .label('必須輸入餐點的介紹,最多300字,至少10字'),
    //     price: Joi.number().required(),
    // });
    // res.json(schema.validate(req.body));
//    res.send(schema.validate(req.body));
    const data = req.body;

    const sqlINS = "INSERT INTO `product_detail` (`product_name`,`product_description`,`price`,`Publish_Date`) SET ?";
    // const inserData = { ...req.body, Publish_Date: new Date() };
    const [result] = await db.query(sqlINS, data);

    if (result.affectedRows) { 
        output.success = true;
    }

    res.json(result);
    // res.send("New list had been added in Menu!");
    res.redirect('menulist/m-add')
});

router.get('/m-update', (req, res) => { 
    res.render('menulist/m-update');
})

app.route('/m-delete', (req, res) => { 

})


//API

// route.post('/api/insertmenu', controller.create);
// route.get('/api/', controller.create)
router.put('/api/update/:id', controller.update);
router.delete('/api/deletemenu/:id', controller.delete);


module.exports = router;