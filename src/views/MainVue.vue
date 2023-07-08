<script setup>
import AdminLayout from "@/components/Admin/AdminLayout.vue";
import Chart from 'chart.js/auto'
import {onMounted} from "vue";
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-dragdata';
const labels = [
  'Red',
  'Blue',
  'Yellow',
  'Green',
  'Purple',
  'Orange',
  'Orange',
  'Orange',
  'Orange',
  'Orange',
  'Orange',
  'Orange',
  'Orange',
];
const data = {
  labels: labels,
  datasets: [
    {
      label: 'My first data first',
      backgroundColor: 'rgb(187,79,18)',
      borderColor: 'rgb(187,79,18)',
      data: [10,20,30,40,50,60,40,12,24,20,2,50,12],
      pointStyle: 'circle',
      pointRadius: 10,
      pointHoverRadius: 15,
      // hoverBorderColor : 'rgb(96,210,17)'
      borderWidth: 2,


    },
    // {
    //   label: 'My first data second',
    //   backgroundColor: 'rgb(224,16,151)',
    //   borderColor: 'rgb(224,16,151)',
    //   data: [70,80,90,100,110,120],
    //   pointStyle: 'circle',
    //   pointRadius: 10,
    //   pointHoverRadius: 15
    // },
  ]
}

const config = {
  type: 'line',
  data: data,
  options: {
    plugins: {},
    responsive: true,
    scales: {
      x: {
        type: 'category',
        labels: labels
      },
      y: {
        beginAtZero: true
      }
    },
    aspectRatio: 3,
    animations: {
      radius: {
        duration: 400,
        easing: 'linear',
      }
    },
    hoverRadius: 12,
    hoverBackgroundColor: 'yellow',
    interaction: {
      mode: 'nearest',
      intersect: false,
      axis: 'x'
    },

  },
}

onMounted(() => {
  const myChart = new Chart(
    document.getElementById('myChart'),
    config
  );
})
</script>
<template>
  <AdminLayout>
    <canvas id="myChart"></canvas>
  </AdminLayout>
</template>

<script>

</script>

<style scoped>
</style>
