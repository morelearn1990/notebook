// 一个中介者是一个行为设计模式，使我们可以导出统一的接口，这样系统不同部分就可以彼此通信。
// 如果系统组件之间存在大量的直接关系，就可能是时候，使用一个中心的控制点，来让不同的组件通过它来通信。
// 中介者通过将组件之间显式的直接的引用替换成通过中心点来交互的方式，来做到松耦合。
// 这样可以帮助我们解耦，和改善组件的重用性。

// 从实现角度来讲，中介者模式是观察者模式中的共享被观察者对象。
// 在这个系统中的对象之间直接的发布/订阅关系被牺牲掉了，取而代之的是维护一个通信的中心节点。

var mediator = (function () {
  let topics = {};

  function subscribe(topic, func) {
    if (!topics[topic]) {
      topics[topic] = [];
    }
    topics[topic].push({
      context: this,
      callback: func
    })
    return this;
  }

  function publish(topic) {
    var args;
    if (!topics[topic]) {
      return false
    }
    args = Array.prototype.slice.call(arguments, 1);
    for (let i = 0; i < topics[topic].length; i++) {
      var subscription = topics[topic][i];
      subscription.callback.apply(subscription.context, args)
    }
    return this;
  }
  return {
    publish,
    subscribe,
    installTo: function (obj) {
      obj.subscribe = subscribe;
      obj.publish = publish;
    }
  }
})();


// 中介者高级实现方式
// 在其它方面的改进当中,为我们的中间人支持主题命名空间,用户拆卸和一个更加稳定的发布/订阅系统

(function (root) {
  function guidGenerator() {}

  function Subscriber(fn, options, context) {
    if (!(this instanceof Subscriber)) {
      return new Subscriber(fn, options, context)
    } else {
      this.id = guidGenerator();
      this.fn = fn;
      this.options = options;
      this.context = context;
      this.topic = null;
    }
  }

  function Topic(namespace) {
    if (!(this instanceof Topic)) {
      return new Topic(namespace);
    } else {
      this.namespace = namespace || '';
      this._callbacks = [];
      this._topics = [];
      this.stopped = false;
    }
  }

  Topic.prototype = {
    AddSubscriber(fn, options, context) {
      var callback = new Subscriber(fn, options, context);
      this._callbacks.push(callback);
      callback.topic = this;
      return callback;
    },
    StopPropagation() {
      this.stopped = true;
    },
    GetSubscriber(identifier) {
      for (let i = 0, len = this._callbacks.length; i < len; i++) {
        let callback = this._callbacks[i]
        if (callback.id == identifier || callback.fn === identifier) {
          return callback
        }
      }
      for (let t in this.topics) {
        if (this.topics.hasOwnProperty(t)) {
          let sub = this._topics[t].GetSubscriber(identifier);
          if (sub !== undefined) {
            return sub
          }
        }
      }
    },
    AddTopic(topic) {
      this._topics[topic] = new Topic(this.namespace ? this.namespace : '')
    },
    HasTopic(topic) {
      return this._topics.hasOwnProperty(topic);
    },
    ReturnTopic(topic) {
      return this._topics[topic];
    },
    RemoveSubscriber(identifier) {
      if (!identifier) {
        this._callbacks = [];
        for (let t in this._topics) {
          if (this._topics.hasOwnProperty(t)) {
            this._topics[t].RemoveSubscriber(identifier);
          }
        }
      }
      for (let i = 0, len = this._callbacks.length; i < len; i++) {
        let callback = this._callbacks[i];
        if (callback.fn == identifier || callback.id == identifier) {
          callback.topic = null;
          this._callbacks.splice(i, 1)
          i--;
          len--;
        }
      }
    },
    Publish(data) {
      for (let i = 0, len = this._callbacks.length; i < len; i++) {
        let callback = this._callbacks[i];
        let l;
        callback.fn.apply(callback.context, data);
        l = this._callbacks.length;
        if (l < len) {
          i--;
          len = l
        }
      }
      for (let t in this._topics) {
        if (this._topics.hasOwnProperty(t)) {
          this._topics[t].Publish(data)
        }
      }
      this.stopped = false
    }
  }

  function Mediator() {
    if (!(this instanceof Mediator)) {
      return new Mediator()
    } else {
      this._topics = new Topic('')
    }
  }
  Mediator.prototype = {
    GetTopic(namespace) {
      let topic = this._topics;
      let namespaceHierarchy = namespace.split(':');
      if (namespace == '') {
        return topic;
      }
      if (namespaceHierarchy.length > 0) {
        for (let i = 0; i < namespaceHierarchy.length; i++) {
          if (!topic.HasTopic(namespaceHierarchy[i])) {
            topic.AddTopic(namespaceHierarchy[i])
          }
          topic = topic.ReturnTopic(namespaceHierarchy[i])
        }
      }
      return topic
    },
    Subscribe(topicName, fn, options, context) {
      options = options || {};
      context = context || {};
      let topic = this.GetTopic(topicName);
      let sub = topic.AddSubscriber(fn, options, context);
      return sub
    },
    GetSubscriber(identifier, topic) {
      return this.GetTopic(topic || '').GetSubscriber(identifier);
    },
    Remove(topicName, identifier) {
      this.GetTopic(topicName).RemoveSubscriber(identifier);
    },
    Publish: function (topicName) {
      let args = Array.prototype.slice.call(arguments, 1);
      let topic = this.GetTopic(topicName);
      args.push(topic);
      this.GetTopic(topicName).Publish(args);
    }
  }

  root.Mediator = Mediator;
  Mediator.Topic = Topic;
  Mediator.Subscriber = Subscriber;
})(window);


// 中间人模式最大的好处就是，它节约了对象或者组件之间的通信信道，这些对象或者组件存在于从多对多到多对一的系统之中。
// 由于解耦合水平的因素，添加新的发布或者订阅者是相对容易的。