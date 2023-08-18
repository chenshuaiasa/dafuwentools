<template>
    <div>
        <van-nav-bar title="转账" left-text="返回" left-arrow @click-left="onClickLeft" />
        <h3>转账</h3>
        <van-form @submit="onSubmit">
            <van-field readonly clickable label="玩家" name="playid" :value="value" placeholder="选择玩家"
                @click="columns1.length <= 0 ? saveColumns() : con()" />
            <van-field v-model="money" type="number" :rules="[{ required: true, message: '请输入金额' }]" label="转账金额" name="money"
                :value="value" placeholder="输入金额" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">提交</van-button>
            </div>
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="columns1" @cancel="showPicker = false" @confirm="onConfirm">
                    <template #option="item">
                        <span>{{ item.text }}</span>
                        <span> player{{ item.options }}</span>
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
            value: "",
            temp: "",
            players: [
                { id: 1, playername: "玩家1", balance: 0, property: {}, state: 1 },
                { id: 2, playername: "玩家2", balance: 0, property: {}, state: 1 },
                { id: 3, playername: "玩家3", balance: 0, property: {}, state: 1 },
                { id: 4, playername: "玩家4", balance: 0, property: {}, state: 1 },
                { id: 5, playername: "玩家5", balance: 0, property: {}, state: 1 },
                { id: 6, playername: "玩家6", balance: 0, property: {}, state: 1 },
                { id: 101, playername: "银行", balance: 0, property: {}, state: 1 },
            ],
            isLocalData: false,
            valueKey: [],
            showPicker: false,
            columns: [{
                text: '男',
                value: 1
            },
            {
                text: '女',
                value: 2
            }],
            columns1: [],
            choseeId: "",
            columns2: [
                { values: ["选项1", "选项2", "选项3"], defaultIndex: 0, options: [] },
                { values: ["选项A", "选项B", "选项C"], defaultIndex: 1, options: [] }
            ],
            playerid: 3,
            money: '',
            submitvalue:''
        };
    },
    mounted: async function () {
        await this.InitPlayerinfo("id,playername,state");
        console.log(this.columns1)
    },
    methods: {
        onClickLeft: function () {
            this.$router.go(-1);

        },
        InitPlayerinfo: async function (c1, c2, c3) {
            this.players = await this.$datas.getPlayerInfo('', '', c1);
            console.log(this.players);
        },
        saveColumns() {
            this.players.forEach((val) => {
                // console.log(JSON.stringify({'playername':val.playername,'id':val.id}))
                if (val.id == this.playerid) {
                    null
                } else {
                    this.columns1.push({ "text": val.playername, "options": val.id });
                }

            });
            this.SaveValuekey();
            console.log(this.columns1);
        },
        SaveValuekey() {
            this.players.forEach((val) => {
                this.valueKey.push(val.id + '');
            });
            this.showPicker = true;
        },
        onConfirm(value, index) {
            console.log(value.text + index);
            this.showPicker = false;
            this.value= value.text
            // console.log(this.valueKey)
        },
        removeLocal() {
            // sessionStorage.setItem('test',"ceshi")

            localStorage.removeItem("getplayers");
            localStorage.removeItem("getpcolumns");
            if (localStorage.getItem("getplayers") == null) {
                console.log("已删除")
            }

        },
        con() {
            console.log('cs')
            this.showPicker = true;
        },
        onSubmit(values){
            console.log('submit'+values);
            this.submitvalue = values;
        }
    },
    computed: {


    },
};
</script>
