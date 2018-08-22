const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        app.get('/carlist', async (req, res) => {
            var username = req.query.username;
            var usergetsql = `select * from shoppingcart where username='${username}'`;
            await db.select(usergetsql, function(result) {
                res.send(apiResult(true,result));
            });
        })

        // app.post('/minuscarlist', async (req, res) => {
        //     console.log(req.body)

        //     var minusql = `update shoppingcart set qty=qty-1 where goods_id='${req.body.goods_id}'`;
        //     var usergetsql = `select * from shoppingcart where username='${req.body.username}'`;
        //     await db.select(minusql, function(res0) {
        //         db.select(usergetsql, function(result){
        //             res.send(apiResult(true,result));
        //         })
        //     })
        // })

        // app.post('/addcarlist', async (req, res) => {
        //     var addsql = `update shoppingcart set qty=qty+1 where goods_id='${req.body.goods_id}'`;
        //     var usergetsql = 'SELECT * from shoppingcart';
        //     await db.select(addsql, function(res0) {
        //         db.select(usergetsql, function(result) {
        //             console.log(result)
        //             res.send(apiResult(true,result));
        //         })
        //     })
        // })


        app.get('/updatecarlist', async (req, res) => {
            var minusql = `update shoppingcart set qty='${req.query.qty}' where goods_id='${req.query.goods_id}'`;
            var usergetsql = `select * from shoppingcart where username='${req.query.username}'`;
            await db.select(minusql, function(res0) {
                db.select(usergetsql, function(result){
                    res.send(apiResult(true,result));
                })
            })
        })

        app.post('/delcarlist', (req, res) => {
            var delsql = `delete from shoppingcart where id='${req.body.id}'`;
            var usergetsql = `select * from shoppingcart where username='${req.body.username}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })

        app.get('/deleteCarGoods', (req,res) => {
            console.log(req.query)
            var obj = req.query.goods_id;
            var array = [];
            for(var key in obj){
                array.push(obj[key]);
            }
           var sql = "delete from shoppingcart where goods_id in (";
           for(var i = 0; i < array.length; i++){
                if(i == array.length-1){
                    sql = sql + array[i] + ")";
                    break;
                }
                sql = sql + array[i] + ",";
           }
           var usergetsql = `select * from shoppingcart where username='${req.query.username}'`;
           db.select(sql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })

        app.post('/delcarlist_all', (req, res) => {
            var delsql = `delete from shoppingcart where username='${req.body.username}'`;
            console.log(req.body.username)
            var usergetsql = `select * from shoppingcart where username='${req.body.username}'`;
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
        })

        app.get('/order', async (req, res) => {
            var data = req.query.goodsList
            let dataRes = JSON.parse(data);
            for(var i=0;i<dataRes.length;i++){
                let username = dataRes[i].username;
                let goods_id = dataRes[i].goods_id;
                let qty = dataRes[i].qty;
                let imgurl =dataRes[i].imgurl;
                let title=dataRes[i].title;
                let price=dataRes[i].price;
                let miaoShu=dataRes[i].miaoShu;
                let chiCun=dataRes[i].chiCun;
                let status=dataRes[i].status;
                var sql = `insert into orders(username,goods_id,qty,imgurl,title,price,miaoShu,chiCun,status) values ('${username}','${goods_id}','${qty}','${imgurl}','${title}','${price}','${miaoShu}','${chiCun}','${status}')`;
                console.log(sql);
                await db.insert(sql, function(result) {

                })
            }
            res.send(apiResult(true))
        })
            
            // console.log(sql)
            
            // await db.select(_sql, function(_result) {
            //     if(_result.length != 0) {
            //         db.update(updatesql, function(up_result) {
            //             res.send(apiResult(true,up_result));
            //         })
            //     } else {
            //         db.insert(sql, function(result) {
            //             res.send(apiResult(true,result))
            //         })
            //     }
            // })

        // app.post('/address', (req, res) => {
        //     var insertsql = `insert into address (consignee, phone, username, totaladdress) values ('${req.body.consignee}','${req.body.phone}','${req.body.username}','${req.body.totaladdress}')`;
        //     db.select(insertsql, function(result) {
        //         res.send(apiResult(true, result))
        //     })
        // })

        // app.get('/getaddress', (req, res) => {
        //     // var usergetsql = 'select * from address';
        //     // var username = req.query.username;
        
        //     var usergetsql = `select * from address where username='${req.query.username}'`;
        //     // console.log(usergetsql)
        //     db.select(usergetsql, function(result) {
        //         res.send(apiResult(true, result))
        //     })
        // })

        app.get('/deladdress', (req, res) => {
            console.log(req.query)
            // var usergetsql = 'delete from address';
            var delsql = `delete from address where id='${req.query.id}'`;
            var usergetsql = `select * from address where username='${req.query.username}'`;
            console.log(delsql,usergetsql)
            db.select(delsql, function(res0) {
                db.select(usergetsql, function(result) {
                    res.send(apiResult(true, result))
                })
            })
            // db.select(usergetsql, function(result) {
            //     res.send(apiResult(true, result))
            // })
        })
    }
}