// https://blog.makerx.com.au/a-type-safe-event-emitter-in-node-js/
import { EventEmitter } from "events";
export default class TypedEventEmitter {
    emitter = new EventEmitter();
    emit(eventName, ...eventArg) {
        this.emitter.emit(eventName, ...eventArg);
    }
    on(eventName, handler) {
        this.emitter.on(eventName, handler);
    }
    off(eventName, handler) {
        this.emitter.off(eventName, handler);
    }
}
