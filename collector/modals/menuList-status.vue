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
                    class="p-2">
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
                            Choose <span class="text-orange-500 dark:text-orange-500 capitalize tracking-wide">{{ _form.name_en || 'menu' }}</span> status:
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
                        variant="soft"
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
    name_en?: string
}

const initialStatus = ref<number | null>(null);
const changedStatus = computed(() => _form.value.status !== initialStatus.value);
const _form = ref<iMenuList>({
    status: 1,
    name_en: ''
})

const props = withDefaults(defineProps<{ 
    open?: boolean 
    menuId: null | number
}>(), { 
    open: false,
    menuId: null
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const {fetchApi, postApi} = useAPI();

const setData = async (): Promise<void> => {
    const result = (await fetchApi('GET', `menuList/${props.menuId}`)) as any;
    if(!result.error)
    {
        const d = result.data;
        _form.value = {
            status: d.status,
            name_en: d.name_en
        }
        initialStatus.value = d.status;
    }
}

const submitStatus = async (): Promise<void> => {
    if(!props.menuId || !changedStatus.value) return;
    const url: string = `menuList/${props.menuId}/toggle-status`;
    const result = await postApi('PATCH', url, _form.value) as ResponseStatus;
    if(!result.error)
    {
        clearForm();
        emits('toggle', false)   
        emits('update:data');
    }
}

watch((): number | null => props.menuId, async(value: number | null): Promise<void> => {
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