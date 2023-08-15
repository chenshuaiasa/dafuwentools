<template>
  <van-grid :border="false" :column-num="2">
    <van-grid-item v-for="value in prpertyInfo" :key="value">
      <div class="container-property2">
        <div class="property-name">
          <div class="pname">{{ value.property_name }}</div>
          <div class="prentmsg">
            抵押金额：{{ value.redemption_amount }} /
            {{ value.redemption_amount }}
          </div>
        </div>
      </div>
      <div class="property-rent"></div>
    </van-grid-item>
  </van-grid>
</template>
<script>
export default {
  data() {
    return {
      prpertyInfo: [
        {
          id: 1,
          property_name: "深圳",
          price: "",
          color: "",
          classification: {},
          rent_nothing: {},
          rent_same: {},
          rent_house: {},
          mortgage_amount: 500,
          redemption_amount: 550,
        },
      ],
    };
  },
};
</script>

<style scoped>
.container-property2 {
  background-color: #ffffff;
  width: 162px;
  height: 150px;
  border-radius: 5px;
  box-shadow: rgba(137, 137, 137, 0.35) 0px 0px 5px;
}
</style>
