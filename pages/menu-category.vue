<template>
    <div 
        class="bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-8">
        <div 
            class="flex justify-between items-center">
            <PrimaryBtn
                name="Create Menu Category"
                size="px-3 py-2 text-sm"
                @click="toggleModal('Create', true,  null)"
            />
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
        <div 
            class="bg-white/30 dark:bg-black/20 border border-gray-200 dark:border-white rounded-lg shadow-xl">
            <LazyUTable
                :rows="categoryDb"
                :columns="selectedColumns"
                :ui="{
                    divide: 'divide-orange-400',
                    th: { 
                        base: 'text-orange-400 uppercase' 
                    },
                    td: {
                        padding: 'py-2'
                    }
                }">
                <template #index-data="{ row, index }">{{ index + 1 }}</template>
                <template #category_id-data="{ row }">
                    <span class="text-orange-500 dark:text-orange-500">
                        {{ row.category_id }}
                    </span>
                </template>

                <template #items-data="{ row }">
                <ul
                    class="space-y-1 ">
                    <li
                        v-for="(item, idx) in row.menuList"
                        :key="idx"
                        class="capitalize text-sm list-decimal font-medium marker:text-orange-400">
                        <span class="text-orange-400 dark:text-orange-400">|</span> {{ item.name_en }}
                    </li>
                </ul>
                </template>
                <template #action-data="{ row }">
                    <div
                        class="flex items-center justify-center gap-2 border px-0 py-0.5 rounded-md bg-gray-100/50 shadow-sm">
                        <UTooltip 
                            text="Edit"
                            :popper="{
                                arrow: true,
                                placement: 'top'
                            }"
                            :ui="{
                                base: 'text-orange-500 dark:text-orange-500'
                            }">
                            <LazyUButton
                                type="button"
                                color="amber"
                                variant="link"
                                size="sm"
                                icon="ic:twotone-mode-edit-outline"
                                :padded="false"
                                @click="() => toggleModal('Edit', true, row.id)"
                            />
                        </UTooltip>
                        <UTooltip 
                            text="Remove"
                            :popper="{
                                arrow: true,
                                placement: 'top'
                            }"
                            :ui="{
                                base: 'text-red-500 dark:text-red-500'
                            }">
                            <LazyUButton
                                type="button"
                                color="red"
                                variant="link"
                                size="sm"
                                icon="streamline:interface-delete-bin-1-remove-delete-empty-bin-trash-garbage"
                                :padded="false"
                                square
                                :ui="{
                                    icon:{
                                        size:{
                                            sm: 'w-4 h-4'
                                        }
                                    }
                                }"
                                @click="async():Promise<void> => {
                                    Delete(
                                        'Are you sure?',              
                                        'You won’t be able to revert this!', 
                                        'Deleted!',                     
                                        'Cancelled',                    
                                        'The item has been deleted.',  
                                        'The item is safe :)', async (): Promise<void> => {
                                        let url: string = `categoryMenu/${row.id}`;
                                        await postApi('DELETE', url).then(async (res: any): Promise<void> => {
                                            if(!res.error){
                                                await fetchCategory()
                                            }
                                        })
                                    }
                                    )
                                }"
                            />
                        </UTooltip>
                    </div>
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
            <Category
                :open="openModal"
                :title="ModalTitle"
                :category-id="modalID"
                @toggle="toggleModal"
                @update:data="async (): Promise<void> => {
                    await fetchCategory();
                }"
            />
        </article>
    </div>
</template>

<script setup lang="ts">
import { 
    MenuCategory 
} from '@/collector/pages';
import { 
    PrimaryBtn 
} from '@/components/ui';
import { 
    useAPI 
} from '@/composables/useApi';
import { Category } from '@/collector/modals';
import type { Items, ResponseStatus } from '@/models/type';
import { Delete } from '@/utils/dialog';


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
        key: 'name',
        label: 'Category_Name'
    }, 
    {
        key: 'category_id',
        label: 'category_id'
    },
    {
        key: 'items',
        label: 'Menulist_Items'
    },
    {
        key: 'created_at',
        label: 'created_at'
    },
    {
        key: 'updated_at',
        label: 'updated_at'
    },
    {
        key: 'action',
        label: 'Action'
    }
];

const { 
    fetchApi, 
    postApi 
} = useAPI();

const searchValue: Ref<string> = ref<string>('');
const openModal: Ref<boolean> = ref<boolean>(false);
const ModalTitle: Ref<string> = ref<string>('Create');	
const categoryDb: Ref<Items[]> = ref<Items[]>([]);
const selectedColumns = ref([...columns]);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const modalID: Ref<number | null> = ref<number | null>(null);
    
const page:Ref<number> = ref<number>(1);
const pageCount: Ref<number | string> = ref<number | string>(10); 
const pageTotal:Ref<number> = ref<number>(0);
const pageFrom = computed(() => (page.value - 1) * Number(pageCount.value) + 1);

const toggleModal = (title: string, state: boolean, id? : number | null): void => {
    openModal.value = state;
    ModalTitle.value = title;
    modalID.value = id ?? null;
};

const fetchCategory = async (query = ''): Promise<void> => {
    let url = `categoryMenu?page=${page.value}&per_page=${pageCount.value}`;
    if (query) url += `&search=${query}`;

    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if (!result.error) {
        categoryDb.value = Array.isArray(result.data) ? result.data : [];
        pageTotal.value = result.total_items || 0; 
    }
};

const searchData = async (value: string): Promise<void> => {
    if (/^\s+$/.test(value)) return;
    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(async () => {
        page.value = 1;
        await fetchCategory(value);
    }, 300);
};

const pageTo = computed(() => {
    const to = page.value * Number(pageCount.value);
    return to > pageTotal.value ? pageTotal.value : to;
});

watch(pageCount, (newVal): void => {
    if (typeof newVal === 'string') {
        pageCount.value = Number(newVal);
    }
});

watch([page, pageCount], async (): Promise<void> => {
    await fetchCategory(searchValue.value);
});

onMounted(async (): Promise<void> => {
    await fetchCategory();
});

</script>

<style scoped>

</style>