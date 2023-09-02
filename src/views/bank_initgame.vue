<template>
    <div class="container" style="width: 100%">
        <van-nav-bar title="初始化游戏" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <van-cell-group inset title="填写信息">
            <van-cell>
                <van-form @submit="onSubmit">
                    <van-field v-model="gamecode" placeholder="请输入游戏编码"  label="游戏编码" name="gamecode"
                        :rules="[{ required: true, message: '请输入游戏编码' }]" />
                    <div style="margin: 16px;">
                        <van-button round block type="info" native-type="submit">确认</van-button>
                    </div>
                </van-form>
            </van-cell>
        </van-cell-group>
        <CompontDialog :showcc="show" :p="bankinfo.password" :check="0" @checkResult="checkResult" v-if="show">
        </CompontDialog>

    </div>
</template>
<script>
import CompontDialog from '../components/compontDialog.vue';
export default {
    data() {
        return {
            value: "",
            show: false,
            bankinfo: [],
            propertyinfo: [],
            gamecode:''
        };
    },
    components: {
        CompontDialog
    },
    mounted: async function () {
        this.bankinfo = this.$store.state.playerinfo.find(val => {
            return val.flag == -1
        });
        this.propertyinfo = this.$store.state.propertyinfo;
    },
    methods: {
        onClickLeft: function () {
            this.$router.go(-1);

        },
        checkResult(flag) {
            if (flag) {
                this.$router.go(-1);
                this.$toast.success('初始化成功');
                this.$datas.initGame(this.propertyinfo);
                this.$datas.update_playerinfo({game_code:this.gamecode},'id',101)
            } else {
                this.$toast.fail('密码不正确');
            }
        },
        onSubmit(value){
            // console.log(value)
            this.show = true;
            
        }

    },
};
</script>
