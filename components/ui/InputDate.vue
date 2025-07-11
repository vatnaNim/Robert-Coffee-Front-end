<template>
  <UPopover :popper="{ placement: 'auto' }">
    <UInput
      :color="color"
      :size="size"
      v-bind="filteredAttrs"
      :model-value="dateSelected"
      :placeholder="placeHolder"
      icon="mdi:calendar-multiselect-outline"
      class="w-full"
      :ui="{
        icon: {
          color: 'text-orange-500 dark:text-orange-500'
        }
      }"
    />
    <template #panel="{ close }">
      <VCalendarDatePicker
        v-model="date"
        v-bind="attrs"
        @close="close"
        :min-date="$attrs['min-date']"
        @dayclick="onDayClick"
      />
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import { DatePicker as VCalendarDatePicker } from 'v-calendar';
import type { DatePickerDate } from 'v-calendar/dist/types/src/use/datePicker';
import 'v-calendar/dist/style.css';
import { format } from 'date-fns';
import type { InputColor, InputSize } from '@nuxt/ui/dist/runtime/types';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    modelValue?: Date | null;
    placeHolder?: string;
    size?: InputSize;
    color?: InputColor;
  }>(),
  {
    modelValue: null,
    placeHolder: 'Please select date',
    size: 'md',
    color: 'amber',
  }
);

const emit = defineEmits<{
  (event: 'update:modelValue', value: Date): void;
  (event: 'close'): void;
}>();

const attrs = {
  transparent: true,
  borderless: true,
  color: 'blue',
  'is-dark': { selector: 'html', darkClass: 'dark' },
  'first-day-of-week': 2,
};

const selected = ref<Date>(props.modelValue ?? new Date());

watch(
  () => props.modelValue,
  (newVal) => {
    selected.value = newVal ?? new Date();
  },
  { immediate: true }
);

const date = computed<Date>({
  get: () => (selected.value instanceof Date ? selected.value : new Date()),
  set: (value: Date) => {
    selected.value = value;
    emit('update:modelValue', value);
    emit('close');
  },
});

const dateSelected = computed(() => {
  return selected.value instanceof Date ? format(selected.value, 'dd MMM, yyyy') : '';
});

const onDayClick = (_: any, event: MouseEvent) => {
  const target = event?.target as HTMLElement;
  target.blur();
};

const { 'min-date': minDateAttr, ...filteredAttrs } = useAttrs();
</script>

<style scoped>
/* your styles */
</style>
