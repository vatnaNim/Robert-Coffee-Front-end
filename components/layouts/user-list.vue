<template>
    <UDropdown
        :items="items"
        :popper="{
            placement: 'bottom-start'
        }"
        :ui="{
            trigger: 'rounded-3xl h-[48px] overflow-hidden',
            padding: 'p-1 space-y-2'
        }">
        <div
            class="flex gap-x-2 py-1.5 px-2 rounded-md items-center duration-300 group">
            <UAvatar
                src=""
                alt="user"
                size="sm"
            />
            <p
                class="text-white text-bold text-xs lg:text-sm relative after:content-[''] after:absolute after:bottom-0 after:right-0 after:h-[2px] after:bg-[#39311D] after:w-0 group-hover:after:w-full after:transition-all after:duration-300">
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

definePageMeta({
    colorMode: 'light'
})

/**
 * Begin::Declare variable section
 */

const authStore = useAuthStore();
const { username, userImage, role } = storeToRefs(authStore);
const isFullscreen: Ref<boolean> = ref<boolean>(false);

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
        class: 'justify-center pb-3 hover:bg-transparent',
        avatar: {
            src: userImage.value,
            size: 'lg'
        }
    },
    {
        label: role.value,
        icon: 'ic:baseline-person-pin',
        iconClass: "text-green-500",
        class: 'text-green-500 uppercase font-bold',
        disabled: true
    },
    {
        label: isFullscreen.value ? 'ExitScreen' : 'FullScreen',
        icon: isFullscreen.value ? 'ant-design:fullscreen-exit-outlined' : 'gridicons:fullscreen',
        iconClass: "text-green-500",
        click: async (): Promise<void> => {
            await toggleFullscreen();
        }
    },
    {
        label: 'Logout',
        icon: "octicon:sign-out",
        iconClass: "text-blue-500",
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

const toggleFullscreen = async (): Promise<void> => {
// @ts-ignore
if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
{
    handleExitFullscreen();
    isFullscreen.value = false;
}
else
{
    await handleRequestFullscreen();
    isFullscreen.value = true;
}
}

const handleRequestFullscreen = async (): Promise<void> => {
const body: HTMLBodyElement = document.body as HTMLBodyElement;
if(await body.requestFullscreen)
{
    body.requestFullscreen();
}
// @ts-ignore
else if(await body.mozRequestFullScreen)
{
    // @ts-ignore
    body.mozRequestFullScreen();
}
// @ts-ignore
else if(await body.webkitRequestFullscreen)
{
    // @ts-ignore
    body.webkitRequestFullscreen();
}
// @ts-ignore
else if(body.msRequestFullscreen)
    {
        // @ts-ignore
        body.msRequestFullscreen();
    }
}

const handleExitFullscreen = (): void => {
if(document.exitFullscreen)
{
    document.exitFullscreen();
}
// @ts-ignore
else if(document.mozCancelFullScreen)
{
    // @ts-ignore
    document.mozCancelFullScreen();
}
// @ts-ignore
else if(document.webkitExitFullscreen)
{
    // @ts-ignore
    document.webkitExitFullscreen();
}
// @ts-ignore
else if(document.msExitFullscreen)
{
    // @ts-ignore
    document.msExitFullscreen();
}
}


const checkFullscreen = async (): Promise<void> => {
// @ts-ignore
if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)
{
    handleRequestFullscreen();
    isFullscreen.value = true;
}
else
{
    isFullscreen.value = false;
}
}
/**
 * End::Some logical in this component
 */

onMounted(async (): Promise<void> => {
    await checkFullscreen();
});
</script>
