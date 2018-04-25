<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <div class="userCenterHeader">
        <div @click="goBack" class="icon-wrapper"><i class="cubeic-back"></i></div>
        <div class="title">个人中心</div>
      </div>

      <div class="userCenterInfo">
        <div class="avatar"><img :src="userData.avatar_url" alt=""></div>
        <div class="userInfo-wrapper">
          <p class="loginname">{{userData.loginname}}</p>
          <div class="fl">
            <div class="score"><i class="icon-score"></i> 积分：{{userData.score}}</div>
            <div class="create_at"><i class="icon-create_at"></i> 注册时间：{{userData.create_at | _formatDate }}</div>
          </div>
        </div>
      </div>
      <div class="navigator">
        <ul class="selectItem">
          <li class="item" :class="currentIndex === 0? 'active':'' " @click="selectItem(0)">
            <i class="icon-topic"></i> 我的主题
          </li>
          <li class="item" :class="currentIndex === 1? 'active':'' " @click="selectItem(1)">
            <i class="icon-py"></i>回复
          </li>
        </ul>
        <div class="triangle-up" :class="{left: currentIndex === 0, right: currentIndex === 1}"></div>
      </div>
      <div class="content">
        <div class="no-content" v-if="contentData && contentData.length == 0">
          <img src="./nocontent.png" width="110" alt="">
          <p>暂无信息</p>
        </div>
        <cube-scroll class="scroll" ref="scroll" :data="contentData">
          <div class="selectItem" v-for="(items, index) in contentData" :key="items.id" @click="handleSelectItem(items)">
            <div class="title">主题：{{items.title}}</div>
            <div class="reply">{{items.last_reply_at | _formatDate}}</div>
          </div>
        </cube-scroll>
      </div>
      <router-view></router-view>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapMutations} from 'vuex'
  import {getUserInfo} from '@/api/all'
  import {filterMixin} from '../../common/js/mixins'

  export default {
    mixins: [filterMixin],
    name: '',
    data() {
      return {
        userData: {},
        currentIndex:0,
        types:['recent_topics','recent_replies']
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      contentData(){
        return this.userData[this.types[this.currentIndex]]
      }
    },
    created() {
      this._getUserInfo()
    },
    mounted() {

    },
    methods: {
      ...mapMutations({
        'set_author': 'SET_AUTHOR'
      }),

      goBack() {
       this.$router.push({
          path:'/index/all'
        })
      },

      _getUserInfo() {
        getUserInfo(this.userInfo.loginname).then(res => {
          this.userData = res.data.data
        })
      },
      selectItem(index){
        this.currentIndex = index
        this.$refs.scroll.refresh()
      },
      handleSelectItem(item){
        this.set_author(item)
        this.$router.push({
          path:`/userCenter/${item.id}`
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .detail-wrapper {
    position: fixed
    top: 0
    bottom: 0
    width 100%
    z-index 20
    overflow hidden
    background #fff
    &.slide-leave-active {
      transition: all .4s
    }
    &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }

  }

  .userCenterHeader {
    position: relative
    .icon-wrapper {
      position: absolute
      top: 0
      left: 0
      width 40px
      text-align center
      vertical-align middle
      font-size 16px
      padding: 14px 5px 0 5px;
      z-index 30
      color: #9a9fb3
      .cubeic-back {
        padding: 5px
        border: 1px solid #ddd
        border-radius 50%
      }
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

  .userCenterInfo {
    display flex
    padding 24px 24px 12px 24px
    .avatar {
      flex: 0 0 140
      width 80px
      height: 80px
      margin 0 auto
      border-radius 50%
      border: 2px solid #f5f5f5
      box-shadow 0 0 16px rgba(74, 76, 91, 0.24)
      overflow hidden
      img {
        width 100%
        vertical-align top
      }
    }
    .userInfo-wrapper {
      flex 1
      padding-left 20px
      .loginname {
        padding 6px 0
        line-height 24px
        font-size 18px
        color: #4a4c5b
      }
      .fl {
        margin 0px auto
        font-size 13px
        color: #4a4c5b
        .score {
          color: #fc9153
          padding 6px 0
          i {
            font-size 14px
          }
        }
        .create_at {
          i {
            color: #4a4c5b
          }
        }
      }
    }
  }

  .navigator{
    position: relative
    .selectItem{
      display flex
      justify-content center
      border-bottom 1px solid rgba(7,17,27,.1)
      .item{
        flex 1
        padding 14px 0
        text-align center
        color: #aaaaaa
        &.active{
          color: #fc9153
        }
      }
    }
    .triangle-up {
      position: absolute
      left: 0
      bottom: 0
      width: 50%
      height: 1px
      background #fc9153
      transition: all 0.4s
      &.left{
        left: 0%
      }
      &.right{
        left: 50%
      }
    }

  }

  .content{
    position: fixed
    top:210px
    bottom:0
    width 100%
    overflow hidden
    background #f5f5f5
    .scroll{
      height 100%
      overflow hidden
    }
    .selectItem{
      margin 12px
      padding 10px
      align-items center
      background #fff
      border 1px solid rgba(7,17,27,.08)
      .title{
        margin-bottom  10px
        line-height 20px
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        text-overflow:ellipsis;
        font-size 17px
        color: #4a4c5b
      }
      .reply{
        padding-left 20px
        text-align right
        font-size 12px
        color: #747c8f
      }
    }
    .no-content{
        text-align center
      img{
        padding-top 120px
      }
      p{
        padding-top 10px
        color: #838383
      }
    }
  }

</style>
