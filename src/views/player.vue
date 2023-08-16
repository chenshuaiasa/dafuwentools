<template>
  <div class="container" style="width: 100%">
    <div class="header">
      <span>玩家主页</span>
    </div>
    <!-- <van-pull-refresh v-model="isLoading" @refresh="onRefresh()"> -->
    <div class="container-scroll">
      <div class="container-info" style="width: 100%">
        <div class="cell">
          <div class="cell-item playername">
            <div class="name1">
              <span>{{ playerinfo.playername }}</span>
            </div>
            <div class="name2">
              <span>player{{ playerinfo.id }}</span>
            </div>
          </div>
          <div class="cell-item info" style="width: 100%">
            <van-row type="flex" gutter="20" justify="space-between">
              <van-col span="12">
                <div class="info1" style="float: left; margin: 10px">
                  <span>账户余额：{{ playerinfo.balance }}</span>
                </div>
              </van-col>
              <van-col span="12">
                <div class="info2" style="float: right; margin: 10px">
                  <span>拥有土地数：{{ playerinfo.property }}</span>
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
                  <van-grid-item v-for="value in propertyInfo" :key="value.id">
                    <compontProperty
                      :property_name="value.property_name"
                      :mortgage_amount="value.mortgage_amount"
                      :redemption_amount="value.redemption_amount"
                    ></compontProperty>
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
        <van-tabbar-item replace to="/home" icon="home-o"> </van-tabbar-item>
        <van-tabbar-item replace to="/search" icon="search"> </van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import compontProperty from "../components/compontProperty.vue";
import { Toast } from "vant";
export default {
  data() {
    return {
      playerinfo: {
        id: 1,
        playername: "玩家1",
        balance: 0,
        property: {},
        state: 1,
      },
      icons: {},
      container: null,
      count: 0,
      isLoading: false,
      active: 0,
      propertyInfo: [
        {
          id: 1,
          property_name: "深圳",
          price: "",
          color: "",
          classification: {},
          build_house_price: 0,
          build_hotel_price: 0,
          rent: {},
          mortgage_amount: 500,
          redemption_amount: 550,
          state: 0,
        },
      ],
    };
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
  },
};
</script>

<style scoped>
body {
  /* overflow: hidden; */
}
.header {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 20px;
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

    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0px;

    /* margin-top: 15px; */
  }
}
</style>
