# HTTP 协议

HTTP 协议是基于 TCP 协议的，TCP 协议是一条双向通讯通道，HTTP 在 TCP 的基础上规定了 Request-Response 的模式，这个模式决定了通讯必定由浏览器发起。

HTTP 标准有如下：

- [HTTP1.1 rfc2616](https://tools.ietf.org/html/rfc2616)
- [HTTP1.1 rfc7234(缓存相关)](https://tools.ietf.org/html/rfc7234)
- [HTTPS rfc2818](https://tools.ietf.org/html/rfc2818)
- [HTTP2 rfc7540](https://tools.ietf.org/html/rfc7540)

## 协议格式

- HTTP 协议
  - Request
    - request line
      - method
      - path
      - version
    - head
    - body
  - Response
    - response line
      - version
      - status code
      - status text
    - head
    - body

在请求部分，第一行被称为 request line 分为三个部分：HTTP method 请求方法；path 请求的路径，由服务器提供；请求的协议和版本；
在响应部分，第一行被称为 response line 也分为三个部分：响应的协议和版本；响应的状态码；响应的状态文本；

紧跟在 request line 或 response line 之后的是请求头/响应头，由若干行组成，每行是用冒号分隔的属性和属性值

在头部后面使用一个空行(两个换行符)隔开的是请求体/响应体，请求体可能包含表单、文件、json；响应体可能包含 json、文件等

## Request

### method

这里的方法，表示 HTTP 请求希望执行的操作类型。

- GET: 一般指获取 URL 资源
- POST: 提交数据，比如表单、文件等
- HEAD: 跟 GET 类似，但只返回请求头
- PUT: 表示添加资源，这只是语义上的约束
- DELETE: 表示删除资源，这只是语义上的约束
- CONNECT: 多数用于 HTTPS 和 WebSocket
- OPTIONS: 用于调试，多数线上服务都不支持
- TRACE: 用于调试，多数线上服务都不支持

### Head

- Accept 接收数据的类型（\*/\*，application/json，text/html);
- Accept-Charset 接收数据的字符集（GBK）
- Accept-Encoding 接收数据的编码（gzip）
- Accept-Language 接收数据的语言（en-US)
- Authorization 认证内容（token)
- Connection 连接方式，如果是 keep-alive 且服务器支持则会复用连接
- User-Agent 客户端标识
- Cookie 客户端存储的 cookie 字符串
- Content-Type 请求 body 的数据类型

### Body

body 主要用于数据提交，包括不限于表单提交、文件上传、数据提交等。常见的 body 数据类型是 text/xml、application/json、multipart/form-data、application/x-www-form-urlencoded 等

## Response

### 状态码和状态文本

包括不限于下面的状态码：

- 1xx: 临时回应，表示客户端请继续；
- 2xx: 请求成功；
  - 200: 请求成功；
- 3xx: 表示请求的目标有变化，希望客户端进一步处理；
  - 301: 永久性跳转；
  - 302: 临时性跳转；
  - 304: 使用客户端缓存，没有更新；
- 4xx: 客户端请求错误；
  - 403: 无权限；
  - 404: 请求的资源找不到；
  - 418: it's a teapot；
- 5xx: 服务端处理错误；
  - 500: 服务器端错误；
  - 503: 服务器端暂时性错误，可以一会儿再试；

### header

- Cache-Control 控制缓存的时效性，用于通知各级缓存的时间
- Content-Encoding 内容编码方式，一般为 gzip
- Content-length 内容长度,有利于浏览器判断内容有没有结束
- Etag 页面信息摘要，由于判断是否要从服务器请求资源
- Expires 过期时间，用于判断是否从重新服务器请求资源
- Keep-Alive 保持连接不断需要的一些信息，比如 timeout=5,max=500;
- Last-Modified 页面上次修改时间
- Server 服务器类型
- Set-Cookie 设置 cookie 字符串

### body
