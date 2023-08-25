<template>
    <div class="container" style="width: 100%">
        <van-nav-bar title="发放土地" left-text="返回" left-arrow @click-left="onClickLeft" />
        <h3>发放土地</h3>
        <van-form @submit="onSubmit">
            <van-field readonly placeholder="请选择发放对象" clickable label="玩家" name="playid" :value="valuename"
                :rules="[{ required: true, message: '请选择发放对象' }]" @click="showPicker = true" />
            <van-field readonly placeholder="请选择土地" clickable label="土地" name="propertyname" :value="value2name"
                :rules="[{ required: true, message: '请选择土地' }]" @click="showPicker2 = true" />
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">确认</van-button>
            </div>
            <van-popup v-model="showPicker" round position="bottom">
                <van-picker show-toolbar :columns="getcolumn1" @cancel="showPicker = false" @confirm="onConfirm">
                    <template #option="item">
                        <span>{{ item.text }} </span>
                        <span> （player{{ item.options }}）</span>
                    </template>
                </van-picker>
            </van-popup>
            <van-popup v-model="showPicker2" round position="bottom">
                <van-picker show-toolbar :columns="getcolumn2" @cancel="showPicker2 = false" @confirm="onConfirm2">
                    <template #option="item">
                        <span
                            v-bind:style="{ backgroundColor: item.color, color: '#FFFFFF', padding: '5px 10px', width: '80%', borderRadius: '5px' }">{{
                                item.text }} </span>
                    </template>
                </van-picker>
            </van-popup>
        </van-form>
        <!-- <van-button @click="removeLocal()">清除本地缓存</van-button> -->
    </div>
</template>
<script>
import { Toast } from "vant";
export default {
    data() {
        return {
            valuename: "",
            valueid: '',
            value2name: "",
            temp: "",
            players: [
                { id: 1, playername: "玩家1", balance: 0, property: {}, state: 1 },
            ],
            isLocalData: false,
            valueKey: [],
            showPicker: false,
            showPicker2: false,
            columns: [{
                text: '男',
                value: 1
            },
            {
                text: '女',
                value: 2
            }],
            columns1: [],
            columns2: [],
            choseeId: "",
            // playerid: '',
            money: '',
            submitvalue: '',
            d_h: {},
            d_p: {},
            property_info: [{}],
            property: [
                {
                    "property_id": 101,
                    "classification": "10",
                    "house_level": "H1",
                    "house_num": 1
                }
            ],
        };
    },
    mounted: async function () {
        // this.players = this.$store.state.playerinfo;
        // this.property_info = this.$store.state.propertyinfo;
        // this.property = this.players[0].property;
    },
    methods: {
        onClickLeft: function () {
            this.$router.go(-1);

        },
        onConfirm(value, index) {
            this.showPicker = false;
            this.valuename = value.text
            this.valueid = value.options;

        },
        onConfirm2(value, index) {
            this.showPicker2 = false;
            this.value2name = value.text;
        },

        async onSubmit(values) {
            var playerinfo = [];
            //1 生成playerinfo
            console.log(values)
            playerinfo = this.$store.state.playerinfo.find(val => {
                return val.id == this.valueid
            });
            //2 生成propertyinfo
            var prop = {};
            this.$store.state.propertyinfo.forEach((val) => {
                if (val.property_name == values.propertyname) {
                    prop.property_id = val.id;
                    prop.classification = val.classification;
                    prop.house_level = "P1";
                    prop.house_num = 0;
                    prop.state = val.state;
                }
            })
            //3 调用函数
            this.$datas.giveProperty(playerinfo, prop);
            //4 更新后，toast提示用户已更新，调用函数清空选择器

            this.removeValue();
            this.$toast.success('发放成功');

        },
        insertDataTransferHistopry: async function (data) {
            // console.log(data)
            await this.$datas.insert_transfer_history(data);
        },
        updateDataPlayerinfo: async function (data, co, v) {
            await this.$datas.update_playerinfo(data, co, v);
        },
        updeteDataPropertyinfo: async function (d, c, v) {
            await this.$datas.update_PropertyInfo(d, c, v)
        },
        //更新数据后，清空选项框内容，防止重复和意外提交
        removeValue: function () {
            this.valuename = '';
            this.value2name = '';
        }
    },
    computed: {
        getcolumn1: function () {
            var temp = [];
            this.$store.state.playerinfo.forEach((val) => {
                // console.log(JSON.stringify({'playername':val.playername,'id':val.id}))
                if (val.id == 101) {
                    null
                } else {
                    temp.push({ "text": val.playername, "options": val.id });
                }
            });
            return temp
        },
        getcolumn2: function () {
            var temp = [];
            this.$store.state.propertyinfo.forEach((val) => {
                if (val.state == 1)
                    temp.push({ "text": val.property_name, "color": val.color });
            })
            return temp
        }
    },
};
</script>
