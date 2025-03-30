<template>
    <div
        class="flex px-2 py-2 bg-white shadow-md rounded-md">
        <div 
            class="w-[65%] space-y-3  px-2 ">
            <div 
                class="flex gap-x-2">
                <LazyUInput
                    v-model="emptyValue"
                    name="emptyValue"
                    size="sm"
                    placeholder="Search membership name or code..."
                    icon="i-heroicons-magnifying-glass-20-solid"
                    autocomplete="off"
                    color="amber"
                    :ui="{ 
                        icon: { trailing: { pointer: '' }, 
                        color: 'text-orange-500' } 
                    }"
                    class="max-w-full w-[400px]">
                    <template #trailing>
                        <LazyUButton
                            v-show="emptyValue !== ''"
                            color="red"
                            variant="link"
                            icon="i-heroicons-x-mark-20-solid"
                            :padded="false"
                            @click="emptyValue = ''"
                        />
                    </template>
                </LazyUInput>
                <LazyUButton
                    label="Filter"
                    icon="mage:filter"
                    color="amber"
                    size="sm"
                    variant="solid"
                    :trailing="false"
                    class="px-3"
                />
            </div>
            <div 
                class="w-full flex gap-x-3 overflow-x-auto no-scrollbar">
                <div 
                    v-for="(menu, idx) in menuList"
                    :key="idx">
                    <LazyUButton
                        :label="menu.label"
                        color="amber"
                        :variant="menuListvariant === menu.value ? 'solid' : 'outline'"
                        :trailing="false"
                        class="px-3 uppercase"
                        @click="handleMenuClick(menu.value)"
                    />
                </div>
            </div>
            <h1
                class="font-semibold text-lg text-orange-400">
                <span class="capitalize">{{ menuListvariant }}</span> menu
            </h1>
        </div>
        <div 
            class="w-[35%] bg-yellow-800">
            d
        </div>
    </div>
</template>

<script lang="ts" setup>


definePageMeta({
    colorMode: 'light'
})

const emptyValue: Ref<string> = ref<string>('');
const menuListvariant: Ref<string> =  ref<string>('coffee');

const menuList = [
    {
        label: 'Coffee',
        value: 'coffee'
    },
    {
        label: 'Food',
        value: 'food'
    },
];

const handleMenuClick = (value: string) => {
    menuListvariant.value = value;
    console.log('Clicked menu item:', value);
};
</script>

<style scoped>

</style>