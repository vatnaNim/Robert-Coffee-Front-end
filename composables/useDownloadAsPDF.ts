import html2pdf from 'html2pdf.js'

export const usePrintAsPDF = (elementId: string, fileName = 'document.pdf') => {
    const element = document.getElementById(elementId)
    if (!element) {
        console.warn(`Element with ID "${elementId}" not found.`)
        return;
    }

    const opt: Partial<any> = {
        margin: 0.5,
        filename: fileName,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    }

    html2pdf().from(element).set(opt).save()
}
