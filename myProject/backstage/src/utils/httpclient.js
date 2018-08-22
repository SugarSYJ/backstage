import axios from 'axios';
import router from '../router/router';

const baseUrl = 'http://localhost:8081/';

export default {
    get(_url, _params){  
        router.app.$store.state.spinner.show = true;
        _url = _url.startsWith('http') ? _url : baseUrl + _url;
        return new Promise((resolve, reject) => {
            axios({
                url: _url,
                params: _params || {},
                headers: {authorization: window.sessionStorage.getItem('sstoken')}
            }).then(res => {
                if(!res.data.status && res.data.error == "unauthorized"){
                router.app.$store.state.spinner.show = false;
                    router.push('/login');
                    return false;
                }
                resolve(res);
            }).catch(error => {
                router.app.$store.state.spinner.show = false;
                reject(error);
            })
        })
    },
    post(_url, _params){
        router.app.$store.state.spinner.show = true;
        _url = _url.startsWith('http') ? _url : baseUrl + _url;
        return new Promise((resolve, reject) => {
            axios({
                url: _url,
                method: 'post',
                data: _params || {},
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    authorization: window.sessionStorage.getItem('sstoken')
                },
                transformRequest: [function (data) {
                    let ret = ''
                    for (let it in data) {
                      ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
                    }
                    return ret
                  }]
            }).then(res => {
                if(!res.data.status && res.data.error == "unauthorized"){
                router.app.$store.state.spinner.show = false;
                    router.push('/login');
                    return false;
                }
                resolve(res);
            }).catch(error => {
                router.app.$store.state.spinner.show = false;
                reject(error);
            })
        })
    },

}