// 我们能够将原型模式认作是基于原型的继承中,我们创建作为其它对象原型的对象.
// 原型对象自身被当做构造器创建的每一个对象的蓝本高效的使用着.
// 如果构造器函数使用的原型包含例如叫做name的属性,那么每一个通过同一个构造器创建的对象都将拥有这个相同的属性.

var myCar = {
  name: "Ford Escort",
  drive: function () {
    console.log("Weeee. I'm driving!");
  },
  panic: function () {
    console.log("Wait. How do you stop this thing?");
  }
};
var yourCar = Object.create(myCar);
console.log(yourCar.name);


// 不使用 Object.create() 创建原型

let vehicleProto = {
  init(carModel) {
    this.model = carModel;
  },
  getModel() {
    console.log('The model of this vehicle is ' + this.model);
  }
}

function vehicle(model) {
  function F() {}
  F.prototype = vehicleProto
  var f = new F();
  f.init(model)
  return f
}

var car = vehicle("Ford Escort");
car.getModel();


// 最后一中实现方法
let begat = (function () {
  function F() {}
  return function (proto) {
    F.prototype = proto;
    return new F();
  };
})();

var foo = begat({
  a: 10
});
foo.a;

// ES6
class Animal {
  constructor() {}
  run() {}
}

class Dog extends Animal {
  constructor() {
    super()
  }
}

let dog = new Dog();
dog.run()