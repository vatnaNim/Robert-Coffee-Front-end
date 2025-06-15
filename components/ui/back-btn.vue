<template>
    <button
        class="text-center rounded-md relative text-black font-semibold group "
        :class="btnClass"
        type="button">
        <div
            class="rounded-sm h-[80%] w-[30%] flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[90%] z-10 duration-300"
            :class="iconContainer">
            <LazyUIcon
                size="md"
                :name="icon"
                :class="iconClass"
            />
        </div>
        <p class="translate-x-2 text-black dark:text-gray-200">{{ name }}</p>
    </button>
</template>
  
<script lang="ts" setup>
  withDefaults(
    defineProps<{
      name: string;
      iconSize?: string;
      icon?: string;
      iconClass?: string;
      btnClass?: string;
      iconContainer?: string;
    }>(),
    {
      name: 'Back',
      icon: 'famicons:chevron-back-outline',
      iconSize: 'md',
      iconClass: 'text-black',
      btnClass: 'bg-red-400 py-2 px-8',
      iconContainer: 'bg-green-400 text-xl',
    }
  );
</script>
  