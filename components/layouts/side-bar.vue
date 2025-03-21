<template>
    <div>
        <aside
            ref="sidebar"
            id="side-bar"
            class="h-screen bg-[#C4B6B6] overflow-x-hidden transition-all shadow"
            :class="{
                'lg:w-72': expand,
                'lg:w-16': !expand,
                'block lg:hidden fixed inset-0 w-64 bg-[#C4B6B6] z-[80]': mobileExpand,
                'hidden lg:block': !mobileExpand,
            }">
            <div
                class="w-full h-[60px] flex items-center justify-between bg-[#C4B6B6] py-0.5">
                <div class=""></div>
                <div 
                    class="rounded-full overflow-hidden w-12 h-12 flex flex-col">
                    <img
                        :src="Logo"
                        alt="logo"
                        loading="lazy"
                        class="rounded-full"
                        :class="{
                            'hidden': !expand,
                            'w-full h-full object-scale-down': expand
                        }"
                    />
                </div>
                <button
                    @click="() => {
                        $emit('expand', !expand);
                        toggleSidebar(!expand);
                    }"
                    type="button"
                    class="px-2 lg:block hidden text-[#131010]">
                    <ArrowBack
                        :class="{
                            '-rotate-180': !expand
                        }"/>
                </button>
            </div>
            <ul
                role="list"
                class="list-none flex flex-col gap-y-1 overflow-hidden hover:overflow-y-auto h-[calc(100%-60px)] no-scrollbar">
                <MenuList
                    :icon="Dashboard"
                    title="Dashboard"
                    path="/"
                    :class-title="expand ? '' : 'hidden'"
                    @click="() => handleClose('/')"
                    @set-title="showTitle"/>
                <SectionList
                    :class-title="expand ? '' : 'hidden'"
                    label="Point of Sale"/>
                <MenuList
                    :icon="ScreenSale"
                    title="Screen Sale"
                    path=""
                    :class-title="expand ? '' : 'hidden'"
                    @click="() => handleClose('/screen_sale')"
                    @set-title="showTitle"/>
                <MenuList
                    :icon="CustomerLists"
                    title="Customer List"
                    path="/customer-list"
                    :class-title="expand ? '' : 'hidden'"
                    @click="() => handleClose('/customer-list')"
                    @set-title="showTitle"/>
                <MenuList
                    :icon="Membership"
                    title="Membership"
                    path="/membership"
                    :class-title="expand ? '' : 'hidden'"
                    @click="() => handleClose('/membership')"
                    @set-title="showTitle"/>
                <SectionList
                    :class-title="expand ? '' : 'hidden'"
                    label="PRODUCT MENU"/>
                    <AccordionMenu
                        :icon="Product"
                        title="Menu"
                        :index="1"
                        :active-index="activeIndex"
                        :class-title="expand ? '' : 'hidden'"
                        @toggle-accordion="toggleAccordion">
                        <MenuList
                            icon="icon-park-outline:ad-product"
                            title="Menu List"
                            path="/menu-list"
                            class-name="pl-3"
                            :class-title="expand ? '' : 'hidden'"
                            @click="() => handleClose('/menu-list')"
                            @set-title="showTitle"/>
                        <MenuList
                            icon="icon-park-outline:ad-product"
                            title="Menu Type"
                            path="/menu-type"
                            class-name="pl-3"
                            :class-title="expand ? '' : 'hidden'"
                            @click="() => handleClose('/menu-type')"
                            @set-title="showTitle"/>
                        <MenuList
                            icon="icon-park-outline:ad-product"
                            title="Menu Category"
                            path="/menu-category"
                            class-name="pl-3"
                            :class-title="expand ? '' : 'hidden'"
                            @click="() => handleClose('/menu-category')"
                            @set-title="showTitle"/>
                    </AccordionMenu>
                    <MenuList
                            icon="icon-park-outline:ad-product"
                            title="Promotion Gift"
                            path=""
                            :class-title="expand ? '' : 'hidden'"
                            @click="() => handleClose('/product_brand')"
                            @set-title="showTitle"/>
                <SectionList
                    :class-title="expand ? '' : 'hidden'"
                    label="PURCHASE"/>
                    <MenuList
                        icon="icon-park-outline:ad-product"
                        title="Purchase List"
                        path=""
                        class-name="pl-3"
                        :class-title="expand ? '' : 'hidden'"
                        @click="() => handleClose('')"
                        @set-title="showTitle"
                    />
                    <MenuList
                        icon="icon-park-outline:ad-product"
                        title="Return PO"
                        path=""
                        class-name="pl-3"
                        :class-title="expand ? '' : 'hidden'"
                        @click="() => handleClose('')"
                        @set-title="showTitle"
                    />
                <SectionList
                    :class-title="expand ? '' : 'hidden'"
                    label="Report"/>
                    <MenuList
                        icon="icon-park-outline:ad-product"
                        title="End Report"
                        path=""
                        class-name="pl-3"
                        :class-title="expand ? '' : 'hidden'"
                        @click="() => handleClose('')"
                        @set-title="showTitle"
                    />
                    <AccordionMenu
                        :icon="Product"
                        title="Purchase Report"
                        :index="3"
                        :active-index="activeIndex"
                        :class-title="expand ? '' : 'hidden'"
                        @toggle-accordion="toggleAccordion">
                        <MenuList
                            icon="icon-park-outline:ad-product"
                            title="Daily Report"
                            path=""
                            class-name="pl-3"
                            :class-title="expand ? '' : 'hidden'"
                            @click="() => handleClose('')"
                            @set-title="showTitle"
                        />
                    </AccordionMenu>   
                    <AccordionMenu
                        :icon="Product"
                        title="Supplier Report"
                        :index="4"
                        :active-index="activeIndex"
                        :class-title="expand ? '' : 'hidden'"
                        @toggle-accordion="toggleAccordion">
                        <MenuList
                            icon="icon-park-outline:ad-product"
                            title="Income Supplier"
                            path=""
                            class-name="pl-3"
                            :class-title="expand ? '' : 'hidden'"
                            @click="() => handleClose('')"
                            @set-title="showTitle"
                        />
                        <MenuList
                            icon="icon-park-outline:ad-product"
                            title="Daily Report"
                            path=""
                            class-name="pl-3"
                            :class-title="expand ? '' : 'hidden'"
                            @click="() => handleClose('')"
                            @set-title="showTitle"
                        />
                    </AccordionMenu>
                <SectionList
                    :class-title="expand ? '' : 'hidden'"
                    label="General Settings"/>   
                    <MenuList
                        icon="icon-park-outline:ad-product"
                        title="Purchase"
                        path=""
                        :class-title="expand ? '' : 'hidden'"
                        @click="() => handleClose('')"
                        @set-title="showTitle"
                    />
                    <MenuList
                        icon="icon-park-outline:ad-product"
                        title="User Management"
                        path=""
                        :class-title="expand ? '' : 'hidden'"
                        @click="() => handleClose('')"
                        @set-title="showTitle"
                    />
                    <MenuList
                        icon="icon-park-outline:ad-product"
                        title="System Setting"
                        path=""
                        :class-title="expand ? '' : 'hidden'"
                        @click="() => handleClose('')"
                        @set-title="showTitle"
                    />
                    <DisableMenu
                        @click="logout"
                        :icon="LogOut"
                        label="Logout"
                        :is-expand="expand"
                    />
            </ul>
        </aside>
        <button
            v-show="!mobileExpand"
            @click.stop="toggleMobileSidebar()"
            class="lg:hidden absolute top-[0.7rem] text-[#0F58A8] left-4 p-2 rounded-md z-[90]">
            <svg
                class="w-5 h-5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
            </svg>
        </button>
    </div>
</template>

<script setup lang="ts">
import {
    MenuList,
    SectionList,
    DisableMenu
} from '@/components/layouts/';
import {
    AccordionMenu
} from "@/components/ui/";
import { 
    ArrowBack,
    ScreenSale,
    Dashboard,
    CustomerLists,
    Product,
    Membership,
    LogOut
} from '../icons';
import {
    storeToRefs
} from 'pinia';
import { useMediaQuery } from "@vueuse/core";
import { Confirm } from '@/utils/dialog/';
import { Logo } from '@/assets/images';

/**
 * Begin::Set event trigger to parent component
 */
const emit = defineEmits(['setTitle','expand']);
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variable section
 */
const activeIndex: Ref<number> = ref<number>(-1);
const expand: Ref<boolean> = ref<boolean>(true);
const mobileExpand: Ref<boolean> = ref<boolean>(false); 
const sidebar: Ref<HTMLElement | null> = ref<HTMLElement | null>(null);
const isLargeScreen = useMediaQuery("(min-width: 1024px)");
const authStore = useAuthStore();
// const { logUserOut } = useAuthStore();
const router = useRouter();
const route = useRoute();
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const showTitle = (title: string): void => {
    emit('setTitle', title);
    document.title = title;
};

const toggleAccordion = (index: number): void => {
    activeIndex.value = activeIndex.value === index ? -1 : index;
};

const toggleSidebar = (value: boolean): void => {
    expand.value = value;
}

const toggleMobileSidebar = (): void => {
  if (!isLargeScreen.value) {
    mobileExpand.value = !mobileExpand.value;
  }
};

watch(isLargeScreen, (newVal) => {
  if (newVal) {
    mobileExpand.value = false;
  }
});
const handleClose = (menuPath: string) => { 
  if (window.innerWidth <= 1024) {
    if (route.path !== menuPath) {
      router.push(menuPath);
      toggleMobileSidebar();
    }
  } else {
    router.push(menuPath);
  }
};
storeToRefs(useAuthStore());

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
/**
 * End::Some logical in this component
 */
/**
 * Begin::closing sidebar by clicking outside
 */
const handleClickOutside = (event: MouseEvent) => {
    if (sidebar.value && !sidebar.value.contains(event.target as Node)) {
        mobileExpand.value = false;
    }
};

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
/**
 * End::closing sidebar by clicking outside
 */
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

</style>