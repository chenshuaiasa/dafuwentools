<template>
    <div ref="wrapper">
        <div class="content">
            <slot></slot>
        </div>
    </div>
</template>
  
<script>
import BScroll from 'better-scroll'
export default {
    data() {
        return {
            scroll: null
        }
    },
    props:["ifscoll"],
    // 组件创建完后调用。
    mounted() {
        this.scroll = new BScroll(this.$refs.wrapper, {
            click: true,
            // scrollbar: true,
        })
    }

}
</script>
  
<style scoped></style>
  