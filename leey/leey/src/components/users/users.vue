<template>
    <div>
        <datagrid :config="config"></datagrid>
    </div>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'

    export default {
        data(){
            return{
                config: {
                    api: 'User/GetPageList',
                    cols: 'userNo,account,name,sexDesc,phone,idCard,positionDesc,statusDesc,erp',
                    key: 'id',
                    edit(router, item){
                        router.push({name: 'user', params: {'id': item.id}});
                    },
                    del: true,
                    method: 'post',
                    tools: {
                        add: {
                            text: '添加员工',
                            event: () => {
                                this.$router.push({name: 'user', params: {id: '-1'}});
                            }
                        }
                    },
                    search: {
                        cols: 'code,name',
                    }
                }
            }
        },
        components: {
            datagrid
        }
    }
</script>