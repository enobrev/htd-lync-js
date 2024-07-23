import net from "net";
import { default as PromiseSocket } from "promise-socket";
import Command from "./Command";
import { EventEmitter } from 'events';
export default class Connector {
    host: string;
    port: number;
    client: net.Socket;
    ps: PromiseSocket<net.Socket>;
    connected: boolean;
    events: EventEmitter;
    constructor(host: string, port: number);
    send_buffer(buffer: Buffer): Promise<void>;
    send_command(command: Command): Promise<void>;
}
//# sourceMappingURL=Connector.d.ts.map