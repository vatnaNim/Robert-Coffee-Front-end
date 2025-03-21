<!-- <template>
    <UDropdown
        :items="items"
        :popper="
            {
                placement: 'bottom-start'
            }"
        :ui="{
        trigger: 'rounded-3xl h-[48px] overflow-hidden'
        }">
        <div
            class="flex items-center justify-center bg-white w-[48px] h-[48px] relative">
            <UIcon
                :class="['text-2xl', 'cursor-pointer', 'text-red-500', 'transition-all', 'duration-300']"
                :name="iconName"
                @mouseover="changeIcon('mdi:bell')"
                @mouseleave="changeIcon('iconoir:bell')"
            />
        </div>
    </UDropdown>
</template>

<script lang="ts" setup>

import type { 
    DropdownItem 
} from '@nuxt/ui/dist/runtime/types';

const iconName: Ref<string> = ref<string>('iconoir:bell');
    
const changeIcon = (newIcon: string): void => {
  iconName.value = newIcon;
};

const items: Ref<DropdownItem[][]> = ref<DropdownItem[][]>([
  [
    {
      label: 'Admin',
      avatar: {
        src: User
      }
    }
  ]
]);

</script> -->
<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup () {
    

    return {}
  }
})
</script>

<style scoped>

</style>