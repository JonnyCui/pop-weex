<template>
    <div class="transactions">
        <div v-if="this.records.length > 0">
            <div v-for="item in this.records">
                <div class="transaction-rows" :dataItem="item">
                        <wxc-cell :title="showTitle(item)"
                                  :desc="dateFormat(item.createTime)"
                        >
                            <slot name="label">
                                <span class="transaction-desc"> {{ showRemark(item) }} </span>
                            </slot>
                            <slot name="value">
                                <span class="transaction-amount" v-if="item.amount >= 0">${{ item.amount.toFixed(2) }}</span>
                                <span class="transaction-cost" v-if="item.amount < 0"> - ${{ Math.abs(item.amount).toFixed(2) }} </span>
                            </slot>
                        </wxc-cell>
                </div>
            </div>
        </div>
        <div v-else>
            <image src="../src/assets/nodata.jpg" style="width: 750px; height: 1064px"></image>
        </div>
    </div>
</template>

<script>
    import {WxcCell} from 'weex-ui';
    const stream = weex.requireModule('stream');
    const API = 'http://api.mytimerec.com/api/wallet/record';
    const modal = weex.requireModule('modal');

    export default {
        name: "WalletTransactions",
        components: {
            WxcCell
        },
        data(){
            return {
                records: [],
                isLoading: false,
                create: ''
            }
        },
        mounted(){
            this.requestData();
        },
        methods:{
            requestData(){
                const self = this;
                stream.fetch({
                    method: 'GET',
                    url: API + '?userGuid=' + this.$route.query.userGuid,
                    type:'json'
                }, function(ret) {
                    if (!ret.ok) {
                        modal.toast({
                            message: 'Network Error!',
                            duration: 3
                        });
                    } else {
                        console.log('post:', ret);
                        self.records = ret.data.data;
                    }
                })
            },
            showTitle(item){
                if (item.fromName === "" && item.toName === ""){
                    console.log(item.tradeType);
                    return this.showType(item.tradeType)
                }else{
                    if (item.tradeType === 2 || item.tradeType === 4){
                        return (item.amount > 0 ? item.fromName : item.toName)
                    }else if(item.tradeType === 1 ){
                        return (item.fromName != "" ? item.fromName + "'s Capsule" : "Money Capsule")
                    }else if(item.tradeType === 7){
                        return "Invitation Reward"
                    }else if (item.tradeType === 8){
                        return "Unclaimed Money Capsule"
                    }
                }
            },
            showRemark(item){
                if(item.remark !== ''&& item.remark !== null){
                    return '\n '+(item.remark.length > 15 ? item.remark.substring(0, 16) + '...': item.remark)
                }else{
                    return ''
                }
            },
            showType(tradeType) {
                switch (tradeType) {
                    case 1:
                        return "From Capsule";
                    case 2:
                        return "Transfer";
                    case 3:
                         return "Withdraw";
                    case 4:
                        return "Payment";
                    case 5:
                        return "Timepay";
                    case 7:
                        return "Invitation Reward";
                    case 8:
                        return "Capsule Refund";
                }
            },
            dateFormat(utcTime){
                const dateTime = Date.parse(utcTime.replace(' ', 'T') + '.000Z');
                return new Date(dateTime).format("hh:mm:ss dd/MM/yyyy");
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/scss/variable.scss';

    .transactions {
        margin: 10px;
        color: $color-black;
        font-family: $font-asap;
        .transaction-rows{
            p.weex-text.weex-el.cell-desc-text{
                padding: 5px 0 5px 0;
            }
        }
        .transaction-desc{
            margin-right: 65px;
            font-size: small;
            font-weight: lighter;
            color: #737B8B;
        }
        .transaction-amount{
            padding-top: 6px;
            color: $color-green;
        }
        .transaction-cost{
            padding-top: 6px;
            color: $color-red;
        }
    }

    .divider {
        position: relative;
        margin-top: 90px;
        height: 1px;
    }

    .div-transparent:before {
        content: "";
        position: absolute;
        top: 0;
        left: 5%;
        right: 5%;
        width: 90%;
        height: 1px;
        background-image: linear-gradient(to right, transparent, rgb(48, 49, 51), transparent);
    }
</style>
