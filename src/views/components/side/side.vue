<template>
  <transition
    :css="false"
    @before-enter="beforeEnter"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <div class="side" :style="sideStyle" v-show="visible" v-clickoutside="handleClose">
      <slot></slot>
    </div>
  </transition>
</template>
<script>
import Velocity from 'velocity-animate'
export default {
  props: {
    width: {
      type: [Number, String],
      required: true
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    value() {
      this.visible = this.value
    }
  },
  data() {
    return {
      visible: this.show
    }
  },
  computed: {
    sideStyle() {
      return {
        width: typeof this.width == 'string' ? this.width : this.width + 'px',
        right: (this.visible ? 0 : -this.width) + 'px'
      }
    }
  },
  methods: {
    handleClose() {
      this.visible = false
      this.$emit('input', this.visible)
    },
    beforeEnter(el) {
      el.style.right = -this.width + 'px'
    },
    enter(el, done) {
      Velocity(el, { right: '0px' }, { duration: 200, complete: done })
    },
    afterEnter() {},
    leave(el, done) {
      Velocity(
        el,
        { right: -this.width + 'px' },
        { duration: 200, complete: done }
      )
    }
  },
  created() {
    this.visible = this.value
  }
}
</script>

<style>
.side {
  overflow: hidden;
  position: absolute;
  height: 100%;
  top: 0px;
  z-index: 1000;
  box-shadow: -2px 0 6px -2px rgba(0, 0, 0, 0.2);
}
</style>
