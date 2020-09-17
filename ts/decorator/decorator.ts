// 类装饰器 params 是 @logClass() 时候传入的参数  
function logClass(params?: any): any {
  console.log('logClass', params)
  // constructor是自动传入的该类的构造函数
  return function $logClass(constructor: any): void {
    console.log('logClass', constructor)
    constructor.prototype.getUrl = function (): string {
      return this.url
    }
  }
}

// 属性装饰器 params 是 @logProperty() 时候传入的参数  
function logProperty(params?: any): any {
  // 对于静态方法 target是当前构造函数   对于原型方法则是当前实例
  // attr成员的属性名称
  return function $logProperty(target: any, attr: any): void {
    console.log(target, attr)
    console.log(attr in target)
  }
}

// 方法装饰器
function logMethod(params?: any): any {
  // 对于静态方法 target是当前构造函数 可以用于扩展原型以及属性
  // method 成员的属性名称
  // descriptor Object.defineProperty的一样 可以改写原来的方法
  return function $logMethod(target: any, method: any, descriptor: any): void {
    console.log('logMethod', target, method, descriptor)
  }
}

// 参数装饰器 基本用不上 看文档

// @logClass()
class HttpClient {
  // @logProperty()
  url: string = "";

  constructor(url: string) {
    this.url = url
  }

  @logMethod()
  getData(): void { }

  getUrl(): string {
    return 'httpClient:' + this.url
  }
}

let http = new HttpClient('http://www.baidu.com')
console.log(http.getUrl())