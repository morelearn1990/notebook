## 常用 meta 整理

### 属性

|属性 | 值 | 描述|
----|----|----
|content | some text | 定义与http-equiv或name属性相关的元信息|
http-equiv|	content-type / expire / refresh / set-cookie | 把content属性关联到HTTP头部。
name|author / description / keywords / generator / revised / others	|把 content 属性关联到一个名称。
content|some text|定义用于翻译 content 属性值的格式。


### SEO
```
<!-- 关键词 描述 作者 -->
<meta name="keywords" content="your web keywords" />
<meta name="description" content="above 150 words" />
<meta name="author" content="author name" />



<meta name="robots" content="index,follow" />
<!--
    all：文件将被检索，且页面上的链接可以被查询；
    none：文件将不被检索，且页面上的链接不可以被查询；
    index：文件将被检索；
    follow：页面上的链接可以被查询；
    noindex：文件将不被检索；
    nofollow：页面上的链接不可以被查询。
 -->

<meta http-equiv="refresh" content="0;url=" />
<!-- content内的数字代表时间（秒），既多少时间后刷新。如果加url,则会重定向到指定网页（搜索引擎能够自动检测，也很容易被引擎视作误导而受到惩罚）。 -->
<meta name="google" content="index,follow" />
<meta name="googlebot" content="index,follow" />
<meta name="verify" content="index,follow" />

```

### 移动设备

```
<!-- 响应式 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
<!-- `width=device-width` 会导致 iPhone 5 添加到主屏后以 WebApp 全屏模式打开页面时出现黑边 
width：宽度（数值 / device-width）（范围从200 到10,000，默认为980 像素）
height：高度（数值 / device-height）（范围从223 到10,000）
initial-scale：初始的缩放比例 （范围从>0 到10）
minimum-scale：允许用户缩放到的最小比例
maximum-scale：允许用户缩放到的最大比例
user-scalable：用户是否可以手动缩 (no,yes)
minimal-ui：可以在页面加载时最小化上下状态栏。（已弃用） 
-->

<!-- Iphone 独有的一些 meta -->

<!-- 启用 WebApp 全屏模式 -->
<meta name="apple-mobile-web-app-capable" content="yes" />

<!-- 隐藏状态栏/设置状态栏颜色   只有在开启WebApp全屏模式时才生效。content的值为default | black | black-translucent 。 -->
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

<!-- 添加到主屏后的标题 -->
<meta name="apple-mobile-web-app-title" content="标题">

<!-- 忽略数字自动识别为电话号码 -->
<meta content="telephone=no" name="format-detection" /> 

<!-- 忽略识别邮箱 -->
<meta content="email=no" name="format-detection" />

<!-- 添加智能 App 广告条 Smart App Banner -->
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL"> 

<!-- 其他不常用设备兼容 -->
<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
<meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

```


### 网页相关

```
<!-- 网页编码 -->
<meta charset='utf-8' />

浏览器兼容
<!-- 关于X-UA-Compatible -->
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
<!-- 使用IE6 -->
<meta http-equiv="X-UA-Compatible" content="IE=6" >
<!-- 使用IE7 -->
<meta http-equiv="X-UA-Compatible" content="IE=7" >
<!-- 使用IE8 -->
<meta http-equiv="X-UA-Compatible" content="IE=8" >

<!-- 浏览器内核控制  国内浏览器的兼容配置 -->
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<!-- 
1. 搜狗高速浏览器、QQ浏览器：IE内核（兼容模式）
2. 360极速浏览器、遨游浏览器：Webkit内核（极速模式） 
-->


<!-- windows 8 -->
<!-- Windows 8 磁贴颜色 -->
<meta name="msapplication-TileColor" content="#000"/> 
<!-- Windows 8 磁贴图标 -->
<meta name="msapplication-TileImage" content="icon.png"/> 


<!-- 站点适配 -->
<meta name="mobile-agent"content="format=[wml|xhtml|html5]; url=url">
<!--
[wml|xhtml|html5]根据手机页的协议语言，选择其中一种；
url="url" 后者代表当前PC页所对应的手机页URL，两者必须是一一对应关系。
 -->

 <!-- 转码申明：用百度打开网页可能会对其进行转码（比如贴广告），避免转码可添加如下meta -->
<meta http-equiv="Cache-Control" content="no-siteapp" />


```


### 常用组合

```
<meta charset='utf-8' />
<meta name="renderer" content="webkit|ie-comp|ie-stand">
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/>
<meta name="keywords" content="your web keywords" />
<meta name="description" content="above 150 words" />
<meta name="author" content="author name" />
```


