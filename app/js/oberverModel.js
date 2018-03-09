// 主体 被观察者
class Subject {
    constructor() {
        this.collection = [];
    }
    registerObserver(observer) {
        this.collection.push(observer);
    }
    unRegisterObserver(observer) {
        let index = this.collection.indexOf(observer);
        index > 0 && this.collection.splice(index, 1);
    }
    notify() {
        this.collection.forEach(observer => observer.notify());
    }
}

class Observer {
    constructor(name) {
        this.name = name;
    }
    notify() {
        console.log(`${this.name}是观察者，${this.name}被通知了！`);
    }
}
export class Test {
    constructor() {
        let sub = new Subject();
        let observer1 = new Observer();
        observer1.name = 'Tom';

        let observer2 = new Observer();
        observer2.name = 'Lucy';

        sub.registerObserver(observer1);
        sub.registerObserver(observer2);
        sub.notify();
    }
}