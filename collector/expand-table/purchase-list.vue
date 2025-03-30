<template>
    <div
        class="bg-[#C4B6B6] rounded-lg shadow-md px-3 py-4 overflow-x-auto no-scrollbar text-nowrap">
        <h2
            class="font-bold text-md uppercase text-orange-500">
            Order Items
        </h2>
        <div 
            class="w-full">
            <LazyUTable 
                :columns="columns" 
                :rows="data">
                <template #index-data="{ row, index }">{{ index + 1 }}</template>
                <template #image-data="{ row }">
                    <TooltipImage
                        :scr="row.image"
                        :popper="{ placement: 'right' }"
                        smallSize="w-16 h-16"
                        container="w-[250px] h-[250px]"
                        base="shadow-sm"
                        :containerWidth="100"
                        :containerHeight="100"
                    />
                </template>
                <template #name-data="{row}">
                    <span
                        class="capitalize">
                        {{ row.name.name_eng }}
                    </span>
                    <UDivider label="OR" />
                    <span>
                        {{ row.name.name_kh }}
                    </span>
                </template>
                <template #price-data="{ row }">
                    <span
                        class="text-green-500">
                        $ {{ row.price.price_dollar}}
                    </span>
                    <UDivider label="OR" />
                    <span
                        class="text-red-500">
                        KHR {{ row.price.price_khmer }} 
                    </span>
                </template>
                <template #stock-data="{row}">
                    <UBadge 
                        color="red" 
                        variant="subtle">
                        {{ row.stock_status }}
                    </UBadge>
                </template>
            </LazyUTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    TooltipImage 
} from '@/components/ui';

const columns = [
    {
        key: 'index',
        label: 'NO',
        class: 'text-orange-500 text-lg font-semibold uppercase',
        rowClass: 'text-orange-500 text-lg font-semibold'
    },
    {
        key: 'image',
        label: 'Image',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'name',
        label: 'name ',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'qty',
        label: 'Qty',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'menu_type',
        label: 'Menu Type',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'price',
        label: 'price',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'sugar',
        label: 'Sugar',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'ice',
        label: 'Ice',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'remark',
        label: 'Remark',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
];

const data = [
{ 
        id: 1, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtioEq8mWpBN1V12iHs_OB14z_YRii-VGm2g&s', 
        name: {
            name_kh: 'ស្ដ',
            name_eng: 'Ice Latte'
        }, 
        price: {
            price_dollar: 2.00, 
            price_khmer: 8000, 
        },
        qty: '2',
        sugar: '25%',
        ice: 'Normal',
        menu_type: 'drink',
        remark: '',
        create_at: '2025-03-23' 
    },
    { 
        id: 2, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDFHfRqv6iwN65nXnxlqBqXsJbVb2GQKHlqQ&s', 
        name: {
            name_kh: 'កាហ្វេសុទ្ធ',
            name_eng: 'Black Coffee'
        }, 
        price: {
            price_dollar: 1.50, 
            price_khmer: 6000, 
        },
        qty: '1',
        sugar: '50%',
        ice: 'Less Ice',
        menu_type: 'drink',
        remark: 'No milk',
        create_at: '2025-03-24' 
    },
    { 
        id: 3, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxyEQaFuoVTxkI5B5XmdCrjYJNzP3ZTtM1vw&s', 
        name: {
            name_kh: 'តែបៃតង',
            name_eng: 'Green Tea'
        }, 
        price: {
            price_dollar: 2.50, 
            price_khmer: 10000, 
        },
        qty: '3',
        menu_type: 'drink',
        sugar: '0%',
        ice: 'Extra Ice',
        remark: 'With lemon',
        create_at: '2025-03-25' 
    }
]
</script>

<style scoped>

</style>