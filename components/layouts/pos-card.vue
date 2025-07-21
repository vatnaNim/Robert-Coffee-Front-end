<template>
    <div 
        class="relative w-56 h-[40vh] bg-gray-100 dark:bg-gray-900 border  border-gray-400 dark:border-gray-200 px-2 py-3 flex flex-col gap-y-3 rounded-xl shadow group" >
        <div 
            class="w-full h-32 overflow-hidden rounded-lg">
            <img 
                :src="props.image || NoImage" 
                :alt="props.cardName || 'No Image'"
                class="object-scale-down w-full h-full"    
            />
        </div>
        <div 
            class="flex flex-col justify-between flex-1">
            <div 
                class="space-y-1 ">
                <div 
                    class="text-sm font-medium">
                    <span
                        class="text-orange-500 dark:text-orange-500 font-semibold">
                        Code:
                    </span>
                    <span
                        class="text-gray-600 dark:text-gray-300">
                        {{ props.itemCode }}
                    </span>
                </div>
                <div 
                    class="space-x-2">
                    <span 
                        class="text-sm uppercase font-bold text-orange-500 dark:text-orange-500">
                        {{ props.cardName || 'N/A' }}
                    </span>
                    <span 
                        class="text-green-500 dark:text-green-500 text-sm">
                        $ {{ price || 'N/A' }}
                    </span>
                </div>
                <div 
                    v-if="props.isGift"
                    class="text-sm font-medium">
                    <span
                        class="text-orange-500 dark:text-orange-500 font-semibold">
                        Points:
                    </span>
                    <span
                        class="text-gray-600 dark:text-gray-300">
                        {{ props.points }}
                    </span>
                </div>
                <div 
                    v-if="!props.isGift"
                    class="flex items-center gap-x-1">
                    <span 
                        class="text-orange-500 dark:text-orange-500 text-sm">
                        Size:
                    </span>
                    <div 
                        v-for="(size, idx) in menuList" 
                        :key="idx">
                        <LazyUButton
                            :label="String(size.label)"
                            size="xs"
                            color="amber"
                            :variant="menuListvariant === size.value ? 'solid' : 'outline'"
                            :trailing="false"
                            class="px-2 py-1 capitalize"
                            @click="handleMenuClick(String(size.value))"
                        />
                    </div>
                </div>
                <div 
                    v-if="!props.isGift"
                    class="w-full space-x-2 text-sm">
                    <span 
                        class="text-orange-500 dark:text-orange-500 text-sm">
                        Customize:
                    </span>
                    <LazyUButton
                        size="xs"
                        variant="soft"
                        color="amber"
                        label="Add Topping"
                        class="px-2 py-1 capitalize"
                        @click="openCustomize = true"
                    />
                </div>
            </div>
            <div 
                class="flex gap-x-1 pt-1">
                <div 
                    class="flex items-center">
                    <LazyUButton
                        size="xs"
                        square
                        color="amber"
                        :variant="qtyVal === 1 ? 'soft' : 'solid'"
                        icon="material-symbols:check-indeterminate-small-rounded"
                        @click="qtyVal > 1 && updateQty(qtyVal - 1)"
                        :disabled="qtyVal === 1"
                    />
                    <LazyUInput
                        size="xs"
                        color="amber"
                        variant="none"
                        class="w-10 font-semibold"
                        disabled
                        :model-value="qtyVal"
                        :ui="{
                           base: 'text-gray-600 dark:text-gray-300 text-center',
                        }"
                    />
                    <LazyUButton
                        size="xs"
                        square
                        color="amber"
                        icon="material-symbols:add-2-rounded"
                        @click="updateQty(qtyVal + 1)"
                    />
                </div>
                <div 
                    class="w-full">
                    <LazyUButton
                        size="xs"
                        variant="solid"
                        color="amber"
                        block
                        @click="emitCartUpdate">
                        <template #trailing>
                            <ShoppingCart class="w-4 h-4" />
                        </template>
                    </LazyUButton>
                </div>
            </div>
        </div>
    </div>
    <ClientOnly>
        <CustomizeToppings
            ref="customizeToppingsRef"
            :open="openCustomize"
            :sugar-value="sugar"
            :ice-value="ice"
            :remark-value="remark"
            @update:data="handleCustomizeData"
            @toggle="val => openCustomize = val"
        />
    </ClientOnly>
</template>

<script setup lang="ts">
import { 
    ShoppingCart 
} from '../icons';
import { 
    CustomizeToppings 
} from '@/collector/modals';
import { 
    NoImage 
} from '@/assets/images';
import type { Items } from '@/models/type';

const props = withDefaults(defineProps<{
    id?: number | undefined;
    itemCode?: string | undefined;
    cardName?: string | undefined;
    price?: string | Items;
    size?: string | undefined;
    qty?: number | undefined;
    image?:string;
    isGift?: boolean; 
    points?: number | string; 
}>(), {
    id: 0 ,
    itemCode: '',
    cardName: '',
    price: '',
    size: 'small',
    qty: 1,
    image: '',
    isGift: false,
    points: 0,
});

const emits = defineEmits<{
  (event: 'update:cart', item: any): void;
}>();

const menuListvariant: Ref<string> = ref<string>(props.size || 'small');
const qtyVal: Ref<number> = ref<number>(props.qty || 1);
const customizeToppingsRef:Ref<InstanceType<typeof CustomizeToppings> | null> = ref<InstanceType<typeof CustomizeToppings> | null>(null);
const sugar: Ref<string> = ref<string>('');
const ice: Ref<string> = ref<string>('');
const remark: Ref<string> = ref<string>('');
const openCustomize: Ref<boolean> = ref<boolean>(false);

const menuList: Items[] = [
    { 
        label: 'Small',
        value: 'small' 
    },
    { 
        label: 'Large', 
        value: 'large' 
    }
];

const handleMenuClick = (value: string): void => {
    menuListvariant.value = value;
};

const updateQty = (value: number): void => {
    qtyVal.value = value;
};

const emitCartUpdate = () => {
    const baseData = {
        id: props.id,
        itemCode: props.itemCode,
        image: props.image,
        name: props.cardName,
        price: props.price,
        qty: qtyVal.value
    };

    const cartData = props.isGift
        ? { ...baseData, points: props.points }
        : {
            ...baseData,
            size: menuListvariant.value,
            sugar: sugar.value || '50',
            ice: ice.value || '50',
            remark: remark.value || ''
        };
    
    console.log('Shopping Cart Data:', cartData); 
    emits('update:cart', cartData);
    if (!props.isGift) 
    {
        customizeToppingsRef.value?.clearForm?.();
    }
    customizeToppingsRef.value?.clearForm();
    if (customizeToppingsRef.value?.clearForm) {
        customizeToppingsRef.value.clearForm();
    }
};


const handleCustomizeData = (payload: { sugar: string; ice: string; remark: string }) => {
    if (!props.isGift) {
        sugar.value = payload.sugar;
        ice.value = payload.ice;
        remark.value = payload.remark;
        emitCartUpdate();
    }
};

</script>
