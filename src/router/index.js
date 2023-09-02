import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '../views/Login.vue'
import Bank from '../views/bank.vue'
import Ground from '../views/ground.vue'
import Player from '../views/player.vue'
import Playerinfo from '../views/playerinfo.vue'
import Transfer from '../views/transfer.vue'
import TransferBH from '../views/transferbankhis.vue'
import TransferPH from '../views/transferplayerhis.vue'
import Home from '../views/home.vue'
import BanGM from '../views/bank_givemoney.vue'
import BanGT from '../views/bank_giveproperty.vue'
import BanIG from '../views/bank_initgame.vue'
import BanRP from '../views/bank_removeproperty.vue'
import BanAT from '../views/bank_asset_transfer.vue'
import temp from '../views/temp.vue'

Vue.use(VueRouter)

const routes = [
    //主路由
    { path: '/', name: 'login', component: Login },
    // { path: '/', name: 'login', component: temp },
    { path: '/bank', component: Bank },
    { path: '/ground', component: Ground },
    { path: '/player', component: Player },
    { path: '/playerinfo', component: Playerinfo },
    { path: '/transfer', component: Transfer },
    { path: '/transferbh', component: TransferBH },
    { path: '/transferph', component: TransferPH },
    { path: '/home', component: Home },
    { path: '/bangm', component: BanGM },
    {path: '/bangt', component: BanGT },
    {path: '/banig', component: BanIG },
    {path: '/banrp', component: BanRP },
    {path: '/banat', component: BanAT }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    mode: 'hash',
    routes // (缩写) 相当于 router: routes
})


export default router;