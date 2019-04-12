<template>
    <div class="index">
        <ul>
            <li style="margin-top: 20px;"><img src="../../assets/logo.png" alt=""><router-link to="/index">首页</router-link></li>
            <li><img src="../../assets/logo.png" alt=""><router-link to="/index">市场管理</router-link>&nbsp;<img class="down" src="../../assets/icon/down.svg" alt=""></li>
                <ul class="inside">
                    <li><router-link to="/game/marketDevelop">市场开发</router-link></li>
                    <li><router-link to="/game/orderManage">订单管理</router-link></li>
                </ul>
            <li><img src="../../assets/logo.png" alt=""><router-link to="/index">产品管理</router-link>&nbsp;<img class="down" src="../../assets/icon/down.svg" alt=""></li>
                <ul class="inside">
                    <li><router-link to="/game/productBuild">产品构成</router-link></li>
                    <li><router-link to="/game/productStudy">产品研发</router-link></li>
                    <li><router-link to="/game/ISO">ISO认证</router-link></li>
                </ul>
            <li><img src="../../assets/logo.png" alt=""><router-link to="/index">采购管理</router-link>&nbsp;<img class="down" src="../../assets/icon/down.svg" alt=""></li>
                <ul class="inside">
                    <li><router-link to="/game/materialPurchase">原料订购</router-link></li>
                    <li><router-link to="/game/materialSave">原料入库</router-link></li>
                </ul>
            <li><img src="../../assets/logo.png" alt=""><router-link to="/index">仓库管理</router-link>&nbsp;<img class="down" src="../../assets/icon/down.svg" alt=""></li>
                <ul class="inside">
                    <li><router-link to="/game/storageManage">库存管理</router-link></li>
                    <li><router-link to="/game/storageCount">库存盘点</router-link></li>
                </ul>
            <li><img src="../../assets/logo.png" alt=""><router-link to="/index">生产管理</router-link>&nbsp;<img class="down" src="../../assets/icon/down.svg" alt=""></li>
                <ul class="inside">
                    <li><router-link to="/game/producePlan">生产计划</router-link></li>
                    <li><router-link to="/game/factoryManage">厂房管理</router-link></li>
                </ul>
            <li><img src="../../assets/logo.png" alt=""><router-link to="/index">销售管理</router-link>&nbsp;<img class="down" src="../../assets/icon/down.svg" alt=""></li>
                <ul class="inside">
                    <li><router-link to="/game/delivery">按订单交货</router-link></li>
                    <li><router-link to="/game/orderDetail">订单详情</router-link></li>
                </ul>
            <li><img src="../../assets/logo.png" alt=""><router-link to="/index">财务管理</router-link>&nbsp;<img class="down" src="../../assets/icon/down.svg" alt=""></li>
                <ul class="inside">
                    <li><router-link to="/game/taxManage">税金管理</router-link></li>
                    <li><router-link to="/game/accountMoney">账户资金</router-link></li>
                    <li><router-link to="/game/loanManage">贷款管理</router-link></li>
                    <li><router-link to="/game/financeForm">财务报表</router-link></li>
                </ul>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        }
    }
</script>

<style lang="scss" scoped>
    .index {
        display: flex;
        flex-direction: row;
        width: 150px;
        height: 100%;
        background-color: #fff;
        border-right: 1px solid #000;
        background-color: #666;
        ul {
            img {
                width: 30px;
            }
            .down {
                width: 20px;
            }
            li {
                padding: 15px 0 0 10px;
            }
            .inside {
                padding-left: 30px;
                font-size: 14px;
            }
        }
    }
</style>
