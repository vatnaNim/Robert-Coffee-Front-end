<template>
    <UDropdown
        :items="items"
        :popper="{
            placement: 'bottom-start'
        }"
        :ui="{
            trigger: 'rounded-3xl h-[48px] overflow-hidden',
            padding: 'p-1 space-y-2',
            container: 'z-50',
            background: 'bg-white/30 dark:bg-black/20 backdrop-blur-sm',
        }">
        <div
            class="flex gap-x-2 py-1.5 px-2 rounded-md items-center duration-300 group">
            <UAvatar
                :src="userImage"
                alt="user"
                size="sm"
            />
            <p
                class="text-gray-600 dark:text-white text-bold text-xs lg:text-sm relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[2px] after:bg-gray-600 dark:after:bg-white after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
                {{ username }}
            </p>
        </div>
    </UDropdown>
</template>

<script setup lang="ts">

import {
    storeToRefs
} from 'pinia';
import {
    useAuthStore
} from '@/stores/auth';
import {
    type Router,
    useRouter
} from "vue-router";
import { Confirm } from '@/utils/dialog';
import { User } from '@/assets/images';
import { useDarkMode } from '@/composables/useDarkMode';
import { useFullscreen } from '@/composables/useFullScreen';


/**
 * Begin::Declare variable section
 */

const authStore = useAuthStore();
const { username, userImage, role } = storeToRefs(authStore);
const { isFullscreen, toggleFullscreen } = useFullscreen()
const { darkColor, toggle } = useDarkMode();


interface DropdownItem {
    label: string;
    icon?: string;
    to?: string;
};

const router: Router = useRouter();
const items: Ref<DropdownItem[][]> = computed(() => [
[
    {
        label: username.value,
        class: 'justify-center pb-3 hover:backdrop-blur-md',
        avatar: {
            src: userImage.value || User,
            size: 'lg'
        }
    },
    {
        label: role.value,
        icon: 'ic:baseline-person-pin',
        iconClass: "text-orange-600 dark:text-orange-600",
        class: 'text-orange-500 dark:text-orange-600 uppercase font-bold text-gray-600 dark:text-white',
        disabled: true
    },
    {
        label: darkColor.value ? 'Light Mode' : 'Dark Mode',
        icon: darkColor.value
            ? 'material-symbols:light-mode-outline'
            : 'material-symbols:dark-mode-outline',
        iconClass: 'text-gray-600 dark:text-white',
        class:'hover:backdrop-blur-md text-gray-600 dark:text-white',
        click: (): void => toggle()
    },
    {
        label: isFullscreen.value ? 'ExitScreen' : 'FullScreen',
        icon: isFullscreen.value ? 'ant-design:fullscreen-exit-outlined' : 'gridicons:fullscreen',
        iconClass: "text-gray-600 dark:text-white",
        class: 'hover:backdrop-blur-md text-gray-600 dark:text-white',
        click: async (): Promise<void> => {
            await toggleFullscreen()
        }
    },
    {
        label: 'Logout',
        icon: "octicon:sign-out",
        iconClass: "text-red-600 dark:text-red-500",
        class: 'hover:backdrop-blur-md text-gray-600 dark:text-white',
        click: (): void => {
            logout();
        }
    }
]
]);

/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
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

</script>
