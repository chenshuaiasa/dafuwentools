<template>
  <div class="container-property2">
    <!-- <div><span>已抵押</span></div> -->
    <div class="cover" v-show="ifpledge">
      <van-popover v-model="showPopover2" trigger="click" :actions="actions2" placement="right-start" :offset="[0, 70]"
        @select="onSelect2">
        <template #reference>
          <!-- <van-button type="primary" v-bind:style="{ position: 'absolute', left: '10px', marginTop: '8px', color: '#FFFFFF', }">浅色风格</van-button> -->
          <div v-show="ifpledge" v-bind:style="{ left: '0px', marginTop: '0px', color: '#FFFFFF', }">
            <span
              v-bind:style="{ backgroundColor: '#00000080', padding: '5px', borderRadius: '5px', margin: '5px', position: 'absolute' }">已抵押</span>
          </div>
        </template>
      </van-popover>
    </div>
    <van-popover v-model="showPopover" trigger="click" :actions="actions" @select="onSelect" style="width: 100%;">
      <template #reference>
        <div class="property-name" v-bind:style="{ backgroundColor: bg_color }">
          <div class="pname">{{ property_name }}</div>
          <div class="prentmsg">
            抵押金额：{{ mortgage_amount }} /
            {{ redemption_amount }}
          </div>
        </div>
      </template>
    </van-popover>

    <div class="property-rent">
      <div class="rent-money">
        <div style="display: flex; align-items: center; flex-direction: row">
          <!-- <img src="../assets/房屋租金.svg" style="width: 17px" /> -->
          <span style="
              font-size: 13px;
              font-weight: 700;
              text-align: left;
              color: rgb(51, 51, 51);
            ">租金：</span>
        </div>
        <div :class="[houselevel == value.level ? 'rent-price-checked' : 'rent-price',]" v-for="value in rent"
          :key="value.name">
          {{ getRentUnit(value.price) }}

        </div>
      </div>
      <div class="houses">
        <div style="display: flex; align-items: center; flex-direction: row">
          <!-- <img src="../assets/房屋租金.svg" style="width: 17px" /> -->
          <span style="
              font-size: 13px;
              font-weight: 700;
              text-align: left;
              color: rgb(51, 51, 51);
            ">房屋：</span>
          <div v-for="value in getHousNum(houselevel)" :key="value.name">
            <img src="../assets/房屋.svg" style="width: 17px" />
          </div>
        </div>
        <div class="house_price">
          <span>房屋：{{ build_house_price }}；旅馆：{{ build_hotel_price }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
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
      actions: [{ text: '买房子' }, { text: '卖房子'},{ text: '抵押' }],
      actions2: [{ text: '赎回房子' }],
      showPopover: false,
      showPopover2: false,
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

  mounted: function () { },
  methods: {
    getRentUnit: function (data) {
      // console.log(data);
      return data > 1000 ? data / 1000.0 + "M" : data + "K";
    },
    getHousNum: function (hl) {
      // console.log(hl);
      return this.housenum[hl]
    },
    onSelect(action, index) {
      // console.log(index)0 1 2
      this.$emit('propertyFunction', index, this.property_name)
    },
    onSelect2(action, index) {
      // console.log(index)0 1 2
      this.$emit('propertyFunction', 4, this.property_name)
    }
  },
  watch: {
  }
};
</script>

<style scoped>
.cover {
  width: 162px;
  height: 170px;
  background-color: #00000040;
  position: absolute;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.container-property2 {
  width: 162px;
  height: 170px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(137, 137, 137, 0.35) 0px 0px 5px;

  .property-name {
    background-color: #a8a8a8;
    border-radius: 5px 5px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;

    .pname {
      height: 18px;
      font-size: 18x;
      font-weight: 600;
      text-align: center;
      color: #FFFFFF;
      margin-top: 5px;
    }

    .prentmsg {
      width: auto;
      height: auto;
      font-size: 10px;
      font-weight: 400;
      text-align: center;
      color: rgb(245, 245, 245);
      margin-top: 3px;
      margin-bottom: 3px;
      padding: 3px;
    }
  }

  .property-rent {
    margin-top: 5px;
    display: flex;
    height: 60%;
    flex-direction: column;
    justify-content: space-around;

    .rent-money {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      justify-content: flex-start;
      margin-left: 5px;

      .rent-price,
      .rent-price-checked {
        width: auto;
        font-size: 10px;
        font-weight: 400;
        text-align: center;
        color: rgb(51, 51, 51);
        margin: 2px;
        padding: 3px 4px;
        border: 1px dashed #828282;
      }

      .rent-price-checked {
        background-color: #0088ff;
        color: #ffffff;
        border: 0px dashed #828282;
      }


    }

    .houses {
      display: flex;
      flex-direction: column;
      align-items: start;
      flex-wrap: wrap;
      justify-content: space-between;
      justify-content: flex-start;
      margin-left: 5px;

      .house_price {
        font-size: 10px;
        font-weight: 400;
        text-align: center;
        color: rgb(153, 153, 153);
      }
    }
  }
}
</style>
