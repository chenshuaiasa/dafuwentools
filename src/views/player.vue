<template>
  <div v-if="$route.path == '/player'" class="container" style="width: 100%">
    <div class="header">
      <span>玩家主页</span>
    </div>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh()"> -->
    <div class="container-scroll">
      <div class="container-info" style="width: 100%">
        <div class="cell">
          <div class="cell-item playername">
            <div class="name1">
              <span>{{ playerinfo[0].playername }}</span>
            </div>
            <div class="name2">
              <span>player{{ playerinfo[0].id }}</span>
            </div>
          </div>
          <div class="cell-item info" style="width: 100%">
            <van-row type="flex" gutter="20" justify="space-between">
              <van-col span="12">
                <div class="info1" style="float: left; margin: 10px">
                  <span>账户余额：{{ playerinfo[0].balance }}</span>
                </div>
              </van-col>
              <van-col span="12">
                <div class="info2" style="float: right; margin: 10px">
                  <span>拥有土地数：{{ getHouseNum() }}</span>
                </div>
              </van-col>
            </van-row>
          </div>
        </div>
      </div>

      <div class="container-property">
        <div class="cell">
          <van-tabs v-model="active">
            <van-tab title="拥有的房地产">
              <div class="tiner">
                <van-grid :border="false" :column-num="3">
                  <van-grid-item v-for="value in propertyinfo2" :key="value.id">
                    <compontProperty :property_name="value.property_name" :mortgage_amount="value.mortgage_amount"
                      :redemption_amount="value.redemption_amount" :bg_color="value.color" :rent="value.rent"
                      :houselevel="value.house_level" :build_house_price="value.build_house_price"
                      :build_hotel_price="value.build_hotel_price" v-if="isGetData"></compontProperty>
                  </van-grid-item>
                </van-grid>
              </div>
            </van-tab>
          </van-tabs>
        </div>
      </div>
    </div>
    <!-- </van-pull-refresh> -->
    <div class="container-function">
      <van-tabbar route fixed>
        <!-- <van-tabbar-item  to="/home" icon="home-o">主页</van-tabbar-item> -->
        <van-tabbar-item to="/playerinfo" icon="search">查询玩家信息</van-tabbar-item>
        <van-tabbar-item :to="{path: 'transfer',query: {palyerid:playerid}}" icon="refund-o">转账</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
  <router-view v-else></router-view>
</template>
<script>
import compontProperty from "../components/compontProperty.vue";
import { Toast } from "vant";
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
    };
  },
  mounted: async function () {
    this.playerid = this.$route.query.palyerid;
    await this.InitPlayerinfo();
    if (this.playerinfo[0].property == null) {
      null
    }
    else {
      await this.InitPropertyinfo_from_player();
      this.getHouseLevel();
    }


  },
  components: {
    compontProperty,
  },
  methods: {
    onRefresh() {
      setTimeout(() => {
        Toast("刷新成功");
        this.isLoading = false;
        console.log("2222");
      }, 1000);
    },
    getRentLevel: function (houseid) {
      this.playerinfo.forEach((val) => {
        if (val.property.property_id == houseid.id) {
          return;
        }
      });
    },
    InitPlayerinfo: async function () {
      this.playerinfo = await this.$datas.getPlayerInfo("id", this.playerid);
      console.log(this.playerinfo);
    },
    InitPropertyinfo_from_player: async function () {
      var houses = [];

      this.playerinfo[0].property.forEach((val) => {
        houses.push(val.property_id);
      });
      console.log(houses);
      this.propertyInfo = await this.$datas.getPropertyInfo_from_player(
        "id",
        houses
      );
      this.propertyinfo2 = this.propertyInfo;
      // console.log(this.propertyinfo2);
    },
    getHouseLevel: function () {
      this.$nextTick(function () {
        this.playerinfo[0].property.forEach((val) => {
          this.propertyinfo2.forEach((v, index) => {
            if (val.property_id == v.id) {
              // console.log(val.house_level);
              this.propertyinfo2[index].house_level = val.house_level;
            }
          })

        });
      })
      // console.log("houseid"+typeof(houseid));
      this.isGetData = true;
      console.log(this.propertyinfo2);
    },
    getHouseNum: function () {
      if (this.playerinfo[0].property == null) {
        this.housenum = 0;
      }
      else {
        this.housenum = this.playerinfo[0].property.length;
      }
      return this.housenum
    }
  },
  computed: {

  },
};
</script>

<style scoped>
body {
  /* overflow: hidden; */
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

.cell-item.playername {
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
}

.tiner {
  height: 600px;
  overflow: auto;
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

  .container-property {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 100%;
    margin: 10px 0;
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

  .container-info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;

    position: -webkit-sticky;
    /* Safari */
    position: sticky;
    top: 0px;

    /* margin-top: 15px; */
  }
}
</style>
