//api路由
//userApi.js —— 测试用 API 示例

var models = require('../db');
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
// 连接数据库
var conn = mysql.createConnection(models.mysql);
conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1', msg: '操作失败'
        });
    }
    else {
        res.json(
            ret
        );
    }
};

// // 增加用户接口
// router.post('/addProblem', (req, res) => {
//     var sql = $sql.user.add;
//     var params = req.body;
//     console.log(params);
//     conn.query(sql, [params.a, params.b,params.c,params.d,params.question,params.answer,params.course,params.analysis], function (err, result) {
//         if (err) {
//             console.log(err);
//         }
//         if (result) {
//             jsonWrite(res, result);
//         }
//     })
// });


router.post('/addProblem', (req, res) => {
    var sqlCheck = $sql.user.checkQuestionExist;
    var sqlAdd = $sql.user.add;
    var params = req.body;

    // 查询数据库中是否存在相同的问题
    conn.query(sqlCheck, [params.question], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result && result.length > 0) {
            // 已存在相同的问题，不执行插入操作
            console.log('相同问题已存在');
            jsonWrite(res, { message: '相同问题已存在' });
        } else {
            // 不存在相同的问题，执行插入操作
            conn.query(sqlAdd, [params.a, params.b, params.c, params.d, params.question, params.answer,params.testpoint,params.course, params.analysis,params.correct], function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    jsonWrite(res, result);
                }
            });
        }
    });
});






router.get('/queryProblem',(req,res)=>{
    conn.query('select * from problem',function(err,row){
        if(err){
             console.log(err)            
        }
        console.log(typeof row)
        let data = JSON.stringify(row)
        res.end(data)
    })
});

module.exports = router;



