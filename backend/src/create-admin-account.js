const db = require(__dirname + '/../modules/mysql_connect');
const bcrypt = require('bcryptjs');



const sql =
  "INSERT INTO `admin`(`username`, `password`, `valid_Time`, `created_at`) VALUES ('chung',?,NOW(),NOW())";

(async () => {
    var hash = await bcrypt.hash("112233445566",10);

    const r =await db.query(sql, [hash]);

    console.log(r);
    // process.exit();
})();
