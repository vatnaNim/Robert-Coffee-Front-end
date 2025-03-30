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
                {{ title }} Membership
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
                            label="Gender"
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
                                        label: 'Male',
                                        value: 'male'
                                    },
                                    {
                                        label: 'Female',
                                        value: 'female'
                                    },
                                    {
                                        label: 'Other',
                                        value: 'other'
                                    }
                                ]"
                                name=""
                                size="sm"
                                placeholder="Please select Gender"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Tel"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <LazyUInput
                                name=""
                                type="number"
                                color="white"
                                size="sm"
                                placeholder="Please enter phone number"
                                v-model="name"
                                :maxlength="maxLength">
                                <template #trailing>
                                <span class="text-xs text-gray-500 dark:text-gray-400">{{ name.length }}/{{ maxLength }}</span>
                                </template>
                            </LazyUInput>
                        </UFormGroup>
                    </div>
                    <div 
                        class="flex gap-x-2">
                        <UFormGroup
                            name=""
                            label="Email"
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
                                placeholder="Please enter email"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Point"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <LazyUInput
                                name=""
                                type="number"
                                :maxlength="4"
                                color="white"
                                size="sm"
                                placeholder="Enter only admin or super admin role"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Approach by"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <LazyUInput
                                name=""
                                type="number"
                                :maxlength="4"
                                color="white"
                                size="sm"
                                placeholder="Enter only admin or super admin role"
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
                                placeholder="Enter only admin or super admin role"
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


const props = withDefaults(defineProps<{
    memberId: number | null,
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