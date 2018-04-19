<template>
  <div class="select-wrapper" ref="selectWrapper">
    <cube-scroll
      ref="scroll"
      class="scroll"
      :listenScroll="listenScroll"
      :data="topicsData"
      @scroll="scroll"
      @pulling-up="pullingup"
      @pulling-down="pullingdown"
      :options="options">
      <div class="item"
           @click="selectItem(items)"
           v-for="(items,index) in topicsData"
           :key="items.id">
        <h2 class="title">
          <span v-if="iconFlag" class="icon" :class=" items.top? 'icon-top':iconMode(items.tab) "></span>
          <span class="name">{{items.title}}</span>
        </h2>
        <div class="descript">
          <div class="avatar"><img :src="items.author.avatar_url" alt=""></div>
          <div class="desc">
            <div class="t">
              <div class="name">{{items.author.loginname}}</div>
              <div class="Reply"> {{items.reply_count}}/{{items.visit_count}} </div>
            </div>
            <div class="b">
              <div class="time-start">{{ items.create_at | _formatDate}}</div>
              <div class="time-sec">{{items.last_reply_at | _formatDate}}</div>
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>
    <transition name="ups">
      <i v-show="upFlag" @click.stop="scrollToUp" class="icon-up up"></i>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import {filterMixin} from 'common/js/mixins'


  export default {
    mixins: [filterMixin],
    props: {
      topicsData: {
        type: Array,
        default: []
      },
      iconFlag: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        refreshDelay: 100,
        listenScroll: true,
        upFlag: false,
        options: {
          pullDownRefresh: {
            txt: '刷新成功！'
          },
          pullUpLoad: {
            threshold:140,
            txt: {
              more: '正在加载中',
              noMore: '没有更多了!'
            }
          }
        }
      }
    },

    mounted(){
      this.selectHeight = this.$refs.selectWrapper.getBoundingClientRect().height;
    },

    methods: {
      pullingup(){
        this.$emit('pullingup')
      },
      pullingdown(){
        setTimeout(() => {
          this.$refs.scroll.forceUpdate()
        }, 1000)
      },

      scroll(pos){
        if (Math.abs(pos.y) > this.selectHeight) {
          this.upFlag = true
          return
        }
        this.upFlag = false
      },

      scrollToUp(){
        this.$refs.scroll.scrollTo(0, 0, 700)
      },

      iconMode(icon){
        switch (icon) {
          case 'ask':
            return 'icon-ask';
            break;
          case 'share':
            return 'icon-share';
            break;
          case 'good':
            return 'icon-good';
            break;
          case 'job':
            return 'icon-job';
            break;
          default:
            '';
        }
      },

      selectItem(item){
        this.$emit('selectItem', item)
      }

    },
    destroyed(){
      this.options = {
        pullDownRefresh: false,
        pullUpLoad: false
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  .item {
    padding 12px
    border-bottom 1px solid rgba(7, 17, 27, .1)
    &::active {
      background #cbcbcb
    }
    .title {
      display flex
      padding-bottom 6px
      font-size 0
      .icon-top {
        vertical-align middle
        font-size 20px
        color: #ff361e
      }
      .icon-share {
        vertical-align middle
        font-size 20px
        color: #4caf50
      }
      .icon-ask {
        vertical-align middle
        font-size 20px
        color: #ff361e
      }
      .icon-job {
        vertical-align middle
        font-size 24px
        color: #3aafff
      }

      .icon {
        flex: 0 0 30
        width 30px
        justify-content center
        margin 0 auto
      }
      .name {
        flex: 1
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        vertical-align middle
        line-height 24px
        font-size 16px
      }

    }

    .descript {
      display flex
      padding 6px 0
      .avatar {
        flex 0 0 60
        width 50px
        height: 50px
        border-radius 50%
        overflow hidden
        img {
          width 100%
        }
      }
      .desc {
        padding-left 12px
        flex 1

        .t {
          padding 8px 0
          display flex
          justify-content space-between
          font-size 14px
          color: #9c9c9c
          .name {
            color: #4a4c5b
            font-size 16px
          }
          .Reply {
            color: #4a4c5b
            font-size 13px
          }
        }
        .b {
          display flex
          justify-content space-between
          font-size 12px
          color: #9c9c9c
          .time-start {
            font-size 12px
          }
          .time-sec {
          }
        }
      }
    }

  }

  .select-wrapper {
    position: relative
    .up {
      position: absolute
      bottom 30px
      right: 30px
      padding 14px
      font-size 24px
      border-radius 50%
      background #fff
      z-index 10
      color: #727888
      box-shadow 0px 0px 20px rgba(114, 120, 136, 0.49)
      &.ups-enter-active, &.ups-leave-active {
        transition: all .2s
      }
      &.ups-enter, &.ups-leave-to {
        transform: scale(0)
      }
    }
  }


</style>
