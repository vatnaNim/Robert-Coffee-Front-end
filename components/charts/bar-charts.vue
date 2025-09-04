<template>
    <p
        class="font-semibold font-size-p text-orange-500 dark:text-orange-500">Purchasing Data</p>
    <canvas
        ref="ctx"></canvas>
</template>

<script setup lang="ts">
import Chart, {
  type ChartItem
} from "chart.js/auto";
import type {
  VNodeRef
} from "vue";

/**
 * Begin::Declare variable section
 */
const ctx: Ref<VNodeRef | null> = ref<VNodeRef | null>(null);
const labels = [
  'Coffee',
  'Fapped',
  'Smooth',
  'Macha',
  'Food',
];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My First Dataset',
      data: [65, 59, 80, 81, 56, 55, 40, 94, 49, 34, 95, 78],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }
  ]
};
const options = {
  scales: {
    y: {
      beginAtZero: true
    }
  }
};
/**
 * End::Declare variable section
 */

onMounted(() => {
  if(ctx.value)
  {
    const context: CanvasRenderingContext2D = (ctx.value as unknown as HTMLCanvasElement).getContext('2d') as CanvasRenderingContext2D;
    new Chart(context as ChartItem,{
      type: 'bar',
      data: data,
      options: options
    });
  }
});
</script>