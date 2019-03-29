# css 规则

## at-rule

由 **_@关键字_** 和后续代码块组成，如果没有区块则以分号结束。

### @charset

提示解析 css 文件的字符集，放在 css 文件最前面。

```
@charset "utf-8";
```

### @import

用于引入一个 css 文件，除了 `@charset` 规则以外，引入 css 文件全部内容。还支持 supports 和 media 的形式。

```
@import "mystyle.css";
@import url("mystyle.css");
```

### @media

媒体查询规则，对设备类型和参数进行判断，在 media 区块内是普通规则。

```
@media print {
    body{
        fontSize: 20px;
    }
}
@media screen and (max-width:992px){
    body{
        fontSize: 16px;
    }
}
```

### @page

用于分页媒体访问网页时的表现设置，页面是一种特殊的盒模型结构，除了页面本身，还可以设置它周围的盒。

```
@page {
  size: 8.5in 11in;
  margin: 10%;

  @top-left {
    content: "Hamlet";
  }
  @top-right {
    content: "Page " counter(page);
  }
}
```

### @counter-style

counter-style 产生一种数据用于定义列表项的表现。

```
@counter-style triangle {
  system: cyclic;
  symbols: ‣;
  suffix: " ";
}
```

### @key-frames

key-frames 用于定义动画关键帧。

```
@keyframes diagonal-slide {
  from {
    left: 0;
    top: 0;
  }

  to {
    left: 100px;
    top: 100px;
  }
}
```

### @fontface

fontface 用于定义字体

```
@font-face {
  font-family: Gentium;
  src: url(http://example.com/fonts/Gentium.woff);
}

p { font-family: Gentium, serif; }

```

### @supports

supports 检查环境的特性，于 media 比较类似。

```
@supports ( display: flexbox ) {
  body, #navigation, #content { display: flexbox; }
  #navigation { background: blue; color: white; }
  #article { background: white; color: black; }
}
```

### @namespace

用于跟 xml 命名空间配合的一个规则，表示内部的 css 选择器都带上特定的命名空间。

### @viewport

用于设置视口的一些特性，不够兼容性不好，多数时候被 HTML 的 meta 代替。

### 其他

@color-profile SVG1.0 引入的特性

@document css4

@font-feature-values

## qualified rule
