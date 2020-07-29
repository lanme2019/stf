let express = require('express')
let router = express.Router()
let mysql = require('mysql')
var dbutil = require('../db.config')
var connection = null;

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'samxiaoguai',
    database: 'ceshi'
})

router.get("/query", (req, res, next) => {
    // conn.connect();
    connection = dbutil.createConnection();
    connection.connect();
    let sql = "select * from user";
    connection.query(sql, (err, result) => {
        console.log(result)
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "查询成功",
                data: result
            })
        }
        connection.destroy();
    })
})


router.post("/login", (req, res, next) => {
    // conn.connect();
    connection = dbutil.createConnection();
    // let sql = "select * from user";
    let userName = req.body.name;
    let userpwd = req.body.email
    console.log(userName, "userName")
    // let userName = "ceshi";
    // let userPwd = "1";
    let sql = `select * from user where name = '${userName}' and psw = '${userpwd}'`;
    // let sql = "select * from user where name = 'ceshi'";

    connection.query(sql, (err, result) => {
        console.log(result)
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "查询成功",
                data: result
            })
        }
        connection.end();
    })
})
//

router.post("/change", (req, res, next) => {
    // conn.connect();
    connection = dbutil.createConnection();

    let sql = "update user set phoneid=?,usetime=? where id=?";
    let userId = req.body.userId;
    let phoneId = req.body.phoneId;
    let useTime = req.body.useTime;
    // let  sqlParams = ["2","time","1"]
    let sqlParams = [];
    sqlParams.push(phoneId);
    sqlParams.push(useTime);
    sqlParams.push(userId);
    console.log(sqlParams, "sqlParams");
    connection.query(sql, sqlParams, (err, result) => {
        console.log(result)
        if (err) {
            res.json({
                code: 500,
                msg: "SQL执行错误",
                err
            })
        } else {
            res.json({
                code: 200,
                msg: "查询成功",
                data: result
            })
        }
        connection.end();
    })
})

module.exports = router