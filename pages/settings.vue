<template>
    <div 
        class="bg-white dark:bg-gray-900 px-4 py-6 rounded-xl shadow-md flex flex-col gap-y-4">
        <UTabs 
            v-model="selectedTab"
            :items="tabHeaders"
            :ui="{
               list:{
                  background: 'bg-gray-300',
                  tab: {
                     icon: 'text-orange-500 dar:text-orange-500 w-5 h-5'
                  }
               }
            }"
        />
        <div 
            class="px-2 py-4 rounded-sm bg-gray-200/30 dark:bg-gray-800 text-gray-700 dark:text-gray-500">
            <GeneralSetting 
                v-if="selectedTab === 0"
            />
            <UsersAccount 
                v-else-if="selectedTab === 1" 
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { 
    GeneralSetting, 
    Profile,
    UsersAccount
} from '@/components/layouts'

definePageMeta({
  colorMode: 'light'
})

const selectedTab: Ref<number> = ref<number>(0);

const tabHeaders = [
   {
      label: 'General Settings',
      icon: 'material-symbols:settings-suggest',
   },
   {
      label: 'Users Account',
      icon: 'material-symbols:manage-accounts',
   }
]
</script>
