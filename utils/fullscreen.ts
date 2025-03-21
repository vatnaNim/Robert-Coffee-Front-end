const handleRequestFullscreen = async (): Promise<void> => {
    const body: HTMLBodyElement = document.body as HTMLBodyElement;
    if(await body.requestFullscreen){
        body.requestFullscreen();
    }
    // @ts-ignore
    else if(await _container.mozRequestFullScreen){
        // @ts-ignore
        body.mozRequestFullScreen();
    }
    // @ts-ignore
    else if(await body.webkitRequestFullscreen){
        // @ts-ignore
        body.webkitRequestFullscreen();
    }
    // @ts-ignore
    else if(body.msRequestFullscreen){
        // @ts-ignore
        body.msRequestFullscreen();
    }
}

const handleExitFullscreen = (): void => {
    if(document.exitFullscreen){
        document.exitFullscreen();
    }
    // @ts-ignore
    else if(document.mozCancelFullScreen){
        // @ts-ignore
        document.mozCancelFullScreen();
    }
    // @ts-ignore
    else if(document.webkitExitFullscreen){
        // @ts-ignore
        document.webkitExitFullscreen();
    }
    // @ts-ignore
    else if(document.msExitFullscreen){
        // @ts-ignore
        document.msExitFullscreen();
    }
}

const toggleFullscreen = async (): Promise<void> => {
    // @ts-ignore
    if(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement){
        handleExitFullscreen();
    }
    else{
        await handleRequestFullscreen();
    }
}

export default toggleFullscreen;