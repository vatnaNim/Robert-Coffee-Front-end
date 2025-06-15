<template>
    <li
        class="group py-1.5 w-full bg-gray-300  dark:bg-gray-900 cursor-pointer">
        <NuxtLink
            path="/login"
            class="flex items-center gap-x-3 text-red-500"
            :class="{
                'ml-9': isExpand,
                'ml-6': !isExpand
            }">
            <UIcon
                v-if="typeof(icon) === 'string'"
                :name="(icon as string)"
                class="w-4 h-4"
                :class="{
                    'text-white': $route.path === path,
                    'group-hover:text-white ': $route.path !== path
                }"/>
            <component
                v-else
                :is="icon"/>
            <span
                class="font-medium text-red-500 text-sm"
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