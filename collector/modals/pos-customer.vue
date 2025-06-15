<template>
    <LazyUModal 
        v-bind:model-value="open">
        <div 
            class="p-3 space-y-3">
            <div 
                class="flex justify-between items-center">
                <h1 
                    class="text-lg font-semibold text-orange-400">Customize Items</h1>
                    <LazyUButton 
                        color="red" 
                        size="md" 
                        variant="link" 
                        square 
                        @click="emits('toggle', false)">
                        <template #trailing> 
                            <CloseLine class="w-5 h-5" />
                        </template>
                    </LazyUButton>
            </div>
            <div 
                class="bg-gray-100 py-2 px-3 rounded-md shadow-sm space-y-2">
                <LazyURadioGroup
                    name=""
                    legend="Customer type"
                    color="amber"
                    v-model="selectedCustomerType"
                    class="hidden"
                    :options="[
                        { 
                            value: 'Normal Customer', 
                            label: 'Normal Customer' 
                        }, 
                        { 
                            value: 'Membership', 
                            label: 'Membership' 
                        }
                    ]"
                />
                <LazyUTabs
                    :items="tabItem"
                    :model-value="activeTab"
                    @update:model-value="handleTabChange"
                   
                />
                <article>
                    <div 
                        v-if="activeTab === 0"
                        class="flex gap-2 px-3 py-2 bg-white rounded-md shadow">
                        <LazyUFormGroup
                            label="Name"
                            name="name"
                            :ui="{
                                label: {
                                    base: 'text-orange-500 font-semibold'
                                }
                            }">
                            <LazyUInput
                                name=""
                                size="sm"
                                color="amber"
                                placeholder="Please enter customer name"
                                
                            />
                        </LazyUFormGroup>
                        <LazyUFormGroup
                            label="Tel"
                            name="tel"
                            :ui="{
                                label: {
                                    base: 'text-orange-500 font-semibold'
                                }
                            }">
                            <LazyUInput
                                name=""
                                type="number"
                                size="sm"
                                color="amber"
                                placeholder="Please enter customer tel"
                                
                            />
                        </LazyUFormGroup>
                    </div>
                    <div
                        class="px-3 py-3 bg-white rounded-md shadow"
                        v-else>
                        <div 
                            class="w-full flex flex-col gap-y-2">
                            <LazyUFormGroup
                                name=""
                                label="Membership name"
                                :ui="{
                                    label: {
                                        base: 'text-orange-500 font-semibold'
                                    }
                                }"
                                class="w-full">
                                <SelectMenu
                                    name=""
                                    size="sm"
                                    color="white"
                                    value-attribute="value"
                                    option-attribute="label"
                                    placeholder="Please select membership name"
                                    :options="[
                                        {
                                            label: 'boopha',
                                            value: 'boopha'
                                        },
                                        {
                                            label: 'chan',
                                            value: 'chan'
                                        }
                                    ]"

                                />
                            </LazyUFormGroup>
                            <div 
                                class="flex gap-x-2">
                                <LazyUFormGroup
                                    name=""
                                    label="Type"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500 font-semibold'
                                        }
                                    }">
                                    <LazyUInput
                                        size="sm"
                                        color="white"
                                        name=""
                                        placeholder="None"
                                        model-value="bapha"
                                        disabled
                                    />
                                </LazyUFormGroup>
                                <LazyUFormGroup
                                    name=""
                                    label="Points"
                                    :ui="{
                                        label: {
                                            base: 'text-orange-500 font-semibold'
                                        }
                                    }">
                                    <LazyUInput
                                        size="sm"
                                        color="white"
                                        name=""
                                        placeholder="None"
                                        model-value="155"
                                        disabled
                                    />
                                </LazyUFormGroup>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
            <div 
                class="flex justify-end gap-x-2">
                <LazyUButton 
                    type="reset" 
                    label="Cancel" 
                    size="sm" 
                    color="red" 
                    @click="emits('toggle', false)" 
                />
                <LazyUButton 
                    type="submit" 
                    label="Save" 
                    size="sm" 
                    color="amber" 
                />
            </div>
        </div>
    </LazyUModal>
</template>

<script setup lang="ts">
import { 
    CloseLine 
} from '@/components/icons';
import { 
    SelectMenu 
} from '@/components/ui';

const props = withDefaults(defineProps<{ 
    open?: boolean 
}>(), { 
    open: false 
});

const emits = defineEmits<{
    (event: 'toggle', state: boolean): void;
    (event: 'update:data'): void;
}>();

const activeTab: Ref<number> = ref<number>(0);
const selectedCustomerType = ref<string>('Normal Customer');

const handleTabChange = (value: number): void => {
    activeTab.value = value;
    selectedCustomerType.value = value === 0 ? 'Normal Customer' : 'Membership';
};

const tabItem = [
    { 
        key: 0, 
        label: 'Normal Customer', 
        icon: 'streamline:information-desk-customer' 
    },
    { 
        key: 1, 
        label: 'Membership', 
        icon: 'material-symbols-light:card-membership-rounded' 
    }
];

watch(selectedCustomerType, (newValue) => {
    activeTab.value = newValue === 'Normal Customer' ? 0 : 1;
});
</script>
