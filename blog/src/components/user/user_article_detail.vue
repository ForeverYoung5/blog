<template>
  <div style="display: flex;flex-direction: row">
    <div style="height: 100vh;background: whitesmoke">
      <div style="width:320px;height:100vh;background: white">
        <div style="width:320px;height: 250px;background: darkcyan"></div>
        <div>
          <img style="width: 140px;height:140px;border-radius:50%;margin-top:-70px;"
               src="../../assets/timg.png"/>
        </div>
        <div style="margin-top: 50px">
          <div style="font-weight:600;cursor: pointer;" @click="goRouter('/home')">主页</div>
          <div style="font-weight:600;margin-top: 20px;cursor: pointer;" @click="show=true">目录</div>
          <div style="font-weight:600;margin-top: 20px;cursor: pointer;">AboutMe</div>
        </div>
      </div>
    </div>
    <div
      style="width: calc(100vw - 320px);height:90vh;overflow-y: scroll;padding:5vh 5vw">
      <!--文章展示-->
      <div style="background: white">
        <div style=" border-left: 5px solid darkcyan;font-size:26px;padding: 30px 0 0 80px;">
          <div style="display:flex;">{{ article.title }}</div>
          <div style="display:flex;flex-direction: row-reverse">
            <div style="margin: 0 80px;opacity:0.54;display: flex;align-items:center;">
              <div><i class="el-icon-date"></i></div>
              <div style="margin:10px;font-size:16px">{{ article.pub_time }}</div>
            </div>
          </div>
        </div>
        <div>
          <img style="width:calc(90vw - 500px);" :src="article.image_url"/>
        </div>
        <div v-if="article.content" style="width:calc(90vw - 500px);margin-left: 6vw;">
          <mavon-editor
            :subfield="false"
            :defaultOpen="previewStr"
            :boxShadow="false"
            :toolbarsFlag="false"
            :ishljs="true"
            v-model="article.content"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {detail} from "../../api/admin/articleDetail";

  export default {
    name: "user_article_detail",
    data() {
      return {
        id: '',
        article: {},
        previewStr: 'preview',
        mdValue: '## 这里是标题测试 \n' +
          '|column1|column2|column3|\n' +
          '|-|-|-|\n' +
          '|content1|content2|content3|\n' +
          '这里是内容\n' +
          '```javaScript\n' +
          'console.log(\'这里是代码测试\');\n' +
          '```',
      }
    },
    created() {
      const article_uuid = this.$route.query.article_uuid;
      console.log(article_uuid);
      this.id = article_uuid;
      this.getDetail();
    },
    methods: {
      getDetail() {
        detail(this.id).then(res => {
          console.log('获取文章详情', res);
          if (res.data.code === 200) {
            this.article = res.data.data;
            this.mdValue = res.data.data.content
          }
        })
      }
    }
  }
</script>


<style scoped>

</style>
