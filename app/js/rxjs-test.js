import Rx from 'rxjs/Rx';

export class rxjsTest {
    fromEvent(target, eventName) {
        return new Rx.Observable((observer) => {
            const handler = (e) => observer.next(e);

            // Add the event handler to the target
            target.addEventListener(eventName, handler);

            return () => {
                // Detach the event handler from the target
                target.removeEventListener(eventName, handler);
            };
        });
    }
}