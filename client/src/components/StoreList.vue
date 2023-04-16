<template>
    <ul class="order-list">
        <OrderListItem  v-for="order in orders"
            :key="order.id"
            :label="order.label"
            :description="order.description"
        />
    </ul>
</template>

<script setup lang="ts">
import { Order } from '@fila-facil/shared/src/entities';
import OrderListItem from './OrderListItem.vue';
export type OrderListProps = {
    orders: Order[]
}
withDefaults(defineProps<OrderListProps>(), {})

</script>

<style lang="scss" scoped>
    .order-list {
        display: flex;
        flex-direction: column;
        list-style: none;
        align-items: center;
        width: 100%;
        &__item {
            min-height: 80px;
            width: 100%;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #F49524;
            background: $white;
            margin-bottom: 30px;
            ::v-deep(.order-list__item__label) {
                strong {
                    font-weight: bold;
                }
                font-family: 'Roboto';
                font-size: 36px;
                line-height: 42px;
                color: #322F37;
                
            }
        }
    }
</style>