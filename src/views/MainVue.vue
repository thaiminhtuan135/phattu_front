<script setup>
import AdminLayout from "@/components/Admin/AdminLayout.vue";
import Chart from 'chart.js/auto'
import {onMounted, ref} from "vue";
import 'chartjs-plugin-zoom';
import 'chartjs-plugin-dragdata';
import thongKeService from "@/service/thongKe";

let labels = [];
let resData = [];
const loadData = async () => {
  const res = await thongKeService.thongKePhatTu();
  if (res) {
    for (let i = 0; i < res[0].length; i++) {
      labels.push(res[0][i]);
    }
    for (let i = 0; i < res[1].length; i++) {
      resData.push(res[1][i]);
    }
  }


}

const myChartCanvas = ref(null);
const dataThongKePhatTu = {
  labels: labels,
  datasets: [
    {
      label: 'Số lần phật tử tham gia hoạt động',
      backgroundColor: 'rgb(187,79,18)',
      borderColor: 'rgb(187,79,18)',
      data: resData,
      pointStyle: 'circle',
      pointRadius: 7,
      pointHoverRadius: 15,
      borderWidth: 2,
    },
  ]
}

const config = {
  type: 'line',
  data: dataThongKePhatTu,
  options: {
    plugins: {
      title: {
        display: true,
        text: 'Custom Chart Title'
      }
    },
    aspectRatio: 5,
    scales: {
      x: {
        offset: true,
        grid: {
          drawBorder: false,
          color: 'rgb(187,79,18)',
        },

      },
      y: {
        beginAtZero: true,
        max: 20,
        grid: {
          drawBorder: false,
          color: 'rgb(187,79,18)',
        },
        ticks: {
          stepSize: 5,
          color: 'rgb(187,79,18)',
        },
      }
    },
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
  }
}

onMounted(async () => {
  await loadData();
  new Chart(myChartCanvas.value, config);
})
</script>
<template>
  <AdminLayout>
    <h2>Biểu đồ thông kê số lần tham gia hoạt động đạo tràng</h2>
    <div class="chartWrapper">
      <div class="chartAreaWrapper">
        <div class="chartAreaWrapper2">
          <canvas ref="myChartCanvas"></canvas>
        </div>
      </div>
    </div>
    <h2 class="mt-8">Biểu đồ thống kê hoạt động đạo tràng</h2>
  </AdminLayout>
</template>

<script>

</script>

<style scoped>
.chartWrapper {
  height: 650px;
  width: 100%;
  overflow-x: auto;
}

.chartAreaWrapper2 {
  width: 3000px; /* Adjust the width to fit your data */
}
</style>
