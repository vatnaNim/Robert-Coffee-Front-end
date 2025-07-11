<template>
    <div>
        <template   
            v-if="openPage">
            <UsersList
                :title="pageTitle"
                :user-id="usersId"
                @toggle="togglePage"
                @update:data="async(): Promise<void> => {
                    await fetchUsers();
                }"
            />
        </template>
        <template v-else>
            <div 
                class="space-y-3">
                <div 
                    class="flex items-center justify-between gap-y-4 mb-6">
                    <span
                        class="text-lg font-semibold text-orange-500 dark:text-orange-500 uppercase flex items-end gap-x-2">
                        <AllUser/>
                        <span
                            class="text-gray-600 dark:text-gray-300">
                            All Users Account
                        </span>
                    </span>
                    <div 
                        class="flex gap-x-2">
                        <UButton
                            label="Register New Account"
                            size="sm"
                            variant="soft"
                            color="amber"
                            @click="async (): Promise<void> => {
                                usersId = null;
                                togglePage('register', true);
                            }"
                        />
                        <UInput
                            v-model="searchValue"
                            name="emptyValue"
                            placeholder="Search username or userid..."
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
                    class="border-t-2 border-orange-500 dark:border-orange-500">
                    <LazyUTable
                        :columns="columns"
                        :rows="userDb"
                        :ui="{ 
                            divide: 'divide-orange-400',
                            th: { base: 'text-orange-400 text-nowrap uppercase text-sm ' },      
                            td: {
                                padding: 'py-1',
                                base: 'border-b border-gray-300 dark:border-gray-600'
                            }                    
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
                        <template #userId-data="{ row }">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500': ''">
                                {{ row.userId }}
                            </span>
                        </template>
                        <template #name-data="{ row }">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500 capitalize': 'capitalize'">
                                {{ row.name }}
                            </span>
                        </template>
                        <template #gender-data="{ row }">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500 capitalize': 'capitalize'">
                                {{ row.gender }}
                            </span>
                        </template>
                        <template #role-data="{ row }">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500 capitalize': 'capitalize'">
                                {{ row.role }}
                            </span>
                        </template>
                        <template #email-data="{row}">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500 underline underline-offset-2 ': 'text-blue-400 dark:text-blue-400 underline underline-offset-2'">
                                {{ row.email }}
                            </span>
                        </template>
                         <template #phoneNumber-data="{ row }">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500 capitalize': 'capitalize'">
                                {{ row.phoneNumber }}
                            </span>
                        </template>
                        <template #acc_status-data="{ row }">
                            <UBadge
                                :label="row.acc_status"
                                size="sm"
                                :color="row.acc_status === 'active' ? 'green' : row.acc_status === 'pending' ? 'yellow' : 'red'"
                                variant="subtle"
                                :ui="{
                                    variant: {
                                        subtle: 'ring-inset ring-gray-300 dark:ring-gray-600'
                                    }
                                }"
                            />
                        </template>
                        <template #created_at-data="{ row }">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500 capitalize': 'capitalize'">
                                {{ row.created_at }}
                            </span>
                        </template>
                        <template #updated_at-data="{ row }">
                            <span
                                :class="row.index? 'text-green-600 dark:text-green-500 capitalize': 'capitalize'">
                                {{ row.updated_at }}
                            </span>
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
                    <AccountStatus
                        :user-id="usersId"
                        :open="statusModal"
                        :user-name="userName"
                        @toggle="toggleStatus"
                        @update:data="async(): Promise<void> => {
                            await fetchUsers()
                        }"
                    />
                    <ChangePassword
                        :user-id="usersId"
                        :open="changePWModal"
                        :user-name="userName"
                        @toggle="toggleChangePw"
                        @update:data="async (): Promise<void> => {
                            await fetchUsers()
                        }"
                    />
                </article>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { 
    UsersList 
} from '@/collector/pages';
import type { 
    Items, 
    ResponseStatus 
} from '@/models/type';
import {
    AllUser
} from "@/components/icons"
import { 
    TooltipImage 
} from '../ui';
import { 
    ChangePassword,
    AccountStatus 
} from '@/collector/modals';
import { Delete } from '@/utils/dialog';

const columns = [
    {
        key: 'action',
        label: 'Action'
    }, 
    {
        key: 'userId',
        label: 'User-id'
    }, 
    {
        key: 'image',
        label: 'Profile'
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
        key: 'role',
        label: 'Role'
    },
    {
        key: 'email',
        label: 'Email'
    },
    {
        key: 'phoneNumber',
        label: 'Phonenumber'
    },
    {
        key: 'acc_status',
        label: 'Status'
    },
    {
        key: 'created_at',
        label: 'Create-At'
    },
    {
        key: 'updated_at',
        label: 'updated-at'
    },
];

const actionItem = (row: Items) => [
    [
        {
            label: 'Edit User',
            icon: 'lucide:user-pen',
            click: async (): Promise<void> => {
                usersId.value = Number(row.id);
                togglePage('Edit', true);
            },
        },
        {
            label: 'Change Status',
            icon: 'material-symbols:deployed-code-account-outline-rounded',
            click: async ():Promise<void> => {
                userName.value = String(row.name);
                usersId.value = Number(row.id);
                toggleStatus(true);
            }
        },
        {
            label: 'Change Password',
            icon: 'fluent:password-reset-48-regular',
            click: async ():Promise<void> => {
                userName.value = String(row.name);
                usersId.value = Number(row.id);
                toggleChangePw(true);
            }
        },
    ],
    [ 
        {
            label: 'Remove User',
            icon: 'ic:baseline-person-remove',
            iconClass: 'text-red-500 dark:text-red-400',
            class: 'text-red-500 dark:text-red-400',
            click: async(): Promise<void> => {
                Delete(
                    'Are you sure?',              
                    'You won’t be able to revert this!', 
                    'Deleted!',                     
                    'Cancelled',                    
                    `${row.name} has been deleted.`,  
                    `${row.name} is safe :)`, async (): Promise<void> => {
                    let url: string = `user/${row.id}`;
                    await postApi('DELETE', url).then(async (res: any): Promise<void> => {
                        if(!res.error){
                            await fetchUsers();
                        }
                    })
                })
            }
        }
    ]
];

const {
    fetchApi, 
    postApi
} = useAPI();

const searchValue: Ref<string> = ref<string>('');
const openPage: Ref<boolean> = ref<boolean>(false);
const pageTitle: Ref<string> = ref<string>('Create');
const usersId: Ref<number | null> = ref<number | null>(null);
const userDb: Ref<Items[]> = ref<Items[]>([]);
const timeout: Ref<NodeJS.Timeout | null> = ref<NodeJS.Timeout | null>(null);
const changePWModal: Ref<boolean> = ref<boolean>(false);
const statusModal: Ref<boolean> = ref<boolean>(false);
const userName: Ref<string> = ref<string>('No UserName!');

const page:Ref<number> = ref<number>(1);
const pageCount: Ref<number | string> = ref<number | string>(10); 
const pageTotal:Ref<number> = ref<number>(0);
const pageFrom = computed(() => (page.value - 1) * Number(pageCount.value) + 1);


const pageTo = computed(() => {
    const to = page.value * Number(pageCount.value);
    return to > pageTotal.value ? pageTotal.value : to;
});

const togglePage =(title: string, state: boolean): void => {
    openPage.value = state;
    pageTitle.value = title;
};

const toggleChangePw = (state: boolean): void => {
    changePWModal.value = state;
}

const toggleStatus = (state: boolean): void => {
    statusModal.value = state;
}

const fetchUsers = async (query = ''): Promise<void> => {
    let url: string = `users?page=${page.value}&per_page=${pageCount.value}`;
    if(query) url += `&search=${query}`
    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if(!result.error)
    {
        userDb.value = Array.isArray(result.data) ? result.data : [];
        pageTotal.value = result.total_items || 0;
    }
}

const searchData = async (value: string): Promise<void> => {
    if (/^\s+$/.test(value)) return;
    if (timeout.value) clearTimeout(timeout.value);

    timeout.value = setTimeout(async () => {
        page.value = 1;
        await fetchUsers(value);
    }, 300);
};

watch(pageCount, (newVal): void => {
    if (typeof newVal === 'string') {
        pageCount.value = Number(newVal);
    }
});

watch([page, pageCount], async (): Promise<void> => {
    await fetchUsers(searchValue.value);
});

onMounted(async (): Promise<void> => {
    await fetchUsers()
})
</script>

<style scoped>

</style>