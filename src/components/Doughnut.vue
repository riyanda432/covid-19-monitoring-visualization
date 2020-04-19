<script>
import { Doughnut,mixins } from 'vue-chartjs'
// eslint-disable-next-line no-undef
const { reactiveProp } = mixins

export default {
  mixins: [reactiveProp],
  extends: Doughnut,
  props:['options'],
  methods: {
   
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
};
</script>
