<template>
  <div class="cover-image">
    <div @click="openDialog(index)" v-for="(item,index) in list" :key="index" class="cover-image-item">
      <img :src="item? item:defaultImg" alt  />
    </div>
    <!-- 弹出层 -->
    <el-dialog :visible='dialogVisible' @close="dialogVisible=false">
      <select-image @selectOneImg='receiveImg'></select-image>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: ['list'], // 注意子组件接收props的位置 ，不在data里面
  data () {
    return {
      defaultImg: require('../../assets/img/pic_bg.png'),
      dialogVisible: false,
      selectIndex: -1
    }
  },
  methods: {
    receiveImg (url) {
      this.$emit('selectTwoImg', url, this.selectIndex)
      this.dialogVisible = false
    },
    // 点击图片时弹出一个层
    openDialog (index) {
      this.dialogVisible = true// 显示图层
      this.selectIndex = index // 显示你点击了哪个上传图片按钮
    }
  }

}
</script>

<style lang='less' scoped>
.cover-image{
  display: flex;
  margin: 20px 100px;
  .cover-image-item{
    width: 250px;
    height: 250px;
    border: 1px solid #ccc;
    padding: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
