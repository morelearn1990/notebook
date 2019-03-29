# 对象

javascript 地简单数据类型包括数字、字符串、布尔值（true 和 false）、undefined、null 值，其他的所有值都是对象。 javascript 中的对象是可变的键控集合（keyed collections）。

对象是属性的容器。属性名称可以使包含空字符串在内的所有字符串，属性值可以是除 undefined 以外的所有值。

javascript 里的对象是无类型的，对新属性的名称和值没有限制。适合用于汇集和管理数据。对象可以包含其他对象，所以它们可以轻易的表示成树状或图形结构。

javascript 对象包换一种原型链的继承，允许对象继承另外一个对象的属性，正确的使用它可以减少对象初始化时消耗的内存和时间。

## 对象字面量

对象字面量提供了一种方便创建新对象的表示方法。一个对象字面量就是包围在一对花括号中的零或多个“名/值”对。对象字面量可以出现在表达式的任何地方。

```
var flight = {
    airline:"Oceanic",
    number:815,
    departure:{
        TATA:"SYD",
        time:"2014-09-22 14:55",
        city:"Sydney"
    },
    arrival:{
        IATA:"LAX",
        time:"2004-09-23 10:54",
        city:"Los Angeles"
    }
}

var stooge = {
    first_name:"steve",
    "first-name":"steve", //标识符中 (-) 是不合法的，但允许 (_)
    "undefined":true //标识符不能使用保留字，当加上引号后成为字符串。
}

```

## 检索

要检索对象包含的值，可以使用 [] 括住一个字符串表达式的方式。如果字符串表达式是一个字符串字面量，且它是一个合法 javascript 标识符且不是保留字，那么可以使用 . 表示法，优先使用 . 表示法，有更好的可读性。
```
stooge["first-name"]    // "steve"
flight.departure.TATA   // "SYD"
``` 
如果尝试检索一个不存在的属性，将返回 undefined 。

 || 运算符可以用来填充默认值：
```
var middle = stooge["middle-name"] || "(none)",
var status = flight.status || "unknown"
```

如果尝试从 undefined 的成员属性中获取值将会导致 TypeError 异常，这时可以使用 && 运算符来避免错误
```
flight.equipment   // undefined
flight.equipment.module  // throw  "TypeError"

flight.equipment && flight.equipment.module  //  undefined
```

## 更新

对象里的值可以使用赋值语句来更新，如果属性名已经存在对象里，那么这个属性的值将会被替换，如果对象之前没有拥有该属性名，那么该属性就被扩展到对象里面。

## 引用

对象通过引用来传递，永远不会被复制。

```
var a={},b={},c={};  // a、b、c引用的是不同的对象
var a=b=c={};        // a、b、c引用同一个对象

var test = {
    test1:"test1",
    test2:"test2"
}
var testa = test
testa.test2 = "test3"
test.test2   //    "test3"

```

## 原型

每个对象都链接到一个原型对象，并且它可以从中继承属性。所有通过对象字面量创建的对象均链接到 Object.prototype ,它是所有对象的标配原型对象。

当你创建一个新对象是可指定某个对象为它的原型对象。我们给 Object 增加一个 create 的方法，这个方法使用一个对象作为其原型的新对象：
```
if ( typeof Object.beget !== 'function' ){
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}

var another_stooge = Object.create(stooge);

```
当我们更新某个对象时，不会触及该对象的原型。

原型链只有在检索的时候被用到。

原型关系是动态的，当我们在原型里面添加属性，该属性会立即对所有基于该原型的对象可见。

## 反射

检查对象并确定对象有什么属性是很容易的事。

typeof 操作符对确定属性的类型很有帮助。

原型链的任何属性都会产生值

另外一种方法是使用 hasOwnProperty 方法，该方法只对自身属性起作用。

## 枚举

for in 语句可用来遍历一个对象中的所有属性名。这个枚举过程会列出所有的属性，包括原型链上的属性和函数。我们可以使用 typeof 和 hasOwnProperty 来过滤不想要的原型属性和函数。同时属性名出现的顺序是不确定的。

## 删除

delete 运算符可以用来删除对象的属性。

## 减少全局变量污染

最少化减少使用全局变量的方法之一是为你的应用只创建一个唯一的全局变量对象，该对象成为你的变量容器。

```
var GLOBAL = {};

GLOBAL.stooge = {
    "first-name":"Joe",
    "last-name":"Howard"
};

GLOBAL.flight = {
    airline:"Oceanic",
    number:815,
    departure:{
        TATA:"SYD",
        time:"2014-09-22 14:55",
        city:"Sydney"
    },
    arrival:{
        IATA:"LAX",
        time:"2004-09-23 10:54",
        city:"Los Angeles"
    }
}

```

只要把全局性的资源都纳入到一个名称空间下，你的应用程序和其他应用程序、组件、类库之间发生的冲突减少到最低。























