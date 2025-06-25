export function useCashDrawer() {
    const STORAGE_KEY = 'cash_drawer_open';
    const isDrawerOpen = ref<boolean>(false);
    const isEnabled = ref<boolean>(false);

    onMounted(() => {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved !== null) 
        {
            isDrawerOpen.value = saved === 'true';
            isEnabled.value = true;
        };
    });

    const toggleDrawer = (val: boolean): void => {
        if (!isEnabled.value) {
            return;
        };

        isDrawerOpen.value = val;
        localStorage.setItem(STORAGE_KEY, val.toString());
    };

    return {
        isDrawerOpen,
        toggleDrawer,
        isEnabled,
    }
}
