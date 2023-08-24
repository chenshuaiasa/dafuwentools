<template>
    <div class="container" style="width: 100%">
        <van-nav-bar title="发放金额" left-text="返回" left-arrow @click-left="onClickLeft" />
        <h3>发放金额</h3>
        <van-form @submit="onSubmit">
            <van-field v-model="valuename" readonly placeholder="请选择转账对象" clickable label="玩家" name="playid" 
                :rules="[{ required: true, message: '请选择转账对象' }]" @click="columns1.length <= 0 ? saveColumns() : con()" />
            <van-field v-model="money" type="number" :rules="[{ required: true, message: '请输入金额' }]" label="转账金额"
                name="money"  placeholder="输入金额">
                <template #extra>
                    <span>K</span>
                </template>
            </van-field>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="columns1" @cancel="showPicker = false" @confirm="onConfirm">
                    <template #option="item">
                        <span>{{ item.text }}</span>
                        <span> （player{{ item.options }}）</span>
                    </template>
                </van-picker>
            </van-popup>
        </van-form>
        <!-- <van-button @click="removeLocal()">清除本地缓存</van-button> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            valueid: "",
            valuename:"",
            temp: "",
            players: [
                { id: 1, playername: "玩家1", balance: 0, property: {}, state: 1 },
            ],
            isLocalData: false,
            // valueKey: [],
            showPicker: false,
            columns1: [],
            choseeId: "",
            // playerid: '',
            money: '',
            submitvalue: '',
            d_h: {},
            d_p:{},
            value1:'',
            option1:[{text:'K',value:0},{text:'M',value:1}]
        };
    },
    mounted: async function () {
        // this.playerid = this.$route.query.palyerid;
        this.players = this.$store.state.playerinfo.filter(val=>{
            return val.flag==1
        });
        // await this.InitPlayerinfo('');
        // console.log(this.columns1)
    },
    methods: {
        onClickLeft: function () {
            this.$router.go(-1);

        },
        saveColumns() {
            this.$store.state.playerinfo.forEach((val) => {
                // console.log(JSON.stringify({'playername':val.playername,'id':val.id}))
                if (val.id == 101) {
                    null
                } else {
                    this.columns1.push({ "text": val.playername, "options": val.id });
                }
            });
            // this.SaveValuekey();
            this.showPicker = true;
            console.log(this.columns1);
        },

        onConfirm(value, index) {
            this.showPicker = false;
            this.valueid = value.options;
            console.log(value);
            this.valuename = value.text;
            

        },
        con() {
            // console.log('cs')
            this.showPicker = true;
        },
        onSubmit(values) {
            var temp = this.$store.state.playerinfo;
            // console.log('submit' + values);
            this.submitvalue = values;
            var jsf = '';
            var jsf_balance_now = '';
            var jsfname = '';
            for (var i in temp) {
                // console.log(temp[i].playername);
                // console.log(this.submitvalue.playid);
                if (temp[i].id == this.valueid) {
                    jsf= temp[i].id;
                    jsf_balance_now= parseFloat(temp[i].balance) + parseFloat(this.submitvalue.money);
                    
                }
            }
            jsfname = this.submitvalue.playid;
            this.d_h = {id:Date.now(),zzf:101,jsf:jsf,jsf_balance_now:jsf_balance_now,money:this.submitvalue.money,transfer_time: this.$datas.timeCode(),jsfname:jsfname,zzfname:'银行'}
            // console.log(this.d);
            // console.log({balance:jsf_balance_now});
            this.updateDataPlayerinfo({balance:jsf_balance_now},'id',jsf);
            this.insertDataTransferHistopry(this.d_h);
            this.$toast.success('发放成功');
            this.valuename = '';
            this.money = '';
            // setInterval(() => { this.$router.go(0); }, 1000);
            // console.log(this.valueKey)
        },
        insertDataTransferHistopry: async function (data) {
            // console.log(data)
            await this.$datas.insert_transfer_history(data);
        },
        updateDataPlayerinfo:async function(data,co,v){
            await this.$datas.update_playerinfo(data,co,v);
        }
    }
};
</script>
