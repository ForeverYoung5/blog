<template>
  <div style="display: flex;flex-direction:row;flex-wrap: wrap;">
    <!--上传图片-->
    <div style="display: flex;margin: 20px">
      <el-upload
        class="upload-demo"
        drag
        action="http://tom-jerry.club/java/filemanage/file/jerry/upload"
        :on-success="handleSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
      </el-upload>
    </div>
    <!--展示图片-->
    <div style="margin: 20px" v-for="(item, index) in pictures" :key="index">
      <img @click="openSure(item)" style="width:360px;height:180px;" :src="item.image_url"/>
    </div>
    <!--分页-->
    <div style="margin:50px 0 0 120px;">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[3]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  import {allPictures} from "../../api/admin/managePicture";
  import {upload} from "../../api/admin/managePicture";
  import {del} from "../../api/admin/managePicture";

  export default {
    name: "managePicture",
    data() {
      return {
        upMsg: {},
        pictures: [],
        currentPage:1,
        pageSize:3,
        total:0
      }
    },
    created() {
      this.getAllPistures(this.currentPage,this.pageSize);
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
      //将图片上传到图床
      handleSuccess(file, fileList) {
        console.log("handleSuccessfile", file, 'handleSuccessfileList', fileList);
        if (file.code === 200) {
          this.upMsg.name = file.data.name;
          this.upMsg.groupName = file.data.groupName;
          this.upMsg.remoteFileId = file.data.remoteFileId;
          this.upMsg.storageIp = file.data.storageIp;
          this.upMsg.size = file.data.size;
          this.upMsg.imageUrl = file.data.fileUrl;
          this.upMsg.fileUuid = file.data.uuid;
          console.log('提交的信息--->', this.upMsg);
          //图片上传到服务器成功后，添加到数据库
          upload(this.upMsg).then(res => {
            console.log('添加图片到数据库--->', res);
            if (res.data.code === 200) {
              this.$message({
                type: 'success',
                message: '添加成功！'
              });
              this.getAllPistures();
            }
          }).catch(err => {
            this.$message('添加图片失败！');
            console.log('添加图片到数据库失败--->', err);
          })
        }
      },
      //获取全部图片
      getAllPistures(currentPage,pageSize ) {
        allPictures(currentPage,pageSize).then(res => {
          console.log('获取全部图片--->', res);
          if (res.data.code === 200) {
            this.pictures = res.data.data.images;
            this.total = res.data.data.total;
          }
        }).catch(err => {
          console.log('获取全部图片失败--->', err)
        })
      },
      //确定是否删除
      openSure(item) {
        // console.log(item,'llllllllllllllll')
        this.$confirm('此操作将永久删除图片, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delPic(item.image_uuid);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
      //删除图片
      delPic(id) {
        // console.log('sdjkfsid');
        del(id).then(res => {
          console.log('删除图片--->', res);
          if (res.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.getAllPistures();
          }
        }).catch(err => {
          console.log('删除图片失败--->', err);
        })
      }
    }
  }
</script>

<style scoped>

</style>
