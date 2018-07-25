import { Observable } from 'rxjs';

export function jilian() {
    let stream$ = Observable.of(0)
        .switchMap(result => {
            return Observable.of(result + 1)
        })
        .switchMap((result) => {
            return Observable.of(result + 2);
        })
    stream$.subscribe((orders) => {
        console.log('counter: ', orders);
    })
}