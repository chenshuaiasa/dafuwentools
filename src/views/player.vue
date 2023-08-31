<template>
  <div v-if="$route.path == '/player'" class="container" style="width: 100%">
    <compontDialogp v-if="showc" :com="com" :showcc="showc" :check="1" :title="title" @checkResult="checkResult">
    </compontDialogp>
    <compontPlayerPanel :pname="player.playername" :pid="getplayerid" :pbanlance="player.balance" :ppnum="getHouseNum"></compontPlayerPanel>
    <div class="header">
      <span>玩家主页</span>
    </div>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh()"> -->
    <div class="container-scroll">
      <!-- <div class="container-info" style="width: 100%">
        
        <div class="cell">
          <div class="cell-item playername">
            <div class="name1">
              <span>{{ player.playername }}</span>
            </div>
            <div class="name2">
              <span>player{{ getplayerid }}</span>
            </div>
          </div>
          <div class="cell-item info" style="width: 100%">
            <van-row type="flex" gutter="20" justify="space-between">
              <van-col span="12">
                <div class="info1" style="float: left; margin: 10px">
                  <span
                    style="background-color: rgb(226, 226, 226);color: rgb(0, 0, 0);padding: 5px;border-radius: 5px;">账户余额：{{
                      player.balance }}</span>
                </div>
              </van-col>
              <van-col span="12">
                <div class="info2" style="float: right; margin: 10px">
                  <span
                    style="background-color: rgb(226, 226, 226);color: rgb(0, 0, 0);padding: 5px;border-radius: 5px;">拥有土地数：{{
                      getHouseNum }}</span>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div> -->

      <div class="container-property">
        <div class="cell">
          <van-tabs v-model="active">
            <van-tab title="拥有的房地产">
              <!-- <compontScroll class="scroll"> -->
              <div class="tiner">
                <van-grid :border="false" :column-num="2">
                  <van-grid-item v-for="value in getpropertyinfo2" :key="value.id">
                    <compontProperty :property_name="value.property_name" :mortgage_amount="value.mortgage_amount"
                      :redemption_amount="value.redemption_amount" :bg_color="value.color" :rent="value.rent"
                      :houselevel="value.house_level" :build_house_price="value.build_house_price"
                      :build_hotel_price="value.build_hotel_price" @propertyFunction="propertyFunction"
                      :ifpledge="value.state == -2 ? true : false" v-if="isGetData">
                    </compontProperty>
                  </van-grid-item>
                </van-grid>
              </div>
              <!-- </compontScroll> -->
            </van-tab>
          </van-tabs>
        </div>
        <div v-bind:style="{ height: '40px', width: '100%', backgroundColor: '#FFFFFF' }">
          <!-- <span>''</span> -->
        </div>
      </div>

    </div>
    <!-- </van-pull-refresh> -->
    <div class="container-function">
      <van-tabbar route fixed>
        <!-- <van-tabbar-item  to="/home" icon="home-o">主页</van-tabbar-item> -->
        <van-tabbar-item to="/playerinfo" icon="search">查询玩家信息</van-tabbar-item>
        <van-tabbar-item :to="{ path: 'transfer' }" icon="refund-o">转账</van-tabbar-item>
        <van-tabbar-item :to="{ path: 'transferph' }" icon="balance-list-o">账单信息</van-tabbar-item>
      </van-tabbar>
    </div>
    <!-- </compontScroll> -->
  </div>
</template>

<script>
import compontProperty from "../components/compontProperty.vue";
import compontDialogp from "@/components/compontDialogp.vue";
import { Toast } from "vant";
// import eruda from 'eruda'
import compontPlayerPanel from "@/components/compontPlayerPanel.vue";
// import compontScroll from '../components/compontScroll.vue'
export default {
  data() {
    return {
      playerid: '',
      playerinfo: [
        {
          id: "",
          playername: "",
          balance: "",
          property: [1, 2],
          state: "",
        },
      ],
      icons: {},
      container: null,
      count: 0,
      isLoading: false,
      active: 0,
      propertyInfo: [{}],
      propertyinfo2: [{}],
      temp: [],
      isGetData: false,
      housenum: 0,
      com: 1,
      showc: false,
      choosehouse: '',
      title: '',
    }
  },
  mounted: async function () {
    // await this.$store.dispatch('asyncgetPlayerinfo');
    this.palyerid = this.$store.state.palyerid;
    // this.$store.commit('getPlayerinfo_now', { playerid:this.$store.state.playerid});
    // await this.$store.dispatch('asyncgetPropertyinfo');
    // await this.$store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id: [this.$store.state.palyerid], player: this.$store.state.playerinfo_now});
    await this.init_of_all();
  },
  components: {
    compontProperty,
    compontDialogp,
    compontPlayerPanel
    // compontScroll
  },
  methods: {
    async init_of_all() {
      this.playerid = this.$store.state.playerid;

      // this.$store.commit('getPlayerinfo_now', { playerid: this.playerid });
      // this.playerinfo = this.$store.state.playerinfo_now;
      // console.log(this.playerinfo);
      if (this.$store.state.playerinfo_now.property == null) {
        null
      }
      else {
        await this.InitPropertyinfo_from_player();
        this.getHouseLevel();
      }
    },
    InitPlayerinfo: async function () {
      // this.playerinfo = await this.$datas.getPlayerInfo("id", this.playerid);
      // this.$store.commit('getPlayerinfo_now', { playerid: this.playerid });
      this.playerinfo = this.$store.state.playerinfo_now;
      // console.log(this.playerinfo);
    },
    InitPropertyinfo_from_player: async function () {
      //获取所有房地产信息
      // await this.$store.dispatch('asyncgetPropertyinfo');
      this.propertyInfo = this.$store.state.propertyinfo;
      // console.log(this.propertyInfo);

      //获取当前用户的房地产信息
      console.log(this.$store.state.playerid);
      // await this.$store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id: [this.$store.state.playerid], player: this.$store.state.playerinfo_now});
      this.isGetData = true;
      // console.log(this.propertyinfo2);
    },
    //将用户信息里的房屋等级信息合并到地产信息；里，
    //以便渲染组件
    getHouseLevel: function () {
      this.$nextTick(function () {

      })
      // console.log("houseid"+typeof(houseid));
      this.isGetData = true;
      // console.log(this.propertyinfo2);
    },



    propertyFunction(index, pname) {
      //indnex =0 买房子
      if (index == 0) {
        this.com = 1;
        // console.log('csss??');
        this.title = "是否购买房子";
        this.showc = true;
        this.choosehouse = pname;
      }//indnex 2 抵押
      else if (index == 2) {
        this.com = 3;
        this.title = "是否抵押房地产";
        // console.log('csss??');
        this.showc = true;
        this.choosehouse = pname;
      }//indnex 1 卖房子
      else if (index == 1) {
        this.com = 2;
        // console.log('csss??');
        this.title = "是否出售房子";
        this.showc = true;
        this.choosehouse = pname;
      } else if (index == 4) {
        this.com = 4;
        // console.log('csss??');
        this.title = "是否赎回房子";
        this.showc = true;
        this.choosehouse = pname;
      }

    },
    async checkResult(flag, index_com, val) {
      // console.log(index_com);
      this.showc = false;
      if (flag) {
        console.log(index_com);
        if (index_com == 1) {
          // console.log(await this.$datas.buyhouse(this.playerinfo[0], this.choosehouse))
          if (await this.$datas.buyhouse(this.$store.state.playerinfo_now, this.choosehouse)) {

            this.$toast.success('购买成功');
            //刷新页面
          } else {
            this.$toast.fail('不满足购买条件');
          }
        }//2 卖房子
        else if (index_com == 2) {
          if (await this.$datas.salehouse(this.$store.state.playerinfo_now, this.choosehouse)) {
            this.$toast.success('售卖成功');
            //刷新页面
          } else {
            this.$toast.fail('不满足售卖条件');
          }
        }//3 抵押
        else if (index_com == 3) {
          if (await this.$datas.pledgehouse(this.$store.state.playerinfo_now, this.choosehouse)) {
            this.$toast.success('抵押成功');
            // await this.init_of_all();
            //刷新页面
            // setInterval(() => { this.$router.go(0); }, 1000);
          } else {
            this.$toast.fail('不满足抵押条件');
          }
        }//4 赎回
        else if (index_com == 4) {
          console.log('cssss')
          if (await this.$datas.redemptionhouse(this.$store.state.playerinfo_now, this.choosehouse)) {
            // console.log(this.$datas.redemptionhouse(this.$store.state.playerinfo_now, this.choosehouse))
            this.$toast.success('赎回成功');
            // await this.init_of_all();
            //刷新页面
            // setInterval(() => { this.$router.go(0); }, 1000);
          } else {
            this.$toast.fail('不满足赎回条件');
          }
        }
      }
    },

  },
  computed: {
    player: function () {
      //this.$store.dispatch();
      // this.$store.commit('getPlayerinfo_now', { playerid:this.$store.state.playerid});
      var id = this.$store.state.playerid;
      var playerinfo = this.$store.state.playerinfo_now;
      this.$store.dispatch('asyncgetPropertyinfo_of_player', { column: 'belong_to', id: [id], player: playerinfo });
      return this.$store.state.playerinfo_now
    },
    getplayerid: function () {
      return this.$store.state.playerid
    },
    //房地产数计算
    getHouseNum: function () {
      // console.log(this.playerinfo);
      if (this.$store.state.propertyinfo_of_player == null) {
        return 0
      } else {
        return this.$store.state.propertyinfo_of_player.length
      }
    },
    getpropertyinfo2: function () {
      // getHouseLevel();
      return this.$store.state.propertyinfo_of_player
    }
  },
}
</script>

<style scoped>
body {
  overflow: hidden;
}

.header {
  width: 100%;
  height: 70px;
  position: fixed;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  overflow: scroll;
  z-index: 100;
}

.container {
  background-color: #f7f8fa;
  padding: 12px;
  padding-left: env(safe-area-inset-left);
  padding-left: const(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
  padding-right: const(safe-area-inset-right);
}

.cell-item.playername {}

.name2 {
  float: right;
  width: 63px;
  height: 25px;
  background-image: linear-gradient(#ffd074, #ce7c00);
  border-radius: 0px 10px;
  font-size: 14px;
  font-weight: 400;
  text-align: center;
  color: #ffffff;
}

.name1 {
  float: left;
  margin: 10px;
  width: 72px;
  height: 24px;
  font-size: 18px;
  font-weight: 700;
  text-align: left;
  color: rgb(51, 51, 51);
}

.tiner {
  height: auto;
  /* overflow: auto; */
}

.container-function {
  position: fixed;
  bottom: 0;
  height: 100px;
  width: 100%;
}

.container-scroll {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 800px;
  /* overflow: auto; */
}

.container-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  position: -webkit-sticky;
  /* Safari */
  position: fixed;
  z-index: 101;
  top: 70px;
  /* margin-top: 15px; */
}

.cell {
  float: left;
  background-color: #ffffff;
  width: 95%;
  display: flex;
  flex-direction: column;
  align-items: flex-star;
  justify-content: space-evenly;
  border-radius: 10px;
}

.container-property {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  width: 100%;
  margin: 20px 0;
  height: auto;
  position: absolute;
  top: 180px;
}

.scroll {
  overflow: hidden;
  /* position: absolute; */
  /* bottom: 20px; */
  height: 50%;
}

</style>
