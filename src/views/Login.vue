<template>
  <div class="login-container">
    <h2> 正在跳转至登录页...</h2>
    <div v-if="showError" class="error-message">系统错误，点击 <a class="try-again" href="">重试</a> ，或联系系统管理员</div>
  </div>
</template>

<script>
import { getSsoUrl } from '@/api/setting'
export default {
  data () {
    return {
      showError: false
    }
  },
  mounted () {
    getSsoUrl().then(res => {
      if (res.data.state === 'ok') {
        let skipUrl = res.data.sso + '/login.html?app=' + this.$config.app
        let callback = window.location.origin
        if (this.$route.query.callback) {
          callback = this.$route.query.callback
        } else {
          if (!callback) {
            callback = window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '')
          }
        }
        skipUrl = skipUrl + '&callback=' + encodeURIComponent(callback)
        document.location.href = skipUrl
      } else {
        this.$Message.error(res.data.msg ? res.data.msg : '未知错误')
        this.showError = true
      }
    }).catch(() => {
      this.showError = true
    })
  }
}
</script>

<style scoped>
.login-container h2 {
  padding: 20px;
}
.error-message {
  color: red;
  padding: 20px;
}
.try-again {
  background: rgb(218, 218, 218);
  border: 1px solid silver;
  padding: 3px;
}
</style>
