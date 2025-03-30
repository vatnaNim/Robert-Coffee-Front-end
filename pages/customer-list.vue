<template>
    <div 
        class="bg-white px-5 py-8 rounded-lg shadow-md flex flex-col gap-y-6">
        <div 
            class="flex justify-end items-end gap-2">
            <UFormGroup>
                <UButton    
                    variant="solid"
                    class="rounded-lg"
                    size="sm"
                    color="amber"
                    @click="toggleFilter">
                    <UIcon
                        name="solar:alt-arrow-down-line-duotone"
                        class="w-5 h-5 transition-transform duration-300 ease-in-out"
                        :class="showFilter ? 'rotate-180' : 'rotate-0'"
                    />
                    <span
                        class="font-bold">
                        Filter Customer
                    </span>
                </UButton>
            </UFormGroup>
            <LazyUInput
                v-model="emptyValue"
                name="emptyValue"
                placeholder="Search customer name..."
                icon="i-heroicons-magnifying-glass-20-solid"
                autocomplete="off"
                color="amber"
                :ui="{ icon: { 
                    trailing: { pointer: '' },
                    color: 'text-orange-500' } }">
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
            </LazyUInput>
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
                class="w-full space-y-3 px-4 py-4 bg-gray-100 rounded-xl shadow-sm flex flex-col">
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
                    class="flex gap-x-2">
                    <UFormGroup
                        label="DATE"
                        name="date"
                        :ui="{
                            label:{
                                base:'text-orange-500'
                            }
                        }"
                        class="flex-1">
                        <InputDate
                            :initialDate="new Date()"
                            size="sm"
                        />
                    </UFormGroup>
                    <UFormGroup
                        label="DISCOUNT"
                        name="discount"
                        :ui="{
                        label:{
                            base:'text-orange-500'
                            }
                        }"
                        class="flex-1">
                        <SelectMenu
                            name=""
                            option-attribute="label"
                            value-attribute="value"
                            placeholder="Please select discount"
                            size="sm"
                            color="amber"
                            :options="[
                                {
                                    label: 'Ex1',
                                    value: 'ex1'
                                }
                            ]"
                        />
                    </UFormGroup>
                    <UFormGroup
                        label="PAYMENT METHOD"
                        name="payment method"
                        :ui="{
                            label:{
                                base:'text-orange-500'
                            }
                        }"
                        class="flex-1">
                        <SelectMenu
                            name=""
                            option-attribute="label"
                            value-attribute="value"
                            placeholder="Please select payment method"
                            size="sm"
                            color="amber"
                            :options="[
                                {
                                    label: 'Ex1',
                                    value: 'ex1'
                                }
                            ]"
                        />
                    </UFormGroup>
                </div>
            </div>
        </Transition>
        <div 
            class="bg-gray-100 rounded-lg shadow-lg">
            <LazyUTable
                :rows="rows"
                :columns="selectedColumns"
                :ui="{
                    divide: 'divide-orange-400',
                    th: { base: 'text-orange-400 ' }
                }">
                <template #total_amount="{ row, index }">{{ index + 1 }}</template>
                <template #price_amount="{row, index}">
                    <span>
                        {{ row.price?.price_dol }}
                    </span>
                    <UDivider
                        text="OR"
                    />
                    <span>
                        {{ row.price?.price_khr }}
                    </span>
                    <span>
                        {{ row.price_amount?.sub_total }}
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
                        <span class="text-sm leading-5">
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
    <template>
            
    </template>
</template>

<script setup lang="ts">
import { 
    MenuCategory 
} from '@/collector/pages';
import { 
    Filter 
} from '@/components/icons';
import { 
    TooltipImage,
    SelectMenu,
    InputDate
} from '@/components/ui';

definePageMeta({
    // middleware: 'auth',
    colorMode: 'light'
});

const columns = [
    {
        label: 'No',
        key: 'index',
        rowClass: '!text-orange-500'
    },
    {
        key: 'name_en',
        label: 'Name'
    },
    {
        key: 'name_kh',
        label: 'Name (KH)'
    }, 
    {
        key: 'invoice_code',
        label: 'Invoice Code'
    },
    {
        key: 'total_amount',
        label:'Total Amount'  
    },
    {
        key: 'payment_method',
        label: 'Payment Method'
    },
    {
        key: 'discount',
        label: 'Discount'
    },
    {
        key: 'buy_sku',
        label: 'Buy SKU'
    },
    {
        key: 'tax',
        label: 'Tax'
    },
    {
        key: 'create_at',
        label: 'History'
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
        name_en: 'Lindsay Walton',
        name_kh: '',
        invoice_code: '#011122',
        price_amount:{
            sub_total: '15',
            pay_amount: '20',
            exchange: '5'
        },
        payment_method: 'ABA QR code',
        discount: 'Promotion 10%',
        Buy_sku: '2',
        tax: '10%',
        create_at: '01-mar-25',
        menu_type: 'drink' 
    }
];


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