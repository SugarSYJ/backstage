import Vue from 'vue'
import Vuex from 'vuex'

import login from '../components/login/login'
import header from '../components/home/header/header'
import spinner from '../components/spinner/spinner'
import common from '../assets/dictionary/common'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        login,
        header,
        spinner,
        common
    }
})