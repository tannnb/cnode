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
        </div>
        <ul class="silderItem">
          <li class="items" @click="hide"><i class="icon-home"></i> <span>全部</span></li>
          <li class="items" @click="goRouter"><i class="icon-topic"></i> <span>话题</span></li>
          <li class="items" @click="goRouter"><i class="icon-message"></i> <span>消息</span></li>
          <li class="items" @click="goRouter"><i class="icon-user"></i> <span>个人中心</span></li>
        </ul>
        <div class="signOut">
          <cube-button @click.native="singout" :primary="true" :outline="true">退出登陆</cube-button>
        </div>
      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {mapGetters,mapActions} from 'vuex'
  export default {
    data(){
      return {
        sliderFlag: false
      }
    },
    computed: {
      ...mapGetters(['userInfo']),
      loginnane(){
        return this.userInfo.loginname
      },
      avatar(){
        return this.userInfo.avatar_url
      }
    },
    mounted(){
      console.log(this.userInfo)
    },
    methods: {
      ...mapActions([
          'singOutLoginAsync'
      ]),
      show(){
        this.sliderFlag = true
      },
      hide(){
        this.sliderFlag = false
      },
      goRouter(){
        if (!this.userInfo.success) {
          //  this.$router.
        }
      },
      goLogin(){
        this.$router.push({
          path: '/login'
        })
      },
      singout(){
        this.singOutLoginAsync()
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
      border-bottom 1px solid #ddd
      .user {
        flex: 0 0 80
        width 80px
        height: 80px
        margin 0 10px
        border-radius 50%
        background #ddd
        overflow hidden
        img {
          width 100%
        }
      }
      .desc {
        flex: 1
        font-size 20px
        color: #2196f3
      }

    }

    .silderItem {
      color: #000
      padding-left 20%
      padding-top 20px
      .items {
        padding 10px 0
        font-size 18px
        line-height 28px
        color: #5d5d5d
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
