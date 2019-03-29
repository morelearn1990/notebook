// 模块化模式有助于保持应用项目的代码单元既能清晰地分离又有组织
// 模块模式使用闭包的方式来将"私有信息",状态和组织结构封装起来。
// 提供了一种将公有和私有方法，变量封装混合在一起的方式，
// 这种方式防止内部信息泄露到全局中，从而避免了和其它开发者接口发生冲图的可能性
var testModule = (function() {
    var count = 0;

    return {
        incrementCount() {
            return count++;
        },
        resetCount() {
            count = 0;
            console.log('count has reset to 0')
        }
    }
})()

testModule.incrementCount()
testModule.resetCount()


// 暴露模式是模块模式的变种,能将内部模块以更好的命名方式暴露出来
// 缺点是如果私有函数需要使用公有函数，那么这个公有函数在需要打补丁的时候就不能被重载
// 上面这句话没搞明白
var testModule = (function() {
    var count = 0;

    function incrementCount() {
        return count++;
    }

    function resetCount() {
        count = 0;
        console.log('count has reset to 0')
    }

    return {
        increment: incrementCount,
        reset: resetCount
    }
})()

testModule.increment()
testModule.reset()