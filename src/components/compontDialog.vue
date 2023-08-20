<template>
    <div>
        <van-dialog v-model="shows" title="输入银行密码" show-cancel-button :overlay="true" lock-scroll
            :before-close="beforeClose">
                <van-field v-model="password" type="digit" name="pass" label="密码" placeholder="请填写密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
        </van-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            temp: '',
            password: '',
            shows:this.show
        }
    },
    props: ["show", "p", "check"],
    methods: {
        beforeClose(action, done) {
            if (action === 'confirm') {
                if (this.p == this.password) {
                    done();
                    this.$emit('checkResult',true)
                } else {
                    done(false);
                    this.$emit('checkResult',false)
                }
            } else if (action === 'cancel') {
                if (this.check == 0) {
                    this.$router.go(-1);
                } else {
                    if (this.check == 1)
                        done()
                }

            }
        }
    }
}
</script>