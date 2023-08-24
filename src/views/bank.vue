<template>
    <div>
        <van-nav-bar title="银行管理" left-text="返回" left-arrow @click-left="onClickLeft" />
        <!-- <van-overlay :show="show" @click="show = false" /> -->
        <!-- <van-dialog v-model="show" title="输入银行密码" show-cancel-button :overlay="show" lock-scroll
            :before-close="beforeClose">
            <van-form @submit="onSubmit">
                <van-field v-model="password" type="password" name="pass" label="密码" placeholder="请填写密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-form>
        </van-dialog> -->
        <CompontDialog :show="show" :p="bankinfo[0].password" :check="0" @checkResult="checkResult" v-if="show">
        </CompontDialog>
        <div v-if="showbank">
            <van-grid :gutter="10" :column-num="3" :square="false">
                <van-grid-item v-for="value in  functionItem " :key="value.id" @click="function_to(value.path)">
                    <van-icon :name="value.icon" size="30" />
                    <span v-bind:style="{ fontSize: '14px' }">{{ value.name }}</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>
<script>
import { Dialog } from 'vant';
import CompontDialog from '../components/compontDialog.vue';
import { Toast } from "vant";
export default {
    data() {
        return {
            temp: "",
            show: false,
            showbank: true,
            value: '',
            bankinfo: [{
                balance: '',
                flag: '',
                id: '',
                login_time: '',
                password: '',
                playername: '',
                property: '',
                state: '',
            }],
            password: '',
            functionItem: [
                { id: 1, name: "发放资金", path: 'bangm', icon: 'gold-coin' },
                { id: 2, name: "发放房地产", path: 'bangt', icon: 'gift-card' },
                // { id: 3, name: "发放房子", path: 'bangh',icon:'wap-home'},
                { id: 3, name: "恶魔卡，清空用户地产", path: 'banrp' },
                { id: 4, name: "初始化游戏", path: 'banig' },
                { id: 5, name: "查看转账记录" },
                { id: 6, name: "资产转移（类抢夺卡和抢购卡）", path: 'banat' },
            ]
        }
    },
    components: {
        CompontDialog
    },
    mounted: async function () {
        await this.$store.dispatch('asyncgetPlayerinfo');
        await this.$store.dispatch('asyncgetPropertyinfo');
        // await store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id: [id], player: playerinfo });
        // store.commit('getPlayerinfo_now',{playerid:id});
        // store.commit('getPlayerInfo_now2', payload.new);
        this.bankinfo = this.$store.state.playerinfo.find(val => {
            return (val.flag == -1)
        });

        if (this.bankinfo.login_time != null) {
            var d1 = new Date();
            // console.log(d1);
            var d2 = new Date(this.bankinfo.login_time);
            // console.log(d2);
            // console.log(d1-d2);
            if (d1 - d2 < 86400000) {
                this.show = false
            } else {
                this.show = true
            }
        } else {
            this.show = true
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
            // console.log("cs");
        },
        onSubmit: function (values) {
            // console.log(values)
        },
        async checkResult(flag) {
            // console.log('csss' + flag);
            if (flag) {
                this.showbank = true;
                var logintime = this.$datas.timeCode();
                await this.$datas.update_playerinfo({ login_time: logintime }, 'id', 101)
            } else {
                Toast('密码错误，请重新输入');
            }
        },
        function_to(path) {
            if (path == undefined) {
                null
            } else {
                this.$router.push({
                    path: path
                })
            }
        }
    }
};
</script>
  