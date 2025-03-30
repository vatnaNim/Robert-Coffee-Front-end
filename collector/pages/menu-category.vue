<template>
    <form
        class="w-full bg-white px-5 py-8 rounded-lg shadow-md flex flex-col gap-y-8">
        <div 
            class="flex gap-x-3 items-center">
            <BackBtn
                name="Back"
                btn-class="bg-[#C4B6B6] py-2 px-8 text-white"
                icon-class="bg-white"
                icon-container="bg-red-500"
                @click="emits('toggle', '', false)"
            />
            <h1 
                class="text-orange-500 text-lg px-4 font-semibold">
                {{ title }} Category
            </h1>
        </div>
    
        <div 
            class="w-full flex flex-col justify-start items-start gap-y-8 ">
            <div 
                class="w-full flex justify-center items-center gap-x-2">
                <UFormGroup
                name=""
                label="Image"
                :ui="{
                    label: {
                        base: 'text-orange-500'
                    }
                }">
                <div
                    class="flex flex-col items-center justify-center w-[180px] h-[180px] border-2 border-dashed !border-red-500 rounded-lg cursor-pointer relative overflow-hidden">
                    <ChooseImage name="image" />
                </div>
            </UFormGroup>
            </div>
            <div 
                class="flex w-full justify-center items-center gap-x-2">
                <UFormGroup
                    name=""
                    label="Name (ENG)"
                    class="flex-1"
                    :ui="{
                        label: {
                            base: 'text-orange-500'
                        }
                    }">
                    <LazyUInput
                        name=""
                        size="sm"
                        variant="outline"
                        color="white"
                        placeholder="Please enter name in English"
                    />
                </UFormGroup>
                <UFormGroup
                    name=""
                    label="Name (KH)"
                    class="flex-1"
                    :ui="{
                        label: {
                            base: 'text-orange-500'
                        }
                    }">
                    <LazyUInput
                        name=""
                        size="sm"
                        variant="outline"
                        placeholder="Please enter name in Khmer"
                    />
                </UFormGroup>
                <UFormGroup
                    name=""
                    label="Menu Type"
                    class="flex-1"
                    :ui="{
                        label: {
                            base: 'text-orange-500'
                        }
                    }">
                   <SelectMenu
                        option-attribute="value"
                        value-attribute="value"
                        :options="[
                            {
                                label: 'Food',
                                value: 'food'
                            },
                            {
                                label: 'Drink',
                                value: 'drink'
                            },
                        ]"
                        name=""
                        size="sm"
                        placeholder="Please select menu type"
                    />
                </UFormGroup>
            </div>    
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