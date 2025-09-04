<template>
    <span 
        class="relative inline-flex items-center space-x-1 group cursor-pointer"
        @click="copyToClipboard">
        <span 
            :class="{'text-green-500 underline underline-offset-2': isCopied, 'text-gray-700 dark:text-gray-400': !isCopied}">
            {{ label }}
        </span>
        <span 
            class="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <LazyUTooltip 
                v-if="!isCopied"
                text="Copy" 
                :popper="{ arrow: true, placement: 'top' }">
                <LazyUIcon
                    name="material-symbols:content-copy"
                    color="gray"
                    class="text-gray-500 cursor-pointer"
                    
                />
            </LazyUTooltip>
            <LazyUTooltip 
                v-else
                text="Copied" 
                :popper="{ arrow: true, placement: 'top' }">
                <LazyUIcon
                    name="tabler:copy-check-filled"
                    color="green"
                    class="text-green-500 cursor-pointer"
                />
            </LazyUTooltip>
        </span>
    </span>
</template>
  
<script setup lang="ts">
import { 
    Success 
} from "@/utils/dialog"; 

const props = withDefaults(defineProps<{ label: string }>(), {
	label: 'Enter text'
});
  
const isCopied: Ref<boolean> = ref<boolean>(false);
  
const copyToClipboard = (): void => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(props.label).then(() => {
            isCopied.value = true;
            setTimeout(() => (isCopied.value = false), 3000); 
            Success("Text copied successfully!", () => {});
        });
    }
};
</script>
