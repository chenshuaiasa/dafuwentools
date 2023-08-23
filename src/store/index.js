import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

// 创建vuex实例
const store = new Vuex.Store({
    state:{
        playerinfo:{},
        propertyinfo:{},
        playerNow:''
    },
    mutations:{
        getPlayerinfo(state,data){
            state.playerinfo = data;
        }
    },
    actions:{
        async asyncgetPlayerinfo({commit},payload){
            var _this = payload._this
            var temp = await _this.$datas.getPlayerInfo('');
            // console.log(temp);
            commit('getPlayerinfo',temp);
        }
    },
    getters:{},
    modules:{}
})

export default store;