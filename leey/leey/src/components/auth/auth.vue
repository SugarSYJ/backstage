<template>
    <div>
        <datagrid :config="config" ref="datagrid"></datagrid>
    </div>
</template>

<script>
    import datagrid from '../datagrid/datagrid.vue'

    export default {
        data(){
            return{
                ds: 0,
                config: {
                    datasource: null,
                    cols: 'name,',
                    key: 'id',
                    multiple: {
                        datasource: null
                    },
                    toolbar: {
                        add: {
                            text: '保存',
                            api: 'User/Save',
                            method: 'post',
                            success: () => {
                                this.$router.push({name: 'users'})
                            }
                        },
                        back: {
                            text: '返回',
                            class: 'btn-goback',
                            event: () => {
                                this.$router.push({name: 'auths'})
                            }
                        }
                    }
                }
            }
        },    
        mounted(){
            this.$http.get('Module/GetRoleMenuList').then((response) => {
                let ds = [];
                for(let item of response.data){
                    if(!item.children[0]){
                        ds.push(item)
                        this.$refs.datagrid.selecteds.push(item.id)
                    } else {
                        for(let obj of item.children){
                            ds.push(obj)
                            this.$refs.datagrid.selecteds.push(obj.id)
                        }
                    }
                }
                this.config.datasource = ds;
                this.config.multiple.datasource = ds;
            })        
        },    
        components: {
            datagrid
        }
    }
</script>
