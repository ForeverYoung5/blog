<template>
  <div style="height: 100vh;width:100vw;background: whitesmoke">
    <div style="width:320px;height:100vh;background: white">
      <div style="width:320px;height: 250px;background: darkcyan"></div>
      <div>
        <img style="width: 140px;height:140px;border-radius:50%;margin-top:-70px;"
             src="../../../assets/timg.png"/>
      </div>
      <div style="margin-top: 50px;font-size: 16px">
        <div style="font-weight:600;cursor: pointer;" @click="goRouter('/home')">主页</div>
        <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="show=true">目录</div>
        <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="goRouter('/manageWrite')">编辑博客</div>
        <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="goRouter('/manageBlog')">博客管理</div>
        <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="goRouter('/managePicture')">图片管理</div>
        <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="logout">退出</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "home",
    data() {
      return {
        show: false
      }
    },
    methods: {
      goRouter(name) {
        this.$router.push(name);
      },
      logout() {
        this.$store.commit('logout');
      }
    }
  }
</script>
