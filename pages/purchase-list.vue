<template>
    <div 
        class="bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-4">
        <div 
            class="flex justify-between items-end gap-2">
            <div 
                class="flex gap-x-2">
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
                            class="font-bold">Filter Purchase</span>
                    </UButton>
                </UFormGroup>
                <UInput
                    v-model="searchQuery"
                    name="menu-search"
                    placeholder="Search Invoice, Order, ID"
                    icon="i-heroicons-magnifying-glass-20-solid"
                    autocomplete="off"
                    color="amber"
                    size="sm"
                    :ui="{
                        icon: {
                            trailing: { pointer: '' },
                            color: 'text-orange-500 dark:text-orange-400',
                            size: {
                                sm: 'h-5 h-5'
                            }
                        },
                    }"
                    @input="async (event: Event): Promise<void> => {
                        const value: string = String((event.target as HTMLInputElement).value);
                        await searchData(value);
                    }">
                    <template #trailing>
                        <UButton
                            v-show="searchQuery !== ''"
                            color="red"
                            variant="link"
                            icon="i-heroicons-x-mark-20-solid"
                            :padded="false"
                            @click="async (): Promise<void> => {
                            searchQuery = '';
                            await searchData('');
                            }"
                        />
                    </template>
                </UInput>
            </div>
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
                class="w-full space-y-4 px-4 py-4 bg-gray-100 dark:bg-gray-800 border border-orange-500 dark:border-orange-500 rounded-xl shadow-md">
                <span 
                    class="flex items-center gap-x-2">
                    <Filter 
                        class="text-orange-500 w-6 h-6" />
                    <h2 
                        class="text-orange-500 font-semibold tracking-wide text-lg">
                        Filter Purchase
                    </h2>
                </span>
                <div 
                    class="flex gap-x-1">
                    <UFormGroup 
                        label="FROM DATE TO DATE" 
                        name="date" 
                        :ui="{ label:{ base:'text-orange-500' } }" 
                        class="flex-1">
                        <InputDateRange
                            size="sm"
                            color="amber"
                            name=""
                            v-model="selectedRange"
                        />
                    </UFormGroup>
                    <UFormGroup 
                        label="ORDER TYPE" 
                        name="quantity" 
                        :ui="{ label:{ base:'text-orange-500' } }" 
                        class="flex-1">
                        <SelectMenu 
                            name="orderType" 
                            option-attribute="label" 
                            value-attribute="value" 
                            placeholder="Filter Ordertype" 
                            size="sm" 
                            color="amber" 
                            v-model="filter.orderType"
                            :options="[
                                { 
                                    label: 'Dine In',
                                    value: 'dine in' 
                                },
                                {
                                    label: 'Delivery',
                                    value: 'delivery' 
                                },
                                {
                                    label: 'Take Away',
                                    value: 'take away' 
                                }
                            ]" 
                        />
                    </UFormGroup>
                    <UFormGroup 
                        label="PAYMENT METHOD" 
                        name="payment method" 
                        :ui="{ label:{ base:'text-orange-500' } }" 
                        class="flex-1">
                        <SelectMenu 
                            name="paymentMethod" 
                            option-attribute="label" 
                            value-attribute="value" 
                            placeholder="Please select payment method" 
                            size="sm" 
                            color="amber" 
                            v-model="filter.paymentMethod"
                            :options="[
                                {
                                    label: 'Bank',
                                    value: 'bank'
                                },
                                {
                                    label: 'Case',
                                    value: 'case'
                                },
                                {
                                    label: 'QR Code',
                                    value: 'QRCode'
                                }
                            ]" 
                        />
                    </UFormGroup>
                </div>
            </div>
        </Transition>
        <div 
            class="bg-white/30 dark:bg-black/20 border border-gray-200 dark:border-white  rounded-lg shadow-xl overflow-x-auto">
            <LazyUTable     
                class="custom-scrollbar"
                :rows="allPurchaseDb" 
                :columns="columns"
                :loading="isLoading"
                :ui="{
                    divide:'divide-orange-400',
                    th: { 
                        base: 'text-orange-400 text-nowrap' 
                    },
                    td: {
                        base: 'capitalize'
                    },
                }">
                <template #loading-state>
                    <div 
                        class="flex flex-col items-center justify-center h-44">
                        <TableLoading/>
                    </div>
                </template>
                <template  #empty-state>
                    <div 
                        class="flex flex-col items-center justify-center gap-y-1 h-44">
                        <NoData class="text-orange-500 dark:text-orange-500 w-8 h-8"/>
                        <span
                            class="text-sm text-gray-600 dark:text-gray-300">
                            No Data Here...
                        </span>
                    </div>
                </template>
                <template #actions-data="{ row }">
                    <UDropdown 
                        :items="items(row)"
                        :popper="{
                            placement: 'right',
                            arrow: true
                        }"
                        :ui="{
                            background: 'bg-white/20 dark:bg-black/30 backdrop-blur-sm dark:backdrop-blur-md border border-white/30 dark:border-black/30 shadow-lg'
                        }">
                        <LazyUButton 
                            color="amber" 
                            size="sm"
                            variant="soft" 
                            icon="i-heroicons-ellipsis-horizontal-20-solid" 
                            class="p-1"
                        />
                    </UDropdown>
                </template>
                <template #invoiceCode-data="{row}">
                    <span class="text-orange-500 dark:text-orange-500">
                        <CopyText 
                            :label="row.invoiceCode"
                        />
                    </span>
                </template>
                <template #paymentAmount-data="{row}">
                    <span class="text-green-500 dark:text-green-600">
                        $ {{ row.paymentAmount }}
                    </span>
                </template>
                <template #paymentAmountRial-data="{row}">
                    <span class="text-red-500 dark:text-red-600">
                        KHR {{ row.paymentAmountRial }}
                    </span>
                </template>
                <template #exchangedAmount-data="{row}">
                    <span>
                        ${{ row.exchangedAmount }}
                    </span>
                </template>
                <template #discountPercent-data="{row}">
                    <span>
                        %{{ parseInt(row.discountPercent) }}
                    </span>
                </template>
                <template #subTotal-data="{row}">
                    <span
                        class="font-semibold">
                        $ {{ row.subTotal }}
                    </span>
                </template>
                <template #totalPrice-data="{row}">
                    <span
                        class="font-semibold">
                        $ {{ row.totalPrice }}
                    </span>
                </template>
                <template #discountAmount-data="{row}">
                    <span
                        class="font-semibold">
                        $ {{ row.discountAmount }}
                    </span>
                </template>
                <template #totalQty-data="{row}">
                    <span
                        class="font-semibold">
                        {{ row.totalQty }} UNITS 
                    </span>
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
                            :options="[5, 10, 15, 20]"
                            class="me-2 w-20"
                            size="xs"
                            color="white"
                            :ui="
                            {
                                color: {
                                    white: {
                                        outline: 'ring-orange-500 dark:ring-orange-500 focus:ring-orange-500 dark:focus:ring-orange-500'
                                    }
                                }
                            }"
                        />
                    </div>
                </div>
                <LazyUPagination
                    v-model="page"
                    :page-count="Number(pageCount)"
                    :total="pageTotal" 
                    :active-button="{ color: 'amber' }"
                />
            </div>
        </div>
        <article>
            <OrdersPurchaseItem
                :open="openModal"
                :order-id="purchaseId"
                :invoid-id="invoidCode"
                @toggle="toggleViewItems"
            />
        </article>
    </div>
</template>

<script setup lang="ts">
import { 
    Filter,
} from '@/components/icons';
import { 
    SelectMenu, 
    CopyText,
    InputDateRange
} from '@/components/ui';
import type { 
    Items,
    ResponseStatus 
} from '@/models/type';
import { 
    useAPI
} from '@/composables/useApi';
import { 
    OrdersPurchaseItem 
} from '@/collector/modals';
import { 
    format 
} from 'date-fns'
import { 
    TableLoading 
} from '@/components/loading';
import { NoData } from '@/components/icons';

definePageMeta({
    middleware: 'auth',
    colorMode: 'light'
});

interface iFilter {
    startDate: string,
    endDate: string,
    orderType: string,
    paymentMethod: string,
}

const columns = [
    {
        key: 'actions',
        label: 'Actions',
    },
    {
        key: 'date',
        label: 'Purchase Date',
    },
    {
        key: 'invoiceCode',
        label: 'Invoice Code',
    },
    {
        key: 'orderNumber',
        label: 'Order Number',
    },
    {
        key: 'memberId',
        label: 'Membership ID',
    },
    {
        key: 'orderType',
        label: 'Order Type',
    },
    {
        key: 'amountType',
        label: 'Amount Type',
    },
    {
        key: 'currency',
        label: 'Currency',
    },
    {
        key: 'paymentAmount',
        label: 'Payment Amount ($)',
    },
    {
        key: 'paymentAmountRial',
        label: 'Payment Amount (៛)',
    },
    {
        key: 'exchangedAmount',
        label: 'Exchange Amount ($)',
    },
    {
        key: 'discountPercent',
        label: 'Discount (%)',
    },
    {
        key: 'totalQty',
        label: 'Total Quantity',
    },
    {
        key: 'discountAmount',
        label: 'Discount Amount',
    },
    {
        key: 'subTotal',
        label: 'Sub Total',
    },
    {
        key: 'totalPrice',
        label: 'Total Price',
    },
    {
        key: 'paymentMethod',
        label: 'Payment Method',
    },
    {
        key: 'remarks',
        label: 'Remarks',
    },
];


const items = (row: { id: number, invoiceCode: string }) => [
    [
        { 
            label: 'View All', 
            icon: 'ic:outline-remove-red-eye', 
            click: () => console.log('Edit', row.id) 
        },
        { 
            label: 'View Order', 
            icon: 'material-symbols:list-alt-check', 
            click: async(): Promise<void> => {
                purchaseId.value = row.id;
                invoidCode.value = row.invoiceCode
                toggleViewItems(true)
            }
        }
    ],
    [
         { 
            label: 'Reprint Invoice', 
            icon: 'mdi:printer-pos-refresh', 
            click: () => console.log('Edit', row.id) 
        },
        { 
            label: 'Print as PDF', 
            icon: 'vscode-icons:file-type-pdf2', 
            click: () => console.log('Edit', row.id) 
        },
    ]
];

const { 
    fetchApi, 
    postApi, 
    isLoading
} = useAPI();

const showFilter: Ref<boolean> = ref<boolean>(false);
const openModal: Ref<boolean> = ref<boolean>(false);
const purchaseId: Ref<number | null> = ref<number | null>(null);
const allPurchaseDb: Ref<Items[]> = ref<Items[]>([]);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const invoidCode: Ref<string> = ref<string>('');
const selectedRange = ref<{ start: Date; end: Date } | null>(null)
const searchQuery: Ref<string> = ref<string>('');
const filter: Ref<iFilter> = ref<iFilter>({
    startDate: '',
    endDate: '',
    orderType: '',
    paymentMethod: '',
});


// page
const page:Ref<number> = ref<number>(1);
const pageCount: Ref<number | string> = ref<number | string>(10); 
const pageTotal:Ref<number> = ref<number>(0);
const pageFrom = computed(() => (page.value - 1) * Number(pageCount.value) + 1);
// page

const pageTo = computed(() => {
    const to = page.value * Number(pageCount.value);
    return to > pageTotal.value ? pageTotal.value : to;
});
const fetchPurchase = async (query = ''): Promise<void> => {
    const { startDate, endDate, orderType, paymentMethod } = filter.value;
    const paramsArray: string[] = [
        `page=${page.value}`,
        `per_page=${pageCount.value}`,
        startDate ? `start_date=${encodeURIComponent(startDate)}` : '',
        endDate ? `end_date=${encodeURIComponent(endDate)}` : '',
        orderType
        ? `orderType=${encodeURIComponent(orderType).replace(/%20|\+/g, ' ')}`
        : '',
        paymentMethod ? `paymentMethod=${encodeURIComponent(paymentMethod)}` : '',
    ].filter(Boolean);

    let url: string = `purchasing?${paramsArray.join('&')}`;

    if (query.trim()) {
        url += `&search=${encodeURIComponent(query.trim())}`;
    }
    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if (!result.error) 
    {
        allPurchaseDb.value = Array.isArray(result.data) ? result.data : [];
        pageTotal.value = result.total_items || 0;
    }
};

const searchData = async (value: string): Promise<void> => {
    if (timeout.value) clearTimeout(timeout.value);
    timeout.value = setTimeout(async () => {
        searchQuery.value = value;
        page.value = 1;
        await fetchPurchase(value); 
    }, 300);
};


/* 
START:Declare fuction Toggle Function
*/
const toggleFilter = (): void => {
    showFilter.value = !showFilter.value;
};

const toggleViewItems = (state: boolean): void => {
    openModal.value = state;
}

/* 
END:Declare fuction Toggle Function
*/

/* 
START:Declare Watch and onMounted fuction 
*/

watch(selectedRange, async (newVal): Promise<void> => {
    if (newVal?.start && newVal?.end) {
        filter.value.startDate = format(newVal.start, 'dd-MM-yyyy');
        filter.value.endDate = format(newVal.end, 'dd-MM-yyyy');
    } else {
        filter.value.startDate = '';
        filter.value.endDate = '';
    }
});

watch(filter, async (): Promise<void> => {
    page.value = 1;
    await fetchPurchase();
}, { deep: true });

onMounted(async ():Promise<void> => {
    await fetchPurchase();
})

/* 
END:Declare Watch and onMounted fuction 
*/

</script>

<style scoped>
</style>