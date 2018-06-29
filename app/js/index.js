import Rx from 'rxjs/Rx';
import Observable from 'rxjs/Observable';
import { of, from } from 'rxjs/operators';
import { fromEvent } from 'rxjs/index';
import {
    Test
} from './oberverModel';
import {
    subTest
} from './dataSource';
import { rxjsTest } from './rxjs-test';

// -------------模拟观察者模式------------------
// new Test();
// Rx.Observable.of('foo', 'bar');

// var myObservable = new Rx.Subject();
// myObservable.subscribe(value => console.log(value));
// myObservable.next('foo');

// // 发布者－》订阅者
// var myObservable1 = Rx.Observable.create(observer => {
//     observer.next('foo');
//     setTimeout(() => observer.next('bar'), 1000);
// });
// myObservable1.subscribe(value => console.log('订阅者：' + value));


// // ---------------返回多值-------------------
// let myObservable2 = Rx.Observable.create(observer => {
//     observer.next(1);
//     observer.next(2);
//     observer.next(3);
//     setTimeout(() => {
//         observer.next(4);
//     }, 1000);
//     observer.complete();
//     observer.next(5);
// });
// console.log('subscribe start');
// myObservable2.subscribe({
//     next: x => console.log(x + 'next run!'),
//     complete: () => console.log('done!')
// });
// console.log('subscribe end');

// // --------------取消订阅---------------
// let myObservable3 = Rx.Observable.from([10, 20, 30]);
// let subObj = myObservable3.subscribe((x) => console.log(x));
// subObj.unsubscribe();
// myObservable3.subscribe((x) => console.log(x));

// // -------------取消订阅队列-------------------
// let myObservable4 = Rx.Observable.interval(400);
// let myObservable4_sub = Rx.Observable.interval(300);

// let subscribtion = myObservable4.subscribe(x => console.log('frist:' + x));
// let subscribtion_sub = myObservable4_sub.subscribe(x => console.log('second: ' + x));

// subscribtion.add(subscribtion_sub);

// setTimeout(() => {
//     subscribtion.unsubscribe();
// }, 900);

// var source = Rx.Observable.timer(1000, 5000);

// 取得subscription对象
// var subscription = source.subscribe({
//     next: function(value) {
//         console.log(value);
//     },
//     complete: function() {
//         console.log('complete!');
//     },
//     error: function(error) {
//         console.log('Throw Error: ' + error);
//     }
// });

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 1000);

window.onload = function() {
    var node = document.getElementById('button');

    // var sub = new rxjsTest().fromEvent(node, 'click').subscribe((e) => {
    //     alert('click');
    // });
    var input = fromEvent(document.querySelector('input'), 'input');

    // 过滤掉小于3个字符长度的目标值
    input.filter(event => event.target.value.length > 2)
        .map(event => event.target.value)
        .subscribe(value => { console.log(value) });

    input.delay(2000)
        .map(event => event.target.value)
        .subscribe(value => { console.log(`delay200:${value}`) });

    // Rx.Observable.fromEvent(document.getElementsByTagName('button'), 'click')
    //     .scan(count => count + 1, 0)
    //     .subscribe(value => {
    //         document.getElementById('counter').innerHTML = value;
    //     });
    //  每200ms只能通过一个事件
    input.throttleTime(2000)
        .map(event => event.target.value)
        .subscribe(value => console.log('throttle time: ' + value));

    // 停止输入后200ms方能通过最新的那个事件
    input.debounceTime(2000)
        .map(event => event.target.value)
        .subscribe(value => console.log('debounceTime: ' + value));

    // 在3次事件后停止事件流
    input.take(3)
        .map(event => event.target.value)
        .subscribe(value => console.log('take: ' + value));

    var stopStream = fromEvent(document.querySelector('button'), 'click');
    // 直到其他 observable 触发事件才停止事件流
    input.takeUntil(stopStream)
        .map(event => event.target.value)
        .subscribe(value => console.log('takeUnitl: ' + value));

    //  产生值

    // 输入 "hello world"
    var input = fromEvent(document.querySelector('input'), 'input');

    // 传递一个新的值
    input.map(event => event.target.value)
        .subscribe(value => console.log("产生值-map：" + value)); // "h"

    input.pluck('target', 'value')
        .subscribe(value => console.log("产生值-pluck" + value));

    // 只会通过唯一的值
    input.pluck('data').distinct()
        .subscribe(value => console.log('产生值-distinct: ' + value)); // "helo wrd"

    // 不会传递重复的值
    input.pluck('data').distinctUntilChanged()
        .subscribe(value => console.log('产生值-distinctUntilChanged: ' + value)); // "helo world"
}

// var sub1 = Observable.of(1, 2, 3, 4);
// sub1.subscribe((num) => {
//     console.log('rx of 输出: ' + num);
// });