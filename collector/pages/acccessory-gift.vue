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
                {{ title }} Accessory Gift
            </h1>
        </div>
        <div 
            class="flex flex-col gap-y-4">
            <div 
                class="w-full flex gap-x-3">
                <UFormGroup
                    name=""
                    label="Profile"
                    :ui="{
                        label: {
                            base: 'text-orange-500'
                        }
                    }">
                    <div
                        class="flex flex-col items-center justify-center w-48 h-[180px] border-2 border-dashed !border-red-500 rounded-lg cursor-pointer relative overflow-hidden">
                        <ChooseImage name="image" />
                    </div>
                </UFormGroup>
                <div 
                    class="flex-1 border rounded-xl shadow space-y-2 p-4">
                    <div 
                        class="flex gap-x-2">
                        <UFormGroup
                            name=""
                            label="#Code"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <LazyUInput
                                name="name"
                                type="number"
                                color="amber"
                                size="sm"
                                placeholder="Ematy Code"
                                class="bg-gray-200 rounded-lg text-white"
                                disabled
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Name"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <LazyUInput
                                name="name"
                                color="amber"
                                size="sm"
                                placeholder="Please enter membership name"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Gift Type"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <SelectMenu
                                option-attribute="value"
                                value-attribute="value"
                                :options="[
                                    {
                                        label: 'Gift type',
                                        value: 'Gift'
                                    },
                                ]"
                                name=""
                                size="sm"
                                placeholder="Please select Gift type"
                            />
                        </UFormGroup>
                    </div>
                    <div 
                        class="flex gap-x-2">
                        <UFormGroup
                            name=""
                            label="Points"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <LazyUInput
                                name=""
                                type="email"
                                color="white"
                                size="sm"
                                placeholder="Please enter exchange points"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Price ($)"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <UInput 
                                name=""
                                size="sm"
                                placeholder="Enter Price as dollar">
                                <template #trailing>
                                <LazyUIcon
                                    name="solar:dollar-minimalistic-line-duotone"
                                    class="text-green-500 w-6 h-6"
                                />
                                </template>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Price (៛)"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <UInput 
                                name=""
                                size="sm"
                                placeholder="Enter Price as dollar">
                                <template #trailing>
                                    <Rial
                                        class="w-5 h-4 text-red-500"    
                                    />
                                </template>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Stock (SKU)"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <LazyUInput
                                name="stock"
                                color="amber"
                                size="sm"
                                placeholder="Please enter stock SKU"
                            />
                        </UFormGroup>
                    </div>
                    <UFormGroup
                        name=""
                        label="Remark"
                        :ui="{
                            label:{
                                base: 'text-orange-500'
                            }
                        }"
                        class="flex-1">
                        <LazyUTextarea
                            name=""
                            type="number"
                            :rows="4"
                            color="white"
                            size="sm"
                            placeholder="Please enter remarks"
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
        </div>
    </form>
</template>

<script setup lang="ts">
import { 
    BackBtn 
} from '@/components/ui';
import {
    ChooseImage,
    SelectMenu
} from '@/components/ui/';
import { Rial } from '@/components/icons';


const props = withDefaults(defineProps<{
    giftId: number | null,
    title: string,
}>(), {
    typeId: null,
    title: 'Create Membership',
});

const emits = defineEmits<{
    (event: 'toggle', title: string ,state: boolean): void;
    (event: 'update:data'): void;
}>();

const name = ref('')
const maxLength = 10;

</script>

<style scoped>

</style>