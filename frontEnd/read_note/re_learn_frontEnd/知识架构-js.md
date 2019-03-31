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
