<template>
    <form
        class=" bg-white px-5 py-8 rounded-lg shadow-md flex flex-col gap-y-8">
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
            class="space-y-3">
            <div 
                class="flex flex-wrap gap-2">
                <LazyUFormGroup
                    label="Order Date"
                    name=""
                    class="w-[calc(96%/4)] flex-grow"
                    :ui="{
                        label: {
                            base:'text-orange-500 font-semibold'
                        }
                    }">
                    <InputDate
                        size="sm"
                        color="white"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Order Date"
                    name=""
                    class="w-[calc(96%/4)] flex-grow"
                    :ui="{
                        label: {
                            base:'text-orange-500 font-semibold'
                        }
                    }">
                    <LazyUInput
                        name=""
                        type="text"
                        variant="outline"
                        size="sm"
                        placeholder="Please enter name as en"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Invoice Code"
                    name=""
                    class="w-[calc(96%/4)] flex-grow"
                    :ui="{
                        label: {
                            base:'text-orange-500 font-semibold'
                        }
                    }">
                    <LazyUInput
                        name=""
                        type="number"
                        variant="outline"
                        size="sm"
                        placeholder="No invoice code"
                        disabled
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Customer Name"
                    name=""
                    class="w-[calc(96%/4)] flex-grow"
                    :ui="{
                        label: {
                            base:'text-orange-500 font-semibold'
                        }
                    }">
                    <LazyUInput
                        name=""
                        type="text"
                        variant="outline"
                        size="sm"
                        placeholder="Please enter name as en"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Payment Method"
                    name=""
                    class="w-[calc(96%/4)] flex-grow"
                    :ui="{
                        label: {
                            base:'text-orange-500 font-semibold'
                        }
                    }">
                    <SelectMenu
                        option-attribute="label"
                        value-attribute="value"
                        name=""
                        size="sm"
                        placeholder="Please select payment method"
                        :options="[
                            {
                                label: 'case',
                                value: 'case'
                            }
                        ]"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Amount Paid"
                    name=""
                    class="w-[calc(96%/4)] flex-grow"
                    :ui="{
                        label: {
                            base:'text-orange-500 font-semibold'
                        }
                    }">
                    <LazyUInput
                        name=""
                        type="number"
                        placeholder="Please enter amount paid"
                        size="sm"
                        variant="outline"
                    />
                </LazyUFormGroup>
                <LazyUFormGroup
                    label="Change Due"
                    name=""
                    class="w-[calc(96%/4)] flex-grow"
                    :ui="{
                        label: {
                            base:'text-orange-500 font-semibold'
                        }
                    }">
                    <LazyUInput
                        name=""
                        type="number"
                        size="sm"
                        disabled
                        placeholder="Please enter amount paid"
                    />
                </LazyUFormGroup>
            </div>
            <LazyUFormGroup
                label="Remarks"
                name=""
                class="w-[calc(96%/4)] flex-grow"
                :ui="{
                    label: {
                        base:'text-orange-500 font-semibold'
                    }
                }">
                <LazyUTextarea
                    name=""
                    :rows="3"
                    size="md"
                    placeholder="Please enter remark"
                />
            </LazyUFormGroup>
        </div>
        <div 
            class="space-y-3">
            <div 
                class="flex gap-x-2">
                <LazyUButton
                    label="Add order items"
                    size="sm"
                    color="amber"
                    variant="solid"
                    icon="ic:baseline-plus"
                    @click="(): void => {
                        addOrders();
                    }"
                />
                <LazyUButton
                    label="Delete All"
                    size="sm"
                    color="red"
                    variant="solid"
                    icon="ic:round-delete-outline"
                />
            </div>
            <TransitionGroup 
                tag="div"
                name="drop"
                class="w-full">
                <div 
                    v-for="(item, idx) in ordersData"
                    :key="idx"
                    class="w-full px-3 py-4 shadow-md space-y-3">
                    <div 
                        class="bg-gray-100 border px-4 py-5 rounded-lg shadow-sm space-y-3">
                        <div 
                            class="flex justify-end items-center">
                            <LazyUTooltip
                                text="Delete"
                                :popper="{ 
                                    arrow: true,
                                    placement: 'top'
                                }"
                                :ui="{
                                    color:'text-red-500',
                                    base: 'font-semibold',
                                    ring: 'ring-red-400'
                                }">
                                <LazyUButton
                                    variant="soft"
                                    color="red"
                                    icon="streamline:delete-1-solid"
                                    size="xs"
                                    @click="(): void => {
                                        deleteOrder(idx)
                                    }"
                                />
                            </LazyUTooltip>
                        </div>
                        <div 
                            class="w-full flex gap-4">
                            <UFormGroup
                                name=""
                                label="Image"
                                :ui="{
                                    label: {
                                        base:'text-orange-500 font-semibold'
                                    }
                                }">
                                <div
                                    class="flex flex-col items-center justify-center w-48 h-[180px] border-2 border-dashed border-black rounded-lg cursor-pointer relative overflow-hidden bg-white"
                                    style="border: 2px dashed orange;">
                                    <ChooseImage name="image" />
                                </div>
                            </UFormGroup>
                            <div 
                                class="flex flex-wrap gap-2">
                                <LazyUFormGroup 
                                    name=""
                                    label="Name"
                                    class="w-[calc(96%/4)] flex-grow"
                                    :ui="{
                                        label: {
                                            base:'text-orange-500 font-semibold'
                                        }
                                    }">
                                    <SelectMenu
                                        name=""
                                        size="sm"
                                        color="white"
                                        option-attribute="label"
                                        value-attribute="value"
                                        placeholder="Please Select items name for order"
                                        :options="[
                                            {
                                                label: '25%',
                                                value: '25%'
                                            }
                                        ]"
                                    />
                                </LazyUFormGroup>
                                <LazyUFormGroup 
                                    name=""
                                    label="Unit Price"
                                    class="w-[calc(96%/4)] flex-grow"
                                    :ui="{
                                        label: {
                                            base:'text-orange-500 font-semibold'
                                        }
                                    }">
                                <LazyUInput
                                        name=""
                                        size="sm"
                                        variant="outline"
                                        color="white"
                                        placeholder="Please Select product Menu frist"
                                        disabled
                                />
                                </LazyUFormGroup>
                                <LazyUFormGroup
                                    name=""
                                    label="Qty"
                                    class=" "
                                    :ui="{
                                        label: {
                                            base:'text-orange-500 font-semibold'
                                        }
                                    }">
                                    <div 
                                        class=" flex gap-x-1">
                                        <LazyUButton
                                            size="sm"
                                            square
                                            :variant="qty === 1? 'soft': 'solid'"
                                            icon="material-symbols:check-indeterminate-small-rounded"
                                            @click="qty > 1 && qty--"
                                            :disabled="qty === 1"
                                        />
                                        <LazyUInput
                                            name=""
                                            size="sm"
                                            color="white"
                                            variant="outline"
                                            class="w-12 font-semibold"
                                            disabled
                                            v-model="qty"
                                        />
                                        <LazyUButton
                                            size="sm"
                                            square
                                            icon="material-symbols:add-2-rounded"
                                            @click="qty++"
                                        />
                                    </div>
                                </LazyUFormGroup>
                                <LazyUFormGroup
                                    name=""
                                    label="Totel Price"
                                    class="w-[calc(96%/4)] flex-grow"
                                    :ui="{
                                        label: {
                                            base:'text-orange-500 font-semibold'
                                        }
                                    }">
                                    <div 
                                        class="flex gap-x-2">
                                        <LazyUInput 
                                            name=""
                                            variant="outline"
                                            color="white"
                                            size="sm"
                                            placeholder="Search...">
                                            <template #trailing>
                                                <span class="text-green-500 font-semibold text-sm">$</span>
                                            </template>
                                        </LazyUInput>
                                        <LazyUInput 
                                            name=""
                                            variant="outline"
                                            color="white"
                                            size="sm"
                                            placeholder="Search...">
                                            <template #trailing>
                                                <Rial
                                                    class="w-3 h-3 text-red-500"/>
                                            </template>
                                        </LazyUInput>
                                    </div>
                                </LazyUFormGroup>
                                <LazyUFormGroup 
                                    name=""
                                    label="Totel Price"
                                    class="w-[calc(96%/4)] flex-grow"
                                    :ui="{
                                        label: {
                                            base:'text-orange-500 font-semibold'
                                        }
                                    }">
                                    <SelectMenu
                                        name=""
                                        size="sm"
                                        color="white"
                                        option-attribute="label"
                                        value-attribute="value"
                                        placeholder="Please Select sugar"
                                        :options="[
                                            {
                                                label: '25%',
                                                value: '25%'
                                            }
                                        ]"
                                    />
                                </LazyUFormGroup>
                                <LazyUFormGroup 
                                    name=""
                                    label="Ice"
                                    class="w-[calc(96%/4)] flex-grow"
                                    :ui="{
                                        label: {
                                            base:'text-orange-500 font-semibold'
                                        }
                                    }">
                                    <SelectMenu
                                        name=""
                                        size="sm"
                                        color="white"
                                        option-attribute="label"
                                        value-attribute="value"
                                        placeholder="Please Select Ice"
                                        :options="[
                                            {
                                                label: '25%',
                                                value: '25%'
                                            }
                                        ]"
                                    />
                                </LazyUFormGroup>
                                <LazyUFormGroup
                                    label="Remark"
                                    name=""
                                    :ui="{
                                        label: {
                                            base:'text-orange-500 font-semibold'
                                        }
                                    }"
                                    class="w-full">
                                    <LazyUTextarea
                                        name=""
                                        :rows="3"
                                        placeholder="Please Enter remark"
                                        color="white"
                                    />
                                </LazyUFormGroup>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </TransitionGroup>
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
    SelectMenu,
    InputDate
} from '@/components/ui';
import { Rial } from '@/components/icons';
import type { Items } from '@/models/type';
import { Delete } from '@/utils/dialog';

const props = withDefaults(defineProps<{
    purchaseId: number | null,
    title: string,
}>(), {
    typeId: null,
    title: 'Create Gift List',
});

const emits = defineEmits<{
    (event: 'toggle', title: string ,state: boolean): void;
    (event: 'update:data'): void;
}>();

const qty: Ref<number> = ref<number>(1);
const ordersData: Ref<Items[]> = ref<Items[]>([]);

const addOrders = (): void => {
    ordersData.value.push({
        image: '',
        menu_name: '',
        unit_price: '',
        qty: 0,
        tol_dol:0,
        tol_kh:0,
        sugar:'',
        ice:'',
        remark: ''
    })
};

const deleteOrder = (index: number): void => {
    Delete(
        "Are you sure?",            
        "This action cannot be undone.",  
        "Action Confirmed",        
        "Action Canceled",         
        "Your item has been deleted successfully.", 
        "The deletion was canceled.", 
        ():void => {
           ordersData.value.splice(index, 1)
        }
    );
};

</script>

<style scoped>

</style>