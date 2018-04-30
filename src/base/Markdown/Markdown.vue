<template>
  <div>
    <cube-textarea
      v-model="query"
      :placeholder="placeholder"
      :maxlength="maxlength"
      :autofocus="autofocus"
    ></cube-textarea>
    <cube-button class="btn" :outline="true" :primary="true" @click="confirm">{{infoText}}</cube-button>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data(){
      return {
        query: '',
        placeholder: '回复支持Markdown语法,请注意标记代码',
        maxlength: 1000,
        autofocus: true
      }
    },
    computed: {
      infoText(){
        if(this.query){
            return '确定'
        }
        return '取消'
      }
    },
    created(){
      this.$watch('query', (newQuery) => {
        this.$emit('query', newQuery)
      })
    },
    methods:{
      confirm(){
         if(this.query){
             this.$emit('confirm',true)
         }else{
           this.$emit('confirm',false)
         }
      }
    }
  };

</script>

<style scoped lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .cube-textarea-wrapper {
    height: 80px
  }

  .cube-textarea_expanded {
    height 120px
  }

  .cube-textarea-wrapper::after{
    border-color: #e3e3e3
  }

  .btn {
    margin-top 16px
  }

</style>
