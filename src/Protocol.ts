import Lookup from "./Lookup";

// Command: Header, IsVolume, Zone, Mode, Func|PartyInput, Checksum

export const Header   = 0x02;
export const IsVolume = {
    No:  0x00,
    Yes: 0x01
}
export type IsVolume = (typeof IsVolume)[keyof typeof IsVolume];
export const Zone = {
    Broadcast:  0x00,
    _01:        0x01,
    _02:        0x02,
    _03:        0x03,
    _04:        0x04,
    _05:        0x05,
    _06:        0x06,
    _07:        0x07,
    _08:        0x08,
    _09:        0x09,
    _10:        0x0A,
    _11:        0x0B,
    _12:        0x0C
}
export type Zone = (typeof Zone)[keyof typeof Zone];

export const Command = {
    Set_MP3_Repeat:         0x01,
    Common:                 0x04,
    Get_Status_All_Zones:   0x05,
    Set_Name_Zone:          0x06,
    Set_Name_Source:        0x07,
    Id:                     0x08,
    Recall_File:            0x0A,
    Save_File:              0x0B,
    Get_Status_All:         0x0C,
    Get_Zone_Name:          0x0D,
    Get_Zone_Source_Name:   0x0E,
    Firmware:               0x0F, // V3
    Get_Status_Zones:       0x11, // Undocumented
    Set_Volume:             0x15,
    Set_Balance:            0x16,
    Set_Treble:             0x17,
    Set_Bass:               0x18,
    Echo:                   0x19,
    Set_Name_Default:       0x1C,
    Set_Audio_Default:      0x1E,
}
export type Command = (typeof Command)[keyof typeof Command];

export const Data = {
    Off:                0x00,
    Shuffle:            0x02, // V3
    MP3_FF:             0x0A,
    MP3_Play:           0x0B,
    MP3_Back:           0x0C,
    MP3_Stop:           0x0D,
    Mute_On:            0x1E,
    Mute_Off:           0x1F,
    All_Power_On:       0x55,
    All_Power_Off:      0x56,
    Zone_Power_On:      0x57,
    Zone_Power_Off:     0x58,
    DND_On:             0x59,
    DND_Off:            0x5A,
    On:                 0xFF
}
export type Data = (typeof Data)[keyof typeof Data];

export const Source = {
    _01:  0x10,
    _02:  0x11,
    _03:  0x12,
    _04:  0x13,
    _05:  0x14,
    _06:  0x15,
    _07:  0x16,
    _08:  0x17,
    _09:  0x18,
    _10:  0x19,
    _11:  0x1A,
    _12:  0x1B,
    _13:  0x63,
    _14:  0x64,
    _15:  0x65,
    _16:  0x66,
    _17:  0x67,
    _18:  0x68
}
export type Source = (typeof Source)[keyof typeof Source];

export const PartySource = {
    _01:  0x36,
    _02:  0x37,
    _03:  0x38,
    _04:  0x39,
    _05:  0x3A,
    _06:  0x3B,
    _07:  0x3C,
    _08:  0x3D,
    _09:  0x3E,
    _10:  0x3F,
    _11:  0x40,
    _12:  0x41,
    _13:  0x69,
    _14:  0x6A,
    _15:  0x6B,
    _16:  0x6C,
    _17:  0x6D,
    _18:  0x6E
}
export type PartySource = (typeof PartySource)[keyof typeof PartySource];

export const MP3 = {
    Null:       0,
    Back:       1,
    Play:       2,
    FF:         3,
    Stop:       4,
    Repeat_On:  5,
    Repeat_Off: 6,
    Shuffle:    7,  // V3
} as const;

export type MP3 = (typeof MP3)[keyof typeof MP3];

type CommandProps = {
    zone?:    Zone;
    command?: Command
    data?:    Data | Source | PartySource | Name
}

type Name = number[]

export default class Protocol {
    header:     typeof Header
    is_volume:  IsVolume
    zone:       Zone
    command:    Command
    data:       Data | Source | PartySource | Name

    constructor({zone = Zone.Broadcast, command = Command.Common, data = Data.Off}: CommandProps) {
        this.header    = Header;
        this.is_volume = command === Command.Set_Volume ? IsVolume.Yes : IsVolume.No;
        this.zone      = zone
        this.command   = command
        this.data      = data
    }

    get_command(): Buffer {
        const data = !Array.isArray(this.data) ? [this.data] : this.data;
        const command = [
            this.header,
            this.is_volume,
            this.zone,
            this.command
        ].concat(data);

        return Protocol.add_checksum(Buffer.from(command));
    }

    static add_checksum(command: Buffer): Buffer {
        const checksum = Protocol.calculate_checksum(command);
        let checked    = Buffer.alloc(command.length + 1, command);
        checked.writeUInt8(checksum, checked.length - 1);
        return checked;
    }

    static calculate_checksum(command: Buffer): number {
        let checksum = 0;
        command.forEach(char => checksum += char);
        checksum &= 0x0FF;

        return checksum;
    }

    static validate_checksum(data: Buffer): boolean {
        const actual = data[data.length - 1];
        const calculated = Protocol.add_checksum(data.subarray(0, data.length - 1))[data.length - 1];
        return actual === calculated;
    }

    // Doc Note: This command suppresses returned responses from Lync.
    static set_echo_mode(on: boolean): Protocol {
        const data = on ? Data.On : Data.Off;

        return new Protocol({command: Command.Echo, data});
    }

    static get_id(): Protocol {
        return new Protocol({command: Command.Id});
    }

    static get_firmware(): Protocol {
        return new Protocol({command: Command.Firmware});
    }

    // Developer Note: The docs say you can set a zone on this, but setting a zone makes no difference in output
    //
    // Doc Note:
    // Echo Data :
    // 1. Echo All Zone Status.
    // 2. Echo All Zone Name.
    // 3. Echo All Source Name
    // 4. Echo MP3 On/Off
    // 5. Echo MP3 File Name and Artist Name
    static get_status_all(): Protocol {
        return new Protocol({command: Command.Get_Status_All});
    }

    static get_status_zones(): Protocol {
        return new Protocol({command: Command.Get_Status_Zones});
    }

    // Doc Note:
    // Echo Data : Echo All Zone Status.
    // Reply format reference the “Tx Format” “Zone Internal Status”
    static get_status_all_zones(): Protocol {
        return new Protocol({command: Command.Get_Status_All_Zones});
    }

    // Developer Note: Lync12 v2 Documentation is wrong for setting party mode.  They have the zone bits set, and the
    // zone should be zero
    static set_party_mode(data: PartySource): Protocol {
        return new Protocol({command: Command.Common, data});
    }

    // Doc Note: Echo Data : Echo Zone Name
    static get_zone_name(zone: Zone): Protocol {
        return new Protocol({command: Command.Get_Zone_Name, zone});
    }

    // Doc Note: Echo Data : Echo Zone Source Name
    static get_source_name(zone: Zone, data: Source): Protocol {
        return new Protocol({command: Command.Get_Zone_Source_Name, zone, data});
    }

    static set_all_power(on: boolean): Protocol {
        const data = on ? Data.All_Power_On : Data.All_Power_Off;
        return new Protocol({command: Command.Common, data});
    }

    // Docs Note: If zone address is 0 for broadcast, this command turns all on/off and response is same as "Power All On/Off" above
    // - If zone address is specific, response is just cmd 0x05 for that zone (14 bytes)
    // - there is NO response if the value is already at the desired value
    static set_zone_power(zone: Zone, on: boolean): Protocol {
        const data = on ? Data.Zone_Power_On : Data.Zone_Power_Off;
        return new Protocol({command: Command.Common, zone, data});
    }

    // Developer Note: Doc Values are way off for these
    static set_volume(zone: Zone, _volume: number): Protocol {
        const volume = Lookup.valid_volume(_volume);

        // For volume command, level 60 is 0x00, 59 is 0xFF, and 0 is 0xC4
        const data = (volume + 0x0C4) & 0x0FF as Data;

        return new Protocol({command: Command.Set_Volume, zone, data: data});
    }

    static set_mute(zone: Zone, on: boolean): Protocol {
        const data = on ? Data.Mute_On : Data.Mute_Off;
        return new Protocol({command: Command.Common, zone, data});
    }

    // Docs Note: In addition to setting the input source for a specific zone, sending an Input Source Select command to
    // the Lync will also result in the selected zone getting turned on.
    // - response is cmd 0x05 for the particular zone (14 bytes)
    // - there is NO response if the input is already at the desired source
    // - there is NO response and the physical keypad doesn't show a source name if the source number is out of range
    static set_source(zone: Zone, data: Source): Protocol {
        return new Protocol({command: Command.Common, zone, data: data});
    }

    static set_dnd(zone: Zone, on: boolean): Protocol {
        const data = on ? Data.DND_On : Data.DND_Off;
        return new Protocol({command: Command.Common, zone, data});
    }

    // Developer Note: Doc Values are way off for these
    static set_balance(zone: Zone, _balance: number): Protocol {
        const balance = Lookup.valid_balance(_balance);
        const data    = Lookup.signed_dec_to_hex(balance);

        return new Protocol({command: Command.Set_Balance, zone, data});
    }

    // Developer Note: Doc Values are way off for these
    static set_treble(zone: Zone, _treble: number): Protocol {
        const treble = Lookup.valid_tone(_treble);
        const data   = Lookup.signed_dec_to_hex(treble);

        return new Protocol({command: Command.Set_Treble, zone, data});
    }

    // Developer Note: Doc Values are way off for these
    static set_bass(zone: Zone, _bass: number): Protocol {
        const bass = Lookup.valid_tone(_bass);
        const data = Lookup.signed_dec_to_hex(bass);
        return new Protocol({command: Command.Set_Bass, zone, data});
    }

    // Developer Note: The docs say this resets a single zone name, but I'm seeing it reset all zones and sources
    static reset_zone_names() {
        return new Protocol({command: Command.Set_Name_Default});
    }

    static reset_zone_audio(zone: Zone) {
        return new Protocol({command: Command.Set_Audio_Default, zone});
    }

    static set_zone_name(zone: Zone, name: string) {
        if (name.length > 10) {
            name = name.substring(0, 10);
        }

        const data: Name = [0x00];

        for (let i = 0; i < name.length; i++) {
            data.push(name.charCodeAt(i));
        }

        while(data.length < 12) {
            data.push(0x00);
        }

        return new Protocol({command: Command.Set_Name_Zone, zone, data});
    }

    // FIXME: I'm unsure as of yet if data[0] should be 1-18 (per the docs) or the source hex
    // Doc Note: Each Zone has its own set of Source Names that can be set.
    static set_zone_source_name(zone: Zone, source: Source, name: string) {
        if (name.length > 10) {
            name = name.substring(0, 10);
        }

        const data: Name = [source];

        for (let i = 0; i < name.length; i++) {
            data.push(name.charCodeAt(i));
        }

        while(data.length < 12) {
            data.push(0x00);
        }

        return new Protocol({command: Command.Set_Name_Source, zone, data});
    }

    static recall_file(file: number): Protocol {
        const data = Lookup.ranged_number(file, 1, 4);
        return new Protocol({command: Command.Recall_File, data});
    }

    static save_file(file: number): Protocol {
        const data = Lookup.ranged_number(file, 1, 4);
        return new Protocol({command: Command.Save_File, data});
    }

    static mp3(action: MP3): Protocol {
        switch (action) {
            case MP3.Back:       return new Protocol({command: Command.Common,          data: Data.MP3_Back});
            case MP3.Play:       return new Protocol({command: Command.Common,          data: Data.MP3_Play});
            case MP3.FF:         return new Protocol({command: Command.Common,          data: Data.MP3_FF});
            case MP3.Stop:       return new Protocol({command: Command.Common,          data: Data.MP3_Stop});
            case MP3.Repeat_On:  return new Protocol({command: Command.Set_MP3_Repeat,  data: Data.On});
            case MP3.Repeat_Off: return new Protocol({command: Command.Set_MP3_Repeat,  data: Data.Off});
            case MP3.Shuffle:    return new Protocol({command: Command.Set_MP3_Repeat,  data: Data.Shuffle}); // V3
            default:
                throw new Error('Unrecognized MP3 Command');
        }
    }
}