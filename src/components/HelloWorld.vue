/* eslint-disable no-unused-vars */
<template>
  <div class="hello">
    <h1 class="title">{{ msg }}</h1>
    <!-- <h3>Count: {{count}}</h3> -->
   
        
              <b-card-text>
                {{datay.recovered}}
              </b-card-text>

      
      <div>
        <b-dropdown id="ddCommodity"
                  name="ddCommodity"
                  v-model="ddTestVm.ddTestSelectedOption"
                  text="Select Item"
                  variant="primary"
                  class="m-md-2" v-on:change="changeItem">
          <b-dropdown-item disabled value="0">Select an Item</b-dropdown-item>
          <b-dropdown-item v-for="option in ddTestVm.options" 
                            :key="option.value" 
                            :value="option.value"
                            @click="ddTestVm.ddTestSelectedOption = option.value">
            {{option.text}}
          </b-dropdown-item>           
        </b-dropdown> 
        <span>Selected: {{ ddTestVm.ddTestSelectedOption }}</span>

      </div>

  </div>
</template>

<script>

// eslint-disable-next-line no-unused-vars
import * as Rx from "rxjs";

import 'rxjs/add/observable/interval'
export default {
    
  name: 'HelloWorld',
  props:['msg'],
  mounted() {
    console.log("mounted")
    this.onChange()
  },
  methods: {
    onChange(event) {
        console.log(event.value);
    },
    
  },
  created() {
    
    // let observable$ = Observable.create( ( observer ) => {
    //   axios.get( this.url + 'all' )
    //   .then( ( response ) => {
    //       observer.next( response.data );
    //       observer.complete();
    //   } )
    //   .catch( ( error ) => {
    //       observer.error( error );
    //   } );
    // } );
    //   observable$.subscribe((data) => {
    //       this.datay = data 
    //   });

  },
  data () {
    console.log('data')
      return {
        url:'https://corona.lmao.ninja/',
        datax:[],
        choose:'',
        datay:[],
        count:0,
        
        ddTestVm: {
                    originalValue: [],
                    ddTestSelectedOption: "Value1",
                    disabled: false,
                    readonly: false,
                    visible: true,
                    color: "",
                    options: [
                        {
                            "value": "Value1",
                            "text": "Value1Text"
                        },
                        {
                            "value": "Value2",
                            "text": "Value2Text"
                        },
                        {
                            "value": "Value3",
                            "text": "Value3Text"
                        }
                    ]
                }
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .small {
    max-width: 600px;
    margin:  150px auto;
  }
  .title{
  }
</style>
