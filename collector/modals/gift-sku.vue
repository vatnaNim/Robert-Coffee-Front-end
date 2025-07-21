<template>
        <LazyUModal 
            v-bind:model-value="open">
            <form 
                name="menuSku"
                method="POST"
                enctype="multipart/form-data"
                @submit.prevent="async (): Promise<void> => {
                    await submitSku();
                }"
                class="px-3 py-4">
                <div    
                    class="flex justify-between items-center border-b py-1 border-orange-400 dark:border-orange-600">
                    <h2
                        class="capitalize tracking-wide text-orange-500 dark:text-orange-500">
                        Add SKU
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
                    class="p-2 space-y-2">
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
                    <div 
                        class="flex items-end gap-x-3">
                        <UFormGroup
                            label="OLD SKU"
                            size="xs"
                            :ui="{
                                label:{
                                    base: 'text-orange-500 dark:text-orange-500 '
                                }
                            }"
                            class="w-14">
                            <LazyUInput
                                color="amber"
                                disabled
                                size="xs"
                                type=""
                                :model-value="_form.sku"
                                :ui="{
                                    base: 'text-center'
                                }"
                            />
                        </UFormGroup>
                        <span
                            class="text-xl text-orange-500">
                            +
                        </span>
                        <UFormGroup
                            name="newSku"
                            label="NEW SKU"
                            size="xs"
                            :ui="{
                                label:{
                                    base: 'text-orange-500 dark:text-orange-500 '
                                }
                            }"
                            class="w-24"
                            required>
                            <LazyUInput
                                name="newSku"
                                v-model="_form.newSku"
                                color="gray"
                                size="xs"
                                type="number"
                                :mex-length="3"
                                placeholder="Enter Sku"
                                required>
                                <template #trailing>
                                    <span class="text-xs text-gray-500 dark:text-gray-400">{{ (_form.newSku?.toString().length ?? 0) }}/<span class="text-orange-500 dark:text-orange-500">3</span></span>
                                </template>
                            </LazyUInput>
                        </UFormGroup>
                    </div>
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
                        :loading="isLoading"
                        :disabled="isLoading"
                    />
                </div>
            </form>
    </LazyUModal>
</template>

<script setup lang="ts">
import type { 
    ResponseStatus 
} from '@/models/type';
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

interface iMenuList{
    newSku?: number;
    sku?: string;
    name?: string;
    gift_id?: string;
}

const _form = ref<iMenuList>({
    newSku: 0,
    sku: '',
    name: '',
    gift_id: ''
});

const submitSku = async (): Promise<void> => {
    let url: string = `gifts/${props.giftId}/add-sku`;
    const result = await postApi('PUT', url, _form.value) as ResponseStatus;
    if (!result.error) 
    {
        clearForm();
        emits('toggle', false);
        emits('update:data');
    }
}

const setData = async (): Promise<void> => {
    const result = (await fetchApi('GET', `gift/${props.giftId}/status`)) as any;
    if(!result.error)
    {
        const d = result.data;
        _form.value = {
            sku: d.sku,
            name: d.name,
            gift_id: d.gift_id
        }
    }
}

const clearForm = async (): Promise<void> => {
    _form.value = {
        newSku: 0
    }
}

watch((): number | null => props.giftId, async(value: number | null): Promise<void> => {
    if(value)
    {
        await setData()
    }
}, { immediate: true });



</script>

<style scoped>

</style>