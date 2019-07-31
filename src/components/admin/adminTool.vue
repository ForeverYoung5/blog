<template>
    
</template>

<script>
    export default {
        name: "adminTool",
      data(){
          return{

        }
      },
      created(){
        this.$router.replace({
          name:'articleDetail',
          query:{
            article_uuid:this.$route.query.article_uuid
          }
        })
      }
    }
</script>

<style scoped>

</style>
