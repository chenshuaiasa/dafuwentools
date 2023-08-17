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

Vue.use(VueRouter)

const routes = [
    //主路由
    {
        path: '/',
        name: 'login',
        component: Player,
        // redirect:'/login',//重定向
        children: [
            //子路由
            // { path: 'login', component: Login },
            { path: 'bank', component: Bank },
            { path: 'ground', component: Ground },
            { path: 'player', component: Player },
            { path: 'playerinfo', component: Playerinfo },
            { path: 'transfer', component: Transfer },
            { path: 'transferbh', component: TransferBH },
            { path: 'transferph', component: TransferPH },
            { path: 'home', component: Home },
        ]
    }
]

// 3. 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
    routes // (缩写) 相当于 router: routes
})

export default router;