<template>
    <li
        class="group py-1.5 w-full cursor-pointer hover:bg-black/20 dark:hover:bg-gray-700 duration-150 backdrop-blur-sm"
        :class="{
            'bg-black/30 dark:bg-gray-700 border-l-4 border-sky-600': route.path === path,
            'bg-gray-300  dark:bg-gray-900': route.path !== path,
            [className as string]: className
        }">
        <NuxtLink
            @click="$emit('setTitle', title)"
            :to="path"
            class="flex items-center gap-x-3  group-hover:text-white text-gray-600 dark:text-white text-nowrap"
            :class="{
                'ml-5': classTitle,
                'ml-9': !classTitle
            }">
            <UIcon
                v-if="typeof(icon) === 'string'"
                :name="(icon as string)"
                class="w-6 h-5"
                :class="{
                    ' text-gray-600 dark:text-white': route.path === path,
                    'text-gray-600 group-hover:text-white': route.path !== path
                }"
            />
            <component
                v-else
                :is="icon"
            />
            <span
                :title="title"
                class="font-medium text-sm"
                :class="{
                    'text-white': route.path === path,
                    [classTitle as string]: classTitle
                }">
                {{ title }}
            </span>
        </NuxtLink>
    </li>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
    icon: string | object;
    title: string;
    path: string;
    className?: string;
    classTitle?: string;
}>(), {
    icon: '',
    title: '',
    path: '',
    className: '',
    classTitle: ''
});

/**
 * Begin::Set event trigger to parent component
 */
const emit = defineEmits(['setTitle']);
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variable section
 */
const route = useRoute();
/**
 * End::Declare variable section
 */

onMounted(() => {
    if(route.path === props.path)
        emit('setTitle', props.title);
});
</script>