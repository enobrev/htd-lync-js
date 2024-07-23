import Lookup from "./Lookup";
// Command: Header, IsVolume, Zone|Source, Mode, Function, Checksum
export const Header = 0x02;
export const IsVolume = {
    No: 0x00,
    Yes: 0x01
};
export const Zone = {
    None: 0x00,
    _01: 0x01,
    _02: 0x02,
    _03: 0x03,
    _04: 0x04,
    _05: 0x05,
    _06: 0x06,
    _07: 0x07,
    _08: 0x08,
    _09: 0x09,
    _10: 0x0A,
    _11: 0x0B,
    _12: 0x0C
};
export const Source = {
    _01: 0x10,
    _02: 0x11,
    _03: 0x12,
    _04: 0x13,
    _05: 0x14,
    _06: 0x15,
    _07: 0x16,
    _08: 0x17,
    _09: 0x18,
    _10: 0x19,
    _11: 0x1A,
    _12: 0x1B,
    _13: 0x63,
    _14: 0x64,
    _15: 0x65,
    _16: 0x66,
    _17: 0x67,
    _18: 0x68,
    _19: 0x7E
};
export const Mode = {
    Repeat: 0x01,
    Control: 0x04,
    Info_Zones: 0x05,
    Id: 0x08,
    Status_Everything: 0x0C,
    Zone_Name: 0x0D,
    Source_Name: 0x0E,
    Firmware: 0x0F,
    Status_Zones: 0x11,
    Volume: 0x15,
    Balance: 0x16,
    Treble: 0x17,
    Bass: 0x18,
    Echo: 0x19,
};
export const Func = {
    Off: 0x00,
    Shuffle: 0x02, // V3
    MP3_FF: 0x0A,
    MP3_Play: 0x0B,
    MP3_Back: 0x0C,
    MP3_Stop: 0x0D,
    Mute_On: 0x1E,
    Mute_Off: 0x1F,
    All_Power_On: 0x55,
    All_Power_Off: 0x56,
    Zone_Power_On: 0x57,
    Zone_Power_Off: 0x58,
    DND_On: 0x59,
    DND_Off: 0x5A,
    Party_Mode_S_13: 0x69,
    Party_Mode_S_14: 0x6A,
    Party_Mode_S_15: 0x6B,
    Party_Mode_S_16: 0x6C,
    On: 0xFF
};
export const Input = {
    _01: 0x10,
    _02: 0x11,
    _03: 0x12,
    _04: 0x13,
    _05: 0x14,
    _06: 0x15,
    _07: 0x16,
    _08: 0x17,
    _09: 0x18,
    _10: 0x19,
    _11: 0x1A,
    _12: 0x1B,
    _13: 0x63,
    _14: 0x64,
    _15: 0x65,
    _16: 0x66,
    _17: 0x67,
    _18: 0x68
};
export const PartySource = {
    _01: 0x36,
    _02: 0x37,
    _03: 0x38,
    _04: 0x39,
    _05: 0x3A,
    _06: 0x3B,
    _07: 0x3C,
    _08: 0x3D,
    _09: 0x3E,
    _10: 0x3F,
    _11: 0x40,
    _12: 0x41,
    _13: 0x69,
    _14: 0x6A,
    _15: 0x6B,
    _16: 0x6C,
    _17: 0x6D,
    _18: 0x6E
};
export const MP3_Action = {
    Null: 0,
    Back: 1,
    Play: 2,
    FF: 3,
    Stop: 4,
    Repeat_On: 5,
    Repeat_Off: 6,
    Shuffle: 7, // V3
};
export default class Command {
    is_volume;
    zone;
    mode;
    func;
    constructor({ zone = Zone.None, mode = Mode.Control, func = Func.Off }) {
        this.is_volume = mode === Mode.Volume ? IsVolume.Yes : IsVolume.No;
        this.zone = zone;
        this.mode = mode;
        this.func = func;
    }
    get_command() {
        return Command.add_checksum(Buffer.from([
            Header,
            this.is_volume,
            this.zone,
            this.mode,
            this.func
        ]));
    }
    static add_checksum(command) {
        const checksum = Command.calculate_checksum(command);
        let checked = Buffer.alloc(command.length + 1, command);
        checked.writeUInt8(checksum, checked.length - 1);
        return checked;
    }
    static calculate_checksum(command) {
        let checksum = 0;
        command.forEach(char => checksum += char);
        checksum &= 0x0FF;
        return checksum;
    }
    static validate_checksum(data) {
        const actual = data[data.length - 1];
        const calculated = Command.add_checksum(data.subarray(0, data.length - 1))[data.length - 1];
        return actual === calculated;
    }
    static set_echo_mode(on) {
        const func = on ? Func.On : Func.Off;
        return new Command({ mode: Mode.Echo, func });
    }
    //
    // static get_model(): Command {
    //     return new Command({command: Command.Model});
    // }
    static get_id() {
        return new Command({ mode: Mode.Id });
    }
    static get_firmware() {
        return new Command({ mode: Mode.Firmware });
    }
    static get_status_everything() {
        return new Command({ mode: Mode.Status_Everything });
    }
    static get_status_all_zones() {
        return new Command({ mode: Mode.Info_Zones });
    }
    static get_info_all_zones() {
        return new Command({ mode: Mode.Status_Zones });
    }
    static get_zone_name(zone) {
        return new Command({ mode: Mode.Zone_Name, zone });
    }
    static get_zone_source_name(zone, source) {
        const func = source - 1;
        return new Command({ mode: Mode.Source_Name, zone, func });
    }
    static set_power(on) {
        const func = on ? Func.All_Power_On : Func.All_Power_Off;
        return new Command({ mode: Mode.Control, func });
    }
    static set_zone_power(zone, on) {
        const func = on ? Func.Zone_Power_On : Func.Zone_Power_Off;
        return new Command({ mode: Mode.Control, zone, func });
    }
    // Lync12 v2 Documentation is wrong for setting volume.  They have different bit codes for send and receive.
    // The controller uses the documented receive codes to set as well. not the published ones.
    static set_volume(zone, _volume) {
        const volume = Lookup.valid_volume(_volume);
        // For volume command, level 60 is 0x00, 59 is 0xFF, and 0 is 0xC4
        const func = (volume + 0x0C4) & 0x0FF;
        console.log(`Volume controller: ${zone}, ${func}`);
        return new Command({ mode: Mode.Volume, zone, func });
    }
    static set_mute(zone, on) {
        const func = on ? Func.Mute_On : Func.Mute_Off;
        return new Command({ mode: Mode.Control, zone, func });
    }
    static set_input(zone, func) {
        return new Command({ mode: Mode.Control, zone, func });
    }
    static set_dnd(zone, on) {
        const func = on ? Func.DND_On : Func.DND_Off;
        return new Command({ mode: Mode.Control, zone, func });
    }
    static set_balance(zone, _balance) {
        const balance = Lookup.valid_balance(_balance);
        const func = Lookup.signed_dec_to_hex(balance);
        return new Command({ mode: Mode.Balance, zone, func });
    }
    static set_treble(zone, _treble) {
        const treble = Lookup.valid_tone(_treble);
        const func = Lookup.signed_dec_to_hex(treble);
        return new Command({ mode: Mode.Treble, zone, func });
    }
    static set_bass(zone, _bass) {
        const bass = Lookup.valid_tone(_bass);
        const func = Lookup.signed_dec_to_hex(bass);
        const command = new Command({ mode: Mode.Bass, zone, func });
        console.log('SET BASS', command.get_command());
        return command;
    }
    static set_source(zone, func) {
        return new Command({ mode: Mode.Control, zone, func });
    }
    static mp3_action(action) {
        switch (action) {
            case MP3_Action.Back: return new Command({ mode: Mode.Control, func: Func.MP3_Back });
            case MP3_Action.Play: return new Command({ mode: Mode.Control, func: Func.MP3_Play });
            case MP3_Action.FF: return new Command({ mode: Mode.Control, func: Func.MP3_FF });
            case MP3_Action.Stop: return new Command({ mode: Mode.Control, func: Func.MP3_Stop });
            case MP3_Action.Repeat_On: return new Command({ mode: Mode.Repeat, func: Func.On });
            case MP3_Action.Repeat_Off: return new Command({ mode: Mode.Repeat, func: Func.Off });
            case MP3_Action.Shuffle: return new Command({ mode: Mode.Repeat, func: Func.Shuffle }); // V3
            default:
                throw new Error('Unrecognized MP3 Command');
        }
    }
}
