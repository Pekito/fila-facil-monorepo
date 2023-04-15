<template>
    <ul class="order-list">
        <h2 class="order-list__title">Pedidos {{ listTitle }}</h2>
        <li :class="{
            'order-list__item': true,
            'order-list__item--active': orderQueueStore.isNotifying(order.id)
        }"
            v-for="order in orders"
            :key="order.id"
            @click="handleNotifyClick(order)"
            >
            <span class="order-list__item__label">
                <strong>{{ order.label }}</strong> | {{order.description}}
            </span>
        </li>
    </ul>
</template>

<script setup lang="ts">
import { Order } from '@fila-facil/shared/src/entities';
import { useOrderQueueStore } from '@/stores/order-queue-store';
export type OrderListProps = {
    orders: Order[]
    listTitle: string
}
const orderQueueStore = useOrderQueueStore();
withDefaults(defineProps<OrderListProps>(), {})
function handleNotifyClick(order: Order) {
    if(orderQueueStore.isNotifying(order.id)) orderQueueStore.removeFromNotifying(order.id);
    else orderQueueStore.addToNotifiying(order.id)
    
}
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
            min-height: 40px;
            min-width: 270px;
            border-radius: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #F49524;
            margin-bottom: 10px;
            &:last-of-type {
                margin-bottom: 30px;
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
            
            transition: background .2s ease-in;
            &--active {
                background: #F49524;
                color: $white;
            }
        }
    }
</style>