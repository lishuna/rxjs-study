import { Observable } from 'rxjs/index';

export function zuhe() {
    var time = Observable.of(['abc']);
    var time2 = Observable.of([122, 123]);
    var time3 = Observable.of().defaultIfEmpty([]);
    Observable.zip(time, time2, time3, (a, b, c) => [...a, ...b, ...c])
        .subscribe(data => console.log("zip:", data));
    Observable.merge(time, time2, time3).subscribe(data => {
        console.log("merge:", data);
    })
    Observable.combineLatest(time, time2, time3, (a, b, c) => {
            return a.concat(b).concat(c)
        })
        .subscribe(data => console.log("combineLatest:", data));

    // 测试conbineLatest
    let source1 = Observable.interval(100)
        .map(val => "source1 " + val).take(5);

    let source2 = Observable.interval(50)
        .map(val => "source2 " + val).take(2);

    let stream$ = Observable.combineLatest(
        source1,
        source2
    ).subscribe(data => console.log('conbineLatest: ' + data));

    // concat
    let stream1 = Observable.concat(source1, source2)
        .subscribe((data) => console.log('concat: ' + data));

    Observable.merge(source1, source2)
        .subscribe((data) => console.log('merge222: ' + data));

    let merged$ = Observable.merge(
        Observable.of(1).delay(500),
        Observable.of(3, 2, 5)
    )

    let observer = {
        next: data => console.log('merge111: ' + data)
    }

    merged$.subscribe(observer);

    let stream2 = Observable.concat(
        Observable.of(1).delay(500),
        Observable.of(3, 2, 5)
    );
    let observer1 = {
        next: data => console.log('concat: ----' + data)
    }
    stream2.subscribe(observer1);

    // zip
    let stream3 = Observable.zip(
        Observable.of(1, 5),
        Observable.of(2, 3, 4),
        Observable.of(7, 9)
    );

    let observer3 = {
        next: data => console.log('zip: ' + data)
    }
    stream3.subscribe(observer3);
}