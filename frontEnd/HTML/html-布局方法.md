# HTML布局

以下是一个简单布局方案

    <style media="screen" type="text/css">
        html,body{width: 90%;height: 90%;}
        header{width: 100%;height: 10%;background-color: rgb(1, 177, 215);}
        footer{width: 100%;height: 10%;background-color: rgb(1, 177, 215); clear: both;}
        .sidebar{width: 29%;height: 70%;margin: 1% 0;float: left; background-color: rgb(1, 177, 215);}
        .mian{width: 69%;height: 70%;margin: 1% 0;float: right; background-color: rgb(1, 177, 215);}
    </style>
    <header></header>
    <div class="mian"></div>
    <div class="sidebar"></div>
    <footer></footer>

注意事项：
1. 主要内容 main 要在次要内容 sidebar 的前面，以便在加载的时候 main 先显示出来，给出良好的网页体验。
2. 当布局变更的时候则需要重新对布局的 HTML 标签或 CSS 样式进行调整，当设计图不断的变更的时候，修改的工作量和成本会更加的显著。

通过学习《编写高质量代码--web前端开发修炼之道》可以知道我们可以通过两种比较不错的方案来优化布局方案，让代码尽量的精简、重(cong)用、易扩展、易维护。该两种方案为组合类和子选择器，下面进行一一讲解：

## 组合类布局方法

例子

    <style media="screen" type="text/css">
        html,body{width: 90%;height: 90%;}
        header{width: 100%;height: 10%;background-color: rgb(1, 177, 215);}
        footer{width: 100%;height: 10%;background-color: rgb(1, 177, 215);}
        .content{width: 100%;height: 40%;}
        .fl{float: left;}.fr{float: right;}.cb{clear: both;}
        .w25{width: 25%;}.w70{width: 70%;}
        .w35{width: 35%;}.w60{width: 60%;}
        .m1{margin: 1% 0;}
        .main{height: 100%;background-color: rgb(1, 177, 215);}
        .sidebar{height: 100%;background-color: rgb(1, 177, 215);}
    </style>
    <header></header>
    <div class="content">
        <div class="fr m1 w70 main"></div>
        <div class="fl m1 w25 sidebar"></div>
    </div>
    <div class="content">
        <div class="fl m1 w60 main"></div>
        <div class="fr m1 w35 sidebar"></div>
    </div>
    <footer class="cb"></footer>

使用要点：
1. 多用组合 (bootstrap) 这样的 css 组件使用这种方法来构建库；
2. 将经常变化的属性提取出来单独设定一个类，用类的组合来实现最终样式，例子中将 float width 等属性提取出来；
优点：
1. 提高了类的重(cong)用性，增加灵活性，轻便
缺点：
1. 如果要修改的话，必须要成对的修改，比如必须要同时修改 main sidebar 的 float 属性。


## 子选择器布局方法

例子

    <style media="screen" type="text/css">
        html,body{width: 90%;height: 90%;}
        header{width: 100%;height: 10%;background-color: rgb(1, 177, 215);}
        footer{width: 100%;height: 10%;background-color: rgb(1, 177, 215); clear: both;}
        .content{width: 100%;height: 40%;clear: both;margin: 1% 0;}
        .content-lr-7025 .main{float: left;width: 70%}
        .content-lr-7025 .sidebar{float: right;width: 25%}
        .content-rl-7025 .main{float: right;width: 70%}
        .content-rl-7025 .sidebar{float: left;width: 25%}
        .content-lr-6035 .main{float: left;width: 60%}
        .content-lr-6035 .sidebar{float: right;width: 35%}
        .content-rl-6035 .main{float: right;width: 60%}
        .content-rl-6035 .sidebar{float: left;width: 35%}
        .main{height: 100%;background-color: rgb(1, 177, 215);}
        .sidebar{height: 100%;background-color: rgb(1, 177, 215);}
    </style>
    <header></header>
    <div class="content content-rl-7025">
        <div class="main"></div>
        <div class="sidebar"></div>
    </div>
    <div class="content content-lr-6035">
        <div class="main"></div>
        <div class="sidebar"></div>
    </div>
    <footer class=""></footer>

使用要点：
1. 可以削弱 main 和 sidebar 作为样式挂钩的能力，单独的 main 和 sidebar 可以作为一个抽象类，定义一些公共的样式；
2. 用于布局的浮动和宽度属性由他们的衍生类 .content-xx-xxxx .main 和 .content-xx-xxxx .sidebar 来提供，由此一来样式的控制由一层拆分成两层， main 和 sidebar 的责任削弱了，可以专注于自己的位置和自己内部的样式；
3. 当然使用者也可以使用 layout-xxxx-xx 的形式；
4. 可以站在全局的角度严格控制，统一的接口和格式，一般网站的 main 和 sidebar 的宽度是严格控制的，大概就那么几种，对于布局来说 阿当(《编写高质量代码》作者) 推荐使用子选择器的方式布局。
优点：
1.比组合类方式提供更加方便快捷的修改
缺点：
1.由于是通过大量设置预设的修改方案，所以不够轻便
