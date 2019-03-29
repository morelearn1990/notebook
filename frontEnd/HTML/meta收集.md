# meta收集

     <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="renderer" content="webkit|ie-comp|ie-stand">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <meta name="apple-mobile-web-app-status-bar-style" content="black"> 
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon-precomposed" href="iphone_logo.png" />
    <link rel="apple-touch-startup-image" href="logo_startup.png" />
    <meta name="format-detection" content="telephone=no"> 
    <meta name="author" contect="liudanyun, liudy102@163.com" />
    

解释：

    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
设定页面使用的字符集，用以说明主页制作所使用的文字语言，浏览器会根据此来调用相应的字符集显示 page 内容。

    <meta name="renderer" content="webkit|ie-comp|ie-stand">
content的取值为webkit，ie-comp，ie-stand之一，区分大小写，分别代表用极速模式，兼容模式，IE模式打开。

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
使用最高版本ie渲染；如果支持Google Chrome Frame：GCF，则使用GCF渲染；

    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">   
在iPhone的浏览器中页面将以原始大小显示，不允许缩放。
width - viewport的宽度 height - viewport的高度   
initial-scale - 初始的缩放比例  
minimum-scale - 允许用户缩放到的最小比例   
maximum-scale - 允许用户缩放到的最大比例  
user-scalable - 用户是否可以手动缩放  
 
    <meta name="format-detection" content="telephone=no"> 
在iPhone 手机上默认值是（电话号码显示为拨号的超链接）：
<meta name="format-detection" content="telephone=yes"/>
可将telephone=no，则手机号码不被显示为拨号链接
<meta name="format-detection" content="telephone=no"/>
 
    <meta name="apple-mobile-web-app-status-bar-style" content="black"> 
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon-precomposed" href="iphone_logo.png" />
    <link rel="apple-touch-startup-image" href="logo_startup.png" />
iOS设备对meta定义的私有属性：（可以添加至主屏幕）
<meta name="apple-mobile-web-app-capable" content="yes" />
网站开启对web app程序的支持。
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
在web app应用下状态条（屏幕顶部条）的颜色；
默认值为default（白色），可以定为black（黑色）和black-translucent（灰色半透明）。
若值为“black-translucent”将会占据页面px位置，浮在页面上方（会覆盖页面20px高度–iphone4和itouch4的Retina屏幕为40px）。
第一个 link 就是设置 Web App 的放置主屏幕上 icon 文件路径。
该路径需要注意的就是放到将网站的文档根目录下但不是服务器的文档的根目录。
图片尺寸可以设定为`57*57（px）或者 Retina 可以定为 114*114（px），iPad 尺寸为 72*72（px）`
第二个link 就是设置启动时候的界面。
放置的路径和上面一样。
官方规定启动界面的尺寸必须为 320*640（px），原本以为 Retina 屏幕可以支持双倍，但是不支持，图片显示不出来。

    <meta name="author" contect="liudanyun, liudy102@163.com" />
name 属性设置作者姓名及联系方式








