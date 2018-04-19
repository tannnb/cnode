<template>
  <div>

    <div class="index-header">
      <div class="top">
        <div @click="sliderCenter" class="icon-wrapper"><i class="icon-user"></i></div>
        <div class="title">Node.js专业中文社区</div>
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
      <keep-alive>
        <router-view/>
      </keep-alive>
    </div>

    <div class="slider-wrapper">
      <Slider ref="slider"></Slider>
    </div>


  </div>
</template>

<script>

  import Slider from '../slider/slider.vue'

  export default {
    components: {
      Slider
    },
    methods: {
      sliderCenter(){
        this.$refs.slider.show()
      }
    }
  }
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">

  .index-header {
     background #fff
    .top {
      position: relative
      .icon-wrapper {
        position: absolute
        top: 0
        left: 0
        width 40px
        text-align center
        vertical-align middle
        font-size 30px
        padding: 10px 5px 0 5px;
        color: #4a4c5b
      }
      .title {
        margin 0 auto
        width 80%
        padding-top 10px
        line-height 34px
        color: #4a4c5b
        font-size 18px
        text-align center
      }
    }
    .selectItem {
      display flex
      border-bottom:1px solid rgba(7,17,27,.1)
      .item {
        flex: 1
        text-align center
        margin-top 8px
        font-size 15px
        color: #c2c2c2
        span {
          display block
          padding 4px 2px
          padding-bottom: 10px;
        }
        &.router-link-active {
          span {
            color: #fc9153
            font-size 16px
            border-bottom 1px solid #fc9153
          }
        }
      }
    }

  }

  .slider-wrapper {

  }

</style>
