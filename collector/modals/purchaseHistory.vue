<template>
    <LazyUModal 
        v-bind:model-value="open"
        fullscreen
        :ui="{
            base: 'backdrop-blur-sm border border-white/30',
            background: 'bg-gray-300/20 dark:bg-black/30',
            rounded: 'rounded-2xl',
            shadow: 'shadow-lg',
        }">
        <div 
            class="p-4 space-y-3">
            <div 
                class="flex justify-between  items-center gap-x-3 border-b border-orange-500 dark:border-orange-500 py-2">
                <div 
                    class="flex items-center gap-x-3">
                        <LazyUButton
                        color="red"
                        size="md"
                        variant="soft"
                        square
                        icon="material-symbols:arrow-back-ios"
                        label="Back"
                        @click="emits('toggle', false)"
                    />
                    <div 
                        class="text-lg font-semibold text-orange-400 flex justify-center items-center capitalize gap-x-2">
                        <LazyUIcon 
                            name="tdesign:history"
                            class="w-6 h-6 text-orange-500 dark:text-orange-500"
                        />
                        <span
                            class="text-md text-gray-500 dark:text-gray-300">
                            Purchase History
                        </span>
                    </div>
                </div>
                <div class="">
                    <UInput
                        v-model="searchValue"
                        name="menu-search"
                        placeholder="Search Recipt_code/Order_number"
                        icon="i-heroicons-magnifying-glass-20-solid"
                        autocomplete="off"
                        color="amber"
                        :ui="{
                        icon: {
                            trailing: { pointer: '' },
                            color: 'text-orange-500 dark:text-orange-400',
                        },
                        }"
                        @input="async (event: Event): Promise<void> => {
                            const value: string = String((event.target as HTMLInputElement).value);
                            await searchData(value);
                        }">
                        <template #trailing>
                            <UButton
                                v-show="searchValue !== ''"
                                color="red"
                                variant="link"
                                icon="i-heroicons-x-mark-20-solid"
                                :padded="false"
                                @click="async (): Promise<void> => {
                                searchValue = '';
                                await searchData('');
                                }"
                            />
                        </template>
                    </UInput>
                </div>
            </div>
            <div class="overflow-x-auto custom-scrollbar">
                <LazyUTable
                    :rows="dataAll"
                    :columns="selectedColumns"
                    :ui="{
                            divide: 'divide-orange-400',
                            th: { base: 'text-orange-400 text-nowrap uppercase text-xs' },
                        }">
                    <template 
                        #index-data="{ row, index }">
                        <span
                            class="text-orange-500 dark:text-orange-500">
                            {{ index + 1 }}
                        </span>
                    </template>
                    <template
                        #reciptCode-data="{row}">
                        <span
                            class="text-orange-500 dark:text-orange-500">
                            {{ row.reciptCode }}
                        </span>
                    </template>
                    <template #totalQty-data="{row}">
                        <span class="capitalize">
                            {{ row.totalQty }} UNITS
                        </span>
                    </template>
                    <template #totalPrice-data="{row}">
                        $ {{ row.totalPrice }}
                    </template>
                    <template #amountType-data="{row}">
                        <span class="capitalize">
                            {{ row.amountType }}
                        </span>
                    </template>
                    <template #subTotal-data="{row}">
                        <span class="capitalize">
                            $ {{ row.subTotal }}
                        </span>
                    </template>
                    <template #paymentMethod-data="{row}">
                        <span
                            class="capitalize">
                            {{ row.paymentMethod }}
                        </span>
                    </template>
                    <template
                        #discountPercent-data="{row}">
                        <span>
                            % {{ parseInt(row.discountPercent) }}
                        </span>
                    </template>
                </LazyUTable>
            </div>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">
import {
    CloseLine
} from '@/components/icons';
import { useAPI } from '@/composables/useApi';
import type { 
    Items, 
    ResponseStatus 
} from '@/models/type';

const props = withDefaults(defineProps<{
    open?: boolean;
}>(), {
    open: false,
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
}>();

const columns = [
    {
        label: 'No',
        key: 'index',
    },
    {
        key: 'invoiceCode',
        label: 'Recipt_code',
    },
    {
        key: 'orderNumber',
        label: 'orderNumber',
    },
    {
        key: 'date',
        label: 'date',
    },
    {
        key: 'memberId',
        label: 'membership',
    }, 
    {
        key: 'totalQty',
        label: 'Total_Qty',
    },
    {
        key: 'totalPrice',
        label: 'TotalPrice',
    },
    {
        key: 'subTotal',
        label: 'Subtotal',
    },
    {
        key: 'amountType',
        label: 'Amount_Type',
    },
    {
        key: 'paymentMethod',
        label: 'PaymentMethod'
    },
    {
        key: 'discountPercent',
        label: 'Discount_Percent',
    },
];
const selectedColumns = ref([...columns]);
const searchValue: Ref<string> = ref<string>('');
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const dataAll: Ref<Items[]> = ref<Items[]>([]);

const { fetchApi} = useAPI();

const fetchHistory = async (query = ''): Promise<void> => {
    let url: string = "purchasing/today-report";
    if (query) url += `?search=${query}`;
    const result = await fetchApi('GET', url) as ResponseStatus;
    if (!result.error) {
        dataAll.value = Array.isArray(result.data) ? result.data : [];
    }
}
const searchData = async (value: string): Promise<void> => {
    if (/^\s+$/.test(value)) return;
    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(async () => {
        await fetchHistory(value);
    }, 300);
};

onMounted(async (): Promise<void> => {
    await fetchHistory()
})

</script>
