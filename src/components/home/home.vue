<template>
  <div class="home-wrapper">

    <div class="nav-wrapper">
      <ul class="selectItem" ref="selectItem">
        <router-link tag="li" class="item" to="/index/home/all"> <span>全部</span> </router-link>
        <router-link tag="li" class="item" to="/index/home/good"> <span>精华</span> </router-link>
        <router-link tag="li" class="item" to="/index/home/share"> <span>分享</span> </router-link>
        <router-link tag="li" class="item" to="/index/home/ask"> <span>问答</span> </router-link>
        <router-link tag="li" class="item" to="/index/home/job"> <span>招聘</span> </router-link>
      </ul>
    </div>

    <div class="homeContent-wrapper">
      <router-view></router-view>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: '',
    data() {
      return {
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .home-wrapper{
    position: absolute
    top: 0
    bottom:0
    width 100%
    overflow hidden
  }

  .nav-wrapper{
    width 100%

    .selectItem{
      display flex
      .item{
        flex:1
        text-align center
        margin-top 8px
        font-size 15px
        span{
          display inline-block
          padding 4px 10px
          border-radius 20px
        }
        &.router-link-active{
          span{
            color: #fff
            background #fc9153
          }
        }
      }
    }
  }

  .homeContent-wrapper{
    position: absolute
    top: 40px
    bottom:0
    width 100%
    overflow: hidden;
  }

</style>
