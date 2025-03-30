<template>
    <form
        class="w-full bg-white px-5 py-8 rounded-lg shadow-md flex flex-col gap-y-8"
        @submit.prevent="">
        <div 
            class="flex items-center">
            <BackBtn
                name="Back"
                btn-class="bg-[#C4B6B6] py-2 px-8 text-white"
                icon-class="bg-white"
                icon-container="bg-red-500"
                @click="emits('toggle', '', false)"
            />
            <h1 
                class="text-orange-500 text-lg px-4 font-semibold">
                {{ title }} Menu-list
            </h1>
        </div>
        <UTabs :items="items" class="w-full">
            <template #list="{ item }">
                <div 
                    class="w-full flex flex-col space-y-3 border px-4 py-5 rounded-lg shadow-md">
                    <div 
                        class="w-full flex space-x-3">
                        <UFormGroup
                            name=""
                            label="Image"
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
                            <UFormGroup
                                name=""
                                label="#Code"
                                :ui="{
                                    label:{
                                        base: 'text-orange-500'
                                    }
                                }">
                                <UInput
                                    name="code"
                                    color="amber"
                                    size="sm"
                                    placeholder="Please enter list code "
                                />
                            </UFormGroup>
                            <UFormGroup
                                name=""
                                label="Name (Eng)"
                                :ui="{
                                    label:{
                                        base: 'text-orange-500'
                                    }
                                }">
                                <UInput
                                    name=""
                                    color="white"
                                    size="sm"
                                    placeholder="Please enter name as English"
                                />
                            </UFormGroup>
                            <UFormGroup
                                name=""
                                label="Name (KH)"
                                :ui="{
                                    label:{
                                        base: 'text-orange-500'
                                    }
                                }">
                                <UInput
                                    name=""
                                    color="white"
                                    size="sm"
                                    placeholder="Please enter name as Khmer"
                                />
                            </UFormGroup>
                        </div>
                    </div>
                    <div 
                        class="w-full border rounded-xl shadow p-4 flex flex-row flex-wrap justify-evenly items-stretch gap-x-2 gap-y-2">
                        <UFormGroup
                            name=""
                            label="Menu-type"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <SelectMenu
                                name=""
                                size="sm"
                                option-attribute="label"
                                value-attribute="value"
                                placeholder="Please select Menu-type"
                                :options="[
                                    {
                                        label: 'Test1',
                                        value: 'test1'
                                    }
                                ]"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Category"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            class="flex-1">
                            <SelectMenu
                                name=""
                                size="sm"
                                option-attribute="label"
                                value-attribute="value"
                                placeholder="Please select Category"
                                :options="[
                                    {
                                        label: 'Test1',
                                        value: 'test1'
                                    }
                                ]"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Price ($)"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }">
                            <UInput
                                type="number"
                                name=""
                                variant="outline"
                                color="white"
                                size="sm"
                                placeholder="Please enter price as dollar"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Price (៛)"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }">
                            <UInput
                                type="number"
                                name=""
                                variant="outline"
                                color="white"
                                size="sm"
                                placeholder="Please enter price as Rial"
                            />
                        </UFormGroup>
                        <UFormGroup
                            name=""
                            label="Discount"
                            :ui="{
                                label:{
                                    base: 'text-orange-500'
                                }
                            }"
                            
                            class="flex-1">
                            <SelectMenu
                                name=""
                                size="sm"
                                option-attribute="label"
                                value-attribute="value"
                                placeholder="Please select discount"
                                :options="[
                                    {
                                        label: 'Test1',
                                        value: 'test1'
                                    }
                                ]"
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
                        }">
                        <UTextarea
                            name=""
                            size="sm"
                            variant="outline"
                            color="white"
                            placeholder="Please enter remarks"
                            :rows="3"
                        />
                    </UFormGroup>
                </div>
            </template>
            <template #ingredient="{ item }">
                <div 
                    class="space-y-4">
                    <div 
                        class="flex justify-between gap-2">
                        <div 
                            class="text-orange-500 font-bold text-md">
                                Total Items: {{ ingredientData.length }}
                        </div>
                        <UButton
                            color="amber"
                            size="sm"
                            variant="solid"
                            icon="material-symbols:add-2-rounded"
                            label="Add More Ingredient"
                            @click="(): void => {
                                addIngredient();
                            }"
                        />
                    </div>
                    <TransitionGroup 
                        tag="div"
                        name="drop"
                        class="space-y-3 w-full">
                        <div
                            class="w-full flex space-x-3 border px-4 py-5 rounded-lg shadow-md relative"
                            v-for="(item, index) in ingredientData"
                            :key="index">
                            <UTooltip
                                text="delete"
                                class="absolute top-0 right-0">
                                <UButton
                                    variant="soft"
                                    color="red"
                                    icon="hugeicons:remove-circle"
                                    size="md"
                                    @click="(): void => {
                                        deleteIngredient(index);
                                    }"
                                />
                            </UTooltip>
                            <UFormGroup
                                name="in_image"
                                label="Image"
                                :ui="{
                                    label: {
                                        base: 'text-orange-500'
                                    }
                                }">
                                <div
                                    class="flex flex-col items-center justify-center w-48 h-[180px] border-2 border-dashed !border-red-500 rounded-lg cursor-pointer relative overflow-hidden">
                                    <ChooseImage name="in_image" />
                                </div>
                            </UFormGroup>
                            <div 
                                class="flex gap-2 flex-wrap items-stretch justify-evenly">
                                <UFormGroup
                                    name="name_en"
                                    label="Name (ENG)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }">
                                        <UInput
                                            name="name_en"
                                            size="sm"
                                            color="white"
                                            variant="outline"
                                            placeholder="Please Enter Name as English"
                                        />
                                </UFormGroup>
                                <UFormGroup
                                    name="name_kh"
                                    label="Name (KH)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }">
                                        <UInput
                                            name="name_kh"
                                            color="white"
                                            size="sm"
                                            variant="outline"
                                            placeholder="Please Enter Name as Khmer"
                                        />
                                </UFormGroup>
                                <UFormGroup
                                    name="price_dol"
                                    label="Income price ($)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }">
                                        <UInput
                                            name="price_dol"
                                            color="white"
                                            size="sm"
                                            model-value="0"
                                            type="number"
                                            variant="outline"
                                            placeholder="Please Enter income price as Dollar">
                                            <template #trailing>
                                                <span class="text-green-500 text-md">$</span>
                                            </template>
                                        </UInput>
                                </UFormGroup>
                                <UFormGroup
                                    name="price_khr"
                                    label="Income price (៛)"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500'
                                        }
                                    }">
                                        <UInput
                                            name="price_khr"
                                            color="white"
                                            model-value="0"
                                            size="sm"
                                            type="number"
                                            variant="outline"
                                            placeholder="Please Enter income price as rial">
                                            <template #trailing>
                                                <span class="text-red-500 text-lg">៛</span>
                                            </template>
                                        </UInput>
                                </UFormGroup>
                                <UFormGroup
                                    name="stock_status"
                                    label="Stock Status"
                                    :ui="{
                                        label:{
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="flex-1">
                                    <SelectMenu
                                        name="stock_status"
                                        size="sm"
                                        option-attribute="label"
                                        value-attribute="value"
                                        placeholder="Please select discount"
                                        :options="[
                                            {
                                                label: 'Out of Stock',
                                                value: 'out of stock'
                                            },
                                            {
                                                label: 'In Stock',
                                                value: 'in stock'
                                            }
                                        ]"
                                    />
                                </UFormGroup>
                                <UFormGroup
                                    name="remark"
                                    label="remark"
                                    :ui="{
                                        label:{
                                            base: 'text-orange-500'
                                        }
                                    }"
                                    class="w-full">
                                    <UTextarea
                                        name="remark"
                                        variant="outline"
                                        color="white"
                                        :rows="3"
                                        placeholder="Please enter remarks"
                                    />
                                </UFormGroup>
                            </div>
                        </div>

                    </TransitionGroup>
                </div>
            </template>
        </UTabs>

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
import type { 
    Items 
} from '@/models/type';
import { Delete } from '@/utils/dialog';

const ingredientData: Ref<Items[]> =ref<Items[]>([
    {
        in_image: '',
        name_en: '',
        name_kh:'',
        price_dol: 0,
        price_khr:0,
        stock_status: '',
        remark: ''
    }
]);

const props = withDefaults(defineProps<{
    listId: number | null,
    title: string,
}>(), {
    typeId: null,
    title: 'Create Gift List',
});

const emits = defineEmits<{
    (event: 'toggle', title: string ,state: boolean): void;
    (event: 'update:data'): void;
}>();

const items = [
    { 
        slot: 'list', 
        label: 'List' 
    },
    { 
        slot: 'ingredient', 
        label: 'Ingredient' 
    }
];

const addIngredient = (): void => {
    ingredientData.value.push({
        in_image: '',
        name_en: '',
        name_kh:'',
        price_dol: 0,
        price_khr:0,
        stock_status: '',
        remark: ''
    })
};

const deleteIngredient = (index: number): void => {
    Delete(
        "Are you sure?",            
        "This action cannot be undone.",  
        "Action Confirmed",        
        "Action Canceled",         
        "Your item has been deleted successfully.", 
        "The deletion was canceled.", 
        ():void => {
           ingredientData.value.splice(index, 1)
        }
    );
};

</script>
