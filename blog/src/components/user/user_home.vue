<template>
  <div>
  <div style="display: flex;flex-direction: row">
    <div style="height: 100vh;background: whitesmoke">
      <div style="width:320px;height:100vh;background: white">
        <div style="width:320px;height: 250px;background: darkcyan"></div>
        <div>
          <img style="width: 140px;height:140px;border-radius:50%;margin-top:-70px;"
               src="../../assets/timg.png"/>
        </div>
        <div style="margin-top: 50px;font-size: 16px;">
          <div style="font-weight:600;cursor: pointer;" @click="goRouter('/home')">主页</div>
          <div style="font-weight:600;margin-top: 20px;cursor: pointer;" @click="getAllTag">目录</div>
            <a style="text-decoration: none" href="https://github.com/haoyujiao/"><div style="font-weight:600;margin-top: 20px;cursor: pointer;color:black;opacity: 0.75">AboutMe</div></a>
        </div>
        <div style="display: flex;flex-direction: row;justify-content: center;margin-top: 30px;">
          <a href="https://github.com/haoyujiao/"><img style="width:25px;height: 25px;margin: 10px" src="../.././assets/github.png"/></a>
          <a href="https://github.com/haoyujiao/"><img style="width:25px;height: 25px;margin: 10px" src="../.././assets/contact.png"/></a>
        </div>
      </div>
    </div>
    <div
      style="display:flex;flex-direction:column;width: calc(100vw - 320px);height:90vh;overflow-y: scroll;padding:5vh 5vw">
      <!--文章展示-->
      <div v-for="(item , index) in articles" :key="index"
           style=" background: white;margin-bottom:5vh">
        <div style=" border-left: 5px solid darkcyan;font-size:26px;padding: 30px 0 0 80px;">
          <div style="display:flex;">{{ item.title }}</div>
          <div style="display:flex;flex-direction: row-reverse">
            <el-tag type="info" style="margin:0 80px 0 10px">{{item.second_tags}}</el-tag>
            <el-tag type="info" style="margin:0 10px 0 80px">{{item.tags}}</el-tag>
          </div>
        </div>
        <div>
          <img style="width:55vw;height:40vh; margin:10px 0;" :src="item.image_url"/>
        </div>
        <div style="display: flex;">
          <div style="margin: 10px 80px">{{ item.abstract }}</div>
        </div>
        <div
          style="display: flex;flex-direction:row;justify-content: space-between;align-items: center">
          <div style="margin: 10px 80px;opacity:0.54;display: flex;align-items:center;">
            <div><i class="el-icon-date"></i></div>
            <div style="margin:10px;font-size:16px">{{ item.pub_time }}</div>
          </div>
          <div style="margin: 0 80px">
            <el-button size="small" type="info" @click="goRouter(item)">查看全文 >></el-button>
          </div>
        </div>
      </div>
      <!--分页-->
      <div>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
  <!--    museUI-drawer1-->
  <div>
    <mu-flex justify-content="center" align-items="center">
    </mu-flex>
    <mu-drawer width="400px" :open.sync="open1" :docked="docked1" :right="position1 === 'right'">
      <mu-list>
        <div v-for="(item,index) in tags" :key="index">
          <mu-list-item>
            <mu-list-item-title @click="getArticleByTag(item)">{{ item }}</mu-list-item-title>
          </mu-list-item>
        </div>
        <mu-list-item  @click="open1 = false" button>
          <mu-list-item-title>Close</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </mu-drawer>
  </div>
    <!--    museUI-drawer2-->
    <div>
      <mu-flex justify-content="center" align-items="center">
      </mu-flex>
      <mu-drawer width="200px" :open.sync="open2" :docked="docked2" :right="position2 === 'right'">
        <mu-list>
          <div v-for="(item, number) in second_tags" :key="number">
            <mu-list-item>
              <mu-list-item-title>{{item}}</mu-list-item-title>
            </mu-list-item>
          </div>
        </mu-list>
      </mu-drawer>
    </div>
  </div>
</template>

<script>
  import {allArticle} from "../../api/admin/home";
  import {allTag} from "../../api/user/user_home";
  import {findByTag} from "../../api/user/user_home";

  export default {
    name: "user_home",
    data() {
      return {
        show: false,
        articles: [],
        tag_articles:[],
        second_tags:[],
        currentPage: 1,
        pageSize: 5,
        total: 0,
        tags:[],
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
    created() {
      this.getAllArticle(this.currentPage)
    },
    methods: {
      //根据标签获取文章
      getArticleByTag(item){
        this.tag_articles=[];
        this.open2 = true;
        findByTag(item).then( res => {
          console.log('根据标签查询文章--->',res);
          var i;
          for(i in res.data.data){
            this.second_tags.push(i);
          };
          console.log(this.second_tags,'llllllllllll')
        }).catch( err => {
          console.log('根据文章获取标签失败--->',err)
        })
      },
      //获取全部标签
      getAllTag(){
        this.open1 = !this.open1;
        allTag().then( res => {
          console.log('获取全部标签--->', res);
          this.tags = res.data.data.tags;
        }).catch(err => {
          console.log('获取全部标签失败--->', err);
        })
      },
      goRouter(item) {
        console.log(item);
        this.$router.push({
          name: 'user_article_detail',
          query:{item}
        })
      },
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getAllArticle(this.currentPage,val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getAllArticle(val,this.pageSize)
      },
      //获取全部文章
      getAllArticle(currentPage, pageSize) {
        allArticle(currentPage, pageSize).then(res => {
          console.log('获取全部文章--->', res);
          if (res.data.code === 200) {
            this.articles = res.data.data.articles;
            this.total = res.data.data.total;
          }
        }).catch(err => {
          console.log('获取全部文章失败--->', err)
        })
      },
    }
  }
</script>

<style scoped>

</style>
