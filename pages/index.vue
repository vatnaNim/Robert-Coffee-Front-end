<template>
    <div 
        class="space-y-2">
        <div
            class="bg-white/30 dark:bg-black/20 border-gray-200 dark:border-white border px-4 py-6 rounded-lg shadow-md flex flex-col gap-y-4 ">
            <div 
                class="circle-chart text-center">
                <CircleCharts/>
            </div>    
        </div>
        <div 
            class="px-3 py-3 bg-white/30 dark:bg-black/20 shadow-md border border-gray-200 dark:border-white  rounded-lg overflow-x-auto space-y-2">
            <div class="flex justify-between items-center">
                <h2
                    class="uppercase text-sm font-semibold text-gray-600 dark:text-gray-300">
                    All today payments
                </h2>
                <UInput
                        v-model="emptyValue"
                        name="emptyValue"
                        placeholder="Search Receipt Code..."
                        icon="i-heroicons-magnifying-glass-20-solid"
                        autocomplete="off"
                        size="xs"
                        class="w-[200px]"
                        color="amber"
                        :ui="{ icon: { 
                            trailing: { pointer: '' },
                            color: 'text-orange-500 dark:text-orange-400' } }">
                        <template #trailing>
                        <UButton
                            v-show="emptyValue !== ''"
                            color="red"
                            variant="link"
                            icon="i-heroicons-x-mark-20-solid"
                            :padded="false"
                            @click="emptyValue = ''"
                        />
                        </template>
                    </UInput>
            </div>
            <LazyUTable
                :rows="rows"
                :columns="selectedColumns"
                :ui="{
                    divide: 'divide-orange-400',
                    th: { base: 'text-orange-400 text-nowrap' }
                }">
                <template #price-data="{ row }">
                    <span
                        class="text-green-500 pb-0.5">
                        $ {{ row.price?.price_dol }}
                    </span>
                    <UDivider  :ui="{
                        border: {
                            border: 'border-2'
                        }
                    }" />
                    <span
                        class="text-red-500 pt-0.5">
                        {{ row.price?.price_khr }} KHR
                    </span>
                </template>
                <template #action-data="{ row }">
                    <div
                        class="flex items-center gap-2">
                        <LazyUButton
                            type="button"
                            color="yellow"
                            variant="link"
                            size="sm"
                            icon="material-symbols:edit-square-outline"
                            :padded="false"
                            
                            square
                        />
                        <LazyUButton
                            type="button"
                            color="red"
                            variant="link"
                            size="sm"
                            icon="material-symbols:delete-outline-rounded"
                            :padded="false"
                            square
                            
                        />
                    </div>
                </template>
            </LazyUTable>
            <div 
                class="flex justify-between items-center px-3 py-3.5 border-t border-gray-200 dark:border-gray-700">
                <div 
                    class="space-y-3">
                    <div>
                        <span class="text-sm leading-5 text-gray-600 dark:text-gray-200">
                            Showing
                            <span class="font-medium">{{ pageFrom }}</span>
                            to
                            <span class="font-medium">{{ pageTo }}</span>
                            of
                            <span class="font-medium">{{ pageTotal }}</span>
                            results
                        </span>
                    </div>
                    <div 
                        class="flex items-center gap-1.5">
                        <span 
                            class="text-sm leading-5 font-semibold text-orange-400">
                            Rows per page:
                        </span>
                        <LazyUSelect
                            v-model="pageCount"
                            :options="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                            class="me-2 w-20"
                            size="xs"
                            color="amber"
                        />
                    </div>
                </div>
                <LazyUPagination 
                    v-model="page" 
                    :page-count="pageCount" 
                    :total="dataAll.length" 
                    :active-button="{
                        color: 'amber'
                    }"
                />
            </div>
        </div>
        <div
            class="bg-white/30 dark:bg-black/20 border-gray-200 dark:border-white border px-4 py-6 rounded-lg shadow-md flex flex-col gap-y-4">    
            <div 
                class="circle-chart flex items-center flex-col">
                <BarCharts/>
            </div>
        </div>

        <div class="">
        </div>
    </div>
</template>

<script setup lang="ts">
import { BarCharts, CircleCharts } from '@/components/charts';
import { Alert, Delete, Success } from '@/utils/dialog';



const columns = [
    {
        label: '#Code',
        key: 'code',
        rowClass: '!text-orange-500'
    },
    {
        key: 'name_en',
        label: 'Time'
    }, 
    {
        key: 'nam',
        label: ''
    }, 
    {
        key: 'price',
        label: 'Price'
    },
    {
        key: 'discount_type',
        label: 'Discount Type'
    },
    {
        key: 'afterDiscount',
        label: 'After Discount'
    },
    {
        key: 'menuType',
        label: 'Type'
    },
    {
        key: 'category',
        label: 'Category'
    },
    {
        key: 'remark',
        label: 'Remark'
    },
    {
        key: 'createdAt',
        label: 'Create At'
    },
    {
        key: 'action',
        label: 'Action'
    }
];

const dataAll = [
    { 
        id: 1, 
        code: '0001', 
        image: 'https://www.livveganstrong.com/wp-content/uploads/2024/08/blueberry-iced-latte-500x500.jpg', 
        name_en: 'Ice Latte', 
        name_kh: 'កាឡាតេអាយស៍', 
        price: {
            price_khr: 44900, 
            price_dol: 10.99, 
        },
        discount_type: 'Promotion 10%',
        afterDiscount: 9.89, 
        menuType: 'drink', 
        category: 'beverage', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 2, 
        code: '0002', 
        image: 'https://source.unsplash.com/200x200/?grilled-chicken', 
        name_en: 'Grilled Chicken', 
        name_kh: 'សាច់មាន់អាំង', 
        price: {
            price_khr: 63350, 
            price_dol: 15.49, 
        },
        discount_type: 'Promotion 5%',
        afterDiscount: 14.72, 
        menuType: 'food', 
        category: 'main course', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 3, 
        code: '0003', 
        image: 'https://source.unsplash.com/200x200/?dessert', 
        name_en: 'Chocolate Cake', 
        name_kh: 'នំឆុកូឡា', 
        price: {
            price_khr: 32750, 
            price_dol: 7.99, 
        },
        discount_type: 'None',
        afterDiscount: 7.99, 
        menuType: 'dessert', 
        category: 'sweets', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 4, 
        code: '0004', 
        image: 'https://source.unsplash.com/200x200/?juice', 
        name_en: 'Orange Juice', 
        name_kh: 'ទឹកក្រូច', 
        price: {
            price_khr: 24550, 
            price_dol: 5.99, 
        },
        discount_type: 'None',
        afterDiscount: 5.99, 
        menuType: 'drink', 
        category: 'juice', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 5, 
        code: '0005', 
        image: 'https://source.unsplash.com/200x200/?appetizer', 
        name_en: 'Spring Rolls', 
        name_kh: 'នំជ្រូក', 
        price: {
            price_khr: 53350, 
            price_dol: 12.99, 
        },
        discount_type: 'Promotion 10%',
        afterDiscount: 11.69, 
        menuType: 'food', 
        category: 'appetizer', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 6, 
        code: '0006', 
        image: 'https://source.unsplash.com/200x200/?cake', 
        name_en: 'Strawberry Cheesecake', 
        name_kh: 'នំខេកស្ត្របឺរី', 
        price: {
            price_khr: 34850, 
            price_dol: 8.49, 
        },
        discount_type: 'Promotion 12%',
        afterDiscount: 7.47, 
        menuType: 'dessert', 
        category: 'cake', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 7, 
        code: '0007', 
        image: 'https://source.unsplash.com/200x200/?tea', 
        name_en: 'Green Tea', 
        name_kh: 'តែបៃតង', 
        price: {
            price_khr: 28750, 
            price_dol: 6.99, 
        },
        discount_type: 'None',
        afterDiscount: 6.99, 
        menuType: 'drink', 
        category: 'tea', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 8, 
        code: '0008', 
        image: 'https://source.unsplash.com/200x200/?steak', 
        name_en: 'Beef Steak', 
        name_kh: 'សាច់គោអាំង', 
        price: {
            price_khr: 61650, 
            price_dol: 14.99, 
        },
        discount_type: 'Promotion 8%',
        afterDiscount: 13.79, 
        menuType: 'food', 
        category: 'main course', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 9, 
        code: '0009', 
        image: 'https://source.unsplash.com/200x200/?ice-cream', 
        name_en: 'Vanilla Ice Cream', 
        name_kh: 'ក្រែមស៊ីវ៉ានី', 
        price: {
            price_khr: 41050, 
            price_dol: 9.99, 
        },
        discount_type: 'Promotion 10%',
        afterDiscount: 8.99, 
        menuType: 'dessert', 
        category: 'ice cream', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 10, 
        code: '0010', 
        image: 'https://source.unsplash.com/200x200/?soda', 
        name_en: 'Cola', 
        name_kh: 'កូកាកូឡា', 
        price: {
            price_khr: 20550, 
            price_dol: 4.99, 
        },
        discount_type: 'None',
        afterDiscount: 4.99, 
        menuType: 'drink', 
        category: 'soda', 
        createdAt: '2025-03-23' 
    },
    { 
        id: 11, 
        code: '0011', 
        image: 'https://source.unsplash.com/200x200/?sandwich', 
        name_en: 'Club Sandwich', 
        name_kh: 'សាំងវិច', 
        price: {
            price_khr: 47350, 
            price_dol: 11.49, 
        },
        discount_type: 'Promotion 7%',
        afterDiscount: 10.68, 
        menuType: 'food', 
        category: 'sandwich', 
        createdAt: '2025-03-23' 
    }
];


const selectedColumns = ref([...columns]);
const emptyValue: Ref<string> = ref<string>('');


const page = ref(1);
const pageCount = ref(10);

const rows = computed(() => {
  return dataAll.slice((page.value - 1) * pageCount.value, page.value * pageCount.value);
});

const pageFrom = computed(() => {
  return (page.value - 1) * pageCount.value + 1;
});

const pageTo = computed(() => {
  const to = page.value * pageCount.value;
  return to > dataAll.length ? dataAll.length : to;
});

const pageTotal = computed(() => {
  return dataAll.length;
});



definePageMeta({
    middleware: 'auth',
    colorMode: 'light'
});
</script>

<style scoped>
.bars-chart{
  max-height: 350px;
}
.circle-chart{
  max-height: 350px;
}
</style>