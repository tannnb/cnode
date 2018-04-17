import {formatDate} from "./unit"
import {mapMutations} from 'vuex'


export const commonMixin = {
  data() {
    return {
      topicsData: [],
      hasMove: true,
      page: 1,
    }
  },
  methods:{
    ...mapMutations({
      'set_author': 'SET_AUTHOR'
    }),
    goBack(){
      this.$router.back()
    },
    showToastMask(text){
      return this.$createToast({
        txt: text? text :'加载中...',
        mask: true
      })
    },
    showToastType(type='correct',txt='暂无信息') {
      return this.$createToast({
        txt: `${txt}`,
        type: `${type}`,
        time:2000
      })
    }
  }
}

export const filterMixin = {
  filters:{
    _formatDate(times){
      return formatDate(times)
    }
  }
}
