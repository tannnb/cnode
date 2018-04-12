<template>
  <div class="all-wrapper">

    <cube-scroll
      ref="scroll"
      :listenScroll="listenScroll"
      :data="topicsData"
      :options="options"
      @pulling-down="pullingdown"
    >
      <div class="item" v-for="(items,index) in topicsData">
        <h2 class="title">
          <span :class=" items.top? 'icon-top':iconMode(items.tab) "></span>
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
              <div class="time-start">{{formatDate(items.create_at)}}</div>
              <div class="time-sec">{{formatDate(items.last_reply_at)}}</div>
            </div>
          </div>
        </div>
      </div>
    </cube-scroll>

  </div>
</template>

<script type="text/ecmascript-6">
  import {Topics} from 'api/all'


  const ERR_OK = true

  export default {
    name: '',
    data() {
      return {
        topicsData: [],
        refreshDelay: 1000,
        listenScroll:true,
        options: {             // 上拉加载
          pullDownRefresh: {
            txt: '刷新成功！'
          }
        }
      }
    },
    created(){
      this._Topics()
    },

    methods: {
      _Topics(){
        Topics().then((res) => {
          if (res.data.success === ERR_OK) {
            this.topicsData = res.data.data
            console.log(this.topicsData)
          }
        })
      },
      iconMode(icon){
        return icon == 'ask' ? 'icon-ask' : icon == 'share' ? 'icon-share' : icon == 'good' ? 'icon-good' : icon == 'job' ? 'icon-job' : ''
      },
      pullingdown(){
        setTimeout(() => {
          if (Math.random() > 0.5) {
            this.$refs.scroll.forceUpdate()
          } else {
            this.$refs.scroll.forceUpdate()
          }
        }, 1000)
      },

      formatDate(time){
        var date = new Date(time);
        var time = new Date().getTime() - date.getTime(); //现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
        if (time < 0) {
          return '';
        } else if (time / 1000 < 60) {
          return '刚刚';
        } else if ((time / 60000) < 60) {
          return parseInt((time / 60000)) + '分钟前';
        } else if ((time / 3600000) < 24) {
          return parseInt(time / 3600000) + '小时前';
        } else if ((time / 86400000) < 31) {
          return parseInt(time / 86400000) + '天前';
        } else if ((time / 2592000000) < 12) {
          return parseInt(time / 2592000000) + '月前';
        } else {
          return parseInt(time / 31536000000) + '年前';
        }
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
    .title {
      text-overflow ellipsis
      overflow hidden
      white-space nowrap
      font-size 0
      .icon-top {
        vertical-align middle
        font-size 24px
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

      .name {
        vertical-align middle
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
