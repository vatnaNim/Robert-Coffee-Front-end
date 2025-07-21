<template>
    <LazyUModal 
        v-bind:model-value="open"
        :ui="{
            base: 'backdrop-blur-sm border border-white/30',
            background: 'bg-gray-300/20 dark:bg-black/30',
            rounded: 'rounded-xl',
            shadow: 'shadow-lg'
        }">
        <form 
            name="account-status"
            method="PUT"
            enctype="multipart/form-data"
            @submit.prevent="async(): Promise<void> => {
                await submitCategory()
            }"
            class="px-3 py-2 space-y-3">
            <div 
                class="border-b border-orange-500 dark:border-orange-500 py-1.5 flex items-center justify-between">
                <h1
                    class="flex gap-x-1.5">
                    <AddCategory 
                        class="w-6 h-6 text-orange-500 dark:text-orange-500"
                    />
                    <span
                        class="text-gray-600 dark:text-gray-300 font-semibold">
                        {{ props.title }} Category
                    </span>
                </h1>
                <LazyUButton
                    color="red"
                    size="md"
                    variant="link"
                    square
                    @click="emits('toggle','',false)">
                    <template #trailing> 
                        <CloseLine class="w-5 h-5" />
                    </template>
                </LazyUButton>
            </div>
            <div 
                class="px-2 py-3 space-y-3">
                <div 
                    class="w-full flex gap-x-1">
                    <UFormGroup
                        name="category_id"
                        label="category_id"
                        size="xs"
                        :ui="{
                            label: {
                                base: 'text-orange-500 dark:text-orange-500 uppercase'
                            }
                        }"
                        required>
                        <LazyUInput
                            name="category_id"
                            variant="outline"
                            color="amber"
                            size="sm"
                            placeholder="Category ID"
                            v-model="_form.category_id"
                            required
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="name"
                        label="name"
                        size="xs"
                        :ui="{
                            label: {
                                base: 'text-orange-500 dark:text-orange-500 uppercase'
                            }
                        }"
                        class="flex-1"
                        required>
                        <LazyUInput
                            name="name"
                            variant="outline"
                            color="amber"
                            size="sm"
                            placeholder="Enter Name"
                            v-model="_form.name"
                            required
                        />
                    </UFormGroup>
                </div>
                <UFormGroup
                    name="menu_list"
                    label="menu_list"
                    size="xs"
                    :ui="{
                        label: {
                            base: 'text-orange-500 dark:text-orange-500 uppercase'
                        }
                    }"
                    class="flex-1"
                    required>
                    <USelectMenu
                        name="menu_list"
                        size="sm"
                        :options="menuListOptions"
                        v-model="_form.menu_list"
                        :loading="isLoading"
                        option-attribute="label"
                        value-attribute="value"
                        :placeholder="menuListOptions.length === 0 ? 'Please Select MenuList Items ' : 'No menu items'"
                        searchable-placeholder="Search a Menulist"
                        searchable
                        multiple
                    />
                </UFormGroup>
            </div>
                
            <div 
                class="flex justify-end gap-x-1 mt-3">
                <LazyUButton
                    type="reset"
                    label="Cancel"
                    variant="soft"
                    size="sm"
                    color="red"
                    @click="emits('toggle', '', false)"
                />
                <LazyUButton
                    type="submit"
                    :label="`${title} Category`"
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
import { 
    useAPI
} from '@/composables/useApi';
import type { 
    Items, 
    ResponseStatus 
} from '@/models/type';
import { 
    AddCategory 
} from '@/components/icons';
import { 
    useIdGenerator 
} from '@/composables/useIdGenerator';

interface iCategory {
    name: string;
    category_id: string;
    menu_list: string[]
}

const props = withDefaults(defineProps<{
    open?: boolean;
    title?: string;
    categoryId?: number | null;
}>(), {
    open: false,
    categoryId: null,
    title: 'Create Category'
});

const emits = defineEmits<{
    (event: 'toggle',title: string, state: boolean): void;
    (event: 'update:data'): void;
}>();

const _form = ref<iCategory>({
    name: '',
    category_id: '',
    menu_list: []
});
const menuListOptions: Ref<Items[]> = ref<Items[]>([]);
const {
    postApi,
    isLoading, 
    fetchApi
} = useAPI();
const { 
    generateId, 
    initializeFromExistingId 
} = useIdGenerator(1, 'C', 3);

const initializeId = async (): Promise<void> => {
    let url: string = 'categoryMenu/last-id';
    const result = (await fetchApi('GET', url)) as any;

    if (!result.error && result.data?.category_id) 
    {
        initializeFromExistingId(result.data.category_id); 
        _form.value.category_id = generateId();
    } else {
        _form.value.category_id = generateId();
    }
};

const fetchMenuListOption = async (): Promise<void> => {
    let url: string = `menuList/select-input`;
    const result = await postApi('Get', url) as any;
    if (!result.error && Array.isArray(result.options)) 
    {
        menuListOptions.value = result.options as Items[];
    }
}

const submitCategory = async (): Promise<void> => {
    let url: string = props.categoryId ? `categoryMenu/${props.categoryId}` : 'categoryMenu';
    const method: string = props.categoryId ? 'PUT' : 'POST';
    const result = await postApi(method, url, _form.value) as ResponseStatus;

    if (!result.error) 
    {
        clearForm();
        emits('toggle', 'Create Menulist', false);
        emits('update:data');
    }
};

const setData = async (): Promise<void> => {
    if(!props.categoryId) return;
    const result = (await fetchApi('GET', `categoryMenu/${props.categoryId}`)) as any;
    if(!result.error && result.data)
    {
        const data = result.data;
        _form.value = {
            name: data.name,
            category_id: data.category_id,
            menu_list:data.menuList.map((item: Items) => item.pro_code) 
        }
        initializeFromExistingId(data.category_id);
    }
}

const clearForm = async (): Promise<void> => {
    _form.value ={
        name: '',
        category_id: props.categoryId ? _form.value.category_id : generateId(),
        menu_list: []
    }
}

watch(() => props.categoryId, async(id: number | null): Promise<void> => {
    if(id)
    {
        await setData()
    } else {
        await initializeId()
    }
}, {immediate: true});

watch(() => props.open, async (value: boolean): Promise<void> => {
    if (value) 
    {
        await fetchMenuListOption();
    }
});
</script>
