# 2 文档对象模型 (DOM)  

DOM 是 W3C（万维网联盟）的标准。  
DOM 定义了访问 HTML 和 XML 文档的标准：  
“W3C 文档对象模型 （DOM） 是中立于平台和语言的接口，它允许程序和脚本动态地访问和更新文档的内容、结构和样式。”  
W3C DOM 标准被分为 3 个不同的部分：  
>核心 DOM - 针对任何结构化文档的标准模型  
>XML DOM - 针对 XML 文档的标准模型  
>HTML DOM - 针对 HTML 文档的标准模型  

编者注：DOM 是 Document Object Model（文档对象模型）的缩写。  

XML DOM 定义了所有 XML 元素的对象和属性，以及访问它们的方法。  

HTML DOM 定义了 `HTML 的标准对象模型` `HTML 的标准编程接口`,HTML DOM 定义了所有 HTML 元素的对象和属性，以及访问它们的方法。换言之，HTML DOM 是关于如何获取、修改、添加或删除 HTML 元素的标准。  

## 2.1 DOM 节点  

根据 W3C 的 HTML DOM 标准，HTML 文档中的所有内容都是节点：  
>整个文档是一个文档节点  
>每个 HTML 元素是元素节点  
>HTML 元素内的文本是文本节点  
>每个 HTML 属性是属性节点  
>注释是注释节点  

### 2.1.1 节点属性  
在文档对象模型 (DOM) 中，每个节点都是一个对象。DOM 节点有三个重要的属性 ：  

属性 | 解释  
----|----  
nodeName | 节点的名称  
nodeValue | 节点的值  
nodeType | 节点的类型  

>一、nodeName 属性: 节点的名称，是只读的。  
1. 元素节点的 nodeName 与标签名相同  
2. 属性节点的 nodeName 是属性的名称  
3. 文本节点的 nodeName 永远是 <font color=green>#text</font>  
4. 文档节点的 nodeName 永远是 <font color=green>#document</font>  

>二、nodeValue 属性：节点的值  
1. 元素节点的 nodeValue 是 undefined 或 null  
2. 文本节点的 nodeValue 是文本自身  
3. 属性节点的 nodeValue 是属性的值  

>三、nodeType 属性: 节点的类型，是只读的。以下常用的几种结点类型:  

>元素类型  |  节点类型  
--------|---------  
  元素   |      1  
  属性   |      2  
  文本   |      3  
  注释   |      8  
  文档   |      9  

### 2.1.2 DOM树  

DOM 将HTML文档呈现为带有元素、属性和文本的树结构（节点树）  

![DOM结构树](./image/domtree.jpg "DOM")  

HTML文档可以说由节点构成的集合，三种常见的DOM节点:  
以`<a href="http://www.imooc.com">JavaScript DOM</a>`为例：  
1. 元素节点：上图中`<html>`、`<body>`、`<p>`等都是元素节点，即标签。  
2. 文本节点:向用户展示的内容，如`<li>...</li>`中的JavaScript、DOM、CSS等文本。  
3. 属性节点:元素属性，如`<a>`标签的链接属性href="http://www.imooc.com"。  

### 2.1.3 节点父、子和同胞  

节点树中的节点彼此拥有层级关系。  
1. 父节点(parent node)：父节点拥有任意数量的子节点  
2. 子节点(child node)：子节点只能拥有一个父节点  
3. 兄弟节点(sibling node)：拥有相同父节点的同级节点  
4. 根节点(root node)：一个HTML文档一般只有一个根节点，根节点没有父亲节点，是最上层的节点。  

>祖先节点：包含子节点的节点都可以叫做祖先节点，其中包括了父节点。  
>后代节点：一个节点内包含的所有节点，叫做后代节点，其中包括了子节点。  

如下图：  
![DOM.navigator](./image/dom_navigate.jpg)  

### 2.1.4 DOM节点方法  
方法是我们可以在节点（HTML 元素）上执行的动作。  
编程接口:  
>可通过 JavaScript （以及其他编程语言）对 HTML DOM 进行访问。  
>所有 HTML 元素被定义为对象，而编程接口则是对象方法和对象属性。  
>方法是您能够执行的动作（比如添加或修改元素）。  
>属性是您能够获取或设置的值（比如节点的名称或内容）。  

遍历DOM节点获取node属性  

方法|说明  
---:|---  
childNodes|返回一个数组，这个数组由给定元素节点的子节点构成  
firstChild|返回第一个子节点  
lastChild|返回最后一个子节点  
parentNode|返回给定节点的父节点  
nextSibling|返回给定节点的下一个节点  
previousSibling|返回给定节点的上一个节点  

DOM节点操作 对象 --- 方法和属性  

方法|说明  
---:|---  
getElementById()|返回带有指定 ID 的元素。  
getElementsByTagName()|返回包含带有指定标签名称的所有元素的节点列表（集合/节点数组）。  
getElementsByClassName()|返回包含带有指定类名的所有元素的节点列表（集合/节点数组）。
element.querySelector()|返回匹配指定 CSS 选择器元素的第一个子元素
document.querySelectorAll()|返回匹配指定 CSS 选择器元素的所有子元素节点列表 
appendChild()|把新的子节点添加到指定节点。  
removeChild()|删除子节点。  
replaceChild()|替换子节点。  
insertBefore()|在指定的子节点前面插入新的子节点。  
createAttribute()|创建属性节点。  
createElement()|创建元素节点。  
createTextNode()|创建文本节点。  
getAttribute()|返回指定的属性值。  
setAttribute()|把指定属性设置或修改为指定的值。  

## 2.2 DOM Element（HTML元素对象）  

在 HTML DOM 中，Element 对象表示 HTML 元素。  
Element 对象可以拥有类型为元素节点、文本节点、注释节点的子节点。  
NodeList 对象表示节点列表，比如 HTML 元素的子节点集合。  
元素也可以拥有属性，属性是属性节点  

可以在[HTML DOM Element 对象](http://www.w3school.com.cn/jsref/dom_obj_all.asp) 或 [HTML DOM 元素对象](http://www.runoob.com/jsref/dom-obj-all.html) 查看具体用法  

方法|描述  
---:|---  
<font color=green>元素节点方法</font>|描述  
element.hasChildNodes()|如果元素拥有子节点，则返回 true，否则 false。  
element.appendChild()|向元素添加新的子节点，作为最后一个子节点。  
element.insertBefore()|在指定的已有的子节点之前插入新节点。  
element.cloneNode()|克隆元素(节点)。  
element.isEqualNode()|检查两个元素是否相等。  
element.removeChild()|从元素中移除子节点。  
element.replaceChild()|替换元素中的子节点。  
element.isSameNode()|检查两个元素是否是相同的节点。  
nodelist.item()|返回 NodeList 中位于指定下标的节点。  
<font color=green>属性节点方法</font>|描述  
element.hasAttribute()|如果元素拥有指定属性，则返回true，否则返回 false。  
element.hasAttributes()|如果元素拥有属性，则返回 true，否则返回 false。  
element.getAttribute()|返回元素节点的指定属性值。  
element.getAttributeNode()|返回指定的属性节点。  
element.removeAttribute()|从元素中移除指定属性。  
element.removeAttributeNode()|移除指定的属性节点，并返回被移除的节点。  
element.setAttributeNode()|设置或更改指定属性节点。  
element.setAttribute()|把指定属性设置或更改为指定值。  
<font color=green>未分类方法</font>|描述  
element.compagreenocumentPosition()|比较两个元素的文档位置。  
element.setUserData()|把对象关联到元素上的键。  
element.getUserData()|返回关联元素上键的对象。  
element.getFeature()|返回实现了指定特性的 API 的某个对象。  
element.isSupported()|如果元素支持指定特性，则返回 true。  
element.isDefaultNamespace()|如果指定的 namespaceURI 是默认的，则返回 true，否则返回 false。  
element.normalize()|合并元素中相邻的文本节点，并移除空的文本节点。  
element.toString()|把元素转换为字符串。  
element.getElementsByTagName()|返回拥有指定标签名的所有子元素的集合。  
**属性**| **描述**  
<font color=green>元素节点属性</font>|描述  
element.childNodes|返回元素子节点的 NodeList。  
element.firstChild|返回元素的首个子。  
element.lastChild|返回元素的最后一个子元素。  
element.previousSibling|返回位于相同节点树层级的前一个元素。  
element.nextSibling|返回位于相同节点树层级的下一个节点。  
element.nodeName|返回元素的名称。  
element.nodeType|返回元素的节点类型。  
element.nodeValue|设置或返回元素值。  
element.parentNode|返回元素的父节点。  
nodelist.length|返回 NodeList 中的节点数。  
<font color=green>属性节点属性</font>|描述  
element.attributes|返回元素属性的 NamedNodeMap。  
element.id|设置或返回元素的 id。  
element.className|设置或返回元素的 class 属性。  
element.tagName|返回元素的标签名。  
element.title|设置或返回元素的 title 属性。  
element.style|设置或返回元素的 style 属性。  
element.innerHTML|设置或返回元素的内容。  
element.dir|设置或返回元素的文本方向。  
element.contentEditable|设置或返回元素的文本方向。  
element.isContentEditable|设置或返回元素的内容。  
element.accessKey|设置或返回元素的快捷键。  
element.tabIndex|设置或返回元素的 tab 键控制次序。  
element.textContent|设置或返回节点及其后代的文本内容。  
<font color=green>文档节点属性</font>|描述  
element.lang|设置或返回元素的语言代码。  
element.namespaceURI|返回元素的 namespace URI。  
element.ownerDocument|返回元素的根元素（文档对象）。  
element.clientHeight|返回元素的可见高度。  
element.clientWidth|返回元素的可见宽度。  
element.offsetHeight|返回元素的高度。  
element.offsetWidth|返回元素的宽度。    
element.offsetLeft|返回元素的水平偏移位置。  
element.offsetTop|返回元素的垂直偏移位置。  
element.offsetParent|返回元素的偏移容器。  
element.scrollWidth|返回元素的整体宽度。  
element.scrollHeight|返回元素的整体高度。  
element.scrollLeft|返回元素左边缘与视图之间的距离。
element.scrollTop|返回元素上边缘与视图之间的距离。  

## 2.3 DOM Attr (属性对象)  

在 HTML DOM 中，Attribute 对象表示 HTML 属性。  
HTML 属性始终属于 HTML 元素。  
NamedNodeMap 对象  
在 HTML DOM 中，NamedNodeMap 对象表示元素属性节点的无序集合。  
NamedNodeMap 中的节点可通过名称或索引（数字）来访问。  
><font color=green>可以通过元素节点的attributes属性获得 NamedNodeMap</font>  

Attr 属性对象的属性和方法  

属性和方法|描述  
---:|---  
attr.isId|如果属性是 id 类型，则返回 true，否则返回 false。  
attr.name|返回属性的名称。  
attr.value|设置或返回属性的值。  
attr.specified|如果已指定属性，则返回 true，否则返回 false。  
nodemap.getNamedItem()|从 NamedNodeMap 返回指定的属性节点。  
nodemap.item()|返回 NamedNodeMap 中位于指定下标的节点。  
nodemap.length|返回 NamedNodeMap 中的节点数。  
nodemap.removeNamedItem()|移除指定的属性节点。  
nodemap.setNamedItem()|设置指定的属性节点（通过名称）。  

<font color=red>DOM 4 警告！</font>  
在 W3C DOM Core 中，Attr (attribute) 对象从 Node 对象继承所有属性和方法。  
在 DOM 4 中，Attr 对象不再从 Node 继承，为了保证未来的代码安全，您应该避免在属性对象上使用节点对象的属性和方法  

## 2.4 DOM Event (事件对象)  

### 2.4.1 Event 概念  
**Event(事件) 对象**  
HTML DOM 事件允许Javascript在HTML文档元素中注册不同事件处理程序。  
Event 对象代表事件的状态，比如事件在其中发生的元素、键盘按键的状态、鼠标的位置、鼠标按钮的状态。  
事件通常与函数结合使用，函数不会在事件发生前被执行！  

**事件句柄　(Event Handlers)**  
HTML 4.0 的新特性之一是能够使 HTML 事件触发浏览器中的行为，比如当用户点击某个 HTML 元素时启动一段 JavaScript。下面是一个属性列表，可将之插入 HTML 标签以定义事件的行为。  

**事件模型**  
在javascript中添加事件监听函数有多种方法，它们在作用域，事件传播等方面都有区别，这个区别就是DOM事件模型的区别，具体可以到[DOM事件模型解析.md]()查看。  

### 2.4.2 DOM Event 事件列表  
DOM： 指明使用的 DOM 属性级别。  
具体可以到[HTML DOM 事件](http://www.runoob.com/jsref/dom-obj-event.html)查看详细内容  

#### 2.4.2.1 鼠标事件  

属性|描述|DOM  
---|---|---  
onclick|当用户点击某个对象时调用的事件句柄。|2  
oncontextmenu|在用户点击鼠标右键打开上下文菜单时触发|  
ondblclick|当用户双击某个对象时调用的事件句柄。|2  
onmousedown|鼠标按钮被按下。|2  
onmouseenter|当鼠标指针移动到元素上时触发。|2  
onmouseleave|当鼠标指针移出元素时触发|2  
onmousemove|鼠标被移动。|2  
onmouseover|鼠标移到某元素之上。|2  
onmouseout|鼠标从某元素移开。|2  
onmouseup|鼠标按键被松开。|2  

#### 2.4.2.2 键盘事件  

属性|描述|DOM  
---|---|---  
onkeydown|某个键盘按键被按下。|2  
onkeypress|某个键盘按键被按下并松开。|2  
onkeyup|某个键盘按键被松开。|2  

#### 2.4.2.3 框架/对象（Frame/Object）事件  

属性|描述|DOM  
---|---|---  
onabort|图像的加载被中断。|2  
onbeforeunload|该事件在即将离开页面（刷新或关闭）时触发|2  
onerror|在加载文档或图像时发生错误。 ( `<object>`, `<body>`和 `<frameset>`)  
onhashchange|该事件在当前 URL 的锚部分发生修改时触发。  
onload|一张页面或一幅图像完成加载。|2  
onpageshow|该事件在用户访问页面时触发  
onpagehide|该事件在用户离开当前网页跳转到另外一个页面时触发  
onresize|窗口或框架被重新调整大小。|2  
onscroll|当文档被滚动时发生的事件。|2  
onunload|用户退出页面。 ( `<body>` 和 `<frameset>`)|2  

#### 2.4.2.4 表单事件  

属性|描述|DOM  
---|---|---  
onblur|元素失去焦点时触发|2  
onchange|该事件在表单元素的内容改变时触发( `<input>`, `<keygen>`,` <select>`, 和 `<textarea>`)|2  
onfocus|元素获取焦点时触发|2  
onfocusin|元素即将获取焦点时触发|2  
onfocusout|元素即将失去焦点时触发|2  
oninput|元素获取用户输入时触发|3  
onreset|表单重置时触发|2  
onsearch|用户向搜索域输入文本时触发 ( `<input="search">`)  
onselect|用户选取文本时触发 ( `<input>` 和 `<textarea>`)|2  
onsubmit|表单提交时触发|2  

#### 2.4.2.5 剪贴板事件  

属性|描述  
---|---  
oncopy|该事件在用户拷贝元素内容时触发  
oncut|该事件在用户剪切元素内容时触发  
onpaste|该事件在用户粘贴元素内容时触发  

#### 2.4.2.6 打印事件  

属性|描述|DOM  
---|---  
onafterprint|该事件在页面已经开始打印，或者打印窗口已经关闭时触发  
onbeforeprint|该事件在页面即将开始打印时触发  

#### 2.4.2.7 拖动事件  

事件|描述  
---|---  
ondrag|该事件在元素正在拖动时触发  
ondragend|该事件在用户完成元素的拖动时触发  
ondragenter|该事件在拖动的元素进入放置目标时触发  
ondragleave|该事件在拖动元素离开放置目标时触发  
ondragover|该事件在拖动元素在放置目标上时触发  
ondragstart|该事件在用户开始拖动元素时触发  
ondrop|该事件在拖动元素放置在目标区域时触发  

#### 2.4.2.8 多媒体（Media）事件  

事件|描述  
---|---  
onabort|事件在视频/音频（audio/video）终止加载时触发。  
oncanplay|事件在用户可以开始播放视频/音频（audio/video）时触发。  
oncanplaythrough|事件在视频/音频（audio/video）可以正常播放且无需停顿和缓冲时触发。  
ondurationchange|事件在视频/音频（audio/video）的时长发生变化时触发。  
onemptied|当期播放列表为空时触发  
onended|事件在视频/音频（audio/video）播放结束时触发。  
onerror|事件在视频/音频（audio/video）数据加载期间发生错误时触发。  
onloadeddata|事件在浏览器加载视频/音频（audio/video）当前帧时触发触发。  
onloadedmetadata|事件在指定视频/音频（audio/video）的元数据加载后触发。  
onloadstart|事件在浏览器开始寻找指定视频/音频（audio/video）触发。  
onpause|事件在视频/音频（audio/video）暂停时触发。  
onplay|事件在视频/音频（audio/video）开始播放时触发。  
onplaying|事件在视频/音频（audio/video）暂停或者在缓冲后准备重新开始播放时触发。  
onprogress|事件在浏览器下载指定的视频/音频（audio/video）时触发。  
onratechange|事件在视频/音频（audio/video）的播放速度发送改变时触发。  
onseeked|事件在用户重新定位视频/音频（audio/video）的播放位置后触发。  
onseeking|事件在用户开始重新定位视频/音频（audio/video）时触发。  
onstalled|事件在浏览器获取媒体数据，但媒体数据不可用时触发。  
onsuspend|事件在浏览器读取媒体数据中止时触发。  
ontimeupdate|事件在当前的播放位置发送改变时触发。  
onvolumechange|事件在音量发生改变时触发。  
onwaiting|事件在视频由于要播放下一帧而需要缓冲时触发。  

#### 2.4.2.9 动画事件  

事件|描述  
---|---  
animationend|该事件在 CSS 动画结束播放时触发  
animationiteration|该事件在 CSS 动画重复播放时触发  
animationstart|该事件在 CSS 动画开始播放时触发  

#### 2.4.2.10 过渡事件  

事件|描述  
---|---  
transitionend|该事件在 CSS 完成过渡后触发。  

#### 2.4.2.11 其他事件  

事件|描述  
---|---  
onmessage|该事件通过或者从对象(WebSocket, Web Worker, Event Source 或者子 frame 或父窗口)接收到消息时触发  
ononline|该事件在浏览器开始在线工作时触发。  
onoffline|该事件在浏览器开始离线工作时触发。  
onpopstate|该事件在窗口的浏览历史（history 对象）发生改变时触发。  
onshow|该事件当 `<menu> `元素在上下文菜单显示时触发  
onstorage|该事件在 Web Storage(HTML 5 Web 存储)更新时触发  
ontoggle|该事件在用户打开或关闭 `<details>` 元素时触发  
onwheel|该事件在鼠标滚轮在元素上下滚动时触发  

#### 2.4.2.12 事件对象  

常量  

静态变量|描述|DOM  
---|---|---  
CAPTURING-PHASE|当前事件阶段为捕获阶段(3)|1  
AT-TARGET|当前事件是目标阶段,在评估目标事件(1)|2  
BUBBLING-PHASE|当前的事件为冒泡阶段 (2)|3  
属性  

属性|描述|DOM  
---|---|---  
bubbles|返回布尔值，指示事件是否是起泡事件类型。|2  
cancelable|返回布尔值，指示事件是否可拥可取消的默认动作。|2  
currentTarget|返回其事件监听器触发该事件的元素。|2  
eventPhase|返回事件传播的当前阶段。|2  
target|返回触发此事件的元素（事件的目标节点）。|2  
timeStamp|返回事件生成的日期和时间。|2  
type|返回当前 Event 对象表示的事件的名称。|2  
方法  

方法|描述|DOM  
---|---|---  
initEvent()|初始化新创建的 Event 对象的属性。|2  
preventDefault()|通知浏览器不要执行与事件关联的默认动作。|2  
stopPropagation()|不再派发事件。|2  

#### 2.4.2.13 目标事件对象  

方法  

方法|描述|DOM  
---|---|---  
addEventListener()|允许在目标事件中注册监听事件(IE8 = attachEvent())|2  
dispatchEvent()|允许发送事件到监听器上 (IE8 = fireEvent())|2  
removeEventListener()|运行一次注册在事件目标上的监听事件(IE8 = detachEvent())|2  

#### 2.4.2.14 事件监听对象  

方法  

方法|描述|DOM  
---|---|---  
handleEvent()|把任意对象注册为事件处理程序|2  

#### 2.4.2.15 文档事件对象  

方法  

方法|描述|DOM  
---|---|---  
createEvent()| |2  

#### 2.4.2.16 鼠标/键盘事件对象  

属性  

属性|描述|DOM  
---|---|---  
altKey|返回当事件被触发时，"ALT" 是否被按下。|2  
button|返回当事件被触发时，哪个鼠标按钮被点击。|2  
clientX|返回当事件被触发时，鼠标指针的水平坐标。|2  
clientY|返回当事件被触发时，鼠标指针的垂直坐标。|2  
ctrlKey|返回当事件被触发时，"CTRL" 键是否被按下。|2  
Location|返回按键在设备上的位置|3  
charCode|返回onkeypress事件触发键值的字母代码。|2  
key|在按下按键时返回按键的标识符。|3  
keyCode|返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键的代码。|2  
which|返回onkeypress事件触发的键的值的字符代码，或者 onkeydown 或 onkeyup 事件的键的代码。|2  
metaKey|返回当事件被触发时，"meta" 键是否被按下。|2  
relatedTarget|返回与事件的目标节点相关的节点。|2  
screenX|返回当某个事件被触发时，鼠标指针的水平坐标。|2  
screenY|返回当某个事件被触发时，鼠标指针的垂直坐标。|2  
shiftKey|返回当事件被触发时，"SHIFT" 键是否被按下。|2  

方法  

方法|描述|W3C  
---|---|---  
initMouseEvent()|初始化鼠标事件对象的值|2  
initKeyboardEvent()|初始化键盘事件对象的值|3  

#### 2.4.2.17 IE 特有事件属性  

除了上面的事件属性，IE 浏览器还支持下面的属性：  

属性|描述  
---|---  
cancelBubble|如果事件句柄想阻止事件传播到包容对象，必须把该属性设为 true。  
fromElement|对于 mouseover 和 mouseout 事件，fromElement 引用移出鼠标的元素。  
keyCode|对于 keypress 事件，该属性声明了被敲击的键生成的 Unicode 字符码。对于 keydown 和 keyup 事件，它指定了被敲击的键的虚拟键盘码。虚拟键盘码可能和使用的键盘的布局相关。  
offsetX,offsetY|发生事件的地点在事件源元素的坐标系统中的 x 坐标和 y 坐标。  
returnValue|如果设置了该属性，它的值比事件句柄的返回值优先级高。把这个属性设置为 fasle，可以取消发生事件的源元素的默认动作。  
srcElement|对于生成事件的 Window 对象、Document 对象或 Element 对象的引用。  
toElement|对于 mouseover 和 mouseout 事件，该属性引用移入鼠标的元素。  
x,y|事件发生的位置的 x 坐标和 y 坐标，它们相对于用CSS动态定位的最内层包容元素。  


## 2.5 DOM cookie  

cookie 是存储于访问者的计算机中的变量。每当同一台计算机通过浏览器请求某个页面时，就会发送这个 cookie。你可以使用 JavaScript 来创建和取回 cookie 的值。  

有关cookie的例子：  
___名字 cookie___  
当访问者首次访问页面时，他或她也许会填写他/她们的名字。名字会存储于 cookie 中。当访问者再次访问网站时，他们会收到类似 "Welcome John Doe!" 的欢迎词。而名字则是从 cookie 中取回的。  
___密码 cookie___  
当访问者首次访问页面时，他或她也许会填写他/她们的密码。密码也可被存储于 cookie 中。当他们再次访问网站时，密码就会从 cookie 中取回。  
___日期 cookie___  
当访问者首次访问你的网站时，当前的日期可存储于 cookie 中。当他们再次访问网站时，他们会收到类似这样的一条消息："Your last visit was on Tuesday August 11, 2005!"。日期也是从 cookie 中取回的。  

    <html>  
    <head>  
    <script type="text/javascript">  
    function getCookie(c_name)  
    {  
    if (document.cookie.length>0)  
      {  
      c_start=document.cookie.indexOf(c_name + "=")  
      if (c_start!=-1)  
        {  
        c_start=c_start + c_name.length+1  
        c_end=document.cookie.indexOf(";",c_start)  
        if (c_end==-1) c_end=document.cookie.length  
        return unescape(document.cookie.substring(c_start,c_end))  
        }  
      }  
    return ""  
    }  

    function setCookie(c_name,value,expigreenays)  
    {  
    var exdate=new Date()  
    exdate.setDate(exdate.getDate()+expigreenays)  
    document.cookie=c_name+ "=" +escape(value)+  
    ((expigreenays==null) ? "" : ";expires="+exdate.toGMTString())  
    }  

    function checkCookie()  
    {  
    username=getCookie('username')  
    if (username!=null && username!="")  
      {alert('Welcome again '+username+'!')}  
    else  
      {  
      username=prompt('Please enter your name:',"")  
      if (username!=null && username!="")  
        {  
        setCookie('username',username,365)  
        }  
      }  
    }  
    </script>  
    </head>  

    <body onLoad="checkCookie()">  
    </body>  
    </html>  
