<template>
    <LazyUModal 
        v-bind:model-value="open"
        :ui="{
            base: 'backdrop-blur-sm border border-white/30',
            background: 'bg-white/30 dark:bg-black/30',
            rounded: 'rounded-2xl',
            shadow: 'shadow-lg'
        }">
        <article 
          
            class="p-4 space-y-3">
            <button 
                type="button" 
                tabindex="0" 
                class="sr-only">
                Focusable
            </button>
            <div class="flex justify-between items-center border-b border-orange-500 dark:border-orange-500 pb-2">
                <h1 class="text-lg font-semibold text-orange-400">Customize Items</h1>
                <LazyUButton
                    color="red"
                    size="md"
                    variant="link"
                    square
                    @click="closeModal">
                    <template #trailing> 
                        <CloseLine class="w-5 h-5" />
                    </template>
                </LazyUButton>
            </div>
            <div 
                class="space-y-2">
                <LazyUFormGroup
                    label="Sugar"
                    :ui="{ 
                        label:{ 
                                base: 'text-orange-500 dark:text-orange-500 font-semibold' 
                            }
                        }">
                        <SelectMenu
                            v-model="form.sugar"
                            name="sugar"
                            size="sm"
                            variant="outline"
                            color="white"
                            option-attribute="label"
                            value-attribute="value"
                            placeholder="Please choose sugar"
                            :options="sugarOptions"
                        />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Ice"
                    :ui="{ label:{ base: 'text-orange-500 dark:text-orange-500 font-semibold' }}">
                    <SelectMenu
                        v-model="form.ice"
                        name="ice"
                        size="sm"
                        variant="outline"
                        color="white"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please choose Ice"
                        :options="iceOptions"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Remark"
                    :ui="{ label:{ base: 'text-orange-500 dark:text-orange-500 font-semibold' }}">
                    <LazyUTextarea
                        v-model="form.remark"
                        name="remark"
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
                    @click="closeModal"
                />
                <LazyUButton
                    type="submit"
                    label="Okay"
                    size="sm"
                    color="amber"
                    @click="submiteToppings"
                />
      </div>
    </article>
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
    open: boolean
    sugarValue?: string
    iceValue?: string
    remarkValue?: string
}>(), {
    open: false,
    sugarValue: '',
    iceValue: '',
    remarkValue: ''
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data', payload: { sugar: string; ice: string; remark: string }): void;
}>();


const form = reactive({
    sugar: props.sugarValue || '',
    ice: props.iceValue || '',
    remark: props.remarkValue || ''
});

const sugarOptions = [
    { label: '0%', value: '0' },
    { label: '25%', value: '25' },
    { label: '50%', value: '50' },
    { label: '75%', value: '75' },
    { label: '100%', value: '100' },
    { label: '125%', value: '125' }
];

const iceOptions = sugarOptions;

const closeModal= (): void => {
    clearForm();
    emits('toggle', false);
};

const submiteToppings = (): void => {
    emits('update:data', { ...form });
    emits('toggle', false);
}

const clearForm = (): void => {
    form.sugar = '';
    form.ice = '';
    form.remark = '';
};

defineExpose({
    clearForm
})
</script>
