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
                        :options="[
                            {
                                label: 'Test1',
                                value: 'test1'
                            }
                        ]"
                        option-attribute="label"
                        value-attribute="value"
                        placeholder="Please select Category"
                        v-model="_form.category"
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
import { useAPI } from '@/composables/useApi';
import type { 
    Items, 
    ResponseStatus
} from '@/models/type';
import { Delete } from '@/utils/dialog';

interface iMenuList {
    pro_code: string,
    image: string,
    name_en: string,
    name_kh: string,
    kh_price: string | number,
    en_price: string | number,
    category: string,
    remark: string
}

const _form: Ref<iMenuList> = ref<iMenuList>({
    pro_code: '',
    image: '',
    name_en: '',
    name_kh: '',
    kh_price: 0,
    en_price: 0,
    category: '',
    remark: ''
})

const {
    fetchApi,
    postApi,
    isLoading
} = useAPI();

const props = withDefaults(defineProps<{
    listId: number | null,
    title: string,
}>(), {
    typeId: null,
    title: 'Create Menu List',
});

const emits = defineEmits<{
    (event: 'toggle', title: string ,state: boolean): void;
    (event: 'update:data'): void;
}>();

const submitMenuList = async(): Promise<void> => {
    console.log('Submitting form data:', unref(_form));  
    let result: ResponseStatus = {} as ResponseStatus;
    if (props.listId) {
        let url: string = `menuList`;
        result = await postApi('PUT', url, unref(_form)) as ResponseStatus;
    } else {
        let url: string = 'menuList';
        result = await postApi('POST', url, unref(_form)) as ResponseStatus;
        if(!result.error) {
            clearForm();
            emits('toggle', 'create menulist', false);
            emits('update:data');
        }
    }
};

const setData = async (): Promise<void> => {
    let url: string = `menuList`;
    const result: ResponseStatus = await fetchApi('GET', url) as ResponseStatus;
    if(!result.error)
    {
        _form.value = result.data as iMenuList;
    }
}

watch((): number | null => props?.listId, async (value: number | null): Promise<void> => {
    if(value)
    {
        await setData();
    }
},{
    immediate: true
})

const clearForm = (): void => {
    _form.value = {
        pro_code: '',
        image: '',
        name_en: '',
        name_kh: '',
        kh_price: '',
        en_price: '',
        category: '',
        remark: ''
    }
}

</script>
