<template>
  <div class="layoutlr-outer">
    <div class="layoutlr-container">
      <div class="layoutlr-container-left">
        <div class="layoutlr-title">
          <slot name="title">{{title}}</slot>
        </div>
        <slot name="left"></slot>
      </div>
      <div class="layoutlr-container-right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped>
.layoutlr-outer {
  position: relative;
  padding: 24px;
  height: 100%;
}
.layoutlr-container {
  overflow: hidden;
  height: 100%;
  background: white;
  text-align: left;
  position: relative;
  /*background-color: #eef2fa;*/
  background-color:#ffffff;
}
.layoutlr-container .layoutlr-container-left {
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  background-color: #eaedf1;
  height: 100%;
  z-index: 100;
  height: 100%;
}
.layoutlr-container .layoutlr-container-right {
  position: relative;
  padding-left: 200px;
  height: 100%;
  /*margin: 35px 0 0 35px;*/
  /*width: 1850px;*/
  /*height: 947px;*/
}
.layoutlr-title {
  text-align: center;
  min-height: 70px;
  line-height: 70px;
  padding: 0px 14px;
  font-weight: bold;
  background-color: #ffffff;
}
</style>
