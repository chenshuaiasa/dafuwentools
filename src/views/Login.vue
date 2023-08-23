<template>
  <div v-if="$route.name === 'login'" class="bg">
    <van-cell-group inset>
      <h3>登录游戏</h3>
      <van-form @submit="onSubmit">
        <van-field readonly clickable label="玩家" name="playid" :value="playerchoose" placeholder="选择玩家  必填"
          @click="showPicker = true" :rules="[{ required: true, message: '请选择玩家' }]" />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="saveColumns" @cancel="showPicker = false" @confirm="onConfirm"
            :value-key="SaveValuekey" />
        </van-popup>
        <van-field v-model="username" name="pname" label="玩家名" placeholder="用户名  必填"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="digit" name="password" label="密码" placeholder="请输入密码 "
          :rules="[{ required: true, message: '请输入密码' }]" />
        <span
          style="font-size: 10px;float: left;margin: 10px auto 10px 15px;color:#bbbbbb;letter-spacing:1px">(仅数字，每次游戏首次登录随便输入但需记住)</span>
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </van-cell-group>
    <div style="margin: 16px; width:90%;height:auto;position: fixed;bottom: 0px;;">
      <!-- <button calss="login_to_bank">登录银行</button> -->
      <van-button type="primary" to="bank" size="large" hairline round block>登录银行</van-button>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
import { Toast } from "vant";
export default {
  data() {
    return {
      username: "",
      password: "",
      playerchoose: "",
      index: 0,
      valueKey: [],
      showPicker: false,
      columns: [],
      players: [],
      chooseid: 0,
      submitvalue: '',
      playid: ''
    };
  },
  mounted: async function () {
   await this.$store.dispatch('asyncgetPlayerinfo',{_this:this});
    this.InitPlayerinfo();
    console.log(this.$datasb.channel)
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      // console.log(this.index);
      console.log(this.checkPass(values.password));
      if (this.checkPass(values.password)) {
        this.chooseid = parseInt(values.playid.substring(2));
        this.submitvalue = values;
        this.updateDataPlayerinfo({ playername: values.pname, password: values.password,state:2}, 'id', this.chooseid);
        this.toPlayer();
      } else {
        Toast('密码不正确，请重新输入密码')
      }
    },
    onConfirm(value, index) {
      this.playerchoose = value;
      this.showPicker = false;
      this.index = index;
    },
    toPlayer() {
      console.log(this.$route.path)
      this.$router.push({
        path: 'player',
        query: {
          palyerid: this.chooseid,
          pname: this.submitvalue.pname
        }
      });
    },
    InitPlayerinfo: function () {
      // console.log(this.$store.state.playerinfo);
      this.players = this.$store.state.playerinfo;
      // this.$datas.getPlayerinfo();
      // console.log(this.players);
    },
    updateDataPlayerinfo: async function (data, co, v) {
      await this.$datas.update_playerinfo(data, co, v);
    },
    checkPass(val) {
      var cs = parseInt(this.playerchoose.substring(2));
      var flag = '';
      try {
        this.players.forEach(v => {
          if (v.id == cs) {
            console.log(v.id)
            if (v.state == 2) {
              if (v.password == val) {
                flag = true
                throw Error();
              }
              else{
                flag = false
                throw Error();
              }
            } else {
              flag = true
              throw Error();
            }
          }
        })
      }
      catch (error) {
        return flag
      }

      // console.log(cs)
    },
  },
  computed: {
    saveColumns() {
      this.players.forEach((val) => {
        if(val.flag == 1)
          this.columns.push('玩家' + val.id);
      });
      return this.columns;
    },
    SaveValuekey() {
      this.players.forEach((val) => {
        this.valueKey.push(val.id);
      });
      return this.valueKey + "";
    },
  },
};
</script>
<style scoped>
.bg {
  background-color: #f7f8fa;
  height: 100%;
}

.login_to_bank {
  width: 100px;
  height: 100px;
  padding: 10px;
  background-color: #1989fa;
  border-radius: 5px;
}
</style>
