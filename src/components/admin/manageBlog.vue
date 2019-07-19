<template>
  <div>
    <!--表格-->
    <div>
      <template>
        <el-table :data="articles" stripe style="width: 100%">
          <el-table-column prop="pub_time" label="发表时间"></el-table-column>
          <el-table-column prop="title" label="标题" width="100"></el-table-column>
          <el-table-column prop="tags" label="标签" width="100"></el-table-column>
          <el-table-column prop="article_uuid" label="文章ID"></el-table-column>
          <el-table-column prop="image_uuid" label="图片ID"></el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button size="mini" type="info" @click="goRouter(scope.row)">查看</el-button>
              <el-button size="mini" type="info" @click="openDialog(scope.row)">选图</el-button>
              <el-button size="mini" type="danger" @click="openSure(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <!--分页-->
    <div  style="margin: 14px 0 0 220px">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[7]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
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
            <img @click="openSure1(item)" style="width:360px;height:180px;" :src="item.image_url"/>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
  </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import {allArticle} from "../../api/admin/manageBlog";
  import {del} from "../../api/admin/manageBlog";
  import {allPictures} from "../../api/admin/manageBlog";
  import {update} from "../../api/admin/manageBlog";

  export default {
    name: "manageBlog",
    data() {
      return {
        articles: [],
        //选择图片
        centerDialogVisible: false,
        pictures: [],
        //要修改的信息
        upMsg: {
          articleUuid: '',
          articleInfo: {
            // image_url: '',
            article_img_uuid: ''
          }
        },
      //  分页
        total:0,
        currentPage:1,
        pageSize:7
      }
    },
    created() {
      this.getAll(this.currentPage);
    },
    methods: {
      //分页
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.getAll(this.currentPage,val)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.getAll(val,this.pageSize)
      },
      //获取全部文章
      getAll(currentPage,pageSize) {
        allArticle(currentPage,pageSize).then(res => {
          console.log('博客管理获取全部文章--->', res);
          if (res.data.code === 200) {
            this.articles = res.data.data.articles;
            this.total = res.data.data.total;
          }
        }).catch(err => {
          console.log('博客管理获取全部文章失败--->', err)
        })
      },
      goRouter(item) {
        console.log(item);
        this.$router.push({
          name: 'articleDetail',
          query: {
            article_uuid: item.article_uuid
          }
        })
      },
      //确定是否删除文章
      openSure(item) {
        console.log(item);
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delArticle(item.article_uuid)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //是否选择该图片
      openSure1(item) {
        console.log(item);
        this.$confirm('是否选择该图片?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // this.newImg = item.image_url;
          // this.upMsg.articleInfo.image_url = item.image_url;
          this.upMsg.articleInfo.article_img_uuid = item.image_uuid;
          console.log('skldsldsaf', this.upMsg);
          //修改文章改变图片id
          this.updetaArticle(this.upMsg);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作或操作失败'
          });
        });
      },
      //  删除文章
      delArticle(id) {
        del(id).then(res => {
          console.log('删除文章--->', res);
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAll();
          }
        }).catch(err => {
          console.log('删除文章失败--->', err);
          this.$message({
            type: 'info',
            message: '删除失败'
          });
        })
      },
      //  打开dialog，调所有图片，选择图片
      openDialog(item) {
        console.log(item);
        this.upMsg.articleUuid = item.article_uuid;
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
          console.log('获取全部图片失败--->', err);
        })
      },
      //  修改文章（图片）
      updetaArticle(data) {
        update(data).then(res => {
          console.log('修改文章--->', res);
          if (res.data.code === 200) {
            this.centerDialogVisible = false;
            this.$message({
              type: 'success',
              message: '修改成功'
            });
            this.getAll();
          }
        }).catch(err => {
          console.log('修改文章失败--->', err)
        })
      }
    },
  }
</script>

<style scoped>

</style>
