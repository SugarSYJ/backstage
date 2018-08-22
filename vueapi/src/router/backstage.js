const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        // 后台登录
        app.post('/backlogin', async (req, res) => {
            let username = req.body.username;
            let password = req.body.password;
            console.log(12,username,password)
            var sql = `select * from administrator where username='${username}' and password='${password}'`;
            console.log(sql);
            await db.select(sql, (data) => {
                console.log(data)
                if(data.length == 0) {
                    res.send(apiResult(false));
                } else {
                    res.send(apiResult(true))
                }
            })
        })

        //查询所有用户
        app.get('/allusers', async (req, res) => {
            var sql = 'SELECT * FROM users';
            console.log(sql)
            await db.select(sql, (result) => {
                res.send(apiResult(result.length > 1, result));
            })
        })

        //查询所有order
        app.get('/allorder', async (req, res) => {
            var sql = 'SELECT * FROM orders';
            console.log(sql)
            await db.select(sql, (result) => {
                res.send(apiResult(result.length > 1, result));
            })
        })

        //后台产品管理之所有商品
        app.get('/allproduct', async (req, res) => {
            var sql = 'SELECT * FROM goods';
            console.log(sql)
            await db.select(sql, (result) => {
                res.send(apiResult(result.length > 1, result));
            })
        })

         //分页
        app.get('/paging', async (req, res) => {
            var page = req.query.page;
            var sql = `select * from goods limit ${(page)*7},7`;
            console.log(sql);
            await db.select(sql, function(result) {
                res.send(apiResult(result.length>1, result));
            })
        })


        //增改
        app.post('/addproduct', async (req, res) => {
            console.log(req.body)
            let sql = `insert into goods (id,title,miaoShu,price,qty,shouCang,moHao,kuanShi,zhongLiang,chengSe,chiCun,imgurl) values ('${req.body.id}','${req.body.title}','${req.body.miaoShu}','${req.body.price}','${req.body.qty}','${req.body.shouCang}','${req.body.moHao}','${req.body.kuanShi}','${req.body.zhongLiang}','${req.body.chengSe}','${req.body.chiCun}','${req.body.imgurl}')`;
            let _sql = `select * from goods where id='${req.body.id}' and title='${req.body.title}'`;
            let updatesql = `update goods set miaoShu='${req.body.miaoShu}',price='${req.body.price}',qty='${req.body.qty}',shouCang='${req.body.shouCang}',moHao='${req.body.moHao}',kuanShi='${req.body.kuanShi}',zhongLiang='${req.body.zhongLiang}',chengSe='${req.body.chengSe}',chiCun='${req.body.chiCun}',imgurl='${req.body.imgurl}' where id='${req.body.id}' and title='${req.body.title}'`;
            await db.select(_sql, function(_result) {
                if(_result.length != 0) {
                    db.update(updatesql, function(up_result) {
                        res.send(apiResult(true,up_result));
                    })
                } else {
                    db.insert(sql, function(result) {
                        res.send(apiResult(true,result))
                    })
                }
            })
        })

        app.post('/addusers', async (req, res) => {
            console.log(req.body)
            let sql = `insert into users (id,username,password) values ('${req.body.id}','${req.body.username}','${req.body.password}')`;
            let _sql = `select * from users where id='${req.body.id}'`;
            let updatesql = `update users set username='${req.body.username}',password='${req.body.password}' where id='${req.body.id}'`;
            await db.select(_sql, function(_result) {
                if(_result.length != 0) {
                    db.update(updatesql, function(up_result) {
                        res.send(apiResult(true,up_result));
                    })
                } else {
                    db.insert(sql, function(result) {
                        res.send(apiResult(true,result))
                    })
                }
            })
        })

        //删除
        app.post('/delproduct', (req, res) => {
            var delsql = `delete from goods where id='${req.body.id}'`;
            var usergetsql = `select * from goods where title='${req.body.title}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })   

        app.post('/deluser', (req, res) => {
            console.log(req.body)
            var delsql = `delete from users where id='${req.body.id}'`;
            var usergetsql = `select * from users where username='${req.body.username}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })

       

        //后台模糊搜索
        app.get('/backsearch', async (req, res) => {
            let proparams = req.query.proparams;
            console.log(proparams);
            await db.select(`select * from goods where proname like "%${proparams}%" or category like "%${proparams}%"`, function(result) {
                console.log(result);
                if(result.length>0){
                    res.send({status: true, data: result});
                } else {
                    res.send({status: 'error'})
                }
            })
        })

    }
}