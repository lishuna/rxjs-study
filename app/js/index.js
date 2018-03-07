import Rx from 'rxjs/Rx';

var myObservable = new Rx.Subject();
myObservable.subscribe(value => console.log(value));
myObservable.next('foo');

// 发布者－》订阅者
var myObservable1 = Rx.Observable.create(observer => {
    observer.next('foo');
    setTimeout(() => observer.next('bar'), 1000);
});
myObservable1.subscribe(value => console.log('订阅者：' + value));