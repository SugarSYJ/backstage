<template>
    <div>
        <table class="table table-striped">
            <thead>
                <tr>
                    <th v-for="(val,key) in dataset[0]" v-if="cols.indexOf(key) > -1">{{dictionary[$store.state.header.lanType][key] || key}}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(obj,idx) in dataset">
                    <td v-for="(val,key) in obj" v-if="cols.indexOf(key) > -1" :key="key">{{val}}</td>
                    <td><div class="bian" @click="bian($event)">编辑</div></td>
                    <td><div class="del" @click="del($event)">删除</div></td>
                </tr>
            </tbody>
        </table>
        <div class="tanC" v-show="show">
            <form role="form">
                <div class="form-group">
                    <label for="id" class="control-label">序号</label>
                    <input type="text" class="form-control" id="id" placeholder="序号" v-model="id">
                    <label for="username" class="control-label">昵称</label>
                    <input type="text" class="form-control" id="username" placeholder="昵称" v-model="username">
                    <label for="password" class="control-label">密码</label>
                    <input type="text" class="form-control" id="password" placeholder="密码" v-model="password">
                </div>
                <button type="submit" class="btn btn-default" @click="add">提交</button>
                <button type="submit" class="btn btn-default" @click="cancel">取消</button>
            </form>
        </div>
    </div>
</template>

<script>
    import https from 'axios';
    import './user.scss';
    import $ from 'jquery';
    import http from '../../../utils/httpclient';

    export default {
        data(){
            return {
                dataset: [],
                dictionary: {},
                params: {page: 0,limit:10},
                cols: ['id','username','password','add_time'],
                show: false,
                id: '',
                username: '',
                password: ''
            }
        },
        methods: {
            del(e){
                var id = e.target.parentNode.parentNode.children[0].innerText;
                var username =  e.target.parentNode.parentNode.children[1].innerText;
                http.post('deluser',{id,username}).then((res) => {
                    this.xuan();
                })
            },
            cancel(){
                this.show = false;
            },
            bian(e){
                var trs = e.target.parentNode.parentNode.children;
                this.id = trs[0].innerText;
                this.username = trs[1].innerText;
                this.password = trs[2].innerText;
                this.show = true;
            },
            add(){
                var id = this.id;
                var username = this.username;
                var password = this.password;
                http.post('addusers',{id,username,password}).then((res) => {
                    this.xuan();
                    this.show = false;
                })
            },
            xuan(){
                 http.get('allusers',this.params || {}).then((res)=>{
                    this.dataset = res.data.data;
                })
            }
        },
        mounted(){
            https.get('./src/assets/dictionary/common.txt').then((res) => {
               this.dictionary = res.data;
            })

            this.xuan();
        }
    }
</script>