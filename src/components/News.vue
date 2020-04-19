<template>
    <div>
        <h1 style="margin-top:9%"> Covid News</h1>

        <b-container style =" margin-top:5%" v-if="loading === true">
             <b-spinner style="width: 14rem; height: 14rem;" 
                variant="primary"
                type="grow"
            ></b-spinner>
        </b-container>  
        <b-container class="cardContainer" v-else>
            <b-row class="row" >
                <b-col class="col">
                        <b-card
                        v-for="index in news.articles" :key="index.id"
                        :img-src="index.urlToImage"
                        img-alt="Image"
                        img-top
                        tag="article"
                        class="mb-2"  
                        :footer="index.source.name"
                        footer-class="footer"
                    >
                        <b-card-text class="title">
                            {{index.title}}                 
                        </b-card-text>
                        <b-card-text class="content">
                            {{index.description}}                 
                        </b-card-text>
                        <b-button :href="index.url" variant="primary">Klik Selengkapnya</b-button>

                    </b-card>
                    
                </b-col>
            </b-row>
        </b-container> 
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:'News',
    components:{
    },
    mounted(){
        this.getIndoNews()
    },
    data(){
        return{
            url:'https://newsapi.org/v2/top-headlines?q=covid&country=id&apiKey=344fcde671db46f3af484418007a50d6',
            news:[],
            loading:true
        }
    },
    methods:{
        getIndoNews(){
            axios.get(this.url).then(res=>{
                this.news = res.data
                this.loading = false
                console.log("news",this.news.articles[0].title)
            }).catch(err => {
                console.log(err)
            })
        }
    },
    computed:{
         titleText() {
            return this.news.articles[0].title;
        }
    }
}
</script>

<style lang="scss" scoped>

.content{
    text-align: left;
}
.title{
    font-size: 14pt;
    text-align: left;
    font-weight: bold;
}
.footer{
    text-align: left;
}
.mb-2{
    width: 90%;
    margin-top: 3%;
    margin-left: 5%;
    box-shadow: 0.5px 0.5px  0.5px 0.5px grey;
}
.mb-2:hover{
    transform: scale(1.02);
    opacity: 0.8;
}
.col{   
    padding: 2%;
}

</style>