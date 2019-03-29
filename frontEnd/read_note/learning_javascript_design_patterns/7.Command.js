// 命令模式的目标是将方法的调用,请求或者操作封装到一个单独的对象中,
// 给我们酌情执行同时参数化和传递方法调用的能力.
// 另外,它使得我们能将对象从实现了行为的对象对这些行为的调用进行解耦,
// 为我们带来了换出具体的对象这一更深程度的整体灵活性.
(function (window) {
  let CarManager = {
    requestInfo: function (model, id) {
      return "The information for " + model + " with ID " + id + " is foobar";
    },
    buyVehicle: function (model, id) {
      return "You have successfully purchased Item " + id + ", a " + model;
    },
    arrangeViewing: function (model, id) {
      return "You have successfully booked a viewing of " + model + " ( " + id + " ) ";
    }
  };

  CarManager.execute = function (name) {
    return CarManager[name] && CarManager[name].apply(CarManager, [].slice.call(arguments, 1));
  };

  window.CarManager = CarManager;
})(window);

CarManager.execute("arrangeViewing", "Ferrari", "14523");
CarManager.execute("requestInfo", "Ford Mondeo", "54323");
CarManager.execute("requestInfo", "Ford Escort", "34232");
CarManager.execute("buyVehicle", "Ford Escort", "34232");