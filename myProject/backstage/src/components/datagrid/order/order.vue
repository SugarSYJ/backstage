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
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import https from 'axios';
    import './order.scss';
    import http from '../../../utils/httpclient';

    export default {
        data(){
            return {
                dataset: [],
                dictionary: {},
                params: {page: 0,limit:10},
                cols: ['id','username','goods_id','title','miaoShu','chiCun','price','qty','imgurl','status']
            }
        },
        methods: {
            
        },
        mounted(){
            https.get('./src/assets/dictionary/common.txt').then((res) => {
               this.dictionary = res.data;
            })
            http.get('allorder',this.params || {}).then((res)=>{
                this.dataset = res.data.data;
            })

        }
    }
</script>