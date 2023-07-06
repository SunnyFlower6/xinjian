<template>
  <div class="home-container">
      <div class="home-content">
        <div>示例首页</div>
        <Button @click="handleBug">异常测试</Button>
        <div>{{result}}</div>
      </div>
  </div>
</template>
<script>
import { test } from '@/api/bug'
export default {
  data() {
    return {
      result: ''
    }
  },
  methods: {
    handleBug(){
      test().then(res => {
        if (res.data.state === '') {
          this.result = res.data
        }
      })
    }
  }
}
</script>

<style scoped>
.home-container {
  padding: 24px;
  height: 100%;
}
.home-content {
  height: 100%;
  background-color: white;
  padding: 24px;
}
</style>
