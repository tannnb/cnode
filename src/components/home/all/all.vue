<template>
  <div class="all-wrapper">

    <cube-scroll
      ref="scroll"
      :listenScroll="listenScroll"
      :data="topicsData"
      :options="options"
      @pulling-up="pullingup"
      @pulling-down="_Topics"
    >
      <div class="item"
           @click="selectItem(items)"
           v-for="(items,index) in topicsData"
           :key="items.id">
        <h2 class="title">
          <span class="icon" :class=" items.top? 'icon-top':iconMode(items.tab) "></span>
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

    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {Topics} from 'api/all'
  import {mapMutations} from 'vuex'
  import {detailMixin} from 'common/js/mixins'


  const ERR_OK = true

  export default {
    mixins:[detailMixin],
    data() {
      return {
        topicsData: [],
        refreshDelay: 1000,
        hasMove:true,
        page:1,
        listenScroll:true,
        options: {             // 上拉加载
          pullDownRefresh: {
            txt: '刷新成功！'
          },
          pullUpLoad: {
            threshold: 0,
            txt: {
              more: '正在加载中',
              noMore: '没有更多了!'
            }
          }
        }
      }
    },
    created(){
      this._Topics()
    },

    methods: {
      ...mapMutations({
        'set_author':'SET_AUTHOR'
      }),

      _Topics(){
        this.hasMove = true;
        Topics().then((res) => {
          if (res.data.success === ERR_OK) {
            this.topicsData = res.data.data
            this._checkMore(this.topicsData)
          }
        })
      },

      iconMode(icon){
        return icon == 'ask' ? 'icon-ask' : icon == 'share' ? 'icon-share' : icon == 'good' ? 'icon-good' : icon == 'job' ? 'icon-job' : ''
      },

      // 上拉加载
      pullingup(){
        if (!this.hasMove) {
          this.$refs.scroll.forceUpdate()
          return false;
        }
        this.page++;
        Topics(this.page).then((res) => {
          if (res.data.success === ERR_OK) {
            this.topicsData =  this.topicsData.concat(res.data.data)
            this._checkMore(this.topicsData)
          }
        })
      },

      selectItem(item){
          this.set_author(item)
          this.$router.push({
            path:`/index/home/all/${item.id}`
          })
      },

      _checkMore(item){
        if (!item.length) {
          this.hasMove = false
        }
      }

    },
    destroyed(){
     this.options = {
       pullDownRefresh:false,
       pullUpLoad:false
     }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  .all-wrapper {
    position absolute
    top: 0
    bottom: 0
    width 100%
    overflow hidden
  }

  .item {
    padding 12px
    border-bottom 1px solid rgba(7, 17, 27, .1)
    &::active{
      background #cbcbcb
    }
    .title {
      display flex
      align-items center
      font-size 0
      .icon-top {
        vertical-align middle
        font-size 22px
        color: #ff361e
      }
      .icon-share {
        vertical-align middle
        font-size 24px
        color: #42cb3f
      }
      .icon-ask {
        vertical-align middle
        font-size 24px
        color: #ff361e
      }

      .icon{
        flex:0 0 50
        width 50px
        justify-content center
        margin 0 auto
      }
      .name {
        flex: 1
        vertical-align middle
        line-height 24px
        font-size 18px
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
            color: #000
            font-size 16px
          }
          .Reply {

          }
        }
        .b {
          display flex
          justify-content space-between
          font-size 14px
          color: #9c9c9c
          .time-start {

          }
          .time-sec {
          }
        }
      }
    }

  }

</style>


