# note  
note for learning code  

暂时来源于网络摘抄  

#移动前端第一弹：viewport详解  
发表于 2015-10-13   |   杜瑶   |   分类于 mobile   |   13条评论  

前言  

这次想聊聊移动开发相关的事。是的，你没有看错，一句话就可以开始你的移动前端开发。  

你心里一定在想，什么话这么酷，能够瞬间带入到移动前端开发的世界。  

但其实它一点也不新奇，不复杂。  

viewport简介  

没错，就是viewport特性，一个移动专属的Meta值，用于定义视口的各种行为。  

该特性最先由Apple引入，用于解决移动端的页面展示问题，后续被越来越多的厂商跟进。  

举个简单的例子来讲为什么会需要它：  

我们知道用户大规模使用手机等移动设备来进行网页浏览器，其实得益于智能手持设备的兴起，也就是近几年的事。（还记得不久前的几年，满大街都还是诺基亚的天下么？）  

这时有一个很现实的问题摆在了厂商面前，用户并不能很好地通过手机等设备访问网页，因为屏幕太小。  

layout viewport  

Apple也发现了这个问题，并且适时的出现，它提出了一个方案用来解决这个问题。在iOS Safari中定义了一个viewport meta标签，用来创建一个虚拟的布局视口（layout viewport），而这个视口的分辨率接近于PC显示器，Apple将其定义为980px（其他厂商各有不同①）。  

这就很好的解决了早期的页面在手机上显示的问题，由于两者之间的宽度趋近，CSS只需要像在PC上那样渲染页面就行，原有的页面结构不会被破坏。  

①的描述大致如下，数值不一定持续准确，厂商可能更改，但这个绝对值其实并非特别重要：  
iOS, Android基本都是: 980px  
BlackBerry: 1024px  
visual viewport  

有了layout viewport，我们还需要一个视口用来承载它，这个视口可以简单的认为是手持设备物理屏幕的可视区域，我们称之为（视觉视口）visual viewport。这是一个比较直观的概念，因为你能看得见你的手机屏幕。  

对于visual viewport，开发者一般只需要知道它的存在和概念就行，因为无法对它进行任何设置或者修改。很明显，visual viewport的尺寸不会是一个固定的值，甚至每款设备都可能不同。大致列几种常见设备的visual viewport尺寸：  

iPhone4~iPhone5S: 320*480px  
iPhone6~iPhone6S: 375*627px  
iPhone6 Plus~iPhone6S Plus: 414*736px  
以iPhone4S为例，会在其320px②的visual viewport上，创建一个宽980px的layout viewport，于是用户可以在visual viewport中拖动或者缩放网页，来获得良好的浏览效果；布局视口用来配合CSS渲染布局，当我们定义一个容器的宽度为100%时，这个容器的实际宽度是980px而不是320px，通过这种方式大部分网页就能以缩放的形式正常显示在手机屏幕上了。  

②的描述大致如下：  
早期移动前端开发工程师常能见到宽640px的设计稿，原因就是UI工程师以物理屏幕宽度为320px的iPhone4-iPhone5S作为参照设计；  
当然，现在你还可能会见到750px和1242px尺寸的设计稿，原因当然是iPhone6的出现  
当然，为了更好的适配移动端或者只为移动端设计的应用，单有布局视口和视觉视口还是不够的。  

ideal viewport  

我们还需要一个视口，它类似于布局视口，但宽度和视觉视口相同，这就是完美视口（ideal viewport）。  

有了完美视口，用户不用缩放和拖动网页就能够很好的进行网页浏览。而完美视口也是通过viewport meta的某种设置来达到。  

说了这么一大堆的东西，貌似都和viewport有关联，那么viewport到底怎么搞，请继续往下。  

关于3个视口，PPK已经做了非常棒的阐释，你也可以在StackOverflow上找到一些对此描述的相互补充，例如：[1], [2]，有兴趣的童鞋也可以看看  
viewport特性  

通常情况下，viewport有以下6种设置。当然厂商可能会增加一些特定的设置，比如iOS Safari7.1增加了一种在网页加载时隐藏地址栏与导航栏的设置：minimal-ui，不过随后又将之移除了。  

Name	Value	Description  
width	正整数或device-width	定义视口的宽度，单位为像素  
height	正整数或device-height	定义视口的高度，单位为像素  
initial-scale	[0.0-10.0]	定义初始缩放值  
minimum-scale	[0.0-10.0]	定义缩小最小比例，它必须小于或等于maximum-scale设置  
maximum-scale	[0.0-10.0]	定义放大最大比例，它必须大于或等于minimum-scale设置  
user-scalable	yes/no	定义是否允许用户手动缩放页面，默认值yes  
width  

width被用来定义layout viewport的宽度，如果不指定该属性（或者移除viewport meta标签），则layout viewport宽度为厂商默认值。如：iPhone为980px；  

举个例子：  

1  
<meta name="viewport" content="width=device-width" />  
此时的layout viewport将成为ideal viewport，因为layout viewport宽度与设备视觉视口宽度一致了。  

除了width之外，还有一个属性定义也能实现ideal viewport，那就是initial-scale。  

height  

与width类似，但实际上却不常用，因为没有太多的use case。  

initial-scale  

如果想页面默认以某个比例放大或者缩小然后呈现给用户，那么可以通过定义initial-scale来完成。  

initial-scale用于指定页面的初始缩放比例，假定你这样定义：  

1  
<meta name="viewport" content="initial-scale=2" />  
那么用户将会看到2倍大小的页面内容。  

在说width的时候，我们说到initial-scale也能实现ideal viewport，是的，你只需要这样做，也可以得到完美视口：  

1  
<meta name="viewport" content="initial-scale=1" />  
maximum-scale  

在移动端，你可能会考虑用户浏览不便，然后给予用户放大页面的权利，但同时又希望是在一定范围内的放大，这时就可以使用maximum-scale来进行约束。  

maximum-scale用于指定用户能够放大的比例。  

举个例子来讲：  

1  
<meta name="viewport" content="initial-scale=1,maximum-scale=5" />  
假设页面的默认缩放值initial-scale是1，那么用户最终能够将页面放大到这个初始页面大小的5倍。  

minimum-scale  

类似maximum-scale的描述，不过minimum-scale是用来指定页面缩小比例的。  

通常情况下，为了有更好地体验，不会定义该属性的值比1更小，因为那样页面将变得难以阅读。  

user-scalable  

如果你不想页面被放大或者缩小，通过定义user-scalable来约束用户是否可以通过手势对页面进行缩放即可。  

该属性的默认值为yes，即可被缩放（如果使用默认值，该属性可以不定义）；当然，如果你的应用不打算让用户拥有缩放权限，可以将该值设置为no。  

使用方法如下：  

1  
<meta name="viewport" content="user-scalable=no" />  
结语  

正如开篇所说，这既不高深也不新奇，它而仅仅是一点观念转变。  

当你掌握了viewport，那么意味着你已经大致了解了移动平台与PC平台的不同，你可以更专注而细致的去解决某些平台差异问题。  




#移动前端第二弹：善用meta  
发表于 2015-10-20   |   杜瑶   |   分类于 mobile   |   10条评论  
前言  

在移动前端第一弹：viewport详解中，我们讲了viewport，那是一个关于meta的故事。这次我们会就将meta这个故事讲得更广阔、更有意思一些。  

写过HTML的童鞋，应该都对这个不陌生，或用它来定义页面编码，或用它来定义搜索引擎抓取方式，或用它定义页面关键字，描述等等。  

meta列表  

好的meta使用，能更好地提高页面的可用性及被检索的几率。  

这里并不会列出所有的meta使用方式，只挑选一些常用及实际意义比较大的讲讲，当然也包括一些厂商私有定制的。  

常规  

声明文档使用的字符编码  

1  
<meta charset="utf-8" />  
该声明用来指定文档的编码，除了utf-8，可选值还有：ISO-8859-1、BIG5、iso-8859-2, iso-2022-jp, iso-2022-kr, gb2312等  

当然，你可能还见过使用另外一种方式来定义文档字符编码：  

1  
<meta http-equiv="content-type" content="text/html; charset=utf-8" />  
相对于这种方式，更推荐你使用第1种，言外之意，就是推荐使用HTML5。  

声明页面刷新或跳转  

1  
2  
<meta http-equiv="refresh" content="10" />  
<meta http-equiv="refresh" content="10; url=http://www.doyoe.com" />  
该声明用来指定页面自刷新或者跳转到其它页面，其中的时间单位是s。  

声明页面过期时间  

1  
2  
<meta http-equiv="expires" content="0" />  
<meta http-equiv="expires" content="Wed, 26 Feb 1997 08:21:57 GMT" />  
该声明用来指定页面的过期时间，一旦网页过期，从服务器上重新请求，其中时间必须使用GMT格式，或者直接是0（即不缓存）  

声明页面是否缓存  

1  
2  
<meta http-equiv="pragma" content="no-cache" />  
<meta http-equiv="cache-control" content="no-cache" />  
上述语句都可以用来指定文档不被缓存。一些仍然在使用HTTP/1.0的可以使用第1条，第2条由HTTP/1.1提供，常用值还有：public, no-cache, no-store等  

声明作者信息  

1  
<meta name="author" content="joy, dooyoe@gmail.com" />  
声明文档关键字  

1  
<meta name="keywords" content="CSS, HTML, JavaScript, 前端" />  
多关键字之间以半角逗号分隔  

声明文档描述  

1  
<meta name="description" content="这是一份meta列表" />  
文档描述内容最好是完整的一句话，以不超过50个字符为宜  

声明使用的浏览器及版本  

x-ua-compatible设置是从IE8开始增加的（很明显，只适用于IE），对于过往的版本无法识别。  
开发者可以通过设置x-ua-compatible来指定渲染引擎的类型和版本，并且因为需求不同可以有多种不同的设置：  

Case1:  

1  
2  
3  
4  
<meta http-equiv="x-ua-compatible" content="IE=7" />  
<meta http-equiv="x-ua-compatible" content="IE=4" />  
<meta http-equiv="x-ua-compatible" content="IE=xx" />  
<meta http-equiv="x-ua-compatible" content="IE=50" />  
当直接指定content为IE的某个具体版本，如上述代码第1条，客户端的IE将会使用IE7.0标准模式对页面进行渲染，并忽略Doctype定义。  
当指定的IE版本在客户端IE中不存在时，IE将会尝试将该值转换为最为接近的版本。  
例如指定一个错误的或者低于5.0的IE版本，如上述代码第2，3条，客户端的IE将会使用IE5.0对页面进行渲染，由于IE5.0并没有标准模式，所以将会直接使用quirks mode来渲染；  
如果指定一个大于客户端IE的版本，如上述代码第4条，假定客户端IE的最高版本为9.0，那么IE会将该值转换为IE=9，即使用IE9.0标准模式对页面进行渲染。  

Case2:  

1  
<meta http-equiv="x-ua-compatible" content="IE=EmulateIE7" />  
当指定的content值加了Emulate前缀时，如上述代码，客户端IE将会根据Doctype定义来决定如何来对页面进行渲染。假设页面使用了标准的Doctype，那么此定义效果等同Case1；假设页面并没有使用标准的Doctype，那么将使用quirks mode来渲染。  

Case3:  

1  
<meta http-equiv="x-ua-compatible" content="IE=Edge" />  
当指定的content值为IE=Edge时，如上述代码，客户端的IE将会使用最高的标准模式对页面进行渲染。  

Case4:  

1  
<meta http-equiv="x-ua-compatible" content="IE=7, 10, 11" />  
当指定的content值有多个版本时，如上述代码，假定客户端IE版本为8.0或者9.0，则使用IE7.0标准模式对页面进行渲染；假定客户端IE版本为10.0或者11.0，则直接使用对应版本的标准模式对页面进行渲染。  

Case5:  

1  
<meta http-equiv="x-ua-compatible" content="IE=Edge, chrome=1" />  
当指定的content值为IE=Edge, chrome=1时，如上述代码，假定客户端安装了Google Chrome Frame，则在IE中使用chrome的渲染引擎来渲染页面，否则，将会使用客户端IE最高的标准模式对页面进行渲染。  

声明搜索引擎抓取方式  

1  
<meta name="robots" content="index" />  
通知搜索引擎文档是否需要被索引。可选值有：  

all（默认值，索引当前页并跟踪链接，相当于：index, follow）  
none（忽略当前页，相当于：noindex, nofollow）  
index（索引当前页）  
noindex（不索引当前页）  
follow（跟踪当前页链接，不论当前页是否被索引）  
nofollow（不跟踪当前页链接，不论当前页是否被索引）  
如果声明冲突，某些引擎可能会做严格处理：  

1  
2  
<meta name="robots" content="noindex" />  
<meta name="robots" content="index" />  
类似上述代码，在Google引擎中，会执行noindex这个更为严格的声明。  

需要注意的是并不是所有搜索引擎都支持robots meta，比较保守的做法是配合robots.txt使用。  

声明搜索引擎抓取间隔  

1  
<meta name="revisit-after" content="10 days" />  
有时候你可能并不希望站点一直被搜索引擎抓取，而是每间隔一段时间才来访问一次，这时，可以声明revisit-after meta。  

移动  

声明viewport视口  

1  
<meta name="viewport" content="initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />  
该声明用于指定在移动设备上页面的布局视口如何设置。对于viewport meta的详细设置，请参考：移动前端第一弹：viewport详解  

声明添加到主屏幕的Web App标题  

iOS Safari允许用户将一个网页添加到主屏幕然后像App一样来操作它。我们知道每个App下方都会有一个名字，iOS Safari提供了一个私有的meta来定义这个名字，代码如下：  

1  
<meta name="apple-mobile-web-app-title" content="Web App名称" />  
Android Chrome31.0，Android Browser5.0也开始支持添加到主屏幕了，但并没有提供相应的定义标题的方式，所以如果你想统一iOS和Android平台定义Web app名称的方式，可以使用title标签来定义，代码如下：  

1  
<title>Web App名称</title>  
但如果你想要网页标题和App名字不一样的话，那就只有iOS才行。  

声明添加到主屏幕时隐藏地址栏和状态栏（即全屏）  

当我们将一个网页添加到主屏幕时，会更希望它能有像App一样的表现，没有地址栏和状态栏全屏显示，代码如下：  

1  
<meta name="apple-mobile-web-app-capable" content="yes" />  
该方案在 iOS 和 Android5.0+ 上都通用。  

声明添加到主屏幕时设置系统顶栏颜色  

当我们将一个网页添加到主屏幕时，还可以对 系统显示手机信号、时间、电池的顶部状态栏 颜色进行设置，前提是开启了：  

1  
<meta name="apple-mobile-web-app-capable" content="yes" />  
有了这个前提，你可以通过下面的方式来进行定义：  

1  
<meta name="apple-mobile-web-app-status-bar-style" content="black" />  
content只有3个固定值可选：default | black | black-translucent  

如果设置为 default，状态栏将为正常的，即白色，网页从状态栏以下开始显示；  
如果设置为 black，状态栏将为黑色，网页从状态栏以下开始显示；  
如果设置为 black-translucent，状态栏将为灰色半透明，网页将充满整个屏幕，状态栏会盖在网页之上；  
该设置只在 iOS 上有效。  

电话号码识别  

在 iOS Safari （其他浏览器和Android均不会）上会对那些看起来像是电话号码的数字处理为电话链接，比如：  

7位数字，形如：1234567  
带括号及加号的数字，形如：(+86)123456789  
双连接线的数字，形如：00-00-00111  
11位数字，形如：13800138000  
可能还有其他类型的数字也会被识别，但在具体的业务场景中，有些时候这是不必须的，所以你可以关闭电话自动识别，然后在需要拨号的地方，开启电话呼出和短信功能。  

关闭电话号码识别：  

1  
<meta name="format-detection" content="telephone=no" />  
开启拨打电话功能：  

1  
<a href="tel:123456">123456</a>  
开启发送短信功能：  

1  
<a href="sms:123456">123456</a>  
邮箱地址识别  

在 Android （iOS不会）上，浏览器会自动识别看起来像邮箱地址的字符串，不论有你没有加上邮箱链接，当你在这个字符串上长按，会弹出发邮件的提示。  

关闭邮箱地址识别：  

1  
<meta name="format-detection" content="email=no" />  
开启邮件发送：  

1  
<a href="mailto:dooyoe@gmail.com">dooyoe@gmail.com</a>  
如果想同时关闭电话和邮箱识别，可以把它们写到一条 meta 内，代码如下：  

1  
<meta name="format-detection" content="telephone=no,email=no" />  
附注  

部分meta定义来自于trip  
