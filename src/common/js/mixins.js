import {formatDate} from "./unit"

export const playlistMixin = {
  filters:{
    _formatDate(times){
      return formatDate(times)
    }
  }
}
