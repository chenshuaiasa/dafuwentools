<template>
  <div class="container-property2">
    <div class="property-name" v-bind:style="{ backgroundColor: bg_color }">
      <div class="pname">{{ property_name }}</div>
      <div class="prentmsg">
        抵押金额：{{ mortgage_amount }} /
        {{ redemption_amount }}
      </div>
    </div>
    <div class="property-rent">
      <div class="rent-money">
        <div style="display: flex; align-items: center; flex-direction: row">
          <!-- <img src="../assets/房屋租金.svg" style="width: 17px" /> -->
          <span
            style="
              font-size: 13px;
              font-weight: 700;
              text-align: left;
              color: rgb(51, 51, 51);
            "
            >租金：</span
          >
        </div>
        <div
          :class="[
            house_level == value.level ? 'rent-price-checked' : 'rent-price',
          ]"
          v-for="value in rent"
          :key="value.name"
        >
          {{ getRentUnit(value.price) }}
        </div>
      </div>
      <div class="houses">
        <div style="display: flex; align-items: center; flex-direction: row">
          <!-- <img src="../assets/房屋租金.svg" style="width: 17px" /> -->
          <span
            style="
              font-size: 13px;
              font-weight: 700;
              text-align: left;
              color: rgb(51, 51, 51);
            "
            >房屋：</span
          >
        </div>
        <div v-for="value in getHousNum(house_level)" :key="value.name">
          <img src="../assets/房屋.svg" style="width: 17px" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      housenum:{
        "P1":0,
        "P2":0,
        "P3":0,
        "H1":1,
        "H2":2,
        "H3":3,
        "H4":4,
        "H5":5,
      }
    };
  },
  props: {
    property_name: {},
    price: {},
    color: {},
    classification: {},
    rent: {},
    mortgage_amount: {},
    redemption_amount: {},
    state: {},
    bg_color: {},
    house_level: {},
  },

  mounted: function () {},
  methods: {
    getRentUnit: function (data) {
      // console.log(data);
      return data > 1000 ? data / 1000.0 + "M" : data + "K";
    },
    getHousNum:function(hl){
      return this.housenum[hl]
    }
  },
};
</script>

<style scoped>
.container-property2 {
  width: 162px;
  height: 150px;
  border-radius: 5px;
  background-color: rgb(255, 255, 255);
  box-shadow: rgba(137, 137, 137, 0.35) 0px 0px 5px;

  .property-name {
    background-color: #a8a8a8;
    border-radius: 5px 5px 0 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 40px;
    .pname {
      height: 18px;
      font-size: 13px;
      font-weight: 400;
      text-align: center;
      color: rgb(51, 51, 51);
      margin-top: 5px;
    }
    .prentmsg {
      width: 106px;
      height: 13px;
      font-size: 10px;
      font-weight: 400;
      text-align: center;
      color: rgb(245, 245, 245);
      margin-top: 3px;
    }
  }
  .property-rent {
    margin-top: 5px;
    .rent-money,.houses {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      justify-content: space-between;
      justify-content: flex-start;
      .rent-price,
      .rent-price-checked {
        width: 24px;
        font-size: 10px;
        font-weight: 400;
        text-align: center;
        color: rgb(51, 51, 51);
        margin: 2px;
        padding: 2px;
        border: 1px dashed #828282;
      }
      .rent-price-checked {
        background-color: #0088ff;
        color: #ffffff;
      }
    }
  }
}
</style>
