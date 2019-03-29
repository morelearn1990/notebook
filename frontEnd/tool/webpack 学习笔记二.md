# webpack 学习笔记二

## loader 概念引入

webpack 第一理念为：一切皆模板 ，然而 webpack 只能处理 javascript 模块，那它是如何处理 “一切皆模块” 的呢？

这儿就需要引入 loader 的概念，webpack 通过对应的 loader 处理对应的模块，举个简单例子，我们可以通过 css-loader|style-loader 处理 CSS 文件，通过 file-loader|url-loader 处理图片或者文件。

以下是概念（复制的，咳咳~~~）

Loader可以理解为是模块和资源的转换器，它本身是一个函数，接受源文件作为参数，返回转换的结果。这样，我们就可以通过require来加载任何类型的模块或文件，比如VUE、JSX、SASS 或图片。

先来看看 loader 有哪些特性？(网上复制的，咳咳咳咳~~~~。[地址](http://blog.guowenfh.com/2016/03/24/vue-webpack-02-deploy/))

+ Loader可以通过管道方式链式调用，每个loader可以把资源转换成任意格式并传递给下一个loader，但是最后一个loader必须返回JavaScript。
+ Loader可以同步或异步执行。
+ Loader运行在node.js环境中，所以可以做任何可能的事情。
+ Loader可以接受参数，以此来传递配置项给loader。
+ Loader可以通过文件扩展名（或正则表达式）绑定给不同类型的文件。
+ Loader可以通过npm发布和安装。
+ 除了通过package.json的main指定，通常的模块也可以导出一个loader来使用。
+ Loader可以访问配置。
+ 插件可以让loader拥有更多特性。
+ Loader可以分发出附加的任意文件。

## css-loader|style-loader

进入项目目录安装 css-loader|style-loader 

```
npm install css-loader style-loader --save-dev
```
安装成功后

