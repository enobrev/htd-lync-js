import net from "net";
import { default as PromiseSocket } from "promise-socket";
import Parser, { Response_Code } from "./Parser";
import TypedEventEmitter from './TypedEventEmitter';
export default class Connector {
    host;
    port;
    client;
    ps;
    connected = false;
    events;
    constructor(host, port) {
        this.host = host;
        this.port = port;
        this.client = new net.Socket();
        this.ps = new PromiseSocket(this.client);
        this.events = new TypedEventEmitter();
        this.client.on('error', (error) => this.events.emit('socket:error', error));
        this.client.on('data', (data) => {
            Parser.parse(data).map((response) => {
                this.emit_response(response);
            });
        });
    }
    emit_response(response) {
        switch (response.type) {
            case Response_Code.Error:
                this.events.emit('error', response);
                break;
            case Response_Code.Id:
                this.events.emit('id', response);
                break;
            case Response_Code.System:
                this.events.emit('system', response);
                break;
            case Response_Code.Exist:
                this.events.emit('exist', response);
                break;
            case Response_Code.Status:
                this.events.emit('status', response);
                break;
            case Response_Code.Source_Name:
                this.events.emit('source_name', response);
                break;
            case Response_Code.Zone_Name:
                this.events.emit('zone_name', response);
                break;
            case Response_Code.MP3_Repeat:
                this.events.emit('mp3:repeat', response);
                break;
            case Response_Code.MP3_End:
                this.events.emit('mp3:end', response);
                break;
            case Response_Code.MP3_On:
                this.events.emit('mp3:on', response);
                break;
            case Response_Code.MP3_Off:
                this.events.emit('mp3:off', response);
                break;
            case Response_Code.MP3_File_Name:
                this.events.emit('mp3:file', response);
                break;
            case Response_Code.MP3_Artist_Name:
                this.events.emit('mp3:artist', response);
                break;
        }
    }
    async send_command(command) {
        await this.send_buffer(command.get_command());
    }
    async send_buffer(buffer) {
        if (!this.connected) {
            await this.ps.connect(this.port, this.host);
            this.events.emit('socket:connected');
            this.connected = true;
        }
        try {
            // console.log('send_buffer', buffer);
            await this.ps.write(buffer);
        }
        catch (error) {
            this.events.emit('socket:error', error);
        }
    }
}
