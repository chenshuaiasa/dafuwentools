<template>
    <div class="container">
        <van-nav-bar title="转账记录" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <van-cell-group inset title="账单信息">
            <van-cell v-for="item in getitems" :title="item.ifzj == 0 ? item.jsfname : item.zzfname">
                <template #label>
                    <div class="label-container">
                        <span class="label-content">{{ item.transfer_time }}</span>
                        <span>{{ item.ifzj == 0 ? "支出" : "收入" }}</span>
                    </div>
                </template>
                <template #default>
                    <span class="money-content">{{ item.ifzj == 0 ? "-" : "+" }}{{ item.money }}</span>
                </template>
            </van-cell>
        </van-cell-group>
    </div>
</template>
<script>
export default {
    data() {
        return {
            temp: "",
            items: [],
            pid: ''
        }
    },
    mounted: function () {
        // this.items = this.$store.state.transferhis;
        this.pid = this.$store.state.playerid;
    },
    methods: {
        onClickLeft: function () {
            this.$router.go(-1);
            console.log("cs");
        },
    },
    computed: {
        getitems: function () {
            var temp = [];
            var temps = this.$store.state.transferhis;
            temps.forEach(val => {
                if (val.zzf == this.$store.state.playerid) {
                    var cs = 0;
                    cs = val;
                    cs.ifzj = 0;
                    temp.push(cs);
                } else if (val.jsf == this.$store.state.playerid) {
                    var cs = 0;
                    cs = val;
                    cs.ifzj = 1;
                    temp.push(cs);
                }
            });
            console.log(temp)
            return temp
        }
    }
};
</script>
<style scoped>
.container {
    background-color: #f7f8fa;
}

.money-content {
    color: black;
    font-size: 16px;
    font-weight: 700;
}
.label-container{
    display: flex;
    justify-content: space-between;
}
</style>