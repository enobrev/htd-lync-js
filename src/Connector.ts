import net from "net";
import {default as PromiseSocket} from "promise-socket";
import Parser from "./Parser";
import Command from "./Command";
import { EventEmitter } from 'events'

export default class Connector {
    host: string;
    port: number;
    client: net.Socket;
    ps: PromiseSocket<net.Socket>;
    connected: boolean;
    events: EventEmitter;

    constructor(host: string, port: number) {
        this.host   = host;
        this.port   = port;
        this.client = new net.Socket();
        this.ps     = new PromiseSocket(this.client);
        this.events = new EventEmitter();
        this.client.on('data', (data) => {
            const response = Parser.parse(data);
            this.events.emit('data', response);
        });
        this.client.on('error', (error: Error) => this.events.emit('error', error));

        this.connected = false;
    }

    async send_buffer(buffer: Buffer): Promise<void> {
        if (!this.connected) {
            await this.ps.connect(this.port, this.host);
            this.events.emit('data', {
                socket: {
                    connected: true
                }
            });
            this.connected = true;
        }

        try {
            console.log('Send Buffer', buffer);
            await this.ps.write(buffer);
        } catch (e) {
            console.error('socket error', e);
        }
    }

    async send_command(command: Command): Promise<void> {
        await this.send_buffer(command.get_command());
    }
}