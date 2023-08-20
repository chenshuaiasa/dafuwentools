<template>
    <div>
        <van-dialog v-if="showw" v-model="shows" title="选择购买房子数" show-cancel-button :overlay="true" lock-scroll
            :before-close="beforeClose">
            <van-stepper v-if="com == 1 || com == 2" v-model="valuenum" disabled />
        </van-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            temp: '',
            password: '',
            shows: this.showcc,
            valuenum: 0,
        }
    },
    beforeMount: function () {
        this.shows = this.showcc;
    },
    mounted: function () {
        this.shows = this.showcc;
    },
    props: ["showcc", "p", "check", "com"],
    methods: {
        beforeClose(action, done) {
            var val = [this.valuenum];
            if (action === 'confirm') {
                this.$emit('checkResult', true, this.com, val);
                done();
            } else if (action === 'cancel') {
                if (this.check == 0) {
                    this.$router.go(-1);
                } else {
                    if (this.check == 1) {
                        this.$emit('checkResult', false, this.com, val);
                        done();
                    }
                }
            }
        },
        updete() {
            this.shows = this.showcc
        }
    },
    computed: {
        showw(newVal, oldVal) {
            this.shows = this.showcc;
            return this.shows;
        }
    }
}
</script>