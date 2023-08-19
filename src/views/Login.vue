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
      players: [],
      chooseid:0,
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
          palyerid:this.chooseid
        }
      });
    },
    InitPlayerinfo: async function () {
      this.players = await this.$datas.getPlayerInfo();
      console.log(this.players);
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
</style>
