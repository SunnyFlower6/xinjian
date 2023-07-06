<template>
  <transition :css="false" @before-enter="handleBeforeEnter" @enter="handleEnter" @leave="handleLeave">
    <slot></slot>
  </transition>
</template>
<script>
import Velocity from 'velocity-animate'
export default {
  props: {
    duration: {
      type: Number,
      default: 300
    },
    before: {
      type: Object,
      default: () => {}
    },
    show: {
      type: [Object, String],
      default: () => {}
    },
    hidden: {
      type: [Object, String],
      default: () => {}
    },
  },
  methods: {
    handleBeforeEnter (el) {
      Object.assign(el.style, Object.assign({}, this.before))
    },
    handleEnter (el, done) {
      Velocity(el, 'finish')
      if (typeof this.show === "string") {
        Velocity(el, this.show, { duration: this.duration, complete: done })
      } else {
        Velocity(el, Object.assign({}, this.show), { duration: this.duration, complete: done })
      }
    },
    handleLeave (el, done) {
      Velocity(el, 'finish')
      if (typeof this.hidden === "string") {
        Velocity(el, this.hidden, { duration: this.duration, complete: done })
      } else {
        Velocity(el, Object.assign({}, this.hidden), { duration: this.duration, complete: done })
      }
    }
  }
}
</script>
