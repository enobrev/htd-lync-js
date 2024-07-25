import Command from "./Command";
import Lookup from "./Lookup";
export const Response_Code = {
    Unhandled: 0x00, // Made-Up
    Error: 0x1B,
    Status: 0x05,
    Exist: 0x06,
    MP3_End: 0x09,
    MP3_On: 0x13,
    MP3_Off: 0x14,
    Zone_Source_Name: 0x0C,
    Zone_Name: 0x0D,
    Source_Name: 0x0E,
    MP3_File_Name: 0x11,
    MP3_Artist_Name: 0x12,
    Firmware_V3: 0x33, // V3
    Id: 0x4C,
};
export default class Parser {
    static previous_result;
    static parse(rawData) {
        let offset = 0;
        let data = Buffer.alloc(rawData.length);
        rawData.copy(data);
        if (!this.previous_result) {
            this.previous_result = Buffer.from([]);
        }
        if (this.previous_result.length) {
            data = Buffer.concat([this.previous_result, data]);
        }
        const H = 4; // header
        const C = 1; // checksum
        const packets = [];
        while (offset < data.length) {
            let packet = Buffer.from([]);
            let command_length = 1;
            const remaining_length = data.length - offset;
            if (data[offset] === Response_Code.Id && data[offset + 1] === 0x79) {
                command_length = 6;
                packet = data.subarray(offset, offset + command_length);
                packets.push(packet);
            }
            else if (data[offset] === 0x02 && (data[offset + 1] === 0x00 || data[offset + 1] === 0x01)) {
                switch (data[offset + 3]) {
                    case Response_Code.Error:
                        command_length = H + 9 + C;
                        break;
                    case Response_Code.Status:
                        command_length = H + 9 + C;
                        break;
                    case Response_Code.Exist:
                        command_length = H + 9 + C;
                        break;
                    case Response_Code.MP3_End:
                        command_length = H + 1 + C;
                        break;
                    case Response_Code.MP3_On:
                        command_length = H + 1 + C;
                        break;
                    case Response_Code.MP3_Off:
                        command_length = H + 18 + C + 31;
                        break;
                    case Response_Code.Zone_Source_Name:
                        command_length = H + 13 + C;
                        break;
                    case Response_Code.Zone_Name:
                        command_length = H + 13 + C;
                        break;
                    case Response_Code.Source_Name:
                        command_length = H + 13 + C;
                        break;
                    case Response_Code.MP3_File_Name:
                    case Response_Code.MP3_Artist_Name:
                        if (remaining_length <= 6) { // empty + checksum
                            command_length = remaining_length;
                        }
                        else {
                            const length = data.subarray(offset + H).indexOf(Uint8Array.from([0x02, 0x00]));
                            if (length > -1) {
                                command_length = H + length;
                            }
                            else {
                                command_length = H;
                            }
                        }
                        break;
                    // Un-handled, so skip it
                    default:
                        if (remaining_length > 2) {
                            console.log('Unknown response received', remaining_length);
                            console.log(data.subarray(offset));
                        }
                        break;
                }
                packet = data.subarray(offset, offset + command_length);
                if (packet.length <= 1) {
                    this.previous_result = packet;
                }
                else if (Command.validate_checksum(packet)) {
                    packets.push(packet);
                }
                else {
                    this.previous_result = packet;
                }
            }
            offset += command_length;
        }
        return packets.map(Parser.handle_packet);
    }
    static handle_packet = (data) => {
        if (data[0] === Response_Code.Id) {
            return Parser.handle_id(data);
        }
        switch (data[3]) {
            case Response_Code.Error: return Parser.handle_error(data);
            case Response_Code.Status: return Parser.handle_status(data);
            case Response_Code.Exist: return Parser.handle_exist(data);
            case Response_Code.MP3_End: return Parser.handle_mp3_end(data);
            case Response_Code.MP3_On: return Parser.handle_mp3_on(data);
            case Response_Code.MP3_Off: return Parser.handle_mp3_off(data);
            case Response_Code.MP3_File_Name: return Parser.handle_mp3_filename(data);
            case Response_Code.MP3_Artist_Name: return Parser.handle_mp3_artist(data);
            case Response_Code.Zone_Source_Name: return Parser.handle_source_name(data);
            case Response_Code.Source_Name: return Parser.handle_source_name(data);
            case Response_Code.Zone_Name: return Parser.handle_zone_name(data);
            default: return Parser.unhandled(data);
        }
    };
    static handle_id = (data) => {
        return {
            type: Response_Code.Id,
            id: data.subarray().toString('utf-8') || ''
        };
    };
    static handle_error = (data) => {
        return {
            type: Response_Code.Error,
            error: data.readUInt8(4)
        };
    };
    static handle_status = (data) => {
        return {
            type: Response_Code.Status,
            zone: {
                number: data[2],
                power: !!(data[4] & 0x01 << 0),
                mute: !!(data[4] & 0x01 << 1),
                dnd: !!(data[4] & 0x01 << 2),
                source: (data.readUInt8(8) + 1),
                volume: (data[9] === 0x00) ? 60 : (data.readUInt8(9) - 0xC4),
                treble: Lookup.hex_to_signed_dec(data[10]),
                bass: Lookup.hex_to_signed_dec(data[11]),
                balance: Lookup.hex_to_signed_dec(data[12])
            }
        };
    };
    static handle_exist = (data) => {
        // const debug = {
        //     header:   data[0],
        //     ignore_1: data[1],
        //     zone:     data[2],
        //     mode:     data[3],
        //     ignore_4: data[4],
        //     exist_5: {
        //         value:  data[5],
        //         hex:    data[5].toString(16),
        //         binary: data[5].toString(2)
        //     },
        //     keypad_6: {
        //         value:  data[6],
        //         hex:    data[6].toString(16),
        //         binary: data[6].toString(2)
        //     },
        //     exist_7: {
        //         value:  data[7],
        //         hex:    data[7].toString(16),
        //         binary: data[7].toString(2)
        //     },
        //     keypad_8: {
        //         value:  data[8],
        //         hex:    data[8].toString(16),
        //         binary: data[8].toString(2)
        //     },
        //     unknown_9: {
        //         value:  data[9],
        //         hex:    data[9].toString(16),
        //         binary: data[9].toString(2)
        //     },
        //     unknown_10: {
        //         value:  data[10],
        //         hex:    data[10].toString(16),
        //         binary: data[10].toString(2)
        //     },
        //     unknown_11: {
        //         value:  data[11],
        //         hex:    data[11].toString(16),
        //         binary: data[11].toString(2)
        //     },
        //     unknown_12: {
        //         value:  data[12],
        //         hex:    data[12].toString(16),
        //         binary: data[12].toString(2)
        //     },
        //     checksum: data[13],
        // }
        //
        // console.log('Exist', debug);
        let response = {
            type: Response_Code.Exist,
            zones: []
        };
        const zoneBits = data[5] | data[7] << 8;
        const keypadBits = data[6] | data[8] << 8;
        for (let zone_index = 0; zone_index < 12; zone_index++) {
            response.zones.push({
                number: zone_index + 1,
                exist: !!(zoneBits & 0x01 << zone_index),
                keypad: !!(keypadBits & 0x01 << zone_index) // I'm not convinced this is correct
            });
        }
        return response;
    };
    static handle_mp3_end = (data) => {
        return {
            type: Response_Code.MP3_End,
            mp3: {
                status: 'end'
            }
        };
    };
    static handle_mp3_on = (data) => {
        return {
            type: Response_Code.MP3_On,
            mp3: {
                status: 'on'
            }
        };
    };
    static handle_mp3_off = (data) => {
        return {
            type: Response_Code.MP3_Off,
            mp3: {
                status: 'off',
                data: data.toString('utf8', 4, 18)
            }
        };
    };
    static handle_mp3_filename = (data) => {
        let file = '';
        try {
            file = data.subarray(4).toString('utf-8').split("\0").shift() || ''; // null terminated string
        }
        catch (e) {
            console.error(e);
        }
        return {
            type: Response_Code.MP3_File_Name,
            mp3: {
                file
            }
        };
    };
    static handle_mp3_artist = (data) => {
        let artist = '';
        try {
            artist = data.subarray(4).toString('utf-8').split("\0").shift() || ''; // null terminated string
        }
        catch (e) {
            console.error(e);
        }
        return {
            type: Response_Code.MP3_Artist_Name,
            mp3: {
                artist
            }
        };
    };
    static handle_source_name = (data) => {
        let name = '';
        try {
            name = data.toString('utf8', 4, 14).split("\0").shift() || ''; // null terminated string
        }
        catch (e) {
            console.error(e);
        }
        return {
            type: Response_Code.Source_Name,
            source: {
                zone: data[2],
                number: data.readUInt8(15) + 1, // source is zero-based
                name
            }
        };
    };
    static handle_zone_name = (data) => {
        return {
            type: Response_Code.Zone_Name,
            zone: {
                number: data.readUInt8(15),
                name: data.toString('utf8', 4, 14).split("\0").shift() || '' // null terminated string
            }
        };
    };
    static unhandled = (data) => {
        const unhandled = data.toString('utf-8');
        console.log('Unhandled', unhandled);
        return {
            type: Response_Code.Unhandled,
            unhandled
        };
    };
}
