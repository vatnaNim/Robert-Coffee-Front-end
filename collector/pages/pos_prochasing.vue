<template>
    <form
        class="w-full bg-white px-5 py-8 rounded-lg shadow-md flex flex-col gap-y-8">
        <div 
            class="flex gap-x-3 items-center justify-between bg-gray-100 px-3 py-4 rounded-lg shadow">
            <div
                class="flex gap-3 items-center">
                <BackBtn
                    name="Back"
                    btn-class="bg-[#C4B6B6] py-2 px-8 text-white"
                    icon-class="bg-white"
                    icon-container="bg-red-500"
                    @click="emits('toggle', false)"
                />
                <h1>
                    Purchasing Items
                </h1>
            </div>
            <div class="border rounded-full px-2 py-1 text-md text-white bg-orange-500 shadow-sm">
                <span>
                    Currecy:
                </span>
                <span>
                    4100
                </span>
            </div>
        </div>
        <div class="w-full flex gap-3">
            <div 
                id="receipt"
                class="bg-gray-100 flex-1 px-4 py-8 rounded-lg shadow w-[50%]">
                <div 
                    class="w-full">
                    <div 
                        class="w-full flex flex-col gap-y-1 justify-center items-center">
                        <img 
                            src="https://images.immediate.co.uk/production/volatile/sites/30/2020/08/flat-white-3402c4f.jpg" 
                            alt="company logo"
                            class="w-20 h-20 object-fill rounded-full"
                        />
                        <h2
                            class="text-2xl font-semibold text-center uppercase tracking-wide  border-gray-500">
                            Robert Coffee
                        </h2>
                        <p
                            class="text-md">
                            Brewing perfection, one cup at a time.
                        </p>
                        <LazyUDivider>
                            <span 
                                class="text-md text-orange-300 uppercase">
                                receipt
                            </span>
                        </LazyUDivider>
                    </div>
                    <div 
                        class="text-md text-gray-600 capitalize space-y-1">
                        <span
                            class="font-semibold">
                            transition Details:
                        </span>
                        <article>
                            <span>
                                Date:
                            </span>
                            <span>
                                07/08/2025 07:34PM
                            </span>
                        </article>
                        <article>
                            <span>
                                Servied by:
                            </span>
                            <span>
                                Chan
                            </span>
                        </article>
                        <article>
                            <span>
                                NO:
                            </span>
                            <span>
                                # 025255
                            </span>
                        </article>
                    </div>
                    <h3 
                        class="py-3 text-lg font-semibold">
                        Order Items
                    </h3>
                    <LazyUTable
                        :rows="dataAll"
                        :columns="selectedColumns">
                        <template #index-data="{ row, index }">{{ index + 1 }}</template>
                    </LazyUTable>
                </div>
                <LazyUDivider 
                    size="sm" 
                />
                <div 
                    class="py-4 px-4">
                    <article class="w-full flex items-center justify-between border-b-4 border-gray-300">
                        <span class="font-semibold text-gray-700">Sub total:</span>
                        <span class="text-gray-800">$ 1000</span>
                    </article>
                    <article class="w-full flex items-center justify-between  border-b-4 border-gray-300">
                        <span class="font-semibold text-gray-700">Discount:</span>
                        <span class="text-gray-800">% 10</span>
                    </article>
                    <article class="w-full flex items-center justify-between border-b-4 border-gray-300">
                        <span class="font-semibold text-gray-700">Resive amount:</span>
                        <span class="text-gray-800">$ 5000</span>
                    </article>
                    <article class="w-full flex items-center justify-between border-b-4 border-gray-300">
                        <span class="font-semibold text-gray-700">amount due:</span>
                        <span class="text-gray-800">400</span>
                    </article>
                    <article class="w-full flex items-end justify-between  border-gray-300 pt-3">
                        <span class="font-semibold text-gray-700 text-xl">Total:</span>
                        <span class="text-2xl text-gray-800 font-semibold">$ 100</span>
                    </article>
                </div>
                <LazyUDivider 
                    size="sm" 
                />
                <div 
                    class="flex flex-col justify-center items-center py-3 font-semibold text-xl">
                    <span>
                        Order Number:
                    </span>
                    <span>
                        0111
                    </span>
                </div>
                <LazyUDivider 
                    size="sm" 
                />
                <footer class="text-center py-3">
                    <h4
                        class="text-xl font-semibold">
                        Thank You So Much!
                    </h4>
                    <p class="text-md">
                        We appreciate your love for great coffee.
                    </p>
                </footer>
            </div>
            <div 
                class="bg-gray-100 flex-1 p-4 rounded-lg shadow w-[50%] space-y-4">
                <h2 class="text-orange-500 text-lg font-semibold">Puchasing </h2>
                <div 
                    class="flex gap-x-2">
                    <LazyUFormGroup 
                        label="Discount"
                        name=""
                        :ui="{
                            label: {
                                base: 'text-orange-500'
                            }
                        }"
                        class="w-full">
                        <SelectMenu
                            name=""
                            size="sm"
                            color="white"
                            value-attribute="value"
                            option-attribute="label"
                            placeholder="Please select discount"
                            :options="[
                                {
                                    label: 'membership 10%',
                                    value: 'membership 10%'
                                }
                            ]"
                        />
                    </LazyUFormGroup>
                </div>
                <div 
                    class="flex flex-wrap gap-y-6">
                    <LazyUFormGroup 
                        label="Payment BY"
                        name=""
                        :ui="{
                            label: {
                                base: 'text-orange-500'
                            }
                        }"
                        class="flex-1">
                        <SelectMenu
                            name=""
                            placeholder="Please select payments"
                            size="sm"
                            color="white"
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
                    <LazyUFormGroup
                        label="Cash"
                        name=""
                        :ui="{
                            label: {
                                base: 'text-orange-500'
                            }
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
                        />
                        <article>
                            <div 
                                v-if="activeTab === 0"
                                class="flex gap-2 px-4 py-4 bg-white rounded-md shadow">
                                <LazyUFormGroup
                                    name=""
                                    label="Exchange Price ($)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="flex-1">
                                    <UInput
                                        name=""
                                        size="sm"
                                        model-value="500"
                                        color="gray"
                                        placeholder="no items here for payment"
                                        trailing
                                        disabled>
                                        <template #trailing>
                                            <span 
                                                class="text-sm font-semibold text-green-500">
                                                $
                                            </span>
                                        </template>
                                    </UInput>
                                </LazyUFormGroup>
                                <LazyUFormGroup
                                    name=""
                                    label="Payment ($)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="flex-1">
                                    <UInput
                                        name=""
                                        size="sm"
                                        color="white"
                                        placeholder="Please Enter payment"
                                        trailing>
                                        <template #trailing>
                                            <span class="text-sm font-semibold text-green-500">
                                                $
                                            </span>
                                        </template>
                                    </UInput>
                                </LazyUFormGroup>
                            </div>
                            <div 
                                v-else-if="activeTab === 1"
                                class="flex gap-2 px-4 py-4 bg-white rounded-md shadow">
                                <LazyUFormGroup
                                    name=""
                                    label="Exchange Price (៛)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="flex-1">
                                    <UInput
                                        name=""
                                        size="sm"
                                        model-value="500"
                                        color="gray"
                                        placeholder="no items here for payment"
                                        trailing
                                        disabled>
                                        <template #trailing>
                                            <Rial class="w-3 h-3 text-red-500"/>
                                        </template>
                                    </UInput>
                                </LazyUFormGroup>
                                <LazyUFormGroup
                                    name=""
                                    label="Payment (៛)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="flex-1">
                                    <UInput
                                        name=""
                                        size="sm"
                                        color="white"
                                        placeholder="Please Enter payment"
                                        trailing>
                                        <template #trailing>
                                            <Rial class="w-3 h-3 text-red-500"/>
                                        </template>
                                    </UInput>
                                </LazyUFormGroup>
                            </div>
                            <div
                                class="flex gap-2 px-4 py-4 bg-white rounded-md shadow"
                                v-else>
                                <LazyUFormGroup
                                    name=""
                                    label="Exchange Price ($)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="flex-1">
                                    <UInput
                                        name=""
                                        size="sm"
                                        model-value="500"
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
                                    label="Exchange Price (៛)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="flex-1">
                                    <UInput
                                        name=""
                                        size="sm"
                                        model-value="500"
                                        color="gray"
                                        placeholder="no items here for payment"
                                        trailing>
                                        <template #trailing>
                                            <Rial class="w-3 h-3 text-red-500"/>
                                        </template>
                                    </UInput>
                                </LazyUFormGroup>
                            </div>
                        </article>
                    </LazyUFormGroup>
                    <LazyUButton
                        block
                        size="md"
                        label="Print"
                        color="amber"
                        icon="mdi:printer-outline"
                        @click="printReceipt"
                    />
                </div>
            </div>
        </div>

    </form>
</template>

<script setup lang="ts">
import { 
    BackBtn 
} from '@/components/ui';
import {
    ChooseImage,
    SelectMenu
} from '@/components/ui/';
import { Rial } from '@/components/icons';


const props = withDefaults(defineProps<{
    id?: number | null,
}>(), {
    id: null,
});

const emits = defineEmits<{
    (event: 'toggle',state: boolean): void;
    (event: 'update:data'): void;
}>();

const name = ref('')
const maxLength = 10;


const activeTab: Ref<number> = ref<number>(0);
const selectedCustomerType = ref<string>('dollar');

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

const dataAll = [
    { 
        id: 1, 
        qty: 2, 
        name: 'Ice latte',
        dicount: '10%',
        price: '10'
    },
    { 
        id: 2, 
        qty: 1, 
        name: 'Swandwich',
        dicount: '10%',
        price: '10'
    },
]
const selectedColumns = ref([...columns])
watch(selectedCustomerType, (newValue) => {
    if (newValue === 'dollar') {
        activeTab.value = 0;
    } else if (newValue === 'rial') {
        activeTab.value = 1;
    } else {
        activeTab.value = 2;
    }
});

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