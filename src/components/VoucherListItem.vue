<template>
    <div class="voucher-item-container">
        <div :class="dataItem.status === 0? 'voucher-top-red': 'voucher-top-grey'">
            <div class="avatar-frame">
                <image class="avatar" :src="dataItem.logo"></image>
            </div>
            <span class="store-name"> {{dataItem.partnerName}}</span>
            <div class="amount-value">
                <span v-if="dataItem.amount > 0">$ {{dataItem.amount.toFixed(2)}}</span>
                <span v-else>{{dataItem.discount}}% off</span>
            </div>
        </div>
        <div class="voucher-bottom">
            <div class="valid-time">
                <span class="desc">{{dataItem.startTime}} - {{dataItem.overdueTime}}</span>
            </div>
            <div class="min-charge">
                <span class="desc">Any purchase {{dataItem.minimumCharge > 0?'of $'+ dataItem.minimumCharge + ' or more': ''}}</span>
            </div>
            <div v-if="dataItem.status !== 0">
                <image class="stamp" :src="expired"></image>
<!--                <image class="stamp" :src="dataItem.status === 1? this.used : (dataItem.status === 2? this.expired: '' )"></image>-->
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "VoucherListItem",
        props: {
            dataItem: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                show: false,
                today: null,
                overdue : false,
                expired : 'src/assets/wallet/expired@3x.png',
                used : 'src/assets/wallet/used@3x.png'
            }
        },
        created(){
            console.log("DataItem", this.dataItem);
            this.today = new Date().format("dd/MM/yyyy");
            if (this.dataItem.overdueTime < this.today){
                this.dataItem.status = 2
            }
        }
    }
</script>

<style lang="scss">
    @import '../common/scss/variable.scss';

    .voucher-item-container{
        font-family: $font-asap;
        margin: 5vw 0 0 5vw;
        width: 90vw;
        height: 18vh;
        max-width: 690px;
        max-height: 280px;
        min-height: 150px;
        background: #FFFFFF;
        box-shadow: 0 8px 24px 0 rgba(115, 123, 139, 0.10);
        border-radius: 10px;


        .voucher-top-red{
            background: #FA6651 ;
            border-radius: 10px 10px 0 0;
            width: 90vw;
            height: 10vh;
            max-width: 690px;
            max-height: 160px;
            min-height: 80px;
            color: #FFFFFF;
            display: inline-block;
        }

        .voucher-top-grey{
            background: #DCDEE2;
            border-radius: 10px 10px 0 0;
            width: 90vw;
            height: 10vh;
            max-width: 690px;
            max-height: 160px;
            min-height: 80px;
            color: #FFFFFF;
            display: inline-block;
        }

        .avatar-frame {
            display: inline-block;
            border-radius: 50%;
            margin: 10px;
            width: 60px;
            height: 60px;
            background: #FFFFFF;

            .avatar{
                margin-top: 2px;
                margin-left: 2px;
                width: 56px;
                height: 56px;
                border-radius: 50%;
            }
        }

        .store-name {
            position: absolute;
            display: inline-block;
            text-align: left;
            margin-top: 32px;
            margin-left: 18px;
            font-size: 16px;
        }

        .amount-value {
            float: right;
            margin: 28px;
            line-height: 32px;
            span {
                color: #FFFFFF;
                font-size: 26px;
                font-weight: 400;
            }
        }

        .voucher-bottom{
            width: 90vw;
            height: 8vh;
            max-width: 690px;
            max-height: 140px;
            border-radius: 0 0 10px 10px;
            font-size: 16px;
            line-height: 18px;
            color: #a7a7a7;
            display: inline-block;

            .valid-time {
                position: relative;
                margin-top: 18px;
                margin-left: 12px;
            }

            .min-charge {
                position: relative;
                margin-top: 26px;
                margin-left: 12px;
            }

            .desc {
                position: absolute;
                margin: 0 0 0 5px;
            }

            .stamp{
                position: absolute;
                top: -38px;
                right: 10px;
                width: 62px;
                height: 60px;
            }
        }
    }

</style>
