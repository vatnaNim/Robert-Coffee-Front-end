<template>
    <li
        @click="toggleAccordion(index)"
        role="accordion"
        class="bg-[#E4C59E] hover:bg-[#803D3B] py-2  flex items-center justify-between cursor-pointer">
        <button
            class="bg-transparent flex gap-x-3 items-center text-white text-nowrap"
            :class="classTitle ? 'ml-6' : 'ml-9'">
            <UIcon
                v-if="typeof(icon) === 'string'"
                :name="icon"
                class="text-2xl w-5 h-6"/>
            <component
                v-else
                :is="icon"/>
            <span
                class="font-semibold text-white font-size-p"
                :class="classTitle">{{ title }}</span>
        </button>
        <ArrowDown
            :class="{
                '-rotate-90': activeIndex !== index,
                'hidden': classTitle
            }"
            class="text-white"/>
    </li>
    <ul
        role="list"
        class="list-none flex flex-col gap-y-2 transition-all"
        :class="{
            'hidden': activeIndex !== index
        }">
        <slot/>
    </ul>
</template>

<script setup lang="ts">
import {
    ArrowDown
} from '@/components/icons/';

defineProps({
    icon: {
        type: [String, Object],
        required: true
    },
    title: {
        type: String,
        required: true
    },
    index: {
        type: Number,
        required: true
    },
    activeIndex: {
        type: Number,
        required: true
    },
    classTitle: {
        type: String,
        required: false
    }
});

/**
 * Begin::Set event trigger to parent component
 */
const emit = defineEmits(['toggleAccordion']);
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Some logical in this component
 */
const toggleAccordion = (index: number): void => {
    emit('toggleAccordion', index);
};
/**
 * End::Some logical in this component
 */
</script>