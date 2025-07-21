<template>
    <div 
        class="">
        <PosProchasing
            :cart-data="(submitCart() as any)"
            v-if="openPurchasing"
            @toggle="(state: boolean): void => {
                toggleProchasing(state);
            }"
        />
        <template v-else>
            <div
                class=" h-[90vh] flex  bg-white/30 dark:bg-black/20 shadow-md rounded-md">
                <div
                    class="w-[65%] h-full space-y-3 overflow-y-auto custom-scrollbar relative">
                    <div 
                        class="space-y-2 px-4 py-4 bg-gray-300/30 dark:bg-black/20 shadow sticky top-0 z-30">
                        <div 
                            class="flex gap-x-1.5 items-center justify-center">
                            <LazyUInput
                                v-model="searchMenuList"
                                name="menu-search"
                                size="sm"
                                :placeholder="activeTab === 0 ? 'Search/Scan Menu...' : 'Search/Scan Gifts...'"
                                icon="i-heroicons-magnifying-glass-20-solid"
                                autocomplete="off"
                                color="amber"
                                :ui="{ 
                                    base: 'flex item-center',
                                    icon: { 
                                        trailing: { pointer: '' }, 
                                        color: 'text-orange-500 dark:text-orange-500'
                                    } 
                                }"
                                class="max-w-full w-[600px] mb-2"
                                @input="async (event: Event): Promise<void> => {
                                    const value: string = String((event.target as HTMLInputElement).value);
                                    await searchData(value);
                                }">
                                <template #trailing>
                                    <LazyUButton
                                        v-show="searchMenuList !== ''"
                                        color="red"
                                        variant="link"
                                        icon="i-heroicons-x-mark-20-solid"
                                        :padded="false"
                                        @click="async (): Promise<void> => {
                                            searchMenuList = '';
                                            await fetchMenuList();
                                        }"
                                    />
                                </template>
                            </LazyUInput>
                            <LazyUTabs 
                                :items="itemsTap" 
                                v-model="activeTab"
                                :ui="{
                                    list:{
                                        height: 'h-10',
                                        tab:{
                                            height: 'h-8',
                                            size: 'text-xs',
                                            rounded: 'rounder-sm',
                                            active: 'text-orange-500 dark:text-orange-500',
                                            inactive: 'text-gray-400 dark:text-gray-400'
                                        }
                                    }
                                }"
                                class="w-[400px]"
                            />
                        </div>
                        <article 
                            v-if="activeTab === 0"
                            class="space-y-3">
                            <div 
                                class="space-y-1">
                                <h2
                                    class="text-sm uppercase font-bold text-orange-500 dark:text-orange-500">
                                    Category
                                </h2>
                                <div 
                                    class="w-full flex flex-wrap items-center gap-x-1 gap-y-3">
                                    <div 
                                        v-if="categoryOptions.length > 0"
                                        v-for="(category, idx) in categoryOptions"
                                        :key="idx">
                                        <LazyUButton
                                            :label="String(category.label)"
                                            color="amber"
                                            :variant="menuListvariant === category.value ? 'solid' : 'outline'"
                                            :trailing="false"
                                            size="xs"
                                            class="px-2 uppercase"
                                            @click="handleMenuClick(String(category.value))"
                                        />
                                        </div>

                                    <span
                                        v-else
                                        class="text-orange-500 dark:text-orange-500 text-sm">
                                        Loadding Category...
                                    </span>
                                </div>
                            </div>
                            <div 
                                class="space-y-2">
                                <h1
                                    class="font-bold text-sm text-orange-500 dark:text-orange-500 uppercase">
                                    <span>{{ menuListvariant }}</span> menu
                                </h1>
                                <div 
                                    class="w-full flex flex-wrap gap-x-2  gap-y-3">
                                    <PosCard
                                        v-if="menuDb.length > 0"
                                        v-for="(menu) in menuDb"
                                        :key="menu.id"
                                        :id="Number(menu.id)"
                                        :item-code="String(menu.pro_code)"
                                        :card-name="String(menu.name_en)"
                                        :price="String(menu.price.en_price)"
                                        :image="String(menu.image)"
                                        @update:cart="handleUpdateCartItems"
                                    />
                                    <div 
                                        v-else
                                        class="w-full h-full flex flex-col items-center justify-center gap-y-1">
                                        <NoItems
                                            class="w-12 h-12 text-red-500 dark:text-red-500"
                                        />
                                        <span
                                            class="text-orange-600 dark:text-orange-600 text-sm font-semibold">
                                            No Items...
                                        </span>
                                    </div>
                                </div>
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
                                    </div>
                                    <LazyUPagination
                                        v-model="page"
                                        :page-count="Number(pageCount)"
                                        :total="pageTotal" 
                                        :active-button="{ color: 'amber' }"
                                    />
                                </div>
                            </div>
                        </article>
                        <article v-else>
                            <div 
                                class="space-y-2">
                                <h1
                                    class="font-bold text-md text-orange-500 dark:text-orange-500 uppercase">
                                    Gifts menu
                                </h1>
                                <div 
                                    class="w-full flex flex-wrap gap-x-2  gap-y-3">
                                    <PosCard
                                        v-if="giftDb.length > 0"
                                        v-for="(gift, idx) in giftDb"
                                        :key="gift.id"
                                        :id="Number(gift.id)"
                                        :item-code="String(gift.gift_id)"
                                        :card-name="String(gift.name)"
                                        :price="String(gift.price)"
                                        :points="gift.points"
                                        :image="String(gift.image)"
                                        @update:cart="handleUpdateCartItems"
                                        is-gift
                                    />
                                    <div 
                                        v-else
                                        class="w-full h-full flex flex-col items-center justify-center gap-y-1">
                                        <NoItems
                                            class="w-12 h-12 text-red-500 dark:text-red-500"
                                        />
                                        <span
                                            class="text-orange-600 dark:text-orange-600 text-sm font-semibold">
                                            No Items...
                                        </span>
                                    </div>
                                </div>
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
                                    </div>
                                    <LazyUPagination
                                        v-model="page"
                                        :page-count="Number(pageCount)"
                                        :total="pageTotal" 
                                        :active-button="{ color: 'amber' }"
                                    />
                                </div>
                            </div>
                        </article>
                    </div>    
                </div>
                <article 
                    class="w-[35%] h-full bg-gray-00 px-3 py-3 space-y-1">
                    <form 
                        @submit.prevent="submitCart"
                        class="flex justify-between items-center h-[5%]">
                        <h2 
                            class="text-md font-bold uppercase text-orange-500 dark:text-orange-500">
                            Cart
                        </h2>
                        <div 
                            class="">
                            <LazyUButton
                                icon="ic:round-history"
                                size="sm"
                                color="amber"
                                variant="ghost"
                                :trailing="false"
                                @click="togglePurchaseHistory(true)"
                            />
                        </div>
                    </form>
                    <div 
                        class=" h-[5%] flex items-center gap-x-1">
                        <SelectMenu
                            value-attribute="value"
                            option-attribute="value"
                            :options="membershipOptions"
                            name="membership"
                            size="md"
                            color="amber"
                            v-model="selectedMemberId"
                            placeholder="Select Membership..."
                            class="flex-1"
                            searchable
                        />
                        <SelectMenu
                            value-attribute="value"
                            option-attribute="label"
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
                            v-model="selectedOrderType"
                            name="order-type"
                            size="md"
                            color="amber"
                            placeholder="Ordertype..."
                            class="w-[150px]"
                        />
                    </div>
                    <div 
                        class="bg-gray-300/30 dark:bg-black/20 h-[65%] px-2 py-2 rounded-md shadow space-y-1 overflow-y-auto custom-scrollbar">
                        <article
                            v-if="cartItems.length > 0"
                            v-for="(item, idx) in cartItems"
                            :key="item.id"
                            class="group relative w-full h-26 flex items-center px-2 py-2 bg-white/30 dark:bg-black/20  text-gray-600 dark:text-white border border-white dark:border-gray-100 gap-x-1.5 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
                            <span 
                                class="border-r border-orange-500 dark:border-orange-500 pr-2">
                                {{ idx + 1 }}
                            </span>
                            <div 
                                class="w-20 h-20 overflow-hidden rounded-full bg-gray-400 dark:bg-gray-900 border border-gray-500 dark:border-gray-300">
                                <img 
                                    :src="String(item.image)" 
                                    :alt="String(item.name)"
                                    class="w-full h-full object-scale-down"
                                />
                            </div>                   
                            <div 
                                class="w-[70%] h-full flex-1 flex flex-col "> 
                                <div 
                                    class="flex flex-col p-1 text-gray-500 dark:text-gray-300">
                                    <h4
                                        class="text-xs text-sky-500 dark:text-sky-300 font-medium">
                                        {{ item.itemCode || 'N/A' }}
                                    </h4>
                                    <h3 class="text-sm font-semibold uppercase">
                                        {{ item.name || 'N/A' }}
                                    </h3>
                                    <div 
                                        class="text-xs flex pb-1">
                                        <div 
                                            class="space-x-1"
                                            v-if="item.sugar">
                                            <span class="font-semibold text-orange-500 dark:text-orange-500">
                                                Sugar:
                                            </span>
                                            <span
                                                class="text-xs font-medium">
                                                %{{ item.sugar || 'N/A' }}
                                            </span>
                                        </div>
                                        <LazyUDivider 
                                            v-if="item.sugar"
                                            orientation="vertical"
                                            class="px-2"
                                            :ui="{
                                                border: {
                                                    base: 'border-orange-500 border'
                                                }
                                            }"    
                                        />
                                        <div 
                                            class="space-x-1"
                                            v-if="item.ice">
                                            <span class="font-semibold text-orange-500">
                                                Ice:
                                            </span>
                                            <span
                                                class="text-xs font-medium">
                                                %{{ item.ice || 'N/A' }}
                                            </span>
                                        </div>
                                        <LazyUDivider 
                                            v-if="item.ice"
                                            orientation="vertical"
                                            class="px-2"
                                            :ui="{
                                                border: {
                                                    base: 'border-orange-500 border'
                                                }
                                            }"    
                                        />
                                        <div 
                                            class="space-x-1"
                                            v-if="item.size">
                                            <span class="font-semibold text-orange-500">
                                                Size:
                                            </span>
                                            <span
                                                class="text-xs font-medium">
                                                {{ item.size || 'N/A' }}
                                            </span>
                                        </div>
                                    </div>
                                    <div 
                                        class="flex items-center justify-between">
                                        <span class="text-sm text-green-500 dark:text-green-500">
                                            $ {{ item.price }}
                                        </span>
                                        <div>
                                            <div 
                                                class=" flex items-center">
                                                <LazyUButton
                                                    size="xs"
                                                    square
                                                    color="amber"
                                                    :variant="item.qty === 1? 'soft': 'solid'"
                                                    icon="material-symbols:check-indeterminate-small-rounded"
                                                    @click="Number(item.qty) > 1 && (item.qty = Number(item.qty) - 1)"
                                                    :disabled="item.qty === 1"
                                                    :ui="{
                                                        icon: {
                                                            base: 'w-3 h-3'
                                                        },
                                                        padding: {
                                                            xs: 'px-0.5 py-0'
                                                        }
                                                    }"
                                                />
                                                <LazyUInput
                                                    name=""
                                                    size="xs"
                                                    color="amber"
                                                    variant="none"
                                                    class="w-10 font-semibold"
                                                    disabled
                                                    v-model="item.qty"
                                                />
                                                <LazyUButton
                                                    size="xs"
                                                    square
                                                    color="amber"
                                                    icon="material-symbols:add-2-rounded"
                                                    @click="item.qty = Number(item.qty) + 1"
                                                    :ui="{
                                                        icon: {
                                                            base: 'w-3 h-3'
                                                        },
                                                        padding: {
                                                            xs: 'px-0.5 py-0'
                                                        }
                                                    }"
                                                />
                                            </div>
                                        </div>   
                                    </div>
                                </div>
                            </div>
                            <LazyUTooltip
                                text="Remove"
                                class="absolute top-0 right-0"
                                :popper="{
                                    placement: 'top',
                                    arrow: true,
                                    offsetDistance: 2
                                }">
                                <LazyUButton
                                    size="xs"
                                    icon="streamline:delete-1"
                                    variant="ghost"
                                    color="red"
                                    square
                                    :ui="{
                                        icon: {
                                            base: 'w-3 h-3'
                                        }
                                    }"
                                    @click="removeCartItem(item)"
                                />
                            </LazyUTooltip>
                        </article>
                        <article
                            v-else
                            class="flex flex-col items-center justify-center h-full">
                            <NoCart 
                                class="w-14 h-14 text-gray-600 dark:text-gray-300" 
                            />
                            <span
                                class="text-orange-500 dark:text-orange-500 text-sm font-semibold">
                                No items in cart
                            </span>
                        </article>
                    </div>
                    <div 
                        class="h-[22%] space-y-1.5 bg-gray-300/30 dark:bg-black/20 dark: px-2 py-1 rounded-md shadow">
                        <aside 
                            class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                            <span class="font-semibold">
                                Total Qty:
                            </span>
                            <span>
                                {{ totalQty }}
                            </span>
                        </aside>
                        <aside 
                            class="flex justify-between items-center text-sm text-gray-500 dark:text-gray-300">
                            <span class="font-semibold">
                                Total Price:
                            </span>
                            <span>
                                $ {{ totalPrice.toFixed(2) }}
                            </span>
                        </aside>
                        <LazyUDivider
                            :ui="{
                                border: {
                                    base: 'border-orange-500 darl:border-orange-500 border'
                                }
                            }"    
                        />
                        <aside 
                            class="flex justify-between items-center text-md text-gray-500 dark:text-gray-300">
                            <span class="font-semibold">
                                Sub Total:
                            </span>
                            <span
                                class="text-xl text-orange-500 dark:text-orange-500">
                                $ {{ subTotal.toFixed(2) }}
                            </span>
                        </aside>
                        <div 
                            class="w-full flex gap-x-2">
                            <LazyUButton
                                type="reset"
                                variant="solid"
                                size="xs"
                                label="Reset"
                                color="red"
                                class="flex-1"
                                block
                                @click="resetCart"
                            />
                            <LazyUButton
                                type="reset"
                                variant="solid"
                                size="xs"
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
                </article>
                <article>
                    <PurchaseHistory 
                        :open="openHistory"
                        @toggle="(state: boolean): void => {
                            togglePurchaseHistory(state);
                        }"
                    />
                </article> 
            </div>
        </template>   
    </div>
</template>

<script lang="ts" setup>
import { 
    PosCard 
} from '@/components/layouts';
import {
    SelectMenu
} from '@/components/ui';
import { 
    PurchaseHistory
} from '@/collector/modals';
import { 
    PosProchasing 
} from '@/collector/pages';
import type { 
    Avatar,
    Items, 
    ResponseStatus 
} from '@/models/type';
import { 
    useAPI 
} from '@/composables/useApi';
import {
    NoCart,
    NoItems
} from '@/components/icons';

interface iSubmitCart {
    id: number;
    memberId?: number;
    orderType: string;
    cartItems: Items[];
    totalQty: number;
    totalPrice: number;
    subTotal: number;
}

interface MenuItem {
    id: number | string;
    pro_code: string;
    name_en: string;
    image: string;
    price: {
        en_price: string | number;
        kh_price: string | number;
    };
}

const itemsTap = [
    {
        label: 'Menu',
        icon: 'streamline:coffee-bean',
    },
    {
        label: 'Gifts',
        icon: 'material-symbols:featured-seasonal-and-gifts-rounded',
    }
];


definePageMeta({
    colorMode: 'light'
});

const { 
    fetchApi,
}= useAPI();

const searchMenuList: Ref<string> = ref<string>('');
const menuListvariant: Ref<string> =  ref<string>('');
const openHistory: Ref<boolean> = ref<boolean>(false);
const openPurchasing: Ref<boolean> = ref<boolean>(false);
const activeTab: Ref<number> = ref<number>(0); 
const menuDb: Ref<MenuItem[]> = ref<MenuItem[]>([]);
const giftDb: Ref<Items[]> = ref<Items[]>([]);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const membershipOptions: Ref<Items[]> = ref<Items[]>([]);
const categoryOptions: Ref<Items[]> = ref<Items[]>([]);
const selectedMemberId = ref<number | undefined>(undefined);
const selectedOrderType = ref<string>('');
const cartItems: Ref<Items[]> = ref<Items[]>([]);

const page:Ref<number> = ref<number>(1);
const pageCount: Ref<number | string> = ref<number | string>(10); 
const pageTotal:Ref<number> = ref<number>(0);
const pageFrom = computed(() => (page.value - 1) * Number(pageCount.value) + 1);
// page
/* 
    End:Declare varrible
*/
const pageTo = computed(() => {
    const to = page.value * Number(pageCount.value);
    return to > pageTotal.value ? pageTotal.value : to;
});

/* 
START:Declare Toggle Modal
*/
const togglePurchaseHistory = (state: boolean): void => {
    openHistory.value = state;
};

const toggleProchasing = (state: boolean): void => {
    openPurchasing.value = state;
};
/* 
END:Declare Toggle Modal
*/

/* 
START:Declare Fetch API
*/

const fetchMenuList = async (query = ''): Promise<void> => {
    let url = `menuList?page=${page.value}&per_page=${pageCount.value}`;
    if (query) url += `&search=${query}`;
    if (menuListvariant.value) url += `&search=${menuListvariant.value}`;

    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if (!result.error) {
        menuDb.value = Array.isArray(result.data) ? result.data : [];
        pageTotal.value = result.total_items || 0; 
    }
};

const fetchGifts = async (query = ''): Promise<void> => {
    let url = `gift?page=${page.value}&per_page=${pageCount.value}`;
    if (query) url += `&search=${query}`;

    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if (!result.error) {
        giftDb.value = Array.isArray(result.data) ? result.data : [];
        pageTotal.value = result.total_items || 0; 
    }
};

const searchData = async (value: string): Promise<void> => {
    if (/^\s+$/.test(value)) return;
    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(async () => {
        page.value = 1;
        if (activeTab.value === 1) {
            await fetchGifts(value);
        } else {
            await fetchMenuList(value);
        }
    }, 300);
};

const fetchMembersOption = async (): Promise<void> => {
    let url: string = `memberships/select-input`;
    const result = await fetchApi('Get', url) as any;
    if (!result.error && Array.isArray(result.options)) 
    {
        membershipOptions.value = result.options as Items[];
    }
}

const fetchCategoryOption = async (): Promise<void> => {
    const url: string = `categoryMenu/select-input`;
    const result = await fetchApi('Get', url) as any;

    if (!result.error && Array.isArray(result.options)) {
        categoryOptions.value = [
            { label: 'All', value: '' },
            ...result.options as Items[],
        ];
    }
};

/* 
END:Declare Fetch API
*/

const handleMenuClick = async (value: string): Promise<void> => {
    menuListvariant.value = value;
    page.value = 1;
    await fetchMenuList();
};

const handleUpdateCartItems = (item: Items): void => {
    const isGift: boolean = !!item.points;
    if (isGift) 
    {
        const index = cartItems.value.findIndex(
            (cart: Items) => cart.id === item.id && cart.points === item.points
        );

        if (index !== -1) {
            cartItems.value[index].qty = Number(cartItems.value[index].qty) + 1;
        } else {
            cartItems.value.push({
                ...item,
                qty: 1
            });
        }
        return;
    }
    const defaultSugar: string | number = item.sugar || '50';
    const defaultIce: string | number = item.ice || '50';
    const remark: string | number = item.remark || '';
    const index = cartItems.value.findIndex(
        (cart: Items) =>
            cart.id === item.id &&
            cart.sugar === defaultSugar &&
            cart.ice === defaultIce &&
            cart.remark === remark
    );
    if (index !== -1) {
        cartItems.value[index].qty = Number(cartItems.value[index].qty) + 1;
    } else {
        cartItems.value.push({
            ...item,
            sugar: defaultSugar,
            ice: defaultIce,
            remark,
        });
    }
};

const removeCartItem = (item: Items): void => {
    cartItems.value = cartItems.value.filter((cart: Items) => !(
            cart.id === item.id &&
            cart.sugar === item.sugar &&
            cart.ice === item.ice &&
            cart.remark === item.remark
        )
    );
};

const resetCart = async (): Promise<void> => {
    cartItems.value = [];
    selectedMemberId.value = undefined;
    selectedOrderType.value = '';
};

const totalQty = computed(() => {
    return cartItems.value.reduce((sum: number, item: Items) => sum + (Number(item.qty) || 0), 0);
});

const totalPrice = computed(() => {
    return cartItems.value.reduce((sum: number, item: Items) => sum + (Number(item.qty) * Number(item.price) || 0), 0);
});

const subTotal = computed(() => {
    return totalPrice.value;
});


/* 
START:Declare Wactch Function
*/
watch(activeTab, async (newVal: number): Promise<void> => {
    page.value = 1;
    if (newVal === 1) {
        await fetchGifts(searchMenuList.value);
    } else {
        await fetchMenuList(searchMenuList.value);
    }
});

watch([page, pageCount], async (): Promise<void> => {
    if (activeTab.value === 1) 
    {
        await fetchGifts(searchMenuList.value);
    } else {
        await fetchMenuList(searchMenuList.value);
    }
});
/* 
END:Declare Wactch Function
*/

/* 
START:Declare Submit Cart
*/
const submitCart = (): iSubmitCart => {
    const payload: iSubmitCart = {
        id: Date.now(),
        memberId: selectedMemberId.value,
        orderType: selectedOrderType.value,
        cartItems: cartItems.value,
        totalQty: totalQty.value,
        totalPrice: totalPrice.value,
        subTotal: subTotal.value,
    };

    return payload;
};


/* 
START:Declare Submit Cart
*/

/* 
END:Declare Fetch API
*/

onMounted(async(): Promise<void> => {
    await fetchMenuList()
    await fetchCategoryOption()
    await fetchMembersOption()
})
</script>

<style scoped>

</style>