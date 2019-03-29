# HTML5 新特性

## HTML5 新特性(一)语义标签

1. section 定义文档中的主体部分的节、段
```
<section></section>
```
2. article 定义来自外部的一个独立的、完整的内容块

一个特殊的section标签，比section有更明确的语义。定义来自外部的一个独立的、完整的内容块，例如什么论坛的文章，博客的文本。。。
```
<article></article>
```
3. aside 用来装载页面中非正文的内容，独立于其他模块，广告、成组的链接、侧边栏。。。
```
<aside></aside>
```
4. header 和 footer 

+ header 定义文档、页面的页眉。通常是一些引导和导航信息，不局限于整个页面头部，也可以用在内容里。
+ footer 定义了文档、页面的页脚，和 header 类似。

```
<header></header>
<footer></footer>
```
5. nav 定义了一个链接组组成的导航部分

其中的链接可以链接到其他网页或者当前页面的其他部分。
```
<nav></nav>
```
6. figure 和 figcaption

+ figure 用于对元素进行组合
+ figcaption 为figure元素加标题

```
<figure>
  <img src="img/mdn-logo-sm.png" alt="An awesome picture">	
  <figcaption>Fig1. MDN Logo</figcaption>
</figure>
```
7. details 和 summary

+ details 定义元素的细节,用户可以点击查看或者隐藏
+ summary 用作 一个 details 元素的一个内容的摘要，标题或图例

```
<details>
  <summary>Some details</summary> 
  <p>More info about the details.</p> 
</details>
```
8. canvas 用来进行canvas绘图。

```
<canvas></canvas>
```
9. video 和 audio

+ video 定义视频
+ audio 定义音频

```
<video></video>
<audio></audio>
```
10. source 和 track
+ source 该标签为媒介元素(比如video、audio)定义媒介元素
+ track 媒体类元素的外部轨道

```
<video controls>
  <source src="foo.webm" type="video/webm">
  <source src="foo.ogg" type="video/ogg"> 
  <source src="foo.mov" type="video/quicktime">
  <track kind="captions" src="foo.en.vtt" srclang="en" label="English">
  <track kind="captions" src="foo.sv.vtt" srclang="sv" label="Svenska">
</video>
```
11. datalist 包含了一组 option 元素,这些元素表示其它表单控件可选值.

```
<label>Choose a browser from this list:
<input list="browsers" name="myBrowser" /></label>
<datalist id="browsers">
  <option value="Chrome">
  <option value="Firefox">
  <option value="Internet Explorer">
</datalist>
```
12. mark 代表突出显示的文字

```
<p>&lt;mark&gt; 元素用于 <mark>高亮</mark> 文本</p>
```
13. output 表示计算或用户操作的结果。

```
<form oninput="result.value=parseInt(a.value)+parseInt(b.value)">
    <input type="range" name="b" value="50" /> +
    <input type="number" name="a" value="10" /> =
    <output name="result"></output>
</form>
```
14. progress 进度条，运行中的进度

```
<progress value="70" max="100">70 %</progress>
```
15. time 表示日期则也可包含时间和时区

```
<p>The concert starts at <time>20:00</time>.</p>
```

## 新特性(二)表单新特性

1. 10个 input 的 type 值

+ email: 邮件输入域，在表单提交时提供简单的邮箱格式验证，并弹出一个提示窗口。
+ url: 地址输入域，在表单提交时提供简单的URL地址格式验证，并弹出一个提示窗口。
+ number: 数字输入域。(可设置min、max、step)
+ tel: 电话号码输入域，在手机浏览器中弹出数字输入域。
+ search: 搜索输入域，在手机浏览器右下角呈现搜索按键。
+ range: 范围选择控件。
+ color: 颜色选择控件。
+ date/month/week: 时间选择控件。

2. 11个表单元素新属性

+ autocomplete: 自动补全，是否自动记录之前提交的数据，以用于下一次输入建议。
+ placeholder: 占位符，用于在输入框中显示提示性文字，与value不同，不能被提交。
+ autofocus: 自动获得输入焦点。
+ multiple: 是否允许多个输入值，若声明该属性，那么输入框中允许输入多个用逗号隔开的值。
+ form: 值为某个表单的id，若设置，则该输入域可放在该表单外面。
+ required: 在表单提交时会验证是否有输入，没有则弹出提示消息。
+ maxlength: 限制最大长度，只有在有输入的情况下才有用，不区分中英文。
+ minlength: 限制最小长度，但它不是H5标准属性，仅部分浏览器支持。
+ min: 限定输入数字的最小值。
+ max: 限定输入数字的最大值。
+ step: 限定输入数字的步长，与min连用。
+ pattern: 指定一个正则表达式，对输入进行验证。(正则默认首尾加^$)

## 新特性(三) Video 和 audio

+ 视频(video) H5新加了video标签，用来播放视频，默认为一个300*150的inline-block。
+ 音频(audio) H5新加了audio标签，用来播放音频，默认为一个300*30并且display为none的inline-block(除非有controls属性)。但手机ios系统中的safari浏览器不支持这个标签，其余的都支持。

属性: 
+ src: 指定要播放的资源路径。
+ autoplay: 是否自动播放。
+ controls: 是否显示播放控件。
+ currentTime: 当前播放的时间点。
+ duration: 总时长(s)。
+ ended: 是否结束。
+ loop: 是否循环播放。
+ muted: 是否静音。
+ volume: 音量设置(0~1)。
+ paused: 是否在播放。
+ preload: 指定视频预加载方案。
+ play(): 播放。
+ pause(): 暂停。
+ onplay: 开始播放事件。
+ onpause: 开始暂停事件。
+ onplaying: 正在播放中事件。

## 新特性(四) canvas

H5引入了canvas标签，默认是一个300*150的inline-block。

canvas的宽高只能用它自身的width和height属性来指定，而不能使用css样式中的width、height。

1. 获得‘画笔’对象，canvas所有的任务都需要它来执行
```
var ctx=canvas.getContext('2d');
```

2. 一些canvas常用的属性
+ fillStyle: 填充样式
+ strokeStyle: 描边样式
+ lineWidth: 描边宽度
+ font: 绘制文本所用的字体大小和类型
+ textBaseline: 文本对其的基线
+ shadowOffsetX、shadowOffsetY: 阴影偏移量

3. 使用canvas绘制图形
+ 绘制矩形
```
ctx.fillRect(x,y,w,h);//填充一个矩形
ctx.strokeRect(x,y,w,h);//描边一个矩形
ctx.clearRect(x,y,w,h);//清除一个矩形范围内的内容
```
+ 绘制文本

*要注意的是文本的定位点默认在文本基线(alphabetic)的起始点！
```
ctx.fillText(txt,x,y);//填充文本
ctx.strokeText(txt,x,y);//描边文本
ctx.measureText(txt);//测量
```
+ 为图形文字添加阴影
```
ctx.shadowColor='#000';//颜色
ctx.shadowOffsetX=8;//水平偏移量
ctx.shadowOffsetY=8;//垂直偏移量
ctx.shadowBlur=10;//模糊半径
```
+ 在绘图时使用渐变色
```
ctx.createLinearGradient(x1,y1,x2,y2);//创建线性渐变对象
ctx.createRadialGradient(x1,y1,r1,x2,y2,r2);//创建径向渐变对象
ctx.addColorStop;//添加颜色点
```
+ 绘制路径
```
ctx.beginPath();//开始路径
ctx.closePath();//结束路径
ctx.moveTo(x,y);//移动到指定点
ctx.lineTo(x,y);//绘制直线路径到指定点
ctx.arc();//绘制拱形路径
ctx.ellipse();//绘制椭圆路径
ctx.bezierCurveTo();//绘制贝塞尔曲线路径
ctx.linJoin();//修改折线拐点处样式
```
+ 绘制图像
```
ctx.drawImage()
```
+ 对于绘制上下文状态的改变和修改
```
ctx.translate(x,y);//坐标轴原点移动到指定点
ctx.rotate();//旋转画笔
ctx.scale();//画笔缩放
ctx.save();//保存绘图上下文当前的变形数据
ctx.restore();//恢复最近一次的保存的变形相关的状态
```

## 新特性(五) SVG

相对于canvas绘图，SVG是一种绘制矢量图的技术，全称叫做Scalable Vector Graphics，可缩放的矢量图。

在2000年就已经存在，H5把它纳入了标准标签库，并进行了一些瘦身。需要注意的是，SVG图形的属性不属于HTML DOM标准，需要用核心DOM的方法来操作；

SVG的样式可以用css，但是只能用其专有的属性；如果要使用js动态生成SVG其中的元素，创建方法得用document.createElementNS('http://www.w3.org/2000/svg','标签名')；SVG元素的nodeName都是纯小写形式。

1. 使用方法

在HTML文件中直接使用SVG相关标签(\<svg>\</svg>)即可，默认是一个300*150的inline-block。
[SVG 元素参考手册](https://developer.mozilla.org/zh-CN/docs/Web/SVG/Element)，
[SVG 属性参考手册](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute)。

## 新特性(六) 地理位置

简单地用一句话概括就是，使用js获取浏览器当前所在的地理坐标，实现LBS(Location Based Service，基于定位的服务)。
```
//确定设备的位置并返回一个携带位置信息的 Position 对象。
Geolocation.getCurrentPosition() 
//注册一个位置改变监听器，每当设备位置改变时，返回一个 long 类型的该监听器的ID值。
Geolocation.watchPosition()
//取消由 watchPosition()注册的位置监听器。
Geolocation.clearWatch()
```

## 新特性(七) 拖放 API

拖放API是H5专门为了鼠标拖放而新提供了7个事件
```
drag dragend dragenter dragleave dragover dragstart drop
```

## 新特性(八) Web Worker

由于js是单线程的，所以H5添加了这个叫做webWorker的概念，允许js创建多个线程，但是子线程完全受主线程控制，且不能操作DOM，从而来处理一些比较耗时的操作。

[Web Worker 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Workers_API/Using_web_workers)

## 新特性(九) Web Storage

H5的webStorage技术一共提供了两个对象：window.sessionStorage和window.localStorage。

1. window.sessionStorage 会话级存储

```
//存储一个数据
sessionStorage['key']=value;
sessionStorage.setItem('key',value);
//读取一个数据
var data = sessionStorage['key'];
var data = sessionStorage.getItem('key');
//获取数据的个数
sessionStorage.length
//清除所有的数据
sessionStorage.clear();
//清除一个数据
sessionStorage.removeItem('key');
```

2. window.localStorage 本地存储
```
//存储一个数据
localStorage['key']=value;
localStorage.setItem('key',value);
//读取一个数据
var data = localStorage['key'];
var data = localStorage.getItem('key');
//获取数据的个数
localStorage.length
//清除所有的数据
localStorage.clear();
//清除一个数据
localStorage.removeItem('key');
```
[Web Storage 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Storage_API)

　　
## 新特性(十) Web Socket

webSocket是H5新加的一个协议，为了解决http协议的request、response一一对应和它自身的被动性，以及ajax轮询等问题。一方可以发送多条信息，连接不中断，永久连接，但也导致了服务器连接的客户端数量有限。

```
var ws = new WebSocket('ws://地址:端口号');    //创建ws客户端
ws.onopen=function(){                        //连接成功时触发
　　ws.send();                                //发送信息
　　ws.onmessage=function(e){                 //获得信息时触发
      e.data;                                //接收的信息
　　}
}
```
[Web Socket 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/WebSocket)








