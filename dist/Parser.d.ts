export declare const Response_Code: {
    Error: number;
    Status: number;
    Exist: number;
    MP3_End: number;
    MP3_On: number;
    MP3_Off: number;
    Zone_Source_Name: number;
    Zone_Name: number;
    Source_Name: number;
    MP3_File_Name: number;
    MP3_Artist_Name: number;
    Firmware_V3: number;
    Id: number;
};
interface Response_Id {
    id: string;
}
interface Response_Error {
    error: number;
}
interface Response_Unhandled {
    unhandled: string;
}
interface Unknown {
    value: number;
    hex: string;
    binary: string;
}
interface Response_Status {
    header: number;
    ignore: number;
    zone: number;
    mode: number;
    settings: {
        power: boolean;
        mute: boolean;
        dnd: boolean;
    };
    unknown_5: Unknown;
    mp3: Unknown;
    unknown_7: Unknown;
    source: number;
    volume: number;
    treble: number;
    bass: number;
    balance: number;
    checksum: number;
}
interface Response_Exist {
    zones: {
        [key: string]: {
            exist: boolean;
            keypad: boolean;
        };
    };
}
interface Response_MP3_End {
    mp3: {
        status: "end";
    };
}
interface Response_MP3_On {
    mp3: {
        status: "on";
    };
}
interface Response_MP3_Off {
    mp3: {
        status: "off";
        data?: string;
    };
}
interface Response_MP3_File {
    mp3: {
        file: string;
    };
}
interface Response_MP3_Artist {
    mp3: {
        artist: string;
    };
}
interface Response_Source_Name {
    source: {
        zone: number;
        name: string;
        number: number;
    };
}
interface Response_Zone_Name {
    zone: {
        name: string;
        number: number;
    };
}
interface Response_Connected {
    socket: {
        connected: boolean;
    };
}
export type LyncResponse = Response_Id | Response_Error | Response_Status | Response_Exist | Response_Zone_Name | Response_Source_Name | Response_MP3_Artist | Response_MP3_File | Response_MP3_Off | Response_MP3_On | Response_MP3_End | Response_Connected | Response_Unhandled | null;
export default class Parser {
    static previous_result: Buffer;
    static parse(rawData: Buffer): any;
    static handleIncoming: (data: Buffer) => LyncResponse;
}
export {};
//# sourceMappingURL=Parser.d.ts.map