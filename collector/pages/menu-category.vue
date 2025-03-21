<template>
    <form
        class="bg-white px-5 py-8 rounded-lg shadow-md flex flex-col gap-y-8">
        <div 
            class="flex gap-x-3 items-center">
            <BackBtn
                name="Back"
                btn-class="bg-[#C4B6B6] py-2 px-8 text-white"
                icon-class="bg-white"
                icon-container="bg-red-500"
            />
            <div 
                class="text-orange-500 text-lg px-4 font-semibold">
                {{ title }} Category
            </div>
        </div>
        <div 
            class="">
            
        </div>
    </form>
</template>

<script setup lang="ts">

import { 
    BackBtn 
} from '@/components/ui';


const props = withDefaults(defineProps<{
    typeId: number | null,
    title: string,
}>(), {
    typeId: null,
    title: 'Create Gift List',
});

const emits = defineEmits<{
    (event: 'toggle', title: string ,state: boolean): void;
    (event: 'update:data'): void;
}>();


</script>

<style scoped>

</style>