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
        <!-- <CompontDialog :show="show" :p="bankinfo[0].password" :check="0" @checkResult="checkResult"></CompontDialog> -->
        <div v-if="showbank">
            <van-grid :gutter="10" :column-num="3" :square="false">
                <van-grid-item v-for="value in  functionItem " :key="value.id" @click="function_to(value.path)">
                    <van-image src="https://img01.yzcdn.cn/vant/apple-1.jpg" />
                    <span>{{ value.name }}</span>
                </van-grid-item>
            </van-grid>
        </div>
    </div>
</template>
<script>
import { Dialog } from 'vant';
import CompontDialog from '../components/compontDialog.vue';
export default {
    data() {
        return {
            temp: "",
            show: true,
            showbank: true,
            value: '',
            bankinfo: '',
            password: '',
            functionItem: [
                { id: 1, name: "发放资金", path: 'bangm' },
                { id: 2, name: "发放房地产" , path: 'bangt' },
                { id: 3, name: "恶魔卡，清空用户地产" },
                { id: 4, name: "初始化游戏" },
                { id: 5, name: "查看转账记录" }
            ]
        }
    },
    components: {
        CompontDialog
    },
    mounted: async function () {
        this.bankinfo = await this.$datas.getPlayerInfo("flag", -1)
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1);
            console.log("cs");
        },
        onSubmit: function (values) {
            console.log(values)
        },
        checkResult(flag) {
            console.log('csss' + flag);
            if (flag) {
                this.showbank = true;
            }
        },
        function_to(path) {
            if (path == undefined) {
                null
            } else {
                this.$router.push({ path: path })
            }

        }
    }
};
</script>
  