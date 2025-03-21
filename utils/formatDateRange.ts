import type {
    DatePickerDate,
    DatePickerRangeObject
} from "v-calendar/dist/types/src/use/datePicker";

const formatDateRange = (dateRange: DatePickerRangeObject | null) => {
    const formatDate = (isoString: DatePickerDate): string => {
        return isoString instanceof Date ? isoString.toISOString().split('T')[0].split('-').reverse().join('-') : '';
    }

    return {
        start: dateRange ? formatDate(dateRange.start) : '',
        end: dateRange ? formatDate(dateRange.end) : ''
    };
}

export default formatDateRange;