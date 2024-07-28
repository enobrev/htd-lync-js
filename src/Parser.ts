import Protocol, {Header} from "./Protocol";
import Lookup from "./Lookup";

export const Response_Code = {
    Unhandled:        0x00, // Made-Up
    MP3_Repeat:       0x01, // Made Up
    System:           0x02, // Made Up
    Status:           0x05,
    Exist:            0x06,
    MP3_End:          0x09,
    MP3_File_Name:    0x11,
    MP3_Artist_Name:  0x12,
    MP3_On:           0x13,
    MP3_Off:          0x14,
    Zone_Source_Name: 0x0C,
    Zone_Name:        0x0D,
    Source_Name:      0x0E,
    Error:            0x1B,
    Firmware_V3:      0x33, // V3
    Id:               0x4C,
} as const;

export interface Response_Id {
    type: typeof Response_Code.Id
    id: string
}

export interface Response_System {
    type:                   typeof Response_Code.System
    system: {
        all_on:                 boolean
        all_off:                boolean
        party_mode:             boolean
        party_mode_mp3_repeat:  boolean
    }
}

export interface Response_Error {
    type:    typeof Response_Code.Error
    code:    number
    message: string
}

export interface Response_Unhandled {
    type: typeof Response_Code.Unhandled
    unhandled: string
}

// interface Unknown {
//     value: number,
//     hex:   string,
//     binary: string
// }

export interface Response_Status {
    type: typeof Response_Code.Status
    zone: {
        number: number
        power: boolean
        mute: boolean
        dnd: boolean
        source: number
        volume: number
        treble: number
        bass: number
        balance: number
    }
}

interface ZoneExist {
    number: number
    exist: boolean,
    keypad: boolean,
}

export interface Response_Exist {
    type: typeof Response_Code.Exist
    zones: ZoneExist[]
}

export interface Response_MP3_End {
    type: typeof Response_Code.MP3_End
    mp3: {
        status: "end"
    }
}

export interface Response_MP3_On {
    type: typeof Response_Code.MP3_On
    mp3: {
        status: "on"
    }
}

export interface Response_MP3_Repeat {
    type: typeof Response_Code.MP3_Repeat
    mp3: {
        repeat: boolean
    }
}

export interface Response_MP3_Off {
    type: typeof Response_Code.MP3_Off
    mp3: {
        status: "off"
        data?: string
    }
}

export interface Response_MP3_File {
    type: typeof Response_Code.MP3_File_Name
    mp3: {
        file: string
    }
}

export interface Response_MP3_Artist {
    type: typeof Response_Code.MP3_Artist_Name
    mp3: {
        artist: string
    }
}

export interface Response_Source_Name {
    type: typeof Response_Code.Source_Name

    source: {
        zone: number
        name: string
        number: number
    }
}

export interface Response_Zone_Name {
    type: typeof Response_Code.Zone_Name
    zone: {
        name: string
        number: number
    }
}

export type LyncResponse = Response_Id | Response_Error | Response_Status | Response_Exist |
                           Response_Zone_Name | Response_Source_Name | Response_MP3_Artist |
                           Response_MP3_File | Response_MP3_Off | Response_MP3_On | Response_MP3_End |
                           Response_Unhandled | Response_MP3_Repeat | Response_System

export default class Parser {
    static previous_result: Buffer;

    static reset_previous_result(): void {
        this.previous_result = Buffer.from([]);
    }

    static parse(rawData: Buffer): LyncResponse[] {
        let offset        = 0;
        let data: Buffer = Buffer.alloc(rawData.length);
        rawData.copy(data);

        if (!Parser.previous_result) {
            Parser.reset_previous_result();
        }

        if (Parser.previous_result.length) {
            data = Buffer.concat([Parser.previous_result, data]);
            Parser.reset_previous_result();
        }

        const H = 4; // header
        const C = 1; // checksum

        const packets: Buffer[] = [];
        while (offset < data.length) {
            let packet: Buffer = Buffer.from([]);
            let command_length = 1;
            const remaining_length = data.length - offset;

            const header     = data[offset];
            const reserved   = data[offset + 1];
            const is_id      = header   === Response_Code.Id
                            && reserved === 0x79; // L in Lync
            const is_command = header    === 0x02
                            && (reserved === 0x00 || reserved === 0x01);

            if (is_id) {
                command_length = 6;
                packet = data.subarray(offset, offset + command_length);
                packets.push(packet);
            } else if (is_command) {
                switch (data[offset + 3]) {
                    case Response_Code.Error:            command_length = H + 9  + C; break;
                    case Response_Code.Status:           command_length = H + 9  + C; break;
                    case Response_Code.Exist:            command_length = H + 9  + C; break;
                    case Response_Code.MP3_End:          command_length = H + 1  + C; break;
                    case Response_Code.MP3_On:           command_length = H + 1  + C; break;
                    case Response_Code.MP3_Off:          command_length = H + 18 + C + 31; break; // Doc Note: "Device Not Found"
                    case Response_Code.Zone_Source_Name: command_length = H + 13 + C; break;
                    case Response_Code.Zone_Name:        command_length = H + 13 + C; break;
                    case Response_Code.Source_Name:      command_length = H + 13 + C; break;
                    case Response_Code.MP3_File_Name:
                    case Response_Code.MP3_Artist_Name:
                        if (remaining_length <= 6) { // empty + checksum
                            command_length = remaining_length
                        } else {
                            const length = data.subarray(offset + H).indexOf(Uint8Array.from([0x02, 0x00]));
                            if (length > -1) {
                                command_length = H + length;
                            } else {
                                command_length = H;
                            }
                        }
                        break;

                    // Un-handled, so skip it
                    default:
                        if (remaining_length > 2) {
                            let debug_packet: Buffer = Buffer.from([]);
                            let temp_offset = offset + 2;
                            while (temp_offset < data.length) { // search for the next command which means the end of this one
                                if (data[temp_offset] === 0x02 && data[temp_offset + 1] === 0x00) {
                                    debug_packet = data.subarray(offset, temp_offset);
                                    break;
                                }

                                temp_offset++;
                            }

                            console.warn('Unknown response received with length', debug_packet.length);
                            console.warn('Packet', debug_packet);
                            command_length = debug_packet.length;
                        }
                        break;
                }

                packet = data.subarray(offset, offset + command_length);
                if (packet.length <= 1) {
                    Parser.previous_result = packet; // Clear previous packet buffer
                } else if (Protocol.validate_checksum(packet)) {
                    packets.push(packet);
                } else {
                    Parser.previous_result = packet;
                }
            }

            offset += command_length;
        }

        let responses: LyncResponse[] = [];
        packets.forEach((data: Buffer) => {
            responses = responses.concat(Parser.handle_packet(data));
        });

        // console.log('responses');
        // console.dir(responses, {depth: null})

        return responses;
    }

    private static handle_packet = (data: Buffer): LyncResponse[] => {
        // console.log('handle_packet', data);

        if (data[0] === Response_Code.Id) {
            return Parser.handle_id(data);
        }

        switch (data[3]) {
            case Response_Code.Error:               return Parser.handle_error(data);
            case Response_Code.Status:              return Parser.handle_status(data);
            case Response_Code.Exist:               return Parser.handle_exist(data);
            case Response_Code.MP3_End:             return Parser.handle_mp3_end(data);
            case Response_Code.MP3_On:              return Parser.handle_mp3_on(data);
            case Response_Code.MP3_Off:             return Parser.handle_mp3_off(data);
            case Response_Code.MP3_File_Name:       return Parser.handle_mp3_filename(data);
            case Response_Code.MP3_Artist_Name:     return Parser.handle_mp3_artist(data);
            case Response_Code.Zone_Source_Name:    return Parser.handle_source_name(data);
            case Response_Code.Source_Name:         return Parser.handle_source_name(data);
            case Response_Code.Zone_Name:           return Parser.handle_zone_name(data);
            default:                                return Parser.unhandled(data);
        }
    }

    private static handle_id = (data: Buffer): [Response_Id] => {
        return [{
            type: Response_Code.Id,
            id: data.subarray().toString('utf-8') || ''
        }];
    }

    private static handle_error = (data: Buffer): [Response_Error] => {
        let message = '';
        const code    = data.readUInt8(4);
        switch(code) {
            case 1: message = 'Volume Range Error';  break;
            case 2: message = 'Balance Range Error'; break;
            case 3: message = 'Treble Range Error';  break;
            case 4: message = 'Bass Range Error';    break;
        }
        return [{
            type: Response_Code.Error,
            code,
            message
        }];
    }

    private static handle_status = (data: Buffer): [Response_Status, Response_MP3_Repeat, Response_System] => {

        const parse = {
            header: data[0],
            ignore: data[1],
            zone: data[2],
            command: data[3],
            settings: {
                power: !!(data[4] & 0x01 << 0),
                mute:  !!(data[4] & 0x01 << 1),
                dnd:   !!(data[4] & 0x01 << 2),
            },
            system: {
                all_on:     !!(data[5] & 0x01 << 0),
                all_off:    !!(data[5] & 0x01 << 1),
                party_mode: !!(data[5] & 0x01 << 2),
            },
            mp3_repeat: !!(data[6] & 0x10),
            party_mode_mp3_repeat: !!(data[7] & 0x10),
            source: (data.readUInt8(8) + 1),
            volume: (data[9] === 0x00) ? 60 : (data.readUInt8(9) - 0xC4),
            treble: Lookup.hex_to_signed_dec(data[10]),
            bass: Lookup.hex_to_signed_dec(data[11]),
            balance: Lookup.hex_to_signed_dec(data[12]),
            checksum: data[13],
        }

        // console.log('Status', parse);

        return [{
            type: Response_Code.Status,
            zone: {
                number:  parse.zone,
                power:   parse.settings.power,
                mute:    parse.settings.mute,
                dnd:     parse.settings.dnd,
                source:  parse.source,
                volume:  parse.volume,
                treble:  parse.treble,
                bass:    parse.bass,
                balance: parse.balance
            }
        },
        {
            type: Response_Code.MP3_Repeat, // No idea why this comes from zone info
            mp3: {
                repeat: parse.mp3_repeat
            }
        },
        {
            type: Response_Code.System, // No idea why this comes from zone info
            system: {
                all_on:                 parse.system.all_on,
                all_off:                parse.system.all_off,
                party_mode:             parse.system.party_mode,
                party_mode_mp3_repeat:  parse.party_mode_mp3_repeat // WTF?!
            }
        }]
    }

    private static handle_exist = (data: Buffer): [Response_Exist] => {
        const debug = {
            header:   data[0],
            reserved: data[1],
            zone:     data[2],
            command:  data[3],
            ignore:   data[4],
            exist_1_8: {
                value:  data[5],
                hex:    data[5].toString(16),
                binary: data[5].toString(2)
            },
            keypad_1_8: {
                value:  data[6],
                hex:    data[6].toString(16),
                binary: data[6].toString(2)
            },
            exist_9_12: {
                value:  data[7],
                hex:    data[7].toString(16),
                binary: data[7].toString(2)
            },
            keypad_9_12: {
                value:  data[8],
                hex:    data[8].toString(16),
                binary: data[8].toString(2)
            },
            ignore_9:  data[9],
            ignore_10: data[10],
            ignore_11: data[11],
            ignore_12: data[12],
            checksum:  data[13],
        }

        // console.log('Exist', debug);

        let response: Response_Exist = {
            type: Response_Code.Exist,
            zones: []
        }

        const zoneBits   = data[5] | data[7] << 8;
        const keypadBits = data[6] | data[8] << 8;
        for (let zone_index = 0; zone_index < 12; zone_index++) {
            response.zones.push({
                number: zone_index + 1,
                exist:  !!(zoneBits & 0x01 << zone_index),
                keypad: !!(keypadBits & 0x01 << zone_index)  // I'm not convinced this is correct
            });
        }
        return [response];
    }

    private static handle_mp3_end = (data: Buffer): [Response_MP3_End] => {
        console.log('MP3_END', data);
        return [{
            type: Response_Code.MP3_End,
            mp3: {
                status: 'end'
            }
        }]
    }

    private static handle_mp3_on = (data: Buffer): [Response_MP3_On] => {
        console.log('MP3_ON', data);
        return [{
            type: Response_Code.MP3_On,
            mp3: {
                status: 'on'
            }
        }]
    }

    private static handle_mp3_off = (data: Buffer): [Response_MP3_Off] => {
        console.log('MP3_OFF', data);
        return [{
            type: Response_Code.MP3_Off,
            mp3: {
                status: 'off',
                data: data.subarray(4, data.length - 2).toString('utf8').trim() || ''  // start after header, end before space and checksum
            }
        }]
    }

    private static handle_mp3_filename = (data: Buffer): [Response_MP3_File] => {
        let file = '';

        try {
            file = data.subarray(4, data.length - 2).toString('utf-8').split("\0").shift() || '' // start after header, end before space and checksum, stop at null
        } catch (e) {
            console.error(e);
        }

        return [{
            type: Response_Code.MP3_File_Name,
            mp3: {
                file
            }
        }]
    }

    private static handle_mp3_artist = (data: Buffer): [Response_MP3_Artist] => {
        let artist = '';

        try {
            artist = data.subarray(4, data.length - 2).toString('utf-8').split("\0").shift() || '' // start after header, end before space and checksum, stop at null
        } catch (e) {
            console.error(e);
        }

        return [{
            type: Response_Code.MP3_Artist_Name,
            mp3: {
                artist
            }
        }]
    }

    private static handle_source_name = (data: Buffer): [Response_Source_Name] => {
        let name = '';

        try {
            name = data.subarray(4, data.length - 2).toString('ascii').split("\0").shift() || '' // start after header, end before space and checksum, stop at null
        } catch (e) {
            console.error(e);
        }

        return [{
            type: Response_Code.Source_Name,
            source: {
                zone:   data[2],
                number: data.readUInt8(15) + 1, // source is zero-based
                name
            }
        }]
    }

    private static handle_zone_name = (data: Buffer): [Response_Zone_Name] => {
        return [{
            type: Response_Code.Zone_Name,
            zone: {
                number: data.readUInt8(15),
                name: data.subarray(4, data.length - 2).toString('ascii').split("\0").shift() || '' // start after header, end before space and checksum, stop at null
            }
        }]
    }

    private static unhandled = (data: Buffer): [Response_Unhandled] => {
        const unhandled = data.toString('utf-8');
        console.warn('Unhandled', unhandled);

        return [{
            type: Response_Code.Unhandled,
            unhandled
        }]
    }
}