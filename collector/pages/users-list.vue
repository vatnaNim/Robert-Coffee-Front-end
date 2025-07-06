<template>
    <form
        name="usersList"
        method="POST"
        enctype="multipart/form-data"
        class="w-full space-y-3"
        @submit.prevent="async(): Promise<void> => {
            submitUsersList();
        }">
        <div 
            class="flex gap-x-3 items-center">
            <LazyUButton
                label="Back"
                size="sm"
                color="amber"
                variant="solid"
                type="reset"
                @click="emits('toggle', '',false)">
                <div 
                    class="flex items-center">
                    <Back class="w-6 h-5"/>
                    <span 
                        class="tracking-wide">
                        Back
                    </span>
                </div>
            </LazyUButton>
            <h1 
                class="text-md font-semibold uppercase text-gray-600 dark:text-gray-300">
                {{ title }} User account
            </h1>
        </div>
        <div 
            class="max-w-4xl mx-auto p-6 rounded-2xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow-sm">
            <div 
                class="flex items-center justify-center">
                <UFormGroup
                    name="image"
                    label="Image"
                    :ui="{
                        label: {
                            base: 'text-orange-500 dark:text-orange-500'
                        }
                    }">
                    <div
                        class="flex flex-col items-center justify-center w-32 h-32 border-2 border-solid border-red-500 rounded-lg cursor-pointer relative overflow-hidden">
                        <ChooseImage
                            name="image" 
                            v-model="_form.image"
                        />
                    </div>
                </UFormGroup>
            </div>
            <div 
                class="flex flex-wrap gap-x-1 gap-y-3 w-full">
                <div 
                    class="flex gap-x-1 w-full">
                    <lazy-u-form-group
                        label="User ID"
                        name="userId"
                        class="w-[100px]"
                        :ui="{ label: { 
                            base: 'text-orange-500 dark:text-orange-500' 
                            } 
                        }">
                        <lazy-u-input 
                            type="text" 
                            size="sm" 
                            name="userId" 
                            disabled
                            v-model="_form.userId"
                            :loading="isLoading"
                            :ui="{
                               icon: {
                                    loading: 'eos-icons:loading'
                               }
                            }"
                        />
                    </lazy-u-form-group>
                    <lazy-u-form-group
                        label="Username"
                        name="name"
                        class="w-full"
                        :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }">
                        <lazy-u-input 
                            type="text" 
                            size="sm" 
                            placeholder="Please Enter Username" 
                            v-model="_form.name"
                            name="name" 
                        />
                    </lazy-u-form-group>
                </div>
                <lazy-u-form-group
                    name="gender"
                    label="Gender"
                    class="max-w-[280px] w-full"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }">
                    <SelectMenu
                        name="gender"
                        size="sm"
                        :options="[
                            { 
                                label: 'Male', 
                                value: 'male' 
                            },
                            { 
                                label: 'Female', 
                                value: 'female' 
                            },
                            { 
                                label: 'Other', 
                                value: 'other' 
                            }
                        ]"
                        v-model="_form.gender"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please Select Gender"
                    />
                </lazy-u-form-group>
                <lazy-u-form-group
                    name="email"
                    label="Email"
                    class="max-w-[280px] w-full"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }"
                    required>
                    <lazy-u-input 
                        type="email" 
                        name="email" 
                        size="sm" 
                        v-model="_form.email"
                        placeholder="Please Enter Email"
                        required 
                    />
                </lazy-u-form-group>
                <lazy-u-form-group
                    name="password"
                    label="Password"
                    class="max-w-[280px] w-full "
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }"
                    v-if="!props.userId || showInput"
                    :required="!props.userId || showInput">
                    <lazy-u-input
                        :type="showPassword ? 'text' : 'password'"
                        v-model="_form.password"
                        name="password"
                        size="sm"
                        placeholder="Please Enter Password"
                        :required="!props.userId || showInput"
                        padded>
                        <template #trailing>
                            <div 
                                class="flex items-center gap-x-2">
                                <span class="text-xs text-orange-500 dark:text-orange-400 font-medium">
                                    {{ _form.password?.toString().length }}/{{ 6 }}
                                </span>
                                <LazyUButton
                                    variant="link"
                                    color="gray"
                                    @click="togglePassword"
                                    class="p-0 hover:text-orange-500 z-10 relative">
                                    <UIcon
                                        :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                        class="w-5 h-5 pointer-events-auto"
                                    />
                                </LazyUButton>
                            </div>
                        </template>
                    </lazy-u-input>
                </lazy-u-form-group>
                <lazy-u-form-group
                    name="role"
                    label="Role"
                    class="max-w-[280px] w-full"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }"
                    required>
                    <SelectMenu
                        name="role"
                        size="sm"
                        v-model="_form.role"
                        :options="[
                            { 
                                label: 'Admin',
                                value: 'admin' 
                            },
                            { 
                                label: 'Users', 
                                value: 'users' 
                            }
                        ]"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please Select Role"
                        required
                    />
                </lazy-u-form-group>
                <lazy-u-form-group
                    name="phoneNumber"
                    label="Phone-Number"
                    class="max-w-[280px] w-full"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }">
                    <lazy-u-input 
                        type="number" 
                        name="phoneNumber" 
                        size="sm" 
                        v-model="_form.phoneNumber"
                        :maxLength="10"
                        placeholder="Please Enter PhoneNumber">
                        <template #trailing>
                            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {{ _form.phoneNumber?.toString().length }}/{{ 10 }}
                            </span>
                        </template>
                    </lazy-u-input>
                </lazy-u-form-group>
                <lazy-u-form-group
                    name="acc_status"
                    label="Status"
                    class="max-w-[280px] w-full"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }"
                    required>
                    <SelectMenu
                        name="acc_status"
                        v-model="_form.acc_status"
                        size="sm"
                        :options="[
                            { 
                                label: 'Active',
                                value: 'active' 
                            },
                            { 
                                label: 'Pending', 
                                value: 'pending' 
                            },
                            { 
                                label: 'Banned', 
                                value: 'banned' 
                            }
                        ]"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please Select Status"
                        required
                    />
                </lazy-u-form-group>
            </div>
            <div 
                class="py-4">
                <u-button
                    type="submit"
                    label="Create Account"
                    size="md"
                    variant="solid"
                    color="amber"
                    :loading="isLoading"
                    :disabled="isLoading"
                    block
                />
            </div>
        </div>
    </form>
</template>

<script setup lang="ts">
import { 
    Back 
} from '@/components/icons';
import { 
    SelectMenu,
    ChooseImage
} from '@/components/ui';
import { 
    useAPI 
} from '@/composables/useApi';
import { 
    useIdGenerator 
} from '@/composables/useIdGenerator';
import type { ResponseStatus } from '@/models/type';

interface iUsersList {
    name: string;
    email: string;
    password: string;
    role: string;
    image: string;
    gender: string;
    phoneNumber: string;
    userId: string;
    acc_status: string;
};

const _form = ref<iUsersList>({
    name: '',
    email: '',
    password: '',
    role: '',
    image: '',
    gender: '',
    phoneNumber: '',
    userId: '',
    acc_status: '',
})

const props = withDefaults(defineProps<{userId: number | null; title:string}>(),{
    userId: null,
    title: 'Create'
})

const {fetchApi, postApi, isLoading} = useAPI();
const { generateId, initializeFromExistingId } = useIdGenerator(1, 'U', 4);

const showPassword: Ref<boolean> = ref<boolean>(false);
const showInput: Ref<boolean> = ref<boolean>(false);

const emits = defineEmits<{
    (e: 'toggle', title:string, state: boolean): void;
    (e: 'update:data'): void;
}>();

const togglePassword = () => {
  showPassword.value = !showPassword.value
};

const initializeId = async (): Promise<void> => {
    let url: string = 'user/last-id'
    const result = (await fetchApi('GET', url)) as any;

    if (!result.error && result.data?.userId) 
    {
        initializeFromExistingId(result.data.userId); 
        _form.value.userId = generateId();
    } else {
        _form.value.userId = generateId();
    }
}

const submitUsersList = async (): Promise<void> => {
    let url: string = props.userId? `user/${props.userId}` : 'register';
    let method: string = props.userId ? 'PUT' : 'POST';
    const result = await postApi(method, url, _form.value) as ResponseStatus;
    if(!result.error)
    {
        clearForm();
        emits('toggle', 'Register', false);
        emits('update:data');
    }
}

const setData = async (): Promise<void> => {
    if(!props.userId) return;
    const result = (await fetchApi('GET', `user/${props.userId}`)) as any;

    if(!result.error && result.data)
    {
        const data = result.data;
        _form.value = {
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            image: data.image,
            gender: data.gender,
            phoneNumber: data.phoneNumber,
            userId: data.userId,
            acc_status: data.acc_status,
        }
        initializeFromExistingId(data.userId)
    }
}

const clearForm = async (): Promise<void> => {
    _form.value = {
        name: '',
        email: '',
        password: '',
        role: '',
        image: '',
        gender: '',
        phoneNumber: '0',
        userId: generateId(),
        acc_status: '',
    }
}

watch(() => props.userId, async(id: number | null): Promise<void> => {
    if(id) {
        await setData()
    } else {
        await initializeId()
    }
}, { immediate: true});

</script>

<style scoped>

</style>