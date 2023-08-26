<template>
    <div class="container">
        <van-nav-bar title="转账记录" left-text="返回" left-arrow @click-left="onClickLeft" fixed />

        <van-cell-group inset title="账单信息">
            <van-cell title="收支总和">
                <template #default>
                    <span class="money-contents">{{total[1]+total[0]}}</span>
                </template>
                <template #label>
                    <div class="label-container">
                        <span class="label-content">收入：{{total[1]}}</span>
                        <span>  支出：{{total[0]}}</span>
                    </div>
                </template>
            </van-cell>
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
            pid: '',
            total: []
        }
    },
    mounted: async function () {
        // this.items = this.$store.state.transferhis;
        await this.$store.dispatch('asyncgetTransferHistory');
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
            var gamecode = this.$store.state.playerinfo.find(val => {
                return (val.id == 101)
            })
            var temps = this.$store.state.transferhis;
            temps.forEach(val => {
                if (val.game_code == gamecode.game_code) {
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
                }

            });
            console.log(temp);
            var total = [0, 0]
            temp.forEach(val => {
                if (val.ifzj == 0) {
                    total[0] = total[0] - val.money;
                }
                if (val.ifzj == 1) {
                    total[1] = total[1] + val.money;
                }
            })
            this.total = total;
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

.label-container {
    display: flex;
    justify-content: space-between;
}
.money-contents{
    color: rgb(26, 117, 255);
    font-size: 20px;
    font-weight: 800;
}
</style>