<template>
    <div
        class="flex roboto-font">
        <SideBar
            @expand="toggleExpand"
            @setTitle="showTitle"/>
        <div
            class="w-full bg-gray-200 dark:bg-gray-800  text-gray-900 block h-screen"
            :class="{
                'w-full lg:w-[calc(100%-288px)]': expand,
                'w-full lg:w-[calc(100%-64px)]': !expand,
            }">
            <NavBar
                :title="Title"/>
            <div
                class="overflow-hidden px-2 pt-2 hover:overflow-y-auto h-[calc(100%-60px)] no-scrollbar">
                <NuxtPage/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

import SideBar from '@/components/layouts/side-bar.vue';
import NavBar from '@/components/layouts/nav-bar.vue';

/**
 * Begin::Declare variable section
 */
const Title: Ref<string> = ref<string>('');
const expand: Ref<boolean> = ref<boolean>(true);
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */


const showTitle = (title: string) => {
    Title.value = title;
}

const toggleExpand = (value: boolean): void => {
  expand.value = value;
}
/**
 * End::Some logical in this component
 */
</script>

<style>
.page-enter-active,
.page-leave-active {
	transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>