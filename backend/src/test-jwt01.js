require('dotenv').config();

const jwt = require('jsonwebtoken');

// const token = jwt.sign({ id: 12, account: 'admins' }, process.env.JWT_SECRET);
//account 是 sign重要的值/轉換的值

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImFjY291bnQiOiJhZG1pbnMiLCJpYXQiOjE2NTgzMDE3NDJ9.BX_HUd3LyDKfOR6NO6Rmq41J8478Uw02ere45PJTvEU';

jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => { 
    if (err) { 
        console.log(err);
    }
    console.log(decoded);
    process.exit();
})
console.log(token)

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIsImFjY291bnQiOiJhZG1pbnMiLCJpYXQiOjE2NTgzMDE3NDJ9.BX_HUd3LyDKfOR6NO6Rmq41J8478Uw02ere45PJTvEU