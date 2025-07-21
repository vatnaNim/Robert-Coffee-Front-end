<template>
    <div>
        <template v-if="openModal">
            <Gifts
                :gift-id="modalID"
                :title="modalTitle"
                @toggle="toggleModal"
                 @update:data="async (): Promise<void> => {
                    await fetchGifts()
                }"
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
                            name="CREATE GIFT"
                            size="px-3 py-2 text-sm"
                            @click="async(): Promise<void> => {
                                modalID = null;
                                toggleModal('Create', true);
                                
                            }"
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
                            <span class="font-bold uppercase">Filter GIFTS</span>
                        </UButton>
                    </div>
                    <UInput
                        v-model="searchValue"
                        name="emptyValue"
                        placeholder="Search Code or Name..."
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
                        <span class="flex gap-x-2">
                            <Filter class="text-orange-500" />
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
                                :ui="{ label: { base: 'text-orange-500' } }">
                                <SelectMenu
                                    value-attribute="value"
                                    option-attribute="label"
                                    :options="[{ label: 'Ex:1', value: 'Ex1' }]"
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
                                :ui="{ label: { base: 'text-orange-500' } }">
                                <SelectMenu
                                    value-attribute="value"
                                    option-attribute="label"
                                    :options="[{ label: 'Ex:1', value: 'Ex1' }]"
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
                                :ui="{ label: { base: 'text-orange-500' } }">
                                <SelectMenu
                                    value-attribute="value"
                                    option-attribute="label"
                                    :options="[{ label: 'Ex:1', value: 'Ex1' }]"
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
                    class="bg-white/30 dark:bg-black/20  border border-gray-200 dark:border-white  rounded-lg shadow-xl overflow-x-auto">
                    <LazyUTable
                        :rows="menuDb"
                        :columns="selectedColumns"
                        :ui="{
                        divide: 'divide-orange-400',
                        th: { base: 'text-orange-400 text-nowrap uppercase text-sm' },
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
                            <span class="text-green-500  dark:text-green-500">$ {{ row.price }}</span>
                        </template>
                        <template #expires_at-data="{row}">
                            <span
                                class="text-red-400 dark:text-red-500">
                                {{ row.expires_at }}
                            </span>
                        </template>
                        <template #status-data="{ row }">
                        <UBadge
                            :label="row.status"
                            size="sm"
                            :color="row.status === 'active' ? 'green' : 'red'"
                            variant="subtle"
                            :ui="{
                                base: 'capitalize'
                            }"
                        />
                        </template>
                        <template #action-data="{ row }">
                            <UDropdown 
                                :items="actionItem(row)" 
                                :popper="{ placement: 'bottom-start' }"
                                :ui="{
                                    background: 'bg-white/20 dark:bg-black/30 backdrop-blur-sm dark:backdrop-blur-md border border-white/30 dark:border-black/30 shadow-lg'
                                }">
                                <UButton 
                                    size="sm"
                                    variant="soft"
                                    color="amber" 
                                    trailing-icon="si:more-horiz-fill" 
                                />
                            </UDropdown>
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
                    <GiftStatus
                        :open="statusModal"
                        :gift-id="modalID"
                        @toggle="toggleStatus"
                        :ui="{
                            base: 'backdrop-blur-sm border border-white/30',
                            background: 'bg-white/30 dark:bg-black/30 ',
                            rounded: 'rounded-2xl',
                            shadow: 'shadow-lg'
                        }"
                        @update:data="async(): Promise<void> => {
                            await fetchGifts();
                        }"
                    />
                    <GiftSku
                        :open="skuModal"
                        :gift-id="modalID"
                        @toggle="toggleSku"
                        :ui="{
                            base: 'backdrop-blur-sm border border-white/30',
                            background: 'bg-white/30 dark:bg-black/30 ',
                            rounded: 'rounded-2xl',
                            shadow: 'shadow-lg'
                        }"
                        @update:data="async(): Promise<void> => {
                            await fetchGifts();
                        }"
                    />
                    <ViewGift 
                        :gift-id="modalID" 
                        :open="viewModal" 
                        @toggle="toggleView" 
                        />
                </article>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import {
    TooltipImage,
    SelectMenu,
    PrimaryBtn,
} from '@/components/ui';
import { 
    Filter 
} from '@/components/icons';
import { 
    Gifts 
} from '@/collector/pages';
import type { 
    Items, 
    ResponseStatus 
} from '@/models/type';
import { 
    Delete 
} from '@/utils/dialog';
import { 
    useAPI
} from '@/composables/useApi';
import { 
    GiftStatus,
    GiftSku,
    ViewGift
} from '@/collector/modals';

definePageMeta({
    colorMode: 'light',
});


const columns = [
    { key: 'action', label: 'Action' },
    { label: 'ID', key: 'gift_id', rowClass: '!text-orange-500' },
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'price', label: 'Price' },
    { key: 'sku', label: 'SKU' },
    { key: 'points', label: 'Points' },
    { key: 'status', label: 'Status' },
    { key: 'expires_at', label: 'expired_date' },
    { key: 'remark', label: 'remark' },
    { key: 'created_at', label: 'created_at' },
    { key: 'updated_at', label: 'updated_at' },
];

const actionItem = (row: Items) => [
    [
        {
            label: 'Edit Gift',
            icon: 'material-symbols:box-edit-outline',
            click: async (): Promise<void> => {
                modalID.value = Number(row.id);
                toggleModal('Edit', true);
            },
        },
        {
            label: 'Modify Status',
            icon: 'ic:twotone-notifications-active',
            click: async ():Promise<void> => {
                modalID.value = Number(row.id);
                toggleStatus(true);
            }
        },
        {
            label: 'Add SKU',
            icon: 'fluent:gift-card-add-24-regular',
            click: async ():Promise<void> => {
                modalID.value = Number(row.id);
                toggleSku(true);
            }
        }
    ],
    [
        {
            label: 'View Details',
            icon: 'ic:sharp-remove-red-eye',
            click: async ():Promise<void> => {
                modalID.value = Number(row.id);
                toggleView(true);
            }
        },
        {
            label: 'Delete',
            icon: 'mdi:delete-empty-outline',
            iconClass: 'text-red-500 dark:text-red-400',
            class: 'text-red-500 dark:text-red-400',
            click: async(): Promise<void> => {
                Delete(
                    'Are you sure?',              
                    'You won’t be able to revert this!', 
                    'Deleted!',                     
                    'Cancelled',                    
                    'The item has been deleted.',  
                    'The item is safe :)', async (): Promise<void> => {
                    let url: string = `menuList/${row.id}`;
                    await postApi('DELETE', url).then(async (res: any): Promise<void> => {
                        if(!res.error){
                            await fetchGifts()
                        }
                    })
                })
            }
        }
    ]
]
/* 
    Start:Declare varrible
*/
const { 
    fetchApi, 
    postApi 
} = useAPI();

const searchValue: Ref<string> = ref<string>('');
const openModal: Ref<boolean> = ref<boolean>(false);
const modalTitle: Ref<string> = ref<string>('Create');
const showFilter: Ref<boolean> = ref<boolean>(false);
const menuDb: Ref<Items[]> = ref<Items[]>([]);
const modalID: Ref<number | null> = ref<number | null>(null);
const selectedColumns = ref([...columns]);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const statusModal: Ref<boolean> = ref<boolean>(false);
const skuModal:Ref<boolean> = ref<boolean>(false);
const viewModal: Ref<boolean> = ref<boolean>(false);
// page
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

const fetchGifts = async (query = ''): Promise<void> => {
    let url = `gift?page=${page.value}&per_page=${pageCount.value}`;
    if (query) url += `&search=${query}`;

    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if (!result.error) {
        menuDb.value = Array.isArray(result.data) ? result.data : [];
        pageTotal.value = result.total_items || 0; 
    }
};

const searchData = async (value: string): Promise<void> => {
    if (/^\s+$/.test(value)) return;
    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(async () => {
        page.value = 1;
        await fetchGifts(value);
    }, 300);
};

watch(pageCount, (newVal): void => {
    if (typeof newVal === 'string') {
        pageCount.value = Number(newVal);
    }
});

watch([page, pageCount], async (): Promise<void> => {
    await fetchGifts(searchValue.value);
});

const toggleModal = (title: string, state: boolean): void => {
    openModal.value = state;
    modalTitle.value = title;
};

const toggleStatus = (state: boolean): void => {
    statusModal.value = state;
};

const toggleView = (state: boolean): void => {
    viewModal.value = state;
};

const toggleSku = (state: boolean): void => {
    skuModal.value = state;
}

const toggleFilter = (): void => {
    showFilter.value = !showFilter.value;
};

onMounted(async (): Promise<void> => {
    await fetchGifts();
});
</script>
