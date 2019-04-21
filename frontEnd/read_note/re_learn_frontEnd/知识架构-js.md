# JS 知识

## 知识架构

### 目录结构

- JAVASCRIPT
  - 文法
    - 词法
    - 语法
  - 语义
  - 运行时
    - 数据结构
      - 类型
        - 对象
      - 实例
        - 应用和机制
    - 执行过程(算法)
      - 事件循环
      - 微任务的执行
      - 函数的执行
      - 语句级的执行

### 结构的解释

按照编程语言的一般规律：**_用一定的词法和语法，表达一定的语义，从而操作运行时。_**

按照程序的一般规律：**_运行时分为数据结构和算法，数据结构包含类型和实例（JavaScript 的数据类型包含 7 种基本类型和 7 种语言类型，实例就是内置对象的一部分），算法就是指执行过程。_**

## 详细知识点

### 数据类型

#### 7 种基础数据

7 种基础数据类型：`Undefined`，`Null`，`Boolean`，`String`，`Number`，`Symbol`，`Object`

1. `Undefined` 类型表示**未定义**，类型只有一个值 `undefined`，可以使用全局变量 `undefined` 来表示，但是由于 `undefined` 并不是一个关键词，所以有可能会被改写，全局变量中已经被最新版本的宿主环境定义成了 `no-write`，但是局部环境还是能被赋值改写，所以建议使用 `void 0` 来获取 `undefined` 的值。
2. `Null` 类型表示**定义了未赋值**，只有一个值 `null`，由于 `null` 是关键字所以可以放心使用 `null` 获取 `null` 值。
3. `Boolean` 类型表示**逻辑意义上的真和假**,由两个值 `true` 和 `false`。
4. `String` 类型表示字符串，最大长度为 2<sup>53</sup>-1，一般开发来说是够用了的，但是这个长度并不是指理解中的字符串字符数，而是受到 UTF16 编码长度的影响。JavaScript 把每个 UTF16 单元当做一个字符来处理，所以处理非 BMP（超出 U+0000 ~ U+FFFF）的字符时要小心。
5. `Number` 表示通常意义上的“数字”，大致对应数学中的有理数，当然计算机里面有精度限制，基本符合 IEEE 754-2008 中规定的双精度浮点数规则，但是为了表达几个额外的语言场景规定了几个例外情况：`NaN`，`Infinity`，`-Infinity`。又由于 `0` 有 `+0` 和 `-0` 之分，所以除以 `0` 时需要判断得到是正无穷还是负无穷。由于有 IEEE 精度限制，所以 `0.1 + 0.2 !== 0.3`，这儿应该使用与最小精度判断的方式来进行比较 `Math.abs(0.1 + 0.2 - 0.3) <= Number.EPSILON` 。
6. `Symbol` 是一切非字符串的对象 key 集合，是 ES6 引入的新类型，重塑了整个对象系统。可以具有字符串类型的描述，但是即使描述相同，`Symbol`也不相同。
7. `Object` 是 JavaScript 中最复杂的类型，也是 JavaScript 的核心之一。在 JavaScript 中定义为**属性的集合**，属性可以分为数据属性和访问器属性，二者是 `key-value` 的结构，`key` 可以是字符串，也可以是 `Symbol`。JavaScript 中的几个基本类型在对象类型中都有一个“亲戚”：`Number`，`Boolean`，`String`，`Symbol`。`Number`，`Boolean`，`String`这三个构造器是两用的，使用 new 关键字产生对象，直接调用表示强制类型转换。`Symbol`比较特殊，直接调用表示生成新的 `Symbol` 值，使用 new 关键字时会抛出错误。JavaScript 语言设计上试图模糊对象和基本类型之间的关系，所以在对应对象上或对象的原型上定义的方法都可以对基本类型使用，是因为 `.` 运算符提供了装箱操作，会根据基本类型创建一个对应的临时对象，使我们能调用对应对象上的方法。

#### 类型转换

因为 JavaScript 是弱类型语言，数据类型转换非常频繁，常见的运算符都会先进行类型转换再进行运算。大部分类型转换符合人类的直觉，但是不理解类型转换的严格定义，就有可能会造成代码中的判断失误。

其中 `==` 运算符试图实现跨类型的转换，它的规则复杂到几乎没有人记住，很多实践都推荐禁止使用 `==` 运算符，都要求程序员先进行类型转换在使用 `===` 进行对比。

大部分转换都非常简单，如下表：

|         |   Null    |  Undefined  | Boolean(true) | Boolean(false) |     Number     |     String     |  Symbol   |  Object  |
| :-----: | :-------: | :---------: | :-----------: | :------------: | :------------: | :------------: | :-------: | :------: |
| Boolean |   false   |    false    |       -       |       -        |  0/NaN-false   |    ''-false    |   true    |   true   |
| Number  |     0     |     NaN     |       1       |       0        |       -        | StringToNumber | TypeError | 拆箱转换 |
| String  |  'null'   | 'undefined' |    'true'     |    'false'     | NumberToString |       -        | TypeError | 拆箱转换 |
| Object  | TypeError |  TypeError  |   装箱转换    |    装箱转换    |    装箱转换    |    装箱转换    | 装箱转换  |    -     |

##### StringToNumber

- `+'10'` / `Number('10')` 可以转换十六进制，十进制、八进制，二进制的字符串，和正负科学计数法的字符串，但是当整个字符串都不能转换成数字时会得到 `NaN`。
- `parseFloat('10')` 仅支持十进制的转换，且转换字符串前数字字符串的内容，当遇到非数字字符串时停止，当首字符是非数字时为 `NaN`。
- `parseInt` 可以支持十六进制，十进制、八进制，二进制的转换，默认支持十六进制、十进制，需要传第二个参数进行选择。

##### NumberToString

在较小范围内，数字转字符串是符合人类的直觉，当数字绝对值较大或较小时会转换成科学计数法，这是为了保证产生的字符串不会过长。

##### 装箱转换

每一种基本类型都对应一个对象类，装箱转换就是将基本类型转换成对应的对象。`Symbol` 不能使用 new 关键字来创建对象，可以使用 call 和 内置的 Object() 进行转换。

```
function toObjectA(o){
  return (function(){return this}).call(o)
}
let symbolObjectA = toObjectA(Symbol("a"));

function toObjectB(o){
  return Object(0)
}
let symbolObjectB = toObjectB(Symbol("b"));

console.log(typeof symbolObjectA); //object
console.log(symbolObjectA instanceof Symbol); //true
console.log(symbolObjectA.constructor == Symbol); //true
console.log(typeof symbolObjectB); //object
console.log(symbolObjectB instanceof Symbol); //true
console.log(symbolObjectB.constructor == Symbol); //true
```

每一类装箱对象都有一个\[Class\]属性，可以使用 `Object.prototype.toSting()` 来获取。

```
function toObjectString(o){
  return Object.prototype.toString.call(o)
}

toObjectString(symbolObjectA) // [object Symbol]
toObjectString(1) // [object Number]
toObjectString('1') // [object String]
```

##### 拆箱转换

在 JavaScript 中，规范规定了 toPrimitive 函数，用于对象到基本类型的转换（拆箱转换）。对象到 String 和 Number 的转换都遵循先拆箱后转换的规则，现将对象转换成对应的基本类型，再在 String 和 Number 之间转换。

类型转换的内部实现是通过 `toPrimitive(input[,PreferredType])` 方法进行转换的，preferredType 是可选的，作用是指出 input 被期待转成的类型。默认是 "number"，先执行"valueOf"，后执行"toString"，如果传入"string"，那就先执行"toString"，后执行"valueOf"。在 es6 中还允许对象通过显式指定 `@@toPrimitive Symbol` 来覆盖原来的行为。

```
// valueOf toString 的执行先后
let object = {
  valueOf() {
    console.log("valueOf");
    return {};
  },
  toString() {
    console.log("toString");
    return {};
  }
};
object + ''; // valueOf toString TypeError
String(object);  // toString valueOf TypeError

// @@toPrimitive 覆盖默认行为
object[Symbol.toPrimitive] = () => {
  console.log("toPrimitive");
  return "hello"
}
object + ""; //toPrimitive "hello"
```

#### 7 种规范类型

- List 和 Record 用于描述函数传参过程；
- Set 主要用于解释字符集等；
- Completion Record 用于描述异常、跳出等语句执行过程；
- Reference 用于描述对象属性访问、delete 等；
- Property Descriptor 用于描述对象的属性；
- Lexical Environment 和 Environment Record 用于描述变量和作用域。
- Data Block 用于描述二进制数据。

### JavaScript 对象

JavaScript 基于对象的定义：**语言和宿主的基础设施由对象提供，并且 JavaScript 程序即是一系列互相通讯的对象集合。** 该定义表达了对象对于 JavaScript 语言的重要性。

编程语言对象的特征：

- 对象具有唯一标识性；即使完全相同的两个对象也是不一样的，一般是用内存地址来体现的。
- 对象有状态；同一个对象可能有不同的状态；
- 对象有行为；对象的状态可能会因为它的行为发生变化。

对象的“状态”和“行为”在不同的语言中被使用不同的术语来抽象描述它。C++ 里面被称为“成员变量”和“成员函数”，Java 中则称他们为“属性”和“方法”。而在 JavaScript 中，状态和行为被统一抽象为“属性”，对于 JavaScript 来说两者都是普通属性。**因为 JavaScript 赋予了使用者在运行时为对象添改状态和行为的能力，JavaScript 的对象具有高度的动态性。**

JavaScript 的属性并非简单的`key-value`形式，JavaScript 使用一组特征（描述符、attribute）来描述属性（property）。JavaScript 的属性存在两种类型：数据属性（数据描述符）、访问器属性（存取描述符）。

数据属性（数据描述符）和访问器属性（存取描述符）同时拥有的特征（描述符）：

1. enumerable: 决定属性能否被`for...in`枚举；
2. configurable: 决定该属性能否被删除和特征能否被改变；

数据属性（数据描述符）独有的特征（描述符）：

1. value: 属性的值；
2. writable: 决定属性能否被赋值和修改；

访问器属性（存取描述符）独有的特征（描述符）：

1. getter: 函数或者 undefined，在读取属性值时候被调用。
2. setter: 函数或者 undefined，在设置属性值时候被调用

JavaScript 的属性设置可以使用 Object.prototype 上的方法进行操作。实际上 JavaScript 对象的运行时是属性的集合，是一个属性的索引结构。 JavaScript 的对象设计跟主流基于类的面上对象差异非常大，可即便如此，JavaScript 提供了完全运行时的对象系统，可以使他可以模仿多数的面向对象编程范式。

#### 原型

面向对象有两种编程范式：一是基于类，二是基于原型。

基于类的编程提倡使用一个关注分类和类之间关系的开发模型，在这类语言中，总先有类，再从类去实例化一个对象，类与类之间又可能会形成继承、组合等关系，类又往往与语言的类型系统整合，形成一定的编译时能力。

基于原型的编程看起来更为提倡程序员去关注一系列对象的实例行为，而后才去关心如何将这些对象，划分到最近使用的相识的原型对象。

JavaScript 是基于原型的面向对象编程范式。

在早期，JavaScript 经常被用于“模拟面向对象”，这些”模拟面向对象“实际上做的事就是”模拟基于类的面向对象“。JavaScript 在诞生之初，管理层就要求它去模仿 Java ，所以 JavaScript 的创始人在"原型运行时”的基础上引入了`new`、`this`等语言特性，但这样的半吊子模拟，缺少了继承等关键特性，导致大家试图对它进行修补，进而产生了种种互不相容的解决方案。庆幸的是 ES6 提供了 `class` 关键字来定义类，修正了一些常见的坑，统一了社区的方案。

原型系统的复制操作存在两种思路：

1. 新对象实例持有一个原型的引用；
2. 切实的将原型对象复制产生新的对象，原型对象和实例对象再无关联。

JavaScript 是基于第一种思路：

1. 所有对象都有私有属性 `[[prototype]]`，指向对象的原型。
2. 读取对象的属性时，如果对象本身没有，则会继续访问对象的原型，如果都没有就会继续往原型的原型上去寻找，直到原型为 `null` 或者找到为止。

这个模型在 JavaScript 的历史版本中并没有太大的改变，但是在 ES6 中提供了一系列的内置函数，可以直接访问和操纵原型，分别为以下三个方法：

1. `Object.create` 根据指定的原型创建新的对象，原型可以是 null；
2. `Object.getPrototypeOf` 获得一个对象的原型；
3. `Object.setPrototypeOf` 设置一个对象的原型；

##### 早期版本中的类和原型

在早期版本中，“类”的定义是一个私有属性 `[[class]]`，语言标准为内置类型诸如 Number、String、Date 等指定了 `[[class]]` 属性以表示他们的类。使用者唯一可以访问这个属性的方法是 `Object.prototype.toString`。在 ES5 开始 `[[class]]` 属性被 `Symbol.toStringTag` 代替，`Object.prototype.toString` 的意义不再跟 class 相关，我们甚至可以自定义 `Object.prototype.toString` 的行为。

```
var o = new Object;
var n = new Number;
var s = new String;
var b = new Boolean;
var d = new Date;
var arg = function(){ return arguments }();
var r = new RegExp;
var f = new Function;
var arr = new Array;
var e = new Error;
console.log([o, n, s, b, d, arg, r, f, arr, e].map(v => Object.prototype.toString.call(v)));

// 自定义 Object.prototype.toString 的行为
var o = { [Symbol.toStringTag]: "MyObject" }
console.log(o + "");
```

new 运算符做了哪些操作：

1. 一个继承自 Foo.prototype 的新对象被创建。
2. 使用指定的参数调用构造函数 Foo ，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
3. 由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤 1 创建的对象。（一般情况下，构造函数不返回值，但是用户可以选择主动返回对象，来覆盖正常的对象创建步骤）

new 运算符提供了两种方式给新建对象添加属性：

1. 在构造函数中给当前实例添加属性；
2. 在构造器的 prototype 上添加所有实例的共享属性；

```
// 给当前实例添加属性
function c1(){
    this.p1 = 1;
    this.p2 = function(){
        console.log(this.p1);
    }
}
var o1 = new c1;
o1.p2();
// 给所有实例添加共享属性
function c2(){
}
c2.prototype.p1 = 1;
c2.prototype.p2 = function(){
    console.log(this.p1);
}
var o2 = new c2;
o2.p2();
```

##### ES6 中的类

在 ES6 中引入了新特性 class，new 跟 function 搭配的方式终于可以退休了（虽然运行时没有改变），在任何场景都推荐使用 ES6 的语法来定义类，让 function 回归原本的函数语义。

```
class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
  // Getter
  get area() {
    return this.calcArea();
  }
  // Method
  calcArea() {
    return this.height * this.width;
  }
}
```

通过 setter/getter 来创建访问器属性，使用括号和大括号来创建方法，数据型成员最好写在构造器函数里面。

此外，class 提供了继承的能力。

```
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    console.log(this.name + ' makes a noise.');
  }
}
class Dog extends Animal {
  constructor(name) {
    super(name); // call the super class constructor and pass in the name parameter
  }
  speak() {
    console.log(this.name + ' barks.');
  }
}
let d = new Dog('Mitzie');
d.speak(); // Mitzie barks.
```

#### JavaScript 中对象的分类

1. 宿主对象(host Objects):由 JavaScript 宿主环境提供的对象，它们的行为完全由环境对象决定；
2. 内置对象(Built-in Objects):由 JavaScript 语言提供的对象；

- 固有对象(Intrinsic Objects):由标准规定，随 JavaScript 运行时创建而自动创建的对象实例；
- 原生对象(Native Objects):可以有用户通过 Array、RegExp 等内置构造器或特殊语法创建的对象。
- 普通对象(Ordinary Objects):由 `{}`、Object 构造器或者 class 关键字定义类创建出来的对象，能够被原型继承。

##### 宿主对象

JavaScript 的宿主对象千奇百怪，常见的是浏览器环境的宿主对象、nodejs 中的宿主对象。

在浏览器环境中，全局变量 window 就是宿主对象，上面有很多属性，一部分来自 JavaScript 语言标准，一部分来自浏览器环境。

宿主对象也分为固有的和可创建的，比如 `document.createElement` 可以创建 dom 对象。也提供一些构造器，比如 `new Image` 创建 img 元素。

##### 内置对象.固有对象

固有对象在任务 js 代码执行之前就已经创建出来了，他们通常扮演者基础库的角色。

##### 内置对象.原生对象

在 JavaScript 中，将能通过语言本身的构造器创建的对象称作原生对象，几乎这些原生对象都没办法使用纯的 JavaScript 代码实现，也无法通过 class/extend 语法来继承。这些构造器使用了一些私有字段使得原型继承方法无法正常工作，我们可以这么认为，这些对象都是为了特定的能力或性能而设计出来的“特权对象”。

特定对象的私有字段比如：

- Error:[[ErrorData]]
- Boolean:[[BooleanData]]
- Number:[[NumberData]]
- RegExp:[[RegExpData]]

##### 使用对象来模拟函数和构造器

- 函数对象的定义是：具有 [[call]] 私有字段的对象
- 构造器对象的定义是：具有 [[constructor]] 私有字段的对象

也可以这么说，任何对象只要实现了 [[call]] 就是一个函数对象，可以作为函数去调用。任何对象只要实现了 [[constructor]] 就是一个构造器对象，可以作为构造器使用。使用 function 关键字声明的函数必定同时是函数和构造器。但对于宿主对象和内置对象来说，作为函数调用和作为构造器使用不总是一致的，比如 Date 使用构造器时产生对象，直接调用就生成字符串，Image 只能使用构造器不能作为函数调用。使用箭头函数定义的函数只能作为函数调用，不能作为构造器。

[[constructor]] 的调用过程如下：

1. 以 Object.prototype 作为原型创建一个对象；
2. 以新对象为 this，执行函数的 [[call]]；
3. 如果 [[call]] 的返回值是一个对象，那么返回这个对象，否则返回第一步创建的新对象。

这样的规则可以用来一定程度上实现“私有”：

```
function Cls(){
  this.a = 300;
  return {
    getValue(){
      return this.a;
    }
  }
}
let cls = new Cls;
cls.getValue();// 300
//在外面无论如何都没法访问 a
```

##### 特殊行为的对象

在原生对象和固有对象中，有一些对象的行为和正常的对象表现不一样：

1. Array: Array 的 length 的属性根据最大的下标自动变化；
2. Object.prototype: 作为所有对象的默认原型，不能再设置原型了；
3. String: 为了支持下标运算，正整数属性会到字符串里面去找；
4. Arguments: arguments 非负数整数下标属性跟对应的参数变动；
5. bind 后的函数：跟原来的函数相关联；
6. 类型数组和数组缓冲区：跟内存相关联，下标运算比较特殊；
7. 模块的 namespace 对象：特殊的地方非常多，跟一般对象完全不一样，尽量只用 import ；

##### 获取对象的方法

```
var o = {};
var o = function(){};
var o = JSON.parse('{}');
var o = Object.create(null);
var o = Object.assign({});
var o = Object(null); //装箱转换
```

##### 获取全部的固有对象

```
var set = new Set();
var objects = [
    eval,
    isFinite,
    isNaN,
    parseFloat,
    parseInt,
    decodeURI,
    decodeURIComponent,
    encodeURI,
    encodeURIComponent,
    Array,
    Date,
    RegExp,
    Promise,
    Proxy,
    Map,
    WeakMap,
    Set,
    WeakSet,
    Function,
    Boolean,
    String,
    Number,
    Symbol,
    Object,
    Error,
    EvalError,
    RangeError,
    ReferenceError,
    SyntaxError,
    TypeError,
    URIError,
    ArrayBuffer,
    SharedArrayBuffer,
    DataView,
    Float32Array,
    Float64Array,
    Int8Array,
    Int16Array,
    Int32Array,
    Uint8Array,
    Uint16Array,
    Uint32Array,
    Uint8ClampedArray,
    Atomics,
    JSON,
    Math,
    Reflect];
objects.forEach(o => set.add(o));

for(var i = 0; i < objects.length; i++) {
    var o = objects[i]
    for(var p of Object.getOwnPropertyNames(o)) {
        var d = Object.getOwnPropertyDescriptor(o, p)
        if( (d.value !== null && typeof d.value === "object") || (typeof d.value === "function"))
            if(!set.has(d.value))
                set.add(d.value), objects.push(d.value);
        if( d.get )
            if(!set.has(d.get))
                set.add(d.get), objects.push(d.get);
        if( d.set )
            if(!set.has(d.set))
                set.add(d.set), objects.push(d.set);
    }
}
```
