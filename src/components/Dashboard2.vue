<template>
    <div>
        <h1>{{msg}}</h1>
        <router-link  class ="router"  to="/world"> World</router-link>  |
        <router-link  class ="router"  to="/indonesia">Indonesia</router-link>  |
    </div>
</template>

<script>
export default {
    name:'Dashboard2',
    props:['msg']
}
</script>