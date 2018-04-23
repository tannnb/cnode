<template>
  <transition name="slide">
    <div class="detail-wrapper">
      <detail-page :detail="detail"></detail-page>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import detailPage from '../../../components/detail-page/detail-page'
  import {mapGetters,mapMutations} from 'vuex'
  import {Topics_detail} from "../../../api/all";

  const ERR_OK = true

  export default {
    data() {
      return {
        detail:{}
      }
    },
    computed: {
      ...mapGetters(['author'])
    },
    components: {
      detailPage
    },
    beforeRouteEnter (to, from, next) {
      next(vm => {
        vm.setPathUrl(from.path)
      })
    },
    created(){
      this._Topics_detail()
    },
    methods:{
      ...mapMutations({
        'setPathUrl':'SET_PATH_URL'
      }),
      _Topics_detail(){
        if(!this.author.id){
          this.$router.back()
          return;
        }
        Topics_detail(this.author.id).then(res => {
          if(res.data.success === ERR_OK){
            this.detail = res.data.data
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
    z-index 999
    overflow hidden
    background #fff
    &.slide-enter-active, &.slide-leave-active {
      transition: all .4s
    }
    &.slide-enter, &.slide-leave-to {
      transform: translate3d(100%, 0, 0)
    }
  }
</style>
