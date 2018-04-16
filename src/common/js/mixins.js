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
