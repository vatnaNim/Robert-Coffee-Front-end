<template>
    <div
        class="block relative">
        <template
            v-if="($attrs.custom as boolean)">
            <template v-for="(item, index) in (($attrs.data as any)?.data || [])" :key="index">
                <slot :data="item" :index="index"></slot>
            </template>
        </template>
        <template
            v-else>
            <LazyUTable
                v-bind="filteredAttrs"
                :loading="($attrs.loading as boolean)"
                :rows="($attrs.data as any)?.data">
                <template v-for="(slotFn, slotName) in $slots" #[slotName]="slotProps">
                    <component :is="slotFn" v-bind="slotProps"/>
                </template>
            </LazyUTable>
        </template>
        <div
            v-if="Boolean(($attrs.data as any)?.total_page > 1)"
            class="flex flex-wrap justify-between items-center">
            <p
                class="text-sm leading-5">Showing 1 to {{ ($attrs.data as any).per_page }} of {{ ($attrs.data as any).total }} records</p>
            <LazyUPagination
                v-model="page"
                :max="5"
                :page-count="($attrs.data as any)?.per_page"
                :total="Number(($attrs.data as any)?.total || 0)"
                @update:model-value="(value: number): void => {
                    emits('update:model-value', value);
                }"
                :ui="{
                    wrapper: 'flex items-center gap-1',
                    rounded: '!rounded-full min-w-[32px] justify-center'
                }"
                show-first
                show-last/>
        </div>
    </div>
</template>

<script setup lang="ts">
defineOptions({
    inheritAttrs: false
});

/**
 * Begin::Declare variable section
 */
const page: Ref<number> = ref<number>((useAttrs().data as any)?.page_no || 1);
/**
 * End::Declare variable section
 */

/**
 * Begin::Set event trigger to parent component
 */
const emits = defineEmits<{
    (event: 'update:model-value', value: number): void;
}>();
/**
 * End::Set event trigger to parent component
 */

/**
 * Begin::Except attributes in $attrs
 */
const { data: dataAttr, loading: loadingAttr, custom: customAttr ,...filteredAttrs } = useAttrs();
/**
 * End::Except attributes in $attrs
 */
</script>