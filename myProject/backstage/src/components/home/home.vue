<template>
    <div>
        <div class="header">
            <ss-header></ss-header>
        </div>
        <div class="body">
            <div class="nav">
                <ss-nav></ss-nav>
            </div>
            <div class="container">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
    import './home.scss';
    import header from './header/header.vue';
    import nav from './nav/nav.vue';

    export default {
        components: {
            'ss-header': header,
            'ss-nav': nav
        }
    }
</script>