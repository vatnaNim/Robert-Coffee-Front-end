<template>
    <form
        name="Gift"
        method="post"
        enctype="multipart/form-data"
        @submit.prevent="async (): Promise<void> => {
            await submitGift();
        }"
        class="w-full bg-white dark:bg-gray-900 px-4 py-5 rounded-xl shadow-md flex flex-col gap-y-8">
        <div 
            class="flex gap-x-3 items-center">
            <BackBtn
                name="Back"
                btn-class="bg-gray-300 dark:bg-gray-700 py-2 px-8 text-white"
                icon-class="bg-white"
                icon-container="bg-red-600"
                @click="emits('toggle', '', false)"
            />
            <h1 
                class="text-orange-500 text-lg px-4 font-semibold">
                {{ title }}  Gifts
            </h1>
        </div>
        <article
            class="w-full flex flex-col gap-y-3">
            <div 
                class="flex justify-center">
                <UFormGroup
                    name="profile"
                    label="Profile"
                    :ui="{
                        label:{
                            base: 'text-orange-500 dark:text-orange-500'
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
            </div>
            <div 
                class="px-4 py-3 border shadow rounded-xl border-gray-300 dark:border-gray-800 flex-1 space-y-1">
                <div 
                    class="flex gap-x-1.5">
                    <UFormGroup
                        name="gift_id"
                        label="Gift-Id"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        class="">
                        <UInput
                            name="gift_id"
                            color="amber"
                            size="sm"
                            type="text"
                            v-model="_form.gift_id"
                            placeholder="Gift Id"
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
                        name="name"
                        label="Name"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        required
                        class="flex-1">
                        <UInput
                            name="name"
                            color="amber"
                            type="text"
                            size="sm"
                            v-model="_form.name"
                            placeholder="Enter Name..."
                            required
                        />
                    </UFormGroup>
                </div>
                <div 
                    class="flex gap-x-1">
                    <UFormGroup
                        name="points"
                        label="Points"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        required
                        class="flex-1">
                        <UInput
                            name="points"
                            color="amber"
                            type="number"
                            size="sm"
                            v-model="_form.points"
                            placeholder="Enter Name..."
                            required
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="price"
                        label="Price"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        required
                        class="flex-1">
                        <LazyUInput
                            name="price"
                            color="amber"
                            type="number"
                            size="sm"
                            v-model="_form.price"
                            placeholder="Enter Price..."
                            required>
                            <template #trailing>
                                <span class="text-gray-500 dark:text-gray-400 text-md">$</span>
                            </template>
                        </LazyUInput>
                    </UFormGroup>
                    <UFormGroup
                        name="SKU"
                        label="sku"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        required
                        class="flex-1">
                        <LazyUInput
                            name="sku"
                            color="amber"
                            type="number"
                            size="sm"
                            v-model="_form.sku"
                            placeholder="Enter SKU..."
                            required
                        >
                        <template #trailing>
                            <span class="text-gray-500 dark:text-gray-400 text-sm">UNITS</span>
                        </template>
                    </LazyUInput>
                    </UFormGroup>
                </div>
                <div 
                    class="flex gap-x-1">
                    <UFormGroup
                        v-if="!props.giftId"
                        name="status"
                        label="Status"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        required
                        class="flex-1">
                        <SelectMenu
                            name="status"
                            size="sm"
                            :options="[
                                {
                                    label: 'Active',
                                    value: true
                                },
                                {
                                    label: 'Inactive',
                                    value: false
                                }
                            ]"
                             display-attribute="label"  
                            option-attribute="label"
                            value-attribute="value"
                            placeholder="Select Status"
                            v-model="_form.status"
                            required
                        />
                    </UFormGroup>
                    <UFormGroup
                        name="expires_at"
                        label="Expires Date"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        required
                        class="flex-1">
                        <InputDate
                            name="birthdate"
                            size="sm"
                            v-model="_form.expires_at"
                        />
                    </UFormGroup>
                </div>
                <div>
                    <UFormGroup
                        name="remark"
                        label="Remark"
                        :ui="{
                            label:{
                                base: 'text-orange-500 dark:text-orange-500'
                            }
                        }"
                        class="flex-1">
                        <LazyUTextarea
                            name="remark"
                            color="amber"
                            v-model="_form.remark"
                            :rows="4"
                            placeholder="Enter Remark..."
                        />
                    </UFormGroup>
                </div>
            </div>
        </article>
        <div 
            class="flex justify-end gap-x-1.5">
            <UButton
                type="reset"
                label="Cancel"
                variant="soft"
                class="px-3"
                color="red"
                @click="(): void => {
                    emits('toggle', '', false);
                }"
            />
            <UButton
                type="submit"
                size="sm"
                :label="props.title+' Gift'"
                color="orange"
                :loading="isLoading"
                :disabled="isLoading"
                :ui="{
                    icon: {
                        loading: 'eos-icons:loading'
                    },
                    padding:{
                        sm: 'px-8'
                    }
                }"
            />        
        </div>
    </form>
</template>

<script setup lang="ts">
import { 
    BackBtn,
    InputDate
} from '@/components/ui';
import {
    ChooseImage,
    SelectMenu
} from '@/components/ui/';
import type { 
    ResponseStatus 
} from '@/models/type';

interface iGifts {
    gift_id: string;
    name: string;
    points: number;
    sku: number;
    price: number;
    expires_at: Date | null;
    status: boolean;
    remark: string;
    image: string;
};

const _form = ref<iGifts>({
    gift_id: '',
    name: '',
    points: 0,
    sku: 0,
    price: 0,
    expires_at: new Date(),
    status: true,
    remark: '',
    image:  ''
})

const props = withDefaults(defineProps<{
    giftId: number | null,
    title: string,
}>(), {
    giftId: null,
    title: 'Create Membership',
});

const emits = defineEmits<{
    (event: 'toggle', title: string ,state: boolean): void;
    (event: 'update:data'): void;
}>();

const {postApi, fetchApi, isLoading} = useAPI();
const { generateId, initializeFromExistingId } = useIdGenerator(1, 'G', 3);


const initializeId = async (): Promise<void> => {
    let url: string = 'menuList/last-id';
    const result = (await fetchApi('GET', url)) as any;

    if (!result.error && result.data?.pro_code) 
    {
        initializeFromExistingId(result.data.pro_code); 
        _form.value.gift_id = generateId();
    } else {
        _form.value.gift_id = generateId();
    }
};


const submitGift = async (): Promise<void> => {
    let url: string = props.giftId ? `gift/${props.giftId}` : 'gift';
    const method: string = props.giftId ? 'PUT' : 'POST';
    const result = await postApi(method, url, _form.value) as ResponseStatus;

    if (!result.error) 
    {
        clearForm();
        emits('toggle', 'create', false);
        emits('update:data');
    }
};

const setData = async (): Promise<void> => {

    if (!props.giftId) return;
    const result = (await fetchApi('GET', `gift/${props.giftId}`)) as any;

    if (!result.error && result.data) 
    {
        const d = result.data;
        _form.value = {
            gift_id: d.gift_id,
            name: d.name,
            points: d.points,
            sku: d.sku,
            price: d.price,
            expires_at: d.expires_at ? new Date(d.expires_at) : null, 
            status: d.status,
            remark: d.remark,
            image:  d.image
        };
        initializeFromExistingId(d.gift_id);
    }
};

watch(() => props.giftId, async(id: number | null): Promise<void> => {
    if (id) {
        await setData()
    } else {
        await initializeId()
    }
}, { immediate: true });

const clearForm = async (): Promise<void> => {
    _form.value = {
        gift_id: '',
        name: '',
        points: 0,
        sku: 0,
        price: 0,
        expires_at: new Date(),
        status: true,
        remark: '',
        image:  ''
    };
};
</script>

<style scoped>

</style>