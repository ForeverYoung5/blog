<template>
  <div>
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
        <img style="width:55vw;height:50vh; margin:10px 0;" :src="item.image_url"/>
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
          <el-button size="small" type="info" @click="openSure(item)">删除文章</el-button>
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
</template>

<script>
  import {allArticle} from "../../api/admin/home";
  import {del} from "../../api/admin/home";

  export default {
    name: "home",
    data() {
      return {
        articles: [],
        currentPage:1,
        pageSize:5,
        total:0
      }
    },
    created() {
      this.getAllArticle(this.currentPage)
    },
    methods: {
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
      getAllArticle(currentPage,pageSize) {
        allArticle(currentPage,pageSize).then(res => {
          console.log('获取全部文章--->', res);
          if (res.data.code === 200) {
            this.articles = res.data.data.articles;
            this.total = res.data.data.total;
          }
        }).catch(err => {
          console.log('获取全部文章失败--->', err)
        })
      },
      // 是否确认删除文章
      openSure(item) {
        this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          console.log(item, 'djfhurdfhirduh');
          this.delArticle(item.article_uuid);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除文章
      delArticle(id) {
        del(id).then(res => {
          console.log('删除文章--->', res);
          if(res.data.code === 200){
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAllArticle();
          }
        }).catch(err => {
          console.log('删除文章失败--->', err);
          this.$message({
            type: 'info',
            message: '删除失败！'
          });
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
      }
    }
  }
</script>
