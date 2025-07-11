<template>
    <LazyUModal 
        v-bind:model-value="open"
        :ui="{
        base: 'backdrop-blur-sm border border-white/30',
        background: 'bg-gray-300/20 dark:bg-black/30',
        rounded: 'rounded-2xl',
        shadow: 'shadow-lg'
        }">
        <form 
            name="account-status"
            method="PUT"
            enctype="multipart/form-data"
            @submit.prevent="async(): Promise<void> => {
                await submitstatus()
            }"
            class="p-4 space-y-3">
            <div 
                class="flex justify-between items-center border-b border-orange-500 dark:border-orange-500 pb-2">
                <div 
                    class="text-lg font-semibold text-orange-400 flex justify-center items-center capitalize gap-x-2">
                    <LazyUIcon 
                        name="fluent:password-reset-48-regular"
                        class="w-6 h-6 text-orange-500 dark:text-orange-500"
                    />
                    <span
                        class="text-md text-gray-500 dark:text-gray-300">
                        Change User status
                    </span>
                </div>
                <LazyUButton
                    color="red"
                    size="md"
                    variant="link"
                    square
                    @click="emits('toggle', false)">
                    <template #trailing> 
                        <CloseLine class="w-5 h-5" />
                    </template>
                </LazyUButton>
            </div>
            <div 
                class="space-y-1">
                <div
                    class="text-sm">
                    <span
                        class="text-orange-500 dark:text-orange-500 tracking-wide font-semibold">
                        Username:
                    </span>
                    <span
                        class="text-md capitalize font-medium text-gray-600 dark:text-gray-300 tracking-wide">
                        {{ props.userName }}
                    </span>
                </div>
                <lazy-u-form-group
                    name="acc_status"
                    label="Status"
                    class="max-w-[280px] w-full"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }"
                    required>
                    <SelectMenu
                        name="acc_status"
                        size="sm"
                        v-model="_form.acc_status"
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
                class="flex justify-end gap-x-1 mt-3">
                <LazyUButton
                    type="reset"
                    label="Cancel"
                    size="sm"
                    color="red"
                    @click="emits('toggle', false)"
                />
                <LazyUButton
                    type="submit"
                    label="Change"
                    size="sm"
                    color="amber"
                    :loading="isLoading"
                    :disabled="isLoading"
                    :ui="{
                        padding: {
                            sm: 'px-6'
                        }
                    }"
                />
            </div>
        </form>
    </LazyUModal>
</template>

<script setup lang="ts">
import {
    CloseLine
} from '@/components/icons';
import { useAPI } from '@/composables/useApi';
import type { Items, ResponseStatus } from '@/models/type';
import { 
    SelectMenu 
} from '@/components/ui';

interface iStatus {
    acc_status: string;
}

const props = withDefaults(defineProps<{
    open?: boolean;
    userId?: number | null;
    userName?: string;
}>(), {
    open: false,
    userId: null,
    userName: 'No Username!'
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const _form = ref<iStatus>({
    acc_status: ''
})

const {postApi, isLoading, fetchApi} = useAPI();

const submitstatus = async(): Promise<void> => {
    let url: string = `user/${props.userId}/user-status`;
    const result = await postApi('PUT', url, _form.value) as ResponseStatus;
    if(!result.error)
    {
        clearForm();
        emits('toggle', false);
        emits('update:data');
    }
}

const clearForm = async (): Promise<void> => {
    _form.value ={
        acc_status: ''
    }
}

const setData = async (): Promise<void> => {
    if(!props.userId) return;
    const result = (await fetchApi('GET', `user/${props.userId}/user-status`)) as any;
    if(!result.error && result.data)
    {
       const data = result.data;
       _form.value = {
            acc_status: data.acc_status
       } 
    }
}

watch(() => props.userId, async(id: number | null): Promise<void> => {
    if(id)
    {
        await setData()
    }
}, {immediate: true})
</script>
