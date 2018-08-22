<template>
    <div class="header">
        <div class="logo">
            <i class="fa fa-university" aria-hidden="true"></i>
            <h1>后台管理系统</h1>
        </div>
        <div class="header_c">
            <input type="text" 
        </div>
        <div class="header_r">
            <div class="your_name">
                欢迎您! 
                <span><i class="fa fa-user" aria-hidden="true"></i>坚哥</span>
            </div>
            <div class="out" @click="out"><i class="fa fa-sign-out" aria-hidden="true"></i>退出</div>
            <div class="fanyi">
                <i class="fa fa-language" aria-hidden="true"></i>
                <select class="" v-model="$store.state.header.lanType">
                    <option value="en">en</option>
                    <option value="cn">cn</option>
                </select>
            </div>
        </div>
    </div>
</template>

<script>
    import './header.scss';

    export default {
        data(){
            return {
            }
        },
        methods: {
            out(){
                this.$store.dispatch('out');
            }
        },
        mounted(){
            //console.log(this.$store.state.header.lanType)
        }
    }
</script>