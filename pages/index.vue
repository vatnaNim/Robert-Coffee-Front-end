<template>
    <div 
        class="bg-white/30 dark:bg-black/20 border-gray-200 dark:border-white border px-4 py-6 rounded-lg shadow-md flex flex-col gap-y-4">
        <h2
            class="font-semibold text-orange-500 dark:text-orange-500 text-lg">
            Today's Reports
        </h2>
        <div 
            class="flex justify-center gap-x-6">
            <article
                class="bg-gray-300/30 dark:bg-black/20 border-orange-500 dark:border-orange-500 border px-3 py-4 rounded-lg shadow-md w-40 text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center gap-y-1.5">
                <LazyUIcon
                    name="cib:buy-me-a-coffee"
                    class="w-8 h-8"
                />
                <span
                    class="text-sm">
                    <span class="font-semibold text-orange-500 dark:text-orange-500">Total Qtys:</span> <span>{{ totalQty || 'N/A' }}</span>
                </span>
            </article>
            <article
                class="bg-gray-300/30 dark:bg-black/20 border-orange-500 dark:border-orange-500 border px-3 py-4 rounded-lg shadow-md w-40 text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center gap-y-1.5">
                <LazyUIcon
                    name="ic:sharp-point-of-sale"
                    class="w-8 h-8"
                />
                <span
                    class="text-sm">
                    <span class="font-semibold text-orange-500 dark:text-orange-500">Total Sale:</span> <span>${{ totalSale || 'N/A'  }}</span>
                </span>
            </article>
            <article
                class="bg-gray-300/30 dark:bg-black/20 border-orange-500 dark:border-orange-500 border px-3 py-4 rounded-lg shadow-md w-40 text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center gap-y-1.5">
                <LazyUIcon
                    name="material-symbols:order-approve"
                    class="w-8 h-8"
                />
                <span
                    class="text-sm">
                    <span class="font-semibold text-orange-500 dark:text-orange-500">Total Order:</span> <span>{{ totalOrders || 'N/A' }}</span>
                </span>
            </article>
            <article
                class="bg-gray-300/30 dark:bg-black/20 border-orange-500 dark:border-orange-500 border px-3 py-4 rounded-lg shadow-md w-40 text-gray-600 dark:text-gray-300 flex flex-col items-center justify-center gap-y-1.5">
                <LazyUIcon
                    name="ic:outline-discount"
                    class="w-8 h-8"
                />
                <span
                    class="text-sm">
                    <span class="font-semibold text-orange-500 dark:text-orange-500">Total Discount:</span> <span>${{ totalDiscount.toFixed(2) || 'N/A' }}</span>
                </span>
            </article>
        </div>
        <div    
            class="w-full  flex mt-4">
            <div class="h-[400px] flex-1 flex flex-col items-center ">
                <BarCharts/>
            </div>
            <div class=" w-[200px] border border-orange-500 dark:border-orange-500 rounded-md shadow-md bg-gray-300/30 dark:bg-black/20 px-3 py-2 space-y-3">
                <div
                    class="text-lg font-semibold flex items-center gap-2">
                    <LazyUIcon
                        name="material-symbols:contract-edit-sharp"
                        class="w-6 h-6 text-orange-500 dark:text-orange-500"
                    />
                    <span
                        class="text-orange-500 dark:text-orange-500 ">
                        Action
                    </span>
                </div>
                <UFormGroup
                    name=""
                    label="Print As Excel"
                    :ui="{
                        label:{
                            base: 'font-semibold text-orange-500 dark:text-orange-500'
                        }
                    }">
                    <LazyUButton
                        size="sm"
                        color="primary"
                        label="Print Excel"
                        icon="ri:file-excel-2-line"
                        block
                    />
                </UFormGroup>
                <UFormGroup
                    name=""
                    label="Print Reports As PDF"
                    :ui="{
                        label:{
                            base: 'font-semibold text-orange-500 dark:text-orange-500'
                        }
                    }">
                    <LazyUButton
                        size="sm"
                        color="red"
                        label="Print PDF"
                        icon="bi:file-earmark-pdf-fill"
                        block
                    />
                </UFormGroup>
                <UFormGroup
                    name=""
                    label="Close Shift"
                    :ui="{
                        label:{
                            base: 'font-semibold text-orange-500 dark:text-orange-500'
                        }
                    }">
                    <LazyUButton
                        size="sm"
                        color="amber"
                        label="Close Shift"
                        icon="material-symbols:shift-lock-outline-rounded"
                        block
                        @click="comfileDialog()"
                    />
                </UFormGroup>
            </div>
        </div>
        <div 
            class="mt-5">
            <div class="flex justify-between">
                <h2
                    class="font-semibold text-gray-600 dark:text-gray-400 text-lg">
                    Today's History
                </h2>
                <div 
                    class="py-1">
                     <UInput
                        v-model="searchValue"
                        name="menu-search"
                        placeholder="Search Recipt_code/Order_number"
                        icon="i-heroicons-magnifying-glass-20-solid"
                        autocomplete="off"
                        color="amber"
                        class="w-[400px]"
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
            <div 
                class="border border-orange-500 dark:text-orange-500 px-0.5 py-2 rounded-md shadow-md ">
                <LazyUTable
                    class="custom-scrollbar"
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
                    <template #discountAmount-data="{row}">
                        <span
                            class="text-green-500 dark:text-green-500">
                            $ {{ row.discountAmount.toFixed(2) }}
                        </span>
                    </template>
                </LazyUTable>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BarCharts, CircleCharts } from '@/components/charts';
import type { Items, ResponseStatus } from '@/models/type';
import { Alert, Confirm, Delete, Success } from '@/utils/dialog';




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
    {
        key: 'discountAmount',
        label: 'Discount_Amount',
    },
];
const selectedColumns = ref([...columns]);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const dataAll: Ref<Items[]> = ref<Items[]>([]);
const searchValue: Ref<string> = ref<string>('');
const totalSale: Ref<number> = ref<number>(0);
const totalQty: Ref<number> = ref<number>(0);
const totalOrders: Ref<number> = ref<number>(0);
const totalDiscount: Ref<number> = ref<number>(0);

const { fetchApi} = useAPI();

const fetchHistory = async (query = ''): Promise<void> => {
    let url: string = "purchasing/today-report";
    if (query) url += `?search=${query}`;
    const result = await fetchApi('GET', url) as any;
    if (!result.error) {
        dataAll.value = Array.isArray(result.data) ? result.data : [];
        totalSale.value = result.total_sales || 0;
        totalQty.value = result.total_qty || 0;
        totalOrders.value = result.count || 0;
        totalDiscount.value = result.total_discount || 0;
    }
}
const searchData = async (value: string): Promise<void> => {
    if (/^\s+$/.test(value)) return;
    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(async () => {
        await fetchHistory(value);
    }, 300);
};


const handleCloseShift = async (): Promise<void> => {
    const result = await fetchApi('POST', 'purchasing/close-shift') as ResponseStatus;
    if(!result.error)
    {
        await fetchHistory();
    }
};

const comfileDialog = async(): Promise<void> => {
    Confirm(
        "Are you sure?",
        "You are about to close today's report.",
        "Report Closed",
        "Cancelled",
        "The report was closed successfully.",
        "You cancelled the action.",
        async () => {
            await handleCloseShift();
        }
    );
}

onMounted(async (): Promise<void> => {
    await fetchHistory()
})

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