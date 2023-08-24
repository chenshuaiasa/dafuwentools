import Vue from 'vue'
import Vuex from 'vuex'
import * as datas from '../data/index'
import createPersistedstate from 'vuex-persistedstate'

Vue.use(Vuex);

// 创建vuex实例
const store = new Vuex.Store({
    state: {
        playerinfo: {},
        playerinfo_now: '',
        propertyinfo: {},
        propertyinfo_of_player: [],
        playerid: ''
    },
    mutations: {
        getPlayerinfo(state, data) {
            state.playerinfo = data;
        },
        getPlayerinfo_now(state, payload) {
            // console.log(state.playerinfo);
            state.playerinfo_now = state.playerinfo.find(val => {
                return val.id = payload.playerid
            })
        },
        getPropertyinfo(state, data) {
            state.propertyinfo = data;
        },
        getPropertyinfo_of_player(state, data) {
            state.propertyinfo_of_player = data;
        },
        getPlayerid(state, pid) {
            state.playerid = pid;
        }
    },
    actions: {
        async asyncgetPlayerinfo({ commit }, payload) {
            // var _this = payload._this
            // console.log(datas);
            var temp = await datas.getPlayerInfo('');
            // console.log(temp);
            commit('getPlayerinfo', temp);
        },
        async asyncgetPropertyinfo({ commit }, payload) {
            var temp = await datas.getPropertyInfo_from_player();
            // console.log(temp);
            commit('getPropertyinfo', temp);
        },
        async asyncgetPropertyinfo_of_player({ commit }, payload) {
            var temp = await datas.getPropertyInfo_from_player(payload.column, payload.id);
            // console.log(temp);
            commit('getPropertyinfo_of_player', temp);
        }
    },
    getters: {},
    modules: {},
    plugins: [
        createPersistedstate({
            key: 'user',// 存数据的key名   自定义的  要有语义化
            // paths: ['loginModule'] // 要把那些模块加入缓存
        })
    ]

})

export default store;