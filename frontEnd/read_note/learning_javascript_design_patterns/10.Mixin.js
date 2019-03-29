// 混合模式

// 混合模式就是一些提供能够被一个或者一组子类简单继承功能的类,意在重用其功能.

// 子类划分是一个参考了为一个新对象继承来自一个基类或者超类对象的属性的术语.
// 在传统的面向对象编程中,类B能够从另外一个类A处扩展.
// 这里我们将A看做是超类,而将B看做是A的子类.
// 如此,所有B的实体都从A处继承了其A的方法.
// 然而B仍然能够定义它自己的方法,包括那些重载的原本在A中的定义的方法.
function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.gender = "male";
};

var clark = new Person("Clark", "Kent");

function Superhero(firstName, lastName, powers) {
  Person.call(this, firstName, lastName);
  this.powers = powers;
};
SuperHero.prototype = Object.create(Person.prototype);
var superman = new Superhero("Clark", "Kent", ["flight", "heat-vision"]);
console.log(superman);



// 它们可以被看做是其属性和方法可以很容易的在其它大量对象原型共享的对象.
// 想象一下我们定义了一个在一个标准对象字面量中含有实用功能的Mixin,如下所示:
var myMixins = {
  moveUp: function () {
    console.log("move up");
  },
  moveDown: function () {
    console.log("move down");
  },
  stop: function () {
    console.log("stop! in the name of love!");
  }
};

function carAnimator() {
  this.moveLeft = function () {
    console.log("move left");
  };
}

function personAnimator() {
  this.moveRandomly = function () { /*..*/ };
}

_.extend(carAnimator.prototype, myMixins);
_.extend(personAnimator.prototype, myMixins);

var myAnimator = new carAnimator();
myAnimator.moveLeft();
myAnimator.moveDown();
myAnimator.stop();


// 一个扩展一个对象上的属性的方法，使用该方法可以将对象混很到目标对象上去
function augment(receivingClass, givingClass) {
  if (arguments[2]) {
    for (var i = 2, len = arguments.length; i < len; i++) {
      receivingClass.prototype[arguments[i]] = givingClass.prototype[arguments[i]];
    }
  } else {
    for (var methodName in givingClass.prototype) {
      if (!Object.hasOwnProperty(receivingClass.prototype, methodName)) {
        receivingClass.prototype[methodName] = givingClass.prototype[methodName];
      }
    }
  }
}

// Mixin支持在一个系统中降解功能的重复性,增加功能的重用性.
// 在一些应用程序也许需要在所有的对象实体共享行为的地方,
// 我们能够通过在一个Mixin中维护这个共享的功能,来很容易的避免任何重复,
// 而因此专注于只实现我们系统中真正彼此不同的功能.

// 一些开发者感觉将功能注入到对象的原型中是一个坏点子,
// 因为它会同时导致原型污染和一定程度上的对我们原有功能的不确定性.在大型的系统中,很可能是有这种情况的.