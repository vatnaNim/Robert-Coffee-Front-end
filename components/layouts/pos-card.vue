<template>
    <div 
        v-for="(item, idx) in cartItems"
        class="relative w-56 h-[40vh] bg-gray-100 px-2 py-3 flex flex-col gap-y-3 rounded-lg shadow group">
        <div 
            class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <div 
                class="relative">
                <LazyUPopover
                    mode="hover">
                    <More 
                        class="w-6 h-6 z-10 cursor-pointer text-orange-500"/>
                    <template #panel>
                        <div 
                            class="w-52 p-4 text-sm">
                            <div 
                                class="">
                                <span>
                                    Sugar:
                                </span>
                                <span
                                    class="text-orange-500 font-semibold">
                                    25%
                                </span>
                            </div>
                            <div 
                                class="">
                                <span>
                                    Ice:
                                </span>
                                <span
                                    class="text-orange-500 font-semibold">
                                    25%
                                </span>
                            </div>
                            <div 
                                class="text-wrap">
                                <span>
                                    Remark:
                                </span>
                                <span
                                    class="text-orange-500">
                                    No data
                                </span>
                            </div>
                        </div>
                    </template>
                </LazyUPopover>
            </div>
        </div>
    
        <div 
            class="w-full h-32 overflow-hidden rounded-lg">
            <img 
                src="" 
                alt=""
                class="object-scale-down w-full h-full"    
            />
        </div>
        <div 
            class="space-y-2">
            <div 
                class="space-x-2">
                <span
                    class="text-lg font-semibold">
                    Ice Latte
                </span>
                <span
                    class="text-orange-400">
                    $ 4.00
                </span>
            </div>
            <div 
                class="flex items-center gap-x-1">
                <span
                    class="text-orange-500 text-sm ">
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
                        class="px-3 capitalize"
                        @click="handleMenuClick(size.value)"
                    />
                </div>
            </div>
            <div 
                class="w-full space-x-2 text-sm">
                <span
                    class="text-orange-500">
                    Customize: 
                </span>
                <LazyUButton
                    size="xs"
                    variant="soft"
                    color="amber"
                    label="Add Topping"
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
                        size="sm"
                        variant="solid"
                        color="amber"
                        block>
                        <template #trailing>
                            <span>
                                <ShoppingCart
                                    class="w-5 h-5"/>
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
