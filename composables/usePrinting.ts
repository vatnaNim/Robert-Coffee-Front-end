// composables/usePrintComponentById.ts

export const usePrinting = (elementId: string) => {
    const element = document.getElementById(elementId)
    if (!element) {
        console.warn(`Element with ID "${elementId}" not found.`)
        return;
    }

    const printWindow = window.open('', '_blank', 'width=800,height=600')
    if (!printWindow) {
        console.error('Unable to open print window.')
        return;
    }

    printWindow.document.write(`
    <html>
        <head>
        <title>Print Preview</title>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        <style>
            body {
            font-family: sans-serif;
            padding: 20px;
            }
            @media print {
            body {
                margin: 0;
                padding: 0;
            }
            }
        </style>
        </head>
        <body>
        ${element.innerHTML}
        </body>
    </html>
    `);
    
    printWindow.document.close()
    printWindow.focus()
    setTimeout(() => {
        printWindow.print()
        printWindow.close()
    }, 500);
}
