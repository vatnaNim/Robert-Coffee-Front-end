<template>
    <form
        class="w-full bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-8"
        name="menuList"
        method="POST"
        enctype="multipart/form-data"
        @submit.prevent="async (): Promise<void> => {
            await submitMenuList();
        }">
        <div 
            class="flex items-center">
            <BackBtn
                name="Back"
                btn-class="bg-gray-300 dark:bg-gray-700 py-2 px-8 text-white"
                icon-class="bg-white"
                icon-container="bg-red-600"
                @click="emits('toggle', '', false)"
            />
            <h1 
                class="text-orange-500 text-lg px-4 font-semibold">
                {{ title }} Menu-list
            </h1>
        </div>
        <div 
            class="w-full flex flex-col space-y-3 border  px-4 py-5 rounded-xl shadow-md">
            <div 
                class="w-full flex space-x-3">
                <UFormGroup
                    name="image"
                    label="Image"
                    :ui="{
                        label: {
                            base: 'text-orange-500'
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
                <div 
                    class="flex-1 border rounded-xl shadow space-y-2 p-4 bg-white/50 dark:bg-black/40">
                    <UFormGroup
                        name="pro_code"
                        label="#Code"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }">
                        <UInput
                            name="pro_code"
                            color="amber"
                            size="sm"
                            v-model="_form.pro_code"
                            placeholder="Please enter list code "
                            disabled
                            :loading="isLoading"
                            :ui="{
                               icon: {
                                    loading: 'eos-icons:loading'
                               }
                            }"
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="name_en"
                        label="Name (Eng)"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }">
                        <UInput
                            name="name_en"
                            color="white"
                            size="sm"
                            v-model="_form.name_en"
                            placeholder="Please enter name as English"
                            pattern="^[A-Za-z\s]+$"
                            title="Please enter letters and spaces only."
                            required
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="name_kh"
                        label="Name (KH)"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }">
                        <UInput
                            name="name_kh"
                            color="white"
                            size="sm"
                            v-model="_form.name_kh"
                            placeholder="Please enter name as Khmer"
                        />
                    </UFormGroup>
                </div>
            </div>
            <div 
                class="w-full border rounded-xl shadow p-4 flex flex-row flex-wrap justify-evenly items-stretch gap-x-2 gap-y-2">
                <UFormGroup
                    name="category"
                    label="Category"
                    :ui="{
                        label:{
                            base: 'text-orange-500 dark:text-orange-500'
                        }
                    }"
                    class="flex-1">
                    <SelectMenu
                        name="category"
                        size="sm"
                        :options="categoryOptions"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please select Category"
                        v-model="_form.category"
                        required
                    />
                </UFormGroup>
                <UFormGroup
                    name="en_price"
                    label="Price ($)"
                    :ui="{
                        label:{
                            base: 'text-orange-500 dark:text-orange-500'
                        }
                    }">
                    <UInput
                        type="number"
                        name="en_price"
                        variant="outline"
                        color="white"
                        size="sm"
                        v-model="_form.en_price"
                        placeholder="Please enter price as dollar"
                        required
                    />
                </UFormGroup>
                <UFormGroup
                    name="kh_price"
                    label="Price (៛)"
                    :ui="{
                        label:{
                            base: 'text-orange-500 dark:text-orange-500'
                        }
                    }">
                    <UInput
                        type="number"
                        name="kh_price"
                        variant="outline"
                        color="white"
                        size="sm"
                        v-model="_form.kh_price"
                        placeholder="Please enter price as Rial"
                    />
                </UFormGroup>
            </div>
            <UFormGroup
                name="remark"
                label="Remark"
                :ui="{
                    label:{
                        base: 'text-orange-500 dark:text-orange-500'
                    }
                }">
                <UTextarea
                    name="remark"
                    size="sm"
                    variant="outline"
                    color="white"
                    v-model="_form.remark"
                    placeholder="Please enter remarks"
                    :rows="3"
                />
            </UFormGroup>
        </div>
        <div 
            class="flex justify-end gap-2">
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
                label="Save"
                color="orange"
                class="px-8"
                :loading="isLoading"
                :ui="{
                    icon: {
                        loading: 'eos-icons:loading'
                    }
                }"
            />        
        </div>
    </form>
</template>

<script setup lang="ts">
import { 
    BackBtn, 
    ChooseImage, 
    SelectMenu 
} from '@/components/ui';
import { 
    useAPI 
} from '@/composables/useApi';
import type { 
    Items,
    ResponseStatus 
} from '@/models/type';
import { 
    useIdGenerator 
} from '@/composables/useIdGenerator';

interface iMenuList {
    pro_code: string;
    image: string;
    name_en: string;
    name_kh: string;
    kh_price: number | string;
    en_price: number | string;
    category: string;
    remark: string;
}

const _form = ref<iMenuList>({
    pro_code: '',
    image: '',
    name_en: '',
    name_kh: '',
    kh_price: '',
    en_price: '',
    category: '',
    remark: ''
});

const { fetchApi, postApi, isLoading } = useAPI();
const { generateId, initializeFromExistingId } = useIdGenerator(1, 'D', 3);
const categoryOptions: Ref<Items[]> = ref<Items[]>([]);

const props = withDefaults(defineProps<{ listId: number | null; title: string }>(), {
  listId: null,
  title: 'Create Menu List'
});

const emits = defineEmits<{
    (e: 'toggle', title: string, state: boolean): void;
    (e: 'update:data'): void;
}>();

const initializeId = async (): Promise<void> => {
    let url: string = 'menuList/last-id';
    const result = (await fetchApi('GET', url)) as any;

    if (!result.error && result.data?.pro_code) 
    {
        initializeFromExistingId(result.data.pro_code); 
        _form.value.pro_code = generateId();
    } else {
        _form.value.pro_code = generateId();
    }
};

const fetchCategoryOption = async (): Promise<void> => {
    let url: string = `categoryMenu/select-input`;
    const result = await fetchApi('Get', url) as any;
    if (!result.error && Array.isArray(result.options)) 
    {
        categoryOptions.value = result.options as Items[];
    }
}


const submitMenuList = async (): Promise<void> => {
    let url: string = props.listId ? `menuList/${props.listId}` : 'menuList';
    const method: string = props.listId ? 'PUT' : 'POST';
    const result = await postApi(method, url, _form.value) as ResponseStatus;

    if (!result.error) 
    {
        clearForm();
        emits('toggle', 'create menulist', false);
        emits('update:data');
    }
};

const setData = async (): Promise<void> => {

    if (!props.listId) return;
    const result = (await fetchApi('GET', `menuList/${props.listId}`)) as any;

    if (!result.error && result.data) 
    {
        const d = result.data;
        _form.value = {
            pro_code: d.pro_code,
            image: d.image,
            name_en: d.name_en,
            name_kh: d.name_kh,
            kh_price: d.price?.kh_price ? Number(d.price.kh_price) : '',
            en_price: d.price?.en_price ? Number(d.price.en_price) : '',
            category: d.category,
            remark: d.remark
        };
        initializeFromExistingId(d.pro_code);
    }
};

watch(() => props.listId, async(id: number | null): Promise<void> => {
    if (id) {
        await setData()
        await fetchCategoryOption()
    } else {
        await initializeId()
        await fetchCategoryOption();
    }
}, { immediate: true });

const clearForm = async (): Promise<void> => {
    _form.value = {
        pro_code: generateId(),
        image: '',
        name_en: '',
        name_kh: '',
        kh_price: '',
        en_price: '',
        category: '',
        remark: ''
    };
};
</script>
