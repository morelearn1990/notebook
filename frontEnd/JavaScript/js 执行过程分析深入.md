# js 执行过程

通过执行过程理解作用域、执行上下文、执行上下文栈、变量对象、作用域链、this、闭包等 js 高级概念

## 概念定义

### 作用域

作用域是指程序源代码中定义变量的区域， 规定了如何查找变量，确定了当前执行代码对变量的访问权限，分为词法作用域(静态作用域)和动态作用域。前者作用域在函数定义的时候就决定了，后者作用域是在函数调用的时候才决定的。

JavaScript 采用的是词法作用域。

### 执行上下文栈

JavaScript 引擎创建执行上下文栈（execution context stack，ESC）来管理执行上下文，类似于伪数组，当执行到一段可执行代码时，初始化执行上下文，并将执行上下文压入到执行上下文栈，当可执行代码执行完毕后，将对应的执行上下文从执行上下文栈中弹出来。使用伪代码表示如下

```
ECStack = []
ECStack.unshift(globalContext) // ECStack = [globalContext]
ECStack.unshift(someContext) // ECStack = [someContext,globalContext]
ECStack.shift(someContext) // ECStack = [globalContext]

// 这儿用 unshift 是因为我查看 MDN 上发现，执行上下文栈和作用域链，里层在前面，外层在后面。所以我想这儿应该是 unshift 才对
```

### 执行上下文

当 JavaScript 引擎执行一段可执行代码（executable code）时，会创建对应的执行上下文（execution context），对于每个执行上下文，都包含三个重要属性：

+ 变量对象（Variable object，VO）
+ 作用域链（Scope chain）
+ this

代码执行过程分两个阶段进行处理：

1. 进入执行上下文（将执行上下文压入执行上下文栈，和初始化执行上下文，包括初始化变量对象，this 指向，作用域链创建等）
2. 代码执行

### 变量对象

变量对象是与执行上下文相关的数据作用域，储存了在执行上下文中定义的变量和函数声明。

在全局执行上下文中，变量对象就是全局变量，浏览器里面指向 window ，node 里面指向 global。

在函数上下文中，用活动对象（activation object，AO）来表示变量对象，只有当进入到一个函数的执行上下文，该函数对应的变量对象才会被激活创建并初始化。初始化过程如下：

1. 函数的所有形参（如果是函数上下文的话）
    + 由名称和对应值组成的一个变量对象的属性被创建；
    + 没有实参，属性值被设置成 undefined
2. 函数声明
    + 由名称和对于值（函数对象（function object））组成的一个变量对象的属性被创建；
    + 如果变量对象已经存在相同名称的属性，则完全替换这个属性
3. 变量声明
    + 由名称和对于值（undefined）组成的一个变量对象属性被创建；
    + 如果变量名称跟已经声明的形式参数或函数相同，则变量声明不起作用

伪代码如下：

```
function foo(a){
  var b = 2;
  var c;
  function c(){}
  var d = function(){}
  b = 3
}

foo(1)

// 以上代码进入执行上下文后，活动对象如下
AO = {
   arguments：{
     0：1,
     length:1
   },
   a:1,
   b:undefined,
   c:reference to function c(){},
   d:undefined
}
// 代码执行后，活动对象如下
AO = {
   arguments：{
     0：1,
     length:1
   },
   a:1,
   b:3,
   c:reference to function c(){},
   d:reference to FunctionExpression "d"
}
```

### 作用域链

在一个函数中查找变量对象的时候，会先从当前的执行上下文的变量对象中查找，如果没有找到，就会从父级（词法作用域层面上）执行上下文的变量对象中查找，一直到全局上下文的变量对象，也就是全局对象。

由于 JavaScript 采用词法作用域，函数的作用域链需要从函数的创建和激活两个时期来分析。

+ 函数创建时有一个内部属性[[scope]]，当函数被创建的时候，会将所有的父级元素变量对象按创建时的层级链保存到里面其中。
+ 当函数进入执行上下文时，将当前的函数上下文变量对象添加到作用域链的前端

伪代码如下：

```
function foo(){
  function bar(){

  }
}

// 函数创建时各自的[[scope]]为：
foo.[[scope]] = [globalContext.VO]
bar.[[scope]] = [fooContext.AO,globalContext.VO]

// 代码执行时各自的[[scope]]为：
foo.[[scope]] = [fooContext.AO,globalContext.VO]
bar.[[scope]] = [barContext.AO,fooContext.AO,globalContext.VO]
```

## 闭包

>闭包是函数和声明函数的词法环境的组合；

ECMAScript 中，闭包是指:
1. 从理论角度，所有的函数。所有函数在创建的时候就包括了声明函数的词法环境。
2. 从实践的角度，以下函数才是具有功用的闭包：
  + 即使创建它的上下文已经被销毁，它仍然存在（比如父函数返回了它的内部函数，父函数已经执行完毕，但其父函数中定义的变量还可以通过被返回的内部函数访问到）
  + 在子函数中引用了父函数中定义的自由变量（在函数中使用的，既不是函数参数，又不是函数内部的局部变量的变量）

伪代码如下

```
function foo(){
  var a = 1;
  return function(){
    a++
    console.log(a);
  }
}

let bar = foo()

bar() // 2
bar() // 3

// 被返回的匿名函数和 foo 函数的词法环境组合成了一个闭包

```

闭包可以理解为当父函数执行上下文被从执行上下文栈中弹出后，父元素的活动对象（AO）被保存到了作用域链里面去了，这时处于作用域链里层的子函数还能访问它所在作用域链的所有活动对象（AO），具体请查看作用域链。

## this

以下是作为实践总结的 this 指向：

1. 无论是否严格模式下，在全局执行上下文中，this 指向全局对象
2. 在函数上下文中，this 的 指向取决于被调用的方式，简单调用严格模式下为 undefined ，非严格模式下为全局变量。可以通过 `call` 或者 `apply` 方法将 this 的值从一个上下文传到另一个上下文。
3. 调用 `bind` 方法，this 将永久的被绑定到 `bind` 的第一个参数，无论这个函数是如何被调用的。
4. 在箭头函数中，this 与封闭词法上下文中的 this 保持一致。
5. 作为对象的方法调用，this 指向调用该函数的对象，处于原型链中的 this 同样指向调用这个方法的对象。
6. 当一个函数作为构造函数时（使用 new 关键字），this 被绑定到正在构造的新对象。
7. 当函数被用作 DOM 事件处理函数时，this 指向触发事件的元素。如使用 addEventListener 动态添加的监听事件等
8. 作为一个内联事件处理函数时，this 指向监听器所在的 DOM 元素


## 代码段

```
var scope = "global scope";
function checkscope(){
  var scope = "local scope";
  function checklocal(){
    return scope;
  }
  return checklocal;
}
checkscope()();
```

## 