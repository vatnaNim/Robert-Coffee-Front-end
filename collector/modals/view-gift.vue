<template>
    <LazyUModal  
        v-bind:model-value="open" 
        @close="emits('toggle', false)"
        :ui="{
            base: 'backdrop-blur-sm border border-white/30',
            background: 'bg-gray-300/20 dark:bg-black/30',
            rounded: 'rounded-2xl',
            shadow: 'shadow-lg'
        }">
        <div 
            class="px-5 py-4 space-y-4">
            <div 
                class="flex justify-between items-center border-b border-orange-400 pb-2">
                <h2 
                    class="text-orange-500 font-semibold text-lg">
                    Gift Details
                </h2>
                <div 
                    class="flex items-center gap-x-2">
                    <LazyUButton 
                        variant="ghost" 
                        size="sm" 
                        color="amber" 
                        target="_blank"
                        @click="printGift">
                        <Prints 
                            class="w-6 h-6"/>
                    </LazyUButton>
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
            </div>
            <div 
                v-if="giftData" 
                id="gift-print-area"
                class="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div 
                    class="flex flex-col">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Name:</span>
                    <span class="font-semibold text-black dark:text-white">{{ giftData.name }}</span>
                </div>
                <div 
                    class="flex flex-col">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Gift ID:</span>
                    <span class="font-semibold">{{ giftData.gift_id }}</span>
                </div>
                <div 
                    class="flex flex-col">
                    <span class="text-sm text-gray-500">SKU:</span>
                    <span class="font-semibold">{{ giftData.sku }}</span>
                </div>
                <div 
                    class="flex flex-col">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Price:</span>
                    <span class="text-green-600 font-semibold">$ {{ giftData.price }}</span>
                </div>
                <div 
                    class="flex flex-col">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Points:</span>
                    <span class="font-semibold">{{ giftData.points }}</span>
                </div>
                <div 
                    class="flex flex-col">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Status:</span>
                    <div>
                        <UBadge
                            :label="giftData.status ? 'ACTIVE' : 'INACTIVE'"
                            :color="giftData.status ? 'green' : 'red'"
                            size="sm"
                            variant="subtle"
                        />
                    </div>
                </div>
                <div 
                    class="flex flex-col">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Expires At:</span>
                    <span class="font-semibold">{{ giftData.expires_at || 'N/A' }}</span>
                </div>
                <div 
                    class="flex flex-col col-span-1 sm:col-span-2">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Remark:</span>
                    <span class="font-semibold">{{ giftData.remark || '---' }}</span>
                </div>
                <div class="flex justify-center col-span-1 sm:col-span-2">
                <img 
                    v-if="giftData.image" 
                    :src="giftData.image" 
                    alt="Gift Image" 
                    class="rounded-xl w-60 h-60 object-cover shadow" 
                />
                </div>
            </div>
            <div 
                v-else 
                class="text-center text-gray-600 dark:text-gray-300">
               <ModalLoading :open/>
            </div>
            <div 
                class="flex justify-end pt-2">
                <LazyUButton 
                    label="Close" 
                    color="amber" 
                    variant="soft" 
                    size="sm" 
                    @click="emits('toggle', false)" 
                />
            </div>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">
import type { 
    ResponseStatus 
} from '@/models/type';
import { 
    useAPI 
} from '@/composables/useApi';
import { 
    usePrinting
} from '@/composables/usePrinting';
import {
    Prints
} from '@/components/icons'
import { ModalLoading } from '@/components/loading';

const props = defineProps<{
    open: boolean;
    giftId: number | null;
}>();

const emits = defineEmits<{
    (event: 'toggle', value: boolean): void;
}>();

const { fetchApi } = useAPI();
const giftData: Ref<any | null> = ref<any | null>(null);

const printGift = ():void => {
    usePrinting('gift-print-area');
};

const fetchGiftDetails = async (): Promise<void> => {
    if (!props.giftId) return;
    const result = await fetchApi('GET', `gift/${props.giftId}`) as ResponseStatus;
    if (!result.error) {
        giftData.value = result.data;
    }
};

watch(() => props.giftId, async (id) => {
    if (id) await fetchGiftDetails();
}, { immediate: true });
</script>
