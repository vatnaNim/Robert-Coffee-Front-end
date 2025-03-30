<template>
    <div
        class="bg-[#C4B6B6] rounded-lg shadow-md px-3 py-4 overflow-x-auto no-scrollbar text-nowrap space-y-3">
        <h2
            class="font-bold text-md uppercase text-orange-500">
            Change point History
        </h2>
        <div 
            class="">
            <UTable 
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
                <template #price-data="{ row }">
                    <span
                        class="text-green-500">
                        $ {{ row.price.price_dollar}}
                    </span>
                    <UDivider label="OR" />
                    <span
                        class="text-red-500">
                        {{ row.price.price_khmer }} KHR
                    </span>
                </template>
                <template #stock-data="{row}">
                    <UBadge 
                        color="red" 
                        variant="subtle">
                        {{ row.stock_status }}
                    </UBadge>
                </template>
            </UTable>
        </div>
    </div>
</template>

<script setup lang="ts">
import { TooltipImage } from '@/components/ui';
const columns = [
    {
        key: 'index',
        label: 'NO',
        class: 'text-orange-500 text-lg font-semibold uppercase',
        rowClass: 'text-orange-500 text-lg font-semibold'
    },
    {
        key: 'date',
        label: 'Change Date',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: '',
        label: 'Gift Name',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
    {
        key: 'price',
        label: 'gift price',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    },
    {
        key: '',
        label: 'Gift Point',
        class: 'text-orange-500 text-lg font-semibold uppercase'
    }, 
];

const data = [{ 
        id: 1, 
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtioEq8mWpBN1V12iHs_OB14z_YRii-VGm2g&s', 
        name: 'Ice', 
        name_kh: 'ទឹកកក', 
        price: {
            price_dollar: 2.00, 
            price_khmer: 8000, 
        },
        stock_status: 'In Stock', 
        create_at: '2025-03-23' 
    },
    { 
        id: 2, 
        image: 'https://via.placeholder.com/100', 
        name: 'Americano', 
        name_kh: 'កាអាមេរិកាំង', 
        price: {
            price_dollar: 9.49, 
            price_khmer: 39000, 
        },
        stock_status: 'Out of Stock', 
        create_at: '2025-03-20' 
    },
    { 
        id: 3, 
        image: 'https://via.placeholder.com/100', 
        name: 'Cappuccino', 
        name_kh: 'កាពូឆីណូ', 
        price: {
            price_dollar: 9.49, 
            price_khmer: 39000, 
        },
        stock_status: 'In Stock', 
        create_at: '2025-03-18' 
    },
    { 
        id: 4, 
        image: 'https://via.placeholder.com/100', 
        name: 'Matcha Latte', 
        name_kh: 'ម៉ាតឆា ឡាតេ', 
        price: {
            price_dollar: 9.49, 
            price_khmer: 39000, 
        },
        stock_status: 'Limited Stock', 
        create_at: '2025-03-15' 
    },
    { 
        id: 5, 
        image: 'https://via.placeholder.com/100', 
        name: 'Mocha', 
        name_kh: 'មូកា', 
        price: {
            price_dollar: 9.49, 
            price_khmer: 39000, 
        },
        stock_status: 'In Stock', 
        create_at: '2025-03-10' 
    }
]
</script>

<style scoped>

</style>