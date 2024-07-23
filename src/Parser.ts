import Command from "./Command";
import Lookup from "./Lookup";
import {i} from "vite/dist/node/types.d-aGj9QkWt";


export const Response_Code = {
    Error:            0x1B,
    Status:           0x05,
    Exist:            0x06,
    MP3_End:          0x09,
    MP3_On:           0x13,
    MP3_Off:          0x14,
    Zone_Source_Name: 0x0C,
    Zone_Name:        0x0D,
    Source_Name:      0x0E,
    MP3_File_Name:    0x11,
    MP3_Artist_Name:  0x12,
    Firmware_V3:      0x33, // V3
    Id:               0x4C,
}

interface Response_Id {
    id: string
}

interface Response_Error {
    error: number
}

interface Response_Unhandled {
    unhandled: string
}

interface Unknown {
    value: number,
    hex:   string,
    binary: string
}


interface Response_Status {
    header: number
    ignore: number
    zone: number
    mode: number
    settings: {
        power: boolean
        mute:  boolean
        dnd:   boolean
    },
    unknown_5: Unknown
    mp3: Unknown
    unknown_7: Unknown
    source: number
    volume: number
    treble: number
    bass: number
    balance: number
    checksum: number
}

interface Response_Exist {
    zones: {
        [key: string]: {
            exist: boolean,
            keypad: boolean,
        }
    }
}

interface Response_MP3_End {
    mp3: {
        status: "end"
    }
}

interface Response_MP3_On {
    mp3: {
        status: "on"
    }
}

interface Response_MP3_Off {
    mp3: {
        status: "off"
        data?: string
    }
}

interface Response_MP3_File {
    mp3: {
        file: string
    }
}

interface Response_MP3_Artist {
    mp3: {
        artist: string
    }
}

interface Response_Source_Name {
    source: {
        zone: number
        name: string
        number: number
    }
}

interface Response_Zone_Name {
    zone: {
        name: string
        number: number
    }
}

interface Response_Connected {
    socket: {
        connected: boolean
    }
}

export type LyncResponse = Response_Id | Response_Error | Response_Status | Response_Exist |
                            Response_Zone_Name | Response_Source_Name | Response_MP3_Artist |
                            Response_MP3_File | Response_MP3_Off | Response_MP3_On | Response_MP3_End |
                            Response_Connected | Response_Unhandled | null

export default class Parser {
    static previous_result: Buffer;

    static parse(rawData: Buffer): any {
        let offset        = 0;
        let data: Buffer = Buffer.alloc(rawData.length);
        rawData.copy(data);

        if (!this.previous_result) {
            this.previous_result = Buffer.from([]);
        }

        if (this.previous_result.length) {
            data = Buffer.concat([this.previous_result, data]);
        }

        const H = 4;
        const C = 1;

        const packets: Buffer[] = [];
        while (offset < data.length) {
            let packet: Buffer = Buffer.from([]);
            let command_length = 1;
            const remaining_length = data.length - offset;

            if (data[offset] === Response_Code.Id && data[offset + 1] === 0x79) {
                command_length = 6;
                packet = data.subarray(offset, offset + command_length);
                packets.push(packet);
            } else if (data[offset] === 0x02 && (data[offset + 1] === 0x00 || data[offset + 1] === 0x01)) {
                switch (data[offset + 3]) {
                    case Response_Code.Error:            command_length = H + 9  + C; break;
                    case Response_Code.Status:           command_length = H + 9  + C; break;
                    case Response_Code.Exist:            command_length = H + 9  + C; break;
                    case Response_Code.MP3_End:          command_length = H + 1  + C; break;
                    case Response_Code.MP3_On:           command_length = H + 1  + C; break;
                    case Response_Code.MP3_Off:          command_length = H + 16 + C; break;
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

                    // Un-handled, so bail on whole packet
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
                } else if (Command.validate_checksum(packet)) {
                    packets.push(packet);
                } else {
                    this.previous_result = packet;
                }
            }

            offset += command_length;
        }

        return packets.map(Parser.handleIncoming);
    }


    // Fires each time a new command is dropped into the stream
    // cmdStream.on('readable', function () {
    static handleIncoming = (data: Buffer): LyncResponse => {
        if (data[0] === Response_Code.Id) {
            return {
                id: data.subarray().toString('utf-8') || ''
            };
        }

        if (!Command.validate_checksum(data)) {
            console.warn('Response received with invalid checksum', data);
            return null;
        }

        switch (data[3]) {
            case Response_Code.Error:
                return {
                    error: data.readUInt8(4)
                };

            case Response_Code.Status:
                return {
                    header: data[0],
                    ignore: data[1],
                    zone: data[2],
                    mode: data[3],
                    settings: {
                        power: !!(data[4] & 0x01 << 0),
                        mute:  !!(data[4] & 0x01 << 1),
                        dnd:   !!(data[4] & 0x01 << 2),
                    },
                    unknown_5: {
                        value:  data[5],
                        hex:    data[5].toString(16),
                        binary: data[5].toString(2)
                    },
                    mp3: {
                        value: data[6],
                        hex: data[6].toString(16),
                        binary: data[6].toString(2)
                    },
                    unknown_7: {
                        value: data[7],
                        hex: data[7].toString(16),
                        binary: data[7].toString(2)
                    },
                    source: (data.readUInt8(8) + 1),
                    volume: (data[9] === 0x00) ? 60 : (data.readUInt8(9) - 0xC4),
                    treble: Lookup.hex_to_signed_dec(data[10]),
                    bass: Lookup.hex_to_signed_dec(data[11]),
                    balance: Lookup.hex_to_signed_dec(data[12]),
                    checksum: data[13],
                }

            case Response_Code.Exist:
                const debug = {
                    header: data[0],
                    ignore_1: data[1],
                    zone: data[2],
                    mode: data[3],
                    ignore_4: data[4],
                    exist_5: {
                        value: data[5],
                        hex: data[5].toString(16),
                        binary: data[5].toString(2)
                    },
                    keypad_6: {
                        value: data[6],
                        hex: data[6].toString(16),
                        binary: data[6].toString(2)
                    },
                    exist_7: {
                        value: data[7],
                        hex: data[7].toString(16),
                        binary: data[7].toString(2)
                    },
                    keypad_8: {
                        value: data[8],
                        hex: data[8].toString(16),
                        binary: data[8].toString(2)
                    },
                    unknown_9: {
                        value: data[9],
                        hex: data[9].toString(16),
                        binary: data[9].toString(2)
                    },
                    unknown_10: {
                        value: data[10],
                        hex: data[10].toString(16),
                        binary: data[10].toString(2)
                    },
                    unknown_11: {
                        value: data[11],
                        hex: data[11].toString(16),
                        binary: data[11].toString(2)
                    },
                    unknown_12: {
                        value: data[12],
                        hex: data[12].toString(16),
                        binary: data[12].toString(2)
                    },
                    checksum: data[13],
                }

                console.log('Exist', debug);

                let response_exist: Response_Exist = {
                    zones: {}
                }
                const zoneBits   = data[5] | data[7] << 8;
                const keypadBits = data[6] | data[8] << 8;
                for (let zz = 0; zz < 12; zz++) {
                    response_exist.zones['' + (zz + 1)] = {
                        exist: !!(zoneBits & 0x01 << zz),
                        keypad: !!(keypadBits & 0x01 << zz)
                    }
                }
                return response_exist;

            case Response_Code.MP3_End:
                return {
                    mp3: {
                        status: 'end'
                    }
                }

            case Response_Code.MP3_On:
                return {
                    mp3: {
                        status: 'on'
                    }
                }

            case Response_Code.MP3_Off:
                return {
                    mp3: {
                        status: 'off',
                        data: data.toString('utf8', 4, 19+31) // Additional 31 bytes is due to a bug in the HTD firmware
                    }
                }

            case Response_Code.MP3_File_Name:
                try {
                    return {
                        mp3: {
                            file: data.subarray(4).toString('utf-8').split("\0").shift() || '' // null terminated string
                        }
                    }
                } catch (e) {
                    console.error(e);
                }

                return null;

            case Response_Code.MP3_Artist_Name:
                try {
                    return {
                        mp3: {
                            artist: data.subarray(4).toString('utf-8').split("\0").shift() || '' // null terminated string
                        }
                    }
                } catch (e) {
                    console.error(e);
                }

                return null;

            case Response_Code.Zone_Source_Name:
            case Response_Code.Source_Name:
                try {
                    return {
                        source: {
                            zone:   data[2],
                            number: data.readUInt8(15) + 1, // source is zero-based
                            name:   data.toString('utf8', 4, 14).split("\0").shift() || ''  // null terminated string
                        }
                    }
                } catch (e) {
                    console.error(e);
                }

                return null;

            case Response_Code.Zone_Name:
                return {
                    zone: {
                        number: data.readUInt8(15),
                        name: data.toString('utf8', 4, 14).split("\0").shift() || '' // null terminated string
                    }
                }

            default:
                const unhandled = data.toString('utf-8');
                console.log('Unhandled', unhandled);

                return {
                    unhandled: unhandled
                }
        }

    };
}