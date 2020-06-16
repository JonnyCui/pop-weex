<template>
    <wxc-tab-page   ref="wxc-tab-page"
                    :tab-styles="tabStyles"
                    :tab-titles="tabList"
                    :tab-page-height="tabPageHeight"
                    title-type="text"
    >
        <list v-for = "tab in tabList"
                :key = tab.index >
            <div v-if="tab.index === 1">
                <div v-if="contents.length === 0">
                    <image src="../src/assets/nodata.jpg" style="width: 750px; height: 1064px"></image>
                </div>
            </div>
            <div v-if="tab.index === 2">
                <div v-if="expired.length === 0">
                    <image src="../src/assets/nodata.jpg" style="width: 750px; height: 1064px"></image>
                </div>
                <div v-else>
                    <div v-for="(item, index) in expired" :key="index">
                        <VoucherItem :data-item="item"></VoucherItem>
                    </div>
                </div>
            </div>
        </list>
    </wxc-tab-page>
</template>

<script>
    import VoucherItem from '@/components/VoucherListItem';
    import {WxcTabPage, Utils, BindEnv} from 'weex-ui';
    const stream = weex.requireModule('stream');
    const modal = weex.requireModule('modal');
    const API = 'http://api.mytimerec.com/api/coupon/list/';

    export default {
        name: "VouchersIndex",
        components: {
            VoucherItem,
            WxcTabPage
        },
        data() {
            return {
                contents : [],
                expired : [],
                tabList: [
                    { title: "Available" , index: 1},
                    { title: "Expired" , index: 2}
                    ],
                tabStyles: {
                    bgColor: '#FFFFFF',
                    titleColor: '#666666',
                    activeTitleColor: '#3D3D3D',
                    activeBgColor: '#FFFFEE',
                    isActiveTitleBold: true,
                    width: 375,
                    height: 120,
                    fontSize: 24,
                    hasActiveBottom: true,
                    activeBottomColor: '#FFC900',
                    activeBottomHeight: 6,
                    activeBottomWidth: 200,
                    textPaddingLeft: 10,
                    textPaddingRight: 10,
                },
                tabPageHeight: 1334
            }
        },
        created() {
            console.log("UserGuid: ",this.$route.query.userGuid);
            this.tabPageHeight = Utils.env.getPageHeight();
            this.apiRequest(1);
            this.apiRequest(2);
        },
        methods:{
            apiRequest(pointer){
                const self = this;
                stream.fetch({
                    method: 'GET',
                    url: API + pointer + '?userGuid=' + this.$route.query.userGuid,
                    type:'json'
                }, function(ret) {
                    if (!ret.ok) {
                        modal.toast({
                            message: 'Network Error!',
                            duration: 3
                        });
                    } else {
                        if (pointer === 1){
                            console.log("Ava", ret.data.data);
                            self.contents = self.contents.concat(ret.data.data);
                        }else if (pointer === 2){
                            self.expired = self.expired.concat(ret.data.data);
                            console.log("Expired", self.expired)
                        }
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/scss/variable.scss';

</style>
