# 函数

函数包含一组语句，他们是 javascript 的基础模块单元，用于代码复用、信息隐藏和组合调用。函数用于指定对象的行为，一般来说所谓的编程，就是将一组需求分解成一组函数于数据结构的技能。

## 函数对象

javascript 中的函数就是对象。对象是“名/值”对的集合并拥有一个链接到原型对象的隐藏链接。对象字面常量产生的对象链接到 Object.prototype ，函数对象链连接到 Function.prototype （该原型对象本身连接到 Object.prototype ）。每个函数再创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码。

因为函数是对象，所以可以像其他任何的值一样被使用，可以被保存在变量、对象和数组中。函数是对象也可以拥有方法。

函数与众不同在于他们可以被调用。

## 函数字面量

函数对象通过函数字面量来创建：
```
var add = function(a,b){
    return a+b;
}
```

函数字面量包含4个部分：
+ 第一个部分书保留字 function ;
+ 第二部分是函数名 它可以被省略，函数可以使用函数名来递归调用自己，同时也能被调试器和开发工具用来识别函数，如果没有给函数命名，则被称为匿名函数 （ anonymous） ；
+ 第三个部分是包围在圆括号中的一组参数，对各参数用都逗号分隔，这些参数中的名称将被定义成函数中的变量。
+ 第四部分是包围在花括号中的一组语句，这些语句是函数的主体，在函数被调用时执行。

## 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数，每个函数还接收两个附加的参数：this 和 arguments 。参数 this 在面向对象编程中非常重要，它的值取决于调用的模式。在 javascript 中一共有 4 种调用模式：方法调用模式、函数调用模式、构造器调用模式和 apply 调用模式。这些模式在如何初始化关键参数 this 上存在差异。

调用运算符是跟在任何产生一个函数值的表达式之后的一对圆括号。圆括号内可包含零个或多个用逗号隔开的表达式。每个表达式产生一个参数值，每个参数值被赋予函数声明时定义的形式参数名。当实际参数（arguments）的个数与形式参数的个数不匹配时，不会导致运行时错误。如果实际参数过多，超出的参数值会被忽略，如果实际参数过少，缺失的值会被定义为 undefined 。同时对参数值不会进行类型检查。

### 方法调用模式

当一个函数被保存为对象的一个属性时，我们称它为一个方法。当方法被调用时，this 被绑定到该对象。如果调用表达式包含一个提取属性的动作（即包含一个 . 表达式或 [subscript] 下标表达式，那么它就被当作一个方法来调用。

```
// 创建 myObject 对象。它有一个 value 属性和一个 increment 方法。
// increment 方法接受一个可选参数，如果参数不是数字，那么默认使用数字 1

var myObject = {
    value:0,
    increment:function(inc){
        this.value += typeof inc === 'number'?inc:1;
    }
};

myObject.increment();
document.writeln(myObject.value);  //  1

myObject.increment(3);
document.writeln(myObject.value);  //  3

```
方法可以使用 this 访问自己所属的对象，所以他能从对象中取值或对象进行修改。 this 到对象的绑定发生在调用的时候。这个 “超级” 延迟绑定 （very late binding）使得函数可以对 this 高度复用。通过 this 可取得它们所属对象得上下文得方法称为公共方法（public method）。

### 函数调用模式

当一个函数并非一个对象得属性时，那么他就被当作一个函数来调用得：
```
function add(a,b){
    return a+b;
}

var sum = add(3,4);  //sum 的值为7

```

以此模式调用函数时，this 被绑定到全局对象。这时语言设计上的一个错误。倘若语言设计正确，那么当内部函数被调用时，this 应该仍然绑定到外部函数的 this 变量。这个设计错误的后果就是方法不能利用内部函数来帮助它工作，因为函数内部的 this 被绑定到错误的值，所以不能共享该方法对对象的访问权。幸运的是，有一个很容易的解决方案：如果该方法定义一个变量并给它赋值为 this ,那么内部函数就可以通过那个变量访问到 this 。按照约定，把那个变量命名为 that 。

```
 myObject.double = {
     var that = this;
     
     var helper = function(){
         that.value = add(that.value,that.value);
     };

     helper();   // 以函数形式调用 helper 。
 };

 myObject.double();

 document.writenln(myObject.value);  // 6

```

### 构造器调用模式

javascript 是一门基于原型继承的语言。这意味着对象可以直接从其他对象继承属性。该语言是无类型的。

这偏离了当今编程语言的主流风格。当今大多数语言都是基于类的语言。尽管原型继承极富表现力，但并未被广泛理解。 javascript 本身对它原型的本质也缺乏信心，所以它提供了一套和基于类的语言雷氏的对象构建语法。有类型化语言编程经验的程序员很少有言语接受原型继承的，并且认为借鉴类型化语言的语法模糊了这门语言的真实的原型本质。

如果在一个函数前面带上 new 来调用，那么背地里将会创建一个连接到该函数的 prototype 成员的新对象，同时 this 会被绑定到那个新的对象上。

new 前缀也会改变 return 语句的行为。

```
// 创建一个名为 Quo 的构造器函数。它构造一个带有 status 属性的对象

var Quo = function (string) {
    this.status = string;
}

// 给 Quo 的所有实例提供一个名为 get_status 的公共方法。

Quo.prototype.get_status = function(){
    return this.status;
}

// 构造一个 Quo 实例

var myQuo = new Quo("confused");

document.writeln(myQuo.get_status());  // confused

```

一个函数，如果创建的目的就是希望结合 new 前缀来调用，那么它就被称为构造器函数。按照约定，它们保存在以大写格式命名的变量里。如果调用构造器函数时没有在前面加上 new ，可能会发生非常糟糕的事情，既没有编译时警告，也没有运行时警告，所以大写约定非常重要。

### apply 调用模式

因为 javascript 是一门函数式的面向对象编程语言，所以函数可以拥有方法。

apply 方法让我们构建一个参数数组传递给调用函数。它也允许我们选择 this 的值。apply 方法接受两个参数，第1个是要绑定给 this 的值，第 2 个是一个参数数组。

```
var array = [3,4];
var sum = add.apply(null,array);  //  sum 值为 7

var statusObject = {
    status:'A-OK'
};

// statusObject 并没有继承自 Quo.prototype ，但我们可以在 statusObject 上调用 get_status 方法。

var status = Quo.prototype.get_status.apply(statusObject);

```

## 参数

当函数被调用时，会得到一个 “免费” 配送的参数，那就是 arguments 数组。函数可以通过此参数访问所有它被调用时传递给它的参数列表，包括那些没有被分配给函数声明时定义的行为参数的多余参数。这使得编写一个无须指定参数个数的函数称为可能：

```
    // 构造一个将大量的值想家的函数。
    // 注意该函数内部定义的变量 sum 不会与函数外部定义的 sum 产生冲突。
    // 该函数只会看到内部的那个变量。

    var sum = function (){
        var i,sum = 0;
        for(i=0;i<arguments.length;i++){
            sum += arguments[i];
        }
        return sum;
    };

    ducument.writeln(sum(4,5,6,7,8));  // 30

```

因为语言的一个设计错误，arguments 并不是一个真正的数组，他只是一个 “类似数组（array-like）” 的对象。 arguments 拥有一个 lenght 属性，但他没有任何一个数组的方法，我们将在本章结尾看到这个设计错误导致的后果。

## 返回

当一个函数被调用时，它从第一个语句开始执行，并在遇到关闭函数整体的 } 时结束。然后函数把控制权交还给调用该函数的程序。

return 语句可用来使函数提前返回。 当 return 被执行时，函数立即返回而不是再执行余下的语句。

一个函数总会有一个返回值，如果没有指定返回值，则返回 undefined 。

如果函数调用时再前面加上了 new 前缀，且返回值不是一个对象，则返回 this （该新对象）。

## 异常

javascript 提供了一套异常处理机制。异常是干扰程序的正常流程的不寻常（但并非完全是出乎意料的）事故。当发现这样的事故，你的程序应该抛出一个异常：

```
    var add = function (a,b) {
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw {
                name:'TypeError',
                message: 'add needs numbers'
            };
        }
        return a + b;
    }

```

throw 语句中断函数的执行。他应该抛出一个 exception 对象，该对象包含一个用来识别异常类型的 name 属性和一个描述 message 属性。你也可以添加其他的属性。

该 exception 对象将被传递到一个 try 语句的 catch 从句：

```
    // 构造一个 try_it 函数，一不正确的方式调用之前的的 add 函数；
    var try_it = function () {
        try {
            add("seven");
        } catch (e) {
            document.writeln(e.name+ ':' + e.message);
        }
    }

    try_it();

```
如果在 try 代码块内抛出了一个异常，控制权就会跳转到它的 catch 从句。

一个 try 语句只会有一个捕获所有异常的 catch 代码块。如果你的处理手段取决于异常的类型，那么异常处理器必须检查异常对象的 name 属性来确定异常的类型。

## 扩充类型的功能

javascript 允许给语言的基本类型扩充功能。在第三章中，我们已经看到，通过给 Object.prototype 添加方法，可以让该方法对所有对象都可以使用。这样的方式对函数、数组、字符串、数字、正则表达式和布尔值同样适用；

举例来说，我们可以通过给 Function.prototype 增加方法来使得该方法对所有函数可用：

```
    Function.prototype.method = function (name,func){
        this.prototype[name] = func;
        return this;
    };

```
通过给 Function.prototype 增加一个 method 方法，我们下次对象增加方法的时候就不必键入 prototype 这几个字符，省掉了一些麻烦。

javascript 没有专门的证书类型，但有时候确实只需要提取数字中的整数部分。javascript 本身提供的取整方法有些简陋。我们可以通过给 Number.prototype 增加一个 integer 方法来改善它，它会根据数字的正负来判断是使用 Math.ceiling 还是 Math.floor 。

```
    Number.method('integer',function(){
        return Math[this<0 ? 'ceil' : 'floor'](this);
    });

    document.writeln((-10/3).integer());  // -3

```

javascript 缺少一个移除字符串首尾空白的方法。这个小忽略很容易弥补：

```
    String.method('trim',function(){
        return this.replace(/^\s+|\s+$/g,'');
    });

    document.writeln('"' + "    neat   ".trim() + '"' );

```

通过给基本类型增加方法，我们可以极大的提高语言的表现力。因为 javascript 原型继承的动态本质，新的方法立刻被赋予到所有的对象实例上，哪怕对象实例实在方法被增加之前就创建好了。

基本类型的原型是公用结构，所以在类库混用时务必小心。一个保险的做法就是只在确定没有该方法时才添加它。

```
    // 符合条件时才增加方法。

    Function.prototype.method = function (name , func){
        if (!this.prototype[name]){
            this.prototype[name] = func;
        }
        return this;
    };

```

另一个要注意的就是 for in 语句用在原型上时表现很糟糕。我们可以使用 hasOwnProperty 方法筛选出继承而来的属性。或者我们可以查找特定的类型。

## 递归

递归函数就是会直接或间接地调用自身得一种函数。递归是一种强大得编程技术，它把一个问题分解为一组相似的子问题，每一个都用寻常解去解决。一般来说，一个递归函数调用自身去解决它的子问题。

“汉诺塔”是一个著名的益智游戏。塔上有3根柱子和一套直径各不相同的空心圆盘，开始时所有圆盘都是按照大小顺序堆积，目标是通过每次移动一个圆盘到另一根柱子上，最终把一堆圆盘移动到目标柱子上，过程中不允许把较大的圆盘放置在较小的圆盘上。这个问题有一个寻常解：
```
    var hanoi = function(disc,src,aux,dst){
        if(disc>0){
            hanoi(disc-1,src,dst,aux);
            document.writeln('Move disc' + disc + ' from ' + src + ' to ' + dst);
            hanoi(disc-1,aux,src,dst);
        }
    };

    hanoi(3,'Src','Aux','Dst');

```

hanoi 函数把一堆圆盘从一根柱子移到另一根柱子，必要时使用辅助的柱子。它把该问题分解成 3 个子问题。

传递给 hanoi 函数的参数包括当前移动的圆盘编号和它将要用到的 3 根柱子，当他调用自身的时候，它去处理当前正在处理的圆盘之上的圆盘。最终，他会以一个不存在的圆盘编号去调用。在这样的情况下，它不执行任何操作，由于该函数对非法值不予理会，我们也就不必担心它会导致死循环。

递归函数可以非常高效地操作树形结构，比如浏览器端地文档对象模型（DOM），每次递归调用时处理指定地树地一小段。

```
    //定义 walk_the_DOM 函数，它从某个指定的节点开始，按照 HTML 源码中的顺序访问该树的每个节点
    //它会调用一个函数，并依次传递每个节点给它。walk_the_DOM 调用自身去处理每一个子节点。

    var walk_the_DOM  = function walk(node,func) {
        func(node);
        node = node.firstChild;
        while (node) {
            walk(node,func);
            node = node.nextSibling;
        }
    };

    //定义 getElementsByAttribute 函数。它以一个属性名称字符串和一个可选的匹配值作为参数。
    //它调用 walk_the_DOM，传递一个用来查找节点属性名称的函数作为参数。
    //匹配的节点会累加到一个结果数组中。

    var getElementsByAttribute = function (att,value) {
        var results = [];
        walk_the_DOM(document.body,function (node) {
            var actual = node.nodeType === 1 && node.getAttribute(att);
            if (typeof actual === 'string' && (actual === value || typeof value !== 'string')){
                results.push(node);
            }
        });
        return results;
    }

```
一些语言提供了 尾递归优化，这意味着如果一个函数返回自身递归调用的结果，那么调用的过程会被替换为一个循环，它可以显著的提高速度。遗憾的是，javascript 当前并没有提供尾递归优化。深度递归的函数可能会因为堆栈溢出而运行失败。

```
    //构建一个带尾递归的函数。因为它会返回自身调用的结果，所以它是尾递归。 javascript 当前并没有对这种形式进行优化。

    var factorial = function factorial (i,a) {
        a = a || 1;
        if (i < 2) {
            return a;
        }
        return factorial(i-1,a*i);
    };

    document.writeln(factorial(4));

```

## 作用域

在编程语言中，作用域控制着变量与参数的可见性及生命周期。对程序员来说这是一项重要服务，因为它减少了名称冲突，并且提供了自动内存管理。

```
    var foo = function () {
        var a = 3,b = 5;

        var bar = function () {
            var b = 7,c = 11;
            // 此时 a = 3; b = 7; c = 11;
            a += b + c;
            // 此时 a = 21; b = 7; c = 11;
        };
        // 此时 a = 21; b = 5; c undefined
        bar();
        // 此时 a = 21; b = 5;
    }

```

大多数类 C 语言语法的语言都拥有块级作用域。在一个代码块中 （括在一对花括号中的一组语句）定义的所有变量在代码块的外部都是不可见的。定义在代码块中的变量在代码块执行结束后会被释放掉，这是件好事。

糟糕的是，尽管 javascript 的代码块语法貌似支持块级作用域，但实际上 javascript 并不支持，这个混淆之处可能称为错误之源。

javascript 确实有函数作用域，那意味着定义在函数中的参数和变量在函数外部是不可见得，而在一个函数内部任何位置定义得变量，在该函数内部任何地方都可见。

现代很多语言都推荐尽可能延迟声明变量。而在 javascript 上的话却会称为糟糕的建议，因为它缺少块级作用域，所以最好的做法是在函数顶部声明函数中可能用到得所有变量。


## 闭包

作用域的好处是内部函数可以访问定义它们的外部函数的参数和变量（除了 this 和 arguments），这太美妙了。

我们的 getElementsByAttribute 函数可以工作，是因为它声明了一个 results 变量，而传递给 `walk_the_DOM` 的内部函数也可以访问到 results 变量。

一个更有趣的情形是内部函数拥有比它外部函数更长的生命周期。

之前构造了一个 myObject 对象，它拥有一个 value 属性和一个increment 方法。加订我们希望该值不被非法更改。和以对象字面量形式去初始化 myObject 不同，我们通过调用一个函数的形式去初始化 myObject ，该函数会返回一个对象字面量，函数定义了一个 value 变量。该变量对 increment 和 getValue 方法总是可用的，但函数的作用域使得它对其他的程序来说是不可见的。

```
    var myObject = (function () {
        var value = 0;
        return {
            increment:function (inc) {
                value += type inc === 'number'? inc:1;
            },
            getValue:function () {
                return value;
            }
        };
    }());

```
我们并没有把一个函数赋值给 myObject ，我们是把调用该函数返回的结果赋值给它。注意最后一行的 `()` 。该函数返回一个包含两个方法的对象，并且这些方法继续享有访问 value 变量的特权。

本章之前的 Quo 构造器产生一个带有 status 属性和 get_status 方法的对象。但那看起来并不是十分有趣。为什么要用一个 getter 方法去访问你本可以直接访问的属性呢？如果 status 是私有属性，它才是更有意义的。所以让我们定义另一种形式的 quo 函数来做此事：
```
    //创建一个名为 quo 的构造函数。构造出带有 get_status 方法和 status 私有属性的对象。
    var quo = function (status) {
        return {
            get_status:function () {
                return status;
            }
        };
    };

    //构造一个 quo 实例
    var myQuo = quo("amazed");
    document.writeln(myQuo.get_status());
    

```





