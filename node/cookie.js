const http = require('http')
const url = require('url')
  // 路由分发器
const routes = {
    '/': (req, res) => res.end('hello'),
    '/get': (req, res) => res.end(req.headers.cookie),
    '/set': (req, res) => {
      res.setHeader('Set-Cookie', ['name=keliq', 'age=10'])
      res.end('done')
    },
    // 先设置host 127.0.0.1  test.com   127.0.0.1  a.test.com  
    // name属性可以被具有 test.com结尾的域名获取  age只能被 test.com获取   主域 子域 只登陆一次共享cookie实现的方案
    '/setChild': (req, res) => {
      res.setHeader('Set-Cookie', ['name=keliq;domain=test.com;Path=/set;', 'age=10'])
      res.end('done')
    },

  }
  // 响应网络请求
function onRequest(req, res) {
  const { pathname } = url.parse(req.url)
  const route = routes[pathname] // 根据路径选择不同的路由来处理
  if (route) return route(req, res)
  res.statusCode = 404 && res.end('Not Found') // 如果未匹配到路由则返回404
}
// 创建 HTTP 服务
http.createServer(onRequest).listen(3000)


http.createServer(onRequest).listen(4000)



// 如果服务端设置的 Cookie 不包含在当前的 document.domain 中，那么会被浏览器拒绝。
// cookie 协议与端口无关
// Cookie 的作用域与协议无关  http https ssl
// 所以这里千万不要跟跨域的同源策略搞混，Cookie 只区分域，不区分端口和协议，只要域相同，即使端口号或协议不同，cookie 也能共享。
// 如果 Max-Age 和 Expires 同时存在，那么 Max-Age 优先级更高。

// domain path Expires/Max-Age HttpOnly Secure SameSite

// 参考地址 https://juejin.im/post/6863377752939036679