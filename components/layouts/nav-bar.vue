<template>
    <nav
        class="w-full flex h-[60px] gap-x-3 px-2 py-1">
        <div 
            class="bg-[#C4B6B6] text-white flex items-center flex-grow px-6 shadow-sm justify-between  rounded-lg">
            <p
                class="font-semibold font-size-p text-white m-0 p-0 w-full lg:w-auto pl-7 lg:pl-0">
                {{ title }}
            </p>
            <div 
                class="flex items-center gap-x-1.5 ">
                <ClientOnly>
                    <div
                        class="hidden lg:block">
                        <div
                            class="whitespace-nowrap text-sm flex items-center gap-x-1.5">
                            <span>
                                <Icon
                                name="mdi:calendar-clock"
                                class="text-white text-2xl"
                            />
                            </span>
                            <span
                                class="font-size-watch">
                                {{ formatDateTime(datetime) }}
                            </span>
                        </div>
                    </div>
                </ClientOnly>
                <UserList/>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { UserList } from '.';

defineProps({
    title: {
        type: String || null,
        required: true
    }
});
const route = useRoute();
const datetime: Ref<string> = ref<string>(new Date().toLocaleString());
    const getCurrentDateTime = (): string => {
    const currentDateTime = new Date();
    const formattedDate = currentDateTime.toLocaleString();
    return formattedDate;
}

const updateDateTime = (): void => {
    setInterval((): void => {
        datetime.value = getCurrentDateTime();
    }, 1000);
}

const isSettingsPage = computed(() => {
    return route.name === 'settings' || route.name === 'report'; 
});

const getDateAndTimeValues = (inputDateTime: string): {
    dayOfWeek: string,
    day: number,
    month: number,
    year: number,
    hours: number,
    minutes: number,
    seconds: number,
    ampm: string
} => {
const dateTime = new Date(inputDateTime);
const dayOfWeekNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const dayOfWeek = dayOfWeekNames[dateTime.getDay()] ?? 'unknown';
const day = dateTime.getDate();
const month = dateTime.getMonth() + 1;
const year = dateTime.getFullYear();

let hours = dateTime.getHours();
const minutes = dateTime.getMinutes();
const seconds = dateTime.getSeconds();

const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;

return {
    dayOfWeek,
    day,
    month,
    year,
    hours,
    minutes,
    seconds,
    ampm
};
}

const formatDateTime = (inputDateTime: string): string => {
  const {
        dayOfWeek,
        day,
        month,
        year,
        hours,
        minutes,
        seconds,
        ampm } = getDateAndTimeValues(inputDateTime);
    return `${dayOfWeek}, ${day.toString().padStart(2, '0')}-${month.toString().padStart(2, '0')}-${year} | ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
}

onMounted((): void => {
    updateDateTime();
});

</script>