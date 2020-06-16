<template>
    <div class="page">
        <div class="balance">
            <image style="width: 100%; height: 100%" src="../src/assets/business/walletCard.jpg"></image>
<!--            <span class="subtitle">Balance</span>-->
<!--            <span class="amount"> {{ dataItem.balance }}-->
<!--                <span class="currency">{{dataItem.currency}}</span>-->
<!--            </span>-->
        </div>
        <div class="row-1">
            <div class="card1" @click="account(dataItem.partnerGuid)"></div>
            <div class="card2" @click="transaction(dataItem.partnerGuid)"></div>
        </div>
        <div class="row-2">
            <div class="card3" @click="management(dataItem.partnerGuid)"></div>
            <div class="card4" @click="settlement(dataItem.partnerGuid)"></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "BusinessIndex",
        data() {
            return{
                dataItem: {balance: 0.00, currency: "NZD"},
            }
        },
        methods: {
            account(guid){
                console.log("Click Account");
                this.$router.push({path: '/business/account', query: {partnerGuid: guid}})
            },
            transaction(guid){
                console.log("Transactions");
                this.$router.push({path: '/business/transactions' , query: {partnerGuid: guid}})
            },
            management(guid){
                console.log("Management");
                this.$router.push({path: '/business/management' , query: {partnerGuid: guid}})
            },
            settlement(guid){
                console.log("Settlement");
                this.$router.push({path: '/business/settlement', query: {partnerGuid: guid}})
            }
        }
    }
</script>

<style lang="scss">
    @import '../../common/scss/variable.scss';

    .page{
        font-family: $font-asap;
        margin: 0;
        overflow: hidden;
        text-align: center;
        width: 100vw;
        height: 100vh;
        background: #f4f7fc;

        .balance{
            margin-top: 1rem;
            width: 90vw;
            height: 18vh;
            max-width: 345pt;
            max-height: 141pt;
            display: inline-block;
            color: #FFFFFF;
            background:linear-gradient(135deg,rgba(21,202,228,1) 0%,rgba(7,177,209,1) 100%);
            background-size: 100% 100%;
            box-shadow:0 2px 10px 0 rgba(15,192,220,0.54);
            border-radius: 16px;
        }

    }



</style>
