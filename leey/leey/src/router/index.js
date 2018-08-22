import Vue from 'vue'
import VueRouter from 'vue-router'
import http from '../utils/HttpClient'

import HomeComponent from '../components/home/home.vue'
import LoginComponent from '../components/login/login.vue'
import Clients from '../components/clients/clients.vue'
import Client from '../components/client/client.vue'
import PageNotFound from '../components/pagenotfound/pagenotfound.vue'
import UsersComponent from '../components/users/users.vue'
import UserComponent from '../components/user/user.vue'
import AuthsComponent from '../components/auths/auths.vue'
import AuthComponent from '../components/auth/auth.vue'

Vue.use(VueRouter)

const router = new VueRouter({
	routes: [{
		path: '/',
		name: 'home',
		component: HomeComponent,
		children: [{
			path: '/clients',
			name: 'clients',
			component: Clients
		},{
			path: '/client',
			name: 'client',
			component: Client
		},{
			path: '/users',
			name: 'users',
			component: UsersComponent
		},{
			path: '/user/:id',
			name: 'user',
			component: UserComponent
		},{
			path: '/auths',
			name: 'auths',
			component: AuthsComponent
		},{
			path: '/auth/:id',
			name: 'auth',
			component: AuthComponent
		},{
			path: '**',
			name: '404',
			component: PageNotFound
		}]
	},{
		path: '/login',
		name: 'login',
		component: LoginComponent
	}]
})

// 对将要进入的路由进行权判断
router.beforeEach((to, from, next) =>{
	// console.log(to);
	if(to.path.indexOf('login') < 0 && !window.localStorage.getItem('access_token')){
		router.replace('login');
		next();
	} 
	next();
})

export default router