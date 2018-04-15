import {formatDate} from "./unit"

export const commonMixin = {
  methods:{
    goBack(){
      this.$router.back()
    }
  }
}

export const detailMixin = {
  filters:{
    _formatDate(times){
      return formatDate(times)
    }
  }
}
