export declare const Response_Code: {
    readonly Unhandled: 0;
    readonly MP3_Repeat: 1;
    readonly System: 2;
    readonly Status: 5;
    readonly Exist: 6;
    readonly MP3_End: 9;
    readonly MP3_File_Name: 17;
    readonly MP3_Artist_Name: 18;
    readonly MP3_On: 19;
    readonly MP3_Off: 20;
    readonly Zone_Source_Name: 12;
    readonly Zone_Name: 13;
    readonly Source_Name: 14;
    readonly Error: 27;
    readonly Firmware_V3: 51;
    readonly Id: 76;
};
export interface Response_Id {
    type: typeof Response_Code.Id;
    id: string;
}
export interface Response_System {
    type: typeof Response_Code.System;
    system: {
        all_on: boolean;
        all_off: boolean;
        party_mode: boolean;
        party_mode_mp3_repeat: boolean;
    };
}
export interface Response_Error {
    type: typeof Response_Code.Error;
    code: number;
    message: string;
}
export interface Response_Unhandled {
    type: typeof Response_Code.Unhandled;
    unhandled: string;
}
export interface Response_Status {
    type: typeof Response_Code.Status;
    zone: {
        number: number;
        power: boolean;
        mute: boolean;
        dnd: boolean;
        source: number;
        volume: number;
        treble: number;
        bass: number;
        balance: number;
    };
}
interface ZoneExist {
    number: number;
    exist: boolean;
    keypad: boolean;
}
export interface Response_Exist {
    type: typeof Response_Code.Exist;
    zones: ZoneExist[];
}
export interface Response_MP3_End {
    type: typeof Response_Code.MP3_End;
    mp3: {
        status: "end";
    };
}
export interface Response_MP3_On {
    type: typeof Response_Code.MP3_On;
    mp3: {
        status: "on";
    };
}
export interface Response_MP3_Repeat {
    type: typeof Response_Code.MP3_Repeat;
    mp3: {
        repeat: boolean;
    };
}
export interface Response_MP3_Off {
    type: typeof Response_Code.MP3_Off;
    mp3: {
        status: "off";
        data?: string;
    };
}
export interface Response_MP3_File {
    type: typeof Response_Code.MP3_File_Name;
    mp3: {
        file: string;
    };
}
export interface Response_MP3_Artist {
    type: typeof Response_Code.MP3_Artist_Name;
    mp3: {
        artist: string;
    };
}
export interface Response_Source_Name {
    type: typeof Response_Code.Source_Name;
    source: {
        zone: number;
        name: string;
        number: number;
    };
}
export interface Response_Zone_Name {
    type: typeof Response_Code.Zone_Name;
    zone: {
        name: string;
        number: number;
    };
}
export type LyncResponse = Response_Id | Response_Error | Response_Status | Response_Exist | Response_Zone_Name | Response_Source_Name | Response_MP3_Artist | Response_MP3_File | Response_MP3_Off | Response_MP3_On | Response_MP3_End | Response_Unhandled | Response_MP3_Repeat | Response_System;
export default class Parser {
    static previous_result: Buffer;
    static reset_previous_result(): void;
    static parse(rawData: Buffer): LyncResponse[];
    private static handle_packet;
    private static handle_id;
    private static handle_error;
    private static handle_status;
    private static handle_exist;
    private static handle_mp3_end;
    private static handle_mp3_on;
    private static handle_mp3_off;
    private static handle_mp3_filename;
    private static handle_mp3_artist;
    private static handle_source_name;
    private static handle_zone_name;
    private static unhandled;
}
export {};
//# sourceMappingURL=Parser.d.ts.map