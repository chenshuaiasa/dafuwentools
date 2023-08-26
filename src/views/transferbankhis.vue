<template>
    <div class="container">
        <van-nav-bar title="转账记录" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <table class="tabels">
            <thead>
                <tr>
                    <th>转账用户</th>
                    <th>收款用户</th>
                    <th>金额(K)</th>
                    <th>时间</th>
                </tr>
            </thead>
            <tbody>
                <tr class="trs" v-for="item in items" :key="item.id">
                    <td>
                <tr class="trsc1">{{ item.zzfname }}</tr>
                <tr class="trsc2">（player{{ item.zzf }}）</tr>

                </td>
                <td>
                    <tr class="trsc1">{{ item.jsfname }}</tr>
                    <tr class="trsc2">（player{{ item.jsf }}）</tr>
                </td>
                <td>{{ item.money }}</td>
                <td>{{ item.transfer_time.substring(10, 15) }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            temp: "",
            items: []
        }
    },
    mounted: function () {
        this.items = this.$store.state.transferhis;
    },
    methods: {
        onClickLeft: function () {
            this.$router.go(-1);
            console.log("cs");
        },
    },
    
};
</script>
<style scoped>
.container {
    background-color: #f7f8fa;
    display: flex;
    flex-direction: column;
}

.tds1,
.tds2 {
    display: flex;
    flex-direction: column;
    align-items: center;
}

table {
    /* border:1px; */
    /* background-color: aquamarine; */
    border-collapse: collapse;
    background-color: #FFFFFF;
    margin: auto;
    width: 100%;
}

thead {
    position: sticky;
    z-index: 1;
    top: 45px;
    background-color: #f1f1f1;
    /* 设置表头背景颜色 */
    font-weight: bold;
    /* 设置表头字体为加粗 */
    height: 60px;
    font-size: 16px;
}
tbody{
    overflow: auto;
}
th,
td {
    padding: 8px;
    border: 1px solid #ccc;
    /* 单元格边框 */
    text-align: center;
}

.trs:nth-child(even) {
    background-color: #defaff;
}

tr {}

.trsc1 {
    font-size: 14px;
}

.trsc2 {
    font-size: 10px;
}
</style>