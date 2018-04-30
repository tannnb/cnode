<template>
    <ul class="message-list">
      <li class="item" v-for="(items,index) in messages" :key="items.id">
        <div class="topicTitle">{{items.topic.title}}</div>
        <div class="author" v-if="items.author">
          <img class="avatar_url" :src="items.author.avatar_url" width="40" alt="">
          <span class="loginname" v-if="items.author"><span class="name">{{items.author.loginname}}</span> 回复了您的话题</span>
          <span class="create_at">{{items.create_at | _formatDate}}</span>
        </div>
        <div class="reply">
          <div v-html="items.reply.content"></div>
        </div>
      </li>
    </ul>
</template>

<script type="text/ecmascript-6">
  import {filterMixin} from '../../common/js/mixins'

    export default {
      mixins: [filterMixin],
      props:{
        messages:{
          type:Array,
          default:  () => []
        }
      }
    };
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .message-list{
    .item{
      padding: 10px
      border-bottom 1px solid rgba(7,17,27,.1)
    }
  }

  .topicTitle{
    background #f4f4f4
    color: #000
    padding 10px
  }

  .author{
    position relative
    .avatar_url{
      padding-top 6px
      border-radius 50%
      vertical-align middle
    }
    .loginname{
      vertical-align middle
      font-size 14px
      color: #9c9c9c
      .name{
        color: #fc9153
      }
    }
    .create_at{
      position: absolute
      right:10px
      top: 50%
      transform translateY(-50%)
      font-size 14px
      color: #000
    }
  }

  .reply{
    padding 10px 0 0 40px
  }


</style>
