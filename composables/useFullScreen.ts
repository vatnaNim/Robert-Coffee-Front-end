const isFullscreen: Ref<boolean> = ref<boolean>(false);

export function useFullscreen() {
    const toggleFullscreen = async (): Promise<void> => {
        if (
        document.fullscreenElement ||
        // @ts-ignore
        document.webkitFullscreenElement ||
        // @ts-ignore
        document.mozFullScreenElement ||
        // @ts-ignore
        document.msFullscreenElement
        ) 
        {
            handleExitFullscreen()
            isFullscreen.value = false
        } 
        else 
        {
            await handleRequestFullscreen()
            isFullscreen.value = true
        }
    }

    const handleRequestFullscreen = async (): Promise<void> => {
        const body = document.body as HTMLBodyElement

        if (body.requestFullscreen) {
            await body.requestFullscreen()
            return
            }
            // @ts-ignore
            if (body.mozRequestFullScreen) {
            // @ts-ignore
            body.mozRequestFullScreen()
            }
            // @ts-ignore
            else if (body.webkitRequestFullscreen) {
            // @ts-ignore
            body.webkitRequestFullscreen()
            }
            // @ts-ignore
            else if (body.msRequestFullscreen) {
            // @ts-ignore
            body.msRequestFullscreen()
        }
    }

    const handleExitFullscreen = (): void => {
        if (document.exitFullscreen) 
        {
            document.exitFullscreen()
            }
            // @ts-ignore
            else if (document.mozCancelFullScreen) {
            // @ts-ignore
            document.mozCancelFullScreen()
            }
            // @ts-ignore
            else if (document.webkitExitFullscreen) {
            // @ts-ignore
            document.webkitExitFullscreen()
            }
            // @ts-ignore
            else if (document.msExitFullscreen) {
            // @ts-ignore
            document.msExitFullscreen()
        }
    }

    const checkFullscreen = async (): Promise<void> => {
        if (
            document.fullscreenElement ||
            // @ts-ignore
            document.webkitFullscreenElement ||
            // @ts-ignore
            document.mozFullScreenElement ||
            // @ts-ignore
            document.msFullscreenElement
            ) {
            isFullscreen.value = true
        } else {
            isFullscreen.value = false
        }
    }

    onMounted(async (): Promise<void> => {
        await checkFullscreen()
    })

    return {
        isFullscreen,
        toggleFullscreen,
        checkFullscreen,
    }
}
