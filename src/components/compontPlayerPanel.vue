<template>
    <div>
        <div class="divc">
            <div class="container">
                <img class="playericon" :src="lujin">
                <!-- <span>wqdr </span> -->
                <div class="cell">
                    <div class="cell-item playername">
                        <div class="name1">
                            <span>{{ pname }}</span>
                        </div>
                        <div style="display:flex;padding:4px 0">
                            <van-tag plain round type="primary" size="medium" color="#858585">
                                <span style="padding:0 10px;font-size: 14px;">玩家{{ pid }}</span>
                            </van-tag>
                        </div>
                        <!-- <div class="name2">
                            <span>玩家{{ pid }}</span>
                        </div> -->
                    </div>
                    <div class="cell-item info">
                        <div class="info1">
                            <van-image width="50px" height="50px" fit="scale-down" :src="require('../assets/金币2.webp')" />
                            <div>
                                <span style="padding:0 5px">{{ pbanlance }}</span>
                            </div>
                        </div>
                        <div class="info2">
                            <van-image width="50px" height="50px" fit="scale-down" :src="require('../assets/房屋2.webp')" />
                            <span style="padding:0 5px">{{ ppnum }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    props: ["pname", "pid", "pbanlance", "ppnum", "lujin"],
}
</script>

<style scoped>
.divc {
    display: flex;
    justify-content: center;
    position: -webkit-sticky;
    /* Safari */
    position: fixed;
    z-index: 101;
    top: 70px;

}

.playericon {
    float: left;
    /* height: 100px; */
    width: 16%;
    margin: 2%;
}

.container {
    background-color: #8b8b8b;
    /* display: flex; */
    background-color: #ffffff;
    width: 95%;
    border-radius: 10px;
    margin-top: 10px;
    box-shadow: rgba(137, 137, 137, 0.35) 0px 5px 10px;
}

.cell {
    float: left;
    display: flex;
    flex-direction: column;
    align-items: flex-star;
    justify-content: space-evenly;
    width: 80%;
    height: 100%;
}


.name2 {
    /* float: left; */
    width: 63px;
    height: 25px;
    /* margin: 10px; */
    padding: 2px 5px;
    background-image: linear-gradient(#c49c4c, #ce7c00);
    border-radius: 0px 10px;
    font-size: px;
    font-weight: 400;
    text-align: center;
    color: #ffffff;
}

.name1 {
    /* float: left; */
    padding: 0 10px;
    margin: 5px;
    /* width: 72px; */
    height: 24px;
    font-size: 30px;
    font-weight: 700;
    text-align: left;
    color: rgb(51, 51, 51);
    font-family: 'STXinwei';
}

.cell-item {
    /* float: left; */
    display: flex;
    width: 100%;
    justify-content: flex-start;
    height: auto;
}

.info {
    flex-direction: row;
}

.playername {
    /* flex-direction: column;; */
    justify-content: flex-start;
}


.info1,
.info2 {
    /* float: left; */
    margin: 0px;
    display: flex;
    /* background-color: #5280d1; */
    font-size: 24px;
    font-weight: 700;
    padding: 0 5px;
    border-radius: 100px;
    align-items: center;
    /* border: 5px solid #7ea8e2 */

}

.info1 {
    color: rgb(212, 166, 27);
}

.info2 {
    color: rgb(19, 74, 183);
}

.icon {
    height: 50px;
}
</style>