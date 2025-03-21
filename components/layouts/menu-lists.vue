<template>
    <li
        class="group py-2 w-full cursor-pointer hover:bg-[#803D3B] text-black"
        :class="{
            'bg-[#803D3B]': route.path === path,
            'bg-[#E4C59E] ': route.path !== path,
            [className as string]: className
        }">
        <NuxtLink
            @click="$emit('setTitle', title)"
            :to="path"
            class="flex gap-x-3  group-hover:text-white text-white text-nowrap"
            :class="{
                'ml-6': classTitle,
                'ml-9': !classTitle
            }">
            <UIcon
                v-if="typeof(icon) === 'string'"
                :name="(icon as string)"
                class="w-5 h-6"
                :class="{
                    ' text-red-800': route.path === path,
                    'group-hover:text-black text-black': route.path !== path
                }"/>
            <component
                v-else
                :is="icon"/>
            <span
                :title="title"
                class="font-medium font-size-p"
                :class="{
                    'text-white': route.path === path,
                    [classTitle as string]: classTitle
                }">{{ title }}</span>
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