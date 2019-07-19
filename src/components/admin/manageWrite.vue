<template>
  <div>
    <!--blog-->
    <div style="background: white">
      <div style="height: 10vh;background: darkcyan;">
        <div
          style="display: flex;flex-direction:row;justify-content:space-between;">
          <div style="color:white;font-size:24px;margin: 3vh 2vw">编辑博客</div>
          <div style="margin: 3vh 2vw">
            <el-button @click="submit" size="small">保存博客</el-button>
          </div>
        </div>
      </div>
      <div style="margin:0 10vw;padding:4vh 0">
        <el-form ref="form" :model="article" label-width="80px" size="mini">
          <el-form-item label="">
            <el-input placeholder="标题" v-model="article.title"></el-input>
          </el-form-item>
          <el-form-item label="">
            <el-input placeholder="摘要" v-model="article.abstract"></el-input>
          </el-form-item>
          <div style="display:flex;flex-direction:row;justify-content: space-between">
            <div>
              <el-form-item label="">
                <el-input placeholder="标签" v-model="article.tags"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="">
                <el-input placeholder="次标签" v-model="article.secondTags"></el-input>
              </el-form-item>
            </div>
            <div style="display: flex;flex-direction:row;">
              <div>
                <el-form-item label="">
                  <el-input placeholder="图片" v-model="article.image_uuid"></el-input>
                </el-form-item>

              </div>
              <div style="margin:6px">
                <i @click="openDialog" class="el-icon-upload"></i>
              </div>
            </div>
          </div>
        </el-form>
      </div>
      <!--markdown-->
      <div style="margin: 0 2vw">
        <mavon-editor
          ref="mavonEditor"
          :ishljs="true"
          :toolbarsFlag="toolbarsFlagBoo"
          :subfield="subfieldStr"
          :default_open="previewStr"
          v-model="mdValue"/>
      </div>
    </div>
    <!--选择图片-->
    <div>
      <el-dialog
        title="选择图片"
        :visible.sync="centerDialogVisible"
        :fullscreen="true"
        center>
        <div style="display: flex;flex-direction: row;flex-wrap: wrap;margin: 0 120px">
          <div style="margin: 20px" v-for="(item, index) in pictures" :key="index">
            <img @click="openSure(item)" style="width:360px;height:180px;" :src="item.image_url"/>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  // import Markdown from "vue-meditor";
  import {allPictures} from "../../api/admin/manageWrite";
  import {subArticle} from "../../api/admin/manageWrite";

  export default {
    name: "manageWrite",
    data() {
      return {
        //blog
        mdValue: '## 这里是标题测试 \n' +
          '|column1|column2|column3|\n' +
          '|-|-|-|\n' +
          '|content1|content2|content3|\n' +
          '这里是内容\n' +
          '```javaScript\n' +
          'console.log(\'这里是代码测试\');\n' +
          '```',
        subfieldStr: true,
        previewStr: 'preview',
        toolbarsFlagBoo: true,
        //提交用到的数据
        article: {
          "title": "很喜欢你",
          "content": "",
          "tags": "YOU",
          "secondTags": "WE",
          "image_uuid": "",
          "abstract": ""
        },
        //选择图片
        centerDialogVisible: false,
        //全部图片
        pictures: []
      }
    },
    methods: {
      //打开dialog，调所有图片，选择图片
      openDialog() {
        //打开dialog
        this.centerDialogVisible = true;
        //  获取全部图片
        allPictures().then(res => {
          console.log('获取全部图片--->', res);
          if (res.data.code === 200) {
            this.pictures = res.data.data.images;
          } else if (res.data.code === 703) {
            this.$router.push({name: 'login'})
          }
        }).catch(err => {
          console.log('获取全部图片失败--->', err)
        })
      },
      //选择图片确认框
      openSure(item) {
        this.$confirm('是否确定选择该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //确定选择，将图片id拿出来
          this.article.image_uuid = item.image_uuid;
          this.centerDialogVisible = false;
          this.$message({
            type: 'success',
            message: '成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      //提交
      submit() {
        this.article.content = this.mdValue;
        subArticle(this.article).then(res => {
          console.log('保存博客--->', res);
          if(res.data.code === 200){
            this.$message({
              type:'success',
              message:'提交成功！'
            });
            this.$router.push('home')
          }
        }).catch(err => {
          console.log('保存博客失败--->', err)
        })
      },
    }
  }
</script>

<style scoped>

</style>
