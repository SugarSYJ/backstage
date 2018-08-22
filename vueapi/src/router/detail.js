const apiResult = require('../utils/apiResult');
const filter = require('../utils/filter');
const db = require('../db/mysql');

module.exports = {
    reg(app) {
        app.post('/listtodetail', async (req, res) => {
            var id = req.body.id;
            var sql = `select * from goods where id='${id}'`;
            // console.log(id)
            await db.select(sql, function(result) {
                res.send(apiResult(true, result))
            })
        })

        app.post('/insertnewcarlist', async (req, res) => {
            let username = req.body.username;
            let goods_id = req.body.goods_id;
            let qty = req.body.qty;
            let imgurl =req.body.imgurl;
            let title=req.body.title;
            let price=req.body.price;
            let miaoShu=req.body.miaoShu;
            let chiCun=req.body.chiCun;
             let sql = `insert into shoppingcart (username,goods_id,qty,imgurl,title,price,miaoShu,chiCun) values ('${username}','${goods_id}','${qty}','${imgurl}','${title}','${price}','${miaoShu}','${chiCun}')`;
            console.log(sql)
            let _sql = `select * from shoppingcart where id='${goods_id}' and username='${username}'`;
            let updatesql = `update shoppingcart set qty=qty + '${qty}' where id='${goods_id}' and username='${username}'`;
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
    }
}