<template>
  <div v-if="$route.name === 'login'" class="bg">
    <van-cell-group inset>
      <h3>登录游戏</h3>
      <van-form @submit="onSubmit">
        <van-field readonly clickable label="玩家" name="playid" :value="value" placeholder="选择玩家  必填"
          @click="showPicker = true" :rules="[{ required: true, message: '请选择玩家' }]" />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="saveColumns" @cancel="showPicker = false" @confirm="onConfirm"
            :value-key="SaveValuekey" />
        </van-popup>
        <van-field v-model="username" name="pname" label="pname" placeholder="用户名  必填"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码  必填"
          :rules="[{ validator, message: '请输入密码' }]" />
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
export default {
  data() {
    return {
      username: "",
      password: "",
      value: "",
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
    await this.InitPlayerinfo();
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      console.log(this.index);
      this.chooseid = parseInt(values.playid.substring(2));
      this.submitvalue = values;
      this.updateDataPlayerinfo({ playername: values.pname, password: values.password }, 'id', this.chooseid);
      this.toPlayer();
    },
    onConfirm(value, index) {
      this.value = value;
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
    InitPlayerinfo: async function () {
      this.players = await this.$datas.getPlayerInfo("flag", 1);
      console.log(this.players);
    },
    updateDataPlayerinfo: async function (data, co, v) {
      await this.$datas.update_playerinfo(data, co, v);
    },
    asyncValidator: function () {

    },
    validator(val) {
      var cs = parseInt(this.value.substring(2));
      this.players.forEach(v => {
        if (v.id == cs) {
          if (v.state == 1) {
            if (v.password == val)
              return true
            else
              return false
          } else {
            return true
          }
        }
        else {
          return false;
        }
      })

    },
  },
  computed: {
    saveColumns() {
      this.players.forEach((val) => {
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
