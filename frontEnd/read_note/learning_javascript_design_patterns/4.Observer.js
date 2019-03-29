// 观察者模式是这样一种设计模式。一个被称作被观察者的对象，维护一组被称为观察者的对象，
// 这些对象依赖于被观察者，被观察者自动将自身的状态的任何变化通知给它们。

// 被观察者：维护一组观察者， 提供用于增加和移除观察者的方法。
// 观察者：提供一个更新接口，用于当被观察者状态变化时，得到通知。
// 具体的被观察者：状态变化时广播通知给观察者，保持具体的观察者的信息。
// 具体的观察者：保持一个指向具体被观察者的引用，实现一个更新接口，用于观察，以便保证自身状态总是和被观察者状态一致的。


function ObserverList() {
    this.observerList = [];
}

ObserverList.prototype.Add = function(obj) {
    return this.observerList.push(obj)
}

ObserverList.prototype.Empty = function() {
    this.observerList = [];
}
ObserverList.prototype.Count = function() {
    return this.observerList.length;
}

ObserverList.prototype.Get = function(index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index]
    }
}

ObserverList.prototype.Insert = function(obj, index) {
    var point = -1;
    if (index == 0) {
        this.observerList.unshift(obj)
        point = index;
    }
    if (index > this.observerList.length) {
        this.observerList.push(obj)
        point = index;
    }
    return point;
}

ObserverList.prototype.IndexOf = function(obj, startIndex) {
    var i = startIndex,
        pointer = -1;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            pointer = i;
        }
        i++;
    }

    return pointer;
};

ObserverList.prototype.RemoveAt = function(index) {
    if (index === 0) {
        this.observerList.shift();
    } else if (index === this.observerList.length - 1) {
        this.observerList.pop();
    }
};

function Subject() {
    this.observers = new ObserverList();
}

Subject.prototype.AddObserver = function(observer) {
    this.observers.Add(observer);
};

Subject.prototype.RemoveObserver = function(observer) {
    this.observers.RemoveAt(this.observers.IndexOf(observer, 0));
};

Subject.prototype.Notify = function(context) {
    var observerCount = this.observers.Count();
    for (var i = 0; i < observerCount; i++) {
        this.observers.Get(i).Update(context);
    }
};

function Observer(name) {
    this.name = name
    this.Update = function(context) {
        console.log(this.name, context)
    };
}

let observer1 = new Observer('ob1');
let observer2 = new Observer('ob2');
let observer3 = new Observer('ob3');
let sub = new Subject();

sub.AddObserver(observer1)
sub.AddObserver(observer2)
sub.AddObserver(observer3)
sub.Notify('aaaa')


// 发布订阅模式
// 观察者模式要求想要接受相关通知的观察者必须到发起这个事件的被观察者上注册这个事件。
// 发布/订阅模式使用一个主题/事件频道，这个频道处于想要获取通知的订阅者和发起事件的发布者之间。
// 这个事件系统允许代码定义应用相关的事件，这个事件可以传递特殊的参数，参数中包含有订阅者所需要的值。
// 这种想法是为了避免订阅者和发布者之间的依赖性。
// 观察者和发布/订阅模式鼓励人们认真考虑应用不同部分之间的关系，同时帮助我们找出这样的层，
// 该层中包含有直接的关系，这些关系可以通过一些列的观察者和被观察者来替换掉。
// 这中方式可以有效地将一个应用程序切割成小块，这些小块耦合度低，从而改善代码的管理，以及用于潜在的代码复用。

var publishSub = {};
(function(sub) {
    var topics = {};
    var subUid = -1;
    sub.publish = function(topic, args) {
        if (!topics[topic]) {
            return false;
        }
        var subscribers = topics[topic];
        var len = subscribers ? subscribers.length : 0

        while (len--) {
            subscribers[len].func(topic, args);
        }
        return this;
    }
    sub.subscribe = function(topic, func) {
        if (!topics[topic]) {
            topics[topic] = [];
        }
        var token = (++subUid).toString();
        topics[topic].push({
            token,
            func
        });
        return token;
    }

    sub.unsubscribe = function(token) {
        for (var t in topics) {
            if (topics[t]) {
                for (let i = 0; i < topics[t].length; i++) {
                    if (topics[t][i].token === token) {
                        topics[t].splice(i, 1);
                        return token;
                    }
                }
            }
        }
        return this;
    }

})(publishSub);

var messageLogger = function(topics, data) {
    console.log("Logging: " + topics + ": " + data);
};

var subscription = publishSub.subscribe("inbox/newMessage", messageLogger);
publishSub.publish("inbox/newMessage", "hello world!");


// 这些模式的一些问题实际上正是来自于它们所带来的一些好处。
// 在发布/订阅模式中，将发布者共订阅者上解耦，将会在一些情况下，
//导致很难确保我们应用中的特定部分按照我们预期的那样正常工作。
// 因为系统本身的解耦本质，发布者没有办法感知到这些事情。

// 订阅者对彼此之间存在没有感知，对切换发布者的代价无从得知。
// 因为订阅者和发布者之间的动态关系，更新依赖也很能去追踪。