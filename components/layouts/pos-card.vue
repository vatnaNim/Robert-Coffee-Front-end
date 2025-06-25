<template>
    <div 
        v-for="(item, idx) in cartItems"
        :key="idx"
        class="relative w-56 h-[40vh] bg-gray-100 dark:bg-gray-900  border border-gray-400 dark:border-gray-200 px-2 py-3 flex flex-col gap-y-3 rounded-xl shadow group">
        <div 
            class="w-full h-32 overflow-hidden rounded-lg">
            <img 
                src="https://t4.ftcdn.net/jpg/01/16/61/93/360_F_116619399_YA611bKNOW35ffK0OiyuaOcjAgXgKBui.jpg" 
                alt=""
                class="object-scale-down w-full h-full"    
            />
        </div>
        <div 
            class="space-y-2">
            <div 
                class="space-x-2">
                <span
                    class="text-sm uppercase font-bold text-orange-500 dark:text-orange-500">
                    Ice Latte
                </span>
                <span
                    class="text-green-500 dark:text-green-500 text-sm">
                    $ 4.00
                </span>
            </div>
            <div 
                class="flex items-center gap-x-1">
                <span
                    class="text-orange-500 dark:text-orange-500 text-sm ">
                    Size:
                </span>
                <div 
                    v-for="(size, idx) in menuList"
                    :key="idx">
                    <LazyUButton
                        :label="size.label"
                        size="xs"
                        color="amber"
                        :variant="menuListvariant === size.value ? 'solid' : 'outline'"
                        :trailing="false"
                        class="px-2 py-1 capitalize"
                        @click="handleMenuClick(size.value)"
                    />
                </div>
            </div>
            <div 
                class="w-full space-x-2 text-sm">
                <span
                    class="text-orange-500 dark:text-orange-500 text-sm ">
                    Customize: 
                </span>
                <LazyUButton
                    size="xs"
                    variant="soft"
                    color="amber"
                    label="Add Topping"
                    class="px-2 py-1 capitalize"
                    @click="(state: boolean): void => {
                        toggleCustomize(true)
                    }"
                />
            </div>
            <div 
                class="flex gap-x-1">
                <div 
                    class=" flex items-center">
                    <LazyUButton
                        size="xs"
                        square
                        color="amber"
                        :variant="qty === 1? 'soft': 'solid'"
                        icon="material-symbols:check-indeterminate-small-rounded"
                        @click="qty > 1 && qty--"
                        :disabled="qty === 1"
                    />
                    <LazyUInput
                        name=""
                        size="xs"
                        color="amber"
                        variant="none"
                        class="w-8 font-semibold"
                        disabled
                        v-model="qty"
                    />
                    <LazyUButton
                        size="xs"
                        square
                        color="amber"
                        icon="material-symbols:add-2-rounded"
                        @click="qty++"
                    />
                </div>
                <div 
                    class="w-full">
                    <LazyUButton
                        size="xs"
                        variant="solid"
                        color="amber"
                        block>
                        <template #trailing>
                            <span>
                                <ShoppingCart
                                    class="w-4 h-4"/>
                            </span>
                        </template>
                    </LazyUButton>
                </div>
            </div>
        </div>
    </div>
    <ClientOnly>
    <CustomizeToppings
        :open="openCustomize"
        @update:data=""
        @toggle="(state: boolean): void => {
            toggleCustomize(state)
        }"
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
import More from '../icons/more.vue';
import type { Items } from '@/models/type';

const props = withDefaults(defineProps<{
    cartItems: Items[]
}>(),{
   cartItems: () => ([])
});

const emits = defineEmits(['update:cart']);

const emitUpdatedCart = (): void => {
    const updatedCart = { ...props.cartItems, qty: qty.value };
    emits('update:cart', updatedCart);
};

const menuListvariant: Ref<string> =  ref<string>('small');
const qty: Ref<number> = ref<number>(1);
const openCustomize: Ref<boolean> = ref<boolean>(false);

const menuList = [
    {
        label: 'Small',
        value: 'small'
    },
    {
        label: 'Large',
        value: 'large'
    },
];

const handleMenuClick = (value: string) => {
    menuListvariant.value = value;
    console.log('Clicked menu item:', value);
};

const toggleCustomize = (state: boolean): void => {
    openCustomize.value = state;
};
</script>
