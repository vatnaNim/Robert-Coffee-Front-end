<template>
    <button
        class="bg-[#C4B6B6] flex items-center justify-center rounded-xl cursor-pointer relative overflow-hidden transition-all duration-500 ease-in-out shadow-md hover:scale-105 hover:shadow-lg before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-[#e39258] before:to-[rgb(234,110,44)] before:transition-all before:duration-500 before:ease-in-out before:z-[-1] before:rounded-xl hover:before:left-0 text-[#fff]"
        :class="size">
        {{ name }}
    </button>
  </template>
  
<script setup lang="ts">
withDefaults(
    defineProps<{
        name: string;
        size?: string;
    }>(),
    {
        name: 'Back',
        size: 'py-2 px-4'    
    }
  );
</script>
  