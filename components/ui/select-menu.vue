<template>
    <div
        class="relative group"
        :class="($attrs.class || 'w-full')">
        <LazyUSelectMenu
            v-bind="filteredAttrs"
            :options="($attrs.options as object[])"
            :ui="{
                icon: {
                    trailing: {
                        wrapper: 'flex group-hover:hidden'
                    }
                }
            }"
            :loading="($attrs.loading as boolean)"
            v-model="selected"
            :required="required"/>
        <LazyUButton
            v-if="selected"
            type="button"
            color="red"
            variant="link"
            :padded="false"
            icon="gravity-ui:circle-xmark"
            class="absolute top-0 right-2 translate-y-1/3 hidden group-hover:block"
            @click="(): void => {
                emits('update:model-value', '');
            }"
            square/>
    </div>
</template>

<script lang="ts" setup>
import type { Items } from '@/models/type';


defineOptions({
    inheritAttrs: false
});

const props = withDefaults(defineProps<{
    modelValue?: any;
    required?: boolean;
}>(),{
    modelValue: null,
    required: false
});

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'update:model-value', value: string | Items | any): void;
}>();
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Except attributes in $attrs
 */
const { class: classAttr, ...filteredAttrs } = useAttrs();
/**
 * End::Except attributes in $attrs
 */

/**
 * Begin::Some logical in this component
 */
const selected: ComputedRef<string> = computed<string>({
    get: (): string => props.modelValue,
    set: (value: string): void => {
        emits('update:model-value', value);
    }
});
/**
 * End::Some logical in this component
 */
</script>