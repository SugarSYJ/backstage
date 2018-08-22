<template>
    <div class="nav">
        <ul>
            <router-link to="/user">
                <li @click="select" :class="{active: className == '用户信息'}"><i class="fa fa-address-book-o" aria-hidden="true"></i>用户信息</li>
            </router-link>
            <router-link to="/goods">
                <li @click="select" :class="{active: className == '商品管理'}"><i class="fa fa-list" aria-hidden="true"></i>商品管理</li>
            </router-link>
            <router-link to="/order">
                <li @click="select" :class="{active: className == '订单详情'}"><i class="fa fa-calendar-check-o" aria-hidden="true"></i>订单详情</li>
            </router-link>
            <router-link to="/other">
                <li @click="select" :class="{active: className == '其他设置'}"><i class="fa fa-arrows" aria-hidden="true"></i>其他设置</li>
            </router-link>
        </ul>
    </div>
</template>

<script>
    import './nav.scss';
    import http from '../../../utils/httpclient';

    export default {
        data(){
            return {
                className: ''
            }
        },
        methods: {
            select(e){
                this.className = e.target.innerText;
            }
        }
    }
</script>