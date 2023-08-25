<template>
    <div class="container" style="width: 100%">
        <van-nav-bar title="恶魔卡" left-text="返回" left-arrow @click-left="onClickLeft" />
        <h3>恶魔卡</h3>
        <van-form @submit="onSubmit">
            <van-field readonly placeholder="请选择恶魔卡对象" clickable label="玩家" name="playid" :value="value"
                :rules="[{ required: true, message: '请选择恶魔卡对象' }]" @click="saveColumns()" />
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
        <compontDialog :show="show" :p="getbankinfo" :check="1" @checkResult="checkResult" v-if="show">
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
            valueid: '',
            temp: "",
            players: [
                { id: 1, playername: "玩家1", balance: 0, property: {}, state: 1 },
            ],
            isLocalData: false,
            valueKey: [],
            showPicker: false,
            columns1: [],
            choseeId: "",
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
        // await this.InitPlayerinfo('');
        
        this.bankinfo = this.$store.state.playerinfo.find(val=>{
            return val.flag ==-1
        });
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
            this.$store.state.playerinfo.forEach((val) => {
                // console.log(JSON.stringify({'playername':val.playername,'id':val.id}))
                if (val.id == 101) {
                    null
                } else {
                    this.columns1.push({ "text": val.playername, "options": val.id });
                }

            });
            this.showPicker = true;
            // this.SaveValuekey();
            // console.log(this.columns1);
        },
        onConfirm(value, index) {
            this.showPicker = false;
            this.value = value.text
            this.valueid = value.options;

        },
        con() {
            // console.log('cs')
            this.showPicker = true;
        },
        onSubmit(values) {
            console.log(values);
            // this.choseeId = values.playid;
            this.$store.state.playerinfo.forEach((val) => {
                if (val.id == this.valueid)
                    this.choseeId = val
            })
            this.show = true;

            // console.log(this.valueKey)
        },
        checkResult(flag) {
            if (flag) {
                this.$datas.initGameplayer(this.choseeId);
                this.$toast.success('恶魔卡使用成功');
            } else {
                this.$toast.fail('密码错误');
            }

        },
    },
    computed: {
        getbankinfo: function () {
            var temp = this.$store.state.playerinfo.find(val=>{
            return val.flag ==-1
        });
            console.log(temp)
            return temp.password
        }

    },
};
</script>
