<template>
  <div v-if="$route.name === 'login'" class="bg">
    <van-cell-group inset>
      <h3>登录游戏</h3>
      <van-form @submit="onSubmit">
        <van-field readonly clickable label="玩家" name="playid" :value="value" placeholder="选择玩家"
          @click="showPicker = true" />
        <van-popup v-model="showPicker" round position="bottom">
          <van-picker show-toolbar :columns="saveColumns" @cancel="showPicker = false" @confirm="onConfirm"
            :value-key="SaveValuekey" />
        </van-popup>
        <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
          :rules="[{ required: true, message: '请填写用户名' }]" />
        <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]" />
        <div style="margin: 16px">
          <van-button round block type="info" native-type="submit">提交</van-button>
        </div>
      </van-form>
    </van-cell-group>
  </div>
  <router-view v-else></router-view>
</template>
<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      value1: 0,
      value: "",
      index: 0,
      valueKey: [],
      showPicker: false,
      columns: [],
      toPlayerPath: '/player',
      players: [
        { id: 1, playername: "玩家1", balance: 0, property: {}, state: 1 },
        { id: 2, playername: "玩家2", balance: 0, property: {}, state: 1 },
        { id: 3, playername: "玩家3", balance: 0, property: {}, state: 1 },
        { id: 4, playername: "玩家4", balance: 0, property: {}, state: 1 },
        { id: 5, playername: "玩家5", balance: 0, property: {}, state: 1 },
        { id: 6, playername: "玩家6", balance: 0, property: {}, state: 1 },
        { id: 101, playername: "银行", balance: 0, property: {}, state: 1 },
      ],
    };
  },
  mounted:async function(){
    await this.InitPlayerinfo();
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
      console.log(this.index);
      this.toPlayer();
    },
    onConfirm(value, index) {
      this.value = value;
      this.showPicker = false;
      this.index = index;
    },
    toPlayer() {
      this.$router.push({ path: 'player' });
    },
    InitPlayerinfo: async function () {
      this.players = await this.$datas.getPlayerInfo();
      console.log(this.playerinfo);
    },
  },
  computed: {
    saveColumns() {
      this.players.forEach((val) => {
        this.columns.push(val.playername);
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
</style>
