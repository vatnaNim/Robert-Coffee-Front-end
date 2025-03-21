<template>
    <li
        class="group py-2 w-full hover:bg-[#803D3B] bg-[#E4C59E] cursor-pointer">
        <NuxtLink
            path="/login"
            class="flex gap-x-3 text-white"
            :class="{
                'ml-9': isExpand,
                'ml-6': !isExpand
            }">
            <UIcon
                v-if="typeof(icon) === 'string'"
                :name="(icon as string)"
                class="text-2xl w-5 h-6"
                :class="{
                    'text-white': $route.path === path,
                    'group-hover:text-white ': $route.path !== path
                }"/>
            <component
                v-else
                :is="icon"/>
            <span
                class="font-medium text-white group-hover:text-white font-size-p"
                :class="{
                    'hidden': !isExpand
                }">{{ label }}</span>
        </NuxtLink>
    </li>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    label?: string;
    icon?: object | string;
    isExpand?: boolean;
    path?: string;
}>(), {
    label: '',
    icon: '',
    isExpand: false,
    path: ''
});

</script>