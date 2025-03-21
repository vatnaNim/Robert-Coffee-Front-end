<template>
    <img
        ref="smallImgRef"
        @mouseenter="updatePosition"
        @mouseleave="fullViewImage = false"
        class="object-scale-down cursor-pointer hover:shadow-md"
        :class="[smallSize, base]"
        :src="scr"
        alt="small images"
    />
    <div
        v-if="fullViewImage"
        :class="container"
        class="fixed bg-white shadow-md flex items-center justify-center rounded-md border border-gray-300 z-20"
        :style="bigImagePosition">
        <img
            class="w-full h-full object-scale-down"
            :src="scr"
            alt="Full Image"
        />
    </div>
</template>

<script lang="ts" setup>
import type { 
    Items 
} from '@/models/type';

const props = withDefaults(
    defineProps<{
        scr: string | undefined;
        smallSize: string;
        container: string;
        popper:  { placement: 'right' | 'left' | 'top' | 'bottom' }; 
        base: string;
        containerWidth: number;
        containerHeight: number;
    }>(),
    {
        scr: '',
        smallSize: 'w-32 h-32',
        container: 'w-[250px] h-[250px]',
        base: 'shadow-sm',
        containerWidth: 150, 
        containerHeight: 150 
    }
);

const fullViewImage: Ref<boolean> = ref<boolean>(false);
const smallImgRef: Ref<HTMLElement | null> = ref<HTMLElement | null>(null);
const bigImagePosition: Ref<Items> = ref<Items>({ left: '0px', top: '0px' });

const updatePosition = (): void => {
    if (smallImgRef.value) {
        const smallRect = smallImgRef.value.getBoundingClientRect();
        const containerWidth = props.containerWidth;
        const containerHeight = props.containerHeight;

        let leftPosition = 0;
        let topPosition = 0;

        switch (props.popper.placement) {
            case 'right':
                leftPosition = smallRect.left + smallRect.width + 10; 
                topPosition = smallRect.top + (smallRect.height - containerHeight) / 2; 
                break;
            case 'left':
                leftPosition = smallRect.left - containerWidth - 10; 
                topPosition = smallRect.top + (smallRect.height - containerHeight) / 2; 
                break;
            case 'top':
                leftPosition = smallRect.left + (smallRect.width - containerWidth) / 2; 
                topPosition = smallRect.top - containerHeight - 10; 
                break;
            case 'bottom':
                leftPosition = smallRect.left + (smallRect.width - containerWidth) / 2;
                topPosition = smallRect.top + smallRect.height + 10; 
                break;
        }
        bigImagePosition.value = {
            left: `${leftPosition}px`,
            top: `${topPosition}px`
        };
        fullViewImage.value = true;
    }
};

onMounted((): void => {
    fullViewImage.value = false;
});
</script>
