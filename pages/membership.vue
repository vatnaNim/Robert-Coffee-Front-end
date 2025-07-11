<template>
    <div>
        <template
            v-if="openModal">
            <Membership
                :member-id="memberId"
                :title="ModalTitle"
                @toggle="toggleModal"
                @update:data="async (): Promise<void> => {
                    await fetchMembership();
                }"
            />
        </template>
        <template 
            v-else-if="viewMember">
            <ViewMembership
                :member-id="memberId"
                @toggle="toggleViewMember"    
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
                        @click="async ():Promise<void> => {
                            memberId = null;
                            await toggleModal('Create', true);
                        }"
                    />
                    <div 
                        class="flex items-center justify-end gap-2">
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
                        :rows="memberDb"
                        :columns="selectedColumns"
                        :ui="{
                            divide: 'divide-orange-400 ',
                            th: { base: 'text-orange-400 text-nowrap uppercase' },
                            td: {
                                padding: 'py-1'
                            },
                            default: {
                                expandButton: {
                                    variant: 'solid',
                                    color: 'red'
                                }
                            }
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
                        <template   #points-data="{row}">
                            <LazyUBadge 
                                color="primary" 
                                size="sm"
                                variant="subtle">
                                {{ row.points }}
                            </LazyUBadge>
                        </template>
                        <template 
                            #status-data="{row}">
                            <LazyUBadge
                                :color="row.status === 'active' ? 'green' :
                                        row.status === 'pending' ? 'yellow' :
                                        row.status === 'banned' ? 'red' : 'gray'"
                                size="sm"
                                variant="solid">
                                {{ row.status }}
                            </LazyUBadge>
                        </template>
                        <template #amount-data="{ row }">
                            <span
                                class="text-green-500 dark:text-green-500">
                                $ {{ row.membership_amount }}
                            </span>
                        </template>
                        <template #action-data="{ row }">
                            <div 
                                class=" flex justify-center">
                                <UDropdown 
                                    :items="actionItem(row)" 
                                    :popper="{ 
                                        placement: 'bottom-start',
                                        arrow: true
                                    }"
                                    :ui="{
                                        background: 'bg-white/20 dark:bg-black/30 backdrop-blur-sm dark:backdrop-blur-md border border-white/30 dark:border-black/30 shadow-lg'
                                    }">
                                    <UButton 
                                        size="sm"
                                        variant="ghost"
                                        color="amber" 
                                        trailing-icon="si:more-horiz-square-duotone" 
                                    />
                                </UDropdown>
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
                    <article>
                        <MembershipStatus
                            :open="statusModal"
                            :member-id="memberId"
                            @toggle="toggleStatus"
                            :ui="{
                                base: 'backdrop-blur-sm border border-white/30',
                                background: 'bg-white/30 dark:bg-black/30 ',
                                rounded: 'rounded-2xl',
                                shadow: 'shadow-lg'
                            }"
                            @update:data="async(): Promise<void> => {
                                await fetchMembership();
                            }"
                        />
                    </article>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { 
    Membership,
    ViewMembership
} from '@/collector/pages';
import { 
    TooltipImage, 
    PrimaryBtn,
    SelectMenu 
} from '@/components/ui';
import { 
    MembershipHistory 
} from '@/collector/expand-table';
import { 
    MembershipStatus 
} from '@/collector/modals';
import type { 
    Items, 
    ResponseStatus 
} from '@/models/type';
import { 
    Delete 
} from '@/utils/dialog';


definePageMeta({
    // middleware: 'auth',
    colorMode: 'light'
});

const columns = [
    {
        label: '',
        key: 'action',
        rowClass: 'px-0'
    },
    {
        label: 'Customer_Id',
        key: 'customer_id',
    },
    {
        key: 'image',
        label: 'profile'
    },
    {
        key: 'frist_name',
        label: 'frist_name'
    }, 
    {
        key: 'last_name',
        label: 'last_name'
    },
    {
        key: 'gender',
        label: 'gender'
    },
    {
        key: 'birthdate',
        label: 'birthdate'
    },
    {
        key: 'national_id',
        label: 'national_id'
    },
    {
        key: 'address',
        label: 'address'
    },
    {
        key: 'phoneNumber',
        label: 'phoneNumber'
    },
    {
        key: 'amount',
        label: 'amounts'
    },
    {
        key: 'points',
        label: 'points'
    },
    {
        key: 'status',
        label: 'status'
    },
    {
        key: 'remark',
        label: 'remark'
    },
    {
        key: 'created_at',
        label: 'created_at'
    },
    {
        key: 'updated_at',
        label: 'updated_at'
    },
];

const actionItem = (row: Items) => [
    [
        {
            label: 'View All',
            iconClass: 'text-orange-500',
            icon: 'mdi:file-eye-outline',
            click: async (): Promise<void> => {
                memberId.value = Number(row.id)
                toggleViewMember(true)
            },
        },
        {
            label: 'Edit',
            icon: 'material-symbols:box-edit-outline',
            iconClass: 'text-orange-500 dark:text-orange-500',
            click: async (): Promise<void> => {
                memberId.value = Number(row.id);
                toggleModal('Edit', true);
            },
        },
        {
            label: 'Modify Status',
            icon: 'i-heroicons-pencil-square-20-solid',
            iconClass: 'text-orange-500 dark:text-orange-500',
            click: async ():Promise<void> => {
                memberId.value = Number(row.id);
                toggleStatus(true);
            }
        }
    ],
    [
            {
            label: 'Change Accessory',
            icon: 'streamline:give-gift',
            iconClass: 'text-orange-500 dark:text-orange-500',
            click: async ():Promise<void> => {
         
            }
        },
        {
            label: 'Remove',
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
                    let url: string = `membership/${row.id}`;
                    await postApi('DELETE', url).then(async (res: any): Promise<void> => {
                        if(!res.error){
                            await fetchMembership()
                        }
                    })
                })
            }
        }
    ]
]

const {
    fetchApi,
    postApi
} = useAPI();

const memberId: Ref<number | null> = ref<number | null>(null);
const openModal: Ref<boolean> = ref<boolean>(false);
const statusModal: Ref<boolean> = ref<boolean>(false);
const ModalTitle: Ref<string> = ref<string>('Create');	
const memberDb: Ref<Items[]> = ref<Items[]>([]);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const searchValue: Ref<string> = ref<string>('');
const viewMember: Ref<boolean> = ref<boolean>(false);

const page:Ref<number> = ref<number>(1);
const pageCount: Ref<number | string> = ref<number | string>(10); 
const pageTotal:Ref<number> = ref<number>(0);
const pageFrom = computed(() => (page.value - 1) * Number(pageCount.value) + 1);
const selectedColumns = ref([...columns]);

const toggleModal = (title: string, state: boolean): void => {
    openModal.value = state;
    ModalTitle.value = title;
};

const toggleStatus = (state: boolean): void => {
    statusModal.value = state;
}

const toggleViewMember = (state: boolean): void => {
    viewMember.value = state;
};

const pageTo = computed(() => {
    const to = page.value * Number(pageCount.value);
    return to > pageTotal.value ? pageTotal.value : to;
});

const expand = ref({
    openedRows: [] as Items[],
    row: null as Items | null
});


const fetchMembership = async (query = ''): Promise<void> => {
    let url: string = `membership?page=${page.value}&per_page=${pageCount.value}`;
    if(query) url += `&search=${query}`;

    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if (!result.error)
    {
        memberDb.value = Array.isArray(result.data)? result.data : [];
        pageTotal.value = result.total_items || 0;
    }
};

const searchData = async (value: string): Promise<void> => {
    if (/^\s+$/.test(value)) return;
    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(async () => {
        page.value = 1;
        await fetchMembership(value);
    }, 300);
}

watch(pageCount, (newVal): void => {
    if (typeof newVal === 'string') {
        pageCount.value = Number(newVal);
    }
});

watch([page, pageCount], async (): Promise<void> => {
    await fetchMembership(searchValue.value);
});

onMounted(async (): Promise<void> => {
    await fetchMembership();
});

</script>

<style scoped>

</style>