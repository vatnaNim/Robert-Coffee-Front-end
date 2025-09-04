import type {
    Items
} from "@/models/type";

const prepareDateOfBirth = (formData: Items, key: string): Items => {
    const date: string = `${formData.day}-${formData.month}-${formData.year}`;
    
    ['day', 'month', 'year'].forEach((d: string): void => {
        delete formData[d];
    });
    formData[key] = date;
    return formData;
}

const extractDateOfBirth = (formData: Items, key: string): Items => {
    const monthMap: any = {
        'Jan': '01',
        'Feb': '02',
        'Mar': '03',
        'Apr': '04',
        'May': '05',
        'Jun': '06',
        'Jul': '07',
        'Aug': '08',
        'Sep': '09',
        'Oct': '10',
        'Nov': '11',
        'Dec': '12'
    };
    
    if(formData[key])
    {
        const [day, monthAbbr, year] = (formData[key] as string)?.split('-');
        const month = monthMap[monthAbbr as string];

        formData.day = day;
        formData.month = month;
        formData.year = year;
    }

    delete formData[key];
    return formData;
}

export
{
    prepareDateOfBirth,
    extractDateOfBirth
}