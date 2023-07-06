<template>
  <div class="login-container">
    <h2> 正在跳转...</h2>
    <div v-if="showError" class="error-message">系统错误，点击 <a class="try-again" href="">重试</a> ，或联系系统管理员</div>
  </div>
</template>

<script>
import { ssoByPortalSystem } from '@/api/setting'
import qs from 'qs'
export default {
  data () {
    return {
      showError: false
    }
  },
  mounted () {
    let query = qs.parse(document.location.search, {
      ignoreQueryPrefix: true
    })
    let params={
      app: this.$config.app,
      ssotoken: query.ssotoken
    }
    ssoByPortalSystem(params).then(res => {
      if (res.data.state === 'ok') {
        window.open(`http://10.15.183.41:11023/?token=${res.data.token}#/fuzzy/fuzzy_search`, '_self');
      }else{
        this.$Notice.error({
          title: res.data.msg
        })
      }
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
