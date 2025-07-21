<template>
        <LazyUModal 
            v-bind:model-value="open">
            <form 
                name="menuStatus"
                method="POST"
                enctype="multipart/form-data"
                @submit.prevent="submitStatus"
                class="px-3 py-4">
                <div    
                    class="flex justify-between items-center border-b py-1 border-orange-400 dark:border-orange-600">
                    <h2
                        class="capitalize tracking-wide text-orange-500 dark:text-orange-500">
                        Modify status
                    </h2>
                    <LazyUButton
                        variant="ghost"
                        size="sm"
                        color="red"
                        @click="emits('toggle', false)">
                        <LazyUIcon 
                            name="streamline:delete-1-solid"
                            class="w-4 h-5"
                        />
                    </LazyUButton>
                </div>
                <div 
                    class="p-2 space-y-0.5">
                    <div 
                        class="flex gap-x-3">
                        <div 
                            class="text-sm text-gray-600 dark:text-gray-300">
                            <span
                                class="font-semibold text-orange-500 dark:text-orange-500">
                                Gift ID:
                            </span>
                            <span>
                                {{ _form.gift_id || "ID Available" }}
                            </span>
                        </div>
                        <div 
                            class="text-sm text-gray-600 dark:text-gray-300">
                            <span
                                class="font-semibold text-orange-500 dark:text-orange-500">
                                Gift Name:
                            </span>
                            <span>
                                {{ _form.name || "Name Available" }}
                            </span>
                        </div>
                    </div>

                    <URadioGroup 
                        v-model="_form.status"
                        color="amber" 
                        :options="[
                            {
                                label: 'Active',
                                value: 1
                            },
                            {
                                label: 'Inactive',
                                value: 0
                            }
                        ]" 
                        :ui-radio="{
                            base:'space-y-2'
                        }">
                        <template #legend>
                            Choose <span class="text-orange-500 dark:text-orange-500 capitalize tracking-wide">{{ _form.name || 'menu' }}</span> status:
                        </template>
                    </URadioGroup>
                </div>
                <div 
                    class="flex gap-x-1 justify-end">
                    <LazyUButton
                        type="reset"
                        label="Cancel"
                        color="red"
                        size="sm"
                        variant="soft"
                        @Click="emits('toggle', false)"
                    />
                    <LazyUButton
                        type="submit"
                        label="Okay"
                        color="amber"
                        size="sm"
                        variant="solid"
                        :disabled="!changedStatus"
                    />
                    
                </div>
            </form>
    </LazyUModal>
</template>

<script setup lang="ts">
import type { ResponseStatus } from '@/models/type';


interface iMenuList{
    status: number;
    name?: string;
    gift_id?: string;
}

const initialStatus = ref<number | null>(null);
const changedStatus = computed(() => _form.value.status !== initialStatus.value);
const _form = ref<iMenuList>({
    status: 1,
    name: '',
    gift_id: ''
})

const props = withDefaults(defineProps<{ 
    open?: boolean 
    giftId: null | number
}>(), { 
    open: false,
    giftId: null
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const {
    fetchApi,
    postApi,
    isLoading
} = useAPI();

const setData = async (): Promise<void> => {
    const result = (await fetchApi('GET', `gift/${props.giftId}/status`)) as any;
    if(!result.error)
    {
        const d = result.data;
        _form.value = {
            status: d.status,
            name: d.name,
            gift_id: d.gift_id
        }
        initialStatus.value = d.status;
    }
}

const submitStatus = async (): Promise<void> => {
    if(!props.giftId || !changedStatus.value) return;
    const url: string = `gift/${props.giftId}/toggle-status`;
    const result = await postApi('PATCH', url, _form.value) as ResponseStatus;
    if(!result.error)
    {
        clearForm();
        emits('toggle', false)   
        emits('update:data');
    }
}

watch((): number | null => props.giftId, async(value: number | null): Promise<void> => {
    if(value)
    {
        await setData()
    }
}, { immediate: true });

const clearForm = async(): Promise<void> => {
    _form.value = { 
        status: _form.value.status,
    };
    initialStatus.value = _form.value.status;
};


</script>

<style scoped>

</style>