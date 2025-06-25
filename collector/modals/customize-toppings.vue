<template>
    <LazyUModal 
        v-bind:model-value="open"
        :ui="{
            base: 'backdrop-blur-sm border border-white/30',
            background: 'bg-white/30 dark:bg-black/30 ',
            rounded: 'rounded-2xl',
            shadow: 'shadow-lg'
        }">
        <div 
            class="p-4 space-y-3">
            <div 
                class="flex justify-between items-center border-b border-orange-500 dark:border-orange-500 pb-2">
                <h1 class="text-lg font-semibold text-orange-400">
                    Customize Items
                </h1>
                <LazyUButton
                    color="red"
                    size="md"
                    variant="link"
                    square
                    @click="emits('toggle', false)">
                    <template #trailing> 
                        <CloseLine
                            class="w-5 h-5"
                        />
                    </template>
                </LazyUButton>
            </div>
            <div 
                class="space-y-2">
                <LazyUFormGroup
                    name=""
                    label="Sugar"
                    :ui="{
                        label:{
                            base: 'text-orange-500 dark:text-orange-500 font-semibold'
                        }
                    }">
                    <SelectMenu
                        name=""
                        size="sm"
                        variant="outline"
                        color="white"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please choose sugar"
                        :options="[
                            {
                                label: '0%',
                                value: '0'
                            },
                            {
                                label: '25%',
                                value: '25'
                            },
                            {
                                label: '50%',
                                value: '50'
                            },
                            {
                                label: '75%',
                                value: '75'
                            },
                            {
                                label: '100%',
                                value: '100'
                            },
                            {
                                label: '125%',
                                value: '125'
                            },
                        ]"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    name=""
                    label="Ice"
                    :ui="{
                        label:{
                            base: 'text-orange-500 dark:text-orange-500 font-semibold'
                        }
                    }">
                    <SelectMenu
                        name=""
                        size="sm"
                        variant="outline"
                        color="white"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please choose Ice"
                        :options="[
                            {
                                label: '0%',
                                value: '0'
                            },
                            {
                                label: '25%',
                                value: '25'
                            },
                            {
                                label: '50%',
                                value: '50'
                            },
                            {
                                label: '75%',
                                value: '75'
                            },
                            {
                                label: '100%',
                                value: '100'
                            },
                            {
                                label: '125%',
                                value: '125'
                            },
                        ]"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    name=""
                    label="Remark"
                    :ui="{
                        label:{
                            base: 'text-orange-500 dark:text-orange-500 font-semibold'
                        }
                    }">
                    <LazyUTextarea
                        :rows="3"
                        size="sm"
                        color="white"
                        placeholder="For remark order customize"
                    />    
                </LazyUFormGroup>
            </div>
            <div 
                class="flex justify-end gap-x-2 mt-3">
                <LazyUButton
                    type="reset"
                    label="Cancel"
                    size="sm"
                    color="red"
                    @click="emits('toggle', false)"
                />
                <LazyUButton
                    type="submit"
                    label="Okay"
                    size="sm"
                    color="amber"
                />
            </div>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">
import { 
    CloseLine 
} from '@/components/icons';
import { 
    SelectMenu 
} from '@/components/ui';

const props = withDefaults(defineProps<{
    open?: boolean;
}>(), {
    open: false,
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();
</script>

<style scoped>
</style>
