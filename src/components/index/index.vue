<template>
  <div>

    <div class="index-header">
      <div class="top">
        <div class="icon-wrapper"><i class="icon-user"></i></div>
        <div class="title">CNODE</div>
      </div>
      <ul class="selectItem" ref="selectItem">
        <router-link tag="li" class="item" to="/index/all"><span>全部</span></router-link>
        <router-link tag="li" class="item" to="/index/good"><span>精华</span></router-link>
        <router-link tag="li" class="item" to="/index/share"><span>分享</span></router-link>
        <router-link tag="li" class="item" to="/index/ask"><span>问答</span></router-link>
        <router-link tag="li" class="item" to="/index/job"><span>招聘</span></router-link>
      </ul>
    </div>

    <div class="container">
      <keep-alive><router-view/></keep-alive>
    </div>


  </div>
</template>

<script>

  export default {

  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">

  .index-header {

    background linear-gradient(to bottom, #537df6, #9c73f5)
    .top{
      display flex
      .icon-wrapper {
        flex: 0 0 40
        width 40px
        text-align center
        vertical-align middle
        font-size 30px
        padding: 5px
        color: #fff
      }
      .title {
        flex 1
        line-height 44px
        color: #fff
        font-size 18px
      }
    }
    .selectItem {
      display flex
      .item {
        flex: 1
        text-align center
        margin-top 8px
        font-size 15px
        color: #c8b4fb
        span {
          display block
          padding 4px 2px
          padding-bottom: 10px;
        }
        &.router-link-active {
          span {
            color: #fff
            font-size 16px
            border-bottom 2px solid #fff
          }
        }
      }
    }

  }

</style>
