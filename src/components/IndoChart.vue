<template>
  <div>
    <router-link class = "router" to="/world"> World</router-link>  |
    <router-link class = "router" to="/indonesia">Indonesia</router-link>  |
    <h2> Data in Indonesia</h2>
    <b-container v-if="loading === true">
      <b-spinner style="width: 14rem; height: 14rem;" 
                variant="warning"
                type="grow"
            ></b-spinner>
    </b-container>

    <b-container v-else class="cardContainer">
      <b-row>
      <b-col >
        <b-card
          title="Total Deaths"
          tag="article"
          style="max-width: 20rem;"
          class="deaths"
        >
          <b-card-text>
            {{data[0].meninggal}}
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
          <b-card-text>
            {{data[0].sembuh}}
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
          <b-card-text>
            {{data[0].positif}}
          </b-card-text>
        </b-card>  
      </b-col>    
    </b-row>
  </b-container>

  <b-container v-if="loading === true">
      <b-spinner style="width: 14rem; height: 14rem;" 
                variant="primary"
                type="grow"
            ></b-spinner>
    </b-container>
    <b-container v-else style="margin-top:9%;">
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

  <form class="form-inline active-pink-2 mt-2" >
    <input class="form-control w-25" type="text" placeholder="Search By Province ..."
      aria-label="Search" v-model="search">
    <i class="fas fa-search" aria-hidden="true"></i>
  </form>
  <div v-if="loading === true">
    <b-container v-if="loading === true">
      <b-spinner style="width: 14rem; height: 14rem;" 
                variant="success"
                type="grow"
            ></b-spinner>
    </b-container>
  </div>

  <div v-else class="tables" style="overflow-x:auto;">
    <table>
      <tr style="background-color:#266EB3;">
        <th style="color:white">Provinsi</th>
        <th style="color:white">Kasus Positif</th>
        <th style="color:white">Meninggal</th>
        <th style="color:white">Sembuh</th>
      </tr>
      <tr v-for="index in filterCountry" :key="index.id">
        <td>{{index.attributes.Provinsi}}</td>
        <td style="background-color:#6ECCAE;">{{index.attributes.Kasus_Posi}}</td>
        <td style="background-color:#FF7D6E;">{{index.attributes.Kasus_Meni}}</td>
        <td>{{index.attributes.Kasus_Semb}}</td>
      </tr>     
    </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Doughnut from './Doughnut'

export default {
    name:'IndoChart',
    components:{
      Doughnut
    },
    mounted(){
        this.getProvinceData()
        this.getDataSummary()
    },
    data(){
        return {
            loading:true,
            search:'',
            url:'https://api.kawalcorona.com/indonesia/',
            data:[],
            provinsi:[],
            provinsi2:[],
            datacollection:null,  
            provinsiTemp:[]
        }
    },
    computed:{
     filterCountry:function(){
        return this.provinsi.filter((item)=>{
            return item.attributes.Provinsi.toLowerCase().includes(this.search)
        });
      }
    },
    methods: {
      
     fillDoughnutChart (a,b) {
        console.log("fd")
        this.datacollection = {
          labels: ["Meninggal", "Sembuh"],
          datasets: [
            {
              backgroundColor: ["#FA4349","#50B38F"],
              data: [a,b]
            }
          ]
        }
    },
    async getDataSummary() {
       try {
         let response = await axios.get(this.url)
         this.data = response.data
         this.fillDoughnutChart(this.data[0].meninggal,this.data[0].sembuh)
         this.loading = false
       } catch (error) {
         console.log(error)
       }      
     },
     async getProvinceData(){
       try {
         let response = await axios.get(this.url + 'provinsi/')
          this.provinsi = response.data
          this.loading = false
          console.log("provinsi",this.provinsi)
       } catch (error) {
         console.log(error)
       }
     }
  }
}
</script>

<style scoped>
.cases-card{

}
.cardContainer{
  width: 80%;
  border-style: none;
  
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
tr:hover{
    opacity: 0.9;
    color:palevioletred;
    
}
.form-control{
  margin-top: 5%;
  margin-left: 11.5%;
  box-shadow: 0 1px 0 0 #f48fb1;
  border-bottom: 1px solid #f48fb1;
  /* border-color: #f48fb1; */

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
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}
</style>