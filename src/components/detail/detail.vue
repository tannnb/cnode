<template>
  <transition name="slide">
    <div class="detail-wrapper">


      <div class="header">
        <span class="user" @click="boback"> <i class="cubeic-back"></i> </span>
        <h1 class="title">详情</h1>
      </div>

      <div class="content-wrapper">
        <cube-scroll :data="detailScroll">

          <div class="title-wrapper">{{detail.title}}</div>

          <div v-if="detail.author" class="detail-avatar">
            <div class="avatar"><img width="50" :src="detail.author.avatar_url" alt=""></div>
            <div class="descript">
              <div class="name">{{detail.author.loginname}} </div>
              <div class="replyTime">发布于:{{detail.create_at | _formatDate}}</div>
            </div>
            <div class="visit">
              <div class="tag" :class=" detail.top? 'top':detail.tab ">{{iconMode(detail)}}</div>
              <span class="readNum">{{detail.visit_count}}次浏览</span>
            </div>
          </div>

          <section class='markdown-body topic-content' v-html="detail.content"></section>

        </cube-scroll>
      </div>


    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  require('../../common/stylus/markdown.css');

  import {Topics_detail} from 'api/all'
  import {mapGetters} from 'vuex'
  import {playlistMixin} from 'common/js/mixins'

  const ERR_OK = true

  export default {
    mixins: [playlistMixin],
    data(){
      return {
        detail: {},
        detailScroll: []
      }
    },
    created(){
      this._Topics_detail()
    },
    mounted(){

    },
    computed: {
      ...mapGetters(['author'])
    },
    methods: {
      boback(){
        this.$router.back()
      },

      async _Topics_detail(){
        if (!this.author.id) {
          this.$router.back()
          return;
        }
        await Topics_detail(this.author.id).then(res => {
          if (res.data.success === ERR_OK) {
            this.detail = res.data.data
            this.detailScroll.push(res.data.data)
            console.log(this.detail)
          }
        })
      },

      iconMode(item){
        if (item.top) {
          return '置顶'
        }
        return item.tab == 'ask' ? '问答' : item.tab == 'share' ? '分享' : item.tab == 'good' ? '精华' : item.tab == 'job' ? '招聘' : ''
      }

    }
  };

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  .detail-wrapper {
    position: fixed
    top: 0
    bottom: 0
    width 100%
    z-index 999
    overflow hidden
    background #fff
    &.slide-enter-active, &.slide-leave-active {
      transition: all .2s
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }

  }

  .header {
    position relative
    border-bottom 1px solid rgba(7, 17, 27, .1)
    .user {
      position: absolute
      top: 0
      left: 0
      display inline-block
      padding 10px
      color: #cacaca
      i {
        font-size 24px
      }
    }
    .title {
      width 80%
      margin 0 auto
      line-height 44px
      text-align center
      font-size 18px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      color: #454545
    }
  }

  .content-wrapper {
    position absolute
    top: 45px
    bottom: 0
    width 100%
    .detail-avatar {
      position: relative
      padding 0 12px 4px 12px
      display flex
      .avatar {
        flex: 0 0 120
        border-radius 50%
        overflow hidden
        border: 3px solid #ddd
        img {
          vertical-align top
        }
      }
      .descript {
        flex 1
        padding-left 10px
        font-size 14px
        color: #929292
        .name {
          padding-top 4px
          font-size 17px
          color: #FF9800
        }
        .replyTime {
          padding-top 6px
          color: #505050
          font-size 13px
        }
      }
      .visit {
        position: absolute
        right 10px
        top: 4
        .tag {
          padding 4px 0
          font-size 13px
          border-radius 4px
          text-align center
          color: #fff
          &.top{
            background #ff572d
          }
          &.ask{
            background #ff572d
          }
          &.share{
            background #42cb3f
          }
          &.good{
            background #bf62ff
          }
        }
        .readNum {
          padding-top 6px
          font-size 14px
          color: #000
        }
      }
    }

    .title-wrapper {
      padding: 5px;
      margin: 15px;
      font-size: 18px;
      color: #2c3e50;
      line-height: 1.5;
      background-color: #f0f0f0;
      border-radius: 5px;
    }

    .markdown-body {
      padding 10px 12px
    }

  }


</style>
