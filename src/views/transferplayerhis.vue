<template>
    <div>
        <van-nav-bar title="转账记录" left-text="返回" left-arrow @click-left="onClickLeft" />
        <table>
            <thead>
                <tr>
                    <th>时间</th>
                    <th>金额</th>
                    <th>交易对象</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in items" :key="item.id">
                    <td>{{ item.transfer_time }}</td>
                    <td>{{ item.money }}</td>
                    <td>{{ item.gender }}</td>
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
            items:[]
        }
    },
    mounted:function(){
       this.getTdata();
    },
    methods: {
        onClickLeft: function () {
            this.$router.go(-1);
            console.log("cs");
        },
        getTdata:async function(){
            this.items = await this.$datas.getTransferHis();
        }
        
    },
    
};
</script>
  