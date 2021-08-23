# 知识点

-   ​


- 箭头函数如果函数体没有花括号，自带返回值

  - 箭头函数不会被call, bind等方法改变this指向
  - 在闭包中返回函数, 缓存变量时, 使用function进行返回函数的定义.

- export default导出模块是闭包，规则：模块之间定义相同的变量不冲突，运行时，不同的模块在不同的闭包环境中。

- 权限管理

- 短路表达式，做判断用：|| 找真，全是假时取后面的；&& 找假，全是真取后面的；

## vue $set

- 参数一：必须是data中的已经定义好的属性，并且值是对象
- 参数二：新添加的属性名称，子属性的子属性
- 参数三：新添加的属性值

## provide 和 inject

provide 和 inject 选项。他们成对出现，用于父级组件向下传递数据。

## Reactivity in Depth（反应性的深度）

### 如何跟踪变更

当您将纯JavaScript对象作为`data`选项传递给Vue实例时，Vue将遍历其所有属性并使用[Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)将它们转换为getter / setter 。这是一个仅限ES5和不可光滑的功能，这就是Vue不支持IE8及更低版本的原因。

getter / setter对用户来说是不可见的，但是它们使得Vue能够在访问或修改属性时执行依赖关系跟踪和更改通知。需要注意的是，当转换的数据对象被记录时，浏览器控制台对getter / setter的格式会有所不同，因此您可能需要安装[vue-devtools](https://github.com/vuejs/vue-devtools)以获得更易于查看的界面。

每个组件实例都有一个相应的**观察器**实例，它将组件呈现期间“触摸”的任何属性记录为依赖关系。稍后当一个依赖关系的setter被触发时，它会通知观察者，这又导致组件重新呈现。

![](D:\Confidential-documents\React\imgs\fanyingx1.png)

### 更改检测警告

由于现代JavaScript的限制（以及放弃`Object.observe`），Vue **无法检测属性添加或删除**。由于Vue在实例初始化期间执行getter / setter转换过程，所以`data`对象中必须存在一个属性，以便Vue将其转换并使其处于被动状态。例如：

```
var vm = new Vue({
  data: {
    a: 1
  }
})
// `vm.a` is now reactive

vm.b = 2
// `vm.b` is NOT reactive
```

Vue不允许向已创建的实例动态添加新的根级别反应属性。但是，可以使用以下`Vue.set(object, key, value)`方法将反应性属性添加到嵌套对象：

```
Vue.set(vm.someObject, 'b', 2)
```

您也可以使用`vm.$set`实例方法，它是全局`Vue.set`的别名：

```
this.$set(this.someObject, 'b', 2)
```

有时您可能想要为现有对象分配多个属性，例如使用`Object.assign()`or `_.extend()`。但是，添加到对象的新属性不会触发更改。在这种情况下，使用原始对象和mixin对象的属性创建一个新对象：

```
// instead of `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

还有一些与数组相关的警告，在前面列表呈现部分讨论过。

### 声明反应性属性

由于Vue不允许动态添加根级别反应属性，因此即使使用空值，也必须先声明所有根级反应数据属性来初始化Vue实例：

```
var vm = new Vue({
  data: {
    // declare message with an empty value
    message: ''
  },
  template: '<div>{{ message }}</div>'
})
// set `message` later
vm.message = 'Hello!'
```

如果你没有`message`在数据选项中声明，Vue会警告你渲染函数试图访问一个不存在的属性。

这个限制背后有技术原因 - 它消除了依赖关系跟踪系统中的一类边缘情况，并且还使Vue实例在类型检查系统中更好地发挥作用。但是在代码可维护性方面也有一个重要的考虑因素：`data`对象就像组件状态的模式。预先声明所有反应性属性使组件代码在稍后重新访问或由其他开发人员阅读时更易于理解。

### 异步更新队列

如果你还没有注意到，Vue **异步**执行DOM更新。无论何时观察到数据变化，它都会打开一个队列并缓冲在同一个事件循环中发生的所有数据变化。如果多次触发同一个观察者，它将仅被推入队列一次。这种缓存的重复数据删除对于避免不必要的计算和DOM操作非常重要。然后，在下一个事件循环“tick”中，Vue刷新队列并执行实际的（已经失效的）工作。内部Vue尝试本地`Promise.then`和`MutationObserver`异步排队并返回到`setTimeout(fn, 0)`。

例如，设置时`vm.someData = 'new value'`，组件不会立即重新渲染。当队列被刷新时，它会在下一个“打勾”中更新。大多数情况下，我们不需要关心这一点，但是当您想要执行取决于更新后DOM状态的事情时，这可能会非常棘手。尽管Vue.js通常鼓励开发人员以“数据驱动”的方式思考，并避免直接触摸DOM，但有时可能需要弄脏手。为了等到Vue.js完成数据更改后更新DOM，可以`Vue.nextTick(callback)`在数据更改后立即使用。回调将在DOM更新后调用。例如：

```
<div id="example">{{ message }}</div>
```

```
var vm = new Vue({
  el: '#example',
  data: {
    message: '123'
  }
})
vm.message = 'new message' // change data
vm.$el.textContent === 'new message' // false
Vue.nextTick(function () {
  vm.$el.textContent === 'new message' // true
})
```

还有一个`vm.$nextTick()`实例方法，在组件中特别方便，因为它不需要全局`Vue`，它的回调的`this`上下文将自动绑定到当前的Vue实例：

```
Vue.component('example', {
  template: '<span>{{ message }}</span>',
  data: function () {
    return {
      message: 'not updated'
    }
  },
  methods: {
    updateMessage: function () {
      this.message = 'updated'
      console.log(this.$el.textContent) // => 'not updated'
      this.$nextTick(function () {
        console.log(this.$el.textContent) // => 'updated'
      })
    }
  }
})
```

## 跨域

### 同源策略

- 同源是指"协议+域名+端口"三者相同

  - 协议

    - http
    - https

  - 域名：IP 名字（别名）

    - 顶级域名（了解）
      - .com: 商业机构 
      - .cn: 中国国家、地区域名 .hk,
      - .gov: 政府网站。
      - .org: 机构。
      - .edu: 教育网站。
      - .net: 网络服务商。 
      - .mil: 军事。

    - 特殊的域名 : localhost 含义为本地主机，对应127.0.0.1 。这是一个保留域名，主要用于本地测试。

  - 端口号：每台计算机只有 65536 个端口（0-65535）

    - http 默认的端口 80
    - https 默认的端口是 443
    - mysql 默认端口是3306

![](D:\Confidential-documents\React\imgs\kuayu.png)



- **同源策略限制内容有：**

  - Cookie、LocalStorage、IndexedDB 等存储性内容

  - DOM 节点

  - AJAX 请求发送后，结果被浏览器拦截了

- **但是有三个标签是允许跨域加载资源：**

```javascript
<img src=XXX>
<link href=XXX>
<script src=XXX>
```

### 常见跨域场景

- **当协议、子域名、主域名、端口号中任意一个不相同时，都算作不同域。**不同域之间相互请求资源，就算作“跨域”。常见跨域场景如下图所示：

![](D:\Confidential-documents\React\imgs\kuayu1.png)

- 跨域场景：特别说明两点
  - **第一：如果是协议和端口造成的跨域问题“前台”是无能为力的。**
  - **第二：在跨域问题上，仅仅是通过“URL 的首部”来识别而不会根据域名对应的 IP 地址是否相同来判断。“URL 的首部”可以理解为“协议, 域名和端口必须匹配”。**
  - 这里你或许有个疑问：**请求跨域了，那么请求到底发出去没有？**
  - **跨域并不是请求发不出去，请求能发出去，服务端能收到请求并正常返回结果，只是结果被浏览器拦截了。**你可能会疑问明明通过表单的方式可以发起跨域请求，为什么 Ajax 就不会?因为归根结底，跨域是为了阻止用户读取到另一个域名下的内容，Ajax 可以获取响应，浏览器认为这不安全，所以拦截了响应。但是表单并不会获取新的内容，所以可以发起跨域请求。同时也说明了跨域并不能完全阻止 CSRF，因为请求毕竟是发出去了。

# 跨域解决方案

### jsonp

- **JSONP 原理**  利用 script 标签没有跨域限制的漏洞，网页可以得到从其他来源动态产生的 JSON 数据。JSONP 请求一定需要对方的服务器做支持才可以。

- **JSONP 和 AJAX 对比**  JSONP 和 AJAX 相同，都是客户端向服务器端发送请求，从服务器端获取数据的方式。但 AJAX 属于同源策略，JSONP 属于非同源策略（跨域请求）

- **JSONP 优缺点**  JSONP 优点是简单兼容性好，可用于解决主流浏览器的跨域数据访问的问题。**缺点是仅支持 get 方法具有局限性,不安全可能会遭受 XSS 攻击。**

- **JSONP 的实现流程**

  - 声明一个回调函数，其函数名(如 show)当做参数值，要传递给跨域请求数据的服务器，函数形参为要获取目标数据(服务器返回的 data)。

  - 创建一个script标签，把那个跨域的 API 数据接口地址，赋值给 script 的 src,还要在这个地址中向服务器传递该函数名（可以通过问号传参:?callback=show）。

  - 服务器接收到请求后，需要进行特殊的处理：把传递进来的函数名和它需要给你的数据拼接成一个字符串,例如：传递进去的函数名是 show，它准备好的数据是show('我不爱你')。

  - 最后服务器把准备的数据通过 HTTP 协议返回给客户端，客户端再调用执行之前声明的回调函数（show），对返回的数据进行操作。

- 在开发中可能会遇到多个 JSONP 请求的回调函数名是相同的，这时候就需要自己封装一个 JSONP 函数。

```javascript
// index.html
function jsonp({ url, params, callback }) {
  return new Promise((resolve, reject) ={
    let script = document.createElement('script')
    window[callback] = function (data) {
      resolve(data)
      document.body.removeChild(script)
    }
    params = { ...params, callback } // wd=b&callback=show
    let arrs = []
    for (let key in params) {
      arrs.push(`${key}=${params[key]}`)
    }
    script.src = `${url}?${arrs.join('&')}`
    document.body.appendChild(script)
  })
}
jsonp({
  url: 'http://localhost:3000/say',
  params: { wd: 'Iloveyou' },
  callback: 'show'
}).then(data => {
  console.log(data)
})
```

上面这段代码相当于向http://localhost:3000/say?wd=Iloveyou&callback=show这个地址请求数据，然后后台返回show('我不爱你')，最后会运行 show()这个函数，打印出'我不爱你'

```javascript
// server.js
let express = require('express')
let app = express()
app.get('/say', function(req, res) {
  let { wd, callback } = req.query
  console.log(wd) // Iloveyou
  console.log(callback) // show
  res.end(`${callback}('我不爱你')`)
})
app.listen(3000)
```

- **jQuery 的 jsonp 形式**  **JSONP 都是 GET 和异步请求的，不存在其他的请求方式和同步请求，且 jQuery 默认就会给 JSONP 的请求清除缓存。**

```javascript
$.ajax({
  url: "http://crossdomain.com/jsonServerResponse",
  dataType: "jsonp",
  type: "get",//可以省略
  jsonpCallback: "show",//->自定义传递给服务器的函数名，而不是使用jQuery自动生成的，可省略
  jsonp: "callback",//->把传递函数名的那个形参callback，可省略
  success: function (data) {
    console.log(data);
  }
});
```

### cors

- **CORS 需要浏览器和后端同时支持。IE 8 和 9 需要通过 XDomainRequest 来实现。**

- 浏览器会自动进行 CORS 通信，实现 CORS 通信的关键是后端。只要后端实现了 CORS，就实现了跨域。

- 服务端设置 Access-Control-Allow-Origin 就可以开启 CORS。 该属性表示哪些域名可以访问资源，如果设置通配符则表示所有网站都可以访问资源。

- 虽然设置 CORS 和前端没什么关系，但是通过这种方式解决跨域问题的话，会在发送请求时出现两种情况，分别为**简单请求和复杂请求。**

#### 简单请求

- 只要同时满足以下两大条件，就属于简单请求

  - 条件 1：使用下列方法之一：

    - GET

    - HEAD

    - POST

- 条件 2：Content-Type 的值仅限于下列三者之一：

  - text/plain

  - multipart/form-data

  - application/x-www-form-urlencoded

- 请求中的任意 XMLHttpRequestUpload 对象均没有注册任何事件监听器； XMLHttpRequestUpload 对象可以使用 XMLHttpRequest.upload 属性访问。

#### 复杂请求

- 不符合以上条件的请求就肯定是复杂请求了。  复杂请求的 CORS 请求，会在正式通信之前，增加一次 HTTP 查询请求，称为"预检"请求,该请求是 option 方法的，通过该请求来知道服务端是否允许跨域请求。

- 我们用PUT向后台请求时，属于复杂请求，后台需做如下配置：

```javascript
// 允许哪个方法访问我
res.setHeader('Access-Control-Allow-Methods', 'PUT')
// 预检的存活时间
res.setHeader('Access-Control-Max-Age', 6)
// OPTIONS请求不做任何处理
if (req.method === 'OPTIONS') {
  res.end()
}
// 定义后台返回的内容
app.put('/getData', function(req, res) {
  console.log(req.headers)
  res.end('我不爱你')
})
```

- 接下来我们看下一个完整复杂请求的例子，并且介绍下 CORS 请求相关的字段

```javascript
// index.html
let xhr = new XMLHttpRequest()
document.cookie = 'name=xiamen' // cookie不能跨域
xhr.withCredentials = true // 前端设置是否带cookie
xhr.open('PUT', 'http://localhost:4000/getData', true)
xhr.setRequestHeader('name', 'xiamen')
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4) {
    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
      console.log(xhr.response)
      //得到响应头，后台需设置Access-Control-Expose-Headers
      console.log(xhr.getResponseHeader('name'))
    }
  }
}
xhr.send()
//server1.js
let express = require('express');
let app = express();
app.use(express.static(__dirname));
app.listen(3000);
//server2.js
let express = require('express')
let app = express()
let whitList = ['http://localhost:3000'] //设置白名单
app.use(function(req, res, next) {
  let origin = req.headers.origin
  if (whitList.includes(origin)) {
    // 设置哪个源可以访问我
    res.setHeader('Access-Control-Allow-Origin', origin)
    // 允许携带哪个头访问我
    res.setHeader('Access-Control-Allow-Headers', 'name')
    // 允许哪个方法访问我
    res.setHeader('Access-Control-Allow-Methods', 'PUT')
    // 允许携带cookie
    res.setHeader('Access-Control-Allow-Credentials', true)
    // 预检的存活时间
    res.setHeader('Access-Control-Max-Age', 6)
    // 允许返回的头
    res.setHeader('Access-Control-Expose-Headers', 'name')
    if (req.method === 'OPTIONS') {
      res.end() // OPTIONS请求不做任何处理
    }
  }
  next()
})
app.put('/getData', function(req, res) {
  console.log(req.headers)
  res.setHeader('name', 'jw') //返回一个响应头，后台需设置
  res.end('我不爱你')
})
app.get('/getData', function(req, res) {
  console.log(req.headers)
  res.end('我不爱你')
})
app.use(express.static(__dirname))
app.listen(4000)
```

- 上述代码由http://localhost:3000/index.html向http://localhost:4000/跨域请求，正如我们上面所说的，后端是实现 CORS 通信的关键。

### postMessage

- postMessage 是 HTML5 XMLHttpRequest Level 2 中的 API，且是为数不多可以跨域操作的 window 属性之一，它可用于解决以下方面的问题：

  - 页面和其打开的新窗口的数据传递

  - 多窗口之间消息传递

  - 页面与嵌套的 iframe 消息传递

  - 上面三个场景的跨域数据传递

- **postMessage()方法允许来自不同源的脚本采用异步方式进行有限的通信，可以实现跨文本档、多窗口、跨域消息传递。**

  - otherWindow.postMessage(message, targetOrigin, [transfer]);

    - message: 将要发送到其他 window 的数据。
    - targetOrigin:通过窗口的 origin 属性来指定哪些窗口能接收到消息事件，其值可以是字符串"*"（表示无限制）或者一个 URI。在发送消息的时候，如果目标窗口的协议、主机地址或端口这三者的任意一项不匹配 targetOrigin 提供的值，那么消息就不会被发送；只有三者完全匹配，消息才会被发送。

    - transfer(可选)：是一串和 message 同时传递的 Transferable 对象. 这些对象的所有权将被转移给消息的接收方，而发送一方将不再保有所有权。

  - 接下来我们看个例子： http://localhost:3000/a.html页面向http://localhost:4000/b.html传递“我爱你”,然后后者传回"我不爱你"。

  ```
  // a.html
    <iframe src="http://localhost:4000/b.html" frameborder="0" id="frame" onload="load()"></iframe//等它加载完触发一个事件
    // 内嵌在http://localhost:3000/a.html
      <script>
        function load() {
          let frame = document.getElementById('frame')
          frame.contentWindow.postMessage('我爱你', 'http://localhost:4000') //发送数据
          window.onmessage = function(e) { //接受返回数据
            console.log(e.data) //我不爱你
          }
        }
      </script>
  // b.html
    window.onmessage = function(e) {
      console.log(e.data) //我爱你
      e.source.postMessage('我不爱你', e.origin)
   }
  ```

### websocket

- Websocket 是 HTML5 的一个持久化的协议，它实现了浏览器与服务器的全双工通信，同时也是跨域的一种解决方案。**WebSocket 和 HTTP 都是应用层协议，都基于 TCP 协议。但是 WebSocket 是一种双向通信协议，在建立连接之后，WebSocket 的 server 与 client 都能主动向对方发送或接收数据。**同时，WebSocket 在建立连接时需要借助 HTTP 协议，连接建立好了之后 client 与 server 之间的双向通信就与 HTTP 无关了。

- 原生 WebSocket API 使用起来不太方便，我们使用Socket.io，它很好地封装了 webSocket 接口，提供了更简单、灵活的接口，也对不支持 webSocket 的浏览器提供了向下兼容。

- 我们先来看个例子：本地文件 socket.html 向localhost:3000发生数据和接受数据

```javascript
// socket.html
<script>
    let socket = new WebSocket('ws://localhost:3000');
    socket.onopen = function () {
      socket.send('我爱你');//向服务器发送数据
    }
    socket.onmessage = function (e) {
      console.log(e.data);//接收服务器返回的数据
    }
</script>
// server.js
let express = require('express');
let app = express();
let WebSocket = require('ws');//记得安装ws
let wss = new WebSocket.Server({port:3000});
wss.on('connection',function(ws) {
  ws.on('message', function (data) {
    console.log(data);
    ws.send('我不爱你')
  });
})
```

### Node 中间件代理(两次跨域)

- 实现原理：**同源策略是浏览器需要遵循的标准，而如果是服务器向服务器请求就无需遵循同源策略。**  代理服务器，需要做以下几个步骤：

  - 接受客户端请求 。

  - 将请求 转发给服务器。

  - 拿到服务器 响应 数据。

  - 将 响应 转发给客户端。

![img](D:\Confidential-documents\React\imgs\1620)

- 代理服务器

  - 我们先来看个例子：本地文件 index.html 文件，通过代理服务器[http://localhost:3000](http://localhost:3000/)向目标服务器[http://localhost:4000](http://localhost:4000/)请求数据。

  ```
  // index.html(http://127.0.0.1:5500)
   <script src="https://cdn.bootcss.com/jquery/3.3.1/jquery.min.js"></script>
      <script>
        $.ajax({
          url: 'http://localhost:3000',
          type: 'post',
          data: { name: 'xiamen', password: '123456' },
          contentType: 'application/json;charset=utf-8',
          success: function(result) {
            console.log(result) // {"title":"fontend","password":"123456"}
          },
          error: function(msg) {
            console.log(msg)
          }
        })
       </script>
  // server1.js 代理服务器(http://localhost:3000)
  const http = require('http')
  // 第一步：接受客户端请求
  const server = http.createServer((request, response) ={
    // 代理服务器，直接和浏览器直接交互，需要设置CORS 的首部字段
    response.writeHead(200, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Headers': 'Content-Type'
    })
    // 第二步：将请求转发给服务器
    const proxyRequest = http
      .request(
        {
          host: '127.0.0.1',
          port: 4000,
          url: '/',
          method: request.method,
          headers: request.headers
        },
        serverResponse ={
          // 第三步：收到服务器的响应
          var body = ''
          serverResponse.on('data', chunk ={
            body += chunk
          })
          serverResponse.on('end', () ={
            console.log('The data is ' + body)
            // 第四步：将响应结果转发给浏览器
            response.end(body)
          })
        }
      )
      .end()
  })
  server.listen(3000, () ={
    console.log('The proxyServer is running at http://localhost:3000')
  })
  // server2.js(http://localhost:4000)
  const http = require('http')
  const data = { title: 'fontend', password: '123456' }
  const server = http.createServer((request, response) ={
    if (request.url === '/') {
      response.end(JSON.stringify(data))
    }
  })
  server.listen(4000, () ={
    console.log('The server is running at http://localhost:4000')
  })
  ```

- 上述代码经过两次跨域，值得注意的是浏览器向代理服务器发送请求，也遵循同源策略，最后在 index.html 文件打印出{"title":"fontend","password":"123456"}

### nginx 反向代理

- 实现原理类似于 Node 中间件代理，需要你搭建一个中转 nginx 服务器，用于转发请求。

- 使用 nginx 反向代理实现跨域，是最简单的跨域方式。只需要修改 nginx 的配置即可解决跨域问题，支持所有浏览器，支持 session，不需要修改任何代码，并且不会影响服务器性能。

- 实现思路：通过 nginx 配置一个代理服务器（域名与 domain1 相同，端口不同）做跳板机，反向代理访问 domain2 接口，并且可以顺便修改 cookie 中 domain 信息，方便当前域 cookie 写入，实现跨域登录。

- 先下载nginx

  - 启动命令

  ``` 
  start nginx
  ```

- 检查配置命令是否正确

- nginx基本控制

- 要启动nginx，请运行可执行文件。一旦nginx启动，就可以通过调用带有-s参数的可执行文件来控制它。使用以下语法：

  - nginx -s signal
    当信号可以是下列之一：

  - stop - 快速关机

  - quit - 优雅的关机

  - reload - 重新加载配置文件

  - reopen - 重新打开日志文件

  - 例如，要停止nginx进程并等待工作进程完成当前请求的服务，可以执行以下命令：

    nginx -s quit
    这个命令应该在启动nginx的同一个用户下执行。

  - 说明:如果在启动过程中未正常启动,可以去查看错误日志,根据其中报错信息寻找解决问题的方法;

- 然后将 nginx 目录下的 nginx.conf 修改如下:

```javascript
// proxy服务器
server {
    listen       80;
    server_name  www.domain1.com;
    location / {
        proxy_pass   http://www.domain2.com:8080;  #反向代理
        proxy_cookie_domain www.domain2.com www.domain1.com; #修改cookie里域名
        index  index.html index.htm;

        # 当用webpack-dev-server等中间件代理接口访问nignx时，此时无浏览器参与，故没有同源限制，下面的跨域配置可不启用
        add_header Access-Control-Allow-Origin http://www.domain1.com;  #当前端只跨域不带cookie时，可为*
        add_header Access-Control-Allow-Credentials true;
    }
}
```

- 最后通过命令行nginx -s reload启动 nginx

```javascript
// index.html
var xhr = new XMLHttpRequest();
// 前端开关：浏览器是否读写cookie
xhr.withCredentials = true;
// 访问nginx中的代理服务器
xhr.open('get', 'http://www.domain1.com:81/?user=admin', true);
xhr.send();
// server.js
var http = require('http');
var server = http.createServer();
var qs = require('querystring');
server.on('request', function(req, res) {
    var params = qs.parse(req.url.substring(2));
    // 向前台写cookie
    res.writeHead(200, {
        'Set-Cookie': 'l=a123456;Path=/;Domain=www.domain2.com;HttpOnly'   // HttpOnly:脚本无法读取
    });
    res.write(JSON.stringify(params));
    res.end();
});
server.listen('8080');
console.log('Server is running at port 8080...');
```

### window.name + iframe

window.name 属性的独特之处：name 值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值（2MB）。

其中 a.html 和 b.html 是同域的，都是[http://localhost:3000](http://localhost:3000/);而 c.html 是[http://localhost:4000](http://localhost:4000/)

```javascript
// a.html(http://localhost:3000/b.html)
  <iframe src="http://localhost:4000/c.html" frameborder="0" onload="load()" id="iframe"></iframe>
  <script>
    let first = true
    // onload事件会触发2次，第1次加载跨域页，并留存数据于window.name
    function load() {
      if(first){
      // 第1次onload(跨域页)成功后，切换到同域代理页面
        let iframe = document.getElementById('iframe');
        iframe.src = 'http://localhost:3000/b.html';
        first = false;
      }else{
      // 第2次onload(同域b.html页)成功后，读取同域window.name中数据
        console.log(iframe.contentWindow.name);
      }
    }
  </script>
```

- b.html 为中间代理页，与 a.html 同域，内容为空。

```javascript
 // c.html(http://localhost:4000/c.html)
  <script>
    window.name = '我不爱你'
  </script>
```

- 总结：通过 iframe 的 src 属性由外域转向本地域，跨域数据即由 iframe 的 window.name 从外域传递到本地域。这个就巧妙地绕过了浏览器的跨域访问限制，但同时它又是安全操作。

### location.hash + iframe

- 实现原理： a.html 欲与 c.html 跨域相互通信，通过中间页 b.html 来实现。 三个页面，不同域之间利用 iframe 的 location.hash 传值，相同域之间直接 js 访问来通信。

- 具体实现步骤：一开始 a.html 给 c.html 传一个 hash 值，然后 c.html 收到 hash 值后，再把 hash 值传递给 b.html，最后 b.html 将结果放到 a.html 的 hash 值中。  同样的，a.html 和 b.html 是同域的，都是[http://localhost:3000](http://localhost:3000/);而 c.html 是[http://localhost:4000](http://localhost:4000/)

```javascript
// a.html
  <iframe src="http://localhost:4000/c.html#iloveyou"></iframe>
  <script>
    window.onhashchange = function () { //检测hash的变化
      console.log(location.hash);
    }
  </script>
 // b.html
  <script>
    window.parent.parent.location.hash = location.hash
    //b.html将结果放到a.html的hash值中，b.html可通过parent.parent访问a.html页面
  </script>
 // c.html
 console.log(location.hash);
  let iframe = document.createElement('iframe');
  iframe.src = 'http://localhost:3000/b.html#idontloveyou';
  document.body.appendChild(iframe);
```

### document.domain + iframe

- **该方式只能用于二级域名相同的情况下，比如 a.test.com 和 b.test.com 适用于该方式。**  只需要给页面添加 document.domain ='test.com' 表示二级域名都相同就可以实现跨域。

- 实现原理：两个页面都通过 js 强制设置 document.domain 为基础主域，就实现了同域。

- 我们看个例子：页面a.zf1.cn:3000/a.html获取页面b.zf1.cn:3000/b.html中 a 的值

```javascript
// a.html
<body>
 helloa
  <iframe src="http://b.zf1.cn:3000/b.html" frameborder="0" onload="load()" id="frame"></iframe>
  <script>
    document.domain = 'zf1.cn'
    function load() {
      console.log(frame.contentWindow.a);
    }
  </script>
</body>
// b.html
<body>
   hellob
   <script>
     document.domain = 'zf1.cn'
     var a = 100;
   </script>
</body>
```

### 总结

- CORS 支持所有类型的 HTTP 请求，是跨域 HTTP 请求的根本解决方案
- JSONP 只支持 GET 请求，JSONP 的优势在于支持老式浏览器，以及可以向不支持 CORS 的网站请求数据。
- 不管是 Node 中间件代理还是 nginx 反向代理，主要是通过同源策略对服务器不加限制。
- 日常工作中，用得比较多的跨域方案是 cors 和 nginx 反向代理

## 请求数据接口?

- 原生ajax
- jQuery的$.ajax
- Promise
- Async/await
- 跨域
  - jsonp
  - cors
- wx.request()

##  less

### 配置less环境

- 安装相关依赖包

```
npm install less less-loader -D
```

- 样式标签配置less

```
// style标签中指定lang属性
<style scoped lang='less'>
  @import 'main.less'
</style>
```

## sass

### 配置sass环境

- 安装相关依赖包

```
  npm install node-sass sass-loader -D
```

- 样式标签配置scss

```
<style scoped lang='scss'>
    @import 'main.scss';
</style>
```

## 本地存储

localStoreg/sestionStoreg

## 限制接口调用频率（函数防抖和函数节流）

- 函数防抖与函数节流
  - 概念（作用相同：限制任务触发的频率）
    - 函数防抖debounce：在特定的时间内，没有触发特定条件，就执行一次任务
    - 函数节流throttle：在特定的时间内，无论触发多次条件，仅执行一次任务
  - 两者的区别：
    - 函数防抖有可能在很长时间内一次任务都不执行，只有最后一次延时时间达到之后执行一次
    - 函数节流在特定时间内会固定触发一次任务，并且是规律的
  - 应用场景
    - 关键字搜索，限制接口调用频率（防抖）
    - 表单验证，验证邮箱的格式，停止输入时再做验证（防抖）
    - onresize  onscroll   onmousemove（一般用于分页加载数据）：节流
      - 对于高频事件一般要做触发频率的限制

### 函数防抖

```
handleInput() {
  // 定时任务在延时时间范围内，如果被销毁，那么就不会再出发
  // 函数防抖debounce：在指定时间内没有触发特定条件（输入框字符变化），那么就执行一次任务（发送一次请求）
  clearTimeout(this.timer)
  this.timer = setTimeout(async ()=>{
    let res = await request('goods/qsearch', {query: this.keyword})
    this.resultList = res.data.message
  }, 1000)
}
```

###  函数节流：首先执行一次，然后无论执行多少次，在规定的时间内都只执行一次

- 通过加载标志位控制加载频率

```
// 本次接口调用是否已经加载完成
if (this.isLoading) {
  return
}
// 作用：禁止再次触发接口调用
this.isLoading = true

// 加载数据

// 接口数据返回之后，才允许再次发出请求
this.isLoading = false
```

- 通过定时器控制调用频率

```
// 函数节流（固定时间内无论触发几次，仅执行一次）
keywordSearch () {
  if (this.isLoading) {
    // 终止后续代码的执行，终止请求
    return
  }
  this.isLoading = true
  setTimeout(async () => {
    let res = await request('goods/qsearch', 'get', {
      query: this.keyword
    })
    this.searchResult = res.data.message
    // 重新打开发送请求的开关
    this.isLoading = false
  }, 1000)
}
```

## 生命周期钩子函数

```
//实例创建前
beforeCreate() {
	// 一般什么都不做
	console.log("实例创建前beforeCreate");
	//console.log(this);
},
//创建实例之后
created() {
	// 一般用来做 请求数据 列表数据 默认数据 但是不能获取dom
	console.log("实例创建后created");
	// 注意 实例上取dom此时取不到
},
// 挂载页面前 渲染
beforeMount() {
	// 一般用来做 请求数据 列表数据 默认数据 但是不能获取dom
	console.log("首次渲染前beforemount");
},
//首次渲染后
mounted() {
	// 一般可以做加载数据 但是可以获取dom了
	// 如果 我们需要做定时器 一般在这里做
	console.log("首次渲染后mounted");
	//setTimeout(,1000)定时器是全局作用域
},
// 数据更新前
beforeUpdate() {
	console.log("数据更新前执行");
},
// 数据更新后
updated() {
	console.log("数据更新后执行");
},
// 销毁前
beforeDestroy() {
	// 非常有用
	// 一般在这里去销毁 定时器
	// 离开之前把定时器销毁掉 防止出现错误
	console.log("销毁组件前");
},
//销毁后
destroyed() {
	// 一般不做任何处理
}
```

### 生命周期三个核心过程

- 创建阶段
  - created
  - mounted
- 更新阶段
  - updated
- 销毁阶段
  - beforeDestroy

## 双向绑定原理：defineProperty数据劫持 defineProperties

- set
- get


- Vue内部会把data中的数据通过defineProperty方法转化为set和get的监控方式
- 当data中的数据发生变化时，会触发对应的set或者get
  - 修改属性值的时候，触发set方法
  - 访问属性值的时候，触发get方法
- 监控数据变化的目的还是为了更新页面
- DOM的更新比较耗时
- 需要尽可能少的更新DOM节点
- 完成上述要求需要底层虚拟DOM的支持（仅仅更新数据变化对应的DOM节点：尽可能少的更新DOM）

## 虚拟DOM：本质上是通过对象的方式描述了真实的DOM

- 虚拟DOM是对真实DOM的一种描述

```
VNODE 虚拟节点：描述了真实的DOM节点，本质上就是普通对象
{
	tagName: 'div'
	attrs: { class: "active", id: "info"}
	content: "hello"
}
```

- 虚拟DOM也会形成一个树状结构，描述了真实的DOM树
  - 虚拟DOM树本质其实就是普通对象
- 当数据发生变化时，会对比变化前后的虚拟DOM树（diff算法）
- 对比的结果是：有变化的虚拟节点的集合
- 虚拟的节点需要转化成真实DOM节点
- 把真实的DOM节点渲染到页面

```
var div = document.createElement(vnode.tagName)
div.setAttibute(key, value)
div.innerHTML = vnode.content
```

## watch、computed



## promise	常见的异步场景 promise原理,哪些是异步哪些是同步?

- 接口调用
- 定时任务
- 事件函数
- async和await是同步串行任务，执行过程是执行完一个再执行下一个，这不是最好的方式，我们需要他们是并发的
  - Promise.all([]) 使async，await变成异步并发任务,只有全部任务都响应，才有返回值
  - Promise.race([])使async，await变成异步并发任务，只要有一个任务完成，就有返回值
  - ​

## SVG和canvas怎么用

- 数据可视化（图表）
  - echarts
  - d3
  - threee.js(webgl)
- 动画
- 小游戏
- 特效

## axios

中文官网  http://www.axios-js.com/zh-cn/docs/

## VUE-ROUTE:路由

-   spa路由做的不是跳转，而是页面局部更新
-   ajax也是局部更新，请求完数据后更新页面的一部分，但是ajax不能回退
-   前端路由基于url地址的哈希（锚点）和 h5的 history API;
    - hash：哈希
      - 指的是url中#之后的部分（锚点），用于定位页面的某一个位置
      - url地址的hash的变化不会导致浏览器发送新的请求；history相关api
    - history：历史API；操作浏览器浏览历史的条目，
      - pushState：向历史记录中添加一个新的地址；
      - replaceState替换第一个历史记录；这两个方法有对应的监听方法

### 路由基本使用：

- vue中需要挂载路由，router-link标签to跳转，route-view标签填充位
- query 对应 name
- params 对应 path

####动态路由:（组件复用，只更新数据即可）

- 路由 path 添加形参 id

  ```
  { name: 'users', path: '/users/:id', component: Users }
  ```

- 传参，在路径上传入具体的值(赋值)

  ```
  <router-link to="/users/120">用户管理<router-link>
  ```

- 在组件内部使用 this.$route 获取当前路由对象

  ```
  this.$route.params.id
  ```

- 路由规则

  | 路由规则                          | 匹配路径                | $route.params                          |
  | ----------------------------- | ------------------- | -------------------------------------- |
  | /user/:username               | /user/evan          | `{ username: 'evan' }`                 |
  | /user/:username/post/:post_id | /user/evan/post/123 | `{ username: 'evan', post_id: '123' }` |

#### 编程式导航

- this.$router 可以拿到当前路由对象的实例
- 路由对象的实例方法 有 push  replace, go() 
  - push 方法 相当于往历史记录里推了一条记录 如果点击返回 会回到上一次的地址
  - replace方法 相当于替换了当前的记录  历史记录并没有多 但是地址会变
  - go(数字) 代表希望是前进还是回退,当数字大于0 时 就是前进 n(数字)次,小于0时,就是后退n(数字)次

- 具体实现

  ```
  <button @click="goB">跳转到B页面<button>
  ```

  ```
  methods: {
  	//编程式导航
  	goB() {
  		this.$router.push({ path: "/B" }); //跳转到这个地址,等价于to
  	}
  }
  ```

### redirect 重定向

- 当希望某个页面被强制中转时  可采用redirect 进行路由重定向设置

  ```
  {
  	当访问/sport页面时，redirect强制跳转
  path: "/sport",
  	redirect: "/news", // 强制跳转新闻页
  	component: {template: `<div>体育</div>`}
  }
  ```

- 跳回原页面一

  ```
  export default {
      install (Vue, options) {
      	// 给vue实例原型中添加一个方法，判断登录状态
          Vue.prototype.$checkLogin = function () {
              // 有登录状态不需任何操作
              if (this.$store.state.user) {
                  return true;
              }
              // 没有登录状态
              this.$dialog.confirm({
                  title: '登录提示',
                  message: '该操作需要登录，需要登录吗？'
              }).then(() => {
                  // on confirm点击了确认按钮
                  this.$router.push({
                      name: 'login',
                      // redirect记录当前从哪里跳转到登录页面的，登陆后再跳转回来
                      query: {
                      	// $route.fullPath当前页面的地址
                          redirect: this.$route.fullPath
                      }
                  });
              }).catch(() => {
                  // on cancel
              });
          };
      }
  };
  ```

- 跳回原页面二

  ```
  // 这是在登录页面中
  // 获取当前路由中的查询字符串，如果有跳转到redirect
  // 如果没有跳转到首页
  this.$router.push({
      path: this.$route.query.redirect || '/layout'
  });
  ```

#### 嵌套路由

- 如果存在组件嵌套,就需要提供多个视图容器<router-view><router-view>
- 同时,router-link和router-view 都可以添加类名、设定样式
- 要注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
- 二级路由要写在组件中
  - 基础版

```
{
	path: "/music",
	// 二级路由要写在组件中
	component: {
		template: `<div>我是音乐
		<router-link to="/music/pop">流行</router-link>
		<router-link to="/music/class">古典</router-link>
		<router-link to="/music/jazz">爵士</router-link>
		<router-view></router-view>
		</div>`
	},
	// 子路由路由规则表 要配置在路由的children下
	children: [
		{
			// path: "/music/pop", // 一种方式
			path: "pop", // 第二种模式  =>  /music/pop
			component: {
				template: `<div>
				流行音乐
				</div>
				`
			}
		}
	]
}
```

- cli版

```
// tabber外部框
{
    path: '/layout',
    name: 'layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout-tabbar/index.vue'),
    redirect: '/home',
    children: [
        // 首页
        {
            path: '/home',
            name: 'home',
            component: () => import(/* webpackChunkName: "home" */ '@/views/home/index.vue')
        },
        // 我的
        {
            path: '/my',
            name: 'my',
            component: () => import(/* webpackChunkName: "my" */ '@/views/my/index.vue')
        }
    ]
}
```

#### 路由守卫

- beforeEach()  全部路由执行之前必须经历的关卡，称为前置路由守卫
- afterEach()    全部路由执行之后必须经历的关卡，称为后置路由守卫
  - 路由前置守卫	以token为限制

```
router.beforeEach((to, form, next) => {
    // to跳转地址
    // form跳转过来的地址
    // next回调函数,可填跳转地址
    // 获取token
    let token = window.sessionStorage.getItem('token');
    // 判断
    if (!token && to.path !== '/login') { return next('/login'); };
    next();
});
```

- 离开当前路由的守卫

```
beforeRouteLeave (to, from, next) {}
```

#### 激活样式

- 点击路由标签，当前路由在导航中会拥有激活样式
- 查看导航元素,可以找到 激活样式为 router-link-exact-active

```
<a href="#/news" class="router-link-exact-active router-link-active">新闻<a>
```

- 这时你可以给这个类名设置样式了

```
.vue-router-routerlink-tag {color: red;font-sizy: }
```

####路由传参与动态路由相关params，query

```
3. vue之this.$route.params和this.$route.query的区别
	1. this.$route.query的使用
		A、传参数：
			this.$router.push({
			    path: '/monitor',
			    query:{
			        id:id,
			    }
			})
		B、获取参数：
			this.$route.query.id
		C、在url中形式（url中带参数）
			http://172.19.186.224:8080/#/monitor?id=1
		D、页面之间用路由跳转传参时，刷新跳转后传参的页面，数据还会显示存在（项目中遇到此问题）
	2. this.$route.params的使用
		A、传参数：
			this.$router.push({
			    name: 'monitor',
			    params:{
			    	id:id,
			    }
			})
		B、获取参数：
			this.$route.params.id
		C、在url中形式（url中不带参数）
			http://172.19.186.224:8080/#/monitor
		D、页面之间用路由跳转传参时，刷新跳转后传参的页面，数据不存在（项目中遇到此问题）
```

## input、change、v-model

- input触发条件：输入框字符发生变化
- change触发条件：输入框失去焦点
- v-model的原理
  - 本质上是语法糖
    - 属性绑定和事件绑定
    - 默认事件是input
    - 可以使用lazy修饰符转化change事件

```
<input type="text" v-model='uname'>
<input type="text" v-model.lazy='uname'>
<input type="text" :value='uname' @input='handle'>
```

### input相关命令

-   @keyup.enter:

    - pc端可用，移动端不支持
    - vue支持，mpvue不支持
    - @keyup当输入框改变时，调用设置的方法
    - @keyup.enter是输入完成后必须回车才能触发设置的事件
    - enter是事件修饰符
    - 事件参数中的keyCode参数，表示按了哪一个键的数字

-   @confirm 当输入框改变时，调用设置的方法（mpvue)

-   VUE的官网自定义指令中：`autofocus` 在移动版 Safari（苹果浏览器） 上不工作

-   自动获取焦点

    - 在移动端，需要弹出软键盘，必须手动触发，才可以输入；
    - mpvue不支持自定义指令


    - vue官网，自定义指令

      ```
      在模板中任何元素上使用 v-focus
      <input v-focus>
      ```
    
      ```
      注册一个全局自定义指令 `v-focus`
      Vue.directive('focus', {
        // 当被绑定的元素插入到 DOM 中时……
        inserted: function (el) {
          // 聚焦元素
          el.focus()
        }
      })
      注册局部指令，组件中也接受一个 directives 的选项：
      directives: {
        focus: {
          // 指令的定义
          inserted: function (el) {
            el.focus()
          }
        }
      }
      ```

## 模块化：js层面的模块化

- js的模块化是把特定的功能封装到特定的文件里，只导出需要的方法，其它方法在模块内使用，模块之间不会干扰；

+   模块化：方便代码的重用；方便后期的维护和扩展（高内聚，低耦合）

+   模块化引入时只引入一次，不是响应的

+   模块化规范

    - (function(){})() 最早自己做的模块化，函数立即调用的模式

    + AMD/CMD
        - AMD --> Require.js 
        - CMD --> Sea.js （阿里）
    + CommonJS --> Node.js 
        - 导出module.exports/exports 
        - 导入require()
    + ESM：ES2015
        - 导出 export
        - 导入 import（需要解构或者起名字时添加 from ）

- export  和  export default  的区别

  - export

  ```
  导出多个
  export function Func () { }
  引入时可以解构
  import { Func } from 'func'
  ```

  - export default

  ```
  路径可以只写到当前文件夹，默认导出的就是export default导出的文件，在文件夹中只能有一个
  export default function Func () { }
  引入时不能解构
  import Func from 'func'
  ```


## 组件化：UI层面的组件化开发

* 把通用的功能封装到单独的组件中，功能包括UI和业务层面；粒度越小越通用
* 方便代码的重用
* 内容包括：（高内聚，低耦合）
  - HTML 模板
  - css 样式
  - js 交互逻辑（包含js的模块化）
  - 数据交互，组件传值

## 项目开发基础

- 项目开发流程
  - 全新的项目
    - 创业公司
    - 公司新的业务线
  - 既有的项目
    - 已经上线，需要修改一些bug
    - 已经上线，需要做二期新的需求
    - 已经有的项目需要重构
      - 代码优化：vue-->vue
      - 不同技术架构的重构：jquery-->vue
  - 项目类型
    - 公司自有的项目（一般要求比较严格）
    - 外派项目：公司的产品卖给银行：需要进行需求定制（驻场开发）
    - 外包项目：派到别的公司干活（接触到的项目类型和技术选型可能多一些）
  - 立项->需求分析->设计->开发->测试->上线->运维
- 项目团队组成
  - 产品经理->产品原型Axure->有交互效果的页面（不考虑美观；考虑业务）
  - 项目经理（负责人、小组长）
  - UI/UE/UED->产品原型(Axure)-->psd（重点考虑美观）
  - 前端：psd->静态页面（html/css/js）;负责前端代码层面业务开发和后退接口交互
  - 后端：主要提供接口URL（后端的话语权较大）:java、php、python...
  - 测试
  - 运维
  - 架构师
  - DBA（大厂）
  - 全栈工程师
  - 移动端开发：IOS；Android
- 项目技术选型
  - 项目负责人负责选型：技术选型时根据项目业务类型来定的
  - 小程序技术选型：原生语法，小程序框架mpvue、wepy

## 前端知识梳理

- html（h5）
- css（css3）
- javascript
- jQuery(框架)
- 移动Web（h5网页）
- Node.js(Ajax)
  - 客户端和服务器交互模型
- Angular
- Vue
- React
- 小程序

### 前端现在可以做什么

- 网站
  - PC端
  - 移动Web
- APP
  - IOS（Object-C/swift）
  - Android（Java）
  - 混合开发APP
    - phonegap->cordova
    - ionic
    - React Native
    - Flutter（Dart）
- 微信端开发
  - 公众号（h5页面）
  - 小程序
- 桌面程序
  - 基于Node.js的Electron
- 人工智能（原生js的调用接口）
  - VR/AR
  - 机器人编程