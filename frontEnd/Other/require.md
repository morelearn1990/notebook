# 1. 网页文件写法

    <script type="text/javascript" src="require.js" data-main='main'></script>


# 2. main.js 主模块的写法

    require(['moduleA', 'moduleB', 'moduleC'], function (moduleA, moduleB, moduleC){
　　　　// some code here
　　});

`moduleA,moduleB,moduleC` 是 main 主模块依赖的的模块，如果在模块里面需要依赖其他的模块也这样写，同时在主模块里面不用再次加载。


## 2.1 加载模块有几种方式：
1. 加载本地且 js 文件名和导入的模块同名 a.js 这类的,如下：

    require(['a'])

2. 加载本地的带后缀如 min 等的 js 文件或网络地址上的 js 文件，需要添加 require.config 方法的 paths 信息，例如加载本地压缩 jquery-1.11.2.min.js 方式如下：

    require.config({
        //当模块目录和 require 不在同一个目录可以改变基目录（baseUrl）
        //baseUrl: "js/lib",
        paths:{
            //本地同目录的 压缩 jquery
            jquery:'jquery-1.11.2.min',
            //本地非同目录的 jquery 方法/如果改变了基目录，使用上面的方式。
            jquery:'lib/jquery-1.11.2.min',
            //网络地址或另外一个主机/服务器的 js 文件
            jquery:"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
        }
    });

3. 加载非规范的模块，上面的方法均是加载规范的模块。这样的模块在用require()加载之前，要先用require.config()方法，定义它们的shim属性（shim属性专门用来配置不兼容的模块）。具体来说，每个模块要定义：
    1. exports值（输出的变量名），表明这个模块外部调用时的名称；
    2. deps数组，表明该模块的依赖性。

加载非CMD规范的文件：

```require.config({
　　　　shim: {
　　　　　　'underscore':{
　　　　　　　　exports: '_'
　　　　　　},
　　　　　　'backbone': {
　　　　　　　　deps: ['underscore', 'jquery'],
　　　　　　　　exports: 'Backbone'
　　　　　　}
　　　　}
　　});```

加载 jQuery 插件 scroll 的方法

    require.config({
        shim: {
            'jquery.scroll': {
                deps: ['jquery'],
                exports: 'jQuery.fn.scroll'
            }
        }
    });
