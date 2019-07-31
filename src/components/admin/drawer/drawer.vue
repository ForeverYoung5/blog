<template>
  <div>
    <!--drawer-->
    <div style="height: 100vh;width:100vw;background: whitesmoke">
      <div style="width:320px;height:100vh;background: white">
        <div style="width:320px;height: 250px;background: darkcyan"></div>
        <div>
          <img style="width: 140px;height:140px;border-radius:50%;margin-top:-70px;"
               src="../../../assets/timg.png"/>
        </div>
        <div style="margin-top: 50px;font-size: 16px">
          <div style="font-weight:600;cursor: pointer;" @click="goRouter('/home')">主页</div>
          <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="getAllTag">目录</div>
          <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="goRouter('/manageWrite')">编辑博客</div>
          <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="goRouter('/manageBlog')">博客管理</div>
          <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="goRouter('/managePicture')">图片管理</div>
          <div style="font-weight:600;margin-top: 15px;cursor: pointer;" @click="logout">退出</div>
        </div>
      </div>
    </div>
    <div>
      <!--museUI-drawer1-->
      <div>
        <mu-flex justify-content="center" align-items="center">
        </mu-flex>
        <mu-drawer width="300px" :open.sync="open1" :docked="docked1" :right="position1 === 'right'">
        <span
          style="height:50px;display: flex;padding-left:5px;align-items:center;background: darkcyan;color: white;font-size:16px">全部目录</span>
          <mu-list>
            <div v-for="(item,index) in tags" :key="index">
              <mu-list-item>
                <mu-list-item-title style="font-size: 14px;" @click="getArticleByTag(item)">
                  <div style="display: flex;flex-direction: row;align-items: center;justify-content: flex-start">
                    <div><img style="width: 15px;" src="../../../assets/tag.png"/></div>
                    <div style="padding: 0px 10px">{{ item }}</div>
                  </div>
                </mu-list-item-title>
              </mu-list-item>
            </div>
            <mu-list-item @click="open1 = false">
              <mu-list-item-title>Close</mu-list-item-title>
            </mu-list-item>
          </mu-list>
        </mu-drawer>
      </div>
      <!--museUI-drawer2-->
      <div>
        <mu-flex justify-content="center" align-items="center">
        </mu-flex>
        <mu-drawer width="180px" :open.sync="open2" :docked="docked2" :right="position2 === 'right'">
        <span
          style="height:50px;display: flex;padding-left:5px;align-items:center;background: darkcyan;color: white;font-size:16px">分类目录</span>
          <mu-list>
            <div v-for="(item, number) in second_tags" :key="number">
              <!--            折叠板-->
              <mu-expansion-panel :zDepth="0">
                <div slot="header" style="font-size: 14px">
                  <div style="display: flex;flex-direction: row;align-items: center;justify-content: flex-start">
                    <div><img style="width: 15px;" src="../../../assets/sectag.png"/></div>
                    <div style="padding: 0px 10px">{{ item.secondTag }}</div>
                  </div>
                </div>
                <div
                  style="display: flex;justify-content: flex-start;padding: 10px;cursor: pointer;"
                  v-for="(article,index1) in item.article" :key="index1"
                  @click="goRouterBy_uuid(article.id)">{{ article.title }}
                </div>
              </mu-expansion-panel>
            </div>
          </mu-list>
        </mu-drawer>
      </div>
    </div>
  </div>
</template>

<script>
  import {allTag} from "../../../api/user/user_home";
  import {findByTag} from "../../../api/user/user_home";

  export default {
    name: "home",
    data() {
      return {
        id:'',
        tags: [],
        second_tags: [],
        //  drawer1
        docked1: false,
        open1: false,
        position1: 'right',
        //  drawer2
        docked2: false,
        open2: false,
        position2: 'right',
      }
    },
    methods: {
      //根据标签获取次标签和文章
      getArticleByTag(item) {
        this.second_tags = [];
        console.log('清空次标签数组');
        this.open2 = true;
        findByTag(item).then(res => {
          console.log('根据标签查询文章--->', res);
          var i;
          for (i in res.data.data) {
            this.second_tags.push({"secondTag": i, "article": res.data.data[i]});
            console.log(this.second_tags)
          }
        }).catch(err => {
          console.log('根据文章获取标签失败--->', err)
        })
      },
      //获取全部标签
      getAllTag() {
        this.open1 = !this.open1;
        allTag().then(res => {
          console.log('获取全部标签--->', res);
          this.tags = res.data.data.tags;
        }).catch(err => {
          console.log('获取全部标签失败--->', err);
        })
      },
      goRouterBy_uuid(item) {
        this.open2 = !this.open2;
        this.open1 = !this.open1;
        this.$router.push({
          name:"adminTool",
          query:{
            article_uuid:item
          }
        })
      },
      goRouter(name) {
        this.$router.push(name);
      },
      logout() {
        this.$store.commit('logout');
      }
    }
  }
</script>
