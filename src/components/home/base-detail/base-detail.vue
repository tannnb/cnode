<template>
  <transition name="slide">
    <div class="detail-wrapper">
       <detail-page :detail="detail"></detail-page>
    </div>
  </transition>

</template>

<script type="text/ecmascript-6">
  import detailPage from '../../detail-page/detail-page.vue'
  import {Topics_detail} from 'api/all'
  import {mapGetters} from 'vuex'

  const ERR_OK = true
  export default {
    data() {
      return {
        detail: {}
      }
    },
    components: {
      detailPage
    },
    created() {
      this._Topics_detail()
    },
    computed: {
      ...mapGetters(['author'])
    },
    methods: {
      async _Topics_detail() {
        if (!this.author.id) {
          this.$router.back()
          return;
        }
        await Topics_detail(this.author.id).then(res => {
          if (res.data.success === ERR_OK) {
            this.detail = res.data.data
              console.log(this.detail)
          }
        })
      }
    }
  };

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
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
