<template>
    <ul class="order-list">
        <h2 class="order-list__title">Pedidos em andamento</h2>
        <li class="order-list__item"><span class="order-list__item__label"><strong>#6924</strong> | Pedro</span></li>
        <li class="order-list__item"><span class="order-list__item__label"><strong>#6924</strong> | Pedro</span></li>
        <li class="order-list__item"><span class="order-list__item__label"><strong>#6924</strong> | Pedro</span></li>
    </ul>
</template>

<script setup lang="ts">

defineProps({
    listName: {
        required: true,
        type: String,
    }
});
</script>

<style lang="scss" scoped>
    .order-list {
        display: flex;
        flex-direction: column;
        list-style: none;
        align-items: center;
        border: 1px solid #E7E0EC;
        height: 343px;
        overflow-y: scroll;
        &__title {
            font-family: 'Roboto';
            font-weight: 700;
            font-size: 16px;
            line-height: 19px;
            text-align: center;
            letter-spacing: -0.44px;
            color: #000108;
            margin-top: 30px;
            margin-bottom: 23px;
        }
        &__item {
            height: 40px;
            min-width: 270px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid red;
            &:not(:last-of-type) {
                margin-bottom: 10px;
            }
            &__label {
                strong {
                    font-weight: bold;
                }
                font-family: 'Roboto';
                font-size: 16px;
                line-height: 19px;
                color: #322F37;
            }
        }
    }
</style>