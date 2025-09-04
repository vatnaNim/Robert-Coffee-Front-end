<template>
    <form
        name="purchasing-form"
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="async (): Promise<void> => {
            await submitPayment()
        }"
        class="w-full bg-white/30 dark:bg-black/20  text-gray-600 backdrop-blur-sm px-4 py-4 rounded-lg shadow-md flex flex-col gap-y-4">
        <div 
            class="flex gap-x-3 items-center justify-between bg-white/30 dark:bg-black/20  text-gray-600 border border-gray-600 px-3 py-3 rounded-lg shadow">
            <div
                class="flex gap-3 items-center">
                <BackBtn
                    name="Back"
                    btn-class="bg-gray-300 dark:bg-gray-700 py-2 px-8 text-white"
                    icon-class="bg-white"
                    icon-container="bg-red-600"
                    @click="emits('toggle', false)"
                />
                <h1
                    class="text-gray-800 dark:text-gray-300 font-medium">
                    Purchasing Items
                </h1>
            </div>
            <div 
                class="rounded-md px-2 py-1 text-sm text-white dark:text-gray-100 bg-orange-500 shadow-sm">
                <span class="text-orange-300 dark:text-orange-300">
                    Currency:
                </span>
                <span>
                    {{ activeTab === 0 ? 'USD' : activeTab === 1 ? 'KHR' : 'Others' }}
                </span>
                <small class="block text-xs text-white/70">Rate: 1 USD = {{ exchangeRate }} KHR</small>
            </div>
        </div>
        <div class="w-full flex gap-3">
            <div class="w-[50%] flex-1 bg-gray-100 dark:bg-gray-800  rounded-xl shadow ">
                <div 
                    id="receipt"
                    class="px-4 py-8">
                    <div 
                        class="w-full h-full">
                        <div 
                            class="w-full flex flex-col gap-y-1 justify-center items-center">
                            <img 
                                :src="MainLogo" 
                                alt="Robert Coffee Logo"
                                class="w-20 h-20 object-fill rounded-full"
                            />
                            <h2
                                class="text-xl font-semibold text-center text-gray-800 dark:text-gray-300 uppercase tracking-wide  border-gray-500">
                                Robert Coffee
                            </h2>
                            <p
                                class="text-md pb-3 text-gray-800 dark:text-gray-300">
                                Brewing perfection, one cup at a time.
                            </p>
                            <LazyUDivider>
                                <span 
                                    class="text-md text-orange-300 dark:text-orange-600 uppercase">
                                    receipt
                                </span>
                            </LazyUDivider>
                        </div>
                        <div 
                            class="text-sm text-gray-800 dark:text-gray-300 capitalize space-y-0.5 pt-2">
                            <span
                                class="font-semibold">
                                transition Details:
                            </span>
                            <article>
                                <span
                                    class="font-semibold">
                                    Date:
                                </span>
                                <span>
                                    {{ formattedDate }}
                                </span>
                            </article>
                            <article>
                                <span 
                                    class="font-semibold">
                                    Cashier by:
                                </span>
                                <span>
                                    {{ username || 'Unknown' }}
                                </span>
                            </article>
                             <article>
                                <span 
                                    class="font-semibold">
                                    Membership:
                                </span>
                                <span>
                                    {{ props.cartData.memberId || 'N/A' }}
                                </span>
                            </article>
                            <article>
                                <span
                                    class="font-semibold">
                                    NO:
                                </span>
                                <span
                                    class="text-sm">
                                    {{ invoiceCode }}
                                </span>
                            </article>
                        </div>
                        <h3 
                            class="py-3 text-md font-semibold text-gray-500 dark:text-gray-300">
                            Order Items
                        </h3>
                        <LazyUTable
                            :rows="dataAll"
                            :columns="selectedColumns">
                            <template 
                                #index-data="{ row, index }">
                                {{ index + 1 }}
                            </template>
                            <template #discount-data="{ row }">
                                % {{ discountPercent || 'N/A' }}
                            </template>
                        </LazyUTable>
                    </div>
                    <LazyUDivider 
                        size="sm"
                        :ui="{
                            border:{
                                base: 'border-gray-300 dark:border-gray-200'
                            }
                        }" 
                    />
                    <div 
                        class="py-4 px-4">
                        <article class="w-full flex items-center justify-between border-b-4 border-gray-300 dark:border-gray-200">
                            <span class="font-semibold text-gray-700 dark:text-gray-300 capitalize">Qty:</span>
                            <span class="text-gray-800 dark:text-gray-300">{{ props.cartData.totalQty }}</span>
                        </article>
                        <article class="w-full flex items-center justify-between border-b-4 border-gray-300 dark:border-gray-200">
                            <span class="font-semibold text-gray-700 dark:text-gray-300 capitalize">Sub total:</span>
                            <span class="text-gray-800 dark:text-gray-300">$ {{ props.cartData.subTotal.toLocaleString() }}</span>
                        </article>
                        <article class="w-full flex items-center justify-between  border-b-4 border-gray-300 dark:border-gray-200  ">
                            <span class="font-semibold text-gray-700 dark:text-gray-300">Discount:</span>
                            <span class="text-gray-800 dark:text-gray-300">% {{ discountPercent }}</span>
                        </article>
                        <article class="w-full flex items-center justify-between  border-b-4 border-gray-300 dark:border-gray-200  ">
                            <span class="font-semibold text-gray-700 dark:text-gray-300">Discount Amount:</span>
                            <span class="text-gray-800 dark:text-gray-300">$ {{ discountAmount }}</span>
                        </article>
                        <article class="w-full flex items-center justify-between border-b-4 border-gray-300 dark:border-gray-200 ">
                            <span class="font-semibold text-gray-700 dark:text-gray-300 capitalize">Receive amount:</span>
                            <span class="text-gray-800 dark:text-gray-300">$ {{ paymentAmount }}</span>
                        </article>
                        <article class="w-full flex items-center justify-between border-b-4 border-gray-300 dark:border-gray-200 ">
                            <span class="font-semibold text-gray-700 capitalize dark:text-gray-300">amount due:</span>
                            <span class="text-gray-800 dark:text-gray-300">$ {{ exchangedPaymentUsd.toFixed(2) }}</span>
                        </article>
                        <article class="w-full flex items-end justify-between  border-gray-300 dark:border-gray-300  pt-3">
                            <span class="font-semibold text-gray-700 dark:text-gray-300 text-xl capitalize">Total:</span>
                            <span class="text-xl text-gray-800 dark:text-gray-300 font-semibold">$ {{ totalAfterDiscount.toFixed(2) }}</span>
                        </article>
                    </div>
                    <LazyUDivider 
                        size="sm" 
                        :ui="{
                            border:{
                                base: 'border-gray-300 dark:border-gray-200'
                            }
                        }" 
                    />
                    <div 
                        class="flex flex-col justify-center items-center py-3 font-semibold text-lg text-gray-500 dark:text-gray-300">
                        <span>
                            Order Number:
                        </span>
                        <span
                            class="font-bold text-gray-800 dark:text-gray-300">
                            {{ orderNumber.toString().padStart(4, '0') }}
                        </span>
                    </div>
                    <LazyUDivider 
                        size="sm" 
                        :ui="{
                            border:{
                                base: 'border-gray-300 dark:border-gray-200'
                            }
                        }" 
                    />
                    <footer class="text-center text-gray-500 dark:text-gray-300 py-3">
                        <h4
                            class="text-lg font-semibold">
                            Thank You So Much!
                        </h4>
                        <p class="text-md">
                            We appreciate your love for great coffee.
                        </p>
                    </footer>
                </div>
            </div>
            <div 
                class="bg-white/30 dark:bg-black/20  text-gray-600  flex-1 p-4 rounded-xl border border-gray-600 dark:border-gray-300 shadow w-[50%] space-y-3">
                <h2 class="text-orange-500 text-lg font-semibold">Puchasing </h2>
                <div 
                    class="flex gap-y-2">
                    <LazyUFormGroup 
                        label="Discount"
                        name="discount"
                        :ui="{
                            label: {
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        class="w-full">
                        <SelectMenu
                            name=""
                            size="sm"
                            color="white"
                            value-attribute="value"
                            option-attribute="label"
                            v-model="discountPercent"
                            placeholder="Please select discount"
                            :options="[
                                {
                                    label: 'Membership',
                                    value: 10
                                },
                                {
                                    label: 'Promotions 50%',
                                    value: 50
                                },
                                {
                                    label: 'Spacial Offer',
                                    value: 100
                                }
                            ]"
                        />
                    </LazyUFormGroup>
                </div>
                <div 
                    class="flex flex-wrap justify-evenly gap-y-6">
                    <LazyUFormGroup 
                        label="Payment Method"
                        name="payment_by"
                        :ui="{
                            label: {
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        class="flex-1">
                        <SelectMenu
                            name=""
                            placeholder="Please select payments"
                            size="sm"
                            color="white"
                            v-model="paymentMethod"
                            option-attribute="label"
                            value-attribute="value"
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
                                    value: 'QR Code'
                                }
                            ]"
                        />
                    </LazyUFormGroup>
                    <div 
                        class="pt-2 w-full">
                        <LazyUFormGroup
                            label="Cash"
                            name=""
                            :ui="{
                                label: {
                                    base: 'text-orange-500 dark:text-orange-500'
                                },
                            }"
                            class="w-full">
                            <LazyURadioGroup
                                name="customerType"
                                legend="Customer type"
                                color="amber"
                                v-model="selectedCustomerType"
                                class="hidden"
                                :options="[
                                    { 
                                        value: 'dollar',
                                        label: 'Dollar' 
                                    },
                                    { 
                                        value: 'rial', 
                                        label: 'Rial' 
                                    },
                                    { 
                                        value: 'other', 
                                        label: 'Other way' 
                                    }
                                ]"
                            />
                            <LazyUTabs
                                :items="tabItem"
                                :model-value="activeTab"
                                @update:model-value="handleTabChange"
                                :ui="{
                                    list:{
                                        height: 'h-10',
                                        background: 'bg-gray-300 dark:bg-gray-800',
                                        tab:{
                                            height: 'h-8',
                                            size: 'text-xs',
                                            rounded: 'rounder-sm',
                                            active: 'text-orange-500 dark:text-orange-500',
                                            inactive: 'text-gray-400 dark:text-gray-400'
                                        }
                                    }
                                }"
                                class="space-y-4"
                            />
                            <article>
                                <div 
                                    v-if="activeTab === 0"
                                    class="flex gap-2 px-4 py-4 bg-gray-300 dark:bg-gray-800 rounded-md shadow">
                                    <LazyUFormGroup
                                        name=""
                                        label="Exchange Price ($)"
                                        :ui="{
                                            label: {
                                                base: 'text-orange-500 dark:text-orange-500'
                                            }
                                        }"
                                        class="flex-1">
                                        <UInput
                                            name=""
                                            size="sm"
                                            :color="isOverPaid ? 'primary' : 'red'"
                                            placeholder="no items here for payment"
                                            trailing
                                            disabled
                                            :model-value="exchangedPaymentUsd.toFixed(2)">
                                            <template #trailing>
                                                <span 
                                                    class="text-sm font-semibold"
                                                    :class="isOverPaid ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'">
                                                    $
                                                </span>
                                            </template>
                                        </UInput>
                                    </LazyUFormGroup>
                                    <LazyUFormGroup
                                        name=""
                                        label="Receive Payment ($)"
                                        :ui="{
                                            label: {
                                                base: 'text-orange-500 dark:text-orange-500'
                                            }
                                        }"
                                        class="flex-1">
                                        <UInput
                                            name=""
                                            size="sm"
                                            color="white"
                                            placeholder="Please Enter payment"
                                            type="number"
                                            v-model="paymentAmount"
                                            trailing>
                                            <template #trailing>
                                                <span class="text-sm font-semibold dark:text-green-500 text-green-500">
                                                    $
                                                </span>
                                            </template>
                                        </UInput>
                                    </LazyUFormGroup>
                                </div>
                                <div 
                                    v-else-if="activeTab === 1"
                                    class="flex gap-2 px-4 py-4 bg-gray-300 dark:bg-gray-800 rounded-md shadow">
                                    <LazyUFormGroup
                                        name="khmer_exchange"
                                        label="Exchange Price (៛)"
                                        :ui="{
                                            label: {
                                                base: 'text-orange-500 dark:text-orange-500'
                                            }
                                        }"
                                        class="flex-1">
                                        <UInput
                                            name=""
                                            size="sm"
                                            type="number"
                                            :color="isOverPaid ? 'primary' : 'red'"
                                            placeholder="no items here for payment"
                                            trailing
                                            disabled
                                            :model-value="exchangedPaymentRial.toFixed(2)">
                                            <template #trailing>
                                                <Rial 
                                                    class="w-3 h-3"
                                                    :class="isOverPaid ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'"
                                                />
                                            </template>
                                        </UInput>
                                    </LazyUFormGroup>
                                    <LazyUFormGroup
                                        name=""
                                        label="Receive Payment (៛)"
                                        :ui="{
                                            label: {
                                                base: 'text-orange-500 dark:text-orange-500'
                                            }
                                        }"
                                        class="flex-1">
                                        <UInput
                                            name="receive_rialPayment"
                                            size="sm"
                                            color="white"
                                            v-model="paymentAmountRial"
                                            placeholder="Please Enter payment"
                                            trailing>
                                            <template #trailing>
                                                <span 
                                                    :class="isOverPaid ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'"
                                                >$</span>
                                            </template>
                                        </UInput>
                                    </LazyUFormGroup>
                                </div>
                                <div
                                    class="flex gap-2 px-4 py-4 bg-gray-300 dark:bg-gray-800 rounded-md shadow"
                                    v-else>
                                    <LazyUFormGroup
                                        name=""
                                        label="Exchange Price"
                                        :ui="{
                                            label: {
                                                base: 'text-orange-500 dark:text-orange-500'
                                            }
                                        }"
                                        class="flex-1">
                                        <UInput
                                            name=""
                                            size="sm"
                                            :color="isOverPaid ? 'primary' : 'red'"
                                            placeholder="no items here for payment"
                                            type="number"
                                            trailing
                                            disabled
                                            :model-value="remainingAmountUsd.toFixed(2)">
                                            <template #trailing>
                                                <Rial 
                                                    class="w-3 h-3"
                                                    :class="isOverPaid ? 'text-green-500 dark:text-green-500' : 'text-red-500 dark:text-red-500'"
                                                />
                                            </template>
                                        </UInput>
                                    </LazyUFormGroup>
                                    <LazyUFormGroup
                                        name=""
                                        label="Exchange Price ($)"
                                        :ui="{
                                            label: {
                                                base: 'text-orange-500 dark:text-orange-500'
                                            }
                                        }"
                                        class="flex-1">
                                        <UInput
                                            name=""
                                            size="sm"
                                            v-model="paymentAmount"
                                            color="gray"
                                            placeholder="no items here for payment"
                                            trailing>
                                            <template #trailing>
                                                <span class="text-sm font-semibold text-green-500">
                                                    $
                                                </span>
                                            </template>
                                        </UInput>
                                    </LazyUFormGroup>
                                    <LazyUFormGroup
                                        name=""
                                        label="Receive Payment (៛)"
                                        :ui="{
                                            label: {
                                                base: 'text-orange-500 dark:text-orange-500'
                                            }
                                        }"
                                        class="flex-1">
                                        <UInput
                                            name=""
                                            size="sm"
                                            v-model="paymentAmountRial"
                                            :color="isOverPaid ? 'primary' : 'red'"
                                            placeholder="no items here for payment"
                                            trailing>
                                            <template #trailing>
                                                <Rial 
                                                    class="w-3 h-3"
                                                    :class="isOverPaid ? 'text-green-500' : 'text-red-500'"
                                                />
                                            </template>
                                        </UInput>
                                    </LazyUFormGroup>
                                </div>
                            </article>
                        </LazyUFormGroup>
                    </div>
                    <div class="w-full py-2">
                        <LazyUFormGroup
                            label="Remark"
                            name="remark"
                            :ui="{
                                label: {
                                    base: 'text-orange-500 dark:text-orange-500'
                                }
                            }"
                            class="w-full">
                            <UTextarea
                                :rows="3"
                                block
                                name="remark"
                                size="sm"
                                color="white"
                                v-model="remarks"
                                placeholder="Have any remark enter here..."
                            />
                        </LazyUFormGroup>
                    </div>
                </div>
                <LazyUButton
                    block
                    size="md"
                    label="Print"
                    color="amber"
                    type="submit"
                    target="_blank"
                    icon="mdi:printer-outline"
                    :disabled="isLoading"
                    :loading="isLoading"
                />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import {
    SelectMenu,
    BackBtn
} from '@/components/ui/';
import { 
    Rial 
} from '@/components/icons';
import type { 
    Items, 
    ResponseStatus
} from '@/models/type';
import { 
    MainLogo 
} from '@/assets/images';
import { 
    useOrderNumber 
} from '@/composables/useOrderNumber';
import { 
    useAPI 
} from '@/composables/useApi';
import { 
    useIdGenerator 
} from '@/composables/useIdGenerator';
import { 
    useAuthStore 
} from '@/stores/auth';
import dayjs from 'dayjs';

interface iCartItem {
    id: number;
    name: string;
    price: number;
    qty: number;
    sugar?: string;
    ice?: string;
    remark?: string;
    discount?: string;
}

interface iCart {
    id?: number;
    memberId: string;
    orderType?: string;
    cartItems?: iCartItem[];
    totalQty: number;
    totalPrice: number;
    subTotal: number;
}

const props = withDefaults(defineProps<{
    id?: number | null,
    cartData: iCart
}>(), {
    id: null,
});

const emits = defineEmits<{
    (event: 'toggle',state: boolean): void;
    (event: 'update:data'): void;
    (event: 'clear-cart'): void;  
}>();

const columns = [
    {
        label: 'No',
        key: 'index',
    },
    {
        key: 'name',
        label: 'Name'
    },
    {
        key: 'qty',
        label: 'Qty'
    }, 
    {
        key: 'discount',
        label: 'Discount'
    },
    {
        key: 'price',
        label: 'Price'
    }
];
const authStore = useAuthStore();
const { 
    orderNumber,
    generateOrderNumber
} = useOrderNumber();
const { 
    username
} = storeToRefs(authStore);
const {
    fetchApi, 
    postApi, 
    isLoading
} = useAPI();
const { 
    generateId,
    initializeFromExistingId 
} = useIdGenerator(1, '#', 3);

const dataAll = computed(() => props.cartData?.cartItems || []);
const formattedDate = computed(() => dayjs().format('MM/DD/YYYY hh:mmA'));
const activeTab: Ref<number> = ref<number>(0);
const selectedCustomerType = ref<string>('dollar');
const discountPercent = ref(0);
const selectedColumns = ref([...columns]);
const subTotal = computed(() => props.cartData.subTotal);
const exchangeRate: number = 4000;
const paymentAmount: Ref<number> = ref<number>(0);
const paymentAmountRial: Ref<number> = ref<number>(0);
const paymentMethod: Ref<string> = ref<string>('');
const remarks: Ref<string> = ref<string>('');
const invoiceCode = ref<string>('');

const handleTabChange = (value: number): void => {
    activeTab.value = value;
    selectedCustomerType.value = value === 0 ? 'dollar' : value === 1 ? 'rial' : 'other';
};

const tabItem = [
    { 
        key: 0, 
        label: 'Dollar', 
        icon: 'streamline:information-desk-customer' 
    },
    { 
        key: 1, 
        label: 'Rial', 
        icon: 'material-symbols-light:card-membership-rounded' 
    },
    { 
        key: 2, 
        label: 'Others way', 
        icon: 'material-symbols-light:card-membership-rounded' 
    }
];



watch(selectedCustomerType, (newValue: string) => {
    if (newValue === 'dollar') {
        activeTab.value = 0;
    } else if (newValue === 'rial') {
        activeTab.value = 1;
    } else {
        activeTab.value = 2;
    }
});
/* 
START:Declare Computed properties 
*/
const discountAmount = computed(() => {
    return (subTotal.value * discountPercent.value) / 100;
});

const totalAfterDiscount = computed(() => {
    return subTotal.value - discountAmount.value;
});


const isOverPaid = computed(() => exchangedPaymentUsd.value > 0);
const exchangedPaymentUsd = computed(() => {
    return (paymentAmount.value || 0) - totalAfterDiscount.value;
});

const exchangedPaymentRial = computed(() => {
    const payment = paymentAmountRial.value || 0;
    const totalDueInRial = totalAfterDiscount.value * exchangeRate;
    return payment - totalDueInRial;
});


const exchangedPayment = computed(() => {
    const totalPaidInDollar = (paymentAmount.value || 0) + (paymentAmountRial.value || 0) / exchangeRate;
    return totalPaidInDollar - totalAfterDiscount.value;
});

const totalPaidInDollar = computed(() => {
    return (paymentAmount.value || 0) + ((paymentAmountRial.value || 0) / exchangeRate);
});

const remainingAmountUsd = computed(() => {
    const remain = totalAfterDiscount.value - totalPaidInDollar.value;
    return remain > 0 ? remain : 0;
});

/* 
END:Declare Computed properties 
*/

const printReceipt = (): void => {
    const printContent = document.getElementById("receipt");
    if (printContent) 
    {
        const originalContent = document.body.innerHTML;
        document.body.innerHTML = printContent.outerHTML;
        window.print();
        document.body.innerHTML = originalContent;
        window.location.reload(); 
    }
};

const fetchLastInvoiceCode = async (): Promise<void> => {
  try {
    const res = await fetchApi('GET', 'purchasing/last-id');
    if (res.status && res.data?.invoiceCode) {
      const last = res.data.invoiceCode;
      const number = parseInt(last.replace('#', '')) || 0;
      const next = number + 1;
      invoiceCode.value = `#${next.toString().padStart(4, '0')}`;
    } else {
      invoiceCode.value = '#0001';
    }
  } catch (err) {
    console.error('Failed to fetch invoice code:', err);
    invoiceCode.value = '#0001';
  }
};

const submitPayment = async(): Promise<void> => {
    const payload = {
        ...props.cartData,
        date: formattedDate.value,
        orderNumber: generateOrderNumber().toString().padStart(4, '0'),
        invoiceCode: invoiceCode.value,
        amountType: selectedCustomerType.value,
        paymentMethod: paymentMethod.value,
        remarks: remarks.value,
        paymentAmount: paymentAmount.value,
        paymentAmountRial: paymentAmountRial.value,
        currency: activeTab.value === 0 ? 'USD' : activeTab.value === 1 ? 'KHR' : 'Others',
        discountPercent: discountPercent.value,
        exchangedAmount: exchangedPayment.value,
    };

    console.log('Submit Payload:', payload);
    const result = await postApi('POST', 'purchasing', payload) as ResponseStatus;
    if(result)
    {
        emits('update:data');
        emits('toggle', false);
        clearPropData();
        printReceipt();
        selectedCustomerType.value = '';
        paymentMethod.value = ''; 
        remarks.value = '';
        paymentAmount.value = 0;
        paymentAmountRial.value = 0;
        discountPercent.value = 0;
        activeTab.value = 0;
    } 
};

const clearPropData = async ():Promise<void> => {
    emits('clear-cart');
}

onMounted(async(): Promise<void> => {
    await fetchLastInvoiceCode();
    await generateOrderNumber();
});


</script>

<style scoped>
@media print {
    body * {
        visibility: hidden;
    }
    #receipt, #receipt * {
        visibility: visible;
    }
    #receipt {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
    }
}
</style>