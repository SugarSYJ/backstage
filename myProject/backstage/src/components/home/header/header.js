import router from '../../../router/router';

var state = {
    lanType: 'en'
}

var mutations = {
    out1(){
        window.sessionStorage.removeItem('sstoken')
        router.push({name:'login'});  
    }
}

var actions = {
    out(context,params){
        context.commit('out1');
    }
};

export default {
    state,
    mutations,
    actions
}