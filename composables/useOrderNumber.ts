export function useOrderNumber() {
    const orderNumber: Ref<number> = ref<number>(0);

    function generateOrderNumber(): number {
        orderNumber.value++;
        if (orderNumber.value > 100) {
        orderNumber.value = 1;
        }
        return orderNumber.value;
    }

    return {
        orderNumber,
        generateOrderNumber,
    };
}
