<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/index/home">
      <div class="icon"><i class="icon-home"></i></div>
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/index/topic">
      <div class="icon"><i class="icon-topic"></i></div>
      <span class="tab-link">发表</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/index/message">
      <div class="icon"><i class="icon-message"></i></div>
      <span class="tab-link">消息</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/index/userCenter">
      <div class="icon"><i class="icon-user"></i></div>
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
  };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .tab {
    display: flex;
    font-size: 12px;
    border-top 1px solid rgba(7,17,27,.1)
    .tab-item {
      flex: 1;
      text-align: center;
      .icon{
        vertical-align: top;
        padding-top: 6px;
        color: #8e8e93
        i{
          font-size: 20px !important;
        }
      }
      .tab-link {
        display: inline-block;
        width: 100%;
        padding-top: 3px;
        padding-bottom: 5px;
        color: #8e8e93;
        font-size: 15px;
      }
      &.router-link-active {
        .tab-link,.icon {
          color: #fc9153;
        }
      }
    }
  }
</style>
