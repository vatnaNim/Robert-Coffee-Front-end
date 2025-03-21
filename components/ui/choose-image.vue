<template>
    <input
        ref="input"
        type="file"
        :name="String(name)"
        :accept="String(accept)"
        class="data-input absolute h-0.5 w-0.5 -z-10 outline-none overflow-hidden m-0 p-0 bg-transparent border-0"
        :tabindex="0"
        :data-image="String(image)"
        role="input"
        :required="(required as boolean)"/>
    <div
        role="image"
        @drop.prevent="(event: Event): void => {
            handleDrop(event);
        }"
        @paste.prevent="(event: Event): void => {
            handlePaste(event as ClipboardEvent);
        }"
        @mouseenter="(event: Event): void => {
            const target: HTMLDivElement = (event.target as HTMLElement).closest('[role=\'image\']') as HTMLDivElement;
            if(target)
            {
                target.contentEditable = 'true';
            }
        }"
        @mouseleave="(event: Event): void => {
            const target: HTMLDivElement = (event.target as HTMLElement).closest('[role=\'image\']') as HTMLDivElement;
            if(target)
            {
                target.contentEditable = 'false';
            }
        }"
        @input.prevent
        @dragover.prevent
        @keydown.prevent
        class="relative w-full h-full focus:outline-none">
        <div
            v-if="(!image)"
            @click="(): void => {
                triggerClick();
            }"
            class="flex items-center justify-center w-full h-full relative cursor-pointer">
            <img
                :src="Upload"
                alt="add photo"
                loading="lazy"
                class="w-8 h-8"/>
        </div>
        <div
            v-else
            class="relative w-full h-full">
            <img
                :src="String(image)"
                alt="photo"
                loading="lazy"
                class="data-set w-full h-full object-scale-down"/>
            <div
                @click="(): void => {
                    resetFile();
                }"
                class="absolute top-0 right-0 bg-gray-200 p-1 cursor-pointer">
                <Reset/>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import {
    Reset
} from "@/components/icons/";
import { Upload } from "@/assets/images";
import type {
    VNodeRef
} from "vue";

const props = withDefaults(defineProps<{
    modelValue?: string;
    name: string;
    accept?: string;
    required?: boolean
}>(),{
    name: '',
    accept: 'image/*',
    required: false,
    modelValue: ''
});

/**
 * Begin::Declare variable section
 */
const image: Ref<string | ArrayBuffer | any> = ref('');
const input: Ref<VNodeRef | null> = ref<VNodeRef | null>(null);
/**
 * End::Declare variable section
 */

/**
 * Begin::Some logical in this component
 */
const handleFile = (file: File | undefined): void => {
    if(file)
    {
        const reader: FileReader = new FileReader();
        reader.onload = (): void => {
            image.value = reader.result || '';
        }
        reader.readAsDataURL(file);
    }
}

const triggerClick = (): void => {
    const inputElement: HTMLInputElement = (input.value as unknown) as HTMLInputElement;

    if(inputElement)
    {
        inputElement.onchange = (event: Event): void => {
            const file: File | undefined = (event.target as HTMLInputElement)?.files?.[0];
            handleFile(file as File);
        }
        inputElement?.click();
    }
}

const handleDrop = (event: Event): void => {
    const droppedFiles = (event as DragEvent).dataTransfer?.files;

    if(droppedFiles && droppedFiles.length > 0)
    {
        const file: File | undefined = droppedFiles[0];
        if(file) setFileToInput(file);
        handleFile(file);
    }
}

const handlePaste = async (event: ClipboardEvent): Promise<void> => {
    const items = event.clipboardData?.items;
    

    for(const item of (items || []))
    {
        if(item.type.indexOf('image') !== -1)
        {
            const file: File | null = item?.getAsFile();
            if(file) setFileToInput(file);
            handleFile(file as File);
        }
    }
}

const setFileToInput = (file: File): void => {
    const inputElement: HTMLInputElement = (input?.value as unknown) as HTMLInputElement;
    const dataTransfer = new DataTransfer();
    dataTransfer?.items?.add(file);
    inputElement.files = dataTransfer?.files;
    inputElement?.dispatchEvent(new Event('change', {
        bubbles: true,
        cancelable: true,
        composed: true
    }));
}

const resetFile = (): void => {
    const inputElement: HTMLInputElement | null = input.value as HTMLInputElement | null;

    if(inputElement)
    {
        inputElement.value = '';
    }
    image.value = null;
}

watch((): string => props.modelValue, (value: string): void => {
    if((value != null) && (value != undefined) && (value != '')){
        image.value = value;
    }
},{
    immediate: true
});
/**
 * End::Some logical in this component
 */
</script>
