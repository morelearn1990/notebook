# 数据结构

## 动态类型

JavaScript 是一种弱类型或者说动态语言，意味着不用提前声明变量类型，也可以用同一个变量保存不同类型的数据。

## 数据类型

最新的 ECMAScript 标准定义了 7 种数据类型：

> 6种原始类型(基本类型，基本数据类型)：
+ Boolean
+ Null
+ Undefined
+ Number
+ String
+ Symbol (es 6)
> 1种对象类型
+ Object

### 原始值

除 Object 以外的所有类型都是不可变的(值本身无法改变)，JavaScript 中对一个字符串的操作一定返回一个新的字符串，原始字符串并没有改变，我们称这种类型的值为原始值，也就是原始类型值。

1. 布尔类型

布尔表示一个逻辑实体，可以有两个值：true 和 false

2. Null 类型

Null 类型只有一个值：null ,由于历史原因，typeof null == 'object'

3. Undefined 类型

一个没有赋值的变量会有个默认值 undefined 。

undefined 是全局对象的一个属性，不可写，不可配置，不可枚举，也就是说它是全局作用域的一个变量，最初的值就是原始数据类型 undefined 。

由于 undefined 不是 JavaScript 保留关键字，可能在非全局作用域中被当值标识符(变量名)来使用，这样会非常坏的主意，因为这样会是你的代码难以维护和排错

4. 数字类型

JavaScript 中只有一种数字类型：基于 IEEE 754 标准的双精度 64 位二进制格式的值(-(2^63-1)到2^63-1)，除了能够表示浮点数以外，还有一些带符号的值：+Infinity 、 -Infinity 和 NaN

5. 字符串类型

JavaScript 中的字符串类型用于表示文本数据。是一组16位的无符号整数值的“元素”，每个元素占据了字符串的位置，第一个元素的索引为 0，下一个索引为 1，以此类推。

6. 符号类型

符号(Symbol)是 ECMAScript 6 定义的，符号类型是唯一且不可修改的，并且也可以作为 Object 的 key 值

7. 对象

对象是指内存中的可以被标识符引用的一块区域，JavaScript 中对象可以被看做一组属性的集合，用对象字面量语法定义一个对象时，会自动初始化一组属性。

ECMAScript 定义的对象中有两种属性：数据属性和访问器属性

> 数据属性

数据属性是键值对，每个数据属性拥有以下特性：

|特性|数据类型|描述|默认值|
|----|----|-----|----|
|[[Value]]|任何类型|包含这个属性的数据值|undefined
|[[Writable]]|Boolean|如果是 false 则该属性的[[Value]]特性不能被改变|true
|[[Enumerable]]|Boolean|如果是 true 则该属性可以用 for...in 循环来枚举|true
|[[Configurable]]|Boolean|如果是 false 则该属性不能被删除，且除了[[Value]]和[[Writable]]以外的特性都不能被改变|true

> 访问器属性

|特性|数据类型|描述|默认值|
|----|----|-----|----|
|[[Get]]|函数对象或者 undefined|该函数使用一个空的参数列表，能够在有权访问的情况下读取属性的值，另 get|undefined|
|[[Set]]|函数对象或者 undefined|该函数有一个参数，用来写入属性值，另 set|undefined|
|[[Enumerable]]|Boolean|该值为 true 则该属性可以使用 for...in 循环来枚举|true|
|[[Configurable]]|Boolean|该值为 false 则该属性不能被删除并且不能被转变成一个数据属性|true|

这些特性只有 JavaScript 引擎才能访问，因此不能直接访问它们

JavaScript 有一个内置对象的标准库，包括 Object、Date、Math、Number、Array、Maps、Sets等



