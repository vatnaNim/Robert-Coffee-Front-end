<template>
    <div
        class="space-y-5 w-full">
        <h1
            class="text-lg font-semibold text-orange-500 dark:text-orange-500 uppercase">
            Profile
        </h1>
        <div 
            class="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg">
            <div 
                class="flex items-center space-x-4 mb-6">
                <div 
                    class="w-20 h-20 rounded-full overflow-hidden border-4 border-orange-500 shadow">
                    <img 
                        :src="userImage || User" 
                        alt="Profile" 
                        class="w-full h-full object-fill" 
                    />
                </div>
                <div>
                    <h2 
                        class="text-2xl font-bold text-orange-600 dark:text-orange-400">
                        {{ username || 'Unknown User' }}
                    </h2>
                    <p 
                        class="text-sm text-gray-500 dark:text-gray-400">
                        User ID: {{ userId || '-' }}
                    </p>
                </div>
            </div>
            <div
                class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800 dark:text-gray-100">
                <div>
                    <span class="font-semibold text-orange-500">Email:</span>
                    <span class="block text-sky-600 dark:text-sky-400 underline ">{{ email }}</span>
                </div>
                <div>
                    <span class="font-semibold text-orange-500">Role:</span>
                    <span class="block capitalize text-gray-500 dark:text-gray-300">{{ role }}</span>
                </div>
                <div>
                    <span class="font-semibold text-orange-500">Gender:</span>
                    <span class="block capitalize text-gray-500 dark:text-gray-300">{{ gender }}</span>
                </div>
                <div>
                    <span class="font-semibold text-orange-500">Phone Number:</span>
                    <span class="block text-gray-500 dark:text-gray-300">{{ phoneNumber }}</span>
                </div>
                <div>
                    <span class="font-semibold text-orange-500">Account Status:</span>
                    <span :class="{
                        'text-green-500': acc_status === 'active',
                        'text-yellow-500': acc_status === 'pending',
                        'text-red-500': acc_status === 'banned'
                    }" class="block capitalize font-semibold">{{ acc_status }}</span>
                </div>
            </div>
        </div>
        <h1
            class="text-lg font-semibold text-orange-500 dark:text-orange-500 uppercase">
            Preferences
        </h1>
        <article
            class="flex justify-between items-center">
            <div
                class="flex items-center gap-x-2">
                <UIcon 
                    :name="darkColor? 'line-md:sunny-loop' : 'line-md:sunny-outline-to-moon-alt-loop-transition'" 
                    :class="darkColor? 'text-yellow-400 dark:text-yellow-500' : 'text-sky-400 dark:text-sky-400'"
                    class="w-5 h-5" 
                />
                <span
                    class="font-medium text-sm capitalize">
                    {{ darkColor? 'light mode' : 'dark mode' }}
                </span>  
            </div>
            <UToggle
                size="md"
                color="amber"
                :ui="{ 
                    inactive: 'bg-gray-400 dark:bg-gray-400' 
                }"
                v-model="darkColor"
            />
        </article>
        <article
            class="flex justify-between items-center">
            <div
                class="flex items-center gap-x-2">
                <UIcon 
                    :name="isFullscreen? 'mingcute:fullscreen-exit-line' : 'mingcute:fullscreen-line'" 
                    class="w-5 h-5 text-orange-500 dark:text-orange-500" 
                />
                <span
                    class="font-medium text-sm capitalize">
                    {{ isFullscreen? 'ExitScreen' : 'FullScreen' }} mode
                </span>  
            </div>
            <UToggle
                size="md"
                color="amber"
                v-model="isFullscreen"
                @change="toggleFullscreen"
                :ui="{ 
                    inactive: 'bg-gray-400 dark:bg-gray-400' 
                }"
            />
        </article>
        <article
            class="flex justify-between items-center">
            <div
                class="flex items-center gap-x-2">
                <UIcon 
                    name="streamline:money-cashier-bar-code-codes-tags-upc-barcode" 
                    class="w-5 h-5 text-orange-500 dark:text-orange-500" 
                />
                <span
                    class="font-medium text-sm capitalize">
                    enable cash drawer
                </span>  
            </div>
            <UToggle
                size="md"
                color="amber"
                :model-value="isDrawerOpen"
                :disabled="isEnabled"
                @update:model-value="toggleChangeDrawer"
                :ui="{ 
                    inactive: 'bg-gray-400 dark:bg-gray-400' 
                }"
            />
        </article>
        <article
            class="flex justify-between items-center">
            <div
                class="flex items-center gap-x-2">
                <UIcon 
                    name="material-symbols:print-outline" 
                    class="w-5 h-5 text-orange-500 dark:text-orange-500" 
                />
                <span
                    class="font-medium text-sm capitalize">
                    Enable Receipt Printing
                </span>  
            </div>
            <UToggle
                size="md"
                color="amber"
                :model-value="isReceiptPrintingEnabled"
                :disabled="!printerConfirmed"
                @update:model-value="toggleReceiptPrinting"
                :ui="{ inactive: 'bg-gray-400 dark:bg-gray-400' }"
            />
        </article>
        <article
            class="flex justify-between items-center">
            <div
                class="flex items-center gap-x-2">
                <UIcon 
                    name="material-symbols:time-auto-outline-rounded" 
                    class="w-5 h-5 text-orange-500 dark:text-orange-500" 
                />
                <span
                    class="font-medium text-sm capitalize">
                    Auto logout timer
                </span>  
            </div>
            <USelectMenu
                id="auto-logout-select"
                v-model="selectedTime"
                size="sm"
                color="amber"
                aria-label="Auto logout timer select"
                value-attribute="value"
                class="w-[200px]"
                placeholder="Please select auto logout timer"
                :options="[
                { 
                    label: '30 min',
                    value: '30min' 
                },
                { 
                    label: '1h', 
                    value: '1h' 
                },
                { 
                    label: '3h', 
                    value: '3h' 
                },
                { 
                    label: '4h', 
                    value: '4h' 
                },
                ]"
            />

        </article>
        <article
            class="flex justify-center items-center">
            <UButton
                color="red"
                size="sm"
                icon="ic:outline-log-out"
                label="Log Out"
                variant="soft"
                block
                class="max-w-[70%]"
                @click="logout()"
            /> 
        </article>
        
    </div>
</template>

<script setup lang="ts">
import { User } from '@/assets/images';
import { useDarkMode } from '@/composables/useDarkMode';
import { useFullscreen } from '@/composables/useFullScreen';
import { useCashDrawer } from '@/composables/useOpenCashDrawer';
import { useReceiptPrinting } from '@/composables/useReceiptPrinting';
import { useAuthStore } from '@/stores/auth';
import { Confirm } from '@/utils/dialog';
import {
    type Router,
    useRouter
} from "vue-router";
import {
    storeToRefs
} from 'pinia';

const authStore = useAuthStore();
const router: Router = useRouter();
const { 
    darkColor 
} = useDarkMode();
const { 
    isFullscreen, 
    toggleFullscreen 
} = useFullscreen();
const { 
    isDrawerOpen, 
    toggleDrawer, 
    isEnabled 
} = useCashDrawer();
const {
    printerConfirmed,
    isReceiptPrintingEnabled,
    toggleReceiptPrinting,
} = useReceiptPrinting();

const { 
    username, 
    userImage, 
    role, 
    email,
    phoneNumber,
    gender,
    userId,
    acc_status,
    created_at,
} = storeToRefs(authStore);
const selectedTime: Ref<string> = ref<string>('1h');

const toggleChangeDrawer = (val: boolean): void => {
    toggleDrawer(val)
};

const logout = (): void => {
    Confirm(
        "Log Out",                            
        "Are you sure you want to log out?",  
        "Logged Out",                         
        "Cancelled",                         
        "You have successfully logged out.",    
        "Your session was not affected.",      
        (): void => {                          
            authStore.logoutAuth();
            router.push('/login');
        }
    );
};

const timeMap: Record<string, number> = {
    '30min': 30 * 60 * 1000,
    '1h': 60 * 60 * 1000,
    '3h': 3 * 60 * 60 * 1000,
    '4h': 4 * 60 * 60 * 1000,
}

let timer: ReturnType<typeof setTimeout> | null = null;

const startAutoLogout = (timeout: number): void => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(async () => {
        alert('⏰ You were logged out due to inactivity.');
        await authStore.logoutAuth();
        router.push('/login').catch(console.error);
    }, timeout);
}


onMounted((): void => {
  startAutoLogout(timeMap[selectedTime.value]);
})

watch(selectedTime, (newVal): void => {
  startAutoLogout(timeMap[newVal])
});

onBeforeUnmount((): void => {
  if (timer) clearTimeout(timer)
});

</script>