<template>
  <div>
    <h1> Data Source </h1> <br>
     
     <h4> <a href="https://corona.lmao.ninja/"> https://corona.lmao.ninja/</a> </h4>  <br>
     <h4> <a href="https://kawalcorona.com/api/"> https://kawalcorona.com/api/</a>  </h4><br>
     <h4> <a href="https://newsapi.org/"> https://newsapi.org/</a> </h4> <br>

    <p> © Developed By Riyanda Febri </p> 

  </div>
</template>

<script>
export default {
  name:"Credits",
  data(){
    return {
      text:"",
      loading:false
    }
  },
  mounted(){
    this.waitLoad()
  },
  methods:{
      waitLoad(){
        setTimeout(()=>{
          this.text = "FFDDFFDDFDF"
          this.loading = true
        },4000)
      }
  }
}
</script>

<style scoped>

</style>