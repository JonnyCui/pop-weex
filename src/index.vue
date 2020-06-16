<template>
    <div class="wrapper">
        <router-view/>
    </div>
</template>

<script>
    import {WxcButton, WxcPopup} from 'weex-ui';

    export default {
        name: 'App',
        components: {WxcButton, WxcPopup},
        data() {
            return {
                isShow: true
            }
        },
        methods:{
            redirect(){
                this.$router.push({path: '/wallet/vouchers?userGuid=b5471e3a86034916904049b71f030338'});
                this.isShow = false
            }
        }
    }
</script>

<style lang="scss">
    @import './common/scss/variable.scss';
    .wrapper {
        font-family: $font-asap;
        /*justify-content: center;*/
        /*align-items: center;*/
    }
</style>
