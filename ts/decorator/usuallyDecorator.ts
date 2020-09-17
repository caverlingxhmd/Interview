import { debounce, throttle } from 'lodash'
import { Toast, Dialog } from 'vant'

function noop(): void { }

/**
 * 函数防抖装饰器
 * @param {number} wait 需要延迟的毫秒数。
 * @param {Object} options 选项对象
 * [options.leading=false] (boolean): 指定在延迟开始前调用。
 * [options.maxWait] (number): 设置 func 允许被延迟的最大值。
 * [options.trailing=true] (boolean): 指定在延迟结束后调用。
 */
function Debounce(wait: number, options: any = {}): any {
  return function (target: any, name: any, descriptor: any) {
    descriptor.value = debounce(descriptor.value, wait, options)
  }
}

/**
 * 函数节流装饰器
 * @param {number} wait 节流的毫秒
 * @param {Object} options 节流选项对象
 * [options.leading=true] (boolean): 指定调用在节流开始前。
 * [options.trailing=true] (boolean): 指定调用在节流结束后。
 */
function Throttle(wait: number, options: any = {}): any {
  return function (target: any, name: any, descriptor: any) {
    descriptor.value = throttle(descriptor.value, wait, options)
  }
}

// 函数只运行一次
function Once(): any {
  let called = false
  return function (target: any, name: any, descriptor: any) {
    const originFn = descriptor.value
    descriptor.value = function (...args: any) {
      if (!called) {
        called = true
        fn.apply(this, args)
      }
    }
  }
}

// 缓存第一次的数据
function Cache(): any {
  let cache = {}
  return function (target: any, name: any, descriptor: any) {
    const originFn = descriptor.value
    descriptor.value = function (...args: any) {

    }
  }
}




/**
 * loading 装饰器
 * @param {*} message 提示信息
 * @param {function} errorFn 异常处理逻辑
 */
export const loading = function (message: string = '加载中...', errorFn: any = noop): any {
  return function (target: any, name: any, descriptor: any) {
    const fn = descriptor.value
    descriptor.value = async function (...rest: any) {
      const loading = Toast.loading({
        message: message,
        forbidClick: true
      })
      try {
        return await fn.call(this, ...rest)
      } catch (error) {
        // 在调用失败，且用户自定义失败的回调函数时，则执行
        errorFn && errorFn.call(this, error, ...rest)
        console.error(error)
      } finally {
        loading.clear()
      }
    }
  }
}

/**
 * 确认提示框装饰器
 * @param {*} message 提示信息
 * @param {*} title 标题
 * @param {*} cancelFn 取消回调函数
 */
export function confirm(
  message = '确定要删除数据，此操作不可回退。',
  title = '提示',
  cancelFn = noop
) {
  return function (target: any, name: any, descriptor: any) {
    const originFn = descriptor.value
    descriptor.value = async function (...rest: any) {
      try {
        await Dialog.confirm({
          message,
          title: title
        })
        originFn.apply(this, rest)
      } catch (error: any) {
        cancelFn && cancelFn(error)
      }
    }
  }
}
