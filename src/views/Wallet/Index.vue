<template>
    <div class="details">
        <div class="balance">
            <span class="p2">Balance</span><br>
            <span class="nzd">$ </span>
            <span class="p1">{{total}} </span>
            <span class="nzd">&nbsp; {{currency}}</span>
            <p>Available amount</p>
        </div>
    </div>
</template>

<script>
    export default {
        name: "WalletIndex",
        data(){
            return{
                total: 24.45,
                currency: "NZD",
                response: [{desc:"Geo capsules", amount: 1.02, date:"2020.02.23"},
                    {desc:"Off-line Store", amount: -1.02, date:"2020.02.23"},
                    {desc:"Top-up", amount: 200, date:"2020.02.23"}]
            }
        },
        methods:{
            seeMore(){
                this.$router.push({path: '/wallet/transactions'})
            }
        }
    }
</script>

<style lang="scss">

</style>
