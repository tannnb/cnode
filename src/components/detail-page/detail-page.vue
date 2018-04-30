<template>
  <div>

    <div class="header">
      <span class="user" @click="goBack()"> <i class="cubeic-back"></i> </span>
      <h1 class="title">详情</h1>
    </div>
    <div class="content-wrapper">
      <cube-scroll
        :refreshDelay="refreshDelay"
        ref="scroll"
        :data="detailScroll">

        <div class="title-wrapper">
          <div class="title">{{detail.title}}</div>
          <div class="visit">
            <i class="icon-reading"></i>{{detail.visit_count}}
            <i class="icon-message"></i>{{detail.reply_count}}
          </div>
        </div>

        <div v-if="detail.author" class="detail-avatar">
          <div class="avatar"><img width="40" :src="detail.author.avatar_url" alt=""></div>
          <div class="descript">
            <div class="name">{{detail.author.loginname}}</div>
            <div class="replyTime">发布于:{{detail.create_at | _formatDate}}</div>
          </div>
          <div class="visit">
            <div class="tag" :class=" detail.top? 'top':detail.tab ">{{iconMode(detail)}}</div>
          </div>
        </div>

        <section class='markdown-body topic-content' v-html="detail.content"></section>

        <div class="title-reply">共 {{detail.reply_count}} 条回复</div>

        <ul class="selectItem-wrapper">
          <li
            class="selectItem"
            v-for="(items,index) in detail.replies"
            v-if="items.author">
            <div class="desc">
              <div class="avatar"><img width="30" :src="items.author.avatar_url" alt=""></div>
              <div class="author">
                <span class="name">{{items.author.loginname}}</span>
                <span class="time">{{ items.create_at | _formatDate }}</span>
              </div>
              <div class="number">{{index + 1}}F</div>
            </div>
            <div class="reply_content" v-html="items.content"></div>
            <div class="like">
              <span @click="handleReplyClick(items)" :class="{'repltActive':isUps(items.ups)}">
                <i class="icon-zang"></i>点赞({{items.ups.length}})</span>
              <span @click="handleAddReplyClick(items)"><i class="icon-py"></i>回复</span></div>
             <!-- <div class="Markdown-wrapper" v-if="userInfo.loginname && replyId.id === items.id">
                <Markdown
                  @confirm="confirm"
                  @query="query"
                ></Markdown>
              </div>-->
          </li>
        </ul>

        <div class="self_Markdown-wrapper" v-if="userInfo.success">
          <cube-textarea
            v-model="markdown"
            :placeholder="replyplaceholder"
            :maxlength="maxlength"
          ></cube-textarea>
          <cube-button class="btn" :primary="true" @click="handleRepliesClick">回复</cube-button>
        </div>

        <div class="login-wrapper" v-if="!userInfo.success">
          <cube-button @click="goLogin" :primary="true" :outline="true">未登录，是否立即登录?</cube-button>
        </div>
      </cube-scroll>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  require('../../common/stylus/markdown.css');
  import {commonMixin, filterMixin} from '../../common/js/mixins'
  import {mapGetters} from 'vuex'
  import {reply, replies} from '@/api/all'
  import Markdown from 'base/Markdown/Markdown'


  export default {
    mixins: [commonMixin, filterMixin],
    props: {
      detail: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        refreshDelay: 1000,
        detailScroll: [],
        fullpath: '',
        replyId: '',
        markdown: '',
        replyplaceholder: '回复支持Markdown语法,请注意标记代码',
        maxlength: 1000,
        replyData:'',
        contentQuery:''
      }
    },
    components: {
      Markdown
    },
    computed: {
      ...mapGetters(['userInfo', 'author', 'accessToken'])
    },

    mounted() {
      setTimeout(() => {
        if (!this.detail.id) {
          return
        }
        this.$refs.scroll.forceUpdate()
      }, 100)
    },
    watch: {
      detail(newValue) {
        if (newValue) {
          this.detailScroll.push(newValue)

          this.$refs.scroll.forceUpdate()
        }
      }
    },

    methods: {
      iconMode(item) {
        if (item.top) {
          return '置顶'
        }
        return item.tab == 'ask' ? '问答' : item.tab == 'share' ? '分享' : item.tab == 'good' ? '精华' : item.tab == 'job' ? '招聘' : ''
      },

      showAlert() {
        this.$createDialog({
          type: 'alert',
          title: '不能给自己点赞',
          icon: 'cubeic-alert'
        }).show()
      },

      isUps(ups) {
        return ups.indexOf(this.userInfo.id) > -1
      },

      // 点赞
      handleReplyClick(item) {
        if (item.author.loginname == this.userInfo.loginname) {
          this.showAlert()
          return false
        }
        reply(item.id, this.accessToken).then(res => {
          if (!this.userInfo.loginname) {
            this.$router.push({
              path: '/login'
            });
            return;
          }
          if (res.data.action == 'down') {
            const index = item.ups.indexOf(this.userInfo.id);
            if (index > -1) {
              item.ups.splice(index, 1);
            }
          } else {
            item.ups.push(this.userInfo.id);
          }
        })
      },

     /* contentValue(value){
        this.replyValue111 = value
      },*/

      query(query){
        this.contentQuery = query
      },

      confirm(bool) {
       /*
        if (!bool) {
          this.replyId = '';
          return
        }
       */
        const ret = {
          "id": this.author.id,
          "accesstoken": this.accessToken,
          "content": this.contentQuery,
          "reply_id":this.replyId
        }
        console.log(ret)
      },

      handleAddReplyClick(items) {
        this.replyId = items;
      },

      // 回复
      handleRepliesClick() {
        const ret = {
          "id": this.author.id,
          "accesstoken": this.accessToken,
          "content": this.markdown
        }
        let lastReplise = JSON.parse(JSON.stringify(this.detail.replies.slice(this.detail.replies.length - 1)[0]))
        lastReplise = {
          author: {
            avatar_url: this.userInfo.avatar_url,
            loginname: this.userInfo.loginname
          },
          content: `<div class="markdown-text">${this.markdown}</div>`,
          create_at: new Date().toUTCString(),
          id: this.userInfo.id,
          is_uped: 'false',
          reply_id: null,
          ups: []
        }
        replies(ret).then(res => {
          if (res.data.success === true) {
            this.detail.replies.push(lastReplise)
            this.markdown = ''
          }
        })
      },

      goLogin(e) {
        this.$router.push({
          path: "/login"
        })
      }
    }
  };

</script>


<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
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
      display flex
      padding 0 12px 12px 12px
      border-bottom 1px solid rgba(7, 27, 37, .1)
      .avatar {
        flex: 0 0 120
        border-radius 50%
        overflow hidden
        border: 1px solid #ddd
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
          color: #0f0f0f
        }
        .replyTime {
          padding-top 6px
          color: #949494
          font-size 12px
        }
      }
      .visit {
        position: absolute
        right 14px
        top: 11px
        .tag {
          padding 6px 12px
          font-size 13px
          border-radius 40px
          text-align center
          color: #fff
          &.top {
            background #ff572d
          }
          &.ask {
            background #ff572d
          }
          &.share {
            background #4caf50
          }
          &.good {
            background #bf62ff
          }
          &.job {
            background #3aafff
          }
        }
        .readNum {
          display inline-block
          margin-top 6px
          font-size 14px
          color: #000
        }
      }
    }

    .title-wrapper {
      padding: 12px;
      .title {
        font-size: 20px;
        color: #4f4f4f;
        line-height: 1.5;
        font-weight 700
      }
      .visit {
        i {
          padding 0px 4px 0px 10px
        }
        padding 6px 0
        font-size: 15px;
        color: #b3b3b3
      }
    }

    .markdown-body {
      padding 10px 12px
    }
    .title-reply {
      padding: 5px 10px;
      line-height: 24px;
      border-left: 8px solid #4a4c5b;
      background: #f5f5f5;
      font-weight: 400;
      font-size: 16px;
    }

    .selectItem {
      padding 12px
      border-bottom 1px solid rgba(7, 17, 27, .1)
      .desc {
        position: relative
        display flex
        .avatar {
          flex 0 0 50
          width 50px
        }
        .author {
          flex: 1
          .name {
            color #101010
          }
          .time {
            font-size 13px
            padding-left 6px
            color #a4a4a4
          }
        }
        .number {
          position: absolute
          right 10px
          top: 4px
          font-size 13px
          color #a0a0a0
        }
      }
      .reply_content {
        padding-left 50px
        font-size 14px
        line-height 22px
        color: #2d2c2c
      }
      .like {
        padding 14px 10px 6px 0
        text-align right
        font-size 12px
        color: #9d9d9d
        span.repltActive {
          color: #fc9153
        }
        i {
          font-size 18px
        }
        span:nth-child(2) {
          padding-left 12px
        }
      }
      .Markdown-wrapper {
        padding 10px 12px 6px 46px
      }
    }

    .self_Markdown-wrapper {
      padding 24px
      .btn {
        margin-top 24px
      }
    }

  }

  .login-wrapper {
    padding 40px 20px
  }

  .cube-textarea-wrapper::after {
    border-color: #e3e3e3
  }

  .cube-textarea-wrapper {
    height: 80px
  }

  .cube-textarea_expanded {
    height 160px
  }

</style>
