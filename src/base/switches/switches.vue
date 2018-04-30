<template>
  <div>
    <ul class="switches">
      <li class="switch-item" v-for="(item,index) in switches" :class="{'active':currentIndex === index}"
          @click="switchItem(index)">
        <span>{{item.name}} </span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      switches: {
        type: Array,
        default: []
      },
      currentIndex: {
        type: Number,
        default: 0
      }
    },
    methods: {
      switchItem(index) {
        this.$emit('switch', index)
      }
    }
  }
</script>

<style scoped lang="stylus">
  .switches
    display: flex
    align-items: center
    width: 240px
    margin: 0 auto
    border: 1px solid #ddd
    border-radius: 50px
    overflow hidden
    .switch-item
      flex: 1
      padding 8px
      text-align: center
      font-size: 16px
      color: #9c9c9c
      &.active
        background: #fc9153
        color: #fff
</style>
