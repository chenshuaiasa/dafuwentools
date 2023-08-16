<template>
  <div class="container-property2">
    <div class="property-name">
      <div class="pname">{{property_name}}</div>
      <div class="prentmsg">
        抵押金额：{{mortgage_amount}} /
        {{ redemption_amount }}
      </div>
    </div>
    <div class="property-rent"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      
    };
  },
  props: [
        "property_name",
        "price",
        "color",
        "classification",
        "rent_nothing",
        "rent_same",
        "rent_one_house",
        "rent_two_house",
        "rent_three_house",
        "rent_four_house",
        "rent_hotel",
        "mortgage_amount",
        "redemption_amount",
        "state",
      ],
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
