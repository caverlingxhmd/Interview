const getType = function(type) {
  return function(data) {
    return Object.prototype.toString.call(data) === `[object ${type}]`
  }
}

const isArray = getType('Array')
const isFunction = getType('Function')
const isString = getType('String')
const isDate = getType('Date')

// 实现深克隆 深比较
{
  // 深克隆
  function deepClone(obj) {
    if (obj == null || typeof obj !== 'object') return obj
    let newObj = null
      // 时间对象有特殊性
    if (obj.constructor === Date) {
      newObj = new obj.constructor(obj)
    } else {
      newObj = obj.constructor()
    }

    for (let key in Object.getOwnPropertyDescriptors(obj)) {
      newObj[key] = deepClone(obj[key])
    }
    return newObj

  }

  const a = {
    a() {
      console.log(11111)
    }
  }

  const b = deepClone(a)

  b.a = 1
  console.log(a.a)

  // 深度比较
  function deepCompare(a, b) {
    // 基本类型比较 直接比较值相等
    if (a == null || typeof a !== 'object' || b == null || typeof b !== 'object') return a === b
    const propsA = Object.getOwnPropertyDescriptors(a)
    const propsB = Object.getOwnPropertyDescriptors(b)
    if (Object.keys(propsA).length !== Object.keys(propsB).length) return false
    return Object.keys(propsA).every(key => deepCompare(a[key], b[key]))
  }
  // console.log(deepCompare(1, false))
}


// 手动实现 bind方法
{
  Function.prototype._bind = function(context, ...args) {
    const _this = this // 这个this指向 A
    return function(...args1) {
      args = args.concat(args1)
      return _this.apply(context, args)
    }
  }

  const a = {
    a: 1
  }

  function A() {
    console.log(this.a)
  }

  const B = A._bind(a)

  B()
}

// 阿里巴巴经典面试题
{
  // getName() // 函数提升
  // function Foo() {
  //   getName = function () {
  //     console.log(1);
  //   };
  //   return this;
  // }
  // Foo.getName = function () {
  //   console.log(2);
  // };
  // Foo.prototype.getName = function () {
  //   console.log(3);
  // };

  // var getName = function () {
  //   console.log(4);
  // };

  // function getName() {
  //   console.log(5);
  // }

  // Foo.getName();
  // getName();
  // Foo().getName();
  // getName();
  // new Foo.getName();
  // new Foo().getName();
  // new new Foo().getName();

  // 5 2 4 1 1 2 3 3
}

// 使用reduce 得到字符窜重复的次数
{
  const repeatStringLength = (str) => {
    if (!isString(str)) {
      throw new Error('请传入字符串类型')
    }
    const arr = str.split('')
    return arr.reduce((pre, cur) => {
      pre[cur] = pre[cur] ? pre[cur] + 1 : 1
      return pre
    }, {})
  }

  console.log(repeatStringLength('124242433543'))
}

// 策略模式
{
  // 所有公用的验证方法
  const strategies = {
    isNoEmpty(value, errorMsg) {
      if (value.trim() === "") {
        return errorMsg
      }
    },
    maxLength(value, errorMsg, len) {
      if (value.trim().length > len) {
        return errorMsg
      }
    }
  }

  // 添加策略 
  class Validator {
    constructor() {
      this.validates = []
    }

    add(value, rule, errorMsg, ...others) {
      this.validates.push(function() {
        return strategies[rule].apply(this, [value, errorMsg, ...others])
      })
    }

    validate() {
      for (let i = 0; i < this.validates.length; i++) {
        const msg = this.validates[i]()
        if (msg) {
          return msg
        }
      }
    }
  }

  // 使用策略
  const validator = new Validator()
  validator.add('linkaofu', 'isNoEmpty', '用户名不能为空')
  validator.add('121545', 'maxLength', '长度不能大于2', 2)
  console.log(validator.validate())
}

// 获取参数
{
  function queryUrlParameter(str) {
    let obj = {}
    let reg = /([^?=&#]+)=([^?=&#]+)/g;
    str.replace(reg, function(...args) {
        obj[args[1]] = args[2]
      })
      //如果加上hash
      // reg = /#([^?&=#]+)/g
      // if (reg.test(str)) {
      //     str.replace(reg, function (...args) {
      //         obj.hash = args[1]
      //     })
      // }
    return obj
  }
  console.log(queryUrlParameter('http://www.baidu.com?a=1&b=2#12222')) //{ a: '1', b: '2'}
}

// 防抖  节流 简易版
{
  function throttle(fn, delay) {
    let startTime = 0
    return function(...args) {
      const currentTime = new Date()
      if (currentTime - startTime > delay) {
        fn.apply(this, args)
        startTime = currentTime
      }
    }
  }

  const throttle1 = throttle(function(arr) {
      console.log(arr)
    }, 100)
    // throttle1(1254) // 只触发了 第一次
    // throttle1(1254)
    // throttle1(1254)
    // throttle1(1254)
    // throttle1(1254)


  function debounce(fn, delay) {
    let timer = null
    return function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        console.log('this---', this)
        fn.apply(this, args)
      }, delay)
    }
  }


  const debounce1 = debounce(function(a) {
      console.log(a)
    }, 300)
    // debounce1(1)
    // debounce1(2)
    // debounce1(3)
    // debounce1(4)

  // const a = {
  //   a: debounce(function (a) {
  //     console.log(a)
  //   }, 300)
  // }
  // a.a(1)

}

// new 关键字 做了哪些事情
{
  function createThis(proto) {
    var obj = new Object;
    obj.__proto__ = proto.prototype;
    let [constructor, ...args] = [...arguments];
    let result = constructor.apply(obj, args);
    return typeof result === 'object' ? result : obj;
  }
}


// 继承
{
  function A(options) {
    this.a = function() {
      console.log(11111)
    }
  }

  A.a = function() {

  }

  A.prototype.a = function() {
    console.log(2222)
  }

  function B(options) {
    A.apply(this, options)
    this.a = function() {
      console.log(33333)
    }
  }

  B.prototype = A.prototype
  B.prototype.constructor = B

  const b = new B()
  console.log(b, b instanceof B, b instanceof A)
}、