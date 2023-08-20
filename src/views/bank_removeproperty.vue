<template>
    <div class="container" style="width: 100%">
        <van-nav-bar title="恶魔卡" left-text="返回" left-arrow @click-left="onClickLeft" />
        <h3>恶魔卡</h3>
        <van-form @submit="onSubmit">
            <van-field readonly placeholder="请选择恶魔卡对象" clickable label="玩家" name="playid" :value="value"
                :rules="[{ required: true, message: '请选择恶魔卡对象' }]" @click="columns1.length <= 0 ? saveColumns() : con()" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">确认使用恶魔卡</van-button>
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
        <compontDialog :show="show" :p="bankinfo[0].password" :check="1" @checkResult="checkResult" v-if="show">
        </compontDialog>
        <!-- <van-button @click="removeLocal()">清除本地缓存</van-button> -->
    </div>
</template>
<script>
import compontDialog from '@/components/compontDialog.vue';
export default {
    data() {
        return {
            value: "",
            temp: "",
            players: [
                { id: 1, playername: "玩家1", balance: 0, property: {}, state: 1 },
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
            // playerid: '',
            money: '',
            submitvalue: '',
            d_h: {},
            d_p: {},
            value1: '',
            option1: [{ text: 'K', value: 0 }, { text: 'M', value: 1 }],
            show: false,
            bankinfo: []
        };
    },
    mounted: async function () {
        // this.playerid = this.$route.query.palyerid;
        await this.InitPlayerinfo('');
        this.bankinfo = await this.$datas.getPlayerInfo("flag", -1);
        // console.log(this.columns1)
    },
    components: {
        compontDialog
    },
    methods: {

        onClickLeft: function () {
            this.$router.go(-1);

        },
        InitPlayerinfo: async function (c1) {
            this.players = await this.$datas.getPlayerInfo('', '', c1);
            // console.log(this.players);
        },
        saveColumns() {
            this.players.forEach((val) => {
                // console.log(JSON.stringify({'playername':val.playername,'id':val.id}))
                if (val.id == 101) {
                    null
                } else {
                    this.columns1.push({ "text": val.playername, "options": val.id });
                }

            });
            this.SaveValuekey();
            // console.log(this.columns1);
        },
        SaveValuekey() {
            this.players.forEach((val) => {
                this.valueKey.push(val.id + '');
            });
            this.showPicker = true;
        },
        onConfirm(value, index) {
            this.showPicker = false;
            this.value = value.text

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
            // console.log('cs')
            this.showPicker = true;
        },
        onSubmit(values) {
            console.log(values);
            // this.choseeId = values.playid;
            this.players.forEach((val)=>{
                if(val.playername == values.playid)
                this.choseeId = val
            })
            this.show = true;
            
            // console.log(this.valueKey)
        },
        insertDataTransferHistopry: async function (data) {
            // console.log(data)
            await this.$datas.insert_transfer_history(data);
        },
        updateDataPlayerinfo: async function (data, co, v) {
            await this.$datas.update_playerinfo(data, co, v);
        },
        checkResult(flag) {
            if(flag){
                this.$datas.initGameplayer(this.choseeId);
                this.$toast.success('恶魔卡使用成功');
            }else{
                this.$toast.fail('密码错误');
            }
            
        },
    },
    computed: {


    },
};
</script>
