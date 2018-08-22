import Vue from 'vue';
import VueRouter from 'vue-router';

import HomeComponent from '../components/home/home.vue';
import LoginComponent from '../components/login/login.vue';
import UserComponent from '../components/datagrid/user/user.vue';
import GoodsComponent from '../components/datagrid/goods/goods.vue';
import OrderComponent from '../components/datagrid/order/order.vue';
import OtherComponent from '../components/datagrid/other/other.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'login',
            component: LoginComponent
        },
        {
            path: '/home',
            name: 'home',
            component: HomeComponent,
            children:[
                {
                    path: '/user',
                    name: 'user',
                    component: UserComponent
                },{
                    path: '/goods',
                    name: 'goods',
                    component: GoodsComponent
                },{
                    path: '/order',
                    name: 'order',
                    component: OrderComponent
                },{
                    path: '/other',
                    name: 'other',
                    component: OtherComponent
                },
            ]
        },
    ]
})

// router.beforeEach((to, from, next) =>{
//     if(to.path.indexOf('login') < 0 && !window.sessionStorage.getItem('sstoken')){
//         router.replace('login');
//         next();
//     } 
//     next();
// })

export default router;