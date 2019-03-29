[TOC]  

# 1. 浏览器对象模型 (BOM)  

浏览器对象模型 (BOM) 使 JavaScript 有能力与浏览器“对话”。  

## Window 对象  
所有浏览器都支持 window 对象。它表示浏览器窗口。  
所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。  
全局变量是 window 对象的属性。  
全局函数是 window 对象的方法。  
HTML DOM 的 document 也是 window 对象的属性之一<font color=green>本笔记将会在后面讲解</font>  

## 1.1 Window 尺寸  

window对象有几种尺寸的属性对象，他们的区别请到[该文章](JavaScript概念之window内置与高宽有关的概念.md)查看：  
screen：屏幕。这一类取到的是关于屏幕的宽度和距离，与浏览器无关，是获取window对象的属性。  
client：使用区、客户区。指的是客户区，当然是指浏览器区域。  
offset：偏移。指的是目标甲相对目标乙的距离。  
scroll：卷轴、卷动。指的是包含滚动条的的属性。  
inner：内部。指的是内部部分，不含滚动条。  
avail：可用的。可用区域，不含滚动条，易与inner混淆。  

有三种方法能够确定浏览器窗口的尺寸（浏览器的视口，不包括工具栏和滚动条）。  
对于Internet Explorer、Chrome、Firefox、Opera 以及 Safari：  
>window.innerHeight - 浏览器窗口的内部高度  
>window.innerWidth - 浏览器窗口的内部宽度  

对于 Internet Explorer 8、7、6、5：  

    document.documentElement.clientHeight  
    document.documentElement.clientWidth  
或者  

    document.body.clientHeight  
    document.body.clientWidth  

实用的 JavaScript 方案（涵盖所有浏览器）：  
实例  

    var w=window.innerWidth|| document.documentElement.clientWidth|| document.body.clientWidth;  

    var h=window.innerHeight|| document.documentElement.clientHeight|| document.body.clientHeight;  

## 1.2 window screen  

window.screen 对象在编写时可以不使用 window 这个前缀。  

一些属性：  
>screen.width -屏幕高度  
>screen.heigth -屏幕高度  
>screen.availWidth - 可用的屏幕宽度  
>screen.availHeight - 可用的屏幕高度  
>screen.colorDepth - 用户浏览器表示的颜色位数，通常为32位（每像素的位数）  
>screen.pixelDepth - 用户浏览器表示的颜色位数，通常为32位（每像素的位数）(IE不支持该属性)  

## 1.3 window location  

window.location 对象在编写时可不使用 window 这个前缀。  

location对象属性：  
>location.href 属性返回当前页面的 URL (查看示意图)  
>location.protocol 返回所使用的 web 协议（http:// 或 https://）  
>location.host 返回 web 主机的域名 + 当前URL的端口  
>location.hostname 返回 web 主机的域名  
>location.port 返回 web 主机的端口 （80 或 443）  
>location.pathname 返回当前页面的路径和文件名  
>location.search 设置或返回从问号开始的URL（查询部分）  
>location.hash 设置或返回从井号开始的URL（锚）  

如下图所示：  
![location](./image/location.jpg "location")  

location 对象方法：  

>location.assign() 加载新的文档  
>location.reload() 重新加载当前文件  
>location.replace() 使用新文档替换当前文档  

## 1.4 window history  

>window.history 对象在编写时可不使用 window 这个前缀  
>window.history 对象包含浏览器的历史  

>history 对象属性  
>history.length 返回浏览器历史列表中URL的数量  

history 对象方法：  
>history.back() - 与在浏览器点击后退按钮相同  
>history.forward() - 与在浏览器中点击按钮向前相同  
>history.go(number)  

>number值|表示意思  
-|-  
1| 与forward()等价  
0| 当前页面  
-1| 与back()等价  
>其他数值|访问URL历史列表中的其他相对位置  

## 1.5 window navigator  

window.navigator 对象包含有关访问者浏览器的信息。  
window.navigator 对象在编写时可不使用 window 这个前缀。  

对象属性  
>appCodeName - 浏览器代码名的字符串表示  
>appName - 返回浏览器的名称  
>appVersion - 返回浏览器平台和版本信息  
>platform - 返回浏览器的操作系统  
>userAgent — 返回客户机发送给服务器的user-agent的头部值  

浏览器检测  
由于 navigator 可误导浏览器检测，使用对象检测可用来嗅探不同的浏览器。  
由于不同的浏览器支持不同的对象，您可以使用对象来检测浏览器。例如，由于只有 Opera 支持属性 "window.opera"，您可以据此识别出 Opera。  
例子：if (window.opera) {...some action...}  

## 1.6 window timing  

通过使用 JavaScript，我们有能力做到在一个设定的时间间隔之后来执行代码，而不是在函数被调用后立即执行。我们称之为计时事件。  
>window.setInterval() - 每隔指定的时间执行代码  
>window.setTimeout() - 指定的时间之后执行代码  
>window.clearInterval() - 取消setInterval设置  
>window.clearTimeout() - 却笑setTimeout设置  

    var t=setTimeout("javascript语句",毫秒);  
    clearTimeout(t);  

## 1.7 其他 Window 方法  
更多的用法请到[window对象方法资料](window对象方法资料.md)查看  

>window.alert() - 显示带有一段消息和一个确认按钮的警告框  
>window.prompt() - 显示可提示用户输入的对话框  
>window.confirm() - 显示带有一段消息和一个确认按钮，一个取消按钮的对话框  
>window.open() - 打开新窗口  
>window.close() - 关闭当前窗口  
>window.print()  - 打印当前窗口的内容  
>window.focus() - 把键盘焦点给予一个窗口  
>window.blur() - 把键盘窗口从顶层窗口移开  
>window.moveBy() - 相对当前窗口的当前坐标移动指定的像素  
>window.moveTo() - 把当前窗口的左上角移动到指定的坐标  
>window.resizeBy() - 按照指定的像素调整窗口大小  
>window.resizeTo() - 调整当前窗口的尺寸到指定的高宽  
>window.scrollBy() - 按照指定的像素来滚动窗口  
>window.scrollTo() - 把内容滚动到指定的坐标  
