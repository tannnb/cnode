<template>
  <transition name="slide">
    <div class="slider" v-show="sliderFlag" @click.stop="hide">

      <div class="list-wrapper" @click.stop>
        <div class="userAvatar">
          <div class="user">
            <img :src="avatar? avatar:''" alt="">
          </div>
          <div v-if="!loginnane" class="desc" @click="goLogin">立即登陆</div>
          <div v-if="loginnane" class="desc">{{loginnane}}</div>
          <div class="blur"></div>
        </div>
        <ul class="silderItem">
          <li class="items" @click="hide"><i class="icon-home"></i> 全部</li>
          <li class="items" data-to="/topic" @click="goRouter"><i class="icon-topic"></i> 话题发表</li>
          <li class="items" data-to="/message" @click="goRouter_message"><i class="icon-message"></i>
            我的收藏<span v-if="countData && countFlow === 1" class="count">{{countData}}</span>
          </li>
          <li class="items" data-to="/userCenter" @click="goRouter"><i class="icon-user"></i> 个人中心</li>
        </ul>
        <div class="signOut" v-if="userInfo.success">
          <cube-button @click.native="singout"  :outline="true">退出登陆</cube-button>
        </div>
      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions,mapMutations} from 'vuex'
  import {getMessageCount} from '@/api/all'

  export default {
    data(){
      return {
        sliderFlag: false,
        countData:''
      }
    },
    computed: {
      ...mapGetters(['userInfo','accessToken','countFlow']),
      loginnane(){
        return this.userInfo.loginname
      },
      avatar(){
        return this.userInfo.avatar_url
      }
    },
    created(){
      this._getMessageCount()
    },
    mounted(){
      console.log(this.userInfo)
    },
    methods: {
      ...mapActions([
          'singOutLoginAsync'
      ]),
      ...mapMutations({
        "set_countFlow":"SET_COUNTFLOW"
      }),
      show(){
        this.sliderFlag = true
      },
      hide(){
        this.sliderFlag = false
      },
      goRouter(e){
          const path = e.target.getAttribute('data-to')
          this.$router.push({
            path:`${path}`
          })
      },
      goRouter_message(e){
        const path = e.target.getAttribute('data-to')
        this.set_countFlow()
        this.$router.push({
          path:`${path}`
        })
      },
      goLogin(){
        this.$router.push({
          path: '/login'
        })
      },
      singout(){
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-alert',
          content: '是否立即退出',
          confirmBtn: {
            text: '确定',
            active: true,
            disabled: false,
          },
          cancelBtn: {
            text: '取消',
            disabled: false,
          },
          onConfirm: () => {
            this.singOutLoginAsync()
            this.hide()
          }
        }).show()

      },
      _getMessageCount(){
        getMessageCount(this.accessToken).then(res => {
          if(res.data.success === true){
            this.countData = res.data.data
          }
        }).catch(err => {
          console.log(err)
        })
      }
    }
  };

</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .slider {
    position: fixed
    top: 0
    bottom: 0
    width 100%
    z-index 90
    color: #fff
    background rgba(0, 0, 0, 0.52)
    &.slide-enter-active, &.slide-leave-active {
      transition: opacity .3s
      .list-wrapper {
        transition: all .3s
      }
    }
    &.slide-enter, &.slide-leave-to {
      transition: opacity .3s
      .list-wrapper {
        transform: translate3d(-100%, 0, 0)
      }
    }
  }

  .list-wrapper {
    position: absolute
    top: 0
    bottom: 0
    width 60%
    background #fff
    .userAvatar {
      display flex
      padding 30px 0
      min-height 60px
      align-items center
      border-bottom 1px solid rgba(7,17,27,.1)
      .user {
        flex: 0 0 80
        width 60px
        height: 60px
        margin 0 10px
        border-radius 50%
        background url("user.png") no-repeat
        background-size: cover;
        border: 4px solid rgba(240, 240, 240, 0.4)
        overflow hidden
        img {
          width 100%
        }
      }
      .desc {
        flex: 1
        font-size 20px
        color: #4a4c5b
      }

    }

    .silderItem {
      color: #000
      padding-left 14%
      padding-top 20px
      .items {
        position: relative
        padding 10px 0
        font-size 18px
        line-height 28px
        color: #5d5d5d
        .count{
          position: absolute
          margin-top -5px
          margin-left 4px
          display inline-block
          width 20px
          height: 20px
          line-height: 20px
          background red
          color: #fff
          font-size 14px
          border-radius 50%
          text-align center
        }
      }
    }

    .signOut {
      position: absolute
      bottom 20px
      left: 20px
      right: 20px
    }
  }

</style>
