export function useReceiptPrinting() {
    const STORAGE_KEY: string= 'receipt_printing_enabled';
    const PRINTER_CONFIRMED_KEY: string = 'printer_confirmed';
    const printerConfirmed: Ref<boolean> = ref<boolean>(false);
    const isReceiptPrintingEnabled: Ref<boolean> = ref<boolean>(false);

    if (typeof window !== 'undefined') 
    {
        const savedPrinting = localStorage.getItem(STORAGE_KEY);
        const savedConfirmed = localStorage.getItem(PRINTER_CONFIRMED_KEY);

        if (savedConfirmed !== null) {
        printerConfirmed.value = savedConfirmed === 'true'
        }

        if (printerConfirmed.value && savedPrinting !== null) {
        isReceiptPrintingEnabled.value = savedPrinting === 'true'
        } else {
        isReceiptPrintingEnabled.value = false
        }
    }

    const confirmPrinter = (connected: boolean) => {
        printerConfirmed.value = connected
        localStorage.setItem(PRINTER_CONFIRMED_KEY, connected.toString())
        if (connected && isReceiptPrintingEnabled.value === false) 
        {
            isReceiptPrintingEnabled.value = true;
            localStorage.setItem(STORAGE_KEY, 'true');
        }
    }

    const toggleReceiptPrinting = (val: boolean): void => {
        if (!printerConfirmed.value) 
        {
            alert('⚠️ Printer not confirmed, cannot toggle receipt printing.')
            console.warn('Printer not confirmed, cannot toggle printing.')
            return;
        }
        
        isReceiptPrintingEnabled.value = val;

        if (typeof window !== 'undefined') 
            {
            localStorage.setItem(STORAGE_KEY, val.toString())
        }
    }

    return {
        printerConfirmed,
        confirmPrinter,
        isReceiptPrintingEnabled,
        toggleReceiptPrinting,
    };
};
