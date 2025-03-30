<template>
        <div>
            <template
                v-if="openPage">
                <PurchasePage
                    :purchase-id="null"
                    :title="pageTitle"
                    @toggle="togglePage"
                />
            </template>
            <template v-else>
                <div 
                    class="bg-white px-5 py-8 rounded-lg shadow-md flex flex-col gap-y-6">
                    <div 
                        class="flex justify-between items-end gap-2">
                        <div 
                            class="flex gap-x-2">
                            <PrimaryBtn
                                name="Create Menu Category"
                                size="px-3 py-2 text-sm"
                                @click="(): void => {
                                    togglePage('Create', true);
                                }"
                            />
                        </div>
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
                            <LazyUInput 
                                v-model="emptyValue" 
                                name="emptyValue" 
                                placeholder="Search Invoid code..." 
                                icon="i-heroicons-magnifying-glass-20-solid" 
                                autocomplete="off" 
                                color="amber" 
                                :ui="{ icon: { 
                                        trailing: { pointer: '' }, 
                                        color: 'text-orange-500' 
                                    } }">
                                <template #trailing>
                                    <UButton 
                                        v-show="emptyValue !== ''" 
                                        color="red" variant="link" 
                                        icon="i-heroicons-x-mark-20-solid" 
                                        :padded="false" 
                                        @click="emptyValue = '' " 
                                    />
                                </template>
                            </LazyUInput>
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
                            class="w-full space-y-3 px-4 py-4 bg-gray-100 rounded-xl shadow-sm flex flex-col">
                            <span 
                                class="flex gap-x-2">
                                <Filter 
                                    class="text-orange-500" />
                                <h2 
                                    class="text-orange-500 font-semibold tracking-wider text-lg">
                                    Filter Menu-list
                                </h2>
                            </span>
                            <div 
                                class="flex gap-x-2">
                                <UFormGroup 
                                    label="FROM DATE TO DATE" 
                                    name="date" 
                                    :ui="{ label:{ base:'text-orange-500' } }" 
                                    class="flex-1">
                                    <InputDateRange
                                        size="sm"
                                        color="amber"
                                        name=""
                                    />
                                </UFormGroup>
                                <UFormGroup 
                                    label="QUANTITY" 
                                    name="quantity" 
                                    :ui="{ label:{ base:'text-orange-500' } }" 
                                    class="flex-1">
                                    <LazyUInput
                                        name="quantity"
                                        size="sm"
                                        color="amber"
                                        placeholder="Fiter Qty by number"
                                        type="number"
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
                                        :options="[
                                            { 
                                                label: 'QR Code', 
                                                value: 'ex1' 
                                            },
                                            { 
                                                label: 'Cash', 
                                                value: 'Cash' 
                                            }
                                        ]" 
                                    />
                                </UFormGroup>
                            </div>
                            <div 
                                class="flex gap-x-2">
                                <UFormGroup 
                                    label="ORDER STATUS" 
                                    name="order_status" 
                                    :ui="{ label:{ base:'text-orange-500' } }" 
                                    class="flex-1">
                                    <SelectMenu 
                                        name="paymentMethod" 
                                        option-attribute="label" 
                                        value-attribute="value" 
                                        placeholder="Please select order status" 
                                        size="sm" 
                                        color="amber" 
                                        :options="[
                                            { 
                                                label: 'Pending', 
                                                value: 1
                                            },
                                            { 
                                                label: 'Completed', 
                                                value: 2 
                                            },
                                            { 
                                                label: 'Canceled', 
                                                value: 3
                                            }
                                        ]" 
                                    />
                                </UFormGroup>
                                <UFormGroup 
                                    label="PAYMENT STATUS" 
                                    name="payment_status" 
                                    :ui="{ label:{ base:'text-orange-500' } }" 
                                    class="flex-1">
                                    <SelectMenu 
                                        name="payment_status" 
                                        option-attribute="label" 
                                        value-attribute="value" 
                                        placeholder="Please select payment status" 
                                        size="sm" 
                                        color="amber" 
                                        :options="[
                                            { 
                                                label: 'Pending', 
                                                value:  1 
                                            },
                                            { 
                                                label: 'Success', 
                                                value: 2 
                                            }
                                        ]" 
                                    />
                                </UFormGroup>
                            </div>
                        </div>
                    </Transition>
                    <div 
                        class="bg-gray-100 rounded-lg shadow-lg overflow-x-auto">
                        <LazyUTable 
                            v-model:expand="expand"
                            :rows="people" 
                            :columns="columns"
                            :ui="{
                                divide:'divide-orange-400',
                                th: { 
                                    base: 'text-orange-400 text-nowrap' 
                                }
                            }">
                            <template #invoid_number-data="{row}">
                                <CopyText 
                                    :label="row.invoid_number"
                                />
                            </template>
                            <template #total_price-data="{ row }">
                                <span
                                    class="text-green-500 pb-0.5">
                                    $ {{ row.total_price.dollar }}
                                </span>
                                <UDivider  :ui="{
                                    border: {
                                        border: 'border-2'
                                    }
                                }" />
                                <span
                                    class="text-red-500 pt-0.5">
                                    {{  row.total_price.khmer }} KHR
                                </span>
                            </template>
                            <template #buyer_holder-data="{row}">
                                <div>
                                    <div 
                                        class="text-sm flex items-center gap-x-1">
                                        <span
                                            class="text-orange-500 font-semibold">
                                            Currency:
                                        </span>
                                        <span
                                            class="flex items-center">
                                            <Rial
                                                class="w-3 h-3 text-red-400"/> 
                                                <span>{{ row.buyer_holder.currency}}</span>
                                        </span>
                                    </div>
                                    <div 
                                        class="text-sm flex items-center gap-x-1">
                                        <span
                                            class="text-orange-500 font-semibold">
                                            Tax:
                                        </span>
                                        <span >
                                            % {{ row.buyer_holder.tax}}
                                        </span>
                                    </div>
                                </div>
                            </template>
                            <template #payment_status-data="{row}">
                                <LazyUBadge
                                    variant="solid"
                                    :color="(paymentStatusColor(row.payment_status) as any)">
                                    {{ paymentStatuslabel(row.payment_status) }}
                                </LazyUBadge>
                            </template>
                            <template #status-data="{row}">
                                <LazyUBadge
                                    variant="solid"
                                    :color="(orderStatusColor(row.status) as any)">
                                    {{ orderStatusLabel(row.status) }}
                                </LazyUBadge>
                            </template>
                            <template #actions-data="{ row }">
                                <UDropdown 
                                    :items="items(row)">
                                    <LazyUButton 
                                        color="amber" 
                                        size="sm"
                                        variant="solid" 
                                        icon="i-heroicons-ellipsis-horizontal-20-solid" 
                                        class="p-1"
                                    />
                                </UDropdown>
                            </template>
                            <template #expand="{ row }">
                                <div class="">
                                    <PurchaseList :key="row.id"/>
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
                                :total="people.length" 
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
    PurchaseList 
} from '@/collector/expand-table/';
import { 
    PurchasePage 
} from '@/collector/pages';
import { 
    Filter,
    Rial 
} from '@/components/icons';
import { 
    SelectMenu, 
    PrimaryBtn,
    CopyText,
    InputDateRange
} from '@/components/ui';

definePageMeta({
    colorMode: 'light'
});

const emptyValue: Ref<string> = ref<string>('');
const showFilter: Ref<boolean> = ref<boolean>(false);
const openPage: Ref<boolean> = ref<boolean>(false);
const pageTitle: Ref<string> = ref<string>('Create');

const columns = [
    {
        key: 'actions',
        label: 'Actions', 
    },
    { 
        key: 'order_date', 
        label: 'Order Date'  
    },
    { 
        key: 'invoid_number', 
        label: 'Invoid Code'  
    },
    { 
        key: 'order_number', 
        label: 'Order Number'  
    },
    { 
        key: 'customer_name', 
        label: 'Customer Name'  
    },
    { 
        key: 'quantity', 
        label: 'Quantity'  
    },
    { 
        key: 'total_price', 
        label: 'Total Price' 
    },
    {
        key: 'buyer_holder',
        label: 'Buyer Holder'
    },
    {
        key: 'amount_paid',
        label: 'Amount Paid'
    },
    {
        key: 'Change_due',
        label: 'Change Due'
    },
    {
        key: 'payment_status',  
        label: 'Payment Status'
    },
    {
        key: 'status',  
        label: 'Order Status'  
    },
    {
        key: 'payment_method',  
        label: 'Payment Method' 
    },
    {
        key: 'pickup_time', 
        label: 'Pickup Time'  
    },
    {
        key: 'remarks', 
        label: 'Remarks'  
    }
];


const people = [
    {
        invoid_number:'22222',
        order_date: '2025-03-01',
        order_number: 'ORD123',
        customer_name: 'John Doe',
        order_items: 'Cappuccino, Chocolate Croissant',
        quantity: '2',
        buyer_holder: {
            currency: '4100',
            tax: '10'
        },
        total_price: {
            dollar: '12',
            khmer: '50000'
        },
        payment_status: 1,
        status: 2,
        payment_method: 'Credit Card',
        pickup_time: '2025-03-01 10:30 AM',
        remarks: 'No sugar in coffee'
    },
    {
        invoid_number:'22225',
        order_date: '2025-03-01',
        order_number: 'ORD124',
        customer_name: 'Jane Smith',
        order_items: 'Latte, Blueberry Muffin',
        quantity: '1',
        total_price: {
            dollar: '12',
            khmer: '50000'
        },
        buyer_holder: {
            currency: '4100',
            tax: '10'
        },
        payment_status: 1,
        status: 1,
        payment_method: 'Cash',
        pickup_time: '2025-03-01 11:00 AM',
        remarks: 'Extra hot latte'
    },
    {
        invoid_number:'22223',
        order_date: '2025-03-01',
        order_number: 'ORD125',
        customer_name: 'Mark Johnson',
        order_items: 'Espresso, Bagel',
        quantity: '1',
        buyer_holder: {
            currency: '4100',
            tax: '10'
        },
        total_price: '6.00 USD',
        payment_status: 2,
        status: 'Completed',
        payment_method: 'Online',
        pickup_time: '2025-03-01 09:30 AM',
        remarks: 'No butter on bagel'
    }
];

const items = (row: { id: number }) => [
    [
        { 
            label: 'Edit', 
            icon: 'i-heroicons-pencil-square-20-solid', 
            click: () => console.log('Edit', row.id) 
        },
        { 
            label: 'View All', 
            icon: 'ic:outline-remove-red-eye', 
            click: () => console.log('Edit', row.id) 
        },
        { 
            label: 'Set Order Status', 
            icon: 'material-symbols:list-alt-check', 
            click: () => console.log('Edit', row.id) 
        }
    ],
    [
        { 
            label: 'Print as PDF', 
            icon: 'vscode-icons:file-type-pdf2', 
            click: () => console.log('Edit', row.id) 
        },
        { 
            label: 'Delete', 
            icon: 'mdi:trash-can-outline' 
        }
    ]
];

const expand = ref({
    openedRows: [people],
    row: {}
});
const page = ref(1);
const pageCount = ref(10);

const rows = computed(() => {
  return people.slice((page.value - 1) * pageCount.value, page.value * pageCount.value);
});

const pageFrom = computed(() => {
  return (page.value - 1) * pageCount.value + 1;
});

const pageTo = computed(() => {
  const to = page.value * pageCount.value;
  return to > people.length ? people.length : to;
});

const pageTotal = computed(() => {
  return people.length;
});

const orderStatusLabel = (status: number): string => {
    switch(status) {
        case 1: 
            return "Pending";
        case 2: 
            return "Completed";
        case 3: 
            return "Canceled"
        default: 
            return "Unknown"
    }
};

const orderStatusColor = (status: number): string => {
    switch (status) {
        case 1: 
            return "yellow";
        case 2: 
            return "green";
        case 3:
            return "red";
        default: 
            return "gray"
    }
};

const paymentStatuslabel = (status: number): string => {
    switch(status) {
        case 1: 
            return "Pending"
        case 2: 
            return "Paid"
        default: 
            return "pending"
    }
};

const paymentStatusColor = (status: number): string => {
    switch(status) {
        case 1: 
            return "yellow"
        case 2: 
            return "green"
        default: 
            return "yellow"
    }
};

const toggleFilter = (): void => {
    showFilter.value = !showFilter.value;
};

const togglePage = (title: string, state: boolean): void => {
    openPage.value = state;
    pageTitle.value = title;
}

</script>

<style scoped>
</style>