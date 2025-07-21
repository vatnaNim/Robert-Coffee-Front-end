<template>
    <LazyUModal 
        v-bind:model-value="open"
        fullscreen
        :ui="{
            base: 'backdrop-blur-sm border border-white/30',
            background: 'bg-gray-300/20 dark:bg-black/30',
            rounded: 'rounded-2xl',
            shadow: 'shadow-lg',
        }">
        <div 
            class="p-4 space-y-3">
            <div 
                class="flex  items-center gap-x-3 border-b border-orange-500 dark:border-orange-500 py-2">
                <LazyUButton
                    color="red"
                    size="md"
                    variant="soft"
                    square
                    icon="material-symbols:arrow-back-ios"
                    label="Back"
                    @click="emits('toggle', false)"
                />
                <div 
                    class="text-lg font-semibold text-orange-400 flex justify-center items-center capitalize gap-x-2">
                    <LazyUIcon 
                        name="tdesign:history"
                        class="w-6 h-6 text-orange-500 dark:text-orange-500"
                    />
                    <span
                        class="text-md text-gray-500 dark:text-gray-300">
                        Purchase History
                    </span>
                </div>
                
            </div>
            <div class="">
                <LazyUTable
                    :rows="dataAll"
                    :columns="selectedColumns">
                    <template 
                        #index-data="{ row, index }">
                        {{ index + 1 }}
                    </template>
                   
                </LazyUTable>
            </div>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">
import {
    CloseLine
} from '@/components/icons';
import { useAPI } from '@/composables/useApi';
import type { Items, ResponseStatus } from '@/models/type';
import { 
    SelectMenu 
} from '@/components/ui';
import Membership from '../pages/membership.vue';


const columns = [
    {
        label: 'No',
        key: 'index',
    },
    {
        key: 'reciptCode',
        label: 'Recipt_code',
    },
    {
        key: 'orderNumber',
        label: 'orderNumber',
    },
    {
        key: 'date',
        label: 'date',
    },
    {
        key: 'totalPrice',
        label: 'TotalPrice',
    },
    {
        key: 'Membership',
        label: 'membership',
    }, 
    {
        key: 'totalQty',
        label: 'Total_Qty',
    },
    {
        key: 'Subtotal',
        label: 'Subtotal',
    }
];
const selectedColumns = ref([...columns]);
interface iStatus {
    acc_status: string;
}

const props = withDefaults(defineProps<{
    open?: boolean;
}>(), {
    open: false,
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const dataAll = ref<Items[]>([{
    id: 1,
    date: '2023-10-01',
    reciptCode: 'RC-001',
    orderNuber: 'ORD-001',
    price: 5000,
    discount: 0,
    totalQty: 10000,
    Membership: '5555',
    status: 'completed',
    name: 'coffee'

}]);

const _form = ref<iStatus>({
    acc_status: ''
})

const {postApi, isLoading, fetchApi} = useAPI();


</script>
