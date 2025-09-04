import {
    Alert
} from "../dialog";
import type {
    DatePickerRangeObject
} from 'v-calendar/dist/types/src/use/datePicker';

interface DateRange
{
    start: string;
    end: string;
}

const formatDate = (dateString: Date): string => {
    const date: Date = new Date(dateString);
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');

    return `${day}-${month}-${year}`;
}

const getDateRange = (dateRange: string | DatePickerRangeObject): DateRange => {
    if(typeof dateRange === "string")
    {
        const regex: RegExp = /(\d{1,2}-[A-Za-z]{3}-\d{4})\s*-\s*(\d{1,2}-[A-Za-z]{3}-\d{4})/;
        const match: RegExpMatchArray | null = dateRange.match(regex);
        if(match)
        {
            const result: DateRange = {
                start: match[1],
                end: match[2]
            };
            return result;
        }
        else
        {
            Alert('No valid date range found!!!', 'error');
            return {
                start: '',
                end: ''
            } as DateRange;
        }
    }
    else if(typeof dateRange === 'object')
    {
        return {
            start: formatDate(dateRange?.start as Date),
            end: formatDate(dateRange.end as Date)
        } as DateRange;
    }
    else
    {
        Alert('No valid date range found!!!', 'error');
        return {
            start: '',
            end: ''
        } as DateRange;
    }
}

export default getDateRange;