// 工厂模式是另外一种关注对象创建概念的创建模式。
// 它的领域中同其它模式的不同之处在于它并没有明确要求我们使用一个构造器。
// 取而代之，一个工厂能提供一个创建对象的公共接口，我们可以在其中指定我们希望被创建的工厂对象的类型。

// 当被应用到下面的场景中时，工厂模式特别有用：
// 1.当我们的对象或者组件设置涉及到高程度级别的复杂度时.
// 2.当我们需要根据我们所在的环境方便的生成不同对象的实体时.
// 3.当我们在许多共享同一个属性的许多小型对象或组件上工作时.
// 4.当带有其它仅仅需要满足一种API约定(又名鸭式类型)的对象的组合对象工作时.这对于解耦来说是有用的.

// 当被应用到错误的问题类型上时,这一模式会给应用程序引入大量不必要的复杂性.
// 除非为创建对象提供一个接口是我们编写的库或者框架的一个设计上目标,
// 否则我会建议使用明确的构造器,以避免不必要的开销.
function Car(options) {
  this.doors = options.doors || 4;
  this.state = options.state || 'brand new';
  this.color = options.color || 'silver';
}

function Truck(options) {
  this.state = options.state || 'used';
  this.wheelSize = options.wheelSize || 'large';
  this.color = options.color || 'blue';
}

function VehicleFactory() {}

VehicleFactory.prototype.vehicleClass = Car;
VehicleFactory.prototype.createCar = function (options) {
  if (options.vehicleType == 'car') {
    this.vehicleClass = Car;
  } else {
    this.vehicleClass = Truck;
  }
  return new this.vehicleClass(options)
};

var carFactory = new VehicleFactory();
var car = carFactory.createVehicle({
  vehicleType: "car",
  color: "yellow",
  doors: 6
});

var movingTruck = carFactory.createVehicle({
  vehicleType: "truck",
  state: "like new",
  color: "red",
  wheelSize: "small"
});

// 做 VehicleFactory的子类用于创建一个工厂类生产 Trucks
function TruckFactory() {}
TruckFactory.prototype = new VehicleFactory();
TruckFactory.prototype.vehicleClass = Truck;

var truckFactory = new TruckFactory();
var myBigTruck = truckFactory.createVehicle({
  state: "omg..so bad.",
  color: "pink",
  wheelSize: "so big"
});



// Abstract Factories

// 了解抽象工厂模式也是非常实用的,它的目标是以一个通用的目标将一组独立的工厂进行封装.
// 它将一堆对象的实现细节从它们的一般用例中分离.
// 抽象工厂应该被用在一种必须从其创建或生成对象的方式处独立,或者需要同多种类型的对象一起工作,这样的系统中.

var AbstractVehicleFactory = (function () {
  var types = {};
  return {
    getVehicle(type, customizations) {
      var Vechile = types[type];
      return Vechile ? new Vechile(customizations) : null
    },
    registerVehicle(type, Vechile) {
      var proto = Vechile.prototype;
      if (proto.drive && proto.breakDown) {
        types[type] = Vehicle;
      }
      return AbstractVehicleFactory;
    }
  }
})();

AbstractVehicleFactory.registerVehicle("car", Car);
AbstractVehicleFactory.registerVehicle("truck", Truck);

var car = AbstractVehicleFactory.getVehicle("car", {
  color: "lime green",
  state: "like new"
});
var truck = AbstractVehicleFactory.getVehicle("truck", {
  wheelSize: "medium",
  color: "neon yellow"
});