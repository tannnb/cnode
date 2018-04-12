<template>
  <transition name="slide">
    <div class="detail-wrapper">
sfsdffsd
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
    export default {};

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  .detail-wrapper{
    position: fixed
    top:0
    bottom:0
    width 100%
    z-index 999
    background #fff
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

</style>
