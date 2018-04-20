<template>
  <transition name="slide">
    <div class="topic-wrapper">
      <div class="topicHeader">
        <div @click="goBack" class="icon-wrapper"><i class="cubeic-back"></i></div>
        <div class="title">发表话题</div>
      </div>

      <div class="oContent">
        <cube-select
          v-model="tab"
          :placeholder="placeholder"
          :auto-pop="autoPop"
          :disabled="disabled"
          :options="options">
        </cube-select>

        <cube-input class="titleInput"
                    v-model="themeTitle"
                    :type="type"
                    :placeholder="titleplaceholder"
                    :clearable="clearable"
        ></cube-input>

        <cube-textarea class="textareaInput"
                       v-model="contentValue"
                       :placeholder="contentplaceholder"
                       :maxlength="contentmaxlength"
        ></cube-textarea>

        <cube-button class="InputBtn"
                     @click="handlePublishClick"
          :primary="true">发表</cube-button>

      </div>

    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import {topics_theme} from '@/api/all'
  import {mapGetters} from 'vuex'

    export default {
        data() {
          return {
            options:[
              { text: '招聘', value: 'job'},
              { text: '客户端测试', value: 'dev'},
              { text: '分享', value: 'share'},
              { text: '问答', value: 'ask'}
            ],
            tab:'',
            autoPop:false,
            disabled:false,
            placeholder:'请选择话题',
            themeTitle:'',
            type:'text',
            titleplaceholder:'请输入标题',
            clearable:true,
            contentValue:'',
            contentplaceholder:'请输入您的内容，且30个字符以上',
            contentmaxlength:10000
          }
        },
      created(){
      },
      computed:{
        ...mapGetters(['accessToken'])
      },
      methods:{
        _topics_theme(){

          topics_theme({
            accesstoken:this.accessToken,
            tab:this.tab,
            title:this.themeTitle,
            content:this.contentValue
          }).then(res => {

          }).catch(error => {

          })
        },
        goBack() {
          this.$router.back()
        },
        showToastType(txt) {
          return this.$createToast({
            txt:txt,
            type: 'error',
            time:1000
          })
        },
        handlePublishClick(){
          if (!this.tab){
            this.showToastType('请选择话题类型').show()
            return;
          }
          if (!this.themeTitle){
            this.showToastType('标题不能为空!').show()
            return;
          }
          if (!this.contentValue){
            this.showToastType('内容区域不能为空!').show()
            return;
          }

          // 提交话题
          this.$createDialog({
            type: 'confirm',
            icon: 'cubeic-alert',
            title: '话题',
            content: '是否立即提交当前话题？',
            confirmBtn: {
              text: '确定',
              active: true,
              disabled: false,
            },
            cancelBtn: {
              text: '取消',
              active: false,
              disabled: false,
            },
            onConfirm: () => {
              /*const toast = this.$createToast({
                time: 0,
                txt: '提交中，请稍后...'
              }).show()
              setTimeout(() => {
                toast.hide()
              }, 2000)*/
              this._topics_theme()
            }
          }).show()




        }
        /*change(value, index, text) {
          console.log('change', value, index, text)
          console.log(this.value)
        }*/
      }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .topic-wrapper {
    position: fixed
    top: 0
    bottom: 0
    width 100%
    z-index 30
    overflow hidden
    background #fff
    &.slide-leave-active {
      transition: all .4s
    }
    &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }

  }

  .topicHeader {
    position: relative
    border-bottom 1px solid rgba(7,17,27,.1)
    .icon-wrapper {
      position: absolute
      top: 0
      left: 0
      width 40px
      text-align center
      vertical-align middle
      font-size 18px
      padding: 14px 5px 0 5px;
      z-index 30
      color: #9a9fb3
    }
    .title {
      margin 0 auto
      width 80%
      line-height 44px
      color: #4a4c5b
      font-size 18px
      text-align center
    }
  }

  .cube-input::after,.cube-textarea-wrapper::after{
    border-color: #ccc
  }
  .cube-textarea_expanded {
      height 200px
  }
  .oContent{
    padding 24px
    .titleInput{
      margin-top  20px
    }
    .textareaInput{
      margin-top  20px
    }
    .InputBtn{
      margin-top 60px
    }
  }


</style>
