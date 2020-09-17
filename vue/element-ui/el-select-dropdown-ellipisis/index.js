/*eslint-disable*/
import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

function getStyle(obj, attr) {
  let res = obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
  try {
    return Number(res.replace("px", ""))
  } catch (err) {
    return res
  }
}

Vue.directive('ellipse', {
  bind: function(el, binding) {
    const { value } = binding
    if (value.showTootip === undefined) {
      Vue.set(value, 'showTootip', true)
    }
    el.mouseEnter = function() {
      const dom = el.querySelector('.ellipsis-child')
      if (dom) {
        const pLeft = getStyle(el, 'padding-left')
        const pRight = getStyle(el, 'padding-right')
        const elWidth = el.offsetWidth
        const spanWidth = dom.offsetWidth
        value.showTootip = !!((elWidth - pLeft - pRight) < spanWidth)
      }
    }
    el.addEventListener('mouseenter', el.mouseEnter)
  },
  unbind(el) {
    el.removeEventListener('mouseenter', el.mouseEnter)
  }
})



Vue.directive('ellipse-parent', {
  bind: function(el, binding) {
    const { options, key = 'value' } = binding.value
    if (options.length == 0) return
    options.forEach(item => {
      if (item.showTootip === undefined) {
        Vue.set(item, 'showTootip', true)
      }
    })
    let pLeft, pRight, elWidth
    el.mouseover = function(e) {
      const target = e.target
      if (target.className.includes('ellipsis-parent')) {
        if (!elWidth) {
          const parent = target.parentNode
          elWidth = parent.offsetWidth
          pLeft = getStyle(parent, 'padding-left')
          pRight = getStyle(parent, 'padding-right')
        }
        const dom = target.querySelector('.ellipsis-child')
        const spanWidth = dom.offsetWidth
        const val = target.getAttribute('real-value')
        const len = options.length
        let i = 0
        while (i < len) {
          const mid = options[i]
          if (mid[key] == val) {
            mid.showTootip = !((elWidth - pLeft - pRight) < spanWidth)
            break
          }
          i++
        }
      }
    }
    el.addEventListener('mouseover', el.mouseover)
  },
  unbind(el) {
    el.removeEventListener('mouseover', el.mouseover)
  }
})


new Vue({
  render: h => h(App),
}).$mount('#app')