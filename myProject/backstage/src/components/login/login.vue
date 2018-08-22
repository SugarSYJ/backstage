<template>
    <div class="login">
        <!-- <img src="../../assets/img/giphy.gif" /> -->
        <div class="login-box">
            <div class="col-sm-12 b-r">
                <h3 class="m-t-none m-b">登录</h3>
                <form role="form">
                    <div class="form-group text-left">
                        <label>用户名：</label>
                        <input type="text" name="username" placeholder="请输入用户名" class="form-control required" v-model="username">
                    </div>
                    <div class="form-group  text-left">
                        <label>密码：</label>
                        <input type="password" name="password" placeholder="请输入密码" class="form-control required" v-model="password">
                    </div>
                    <div class="log">
                        <input type="button" class="btn btn-primary m-t-n-xs" value="登录" @click="login">
                    </div>
                </form>
            </div>
            <div class="copyright">Make in sugar</div>
        </div>
    </div>
</template>

<script>
    import './login.scss';
    import { mapGetters, mapActions } from 'vuex';
    import http from '../../utils/httpclient';

    export default {
        data(){
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            login(){
                //http.get('login',{username: this.username, password: this.password}).then((res) => {
                //   console.log(res);
                //})
                //router.push({name: 'home'})
                this.$store.dispatch('login', {username: this.username, password: this.password})
            }
        }
    }
</script>