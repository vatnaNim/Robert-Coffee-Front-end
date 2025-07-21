<template>
    <Transition name="fade">
        <div
            v-if="open"
            class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 dark:bg-black/50 backdrop-blur-md">
            <div   
                class="bg-white dark:bg-gray-800 px-6 py-4 rounded-xl shadow-lg flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
                    <path fill="none" stroke="currentColor" stroke-dasharray="16" stroke-dashoffset="16" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3a9 9 0 0 1 9 9">
                        <animate fill="freeze" attributeName="stroke-dashoffset" dur="0.2s" values="16;0"/>
                        <animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/>
                    </path>
                </svg>
                <span 
                    class="text-sm font-medium text-gray-700 dark:text-white">
                    Loading, please wait...
                </span>
            </div>
        </div>
    </Transition>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean;
}>();
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
