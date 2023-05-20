<template>
  <div>
    <h1>Informes</h1>

    <div class="report">
      <h2>Categoría más vendida</h2>
      <p>{{ traslateCategory(topCategory.category) }}</p>
    </div>

    <div class="report">
      <h2>Platillo más vendido</h2>
      <p>{{ topDish.name }}</p>
    </div>

    <div class="chart">
      <apexchart type="bar" :options="chartOptions" :series="chartSeries"/>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import VueApexCharts from 'vue3-apexcharts';

export default {
  name: "TopSelling",
  components: {
    apexchart: VueApexCharts
  },
  data() {
    return {
      topCategory: '',
      topDish: '',
      chartOptions: {
        chart: {
          id: 'vuechart-example'
        },
        theme: {
          mode: 'dark'
        },
        plotOptions: {
          bar: {
            distributed: true,
            colors: {
              ranges: [
                { from: 0, to: 1, color: '#ff0000' },
                { from: 2, to: 3, color: '#0000ff' }
              ]
            }
          }
        },
        xaxis: {
          categories: ['Categoría más vendida', 'Platillo más vendido']
        }
      },
      chartSeries: []
    };
  },methods:{
    traslateCategory(){
      const categoryTranslate = {
        'BREAKFAST': 'Desayuno',
        'LUNCH': 'Almuerzo',
        'OFFERT': 'Oferta',
        'DINNER': 'Cena',

      }
      return categoryTranslate[this.topCategory.category] || this.topCategory.category;
    }
  },
  async mounted() {
    try {
      const categoryResponse = await axios.get('/api/reports/top-category');
      this.topCategory = categoryResponse.data;

      const dishResponse = await axios.get('/api/reports/top-dish');
      this.topDish = dishResponse.data;

      this.chartSeries = [
        {
          name: 'Ventas',
          data: [this.topCategory.order_count, this.topDish.order_count]
        }
      ];
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
};
</script>

<style scoped>
.report {
  margin-bottom: 20px;
  color: #ddd;
}

h1, h2 {
  color: #ddd;  
}

.chart{
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 20px;  
}
</style>
