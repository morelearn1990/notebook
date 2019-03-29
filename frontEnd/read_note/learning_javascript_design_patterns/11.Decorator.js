// 装饰器是旨在提升重用性能的一种结构性设计模式。
// 同Mixin类似，它可以被看作是应用子类划分的另外一种有价值的可选方案。

// 典型的装饰器提供了向一个系统中现有的类动态添加行为的能力
// 不同于子类划分，我们向一个基础对象添加（装饰）属性或者方法，因此它会是更加轻巧的。

// 带有新功能的装饰构造器
function Vechile(vechileType) {
  this.vehicleType = vehicleType || "car";
  this.model = "default";
  this.license = "00000-000";
}
var car = new vehicle("car");
var truck = new vehicle("truck");
truck.setModel = function (modelName) {
  this.model = modelName;
};
truck.setColor = function (color) {
  this.color = color;
};
truck.setModel("CAT");
truck.setColor("blue");
var car2 = new vehicle("car");


// 带有多个装饰器的装饰对象
function MacBook() {
  this.cost = function () {
    return 997;
  };
  this.screenSize = function () {
    return 11.6;
  };
}
// Decorator 1
function Memory(macbook) {
  var v = macbook.cost();
  macbook.cost = function () {
    return v + 75;
  };
}
// Decorator 2
function Engraving(macbook) {
  var v = macbook.cost();
  macbook.cost = function () {
    return v + 200;
  };
}
// Decorator 3
function Insurance(macbook) {
  var v = macbook.cost();
  macbook.cost = function () {
    return v + 250;
  };
}
var mb = new MacBook();
Memory(mb);
Engraving(mb);
Insurance(mb);
// Outputs: 1522
console.log(mb.cost());
// Outputs: 11.6
console.log(mb.screenSize());


// Pseudo-classical Decorators
var reminder = new Interface("List", ["summary", "placeOrder"]);
var properties = {
  name: "Remember to buy the milk",
  date: "05/06/2016",
  actions: {
    summary: function () {
      return "Remember to buy the milk, we are almost out!";
    },
    placeOrder: function () {
      return "Ordering milk from your local grocery store";
    }
  }
};

function Todo(config) {
  Interface.ensureImplements(config.actions, reminder);
  this.name = config.name;
  this.methods = config.actions;
}
var todoItem = Todo(properties);