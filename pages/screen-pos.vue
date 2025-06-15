<template>
    <div 
        class="">
        <PosProchasing
            v-if="openPurchasing"
            @toggle="(state: boolean): void => {
                toggleProchasing(state);
            }"
        />
        <template v-else>
            <div
                class=" h-[90vh] flex  bg-white shadow-md rounded-md">
                <div
                    class="w-[65%] h-full space-y-3 overflow-y-auto custom-scrollbar relative">
                    <div 
                        class="space-y-3 px-4 py-4 bg-gray-100 shadow rounded-lg sticky top-0 z-30">
                        <div 
                            class="flex gap-x-2 ">
                            <LazyUInput
                                v-model="emptyValue"
                                name="emptyValue"
                                size="sm"
                                placeholder="Search membership name or code..."
                                icon="i-heroicons-magnifying-glass-20-solid"
                                autocomplete="off"
                                color="amber"
                                :ui="{ 
                                    icon: { trailing: { pointer: '' }, 
                                    color: 'text-orange-500' } 
                                }"
                                class="max-w-full w-[400px]">
                                <template #trailing>
                                    <LazyUButton
                                        v-show="emptyValue !== ''"
                                        color="red"
                                        variant="link"
                                        icon="i-heroicons-x-mark-20-solid"
                                        :padded="false"
                                        @click="emptyValue = ''"
                                    />
                                </template>
                            </LazyUInput>
                            <LazyUButton
                                label="Filter"
                                icon="mage:filter"
                                color="amber"
                                size="sm"
                                variant="solid"
                                :trailing="false"
                                class="px-3"
                            />
                        </div>
                        <div 
                            class="w-full flex flex-wrap gap-x-2 gap-y-3">
                            <div 
                                v-for="(menu, idx) in menuList"
                                :key="idx">
                                <LazyUButton
                                    :label="menu.label"
                                    color="amber"
                                    :variant="menuListvariant === menu.value ? 'solid' : 'outline'"
                                    :trailing="false"
                                    class="px-3 uppercase"
                                    @click="handleMenuClick(menu.value)"
                                />
                            </div>
                        </div>
                        <h1
                            class="font-semibold text-lg text-orange-400">
                            <span class="capitalize">{{ menuListvariant }}</span> menu
                        </h1>
                    </div>
                    <div 
                        class="w-full flex flex-wrap gap-x-3  gap-y-4  px-4 ">
                        <PosCard
                            @update:cart="handleUpdateCartItems"
                        />
                    
                    </div>
                    <div 
                        class="flex justify-end">
                        <LazyUPagination
                            :active-button="{ variant: 'outline' }"
                            :inactive-button="{ color: 'gray' }"
                            :model-value="4"
                            :total="100"
                        />
                    </div>
                </div>
                <div 
                    class="w-[35%] h-full bg-gray-00 px-3 py-3 space-y-2">
                    <div 
                        class="flex justify-between items-center h-[5%]">
                        <h2 class="text-xl font-semibold tracking-wider text-orange-500">
                            Cart
                        </h2>
                        <div 
                            class="">
                            <LazyUButton
                                icon="carbon:customer"
                                size="sm"
                                color="amber"
                                variant="solid"
                                label="Add Customer"
                                :trailing="false"
                                @click="toggleCustomer(true)"
                            />
                        </div>
                    </div>
                    <div 
                        class=" h-[5%] flex items-center gap-x-2">
                        <div 
                            v-for="(order, idx) in orderKindDb"
                            :key="idx"
                            class="w-full">
                            <LazyUButton
                                :label="order.label"
                                color="amber"
                                :variant="orderKind === order.value ? 'solid' : 'outline'"
                                :trailing="false"
                                size="xs"
                                block
                                :ui="{
                                    rounded: 'rounded-full'
                                }"
                                @click="handleOrder(order.value)"
                            />
                        </div>
                    </div>
                    <div 
                        class="bg-gray-100 h-[65%] px-2 py-2 rounded-md shadow space-y-2 overflow-y-auto custom-scrollbar">
                        <article
                            class="group relative w-full h-24 flex items-center px-2 py-2 bg-white gap-x-1.5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                            <span 
                                class="border-r-2 border-orange-500 pr-2">
                                1
                            </span>
                            <div 
                                class="w-20 h-20 overflow-hidden rounded-full bg-gray-400 border ">
                                <img 
                                    src="https://i.pinimg.com/736x/2e/e8/12/2ee8124cf986d29f499202fac499698f.jpg" 
                                    alt="image cart"
                                    class="w-full h-full object-scale-down"
                                />
                            </div>
                        
                            <div 
                                class="w-[70%] h-full flex-1 flex flex-col bg-slate-100 rounded-md"> 
                                <div 
                                    class="flex flex-col p-1">
                                    <h3 class="text-md font-semibold capitalize">
                                        Ice Latte
                                    </h3>
                                    <div 
                                        class="text-sm flex">
                                        <div 
                                            class="space-x-1">
                                            <span class="font-semibold text-orange-500">
                                                Sugar:
                                            </span>
                                            <span>
                                                25
                                            </span>
                                        </div>
                                        <LazyUDivider 
                                            orientation="vertical"
                                            class="px-2"
                                            :ui="{
                                                border: {
                                                    base: 'border-orange-500 border'
                                                }
                                            }"    
                                        />
                                        <div 
                                            class="space-x-1">
                                            <span class="font-semibold text-orange-500">
                                                Ice:
                                            </span>
                                            <span>
                                                25
                                            </span>
                                        </div>
                                    </div>
                                    <div 
                                        class="flex items-center justify-between">
                                        <span class="text-sm">
                                            $ 15.00
                                        </span>
                                        <div 
                                            class="">
                                            <div 
                                                class=" flex items-center">
                                                <LazyUButton
                                                    size="xs"
                                                    square
                                                    color="amber"
                                                    :variant="qty === 1? 'soft': 'solid'"
                                                    icon="material-symbols:check-indeterminate-small-rounded"
                                                    @click="qty > 1 && qty--"
                                                    :disabled="qty === 1"
                                                />
                                                <LazyUInput
                                                    name=""
                                                    size="xs"
                                                    color="amber"
                                                    variant="none"
                                                    class="w-8 font-semibold"
                                                    disabled
                                                    v-model="qty"
                                                />
                                                <LazyUButton
                                                    size="xs"
                                                    square
                                                    color="amber"
                                                    icon="material-symbols:add-2-rounded"
                                                    @click="qty++"
                                                />
                                            </div>
                                        </div>   
                                    </div>
                                </div>

                            </div>
                            <LazyUTooltip
                                text="Remove"
                                class="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                <LazyUButton
                                    size="xs"
                                    icon="streamline:delete-1"
                                    variant="soft"
                                    color="red"
                                    square
                                />
                            </LazyUTooltip>
                        </article>
                    </div>
                    <div 
                        class="h-[22%] space-y-1.5 bg-gray-100 px-2 py-1 rounded-md shadow">
                        <aside 
                            class="flex justify-between items-center text-md text-gray-600">
                            <span class="font-semibold">
                                Total Qty:
                            </span>
                            <span>
                                10
                            </span>
                        </aside>
                        <aside 
                            class="flex justify-between items-center text-md text-gray-600">
                            <span class="font-semibold">
                                Total Price:
                            </span>
                            <span>
                                $ 10
                            </span>
                        </aside>
                        <LazyUDivider
                            :ui="{
                                border: {
                                    base: 'border-orange-500 border-2'
                                }
                            }"    
                        />
                        <aside 
                            class="flex justify-between items-center text-lg text-gray-600">
                            <span class="font-semibold">
                                Sub Total:
                            </span>
                            <span
                                class="text-black text-xl">
                                $ 10
                            </span>
                        </aside>
                        <div 
                            class="w-full flex gap-x-2">
                            <LazyUButton
                                type="reset"
                                variant="solid"
                                size="sm"
                                label="Reset"
                                color="red"
                                class="flex-1"
                                block
                            />
                            <LazyUButton
                                variant="solid"
                                size="sm"
                                label="Save"
                                color="amber"
                                class="flex-1"
                                block
                            />
                            <LazyUButton
                                type="reset"
                                variant="solid"
                                size="sm"
                                label="Prochase"
                                color="green"
                                class="flex-1"
                                block
                                @click="(): void => {
                                    toggleProchasing(true)
                                }"
                            />
                        </div>
                    </div>
                    
                </div>
                <div>
                    <PosCustomer
                        :open="openCustomer"
                        @toggle="(state): void => {
                            toggleCustomer(state)
                        }"
                    />
                </div> 
            </div>
        </template>   
    </div>
</template>

<script lang="ts" setup>
import { PosCard } from '@/components/layouts';
import SelectMenu from '@/components/ui/select-menu.vue';
import { PosCustomer } from '@/collector/modals';
import { PosProchasing } from '@/collector/pages';
import type { Items } from '@/models/type';


definePageMeta({
    colorMode: 'light'
})

const emptyValue: Ref<string> = ref<string>('');
const menuListvariant: Ref<string> =  ref<string>('coffee');
const openCustomer: Ref<boolean> = ref<boolean>(false);
const orderKind: Ref<string> = ref<string>('dine_in');
const qty: Ref<number> = ref<number>(1);
const openPurchasing: Ref<boolean> = ref<boolean>(false);
const cartItems: Ref<Items[]> = ref<Items[]>([])
    
const menuList = [
    {
        label: 'Coffee',
        value: 'coffee'
    },
    {
        label: 'Food',
        value: 'food'
    },
    {
        label: 'Frappe',
        value: 'frappe'
    },
];

const orderKindDb = [
    {
        label: 'Dine in',
        value: 'dine_in'
    },
    {
        label: 'Delivery',
        value: 'delivery'
    },
    {
        label: 'Take away',
        value: 'take_away'
    }
]

const handleMenuClick = (value: string) => {
    menuListvariant.value = value;
    console.log('Clicked menu item:', value);
};

const handleOrder = (value: string) => {
    orderKind.value = value;
    console.log('Clicked menu item:', value);
};

const toggleCustomer = (state: boolean): void => {
    openCustomer.value = state;
};

const toggleProchasing = (state: boolean): void => {
    openPurchasing.value = state;
};

const handleUpdateCartItems = (data: Items[]):void => {
    cartItems.value = data as Items[];
};

</script>

<style scoped>

</style>