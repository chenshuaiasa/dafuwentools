<template>
    <div>
        <van-nav-bar title="转移资产" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <van-cell-group inset title="填写信息">
            <van-form @submit="onSubmit">
                <van-cell>
                    <van-field v-model="fieldValue" is-link readonly label="被转让的玩家和资产" placeholder="请选择玩家及资产"
                        :value="fieldValue" @click="show = true" />
                </van-cell>
                <van-popup v-model="show" round position="bottom">
                    <van-cascader v-model="cascaderValue" title="请选择玩家及资产" :options="geto1" @close="show = false"
                        active-color="#1989fa" @finish="onFinish1" />
                </van-popup>
                <van-cell>
                    <van-field v-model="fieldValue2" is-link readonly label="接收资产的玩家" placeholder="请选择玩家"
                        :value="fieldValue2" @click="show2 = true" />
                </van-cell>
                <van-popup v-model="show2" round position="bottom">
                    <van-cascader v-model="cascaderValue2" title="请选择玩家及资产" :options="geto2" @close="show = false"
                        active-color="#1989fa" @finish="onFinish2" />
                </van-popup>

                <van-cell>
                    <van-button round block type="info" native-type="submit">确认</van-button>
                </van-cell>
            </van-form>
        </van-cell-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: false,
            show2: false,
            fieldValue: '',
            fieldValue2: '',
            cascaderValue: '',
            cascaderValue2: '',
            chooseid: {},
            chooseid2: {},
            options1: [],
            options2: []
            // 选项列表，children 代表子选项，支持多级嵌套
        };
    },
    mounted: function () {
        this.getoptions1();
        this.getoptions2();
    },
    methods: {
        // 全部选项选择完毕后，会触发 finish 事件
        onFinish1({ selectedOptions }) {
            this.show = false;
            console.log(selectedOptions)
            this.fieldValue = selectedOptions.map((option) => option.text).join(' / ');
            this.chooseid.playerid = selectedOptions[0].value;
            if (selectedOptions.length == 1) {
                this.chooseid.propertyid = null;
            } else {
                this.chooseid.propertyid = selectedOptions[1].value;
            }
            this.getoptions2();
        },
        onFinish2({ selectedOptions }) {
            this.show2 = false;
            console.log(selectedOptions)
            this.fieldValue2 = selectedOptions.map((option) => option.text).join(' / ');
            this.chooseid2.playerid = selectedOptions[0].value;
            this.getoptions1();
        },
        onClickLeft: function () {
            this.$router.go(-1);
        },
        onSubmit: async function () {
            //调用转让函数
            if (this.chooseid.propertyid == null) {
                this.$toast.fail('没有选择资产');
            } else if (await this.$datas.assetTransfer(this.chooseid, this.chooseid2)) {
                this.$toast.success('转移成功');
                this.fieldValue = '';
                this.fieldValue2 = '';
                this.getoptions1();
                this.getoptions2();
            } else {
                this.$toast.fail('不满足转移条件');
            }

        },
        getoptions1: function () {
            var temp = [];
            this.$store.state.playerinfo.forEach(val => {
                if (val.id != this.chooseid2.playerid) {
                    if (val.id != 101) {
                        temp.push({ text: val.playername + '  player' + val.id, value: val.id });
                        if (val.property == null) {
                            temp[temp.length - 1].children = []
                        } else {
                            temp[temp.length - 1].children = []
                            val.property.propertys.forEach(v => {
                                var name = this.$store.state.propertyinfo.find(vs => {
                                    return (vs.id == v.property_id)
                                })
                                // console.log(name)
                                temp[temp.length - 1].children.push({ text: name.property_name, value: v.property_id })
                            })
                        }
                    }
                }

            })
            this.options1 = temp;
            return this.options1
            // console.log(temp)
            // return temp
        },
        getoptions2: function () {
            var temp = [];
            this.$store.state.playerinfo.forEach(val => {
                if (val.id != this.chooseid.playerid) {
                    temp.push({ text: val.playername + '  player' + val.id, value: val.id });
                }
            })
            // console.log(temp)
            this.options2 = temp;
            return this.options2
        }
    },
    computed: {
        geto1(){
            this.options1 = this.getoptions1()
            return this.options1
        },
        geto2(){
            this.options2 = this.getoptions2()
            return this.options2
        }

    }
};
</script>