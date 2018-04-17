<template>
  <transition name="toUp">
    <div class="login-wrapper">

      <div class="header"><i @click="goBack" class="cubeic-back"></i></div>
      <div class="logo">cnode用户登陆中心</div>
      <div class="accesstoken">
        <p class="titleTip">请输入您的Access Token</p>
        <cube-textarea
          :placeholder="placeholder"
          v-model="value"></cube-textarea>
      </div>

      <div class="loginBtn">
        <cube-button @click='goLogin' :primary="true">立即登录</cube-button>
      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import {accesstoken} from 'api/all'
  import {mapActions } from 'vuex'

  const ERR_OK = 200


  export default {
    name: '',
    data() {
      return {
        value: '',
        placeholder: ''
      }
    },
    methods: {
      ...mapActions(['saveUserInfoAsync']),
      showToastType() {
        const toast = this.$createToast({
          txt: 'Access Token不能为空!',
          type: 'correct',
          time: 1000
        })
        toast.show()
      },

      goBack(){
        this.$createDialog({
          type: 'confirm',
          icon: 'cubeic-question',
          title: '登陆',
          content: '是否离开？',
          confirmBtn: {
            text: '稍后登陆',
            active: true,
            disabled: false,
            href: 'javascript:;'
          },
          cancelBtn: {
            text: '取消',
            active: false,
            disabled: false,
            href: 'javascript:;'
          },
          onConfirm: () => {
            this.$router.back()
          }
        }).show()
      },

      goLogin(){
        if (!this.value) {
          this.showToastType()
          return
        }


        this.loginToast = this.$createToast({
          time: 0,
          txt: '登陆中，请稍后...'
        }).show()
        accesstoken(this.value).then((res) => {
          if (res.status == ERR_OK) {
              this.saveUserInfoAsync(res.data)
            this.loginToast.hide()
            this.$router.back()

          }
        }).catch(err => {
          this.loginToast.hide()
          this.$createToast({
            txt: 'Correct',
            type: `${err}`
          }).show()
        })

      }

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  .login-wrapper {
    position: fixed
    top: 0
    bottom: 0
    width 100%
    z-index 90
    color: #000
    background url("loginBg.jpg") no-repeat
    &.toUp-enter-active, &.toUp-leave-active {
      transition: all .2s
    }
    &.toUp-enter, &.toUp-leave-to {
      transform: translate3d(0, 100%, 0)
    }
  }

  .header {
    color: #fff
    padding 10px
    font-size 28px
  }

  .logo {
    min-width 200px
    line-height 40px
    font-size 26px
    text-align center
    margin 40px auto
    color #fff
  }

  .cube-textarea {
    background-color transparent !important
    color: #fff
    font-size 16px
  }

  .cube-textarea-wrapper::after {
    border-color: #fff
  }

  .accesstoken {
    padding 60px 10%
    .titleTip {
      color: #fff
      font-size 16px
      padding-bottom 10px
    }
  }

  .loginBtn {
    padding 80px 10% 0 10%
  }

</style>
