<template>
  <div style="display: flex;flex-direction:row;">
    <div style="width: 320px">
      <drawer></drawer>
    </div>
    <div style="width: calc(100vw - 320px);height:90vh;overflow-y: scroll;padding:5vh 5vw">
      <transition>
        <router-view></router-view>
      </transition>
    </div>
  </div>
</template>

<script>
  import Drawer from './drawer/drawer'

  export default {
    name: "Base",
    components: {
      Drawer
    }
  }
</script>

<style scoped>

</style>
