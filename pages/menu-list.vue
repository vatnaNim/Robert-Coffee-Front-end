<template>
    <div>
        <div
                    class="flex flex-col items-center justify-center w-[180px] h-[180px] border border-dashed border-gray-300 rounded-lg cursor-pointer relative bg-white">
                    <ChooseImage
                        name="image" />
                </div>
    
    </div>
</template>

<script setup lang="ts">
import { ChooseImage } from '@/components/ui';
</script>

<style scoped>

</style>