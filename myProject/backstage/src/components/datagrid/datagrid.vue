<template>
    <div>
        <div class="shang">
            <input type="botton" value="增加商品" class="add_btn" @click="show1"/>
        </div>
        <div class="tanCh" v-show="show">
            <form role="form">
                <div class="form-group">
                    <label for="id" class="col-sm-2 control-label">序号</label>
                    <input type="text" class="form-control col-sm-4" id="id" placeholder="序号" v-model="id">
                    <label for="title" class="col-sm-2 control-label">名称</label>
                    <input type="text" class="form-control col-sm-4" id="title" placeholder="名称" v-model="title">
                    <label for="miaoShu" class="col-sm-2 control-label">描述</label>
                    <input type="text" class="form-control col-sm-4" id="miaoShu" placeholder="描述" v-model="miaoShu">
                    <label for="price" class="col-sm-2 control-label">价格</label>
                    <input type="text" class="form-control col-sm-4" id="price" placeholder="价格" v-model="price">
                    <label for="qty" class="col-sm-2 control-label">数量</label>
                    <input type="text" class="form-control col-sm-4" id="qty" placeholder="数量" v-model="qty">
                    <label for="shouCang" class="col-sm-2 control-label">收藏</label>
                    <input type="text" class="form-control col-sm-4" id="shouCang" placeholder="收藏" v-model="shouCang">
                    <label for="moHao" class="col-sm-2 control-label">模号</label>
                    <input type="text" class="form-control col-sm-4" id="moHao" placeholder="模号" v-model="moHao">
                    <label for="kuanShi" class="col-sm-2 control-label">款式</label>
                    <input type="text" class="form-control col-sm-4" id="kuanShi" placeholder="款式" v-model="kuanShi">
                    <label for="zhongLiang" class="col-sm-2 control-label">重量</label>
                    <input type="text" class="form-control col-sm-4" id="zhongLiang" placeholder="重量" v-model="zhongLiang">
                    <label for="chengSe" class="col-sm-2 control-label">成色</label>
                    <input type="text" class="form-control col-sm-4" id="chengSe" placeholder="成色" v-model="chengSe">
                    <label for="chiCun" class="col-sm-2 control-label">尺寸</label>
                    <input type="text" class="form-control col-sm-4" id="chiCun" placeholder="尺寸" v-model="chiCun">
                    <label for="imgurl" class="col-sm-2 control-label">图片路径</label>
                    <input type="text" class="form-control col-sm-4" id="imgurl" placeholder="图片路径" v-model="imgurl">
                </div>
                <button type="submit" class="btn btn-default" @click="add">提交</button>
                <button type="submit" class="btn btn-default" @click="cancel">取消</button>
            </form>
        </div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th v-for="(val,key) in dataset[0]" v-if="config.cols.indexOf(key) > -1" :key="key">{{dictionary[$store.state.header.lanType][key] || key}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) in dataset" :id="obj.id">
                    <td v-for="(val,key) in obj" v-if="config.cols.indexOf(key) > -1">{{val}}</td>
                    <td><div class="bian" @click="bian($event)">编辑</div></td>
                    <td><div class="del" @click="del($event)">删除</div></td>
                </tr>
            </tbody>
        </table>
        <ul class="pagination">
            <li class="la la_l" @click="la_l">&laquo;</li>
            <div>
                <ul class="ul">
                    <li v-for="(val,key) in page" @click="pages($event)" :class="{active: className == key+1}">{{val}}</li>
                </ul>
            </div>
            <li class="la la_r" @click="la_r">&raquo;</li>
        </ul>
    </div>
</template>

<script>
    import https from 'axios';
    import './datagrid.scss';
    import $ from 'jquery';
    import http from '../../utils/httpclient';

    export default {
        data(){
            return {
                dataset: [],
                dictionary: {},
                page: null,
                sum_page: '',
                params: {page: 0,limit:10},
                className: 1,
                show: false,
                id: '',
                title: '',
                miaoShu: '',
                price: '',
                qty: '',
                shouCang: '',
                moHao: '',
                kuanShi: '',
                zhongLiang: '',
                chengSe: '',
                chiCun: '',
                imgurl: '',
            }
        },
        props:['config'],
        methods: {
            show1(){
                this.show = true;
            },
            cancel(){
                $('#id').removeAttr('disabled')
                $('#title').removeAttr('disabled')
                this.show = false;
            },
            add(){
                var id = this.id;
                var title = this.title;
                var miaoShu = this.miaoShu;
                var price = this.price;
                var qty = this.qty;
                var shouCang = this.shouCang;
                var moHao = this.moHao;
                var kuanShi = this.kuanShi;
                var zhongLiang = this.zhongLiang;
                var chengSe = this.chengSe;
                var chiCun = this.chiCun;
                var imgurl = this.imgurl;
                http.post('addproduct',{id,title,miaoShu,price,qty,shouCang,moHao,kuanShi,zhongLiang,chengSe,chiCun,imgurl}).then((res) => {
                    this.yan();
                    this.xuan();
                    $('#id').removeAttr('disabled')
                    $('#title').removeAttr('disabled')
                    this.show = false;
                })
            },
            del(e){
                var id = e.target.parentNode.parentNode.id;
                var title =  e.target.parentNode.parentNode.children[1].innerText;
                http.post('delproduct',{id,title}).then((res) => {
                    this.yan();
                    this.xuan();
                })
            },
            bian(e){
                var trs = e.target.parentNode.parentNode.children;
                this.id = trs[0].innerText;
                this.title = trs[1].innerText;
                this.miaoShu = trs[2].innerText;
                this.price = trs[3].innerText;
                this.qty = trs[4].innerText;
                this.shouCang = trs[5].innerText;
                this.moHao = trs[6].innerText;
                this.kuanShi = trs[7].innerText;
                this.zhongLiang = trs[8].innerText;
                this.chengSe = trs[9].innerText;
                this.chiCun = trs[10].innerText;
                this.imgurl = trs[11].innerText;
                this.show = true;
                $('#id').attr('disabled','disabled')
                $('#title').attr('disabled','disabled')
            },
            pages(e){
                this.className = e.target.innerText;
                this.params.page = e.target.innerText - 1;
                http.get(this.config.api1, this.params || {}).then((res)=>{
                    this.dataset = res.data.data;
                })
            },
            la_l(){
                if($('.ul').position().left <= -(this.page*1 - 5)*30 || this.page*1 <= 5){
                    return
                }
                $('.ul').css({'left':'-=30'});
            },
            la_r(){
                if($('.ul').position().left >= 0){
                    return
                }
                $('.ul').css({'left':'+=30'});
            },
            xuan(){
                http.get(this.config.api1,this.params || {}).then((res)=>{
                    this.dataset = res.data.data;
                })
            },
            yan(){
                http.get(this.config.api).then((res)=>{
                    this.sum_page = res.data.data.length;
                    this.page = Math.ceil(this.sum_page/7);
                    var wid = this.page*1*30 + 'px';
                    $('.ul').css({'width':'wid'});
                })
            }
        },
        mounted(){
            https.get('./src/assets/dictionary/common.txt').then((res) => {
               this.dictionary = res.data;
            })
            this.yan();
            this.xuan();
            
        }
    }
</script>