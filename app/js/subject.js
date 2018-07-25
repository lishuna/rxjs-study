import { Subject } from 'rxjs/index';

export function subject() {
    const subject = new Subject();
    // const observable = subject.asObservable();

    setTimeout(() => {
        subject.next('我发布了一本书，请阅读');
    }, 2000);

    subject.subscribe((val) => {
        console.log(val);
    });

    const subject1 = new Subject();

    subject1.subscribe((val) => {
        console.log(`subject1: ${val}`)
    });
    subject1.subscribe((val) => {
        console.log(`subject2: ${val}`)
    });
}