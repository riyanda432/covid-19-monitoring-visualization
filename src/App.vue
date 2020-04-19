<template >
  
  <div id="app" >

      <Header  style="color:white" msg="Covid-19 Monitoring and Visualization"/>
    <div >
      <!-- <div>
         <router-link style="text-decoration:none" to="/world"> World</router-link> |
         <router-link style="text-decoration:none" to="/indonesia">Indonesia</router-link>
      </div> -->
     
      <router-view/>

      <div class="Chart">
         <Doughnut
        ref="skills_chart"
        :chart-data="datacollection"
        >
      </Doughnut>
      </div>
      
    </div>
  </div>
</template>

<script>
// import FixedHeader from 'vue-fixed-header'
import Header from './components/Header'
// import HelloWorld from './components/HelloWorld'

// import axios from 'axios'
// import Doughnut from './components/Doughnut'

// eslint-disable-next-line no-unused-vars
const options = {
  responsive: true, 
  maintainAspectRatio: false, 
  animation: {
    animateRotate: false
  }
}
export default {
  name: "App",
   components: {
    // FixedHeader,
    Header
  },
  // components: { HelloWorld ,Doughnut },
  mounted() {
    this.getDataAll();
   
  },
  data() {
    return {
      url:'https://corona.lmao.ninja/',
      datacollection:null,
      allCountry:[],
      countryName:[],
      country:[],
      corona:[],
      
    }
    
  },
  computed: {
      rows() {
        return this.items.length
      }
    },  
  methods: {
    fillData (a,b) {
        console.log("fd")
        this.datacollection = {
          labels: ["Deaths", "Recovered"],
          datasets: [
            {
              backgroundColor: ["#FA4349","#50B38F"],
              data: [a,b]
            }
          ]
        }
      },
  },

};
</script>

<style>

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 
}
.Chart{
  width: 60%;
  height: 60%;
  margin-left: 20%;
}



</style>
