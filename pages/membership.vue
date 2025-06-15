<template>
    <div>
        <template
            v-if="openModal">
            <Membership
                :member-id="null"
                :title="ModalTitle"
                @update:data=""
                @toggle="toggleModal"
            />
        </template>
        <template v-else>
            <div 
                class=" bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-8">
                <div 
                    class="w-full flex justify-between items-center gap-4">
                    <PrimaryBtn
                        name="Create membership"
                        size="px-3 py-2 text-sm"
                        @click="toggleModal('Create', true)"
                    />
                    <div 
                        class="flex items-center justify-end gap-2">
                        <LazyUInput
                            v-model="emptyValue"
                            name="emptyValue"
                            placeholder="Search membership name or code..."
                            icon="i-heroicons-magnifying-glass-20-solid"
                            autocomplete="off"
                            color="amber"
                            :ui="{ icon: { trailing: { pointer: '', container: 'z-20' }, color: 'text-orange-500 dark:text-orange-500' } }">
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
                        </LazyUInput>
                    </div>
                </div>

                <div 
                    class="bg-white/30 dark:bg-black/20 border border-gray-200 dark:border-white  rounded-lg shadow-xl overflow-x-auto">
                    <div 
                        class="flex px-3 py-3.5 border-b gap-x-2 items-center border-orange-400">
                       <UFormGroup 
                            label="Filter card type:"
                            :ui="{
                                label:{
                                    base: 'text-orange-500 fornt-semibold'
                                }
                            }"/>
                       <SelectMenu
                            class="w-full max-w-[350px] sm:max-w-[500px]"
                            name=""
                            value-attribute="value"
                            option-attribute="value"
                            size="sm"
                            color="amber"
                            placeholder="Please filter card level"
                            :options="[
                                { label: 'Silver point', value: 'silver point' },
                                { label: 'Gold point', value: 'gold point' },
                                { label: 'Black point', value: 'black point' }
                            ]"
                        />
                    </div>
					<LazyUTable
                        v-model:expand="expand"
                        :rows="rows"
                        :columns="selectedColumns"
                        :ui="{
                            divide: 'divide-orange-400',
                            th: { base: 'text-orange-400 text-nowrap' }
                        }">
                        <template #expand="{ row }">
                            <TransitionGroup
                                tag="div"
                                name="drop" 
                                class="p-4">
                                <MembershipHistory :key="row.id"/>
                            </TransitionGroup>
                        </template>
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
                            <span
                                class="text-green-500 pb-0.5">
                                $ {{ row.price?.price_dol }}
                            </span>
                            <UDivider  :ui="{
                                border: {
                                    border: 'border-2'
                                }
                            }" />
                            <span
                                class="text-red-500 pt-0.5">
                                {{ row.price?.price_khr }} KHR
                            </span>
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
    Membership
} from '@/collector/pages';
import { 
    TooltipImage, 
    PrimaryBtn,
    SelectMenu 
} from '@/components/ui';
import { 
    MembershipHistory 
} from '@/collector/expand-table';
import type { container } from '@nuxt/ui/dist/runtime/ui.config';


definePageMeta({
    // middleware: 'auth',
    colorMode: 'light'
});

const columns = [
    {
        label: 'ID',
        key: '',
        rowClass: '!text-orange-500'
    },
    {
        key: 'image',
        label: 'profile'
    },
    {
        key: 'name',
        label: 'Name'
    }, 
    {
        key: 'gender',
        label: 'Gender'
    },
    {
        key: 'phone_number',
        label: 'Tel'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'card_level',
        label: 'Card Level'
    },
    {
        key: 'point',
        label: 'Point'
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
    { id: 1, name: 'Lindsay Walton', image: 'https://i.pinimg.com/736x/8f/b1/d5/8fb1d5410a11056dad5b9e39631bc8f7.jpg', menu_type: 'drink' },
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

const expand = ref({
    openedRows: [dataAll],
    row: {}
});

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