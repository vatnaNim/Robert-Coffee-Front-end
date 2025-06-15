<template>
    <div>
        <template
            v-if="openModal">
            <MenuCategory
                :typeId="null"
                :title="ModalTitle"
                @update:data=""
                @toggle="toggleModal"
            />
        </template>
        <template v-else>
            <div 
                class="bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-8">
                <div 
                    class="flex justify-between items-center">
                    <PrimaryBtn
                        name="Create Menu Category"
                        size="px-3 py-2 text-sm"
                        @click="toggleModal('Create', true)"
                    />
                    <UInput
                        v-model="emptyValue"
                        name="emptyValue"
                        placeholder="Search..."
                        icon="i-heroicons-magnifying-glass-20-solid"
                        autocomplete="off"
                        color="amber"
                        :ui="{ icon: { 
                            trailing: { pointer: '' },
                            color: 'text-orange-500' } }">
                        <template #trailing>
                        <UButton
                            v-show="emptyValue !== ''"
                            color="red"
                            variant="link"
                            icon="i-heroicons-x-mark-20-solid"
                            :padded="false"
                            @click="emptyValue = ''"
                        />
                        </template>
                    </UInput>
                </div>
                <div 
                    class="bg-white/30 dark:bg-black/20 border border-gray-200 dark:border-white rounded-lg shadow-xl">
					<LazyUTable
                        :rows="rows"
                        :columns="selectedColumns"
                        :ui="{
                            divide: 'divide-orange-400',
                            th: { base: 'text-orange-400 ' }
                        }">
                        <template #index-data="{ row, index }">{{ index + 1 }}</template>
                        <template #items-data="{ row }">
                        <ul
                            class="space-y-1">
                            <li
                                v-for="(item, idx) in row.items"
                                :key="idx"
                                class="capitalize text-sm list-disc font-medium marker:text-orange-400">
                                {{ item }}
                            </li>
                        </ul>
                        </template>
                        <template #action-data="{ row }">
                            <div
                                class="flex items-center gap-2">
                                <LazyUButton
                                    type="button"
                                    color="yellow"
                                    variant="link"
                                    size="sm"
                                    icon="material-symbols:edit-square-outline"
                                    :padded="false"
                                    
                                    square
                                />
                                <LazyUButton
                                    type="button"
                                    color="red"
                                    variant="link"
                                    size="sm"
                                    icon="material-symbols:delete-outline-rounded"
                                    :padded="false"
                                    square
                                    
                                />
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
                            :total="dataAll.length" 
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
    MenuCategory 
} from '@/collector/pages';
import { TooltipImage } from '@/components/ui';
import PrimaryBtn from '@/components/ui/primary-btn.vue';

definePageMeta({
    middleware: 'auth',
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
        label: 'Name'
    }, 
    {
        key: 'menu_type',
        label: 'Menu Type'
    },
    {
        key: 'items',
        label: 'Items'
    },
    {
        key: 'action',
        label: 'Action'
    }
];

const emptyValue: Ref<string> = ref<string>('');
const openModal: Ref<boolean> = ref<boolean>(false);
const ModalTitle: Ref<string> = ref<string>('Create');	

const toggleModal = (title: string, state: boolean): void => {
    openModal.value = state;
    ModalTitle.value = title;
};


const dataAll = [
    { 
        id: 1, 
        name: 'Lindsay Walton', 
        menu_type: 'drink', 
        items: [
        'coffee',
        'fapper'
        ] 
    },
    { id: 2, name: 'James Smith', image: '', menu_type: 'food' },
    { id: 3, name: 'Emma Johnson', image: '', menu_type: 'dessert' },
    { id: 4, name: 'Oliver Brown', image: '', menu_type: 'drink' },
    { id: 5, name: 'Sophia Wilson', image: '', menu_type: 'food' },
    { id: 6, name: 'Liam Martinez', image: '', menu_type: 'dessert' },
    { id: 7, name: 'Ava Anderson', image: '', menu_type: 'drink' },
    { id: 8, name: 'Noah Thomas', image: '', menu_type: 'food' },
    { id: 9, name: 'Isabella White', image: '', menu_type: 'dessert' },
    { id: 10, name: 'Mason Garcia', image: '', menu_type: 'drink' },
    { id: 11, name: 'Mia Harris', image: '', menu_type: 'food' },
    { id: 12, name: 'Ethan Clark', image: '', menu_type: 'dessert' }
]


const selectedColumns = ref([...columns])

const page = ref(1);
const pageCount = ref(10);

const rows = computed(() => {
  return dataAll.slice((page.value - 1) * pageCount.value, page.value * pageCount.value);
});

const pageFrom = computed(() => {
  return (page.value - 1) * pageCount.value + 1;
});

const pageTo = computed(() => {
  const to = page.value * pageCount.value;
  return to > dataAll.length ? dataAll.length : to;
});

const pageTotal = computed(() => {
  return dataAll.length;
});
</script>

<style scoped>

</style>