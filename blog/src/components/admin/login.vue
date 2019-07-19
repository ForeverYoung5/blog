<template>
  <div style="height:100vh;width:100vw;position: fixed;" :style="back">
    <!--登录框-->
    <div style="display: flex;flex-direction:row-reverse;margin:30vh 10vw 0 0">
      <div
        style="border-radius:5px;background:whitesmoke;display: flex;flex-direction:column;justify-content: center;align-items: center;padding:20px">
        <div style="width: 20vw;">
          <el-input v-model="userName" style="background:none">
            <template slot="prepend">账号</template>
          </el-input>
          <el-input placeholder="请输入内容" v-model="password">
            <template slot="prepend">密码</template>
          </el-input>
        </div>
        <div style="margin-top:20px">
          <el-button @click="onLogin">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {login} from "../../api/admin/login";

  export default {
    name: "index",
    data() {
      return {
        back: {
          backgroundImage: "url(" + require("../../assets/timg.png") + ")",
          backgroundRepeat: "no-repeat",
          backgroundSize: "100% 100%",
        },
        userName: 'Jerry',
        password: '123'
      }
    },
    methods: {
      onLogin() {
        let paramsData = {
          user_name: this.userName,
          password: this.password
        };
        login(paramsData).then(res => {
            console.log('login', res);
            if (res.data.code === 200) {
              let userInfo = res.data.data;
              this.$store.commit('login', {
                userInfo: {
                  userName: userInfo.user_name,
                  uuid: userInfo.user_uuid
                },
                token: userInfo.token
              });
              this.$router.push('home')
            } else {
              this.$message('登录失败，请稍后重试！')
            }
          }).catch(err => {
            console.log('登录错误--->', err);
        })
      }
    }
  }
</script>

<style>
  .el-input_inner {
    background-color: transparent
  }
</style>
