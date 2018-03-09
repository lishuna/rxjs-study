import Rx from 'rxjs/Rx';
import { Test } from './oberverModel';

new Test();
Rx.Observable.of('foo', 'bar');

var myObservable = new Rx.Subject();
myObservable.subscribe(value => console.log(value));
myObservable.next('foo');

// 发布者－》订阅者
var myObservable1 = Rx.Observable.create(observer => {
    observer.next('foo');
    setTimeout(() => observer.next('bar'), 1000);
});
myObservable1.subscribe(value => console.log('订阅者：' + value));
window.onload = function() {
    var input = Rx.Observable.fromEvent(document.querySelector('input'), 'input');

    // 过滤掉小于3个字符长度的目标值
    input.filter(event => event.target.value.length > 2)
        .map(event => event.target.value)
        .subscribe(value => { console.log(value) });

    input.delay(200)
        .map(event => event.target.value)
        .subscribe(value => { console.log(`delay200:${value}`) });
    Rx.Observable.fromEvent(document.getElementsByTagName('button'), 'click')
        .scan(count => count + 1, 0)
        .subscribe(value => {
            document.getElementById('counter').innerHTML = value;
        })

}