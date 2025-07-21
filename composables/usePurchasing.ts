
interface CartItem {
    id: number
    name: string
    price: number
    qty: number
    sugar?: string
    ice?: string
    remark?: string
}

const cartItems: Ref<CartItem[]> = ref<CartItem[]>([])

export function usePurchasing() {
    const totalQty = computed(() =>
        cartItems.value.reduce((total, item) => total + item.qty, 0)
    )

    const subTotal = computed(() =>
        cartItems.value.reduce((total, item) => total + item.price * item.qty, 0)
    )

    const totalPrice = computed(() => subTotal.value)

    return {
        cartItems,
        totalQty,
        subTotal,
        totalPrice
    }
}
