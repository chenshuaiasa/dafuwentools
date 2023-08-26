<template>
    <div>
        <van-nav-bar title="转移资产" left-text="返回" left-arrow @click-left="onClickLeft" fixed />
        <van-cell-group inset title="填写信息">
            <van-form @submit="onSubmit">
                <van-cell>
                    <van-field v-model="fieldValue" is-link readonly label="被转让的玩家和资产" placeholder="请选择玩家及资产"
                        @click="show = true" />
                </van-cell>
                <van-popup v-model="show" round position="bottom">
                    <van-cascader v-model="cascaderValue" title="请选择玩家及资产" :options="getoptions1" @close="show = false"
                        active-color="#1989fa" @finish="onFinish1" />
                </van-popup>
                <van-cell>
                    <van-field v-model="fieldValue2" is-link readonly label="接收资产的玩家" placeholder="请选择玩家"
                        @click="show2 = true" />
                </van-cell>
                <van-popup v-model="show2" round position="bottom">
                    <van-cascader v-model="cascaderValue2" title="请选择玩家及资产" :options="getoptions2" @close="show = false"
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
            // 选项列表，children 代表子选项，支持多级嵌套
        };
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
        },
        onFinish2({ selectedOptions }) {
            this.show2 = false;
            console.log(selectedOptions)
            this.fieldValue2 = selectedOptions.map((option) => option.text).join(' / ');
            this.chooseid2.playerid = selectedOptions[0].value;
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
            } else {
                this.$toast.fail('不满足转移条件');
            }
        }
    },
    computed: {
        getoptions1: function () {
            var temp = [];
            this.$store.state.playerinfo.forEach(val => {
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
            })
            // console.log(temp)
            return temp
        },
        getoptions2: function () {
            var temp = [];
            this.$store.state.playerinfo.forEach(val => {
                temp.push({ text: val.playername + '  player' + val.id, value: val.id });
            })
            // console.log(temp)
            return temp
        }
    }
};
</script>