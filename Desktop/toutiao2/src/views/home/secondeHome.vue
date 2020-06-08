<template>
  <div class="seconde-home">
    <el-carousel :interval="4000" type="card" height="200px">
      <el-carousel-item v-for="item in list" :key="item">
        <img :src="item" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data () {
    return {
      list: [
        'http://attach.bbs.miui.com/forum/201311/17/174124tp3sa6vvckc25oc8.jpg',
        'http://attach.bbs.miui.com/forum/201311/07/092441ln1zfzdqf92ded65.jpg',
        'http://bbsfiles.vivo.com.cn/vivobbs/attachment/forum/201601/24/175433rossj7cn74vksn4p.jpg',
        'http://pic1.win4000.com/wallpaper/b/55597435bb036.jpg'
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.seconde-home {
  height: calc(100vh - 60px);
  background-size: cover;
  background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591595747309&di=7d51337dff480756532fc576b4f01001&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F7%2F55402f3878fe4.jpg");
  img{
    width: 100%;
  }
}
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>
