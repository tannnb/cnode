<template>
  <div class="index">

    <div class="header"><h1 class="title">vue-cnode</h1></div>

    <div class="ocontent"><router-view/></div>

    <div class="footer"><tab></tab></div>

  </div>
</template>

<script>
  import Tab from 'components/tab/tab'

  export default {
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    components: {
      Tab
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus" rel="stylesheet/stylus">
  .header {
    position relative
    border-bottom 1px solid rgba(7, 17, 27, .1) /*  .user {
      position: absolute
      top:0
      left: 0
      display inline-block
      padding 10px
      i{
        font-size 24px
      }
    }*/
    .title {
      width 80%
      margin 0 auto
      line-height 44px
      text-align center
      font-size 22px
      color: #fc9153
    }
  }

  .ocontent {
    position: fixed
    top: 44px
    bottom: 50px
    width 100%
    overflow hidden
  }

  .footer {
    position: absolute
    left: 0
    bottom: 0
    width 100%
    z-index 10
  }
</style>
