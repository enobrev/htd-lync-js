import net from "net";
import {default as PromiseSocket} from "promise-socket";
import Parser, {Response_Code}  from "./Parser";
import Command from "./Command";
import TypedEventEmitter from './TypedEventEmitter'

import type {Response_Exist} from "./Parser";
import type {
    LyncResponse,
    Response_Error,
    Response_Id,
    Response_MP3_Artist,
    Response_MP3_End,
    Response_MP3_File,
    Response_MP3_Off,
    Response_MP3_On,
    Response_Source_Name,
    Response_Status,
    Response_Zone_Name
} from "./Parser";

export type EventTypes = {
    'socket:connected': [],
    'socket:error':     [Error],
    'error':            [Response_Error],
    'id':               [Response_Id],
    'status':           [Response_Status],
    'exist':            [Response_Exist],
    'source_name':      [Response_Source_Name],
    'zone_name':        [Response_Zone_Name],
    'mp3:end':          [Response_MP3_End],
    'mp3:on':           [Response_MP3_On],
    'mp3:off':          [Response_MP3_Off],
    'mp3:file':         [Response_MP3_File],
    'mp3:artist':       [Response_MP3_Artist]
}

export default class Connector {
    host: string;
    port: number;
    client: net.Socket;
    ps: PromiseSocket<net.Socket>;
    connected: boolean = false;
    events: TypedEventEmitter<EventTypes>;

    constructor(host: string, port: number) {
        this.host   = host;
        this.port   = port;
        this.client = new net.Socket();
        this.ps     = new PromiseSocket(this.client);
        this.events = new TypedEventEmitter<EventTypes>();
        this.client.on('error', (error: Error) => this.events.emit('socket:error', error));
        this.client.on('data',  (data: Buffer) => {
            Parser.parse(data).map((response: LyncResponse) => {
                this.emit_response(response);
            })
        });
    }

    emit_response(response: LyncResponse) {
        switch(response.type) {
            case Response_Code.Error:           this.events.emit('error',       response); break;
            case Response_Code.Id:              this.events.emit('id',          response); break;
            case Response_Code.Status:          this.events.emit('status',      response); break;
            case Response_Code.Exist:           this.events.emit('exist',       response); break;
            case Response_Code.Source_Name:     this.events.emit('source_name', response); break;
            case Response_Code.Zone_Name:       this.events.emit('zone_name',   response); break;
            case Response_Code.MP3_End:         this.events.emit('mp3:end',     response); break;
            case Response_Code.MP3_On:          this.events.emit('mp3:on',      response); break;
            case Response_Code.MP3_Off:         this.events.emit('mp3:off',     response); break;
            case Response_Code.MP3_File_Name:   this.events.emit('mp3:file',    response); break;
            case Response_Code.MP3_Artist_Name: this.events.emit('mp3:artist',  response); break;
        }
    }

    async send_command(command: Command): Promise<void> {
        await this.send_buffer(command.get_command());
    }

    async send_buffer(buffer: Buffer): Promise<void> {
        if (!this.connected) {
            await this.ps.connect(this.port, this.host);
            this.events.emit('socket:connected');
            this.connected = true;
        }

        try {
            // console.log('Send Buffer', buffer);
            await this.ps.write(buffer);
        } catch (error) {
            this.events.emit('socket:error', error as Error);
        }
    }
}
