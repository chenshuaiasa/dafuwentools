<template>
  <div class="container-property2">
    <!-- <div><span>已抵押</span></div> -->
    <div class="cover" v-show="ifpledge">
      <van-popover v-model="showPopover2" trigger="click" :actions="getactions2" placement="bottom-start" :offset="[10, 30]"
        @select="onSelect2">
        <template #reference>
          <!-- <van-button type="primary" v-bind:style="{ position: 'absolute', left: '10px', marginTop: '8px', color: '#FFFFFF', }">浅色风格</van-button> -->
          <span v-show="ifpledge"
            v-bind:style="{ backgroundColor: '#00000080', padding: '5px', borderRadius: '5px', margin: '5px', position: 'absolute', color: '#FFFFFF', top: '0' }">已抵押</span>
        </template>
      </van-popover>
    </div>
    <!-- <van-popup v-model="show" closeable round close-icon-position="bottom-right">
      <div v-bind:style="{display:'flex'}">
          <compontProperty :property_name="property_name" :mortgage_amount="mortgage_amount"
          :redemption_amount="redemption_amount" :bg_color="bg_color" :rent="rent" :houselevel="house_level"
          :build_house_price="build_house_price" :build_hotel_price="build_hotel_price"
          @propertyFunction="propertyFunction" :ifpledge="ifpledge" v-if="isGetData" >
        </compontProperty>
        </div>
    </van-popup> -->


    <div class="property-name" v-bind:style="{ backgroundColor: bg_color }">
      <van-popover v-model="showPopover" trigger="click" :actions="getactions1" @select="onSelect" style="width: 100%;">
        <template #reference>
          <div class="pname">{{ property_name }}</div>
        </template>
      </van-popover>
      <div v-bind:style="{ backgroundColor: '#FFFFFF', width: '100%' }">
        <div class="temp">
          <div class="rentmoney_now">
            <!-- <img src="../assets/租金.webp" style="width: 17px" /> -->
            <van-image width="17px" fit="scale-down" :src="require('../assets/租金.webp')" />
            <div :class="[houselevel == value.level ? 'rent-price-checked' : 'rent-price',]" v-for="value in rent"
              :key="value.name">
              {{ getRentUnit(value.price) }}
            </div>
          </div>
          <div class="rentmoney_now">
            <!-- <img src="../assets/房屋icon.webp" style="width: 17px" /> -->
            <van-image width="22px" fit="cover" :src="require('../assets/房屋icon.webp')" />
            <span v-bind:style="{ paddingLeft: '5px' }">{{ getHousNum(houselevel) }} 个</span>
          </div>
        </div>
        <!-- <div class="prentmsg">
          抵押金额：{{ mortgage_amount }} /
          {{ redemption_amount }}
        </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import compontProperty from './compontProperty.vue';
export default {
  data() {
    return {
      housenum: {
        "P1": 0,
        "P2": 0,
        "P3": 0,
        "P4": 0,
        "H1": 1,
        "H2": 2,
        "H3": 3,
        "H4": 4,
        "H5": 5,
      },
      house_level2: '',
      // actions: [{ text: '买房子'+"k" }, { text: '卖房子' }, { text: '抵押' }],
      actions2: [{ text: '赎回房子' }],
      showPopover: false,
      showPopover2: false,
      show: true,
      isGetData: true,
    };
  },
  props: ["property_name",
    "price",
    "color",
    "classification",
    "rent",
    "mortgage_amount",
    "redemption_amount",
    "state",
    "bg_color",
    "houselevel",
    "build_house_price",
    "build_hotel_price",
    "ifpledge"
  ]
  ,
  components: {
    compontProperty
  },
  mounted: function () { },
  methods: {
    getRentUnit: function (data) {
      // console.log(data);
      return data > 1000 ? data / 1000.0 + " M" : data + " K";
    },
    getHousNum: function (hl) {
      // console.log(hl);
      return this.housenum[hl]
    },
    onSelect(action, index) {
      // console.log(index)0 1 2
      console.log(index);
      this.$emit('propertyFunction', index, this.property_name)
    },
    onSelect2(action, index) {
      // console.log(index)0 1 2
      this.$emit('propertyFunction', 4, this.property_name)
    }
  },
  watch: {
  },
  computed: {
    getactions1() {
      if (this.housenum[this.houselevel] <= 4) {
        var actions = [{ text: '买房子 / ' + this.build_house_price + "K" }, { text: '卖房子 / ' + this.build_house_price / 2 + "K" }, { text: '抵押 / ' + this.mortgage_amount + 'K' }];
      } else {
        var actions = [{ text: '买房子 / ' + this.build_hotel_price + "K" }, { text: '卖房子 / ' + this.build_hotel_price / 2 + "K" }, { text: '抵押 / ' + this.mortgage_amount + 'K' }];
      }
      return actions
    },
    getactions2() {
      var actions = [{ text: '赎回 / '+this.redemption_amount+ "K"}];
      return actions
    },
  }
};
</script>

<style scoped>
.cover {
  width: 162px;
  height: 98px;
  /* min-height: 100%; */
  background-color: #00000040;
  position: absolute;
  /* float: left; */
  border-radius: 5px;
  /* display: flex; */
  flex-direction: column;
  align-items: flex-start;
  /* z-index: 102; */
  /* top: 0; */
  /* bottom: 0; */
  /* left: 0; */
  /* width: max-content; */
  /* width: 100%; */
  /* height: 100%; */
  /* padding-bottom: 500px; */
}

.container-property2 {
  width: 100%;
  height: auto;
  border-radius: 5px;
  background-color: rgb(0, 0, 0);
  box-shadow: rgba(137, 137, 137, 0.35) 0px 0px 5px;
  overflow: hidden;
  /* z-index: 999; */
  /* white-space: nowrap; */
  /* margin-left: -50%; */

}



.property-name {
  background-color: #a8a8a8;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.pname {
  /* height: 18px; */
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #FFFFFF;
  margin-top: 5px;
  padding: 3px;
}

.prentmsg {
  width: auto;
  height: auto;
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  color: #8a8a8a;
  margin-top: 3px;
  margin-bottom: 3px;
  padding: 3px;
  /* border-radius: 5px; */
}

.property-rent {
  margin-top: 5px;
  display: flex;
  height: 60%;
  flex-direction: column;
  justify-content: space-around;
}

.houses {
  display: flex;
  flex-direction: column;
  align-items: start;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-content: flex-start;
  margin-left: 5px;
}

.house_price {
  font-size: 10px;
  font-weight: 400;
  text-align: center;
  color: rgb(153, 153, 153);
}

.rent-money {
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  justify-content: flex-start;
  margin-left: 5px;
}

.rent-price {
  display: none;
}

.rent-price-checked {
  width: auto;
  /* font-size: 10px; */
  /* font-weight: 400; */
  text-align: center;
  /* color: rgb(51, 51, 51); */
  margin: 2px;
  /* padding: 3px 4px; */
  /* border: 1px dashed #828282; */
}

.rent-price-checked {
  /* background-color: #0088ff; */
  /* color: #ffffff; */
  /* border: 0px dashed #828282; */
}

.temp {
  display: flex;
  flex-direction: row;
  align-items: center;
  color: #333333;
  justify-content: space-around;
}

.rentmoney_now {
  margin: 10px 0px;
  display: flex;
  background-color: #d1b43450;
  padding: 3px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: 600;
  box-shadow: rgba(137, 137, 137, 0.35) 0px 5px 10px;
  padding: 5px;
  align-items: center;
  color: #37887d
}
</style>

