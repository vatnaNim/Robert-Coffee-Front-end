<template>
    <LazyUPopover
        class="fixed-to-datepicker cursor-pointer"
        :popper="{
            placement: 'bottom-start'
        }">
        <LazyUInput
            :id="useId()"
            icon="i-heroicons-calendar-days-20-solid"
            :color="color"
            variant="outline"
            :size="size"
            :name="name"
            v-model="date"
            class="w-full cursor-pointer"
            placeholder="dd-MMM-yyyy - dd-MMM-yyyy"
            role="input"
            :ui="{
                icon: {
                    color:'text-orange-500'
                }
            }"/>
        <template #panel="{ close }">
            <div
                class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800">
                <div
                    class="hidden sm:flex flex-col py-4">
                    <UButton
                        type="button"
                        v-for="(range, idx) in ranges"
                        :key="idx"
                        :label="range.label"
                        :title="range.label"
                        color="gray"
                        variant="ghost"
                        class="rounded-none px-6 min-w-40"
                        :class="[isRangeSelected(range.duration) ? 'bg-gray-100 dark:bg-gray-800' : 'hover:bg-gray-50 dark:hover:bg-gray-800/50']"
                        @click="selectRange(range.duration)"
                        truncate/>
                </div>
                <DateRangePicker
                    :model-value="selected"
                    @update:model-value="(value: DatePickerRangeObject): void => {
                        getValue(value);
                        emits('update:model-value', value)
                    }"
                    @close="close"/>
            </div>
        </template>
    </LazyUPopover>
</template>

<script setup lang="ts">
import {
    DateRangePicker
} from '@/components/ui/';
import type { 
    InputSize,
    InputColor
} from '@nuxt/ui/dist/runtime/types';
import {
    sub,
    format,
    isSameDay,
    type Duration
} from 'date-fns';
import type {
    DatePickerRangeObject
} from 'v-calendar/dist/types/src/use/datePicker';

withDefaults(defineProps<{
    name: string,
    size?: InputSize,
    color?: InputColor,
}>(),{
    name: '',
    size: 'md',
    color: 'gray'
});

/**
 * Begin::Declare interface section
 */
interface Range
{
    label: string,
    duration: object
}

interface DateRange
{
    start: Date,
    end: Date
}
/**
 * End::Declare interface section
 */

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'update:model-value', date_range: DatePickerRangeObject): void;
}>();
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Declare variable section
 */
const ranges: Ref<Range[]> = ref<Range[]>([
    {
        label: 'Last 7 days',
        duration: {
            days: 7
        }
    },
    {
        label: 'Last 14 days',
        duration: {
            days: 14
        }
    },
    {
        label: 'Last 30 days',
        duration: {
            days: 30
        }
    },
    {
        label: 'Last 3 months',
        duration: {
            months: 3
        }
    },
    {
        label: 'Last 6 months',
        duration: {
            months: 6
        }
    },
    {
        label: 'Last year',
        duration: {
            years: 1
        }
    }
]);
const selected: Ref<DateRange> = ref<DateRange>({
    start: sub(new Date(), {
        days: 7
    }),
    end: new Date()
});
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const date: ComputedRef<string> = computed<string>(() => {
    const start = format(selected.value.start, 'd-MMM-yyy');
    const end = format(selected.value.end, 'd-MMM-yyy');
    return `${start} - ${end}`;
});

const isRangeSelected = (duration: Duration): boolean => {
    return isSameDay(selected.value.start, sub(new Date(), duration)) && isSameDay(selected.value.end, new Date());
}

const selectRange = (duration: Duration): void => {
    selected.value = {
        start: sub(new Date(), duration),
        end: new Date()
    }
}

const getValue = (value: DatePickerRangeObject | DateRange): void => {
    selected.value = value as DateRange;
}
/**
 * End::Some logical in this component
 */
</script>

<style lang="css">
.fixed-to-datepicker > div.group{
    position: fixed;
    margin-top: 6px;
}
</style>