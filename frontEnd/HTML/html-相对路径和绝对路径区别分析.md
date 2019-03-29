## 一、HTML 相对路径和绝对路径区别分析

HTML初学者会经常遇到这样一个问题，如何正确引用一个文件。比如，怎样在一个HTML网页中引用另外一个HTML网页作为超链接(hyperlink)？怎样在一个网页中插入一张图片。

如果你在引用文件时(如加入超链接，或者插入图片等)，使用了错误的文件路径，就会导致引用失效(无法浏览链接文件，或无法显示插入的图片等)。

为了避免这些错误，正确地引用文件，我们需要学习一下HTML路径。

HTML有2种路径的写法：相对路径和绝对路径。

### HTML相对路径(Relative Path)
同一个目录的文件引用
如果源文件和引用文件在同一个目录里，直接写引用文件名即可。
我们现在建一个源文件info.html，在info.html里要引用index.html文件作为超链接。
假设info.html路径是：c:\Inetpub\wwwroot\sites\blabla\info.html
假设index.html路径是：c:\Inetpub\wwwroot\sites\blabla\index.html
在info.html加入index.html超链接的代码应该这样写：

    <a href = "index.html">index.html</a>

如何表示上级目录
../表示源文件所在目录的上一级目录，../../表示源文件所在目录的上上级目录，以此类推。

假设info.html路径是：c:\Inetpub\wwwroot\sites\blabla\info.html
假设index.html路径是：c:\Inetpub\wwwroot\sites\index.html
在info.html加入index.html超链接的代码应该这样写：

    <a href = "../index.html">index.html</a>

假设info.html路径是：c:\Inetpub\wwwroot\sites\blabla\info.html
假设index.html路径是：c:\Inetpub\wwwroot\index.html
在info.html加入index.html超链接的代码应该这样写：

    <a href = "../../index.html">index.html</a>

假设info.html路径是：c:\Inetpub\wwwroot\sites\blabla\info.html
假设index.html路径是：c:\Inetpub\wwwroot\sites\wowstory\index.html
在info.html加入index.html超链接的代码应该这样写：

    <a href = "../wowstory/index.html">index.html</a>

如何表示下级目录
引用下级目录的文件，直接写下级目录文件的路径即可。

假设info.html路径是：c:\Inetpub\wwwroot\sites\blabla\info.html
假设index.html路径是：c:\Inetpub\wwwroot\sites\blabla\html\index.html
在info.html加入index.html超链接的代码应该这样写：

    <a href = "html/index.html">index.html</a>

假设info.html路径是：c:\Inetpub\wwwroot\sites\blabla\info.html
假设index.html路径是：c:\Inetpub\wwwroot\sites\blabla\html\tutorials\index.html
在info.html加入index.html超链接的代码应该这样写：

    <a href = "html/tutorials/index.html">index.html</a>

### HTML绝对路径(Absolute Path)
HTML绝对路径(absolute path)指带域名的文件的完整路径。

假设你注册了域名www.jb51.NET，并申请了虚拟主机，你的虚拟主机提供商会给你一个目录，比如www，这个www就是你网站的根目录。

假设你在www根目录下放了一个文件index.html，这个文件的绝对路径就是： `http://www.jb51.Net/index.html`。

假设你在www根目录下建了一个目录叫html_tutorials，然后在该目录下放了一个文件index.html，这个文件的绝对路径就是`http://www.jb51.net/html_tutorials/index.html`。

## 二、引用外部.css或.js文件的路径问题

jsp或html页面引用外部.css或.js文件时，注意路径问题，如果设置不当，会引用不到这些外部的文件
假设使用下面的目录结构：
-webapp
|-MyProject  目录
 |--WebContent 目录
  |---scripts 目录
   ---dtree.js 文件
  |---styles 目录
   ---main.css 文件
  |---pages 目录
   ---test.jsp 文件

现在例如要在test.jsp中引用scripts目录下的dtree.js和styles目录下的main.css

有如下几种方法：

1.使用相对于jsp页面的相对路径

    <link type="text/css" rel="stylesheet" href="../styles/main.css" />
    <script type="text/javascript" src="../scripts/dtree.js"></script>

这样在页面用`http://localhost:8080/MyProject/test.jsp`访问test.jsp时就可以引用到dtree.js和main.css。

2.使用相对于Web工程的相对路径
对于1中的相对使用相对于于jsp页面的相对路径的这种方式，如果我们是设置action跳转到test.jsp页面，那么这种使用相对路径的方式就引用不到了。
例如我们当访问`http://localhost:8080/MyProject/main.do`的时候，页面跳转到test.jsp页面，如果使用方法1，就引用不到了。
这个时候我们可以使用相对于Web工程的相对路径来引用：

    <link type="text/css" rel="stylesheet" href="styles/main.css" />
    <script type="text/javascript" src="scripts/dtree.js"></script>

但是请注意：使用方法2这种方式引用，如果直接访问`http://localhost:8080/MyProject/test.jsp`，是引用不到的。

3.使用Web工程的绝对路径
方法1和方法2都有缺点，都只适用一种情况，有没有两种情况都适用的呢？答案肯定的！
我们使用绝对路径:

    <link type="text/css" rel="stylesheet" href="/MyProject/styles/main.css" />
    <script type="text/javascript" src="/MyProject/scripts/dtree.js"></script>

这样，不管是通过`http://localhost:8080/MyProject/main.do`跳转访问test.jsp还是直接访问`http://localhost:8080/MyProject/test.jsp`，都可以成功引用。

注意：如果我们在部署Web应用时，没有设置Context Root（一般情况下配置为工程名），也就是IP和端口后面不带应用名，如`http://localhost:8080/main.do`和`http://localhost:8080/test.jsp`，这种情况在引用时就不能带工程名了，应该这样：

    <link type="text/css" rel="stylesheet" href="/styles/main.css" />
    <script type="text/javascript" src="/scripts/dtree.js"></script>
