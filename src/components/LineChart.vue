<script>
import { Line,mixins } from 'vue-chartjs'
// eslint-disable-next-line no-undef
const { reactiveProp } = mixins

export default {
  mixins: [reactiveProp],
  extends: Line,
  props:['options'],
  methods: {
      
  },
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
};
</script>
