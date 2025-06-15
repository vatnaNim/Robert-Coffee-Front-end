<template>
    <div>
        <template
            v-if="openModal">
            <MenuListPage
                :list-id="modalID"
                :title="ModalTitle"
                @update:data=""
                @toggle="toggleModal"
            />
        </template>
        <template v-else>
            <div 
                class="bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-4">
                <div 
                    class="flex justify-between items-center">
                    <div  
                        class="flex gap-x-2">
                        <PrimaryBtn
                            name="Create Menu"
                            size="px-3 py-2 text-sm"
                            @click="toggleModal('Create', true)"
                        />
                        <UButton    
                            variant="solid"
                            class="rounded-lg"
                            size="sm"
                            color="amber"
                            @click="toggleFilter">
                            <UIcon
                                name="solar:alt-arrow-down-line-duotone"
                                class="w-6 h-6 transition-transform duration-300 ease-in-out"
                                :class="showFilter ? 'rotate-180' : 'rotate-0'"
                            />
                            <span
                                class="font-bold">
                                Filter Menu list
                            </span>
                        </UButton>
                    </div>
                    <UInput
                        v-model="emptyValue"
                        name="emptyValue"
                        placeholder="Search..."
                        icon="i-heroicons-magnifying-glass-20-solid"
                        autocomplete="off"
                        
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
                <Transition 
                    enter-active-class="transition-all duration-300 ease-out"
                    enter-from-class="opacity-0 scale-y-0"
                    enter-to-class="opacity-100 scale-y-100"
                    leave-active-class="transition-all duration-300 ease-in"
                    leave-from-class="opacity-100 scale-y-100"
                    leave-to-class="opacity-0 scale-y-0">
                    <div 
                        v-if="showFilter"
                        class="w-full space-y-4 px-4 py-4 bg-white/30 dark:bg-black/20 border border-gray-200 dark:border-white rounded-lg shadow-sm">
                        <span
                            class="flex gap-x-2">
                            <Filter
                                class="text-orange-500"/>
                            <h2
                                class="text-orange-500 font-semibold tracking-wider text-lg">
                                Filter Menu-list
                            </h2>
                        </span>
                        <div 
                            class="w-full flex gap-x-2">
                            <UFormGroup
                                name=""
                                label="CATEGORY"
                                class="flex-1"
                                :ui="{
                                    label: {
                                        base: 'text-orange-500'
                                    }
                                }">
                                <SelectMenu
                                    value-attribute="value"
                                    option-attribute="label"
                                    :options="[
                                        {
                                            label: 'Ex:1',
                                            value: 'Ex1'
                                        }
                                    ]"    
                                    name=""
                                    size="sm"
                                    color="amber"
                                    placeholder="Select "
                                />
                            </UFormGroup>
                            <UFormGroup
                                name=""
                                label="MENU TYPE"
                                class="flex-1"
                                :ui="{
                                    label: {
                                        base: 'text-orange-500'
                                    }
                                }">
                                <SelectMenu
                                    value-attribute="value"
                                    option-attribute="label"
                                    :options="[
                                        {
                                            label: 'Ex:1',
                                            value: 'Ex1'
                                        }
                                    ]"    
                                    name=""
                                    size="sm"
                                    color="amber"
                                    placeholder="Select "
                                />
                            </UFormGroup>
                            <UFormGroup
                                name=""
                                label="DISCOUNT TYPE"
                                class="flex-1"
                                :ui="{
                                    label: {
                                        base: 'text-orange-500'
                                    }
                                }">
                                <SelectMenu
                                    value-attribute="value"
                                    option-attribute="label"
                                    :options="[
                                        {
                                            label: 'Ex:1',
                                            value: 'Ex1'
                                        }
                                    ]"    
                                    name=""
                                    size="sm"
                                    color="amber"
                                    placeholder="Select "
                                />
                            </UFormGroup>
                        </div>
                    </div>
                </Transition>
                <div 
                    class="bg-white/30 dark:bg-black/20 border border-gray-200 dark:border-white  rounded-lg shadow-xl overflow-x-auto">
					<LazyUTable
                        :rows="rows"
                        :columns="selectedColumns"
                        :ui="{
                            divide: 'divide-orange-400',
                            th: { base: 'text-orange-400 text-nowrap' }
                        }">
                        <template #image-data="{ row }">
                            <TooltipImage
                                :scr="row.image"
                                :popper="{ placement: 'right' }"
                                smallSize="w-16 h-16"
                                container="w-[250px] h-[250px]"
                                base="shadow-sm"
                                :containerWidth="150"
                                :containerHeight="150"
                            />
                        </template>
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
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { 
    MenuCategory 
} from '@/collector/pages';
import { 
    TooltipImage,
    SelectMenu,
    PrimaryBtn
} from '@/components/ui';
import { 
    Filter 
} from '@/components/icons';
import { 
    MenuList 
} from '@/collector/expand-table';
import { 
    MenuListPage 
} from '@/collector/pages';

definePageMeta({
    // middleware: 'auth',
    colorMode: 'light'
});

const columns = [
    {
        label: 'Code',
        key: 'code',
        rowClass: '!text-orange-500'
    },
    {
        key: 'image',
        label: 'Image'
    },
    {
        key: 'name_en',
        label: 'Name (ENG)'
    }, 
    {
        key: 'name_kh',
        label: 'Name (KH)'
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

const emptyValue: Ref<string> = ref<string>('');
const openModal: Ref<boolean> = ref<boolean>(false);
const ModalTitle: Ref<string> = ref<string>('Create');	
const showFilter: Ref<boolean> = ref<boolean>(false);
const modalID: Ref<number | null> = ref<number | null>(null);

const toggleModal = (title: string, state: boolean): void => {
    openModal.value = state;
    ModalTitle.value = title;
};

const toggleFilter =(): void => {
    showFilter.value = !showFilter.value;
};
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


const expand = ref({
    openedRows: [dataAll],
    row: {}
});

const selectedColumns = ref([...columns])

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
</script>

<style scoped>

</style>