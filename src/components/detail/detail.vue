<template>
  <transition name="slide">
    <div class="detail-wrapper">

      <div class="header">
        <span class="user" @click="boback"> <i class="cubeic-back"></i> </span>
        <h1 class="title">{{detail.title}}</h1>
      </div>

      <div>
        {{detail}}
         {{detail}} {{detail}} {{detail}}


      </div>



    </div>
  </transition>
</template>

<script type="text/ecmascript-6">

  import {Topics_detail} from 'api/all'
  import {mapGetters} from 'vuex'

  const ERR_OK = true

    export default {
      data(){
          return {
            detail:''
          }
      },
        created(){
          this._Topics_detail()
        },
        computed:{
          ...mapGetters(['author'])
        },
        methods:{

          boback(){
            this.$router.back()
          },

          _Topics_detail(){
            if(!this.author.id){
                this.$router.back()
              return;
            }
           Topics_detail(this.author.id).then(res => {
               if(res.data.success === ERR_OK){
                   this.detail = res.data.data
                 console.log(this.detail)
               }
            })
          }
        }
    };

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  .detail-wrapper{
    position: fixed
    top:0
    bottom:50px
    width 100%
    z-index 999
    overflow hidden
    background #fff
  }
  .slide-enter-active, .slide-leave-active {
    transition: all .3s
  }
  .slide-enter, .slide-leave-to {
    transform: translate3d(100%, 0, 0)
  }

  .header {
    position relative
    border-bottom 1px solid rgba(7, 17, 27, .1)
    .user {
      position: absolute
      top:0
      left: 0
      display inline-block
      padding 10px
      color: #fc9153
      i{
        font-size 24px
      }
    }
    .title {
      width 80%
      margin 0 auto
      line-height 44px
      text-align center
      font-size 16px
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      color: #fc9153
    }
  }


</style>
