# HTTP 消息

HTTP消息是服务器和客户端之间交换数据的方式。有两种类型的消息︰ 
+ 请求--由客户端发送用来触发一个服务器上的动作；
+ 响应--来自服务器的应答。

HTTP 请求和响应具有相似的结构，由以下部分组成︰

1. 起始行用于描述要执行的请求，或者是对应的状态，成功或失败。这个起始行总是单行的。
2. 可选的HTTP头集合指明请求或描述消息正文。
3. 空行指示所有关于请求的元数据已经发送完毕。
4. 可选的包含请求相关数据的正文 (比如HTML表单内容), 或者响应相关的文档。 正文的大小有起始行的HTTP头来指定。

起始行和  HTTP 消息中的 HTTP 头统称为请求头，使用ascll文本，而其有效负载被称为消息正文，可以是任意格式的文件。

![HTTP 消息](./img/HTTPmsg.png)

## HTTP 请求

### 起始行

HTTP请求是由客户端发出的消息，用来使服务器执行动作。起始行 (start-line) 包含三个元素：
1. HTTP 方法(GET, PUT, POST, HEAD, OPTIONS 等);
2. 请求目标 (request target)，通常是一个 URL，或者是协议、端口和域名的绝对路径，通常以请求的环境为特征。请求的格式因不同的 HTTP 方法而异。
3. HTTP 版本 (HTTP version)，定义了剩余报文的结构，作为对期望的响应版本的指示符。

### Headers

请求的 HTTP headers 遵循和 HTTP header 相同的基本结构：不区分大小写的字符串，紧跟着的冒号 (':') 和一个结构取决于 header 的值。有许多请求头可用，它们可以分为几组：
1. General headers
2. Request headers
3. Entity headers

![request Headers](./img/HTTP_Request_Headers.png)

### Body

请求的最后一部分是它的 body。不是所有的请求都有一个 body。例如获取资源的请求，GET，HEAD，DELETE 和 OPTIONS，通常它们不需要 body。 有些请求将数据发送到服务器以便更新数据：常见的的情况是 POST 请求（包含 HTML 表单数据）。

Body 大致可分为两类：
1. Single-resource bodies，由一个单文件组成。该类型 body 由两个 header 定义： Content-Type 和 Content-Length.
2. Multiple-resource bodies，由多部分 body 组成，每一部分包含不同的信息位。通常是和  HTML Forms 连系在一起。

## HTTP 响应

### 状态行

HTTP 响应的起始行被称作 状态行 (status line)，包含以下信息：

1. 协议版本，通常为 HTTP/1.1。
2. 状态码 (status code)，表明请求是成功或失败。常见的状态码是 200，404，或 302。
3. 状态文本 (status text)。一个简短的，纯粹的信息，通过状态码的文本描述，帮助人们理解该 HTTP 消息。

一个典型的状态行看起来像这样：HTTP/1.1 404 Not Found。

### Headers

和请求的 HTTP headers 表现形式差不多。但比请求的 HTTP Headers 要复杂一点。

![response headers](./img/HTTP_Response_Headers.png)

### Body

响应的最后一部分是 body。不是所有的响应都有 body：具有状态码 (如 201 或 204) 的响应，通常不会有 body。

Body 大致可分为三类：

1. Single-resource bodies，由已知长度的单个文件组成。该类型 body 由两个 header 定义：Content-Type 和 Content-Length。
2. Single-resource bodies，由未知长度的单个文件组成，通过将 Transfer-Encoding 设置为 chunked 来使用 chunks 编码。
3. Multiple-resource bodies，由多部分 body 组成，每部分包含不同的信息段。但这是比较少见的。

## 状态码

+ 100-199 信息性状态码
+ 200-299 成功状态码 （常见200表示请求成功）
+ 300-399 重定向状态码 （常见302重定向）
+ 400-499 客户端错误状态码 （常见404，请求资源不存在）
+ 500-599 服务端错误状态码

## Headers 字段

首部分为通用首部、请求首部、响应首部、主体首部、扩展首部！

[详细查看请点击](https://github.com/woai30231/http/tree/master/%E7%AC%AC%E4%B8%89%E7%AB%A0%20HTTP%E6%8A%A5%E6%96%87)
