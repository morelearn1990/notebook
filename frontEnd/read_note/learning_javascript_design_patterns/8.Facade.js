// 当我们提出一个外观模式，我们要向这个世界展现的是一个外观，这一外观可能藏匿着一种非常与众不同的真实实现
// 外观模式是一种经常可以在Javascript库中看到的结构性模式，
// 像在jQuery中，尽管一种实现可能支持带有广泛行为的方法，
// 但仅仅只有这些方法的“外观”或者说被限制住的抽象才会公开展现出来供人们所使用。

var module = (function () {
  var _private = {
    i: 5,
    get: function () {
      console.log("current value:" + this.i);
    },
    set: function (val) {
      this.i = val;
    },
    run: function () {
      console.log("running");
    },
    jump: function () {
      console.log("jumping");
    }
  };

  return {
    facade: function (args) {
      _private.set(args.val);
      _private.get();
      if (args.run) {
        _private.run();
      }
    }
  };
}());
module.facade({
  run: true,
  val: 10
});

// 门面一般没有多少缺陷，但是性能是值得注意的问题