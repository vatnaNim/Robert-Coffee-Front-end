<template>
	<UPopover
		:popper="{
			placement: 'auto'
		}">
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
import { 
	DatePicker as VCalendarDatePicker } from 'v-calendar';
import type { 
	DatePickerDate 
} from 'v-calendar/dist/types/src/use/datePicker';
import 'v-calendar/dist/style.css';
import { format } from 'date-fns';
import type { 
	InputColor, 
	InputSize 
} from '@nuxt/ui/dist/runtime/types';

defineOptions({ inheritAttrs: false });

const props = withDefaults(defineProps<{
	modelValue?: DatePickerDate | null;
	placeHolder?: string;
	size?: InputSize;
	color?: InputColor;
}>(), {
	modelValue: null,
	placeHolder: 'Please select date',
	size:'md',
	color: 'amber'
});

const emit = defineEmits<{
	(event: 'update:model-value', value: DatePickerDate): void;
	(event: 'close'): void;
}>();

const attrs = {
	transparent: true,
	borderless: true,
	color: 'blue',
	'is-dark': { selector: 'html', darkClass: 'dark' },
	'first-day-of-week': 2
};

const selected: Ref<DatePickerDate> = ref<DatePickerDate>(props.modelValue ?? new Date());

watch(() => props.modelValue, (newVal) => {
	selected.value = newVal ?? new Date();
}, { immediate: true });

const date: ComputedRef<DatePickerDate> = computed<DatePickerDate>({
	get: (): DatePickerDate => selected.value ?? new Date(),
	set: (value: DatePickerDate): void => {
		selected.value = value;
		emit('update:model-value', value);
		emit('close');
	}
});

const dateSelected: ComputedRef<string> = computed<string>((): string => {
	return selected.value instanceof Date ? format(selected.value, 'dd MMM, yyyy') : format(new Date(), 'dd MMM, yyyy');
});

const onDayClick = (_: any, event: MouseEvent): void => {
	const target: HTMLElement = event?.target as HTMLElement;
	target.blur();
};

const { 'min-date': minDateAttr, ...filteredAttrs } = useAttrs();
</script>

<style lang="css" scoped>
:root {
  --vc-gray-50: rgb(var(--color-gray-50));
  --vc-gray-100: rgb(var(--color-gray-100));
  --vc-gray-200: rgb(var(--color-gray-200));
  --vc-gray-300: rgb(var(--color-gray-300));
  --vc-gray-400: rgb(var(--color-gray-400));
  --vc-gray-500: rgb(var(--color-gray-500));
  --vc-gray-600: rgb(var(--color-gray-600));
  --vc-gray-700: rgb(var(--color-gray-700));
  --vc-gray-800: rgb(var(--color-gray-800));
  --vc-gray-900: rgb(var(--color-gray-900));
}

.vc-primary {
  --vc-accent-50: rgb(var(--color-primary-50));
  --vc-accent-100: rgb(var(--color-primary-100));
  --vc-accent-200: rgb(var(--color-primary-200));
  --vc-accent-300: rgb(var(--color-primary-300));
  --vc-accent-400: rgb(var(--color-primary-400));
  --vc-accent-500: rgb(var(--color-primary-500));
  --vc-accent-600: rgb(var(--color-primary-600));
  --vc-accent-700: rgb(var(--color-primary-700));
  --vc-accent-800: rgb(var(--color-primary-800));
  --vc-accent-900: rgb(var(--color-primary-900));
}
</style>
