<template>
    <li
        class=" bg-[#C4B6B6] p-2 flex items-center justify-start min-h-[40px]">
        <span
            class="text-[#803D3B] font-size-p uppercase font-bold"
            :class="{
                [classTitle as string]: classTitle
            }">
            {{ label }}
        </span>
    </li>
</template>

<script setup lang="ts">

withDefaults(defineProps<{
    label: string;
    classTitle?: string;
}>(), {
    label: '',
    classTitle: '',
});

</script>