const express = require('express');

const db = require(__dirname + '/../modules/mysql_connect');
const moment = require('moment-timezone');
const { toDateString,
    toDatetimeString, } = require(__dirname + '/../modules/date-tools');
const Joi = require('joi');
const { application } = require('express');
const session = require('express-session');
const controller = require('../Public/controller/Controller');
const multer = require('multer');
const bodyParser = require('body-parser');


const upload = multer();
const router = express.Router();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
router.post('/m-add',upload.array(),async (req, res) => {
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

    const output = {
        success: false,
        result: null,
    }

    // const sqlINS = "INSERT INTO `product_detail` (`product_name`,`product_description`,`price`,`Publish_Date`) SET ?";
    const sqlINS = "INSERT INTO `product_detail` SET ?";
    const inserData = { ...req.body, Publish_Date: new Date() };
    const [result] = await db.query(sqlINS, [inserData]);

    if (result.affectedRows) { 
        output.success = true;
        output.result = result;
    }

    res.json(output);
  
    // res.send("New list had been added in Menu!");
    // res.redirect('menulist/m-add')
});

router.get('/m-delete/:id', async(req, res) => {
    
    const data = req.body;
    const output = {
        success: false,
        result:null,
    }
    const sqlDel = "DELETE FROM product_detail WHERE product_sid = ?"
    await db.query(sqlDel, [req.params.id], (err, rows) => { 
        db.release();

        if (!err) {
            res.send(`The Food id:${data.product_sid} in Menu has been removed!`);
        } else { 
            console.log(err);
        }
    });

    // res.json(output);
    res.redirect('/../Menulist/menulist');
})

router.get('/m-update/:id',async (req, res) => { 
    if (!req.session.admin) {
        return res.render('namelist/no_main')
    }

    const product_id = req.params.id;
    const sql = "SELECT * FROM product_detail WHERE product_sid = ?";
    const [query] = await db.query(sql, [product_id]); 
    res.render('menulist/m-update', {
            user: query[0],
        });
         });
router.post('/m-update/:id', upload.array(),async (req, res) => { 
    const output = {
        success: false,
        result : null,
    }

    // const data = {
    //     product_name: req.body.product_name,
    //     product_description: req.body.product_description,
    //     price : req.body.price,
    //     Publish_Date : req.body.Publish_Date,
    // }

    const product_id = req.params.id;
    const data = req.body;
    // const sqlUPD = "UPDATE `product_detail` SET `product_name`='" +req.body.product_name+"',`product_description`='"+req.body.product_description+"',`Publish_Date`='"+req.body.Publish_Date+"',`price`='"+req.body.price+"' WHERE `product_sid`='"+product_id+"'";
    const sqlUPD = "UPDATE `product_detail` SET `product_name`=?,`product_description`=?,`Publish_Date`=?,`price`=? WHERE `product_sid`=?";
    const [UPDquery] = await db.query(sqlUPD, [
        data.product_name,
        data.product_description,
        data.Publish_Date,
        data.price,
        product_id,
    ]);
    
    if (sqlUPD.affectedRows) { 
        output.success = true;
        output.result = sqlUPD;
        
    }
    // res.redirect(`/../Menulist/menulist`);
    res.json(output);
    
})

//API

// route.post('/api/insertmenu', controller.create);
// route.get('/api/', controller.create)
// router.put('/api/update/:id', controller.update);
router.delete('/api/deletemenu/:id', controller.delete);


module.exports = router;