// 简单构造器
// 缺点:1\难以继承，2\每个Car构造函数创建的对象中，toString()之类的函数都被重新定义
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;

    this.toString = function() {
        return `${this.model} has done ${this.miles} miles`;
    }
}
var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);
civic.toString();
mondeo.toString();


// 使用原型的构造器,toString方法被重(cong)用
function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}

Car.prototype.toString = function() {
    return `${this.model} has done ${this.miles} miles`;
}

var civic = new Car("Honda Civic", 2009, 20000);
var mondeo = new Car("Ford Mondeo", 2010, 5000);