<template>
    <div class="container" style="width: 100%">
        <CompontDialog :show="show" :p="bankinfo[0].password" :check="0" @checkResult="checkResult" v-if="show">
        </CompontDialog>

    </div>
</template>
<script>
import CompontDialog from '../components/compontDialog.vue';
export default {
    data() {
        return {
            value: "",
            show: true,
            bankinfo: [],
            propertyinfo: []
        };
    },
    components: {
        CompontDialog
    },
    mounted: async function () {
        this.bankinfo = await this.$datas.getPlayerInfo("flag", -1);
        this.propertyinfo = await this.$datas.getPropertyInfo_from_player();
    },
    methods: {
        checkResult(flag) {
            if (flag) {
                this.$router.go(-1);
                this.$toast.success('初始化成功');
                this.$datas.initGame(this.propertyinfo);
            }else{
                this.$toast.fail('密码不正确');
            }

        },

    },
};
</script>
