<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <div class="userCenterHeader">
        <div @click="goBack" class="icon-wrapper"><i class="cubeic-back"></i></div>
        <div class="title">
          <switches @switch="switchItem" :switches="switches" :currentIndex="currentIndex"></switches>
        </div>
      </div>

      <div class="oContent">
        <!-- 已读 -->
        <cube-scroll v-if="currentIndex===0" :data="messagesData.has_read_messages">
          <message-list :messages="messagesData.has_read_messages"></message-list>
        </cube-scroll>
        <cube-scroll v-if="currentIndex===1" :data="messagesData.hasnot_read_messages">
          <message-list :messages="messagesData.hasnot_read_messages"></message-list>
        </cube-scroll>
        <!-- 未读 -->
      </div>
      <no-result v-show="noResult"></no-result>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import switches from 'base/switches/switches'
  import messageList from 'base/message-list/message-list'
  import noResult from 'base/no-result/no-result'
  import {mapGetters} from 'vuex'
  import {getMessages} from '@/api/all'

    export default {
        data() {
          return {
            currentIndex:0,
            switches:[
              {name: '已读消息'},
              {name: '未读消息'}
            ],
            messagesData:{}
          }
        },
      components:{
        switches,
        messageList,
        noResult
      },
      created(){
        this._getMessages()
      },
      computed:{
        ...mapGetters(['accessToken']),
        noResult() {
          if (this.currentIndex === 0) {
            return this.messagesData && this.messagesData.has_read_messages.length == 0
          } else {
            return this.messagesData && this.messagesData.hasnot_read_messages.length == 0
          }
        }
      },
      methods:{
        goBack(){
          this.$router.back()
        },
        switchItem(index){
          this.currentIndex = index
          console.log(index)
        },
        _getMessages(){
          getMessages(this.accessToken).then(res => {
            if(res.data.success == true){
              this.messagesData = res.data.data
              console.log(this.messagesData)
            }

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
      top:5px
      left: 5px
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
      padding-bottom 10px
      color: #4a4c5b
      font-size 18px
      text-align center
    }
  }

  .oContent{
    position: fixed
    top:54px
    bottom:0
    width 100%
    overflow hidden
    background #fff
    .scroll{
      height 100%
      overflow hidden
    }

  }




</style>
