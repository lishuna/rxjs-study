import { Rx, Observable } from 'rxjs';
// import Observable from 'rxjs/Observable';
import {
    of,
    from,
} from 'rxjs/operators';
import {
    fromEvent,
    merge,
    Subject
} from 'rxjs/index';
import {
    Test
} from './oberverModel';
// import {
//     subTest
// } from './dataSource';
import {
    rxjsTest
} from './rxjs-test';

import { fenzu, autoComplete } from './fenzu';
import { jilian } from './jilian';
import { zuhe } from './zuhe';
import { subject } from './subject';

let timerFlag = Observable.interval(100);
let timerObserve = timerFlag.subscribe((data) => {
    console.log(data);
});

let timerStop = Observable.timer(1000);
timerStop.subscribe(() => {
    timerObserve.unsubscribe();
});
window.onload = function() {
    zuhe();
    subject();
    fenzu();
    autoComplete();
    jilian();
    var node = document.getElementById('button');

    // var sub = new rxjsTest().fromEvent(node, 'click').subscribe((e) => {
    //     alert('click');
    // });
    var input = fromEvent(document.querySelector('input'), 'input');

    // 过滤掉小于3个字符长度的目标值
    input.filter(event => event.target.value.length > 2)
        .map(event => event.target.value)
        .subscribe(value => {
            console.log(value)
        });

    input.delay(2000)
        .map(event => event.target.value)
        .subscribe(value => {
            console.log(`delay200:${value}`)
        });

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
    // 传递之前的两个值
    input.pluck('target', 'value').pairwise()
        .subscribe(value => console.log('产生值-pairwise: ' + value));
    input.pluck('data').distinct()
        .subscribe(value => console.log('产生值-distinct: ' + value));
    // 只会通过唯一的值
    // input.pluck('data').distinct()
    //     .subscribe(value => console.log('产生值-distinct: ' + value)); // "helo wrd"

    // 不会传递重复的值
    input.pluck('data').distinctUntilChanged()
        .subscribe(value => console.log('产生值-distinctUntilChanged: ' + value)); // "helo world"

    var test1 = input.map(event => () => event.target.value + '哈哈1')
    var test2 = input.map(event => () => event.target.value + '哈哈2')
    merge(test1, test2)
        .scan((a, b) => console.log(a + b))

}
document.onreadystatechange = function() {
    var increaseButton = document.querySelector('#increase');
    var increase = fromEvent(increaseButton, 'click')
        // 我们再一次映射到一个函数，它会增加 count
        .map(() => state => Object.assign({}, state, {
            count: state.count + 1
        }));

    var decreaseButton = document.querySelector('#decrease');
    var decrease = fromEvent(decreaseButton, 'click')
        // 我们还是映射到一个函数，它会减少 count 
        .map(() => state => Object.assign({}, state, {
            count: state.count - 1
        }));

    var inputElement = document.querySelector('#input');
    var input = fromEvent(inputElement, 'keyup')
        // 我们还将按键事件映射成一个函数，它会产生一个叫做 inputValue 状态
        .map(event => state => Object.assign({}, state, {
            inputValue: event.target.value
        }));

    // 我们将这三个改变状态的 observables 进行合并
    var state = merge(
        increase,
        decrease,
        input
    ).scan((state, changeFn) => changeFn(state), {
        count: 0,
        inputValue: '0'
    });

    // 我们订阅状态的变化并更新 DOM
    state.subscribe((state) => {
        document.querySelector('#count').innerHTML = state.count;
        document.querySelector('#hello').innerHTML = 'Hello ' + state.inputValue;
    });

    // 为了优化渲染，我们可以检查什么状态是实际上已经发生变化了的
    var prevState = {};
    state.subscribe((state) => {
        if (state.count !== prevState.count) {
            document.querySelector('#count').innerHTML = state.count;
        }
        if (state.inputValue !== prevState.inputValue) {
            document.querySelector('#hello').innerHTML = 'Hello ' + state.inputValue;
        }
        prevState = state;
    });
}