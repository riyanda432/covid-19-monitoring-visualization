<template>
    <div>
        <header class="header">
             <h1 class="text">{{msg}}</h1>
             <div>
                <router-link  class ="router"  to="/dashboard"> Dashboard</router-link>  |
                <router-link  class ="router"  to="/news">News</router-link>  |
                <router-link  class ="router"  to="/credits">Credits</router-link> 
            </div> 
        </header>
    </div>
</template>

<script>
export default {
    name:'Header',
    props:['msg'],
}
</script>
<style scoped>

.header{
    font-family: inherit;
    padding: 7%;
    justify-content: center;
    background-image: linear-gradient(to right, #00c6ff, #0072ff);
    position: relative;
}
.text{
    text-align: center;   
}
.router{
    text-decoration:none;
    color:white;
}
.router:hover {
    transform: scale(1.1);
    color:black;
}
</style>