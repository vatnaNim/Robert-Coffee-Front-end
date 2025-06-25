<template>
    <div
        class="relative w-full h-full border border-solid border-gray-300 rounded-md">
        <img
            v-if="image"
            :src="image"
            alt="photo"
            class="w-full h-full object-scale-down"
            loading="lazy"/>
        <div
            v-else
            class="flex items-center justify-center w-full h-full cursor-pointer"
            @click="(): void => {
                handleChooseImage();
            }">
            <LazyUIcon
                name="material-symbols:imagesmode-outline"
                class="text-gray-500 text-4xl"/>
        </div>
        <LazyUButton
            v-if="image"
            type="button"
            color="red"
            variant="link"
            size="sm"
            :padded="false"
            icon="clarity:remove-solid"
            class="absolute top-0.5 right-0.5"
            @click="(): void => {
                emits('update:model-value', '');
            }"
            square/>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    modelValue?: string;
}>(),{
    modelValue: ''
});

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'update:model-value', value: string): void;
}>();
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Some logical in this component
 */
const image: ComputedRef<string> = computed<string>({
    get: (): string => props.modelValue,
    set: (value: string): void => {
        emits('update:model-value', value);
    }
});

const handleChooseImage = (): void => {
    const inputFile: HTMLInputElement = document?.createElement('input') as HTMLInputElement;
    inputFile.type = 'file';
    inputFile.accept = 'image/*';
    inputFile.onchange = (event: Event): void => {
        const input: HTMLInputElement = event?.target as HTMLInputElement;
        const file: File | null = input?.files ? input?.files[0] : null;
        const reader: FileReader = new FileReader();
        if(file){
            reader.onloadend = (): void => {
                const base64: string | ArrayBuffer | null = reader?.result;
                emits('update:model-value', base64 as string);
                inputFile?.remove();
            }
            reader?.readAsDataURL(file);
        }
    }
    inputFile?.click();
}
/**
 * End::Some logical in this component
 */
</script>