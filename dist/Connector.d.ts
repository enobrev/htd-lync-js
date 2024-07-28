import net from "net";
import { default as PromiseSocket } from "promise-socket";
import { Response_MP3_Repeat, Response_System } from "./Parser";
import Protocol from "./Protocol";
import TypedEventEmitter from './TypedEventEmitter';
import type { Response_Exist } from "./Parser";
import type { LyncResponse, Response_Error, Response_Id, Response_MP3_Artist, Response_MP3_End, Response_MP3_File, Response_MP3_Off, Response_MP3_On, Response_Source_Name, Response_Status, Response_Zone_Name } from "./Parser";
export type EventTypes = {
    'socket:connected': [];
    'socket:error': [Error];
    'error': [Response_Error];
    'id': [Response_Id];
    'system': [Response_System];
    'status': [Response_Status];
    'exist': [Response_Exist];
    'source_name': [Response_Source_Name];
    'zone_name': [Response_Zone_Name];
    'mp3:repeat': [Response_MP3_Repeat];
    'mp3:end': [Response_MP3_End];
    'mp3:on': [Response_MP3_On];
    'mp3:off': [Response_MP3_Off];
    'mp3:file': [Response_MP3_File];
    'mp3:artist': [Response_MP3_Artist];
};
export default class Connector {
    host: string;
    port: number;
    client: net.Socket;
    ps: PromiseSocket<net.Socket>;
    connected: boolean;
    events: TypedEventEmitter<EventTypes>;
    constructor(host: string, port: number);
    emit_response(response: LyncResponse): void;
    send_command(command: Protocol): Promise<void>;
    send_buffer(buffer: Buffer): Promise<void>;
}
//# sourceMappingURL=Connector.d.ts.map