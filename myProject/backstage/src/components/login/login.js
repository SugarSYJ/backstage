import http from '../../utils/httpclient';
import router from '../../router/router';

const state = {
	a: 1
}

var mutations = {
    login(data,params){
        http.post('backlogin',params).then((res) => {
            // console.log(res)
            if(res.data.status){
                window.sessionStorage.setItem('sstoken', params.username);
                router.push('/home');    
            }else{
                window.alert('登录信息错误');
            }    
        }).catch((error) => {
            window.alert(error);      
        });  
    }
}

var actions = {
    login(context,params){
        context.commit('login', params);
    }
};

export default {
	state,
	mutations,
	actions
}