# 高质量的js代码

## 良好的编程习惯

### 如何避免js冲突

全局变量泛滥是一件非常可怕的事情，他就像一个黑暗中的杀手，不知道什么时候跳出来给你一个香吻，举个简单例子：

网页中需要功能A，程序猿甲为其写了一段 JavaScript 代码，代码清单如下：

    <script type="text/javascript">
        var a =123,b='hello js';
        ...
    </script>

这段代码运行很正常，维护也简单，但是后来网页有了新的需求，需要添加功能B，程序猿乙为其写了另一段代码，代码清单如下：

    <script type="text/javascript">
        var a,abc = 'abc';
        ...
    </script>

程序猿甲在脚本中定义了一个全局变量 a ，程序猿乙在不知情的情况下，在脚本中又定义了一个全局变量 a ，于是运行过程中，就会出现很大的问题。当代码量成千上百行的时候，将会给团队带来很大的麻烦。

如何避免这个隐患呢？

最简单，也最有效的方法就是用匿名函数将脚本包起来，让变量的作用域控制在匿名函数内:

```
<script type="text/javascript">
    (function(){}
        var a =123,b='hello js';
        ...
    })();
</script>
<div class="">
    ...
</div>
<script type="text/javascript">
    (function(){
        var a,abc = 'abc';
        ...
    })();
</script>
```

功能A和功能B是没有任何关联的，它们之间不需要任何的通信，现在又有了新的需求，需要在网页中增加功能C，而和功能B不同的是，功能C需要用到功能A中的 b 变量，最简单的方法是将功能C的代码写入到功能A的匿名函数中，但是不巧的是，处理功能C的是程序猿丙，

为了避免和功能A的代码中的变量冲突，他只有两种选择：1. 仔细阅读和理解功能A的代码，小心避开冲突。2. 不在功能A的匿名函数内写代码，自己写一个匿名函数。

    <script type="text/javascript">
        (function(){}
            var a =123,b='hello js';
            str = b ;
            ...
        })();
    </script>
    <div class="">
        .....
    </div>
    <script type="text/javascript">
        (function(){
            var a,abc = 'abc';
            ...
        })();
    </script>
    <script type="text/javascript">
        (function(){
            var a,b;
            b = str;
            ...
        })();
    </script>

功能A的代码复杂，程序猿丙更愿意自己写一个代码，于是问题来了，如何在功能C的匿名函数中访问功能A的匿名函数中的 b 变量呢？

于是我们可以在全局作用域下定义一个全局变量，让他作为一个桥梁，完成功能之间的通信，代码清单如下：

    <script type="text/javascript">
        var str;
    </script>
    <script type="text/javascript">
        (function(){}
            var a =123,b='hello js';
            str = b ;
            ...
        })();
    </script>
    <div class="">
        .....
    </div>
    <script type="text/javascript">
        (function(){
            var a,abc = 'abc';
            ...
        })();
    </script>
    <script type="text/javascript">
        (function(){
            var a,b;
            b = str;
            ...
        })();
    </script>

定义 str 的全局变量的方式还不够好，如果功能C还需要功能B中的 abc 呢？我们就需要新增另一个 str1 的全局变量，当不同函数之间的通信变量需要很多的时候，我们需要的全局变量就会增加很多，之前提到全局变量是需要严格控制的，而我们使用匿名函数的诉求就是避免全局变量引起的程序冲突，如果为了功能代码之间的通信而添加大量的全局变量就违背了我们的初衷。

我们要对全局变量进行改进，改进清单代码如下：

    <script type="text/javascript">
        var GLOBAL={};
    </script>
    <script type="text/javascript">
        (function(){}
            var a =123,b='hello js';
            GLOBAL.str1 = b ;
            ...
        })();
    </script>
    <div class="">
        .....
    </div>
    <script type="text/javascript">
        (function(){
            var a,abc = 'abc';
            GLOBAL.str2 = abc;
            ...
        })();
    </script>
    <script type="text/javascript">
        (function(){
            var a,b,c;
            b = GLOBAL.str1;
            c = GLOBAL.str2;
            ...
        })();
    </script>

使用普通变量作为全局变量方法的扩展性非常差，所以我们使用一个 {} 对象类型的变量作为全局变量，如果功能模块（功能匿名函数）之间需要多个变量来作为通信桥梁，可以讲这些变量都作为全局变量的属性，可以保证全局变量的数量足够多，同时全局变量尽量少，《编写高质量代码》作者阿当推荐使用 GLOBAL 作为全局变量的变量名。

使用 GLOBAL 作为全局变量还是存在一个隐患，当属性名命名过于简单的时候，还是可能被覆盖掉，当全局变量过多的时候，多个人同时开发各自的功能，如何解决这种冲突呢？难道每个工程师在使用 GLOBAL 变量的时候都要去查一遍它绑定了那些属性么？

当然不是，我们可以使用命名空间来解决这个问题，命名空间是一个特殊的前缀，我们可以给不同的功能模块分配一个命名空间，每个匿名函数中的 GLOBAL 对象的属性都不要直接挂在 GLOBAL 对象上，而是挂在该匿名函数下。

如果同一个匿名函数非常的复杂，变量非常的多，命名空间还可以再进一步的拓展，生成二级命名空间。

下面例子，其中 A、B、C 是功能模块匿名函数的命名空间 CAT、DOG等是拓展的二级命名空间，改进代码清单如下：

    <script type="text/javascript">
        var GLOBAL={};
    </script>
    <script type="text/javascript">
        (function(){}
            var a =123,b='hello js';
            GLOBAL.A.str = a;
            GLOBAL.A.CAT = {};
            GLOBAL.A.DOG = {};
            GLOBAL.A.CAT.name = '小花';
            GLOBAL.A.DOG.name = '旺财';
            GLOBAL.A.CAT.move = function(){

            };
            GLOBAL.A.DOG.move = function(){

            };
            ...
        })();
    </script>
    <div class="">
        .....
    </div>
    <script type="text/javascript">
        (function(){
            var a = 456 ,abc = 'abc';
            GLOBAL.B.str1 = a ;
            GLOBAL.B.str2 = abc;
            ...
        })();
    </script>
    <script type="text/javascript">
        (function(){
            var a,b,c;
            a = GLOBAL.B.str1;
            b = GLOBAL.A.str1;
            c = GLOBAL.B.str2;

            ...
        })();
    </script>

因为生成命名空间是非常常用的功能，我们可以进一步将命名空间的功能定义成一个函数，方便调用。我们给 GLOBAL 对象添加 namespace 方法，在需要命名空间的匿名函数中调用，完善一下代码，清单如下：

    <script type="text/javascript">
        var GLOBAL={};
        GLOBAL.namespace = function(str){
            var arr = str.split('.'),o = GLOBAL;
            for(i=(arr[0]='GLOBAL') ? 1:0;i<arr.length;i++){
                o[arr[i]] = o[arr[i]] || {};
                o = o[arr[i]];
            }
        }
    </script>
    <script type="text/javascript">
        (function(){}
            var a =123,b='hello js';
            GLOBAL.namespace("A.CAT");
            GLOBAL.namespace("A.DOG");
            GLOBAL.A.CAT.name = '小花';
            GLOBAL.A.DOG.name = '旺财';
            GLOBAL.A.CAT.move = function(){

            };
            GLOBAL.A.DOG.move = function(){

            };
            GLOBAL.A.str = a;
            ...
        })();
    </script>
    <div class="">
        .....
    </div>
    <script type="text/javascript">
        (function(){
            var a = 456 ,abc = 'abc';
            GLOBAL.namespace("B");
            GLOBAL.B.str1 = a ;
            GLOBAL.B.str2 = abc;
            ...
        })();
    </script>
    <script type="text/javascript">
        (function(){
            var a,b,c;
            a = GLOBAL.B.str1;
            b = GLOBAL.A.str1;
            c = GLOBAL.B.str2;

            ...
        })();
    </script>

代码冲突的问题已经很好的解决了，但是这段代码可维护性并不强，如果现在需要程序猿甲去修改功能B和功能C，当他接到任务后会很头疼，页面中有另外两段匿名函数，他不得不花大量时间去阅读和猜测它们的功能，很快他发现有的代码很难理解，希望从编写这段代码的程序猿这儿得到代码，很遗憾的是现在的代码中找不到该程序猿的信息。

为了改善这种现状，我们需要给代码添加适当的注释，以提高代码的可维护性。给每段代码添加的注释信息包括：功能说明、工程师信息、工程师的联系方式以及代码的最后修改时间。最后的代码清单如下：

    <script type="text/javascript">
        var GLOBAL={};
        GLOBAL.namespace = function(str){
            var arr = str.split('.'),o = GLOBAL;
            for(i=(arr[0]='GLOBAL') ? 1:0;i<arr.length;i++){
                o[arr[i]] = o[arr[i]] || {};
                o = o[arr[i]];
            }
        }
    </script>
    <script type="text/javascript">
        //==============================
        //    功能A
        //    工程师甲
        //    email:xxxxx@xx.com call:xxx-xxxx-xxxx
        //    2017-02-16
        //==============================
        (function(){}
            var a =123,b='hello js';
            GLOBAL.A.str = a;
            GLOBAL.A.CAT = {};
            GLOBAL.A.DOG = {};
            GLOBAL.A.CAT.name = '小花';
            GLOBAL.A.DOG.name = '旺财';
            GLOBAL.A.CAT.move = function(){

            };
            GLOBAL.A.DOG.move = function(){

            };
            ...
        })();
    </script>
    <div class="">
        .....
    </div>
    <script type="text/javascript">
        //==============================
        //    功能B
        //    工程师乙
        //    email:xxxxx@xx.com call:xxx-xxxx-xxxx
        //    2017-02-16
        //==============================
        (function(){
            var a = 456 ,abc = 'abc';
            GLOBAL.namespace("B");
            GLOBAL.B.str1 = a ;
            GLOBAL.B.str2 = abc;
            ...
        })();
    </script>
    <script type="text/javascript">
        //==============================
        //    功能C
        //    工程师丙
        //    email:xxxxx@xx.com call:xxx-xxxx-xxxx
        //    2017-02-16
        //==============================
        (function(){
            var a,b,c;
            a = GLOBAL.B.str1;
            b = GLOBAL.A.str1;
            c = GLOBAL.B.str2;

            ...
        })();
    </script>

添加必要的注释，可以大大提高代码的可维护性，对团队合作来说非常重要。

### 给程序个统一的接口

JavaScript 是脚本语言，浏览器下载到那儿就执行到哪儿，这一特性会给编程带来方便，但也容易使程序支离破碎，过于零散。上节的最终代码清单就存在这样的问题：功能A、B、C 分别放在不同的 script 标签内，整个页面没有统一的程序“入口”，我们的例子只涉及3段功能代码，似乎问题还不大，但如果功能非常多，script 标签零散分布在网页内，下载立即执行，就像打游击，各自运行没有问题，虽然能发挥作用，但是纪律性就没有保证。

为了解决这个问题，首先需要从功能上对脚本进行职能划分，从功能上 script 应该分为两大部分：框架部分和应用部分。框架部分主要提供对代码的组织作用，包括定义全局变量和定义命名空间等方法，它和具体应用无关，所以框架部分在每个页面都应该相同；应用部分是提供的页面的功能逻辑，不同页面会有不同的功能，那么不同页面的应用部分代码也不尽相同。

对于应用部分，我们应该将应用部分的代码组织起来，给他们一个统一的“入口”，定义一个 init 函数，所有应用部分的代码都集中到 init 函数中来了，所有的初始化工作都在这里，它便是一个网页的程序“入口”，接下来我们需要在适当的时候调用这个程序入口 init ，完成程序的初始化。

    <div class="">
        <section>
            <h1></h1>
            <p></p>
        </section>
    </div>
    <script type="text/javascript">
    function init(){
        //==============================
        //    功能A
        //    工程师甲
        //    email:xxxxx@xx.com call:xxx-xxxx-xxxx
        //    2017-02-16
        //==============================
        (function(){}
            var a =123,b='hello js';
            GLOBAL.A.str = a;
            GLOBAL.A.CAT = {};
            GLOBAL.A.DOG = {};
            GLOBAL.A.CAT.name = '小花';
            GLOBAL.A.DOG.name = '旺财';
            GLOBAL.A.CAT.move = function(){

            };
            GLOBAL.A.DOG.move = function(){

            };
            ...
        })();
        //==============================
        //    功能B
        //    工程师乙
        //    email:xxxxx@xx.com call:xxx-xxxx-xxxx
        //    2017-02-16
        //==============================
        (function(){
            var a = 456 ,abc = 'abc';
            GLOBAL.namespace("B");
            GLOBAL.B.str1 = a ;
            GLOBAL.B.str2 = abc;
            ...
        })();
        //==============================
        //    功能C
        //    工程师丙
        //    email:xxxxx@xx.com call:xxx-xxxx-xxxx
        //    2017-02-16
        //==============================
        (function(){
            var a,b,c;
            a = GLOBAL.B.str1;
            b = GLOBAL.A.str1;
            c = GLOBAL.B.str2;

            ...
        })();
    }
    </script>

什么时候最合适？首先我们要知道的是：JavaScript 是脚本语言，加载到那儿就执行到哪儿，如果操作某个 DOM 节点，而该 DOM 节点还没有被载入，程序就会报错。但我们希望能够程序能够无视其位置，无视是否在相应节点之后，我们该如何操作呢？

这儿有三个方法：
1. 可以监听 window 对象的 onload 事件；
2. 使用很多 JS 框架提供的 DOMReady 事件；
3. 将 init 函数放到 `</body>` 标签的前面；

监听 window 对象的 onload 事件，代码并不会马上执行，而是要等到 window 在网页加载完成所有的元素后触发 onload 事件，此时所有的 DOM 节点已经生成完成。

window 对象的 onload 事件是要求所有的网页元素加载完成后才会触发，但如果网页内的图片或视频、音频等富媒体内容非常多的时候，网页就会加载时间会非常长，那么我们的初始化函数就会延迟很长的时间执行，为了解决这个问题，很多 JS 框架提供了 DOMReady 事件代替 window 的 onload 事件，DOMReady 事件和 onload 事件作用非常相似，但是和 onload 事件不同的是 DOMReady 只判断页面内的 DOM 节点是否已经全部生成完成，至于内容节点是否加载完成，它并不关心。所以 DOMReady 的触发速度比 onload 的触发速度更快，所以 DOMReady 比 onload 更适合用来调用初始化函数。

值得注意的是 DOMReady 并不是原生的 JavaScript 支持的事件，当然如果我们不使用 JS 框架我们也可以自己模拟 DOMReady 事件，但 DOMReady 触发的原理非常复杂，不同的浏览器原理也不相同，我们也可以绕开 DOMReady 事件 使用一个简单的方法来达到相似的功能，就是将 init 初始化函数放到页面的最后面，即 `</body>` 的前面。


对于框架部分，思路非常的清晰：首先定义一个全局作用域的变量 GLOBAL 对象，然后绑定定义命名空间函数方法 namespace ，还可以将需要的别的全局函数挂到 GLOBAL 对象下。

在实际工作当中，网站的头部和尾部通常会做成单独的文件，用服务器端语言 include 到网页中，所以我们的网页通常分为三个文件：头部文件、尾部文件和主题文件。

所以一个网页优化的代码清单如下：

头部文件的形式大致如下代码清单：

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
        <link rel="stylesheet" href="xxxx.css">
        <style media="screen">
        body{margin: 0;padding: 0;}
        ...{...}
        </style>
    </head>
    <body>
        <header></header>
        <script type="text/javascript">
            var GLOBAL={};
            GLOBAL.namespace = function(str){
                var arr = str.split('.'),o = GLOBAL;
                for(i=(arr[0]='GLOBAL') ? 1:0;i<arr.length;i++){
                    o[arr[i]] = o[arr[i]] || {};
                    o = o[arr[i]];
                }
            }
        </script>

尾部文件的形式大致如下代码清单：

    <footer></footer>
    <script type="text/javascript">
        init();
    </script>
    </body>
    </html>

主体文件的形式大致如下代码清单：

    <div>...</div>
    <script type="text/javascript">
        function init(){
            ...
            //应用部分逻辑函数
        }
    </script>

一般来说头部文件和尾部文件是非常稳定的，全站公用统一的头尾，主体文件是各不相同的，但有的页面并不需要 JS 应用，所以在主体文件内部可能并没有 init 函数，那么尾部文件的 init 函数就会报错，优化如下：

    <footer></footer>
    <script type="text/javascript">
        if (init) {
            init();
        }
    </script>
    </body>
    </html>

### css放头部，JS放尾部

为了不阻塞css的加载，JS 代码应该放到CSS代码的后面，一般放在页面的尾部文件。

    <style type="text/css">
        body{}
    </style>
    <div>....</div>
    <!-- 非常多的代码 -->
    <script type="text/javascript">
        window.onload = function(){
            // 非常多的代码
            ...
        }
    </script>

### JS 代码压缩
为了缩小网页文件的大小，缩短网页的加载时间，在正式发布 JavaScript 之前，我们可以先对其进行压缩，通常做法是去掉空行和换行、去掉注释，将复杂的变量名替换成简单的变量名。压缩之后的文件确实变小了，但是影响了代码的可读性，对维护不利，我们应该对压缩之前的代码进行备份以备不时之需。


## javascript 分层和 javascript 库

### javascript 分层

分层可以让我们的代码组织条理更加的清晰，减少，提高代码重用率。需要说明的是如何分层是一件主观的事情，没有对错，只有好坏，这儿是分层建议：

一般分为三层，从下往上是 base 层、common 层、page 层。

**base 层**

位于三层的底端，功能是给 common 层和 page 层提供接口，有两个职责：
1. 封装不同浏览器下 JavaScript 的差异，提供统一的接口，依靠它来完成浏览器兼容；
2. 扩展 JavaScript 语言底层提供的接口，提供更多的易用接口。

**common 层**

位于三层的中间，功能是给 page 层提供组件。依赖于 base 层提供的接口，提供可重复使用的组件，它是典型的 MVC 模式中的 M，和页面内的具体功能没有关系。

**page 层**

位于三层的顶端，功能是完成页面内的功能需求。这一层跟页面内的具体功能需求相关，是 MVC 模式中的C，依赖于 base 层和 commom 层。
