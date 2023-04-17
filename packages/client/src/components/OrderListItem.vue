<template>
    <li 
    :class="{
        'order-list__item': true,
        'order-list__item--active': isNotifying
    }"
    >
        <span class="order-list__item__label">
            <strong>{{ label }}</strong> | {{description}}
        </span>
    </li>
</template>

<script setup lang="ts">
export type OrderListItemProps = {
    isNotifying?: boolean;
    label: string;
    description: string;
}
withDefaults(defineProps<OrderListItemProps>(), {
    isNotifying: false
});

</script>

<style lang="scss" scoped>
    .order-list__item {
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
</style>