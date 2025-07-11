<template>
    <LazyUModal 
        v-bind:model-value="open"
        :ui="{
        base: 'backdrop-blur-sm border border-white/30',
        background: 'bg-white/30 dark:bg-black/30',
        rounded: 'rounded-2xl',
        shadow: 'shadow-lg'
        }">
        <form 
            name="change-password"
            method="PUT"
            enctype="multipart/form-data"
            @submit.prevent="async(): Promise<void> => {
                await submitChangePw();
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
                        Change password
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
                <UFormGroup
                    label="New Password"
                    name="password"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }"
                    required>
                    <lazy-u-input 
                        v-model="_form.password"
                        name="password"
                        :type="showPassword ? 'text' : 'password'"
                        maxlength="10"
                        size="sm"
                        variant="outline"
                        color="white"
                        placeholder="Please enter new password"
                        required>
                        <template #trailing>
                            <div 
                                class="flex items-center gap-x-2">
                                <span 
                                    class="text-xs text-orange-500 dark:text-orange-400 font-medium">
                                    {{ _form.password.length }}/10
                                </span>
                                <LazyUButton
                                    variant="link"
                                    color="gray"
                                    @click="togglePassword('password')"
                                    class="p-0 hover:text-orange-500 z-10 relative group">
                                    <UIcon
                                        :name="showPassword ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                        class="w-5 h-5 pointer-events-auto  text-gray-400 group-hover:text-orange-500 transition-colors duration-200"
                                    />
                                </LazyUButton>
                            </div>
                        </template>
                    </lazy-u-input>
                </UFormGroup>
                <UFormGroup
                    label="Confirm Password"
                    name="password_confirmation"
                    :ui="{ label: { base: 'text-orange-500 dark:text-orange-500' } }"
                    required>
                    <lazy-u-input 
                        v-model="_form.password_confirmation"
                        name="password_confirmation"
                        :type="showPasswordConfirmation ? 'text' : 'password'"
                        size="sm"
                        variant="outline"
                        color="white"
                        maxlength="10"
                        placeholder="Please confirm your password"
                        required>
                        <template #trailing>
                        <div 
                            class="flex items-center gap-x-2">
                            <span 
                                class="text-xs text-orange-500 dark:text-orange-400 font-medium">
                                {{ _form.password_confirmation.length }}/10
                            </span>
                            <LazyUButton
                                variant="link"
                                color="gray"
                                @click="togglePassword('confirmation')"
                                class="p-0 hover:text-orange-500 z-10 relative group">
                                <UIcon
                                    :name="showPasswordConfirmation ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'"
                                    class="w-5 h-5 pointer-events-auto text-gray-400 group-hover:text-orange-500 transition-colors duration-200"
                                />
                                </LazyUButton>
                        </div>
                        </template>
                    </lazy-u-input>
                </UFormGroup>
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

interface iPassword {
    name?: string;
    password: string;
    password_confirmation: string;
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

const _form = ref<iPassword>({
    password: '',
    password_confirmation: ''
})

const {postApi, isLoading} = useAPI();
const showPassword: Ref<boolean> = ref<boolean>(false);
const showPasswordConfirmation: Ref<boolean> = ref<boolean>(false);

const togglePassword = (field: 'password' | 'confirmation'): void => {
    if (field === 'password') 
    {
        showPassword.value = !showPassword.value;
    } 
    else if (field === 'confirmation') 
    {
        showPasswordConfirmation.value = !showPasswordConfirmation.value;
    }
};

const submitChangePw = async (): Promise<void> => {
    let url: string = `user/${props.userId}/change-password`;
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
        password: '',
        password_confirmation: ''
    }
}

</script>
