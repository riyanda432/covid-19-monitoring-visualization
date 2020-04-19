<template>
  <div>
      <router-link  class ="router"  to="/world"> World</router-link>  |
      <router-link  class ="router"  to="/indonesia">Indonesia</router-link>  |
    <h2> Data in the world</h2>
    <b-container class="cardContainer">
      <b-row>
        <b-col >
          <b-card
            title="Total Deaths"
            tag="article"
            style="max-width: 20rem;"
            class="deaths"
          >
            <b-card-text style="color:white">
              {{data.deaths}}
            </b-card-text>
          </b-card>
        </b-col>
        <b-col >
          <b-card
            title="Total Recovered"
            tag="article"
            style="max-width: 20rem;"
            class="recovered"
          > 
            <b-card-text style="color:white">
              {{data.recovered}}
            </b-card-text>
          </b-card>
        </b-col>
        <b-col >
              <b-card
            title="Total Positive Cases"
            tag="article"
            style="max-width: 20rem;"
            class="positive-cases"
          >
            <b-card-text style="color:white">
              {{data.cases}}
            </b-card-text>
          </b-card>    
        </b-col>
      </b-row>
    </b-container>
      
    <b-container style="margin-top:9%;">
      <b-row>
        <b-col>
          <div >
            <Doughnut
              ref="skills_chart"
              :chart-data="datacollection"
            >
            </Doughnut>
          </div>
        </b-col>
        <b-col>
          <div >
          </div>
        </b-col>
      </b-row>
    </b-container>  

    <b-container style="margin-top:9%;">
      <b-row>
        <b-col>
          <div>
              <GChart
                type="GeoChart"
                :data="topw2"
                :options="chartOptions"
              />
          </div>
        </b-col>
         
        <b-col>        
          <div>
             <line-chart
              :chart-data="dataw"
            >
            </line-chart>
          </div>  
        </b-col>
      </b-row>
    </b-container>    

    <form class="form-inline active-pink-2 mt-2" >
      <input class="form-control w-25" type="text" placeholder="Search By Country ..."
        aria-label="Search" v-model="search">
      <i class="fas fa-search" aria-hidden="true"></i>
    </form>

      <div class="tables" style="overflow-x:auto;">
        <table>
          <tr style="background-color:#266EB3;">
            <th style="color:white">Country </th>
            <th style="color:white">Cases</th>
            <th style="color:white">Deaths</th>
            <th style="color:white">Recovered</th>
            <th style="color:white">Today Deaths</th>
          </tr>
          <tr v-for="index in filterCountry" :key="index.id">
            <td> <img height="20" width="20" v-bind:src="`${index.countryInfo.flag}`">
                {{index.country}}
            </td>
            <td>{{index.cases}}</td>
            <td style="background-color:#FF7D6E;">{{index.deaths}}</td>
            <td style="background-color:#6ECCAE;">{{index.recovered}}</td>
            <td>{{index.todayDeaths}}</td>
          </tr>       
        </table>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import Doughnut from './Doughnut'
import LineChart from './LineChart'
import { GChart } from 'vue-google-charts'

export default {
  name:"WorldChart",
  components:{
    Doughnut,
    GChart,
    LineChart,
  },
  mounted(){
      this.getAllCountry() 
      this.getAllData() 
      this.getHistoricalData()
  },
  data(){
      return{
        historical:[],
        sorts:[],
        case:[],
        topw:[],
        topw2:[
          ['Country', 'Positive COVID-19'],
        ],
        dateHistorical:[],
        search:'',
        data:[],
        
        dataGeo: [
          ['Country', 'Positive COVID-19'],
         
      ],
      chartOptions: {
        chart: {
        },
        sizeAxis: { minValue: 0, maxValue: 100 },
        colorAxis: {colors: ['#FCFF7A', 'red']} 

      },
        allCountry:[],
        corona:[],
        dataw:null,
        datacollection:null,
        datacollections:null,

        url:'https://corona.lmao.ninja/v2/'
      }
  },
  computed:{
    filterCountry:function(){
      return this.corona.filter((item)=>{
          return item.country.toLowerCase().includes(this.search)
      });
    },

  },

  methods:{
    fillGeoChart(dataGeox){
      dataGeox = []
      this.dataGeo = dataGeox
    },  
    topFives(dataGeo,sorts,topw){
      for(var i =1; i<dataGeo.length; i++) {
        sorts.push([dataGeo[i][0],dataGeo[i][1]])
        sorts.sort(function(a,b){
            return b[1]-a[1]
        })
      }
        topw = sorts.slice(0,20)  
        topw.forEach(aa=>{
          this.topw2.push(aa)
        })

    },
    fillLineChart (dataCase,dateCase) {
        this.dataw= {
          datasets: [{
              label: 'Positive Covid-19',
              backgroundColor	:["#FA4349"],
              data: dataCase,
              borderColor: ["#0CE88C"],
              fill:false,
              spanGaps:true
          }],
          labels: dateCase
      }
    },
    fillDoughnutChart (a,b) {
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
    async getAllData(){

      axios.get(this.url + 'all/')
      .then(response => {
      this.data = response.data
        this.fillDoughnutChart(this.data.deaths,this.data.recovered)
      })
      .catch(err => {
        console.log(err)
      })
    },
    async getHistoricalData(){
    
      axios.get(this.url + 'historical/indonesia/').then(response =>{
        this.historical = response.data
        this.dateHistorical = Object.keys(this.historical.timeline.cases)
        this.cases = Object.values(this.historical.timeline.cases)
        this.fillLineChart(this.cases,this.dateHistorical)
      }).catch(error=>{
        console.log(error)
      })
    },
    async getAllCountry(){
      axios.get(this.url + 'countries').then(response=>{
          this.allCountry = response.data
          console.log("allCountry",this.allCountry)
          this.allCountry.forEach(element =>{
            this.corona.push(element)
            this.dataGeo.push([element.country,element.cases])
          })
          this.topFives(this.dataGeo,this.sorts,this.topw)

      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.search-input{
  margin-top: 3%;
}
.active-pink-2 input.form-control[type=text]:focus:not([readonly]) {
  border-bottom: 1px solid #f48fb1;
  border-color: #f48fb1;

}

.active-pink-2 input[type=text]:focus:not([readonly]) {
  border-bottom: 1px solid #f48fb1;
  box-shadow: 0 1px 0 0 #f48fb1;
}
.active-pink .fa, .active-pink-2 .fa {
  color: #f48fb1;

}
.form-control{
  margin-top: 5%;
  margin-left: 11.5%;
  box-shadow: 0 1px 0 0 #f48fb1;
  border-bottom: 1px solid #f48fb1;
  /* border-color: #f48fb1; */

}
tr:hover{
    opacity: 0.9;
    color:palevioletred;
    
}
.tables{
  margin-top: 1%;
  background-color:white;
  padding: 30px;
  width: 77%;
  margin-left: 11.5%;
  border-radius: 5px;
  box-shadow: 1px 1px 5px 1px rosybrown;
}
table {
  font-family: arial, sans-serif;
  width: 100%;
  padding: 12%;
}
td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
.cardContainer{
  width: 80%;
  border-style: none;
  
}
.deaths{
  background-image: linear-gradient(to right, #e53935 , #e35d5b);
  font-style:initial;
  color: white;
    margin: 1%;
}
.deaths:hover{
  opacity: 0.9;
  transform: scale(1.1);
}
.recovered{
  background-image: linear-gradient(to right, #02AAB0 , #00CDAC);
  color: white;
  margin: 1%;
}
.recovered:hover{
  opacity: 0.9;
  transform: scale(1.1);
}
.positive-cases{
  background-image: linear-gradient(to right,   #ffb347 , #ffcc33);
  color: white;
  margin: 1%;
}
.positive-cases:hover{
  opacity: 0.9;
  transform: scale(1.1);
}
.text-align{
  text-align: left;
  margin-left: 15%;
}
</style>