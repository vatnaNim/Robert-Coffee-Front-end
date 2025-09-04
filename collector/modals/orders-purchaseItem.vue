<template>
    <LazyUModal 
        v-bind:model-value="open"
        fullscreen
        :ui="{
            base: 'backdrop-blur-sm border border-white/30',
            background: 'bg-gray-300/20 dark:bg-black/30',
            rounded: 'rounded-2xl',
            shadow: 'shadow-lg'
        }">
        <div 
            class="px-4 py-6 space-y-5">
            <div 
                class=" flex justify-between">
                <div 
                    class="flex items-center gap-x-3">
                    <BackBtn
                        name="Back"
                        btn-class="bg-gray-300 dark:bg-gray-700 py-2 px-8 text-white"
                        icon-class="bg-white"
                        icon-container="bg-red-600"
                        @click="emits('toggle', false)"
                    />
                    <div class="flex items-center gap-x-2 font-semibold">
                        <UIcon
                            name="material-symbols:align-items-stretch"
                            class="w-5 h-5 text-orange-500 dark:text-orange-500"
                        />
                        <span
                            class="text-md uppercase text-orange-500 dark:text-orange-500">
                            View Cart Items
                        </span>
                    </div>
                </div>
                <div 
                    class="text-gray-500 dark:text-gray-300 font-semibold">
                    <span
                        class="text-orange-500">
                        Invoice ID:
                    </span>
                    <span>
                        {{ invoidId }}
                    </span>
                </div>
            </div>
            <article
                class="border border-orange-500 dark:text-orange-500 rounded-xl px-2">
                <LazyUTable
                    :rows="purchaseItems"
                    :columns="columns"
                    :ui="{
                        divide: 'divide-orange-400 ',
                        th: { base: 'text-orange-400 text-nowrap uppercase' },
                        td: {
                            padding: 'py-1'
                        },
                        default: {
                            expandButton: {
                                variant: 'solid',
                                color: 'red'
                            }
                        }
                    }">
                    <template #index-data="{index}">
                        <span
                            class="text-orange-500 dark:text-orange-500">
                            {{ index + 1 }}
                        </span>
                    </template>
                    <template #image-data="{row}">
                        <TooltipImage
                            :scr="row.image"
                            :popper="{ placement: 'right' }"
                            smallSize="w-16 h-16"
                            container="w-[250px] h-[250px]"
                            base="shadow-sm"
                            :containerWidth="150"
                            :containerHeight="150"
                        />
                    </template>
                    <template #ice-data="{row}">
                        <span>
                            % {{ row.ice }}
                        </span>
                    </template>
                    <template #sugar-data="{row}">
                        <span>
                            % {{ row.sugar }}
                        </span>
                    </template>
                    <template #price-data="{row}">
                        <span   
                            class="text-orange-500 dark:text-orange-500">
                            $ {{ row.price }}
                        </span>
                    </template>
                </LazyUTable>
            </article>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">
import type { 
    Items,
    ResponseStatus 
} from '@/models/type';
import { 
    TooltipImage, 
    BackBtn
} from '@/components/ui';

const props = withDefaults(defineProps<{ 
    open?: boolean ;
    orderId: null | number;
    invoidId?: string;
}>(), { 
    open: false,
    orderId: null,
    invoidId: 'N/A'
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
}>();

const {fetchApi, postApi} = useAPI();
const columns = [
    {
        key: 'index',
        label: ''
    },
    {
        key: 'image',
        label: 'image'
    },
    {
        label: 'Items_Name',
        key: 'name',
    },
    {
        key: 'itemCode',
        label: 'ItemCode'
    }, 
    {
        key: 'ice',
        label: 'Ice'
    },
    {
        key: 'sugar',
        label: 'Sugar'
    },
    {
        key: 'price',
        label: 'price'
    },
    {
        key: 'size',
        label: 'Size'
    },
    {
        key: 'remark',
        label: 'Remark'
    },
];
const purchaseItems :Ref<Items[]> = ref<Items[]>([]);


const fetchCarts = async (): Promise<void> => {
    if (!props.orderId) return;
    let url: string = `purchasing/${props.orderId}/cart-items`;

    const result = (await fetchApi('GET', url)) as ResponseStatus;
    if (!result.error)
    {
        purchaseItems.value = Array.isArray(result.data)? result.data : [];
    }
};


watch(() => props.open, async (isOpen): Promise<void> => {
    if (isOpen) {
        await fetchCarts();
    } else {
        purchaseItems.value = []; 
    }
});

</script>

<style scoped>

</style>