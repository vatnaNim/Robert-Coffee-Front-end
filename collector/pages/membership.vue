<template>
    <form
        name="membership"
        enctype="multipart/form-data"
        method="post"
        @submit.prevent="async (): Promise<void> => {
            await submitMember();

        }"
        class="w-full bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-8">
        <div 
            class="flex gap-x-3 items-center">
            <BackBtn
                name="Back"
                btn-class="bg-gray-300 dark:bg-gray-700 py-2 px-8 text-white"
                icon-class="bg-white"
                icon-container="bg-red-600"
                @click="emits('toggle', '', false)"
            />
            <h1 
                class="text-orange-500 text-lg px-4 font-semibold">
                {{ title }} Membership
            </h1>
        </div>
        <div 
            class="flex flex-col gap-y-4">
            <div 
                class="flex justify-center">
                <UFormGroup
                    name="image"
                    label="Profile"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }">
                    <div
                        class="flex flex-col items-center justify-center w-48 h-[180px] border-2 border-dashed !border-red-500 rounded-lg cursor-pointer relative overflow-hidden">
                        <ChooseImage 
                            name="image"
                            v-model="_form.image"
                        />
                    </div>
                </UFormGroup>
            </div>
            <article 
                class="flex gap-x-1.5">
                <UFormGroup
                        name="customer_id"
                        label="Membership-Id"
                        :ui="{
                            label: {
                                base: 'text-orange-500 uppercase font-semibold'
                            }
                        }"
                        class="flex-1">
                        <LazyUInput
                            name="customer_id"
                            type="text"
                            size="sm"
                            color="amber"
                            v-model="_form.customer_id"
                            :loading="isLoading"
                            placeholder="Please MembershipId Address"
                            :ui="{
                                icon: {
                                    loading: 'line-md:loading-loop',
                                    color: 'text-orange-500 dark:text-orange-500'
                                }
                            }"
                        />
                </UFormGroup>
                <UFormGroup
                    name=""
                    label="frist name"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1"
                    required>
                    <LazyUInput
                        name="frist_name"
                        color="amber"
                        size="sm"
                        placeholder="Please Enter Frist Name"
                        v-model="_form.frist_name"
                        required
                    />
                </UFormGroup>
                <UFormGroup
                    name=""
                    label="last name"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1"
                    required>
                    <LazyUInput
                        name="last_name"
                        color="amber"
                        size="sm"
                        placeholder="Please Enter last Name"
                        v-model="_form.last_name"
                        required
                    />
                </UFormGroup>
                <UFormGroup
                    name="gender"
                    label="gender"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1"
                    required>
                    <SelectMenu
                        option-attribute="label"
                        value-attribute="value"
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
                        name="gender"
                        size="sm"
                        placeholder="Please Select Gender"
                        required
                    />
                </UFormGroup>
            </article>
            <article
                class="flex gap-x-1.5">
                   <UFormGroup
                        name="birthdate"
                        label="birthdate"
                        :ui="{
                            label: {
                                base: 'text-orange-500 uppercase font-semibold'
                            }
                        }"
                        class="flex-1"
                        required>
                        <InputDate
                            name="birthdate"
                            size="sm"
                            v-model="_form.birthdate"
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="email"
                        label="Email"
                        :ui="{
                            label: {
                                base: 'text-orange-500 uppercase font-semibold'
                            }
                        }"
                        class="flex-1">
                        <LazyUInput
                            name="email"
                            type="email"
                            size="sm"
                            color="amber"
                            v-model="_form.email"
                            placeholder="Please Enter Email"
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="national_id"
                        label="national_id"
                        :ui="{
                            label: {
                                base: 'text-orange-500 uppercase font-semibold'
                            }
                        }"
                        class="flex-1"
                        required>
                        <LazyUInput
                            name="national_id"
                            type="text"
                            size="sm"
                            color="amber"
                            v-model="_form.national_id"
                            placeholder="Please Enter national Id"
                            required
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="address"
                        label="address"
                        :ui="{
                            label: {
                                base: 'text-orange-500 uppercase font-semibold'
                            }
                        }"
                        class="flex-1">
                        <LazyUInput
                            name="address"
                            type="text"
                            size="sm"
                            color="amber"
                            v-model="_form.address"
                            placeholder="Please Enter Address"
                        />
                    </UFormGroup>
            </article>
            <article 
                class="flex gap-x-1.5">
                <UFormGroup
                    name="phoneNumber"
                    label="phoneNumber"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1"
                    required>
                    <lazy-u-input 
                        type="text" 
                        name="phoneNumber" 
                        size="sm" 
                        v-model="_form.phoneNumber"
                        :maxLength="20"
                        placeholder="Please Enter PhoneNumber">
                        <template #trailing>
                            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
                                {{ _form.phoneNumber?.toString().length }}/<span class="text-orange-500 dark:text-orange-500">{{ 20 }}</span>
                            </span>
                        </template>
                    </lazy-u-input>
                </UFormGroup>
                <UFormGroup
                    name="status"
                    label="status"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1">
                    <SelectMenu
                        name="status"
                        v-model="_form.status"
                        placeholder="Select Membership Status"
                        option-attribute="label"
                        value-attribute="value"
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
                    />
                </UFormGroup>
                <UFormGroup
                    name="points"
                    label="points"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1">
                    <LazyUInput
                        name="points"
                        type="number"
                        size="sm"
                        color="amber"
                        v-model="_form.points"
                        placeholder="Membership points"
                        disabled
                    />
                </UFormGroup>
                <UFormGroup
                    name="amount"
                    label="Amount"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1">
                    <LazyUInput
                        name="amount"
                        type="number"
                        size="sm"
                        color="amber"
                        icon="bx:dollar"
                        v-model="_form.membership_amount"
                        placeholder="Membership points"
                        :ui="{
                            icon: {
                                color: 'text-green-500 dark:text-green-500'
                            }
                        }"
                    />
                </UFormGroup>
            </article>
            <article
                class="flex">
                <UFormGroup
                    name="remarks"
                    label="remarks"
                    :ui="{
                        label: {
                            base: 'text-orange-500 uppercase font-semibold'
                        }
                    }"
                    class="flex-1">
                    <UTextarea
                        name="remarks"
                        :rows="4"
                        color="amber"
                        size="sm"
                        placeholder="Enter remarks"
                        v-model="_form.remark"
                    />
                </UFormGroup>
            </article>
            <div 
                class="flex justify-end gap-1.5">
                <UButton
                    type="reset"
                    label="Cancel"
                    class="px-3"
                    color="red"
                    @click="(): void => {
                        emits('toggle', '', false);
                    }"
                />
                <UButton
                    type="submit"
                    size="sm"
                    :label="props.title + ' Membership'"
                    color="orange"
                    :loading="isLoading"
                    :disabled="isLoading"
                    :ui="{
                        padding: {
                            sm: 'px-8 py-2'
                        }
                    }"
                />        
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
    SelectMenu,
    InputDate
} from '@/components/ui/';
import { format } from 'date-fns';
import type { ResponseStatus } from '@/models/type';

interface iMembership {
    customer_id: string;
    image: string,
    frist_name: string,
    last_name: string,
    gender: string,
    birthdate: Date | null;
    national_id: string,
    email: string,
    address: string,
    phoneNumber: string,
    points: number,
    status: string,
    membership_amount: number,
    cardType: string,
    remark: string
}

const _form = ref<iMembership>({
    customer_id: '',
    image: '',
    frist_name: '',
    last_name: '',
    gender: '',
    birthdate: new Date(),
    email: '',
    national_id: '',
    address: '',
    phoneNumber: '(+855)',
    points: 0,
    cardType: '',
    status: '',
    membership_amount: 0,
    remark: ''
});

const {
    fetchApi,
    postApi, 
    isLoading
}= useAPI();
const { 
    generateId, 
    initializeFromExistingId
} = useIdGenerator(1, 'M', 3);

const props = withDefaults(defineProps<{
    memberId: number | null,
    title: string,
}>(), {
    memberId: null,
    title: 'Create Membership',
});

const emits = defineEmits<{
    (event: 'toggle', title: string ,state: boolean): void;
    (event: 'update:data'): void;
}>();

const initializeId = async (): Promise<void> => {
    let url: string = 'memberships/last-id';
    const result = (await fetchApi('GET', url)) as any;
    
    if (!result.error && result.data?.customer_id)
    {
        initializeFromExistingId(result.data.customer_id); 
        _form.value.customer_id = generateId();  
    } else {
        _form.value.customer_id = generateId();
    }
};

const submitMember = async (): Promise<void> => {
    let url: string = props.memberId ? `membership/${props.memberId}` : 'membership';

    const formToSend = {
        ..._form.value,
        birthdate: _form.value.birthdate ? format(_form.value.birthdate, 'yyyy-MM-dd') : '',
    };
    const method: string = props.memberId ? 'PUT' : 'POST';
    const result = (await postApi(method, url, formToSend)) as ResponseStatus;

    if (!result.error) {
        clearForm();
        emits('toggle', 'Create Membership', false);
        emits('update:data');
    }
};

const setData = async (): Promise<void> => {
    if(!props.memberId) return;
    const result = (await fetchApi('GET', `membership/${props.memberId}`)) as any;
    if (!result.error && result.data)
    {
        const data = result.data;
        _form.value = {
            customer_id: data.customer_id,
            image: data.image,
            frist_name: data.frist_name,
            last_name: data.last_name,
            gender: data.gender,
            email: data.email,
            birthdate: data.birthdate ? new Date(data.birthdate) : null,  
            national_id: data.national_id,
            address: data.address,
            phoneNumber: data.phoneNumber,
            cardType: data.cardType,
            membership_amount: data.membership_amount,
            points: data.points,
            status: data.status,
            remark: data.remark
        }
        initializeFromExistingId(data.customer_id);
    }
};

watch(() => props.memberId, async(id: number | null): Promise<void> => {
    if (id) {
        await setData();
    } else {
        await initializeId();
    }
}, {immediate: true});

const clearForm = async(): Promise<void> => {
    _form.value = {
        customer_id: generateId(),
        image: '',
        frist_name: '',
        last_name: '',
        gender: '',
        birthdate: new Date(),
        national_id: '',
        email: '',
        address: '',
        phoneNumber: '(+855)',
        cardType: '',
        membership_amount: 0,
        points: 0,
        status: '',
        remark: ''
    }
}

</script>

<style scoped>

</style>