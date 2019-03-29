# Object

## 构造函数

```
//当以非构造函数形式调用时， Object() 和 new Object() 方法作用相同

// 对象初始化器和对象字面量
// Object({nameValuePair1[,...nameValuePairN]})
Object({a:'1'})

// 以构造函数形式使用
//Object([value])
Object(1)  // new Number(1)
Object('a')  // new String('a')

Object(null)  // {}
Object(undefined) //{}
```

## Object 构造函数的属性

```
Object.length  //1
Object.prototype  //可以为所有 Object 类型添加属性
```

## Object 原型对象

### Object.prototype.constuctor

返回创建实例对象的 Object 构造函数的引用，此属性的值是对函数本身的引用，而不是包含函数名的字符串

### Object.prototype.hasOwnProterty()

返回一个布尔值，指示对象自身属性中是否具有指定的属性,该方法会忽略掉那些从圆形脸上继承到的属性
```
obj.hasOwnProperty(prop)

// JavaScript 并没有保护 hasOwnProperty 属性名，有可能被改写，使用以下方法使用避免这样的情况
let foo = {
  hasOwnProterty(){
    return false;
  },
  bar:"Here be dragons"
};
foo.hasOwnProperty('bar')  // false
Object.prototype.hasOwnProperty.call(foo,'bar')
({}).hasOwnProperty.call(foo,'bar')
```

### Object.prototype.isPrototypeOf()

```
prototypeObj.isPrototypeOf(obj)
```

用于测试一个对象是否存在于另一个对象的原型链上

`isPrototypeOf()` 和 `instanceof` 运算符不同，在表达式 "object instanceof AFunction" 中，object 的原型链是针对 AFunction.prototyp 进行检查的，而不是针对 AFunction 本身

如果 prototypeObj 为 `undefined` 或者 `null`，会抛出 TypeError

### Object.prototype.propertyIsEnumerable()

```
obj.propertyIsEnumerable(prop)
```

返回一个布尔值，表示指定属性是否可枚举

此方法可以确定对象中指定的属性是否可以被 `for...in` 循环枚举，通过原型链继承的方法除外，如果没有指定属性，返回 `false` 。

### Object.prototype.toLocalString()

```
obj.toLocalString();
```

返回一个该对象的字符串表示，此方法用于派生对象为了特定语言环境的目的（local-specific purposes）而重载使用

### Object.prototype.toString()

返回一个表示该对象的字符串。

```
let objToString = new Object();
objToString.toString() // [object Object]
```

可以自定义一个方法来覆盖默认的 `toString()` 方法

>使用 `toString()` 检测对象类型

```
let toString = Object.prototype.toString;

toString.call(new Date); // [object Date]
toString.call(new String); // [object String]
toString.call('aaaaa'); // [object String]
toString.call(23); // [object Number]

toString.call(undefined); // [object Undefined]
toString.call(null); // [object Null]
```

### Object.prototype.valueOf()

返回指定对象的原始值

JavaScript 调用 `valueOf` 方法将对象转换为原始值，很少需要自己调用 `valueOf` 方法，当遇到要预期的原始值的对象时，JavaScript 会自动调用它。

>不同类型对象的 valueOf() 方法的返回值

|对象|返回值
|---|---|
Array|返回数组对象本身
Boolean|布尔值
Date|储存的时间从1970年1月1日午夜开始计时的毫秒数 UTC
Function|函数本身
Number|数字值
Object|对象本身
String|字符串值
|Math 和 Error 对象没有 valueOf 方法

## Object 构造函数的方法

### Object.assign()

将所有可枚举属性的值从一个或多个源对象复制到目标对象并返回目标对象

目标对象中具有相同的键将会被源对象中的属性覆盖，后来的源属性将类似地覆盖早先的属性。且该方法会改变目标对象。
```
let o1 = {a:1,b:2,c:3}
let o2 = {b:3,d:5,e:6}
let o3 = {d:8}
let obj = Object.assign(o1,o2,o3) 
// obj = {a:1,b:3,c:3,d:8,e:6} 
// o1 = {a:1,b:3,c:3,d:8,e:6}
// obj === o1  true
```
该方法不会跳过那些值为 `null` 或 `undefined` 的源属性,原始类型会被包装成对象，但只有字符串的包装对象才可能有自身的可枚举属性，且如果源对象的属性值是一个指向对象的引用，它也只拷贝那个引用值。
```
let o1 = {a:1,b:2,c:3}
let o2 = {b:undefined,c:null}
let obj = Object.assign(o1,o2) 
// obj = {a:1,b:undefined,c:null}

let v1 = 'abc';
let v2 = true;
let v3 = 10;
let v4 = Symbol('foo')

let obj2 = Object.assign(v1,v2,v3,v4)
// obj2 = {'0':'a','1':'b','3':'c'}
```
String 和 Symbol 类型的属性都会被拷贝，继承和不可枚举属性是不能拷贝的。
```
var obj3 = Object.create({foo:1},{ // foo 继承属性 
  bar:{value:1},// bar 不可枚举属性
  baz:{value:3,enumerable:true}, //baz 自身可枚举属性
})

let obj4 = Object.assign({},obj3)
// obj4 = {baz:3}

```
发生异常后会打断后续的拷贝任务
该方法使用源对象的[[Get]]和目标对象的[[Set]]，所以他会调用相关的 `getter` 和 `setter` ，因此它分配属性而不仅仅是复制或定义新的属性，如果目标对象包含 `getter` 或只读属性，这可能使其不适合将新属性合并到目标对象中。

### Object.create()

```
Object.create(proto,[propertiesObject])
```

创建一个新对象，使用现有的对象来提供新创建对象的`__proto__`。

`proto` 新创建对象的原型对象，`propertiesObject` 要添加到新创建对象的可枚举属性（其自身定义的属性，而不是原型链上的可枚举属性）对象的属性描述符以及相应的属性名称。

>用 `Object.create` 实现单类继承

```
function Shape(){
  this.x = 0;
  this.y = 0;
}
Shape.prototype.move = function(x,y){
  this.x += x;
  this.y += y;
}
function Rectangle(){
  Shape.call(this);
}

Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

let rect = new Rectangle();

rect instanceof Rectangle; //true
rect instanceof Shape; //true

```

>继承对个对象，使用混入的方式

```
function SubClass(){
  SuperClass.call(this);
  OtherSuperClass.call(this);
}
SubClass.prototype = Object.create(SuperClass.prototype)
Object.assign(SubClass.prototype,OtherSuperClass.prototype)
SubClass.prototype.constructor = SubClass
SubClass.prototype.method = function(){}
```
> 和 new Object() 的比较

```
let o
o = {}
o = new Object()
o = Object.create(Object.prototype) // 效果等同于 new Object() 但是如果在 constructor 里面有一些初始化代码，Object.create 不能执行这些代码。
```

> 使用 protertiesObject 参数

```
let o = Object.create({},{
  foo:{
    writable:true,  // 默认是 false
    configurable:true, // 默认是 false
    enumerable:true, // 默认是 false
    value:'hello'
  },
  bar:{
    writable:true,
    configurable:true,
    get(){
      return 10
    },
    set(value){
      console.log(value)
    }
  },
  q:{
    value:43
  }
})

for(let prop in o){
  console.log(prop)
}
// foo
```

### Object.defineProperty()

```
Object.defineProperty(obj,prop,descriptor)
```

直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象

该方法允许精确添加或修改对象的属性。通过赋值来添加的普通属性会创建在属性枚举期间显示的属性（ `for...in` 或 `Object.keys` ），这些值可以被改变，也可以被删除。而通过该方法允许这些额外的细节从默认值改变。默认情况下，`Object.defineProperty()` 添加的属性值是不可改变的。

对象里面存在两种属性描述符：数据描述符和存取描述符。

>他们同时具有以下可选键值
+ `configurable` 且当为 true 时，该属性的描述符才能够被改变，同时也能被删除，默认是 false
+ `enumerable` 且当为 true 时，该属性能够出现在对象的可枚举属性中，默认是 false
>数据描述符具有以下可选键值
+ `value` 该属性的值，可以是任意有效的 JavaScript 值，默认是 undefined
+ `writable` 且当为 true 时，value 才能被赋值运算符改变，默认为 false
> 存取描述符具有以下可选建值
+ `get` 一个给属性提供 getter 的方法，该方法返回值被作属性值，默认 undefined
+ `set` 一个给属性提供 setter 的方法，该方法将接受唯一参数，并将该参数的新值分配给该属性，默认 undefined

如果一个描述符不具有 value，writable，get，set 中的任意一个关键字，那么将被认为是一个数据描述符，如果同时有（value 或 writable）和（get 或 set）关键字，将产生一个异常

### Object.defineProperties()

```
Object.defineProperties(obj,props)
```

直接在一个对象上定义新的属性或修改现有属性，并返回该对象

参数 props 是 `Object.defineProperty(obj,prop,descriptor)` prop 和 descriptor 的键值对集合

```
let objDefine = {}
Object.defineProperties(objDefine,{
  'property1':{
    value:true,
    writable:true
  },
  'property2':{
    enumerable:true,
    get(){
      return 10
    },
    set(){
      console.log('set')
    }
  }
})

```

### Object.getOwnPropertyDescriptor

```
Object.getOwnPropertyDescriptor(obj,prop)
```

返回指定对象上一个自有属性对应的属性描述符，如果指定对象属性存在于对象上，则返回其属性描述符对象，否则返回 `undefined`。

### Object.getOwnPropertyDescriptors

```
Object.getOwnPropertyDescriptors(obj)
```

返回所指定对象的所有自身属性的描述符，如果没有任何自身属性，则返回空对象。

>浅拷贝一个对象

`Object.assign()`方法只能拷贝源对象的可枚举的自身属性，也无法拷贝属性的特性，访问器属性会被转换为数据属性，也无法拷贝对象的原型。配合 `Object.create()` 一下代码能实现上面的这些

```
Object.create(
  Object.getPrototypeOf(obj),
  Object.getOwnPropertyDescriptors(obj)
)
```

>创建子类

创建子类的典型方法是定义子类，将其原型设置为超类的实例，然后在该实例上定义属性，但是对于 `getter` 和 `setter` 而言，会存在一些问题。相反，可以使用下面的代码设置原型：

```
function SuperClass(){}
SuperClass.prototype = {
  //在这儿定义方法和属性
}

function subclass(){}
subclass.prototype = Object.create(SuperClass.prototype,Object.getOwnPropertyDescriptors({
  // 这儿定义方法和属性，可以使用 getter 和 setter
}))
```

### Object.getOwnPropertyNames()

```
Object.getOwnPropertyNames(obj)
```

返回给定对象的所有自身属性的属性名（包括不可枚举属性，但不包括`Symbol` 值作为名称的属性）组成的数组。

可枚举排列与使用`for...in`循环遍历该对象时返回的顺序一致（区别在于 `for...in`循环也枚举原型链中的属性）不可枚举的属性的顺序未定义。

### Object.getOwnPropertySymbols()

```
Object.getOwnPropertySymbols(obj)
```

返回给定对象上所有的 `Symbol` 属性的数组

### Object.getPrototypeOf()

```
Object.getPrototypeOf(obj)
```

返回给定对象的原型，如果没有原型，则返回 `null`

### Object.setPrototypeOf()

```
Object.setPrototypeOf(obj, prototype)
```

设置一个指定对象的原型到另一个对象或者 `null`,如果被设置对象被冻结或者设置为不可扩展，则返回异常，如果 prototype 不是一个对象或者 `null` 则什么都不用做。更改 `[[Prototype]]` 是一个很慢的操作，如果对于性能有要求建议使用 `Object.create()`

### Object.is()

```
Object.is(obj1,obj2)
```

判断两个值是否相同的值，如果下列任何一项成立，则两个值相同：
+ 都是 `undefined`
+ 都是 `null`
+ 都是 `true` 或者 `false`
+ 都是由相同个数的字符按照相同的顺序组成的字符串
+ 都指向同一个对象
+ 都是数字且都是 `+0` 、 `-0` 、 `NaN` 或都是除零和 `NaN` 以外的其他相同的数字

和 `==` 不一样，`==` 会做隐式转换
和 `===` 也不一样，`+0 === -0`,`NaN !== NaN`


### Object.entries()

```
Object.entries(obj)
```

返回一个给定对象自身可枚举属性的键值对数组，其排列与使用`for...in`循环遍历该对象时返回的顺序一致（区别在于 `for...in`循环也枚举原型链中的属性）

### Object.keys()

```
Object.keys(obj)
```

返回给定对象自身可枚举属性组成的数组，数组中的属性名的排列顺序和`for...in` 循环遍历该对象时返回的顺序一样（区别在于 `for...in`循环也枚举原型链中的属性）

### Object.values()

```
Object.values(obj)
```

返回对象自身所有可枚举属性值的数组，数组中的属性值的排列顺序和`for...in` 循环遍历该对象时返回的顺序一样（区别在于 `for...in`循环也枚举原型链中的属性）

### Object.freeze()

可以冻结一个对象，并返回被冻结的对象。

被冻结的对象，自身的所有属性都不可能以任何形式被修改。

### Object.isFrozen()

判断一个对象是否被冻结

### Object.seal()

封闭一个对象，阻止添加新的属性并将所有现有自身属性标记为不可配置，当前的属性的值只要可写就可以改变。

### Object.isSealed()

判断一个对象是否被密封。密封对象是指那些不可扩展的，且所有自身属性都不可配置且因此不可被删除（但不一定是不可写的）的对象。

### Object.preventExtensions()

让一个对象变得不可扩展，也就永远不能添加新的属性

### Object.isExtensible()

判断一个对象是否可扩展的（是否可在在它上面添加新的属性）