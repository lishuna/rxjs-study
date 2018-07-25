import { Observable } from 'rxjs/index';

export function fenzu() {
    let input = document.getElementById('example');
    let input$ = Observable.fromEvent(input, 'keyup')

    // let breakWhen$ = Observable.timer(1000);
    let debounceBreak$ = input$.debounceTime(2000);

    let stream$ = input$
        .map(ev => {
            console.dir(ev);
            return ev.key
        })
        .buffer(debounceBreak$)
        .switchMap((allTypedKeys) => {
            // 执行 ajax
            console.log('Everything that happened during 2 sec', allTypedKeys)
            return Observable.of('ajax based on ' + input.value);
        });

    stream$.subscribe((data) => console.log('values', data));
}
export function autoComplete() {
    let node = document.querySelector('#text');
    let stream = Observable.fromEvent(node, 'keyup');

    let debounceTime = stream.debounceTime(3000);
    let stream1 = stream.map(ev => ev.key)
        .buffer(debounceTime)
        .switchMap((val) => {
            console.log('user input key: ' + val);
            return Observable.of(node.value);
        })
    stream1.subscribe((data) => {
        console.log('user laste input vlaue: ' + data);
    });
}