<template>
  <div>



  </div>
</template>

<script type="text/ecmascript-6">
  import {good} from 'api/good'
  export default {
    name: '',
    data() {
      return {}
    },
    created(){
      this._good()
    },
    methods: {
      _good(){
        good().then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">

</style>
