# MIME类型

MIME类型是一种通知客户端其接收文件的多样性的机制:文件后缀名在网页上并没有明确的意义。因此，使服务器设置正确的传输类型非常重要，所以正确的MIME类型与每个文件一同传输给服务器。在网络资源进行连接时，浏览器经常使用MIME类型来决定执行何种默认行为。

## 通用结构
```
type/subtype
```

MIME的组成结构非常简单；由类型与子类型两个字符串中间用“/”分隔而组成。并不允许空格存在。type 表示可以被分为复数子类的独立类型。subtype 表示细分后的每个类型。

### type 独立类型

独立 类型表明了对文件的分类

+ text	表明文件是普通文本，理论上是可读的语言	text/plain, text/html, text/css, text/javascript
+ image	表明是某种图像。不包括视频，但是动态图（比如动态gif）也使用image类型	image/gif, image/png, image/jpeg, image/bmp, image/webp
+ audio	表明是某种音频文件	audio/midi, audio/mpeg, audio/webm, audio/ogg, audio/wav
+ video	表明是某种视频文件	video/webm, video/ogg
+ application	表明是某种二进制数据	application/octet-stream,application/pkcs12, application/vnd.mspowerpoint, application/xhtml+xml, application/xml,  application/pdf application/json

### Multipart types

Multipart types 表示细分领域的文件类型的种类，经常对应不同的 MIME 类型，这是复合文件的一种表现方式。对于 multipart/form-data 的例外部分，可以使用HTML Forms 和 POST 方法来解决，以及使用状态码206 Partial Content 来发送整个文件的子集，而HTTP不能处理的复合文件使用一个特殊的方式：将信息直接传送给浏览器（这时可能会建立一个“另存为”窗口，但是却不知道如何去显示内联文件。）

## 重要的MIME类型

1. application 应用程序文件
+ application/octet-stream : 这是应用程序文件的默认值。意思是 未知的应用程序文件 ，浏览器一般不会自动执行或询问执行.
2. text 文本文件
+ text/plain : 文本文件默认值。意思是 未知的文本文件 ，浏览器认为是可以直接展示的。
+ text/css : 任何一个CSS文件想要在网页上被解释执行就必须为text/css 文件
+ text/html : HTML 文件的类型
3. image 图片文件
+ image/gif : 	GIF 图片 (无损耗压缩方面被PNG所替代)
+ image/jpeg : 	JPEG 图片
+ image/png : 	PNG 图片
+ image/svg+xml : 	SVG图片 (矢量图)
4. 音频与视频类型
+ audio/wave audio/wav audio/x-wav audio/x-pn-wav : 音频流媒体文件。一般支持PCM音频编码，其他解码器有限支持（如果有的话）。
+ audio/webm : WebM 音频文件格式。Vorbis 和 Opus 是其最常用的解码器。 
+ video/webm : 采用WebM视频文件格式的音视频文件。VP8 和 VP9是其最常用的视频解码器。Vorbis 和 Opus 是其最常用的音频解码器。 
+ audio/ogg : 采用OGG多媒体文件格式的音频文件。 Vorbis 是这个多媒体文件格式最常用的音频解码器。
+ video/ogg : 采用OGG多媒体文件格式的音视频文件。常用的视频解码器是 Theora；音频解码器为Vorbis 。
+ application/ogg : 采用OGG多媒体文件格式的音视频文件。常用的视频解码器是 Theora；音频解码器为Vorbis 。
5. multipart/form-data : 可用于HTML表单从浏览器发送信息给服务器
6. multipart/byteranges : 用于把部分的响应报文发送回浏览器.当发送状态码  206 Partial Content 时，这个MIME类型用于指出这个文件由若干部分组成，每一个都有其请求范围

## 重要性

很多web服务器使用默认的 application/octet-stream 来发送未知类型.常见的导致服务器配置错误的文件类型如下所示：

+ RAR编码文件。在这种情况，理想状态是，设置真实的编码文件类型；但这通常不可能（可能是服务器所未知的类型或者这个文件包含许多其他的不同的文件类型）。这这种情况服务器将发送 application/x-rar-compressed 作为MIME类型，用户不会将其定义为有用的默认操作。
+ 音频或视频文件。只有正确设置了MIME类型的文件才能被 \<video\> 或\<audio\> 识别和播放。 可参照  use the correct type for audio and video。
+ 专有文件类型。是专有文件时需要特别注意。使用 application/octet-stream 作为特殊处理是不被允许的：对于一般的MIME类型浏览器不允许定义默认行为（比如“在Word中打开”）
