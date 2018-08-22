<template>
    <div>
        <datagrid :config="config"></datagrid>
    </div>
</template>

<script>
    import datagrid from '../datagrid.vue';
    import './goods.scss';

    export default {
        components:{
            datagrid
        },
        data(){
            return {
                config: {
                    api: "allproduct",
                    api1: "paging",
                    cols: ['id','title','miaoShu','price','qty','shouCang','moHao','kuanShi','zhongLiang','chengSe','chiCun','imgurl','add_time']
                }
            }
        },
        methods: {
            
        }
    }
</script>