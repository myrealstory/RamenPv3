const db = require(__dirname + "/../modules/mysql_connect");
const bcrypt = require("bcryptjs");

const sql =
  "INSERT INTO `member`(`username`, `password`, `created_at`) VALUES ('chung',?,NOW())";

(async () => {
  var hash = await bcrypt.hash("123123123", 10);

  const r = await db.query(sql, [hash]);

  console.log(r);
  process.exit();
})();
