<template>
    <p class="font-semibold font-size-p">
        Today Payment Status | Click Slice to Explode
    </p>
    <canvas 
        ref="ctx" 
        class="w-full max-w-md mx-auto" 
    />
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Chart, { type ChartItem } from 'chart.js/auto'
import type { VNodeRef } from 'vue'

const ctx: Ref<VNodeRef | null> = ref(null)

const pieData = ref({
  labels: [
    'School Aid',
    'Medical Aid',
    'Debt/Capital',
    'Elected Officials',
    'University',
    'Executive',
    'Other Local Assistance'
  ],
  datasets: [
    {
      label: 'State Operating Funds',
      data: [26, 20, 5, 3, 7, 17, 22],
      backgroundColor: [
        '#FF6384', '#FF9F40', '#FFCD56',
        '#4BC0C0', '#36A2EB', '#9966FF', '#C9CBCF'
      ],
      offset: [20, 0, 0, 0, 0, 0, 0] 
    }
  ]
})

let pieChart: Chart | null = null

onMounted(() => {
  if (ctx.value) {
    const context = ((ctx.value as unknown) as HTMLCanvasElement).getContext('2d') as ChartItem

    pieChart = new Chart(context, {
      type: 'pie',
      data: pieData.value,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'bottom'
          },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const label = pieData.value.labels?.[tooltipItem.dataIndex] || ''
                const value = pieData.value.datasets[0].data[tooltipItem.dataIndex]
                return `${label}: ${value}%`
              }
            }
          }
        },
        onClick: (_evt, activeEls) => {
          if (activeEls.length > 0) {
            const index = activeEls[0].index
            const offset = pieData.value.datasets[0].offset

            offset[index] = offset[index] === 20 ? 0 : 20
            pieData.value.datasets[0].offset = [...offset]
            pieChart?.update()
          }
        }
      }
    })
  }
})
</script>
