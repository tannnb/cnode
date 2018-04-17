<template>
  <div>
    <div class="all-wrapper">
      <select-list class="select-list"
                   :topicsData="topicsData"
                   @pullingup="pullingup"
                   @selectItem="selectItem"
      ></select-list>
    </div>
    <router-view></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getSelectData} from 'api/all'
  import {mapMutations} from 'vuex'
  import {commonMixin} from 'common/js/mixins'
  import SelectList from '../../../base/select-list/select-list.vue'

  const ERR_OK = true
  const ALL = 'all'

  export default {
    mixins:[commonMixin],
    components: {
      SelectList
    },
    created() {
      this._getSelectData()
    },
    methods: {
      _getSelectData() {
       this.showToastMask().show()
        getSelectData(ALL).then((res) => {
          if (res.data.success === ERR_OK) {
            this.showToastMask().hide()
            this.topicsData = res.data.data
          }
        }).catch(error => {
          this.showToastMask().hide()
          this.showToastType('correct','网络故障').show()
        })
      },

      // 上拉加载
      pullingup() {
        if (!this.hasMove) {
          this.$refs.scroll.forceUpdate()
          return false;
        }
        this.page++;
        getSelectData(ALL,this.page).then((res) => {
          if (res.data.success === ERR_OK) {
            this.topicsData = this.topicsData.concat(res.data.data)
            this._checkMore(this.topicsData)
          }
        })
      },
      _checkMore(item) {
        if (!item.length) {
          this.hasMove = false
        }
      },

      selectItem(item) {
        this.set_author(item)
        console.log(item)
        this.$router.push({
          path: `/index/all/${item.id}`
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  .all-wrapper {
    position fixed
    top: 84px
    bottom: 0
    width 100%
    overflow hidden
    .select-list {
      height: 100%
      overflow: hidden
    }
  }


</style>


