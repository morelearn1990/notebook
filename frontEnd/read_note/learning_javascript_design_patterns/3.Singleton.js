// 单例模式限制一个类只能有一个实例化对象。
// 经典的实现方式是，创建一个类，这个类包含一个方法，这个方法在没有对象存在的情况下，将会创建一个新的实例对象。
// 如果对象存在，这个方法只是返回这个对象的引用
// 在JavaScript语言中, 单例服务作为一个从全局空间的代码实现中隔离出来共享的资源空间是为了提供一个单独的函数访问指针。
var mySingleton = (function() {
    var instance;

    function init() {
        function privateMethod() {
            console.log('I am private');
        }
        var privateVar = 'I am also private';
        var randomNumber = Math.random;
        return {
            publicMethod: function() {
                console.log('I am public');
            },
            publicVar: 'public',
            getRandom: function() {
                return randomNumber;
            }
        };
    }

    return {
        getInstance() {
            // 如果实例存在则返回当前实例,如果不存在就创建一个新的实例并返回
            if (!instance) {
                instance = init();
            }
            return instance;
        }
    }
})();

var instance = mySingleton.getInstance()
instance.privateVar;


// 1.每个类只有一个实例，这个实例必须通过一个广为人知的接口，来被客户访问。
// 1.子类如果要扩展这个唯一的实例，客户可以不用修改代码就能使用这个扩展后的实例。

mySingleton.getInstance = function() {
    if (this._instance == null) {
        if (isFoo) {
            this._instance = new fooSingleton()
        } else {
            this._instance = new baseSingleton()
        }
    }
    return this._instance;
}


// 当一个对象需要和另外的对象进行跨系统协作的时候，单例模式很有用
var SingletonTester = (function() {
    function Singleton(options) {
        options = options || {};

        this.name = options.name || 'SingletonTester';
        this.pointX = options.pointX || 0;
        this.pointY = options.pointY || 0;

    }

    var instance;
    var _static = {
        getInstance(options) {
            if (instance == undefined) {
                instance = new Singleton(options);
            }
            return instance;
        }
    }
    return _static;
})();

var singletonTest = SingletonTester.getInstance({
    pointX: 9
})


// 尽管单例模式有着合理的使用需求，
// 但是通常当我们发现自己需要在javascript使用它的时候，
// 这是一种信号，表明我们可能需要去重新评估自己的设计。
// 这通常表明系统中的模块要么紧耦合要么逻辑过于分散在代码库的多个部分。单例模式更难测试，
// 因为可能有多种多样的问题出现，例如隐藏的依赖关系，很难去创建多个实例，很难清理依赖关系