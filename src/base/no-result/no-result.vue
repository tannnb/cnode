<template>
    <div class="no-result">
      <img class="avatar" src="./nocontent.png" alt="">
      <div class="text">{{text}}</div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
      props:{
        text:{
          type:String,
          default:'暂无数据'
        }
      }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

.no-result{
  text-align center
  .avatar{
    width 120px
  }
  .text{
    line-height:36px
    padding-top 10px
    font-size 14px
  }
}
</style>
