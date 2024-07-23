import net from "net";
import { default as PromiseSocket } from "promise-socket";
import Parser from "./Parser";
import { EventEmitter } from 'events';
export default class Connector {
    host;
    port;
    client;
    ps;
    connected;
    events;
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.client = new net.Socket();
        this.ps = new PromiseSocket(this.client);
        this.events = new EventEmitter();
        this.client.on('data', (data) => {
            const response = Parser.parse(data);
            this.events.emit('data', response);
        });
        this.client.on('error', (error) => this.events.emit('error', error));
        this.connected = false;
    }
    async send_buffer(buffer) {
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
        }
        catch (e) {
            console.error('socket error', e);
        }
    }
    async send_command(command) {
        await this.send_buffer(command.get_command());
    }
}
