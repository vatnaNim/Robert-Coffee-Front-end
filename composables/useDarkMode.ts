const darkColor: Ref<boolean> = ref<boolean>(false); 

export function useDarkMode() {
    const updateHtmlClass = (dark: boolean): void => {
        document.documentElement.classList.toggle('dark', dark);
    };

    const toggle = (): void => {
        darkColor.value = !darkColor.value;
    };

    onMounted((): void => {
        const saved = localStorage.getItem('theme');
        darkColor.value = saved === 'dark';
        updateHtmlClass(darkColor.value);
    });

    watch(darkColor, (val): void => {
        updateHtmlClass(val);
        localStorage.setItem('theme', val ? 'dark' : 'light');
    });

    return { darkColor, toggle };
}
