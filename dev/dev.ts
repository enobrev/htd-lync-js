import { promisify } from 'util';
import Connector from "../dist/Connector";
import Command from "../dist/Command";
import {
    PartyInput,
    Response_Exist,
    Response_Id, Response_MP3_Artist, Response_MP3_End, Response_MP3_File, Response_MP3_Off, Response_MP3_On,
    Response_Source_Name,
    Response_Status,
    Response_Zone_Name
} from "../src";


const sleep = promisify(setTimeout);


interface Settings {
    power: boolean;
    mute: boolean;
    dnd: boolean;
}

interface Zone {
    number: number
    name: string
    power: boolean;
    mute: boolean;
    dnd: boolean;
    source: number
    volume: number
    treble: number
    bass: number
    balance: number
}

const zones = new Map<number, Zone>();
zones.set(1,  {number: 1,  name: "Zone 1",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(2,  {number: 2,  name: "Zone 2",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(3,  {number: 3,  name: "Zone 3",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(4,  {number: 4,  name: "Zone 4",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(5,  {number: 5,  name: "Zone 5",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(6,  {number: 6,  name: "Zone 6",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(7,  {number: 7,  name: "Zone 7",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(8,  {number: 8,  name: "Zone 8",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(9,  {number: 9,  name: "Zone 9",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(10, {number: 10, name: "Zone 10", power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(11, {number: 11, name: "Zone 11", power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});
zones.set(12, {number: 12, name: "Zone 12", power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0});

const Lync = {
    id: '',
    sources: new Map<number, string>,
    zones,
    mp3: {
        on: false,
        file: '',
        artist: ''
    }
}

const LC = new Connector('10.0.0.25', 10006);

LC.events.on('socket:connected', () => {
    console.info('Socket Connected');
});

LC.events.on('socket:error', (error) => {
    console.error('Socket Error', error);
});

LC.events.on('error', (error) => {
    console.error('Lync Error', error);
});

LC.events.on('status', (response: Response_Status) => {
    // console.log('- - - - - STATUS - - - - - -');
    // console.dir(response, { depth: null });

    const zone = Lync.zones.get(response.zone.number);
    if (zone) {
        const update: Zone = {
            ...zone,
            ...response.zone
        };

        zones.set(response.zone.number, update);
    }
});

LC.events.on('exist', (response: Response_Exist) => {
    // console.log('- - - - - EXIST - - - - - -');
    // console.log(response);
});

LC.events.on('id', (response: Response_Id) => {
    // console.info('Lync Id', response.id);

    Lync.id = response.id;
});

LC.events.on('source_name', (response: Response_Source_Name) => {
    // console.info('Source Name', response.source.zone, response.source.number, response.source.name);

    if (response.source.zone !== 1) {
        return;
    }

    Lync.sources.set(response.source.number, response.source.name);

    // V2 Only has one set of sources
    // V3 allows a list of sources per zone
});

LC.events.on('zone_name', (response: Response_Zone_Name) => {
    // console.info('Zone Name', response.zone.number, response.zone.name);

    const zone = Lync.zones.get(response.zone.number);
    if (zone) {
        const update: Zone = {
            ...zone,
            ...response.zone
        };

        zones.set(response.zone.number, update);
    }
});

LC.events.on('mp3:on', (response: Response_MP3_On) => {
    console.info('MP3 On');
    Lync.mp3.on = true;
});

LC.events.on('mp3:off', (response: Response_MP3_Off) => {
    console.info('MP3 Off', response.mp3.data);
    Lync.mp3.on = false;
});

LC.events.on('mp3:end', (response: Response_MP3_End) => {
    console.info('MP3 End');
});

LC.events.on('mp3:artist', (response: Response_MP3_Artist) => {
    // console.info('MP3 Artist', response.mp3.artist);
    Lync.mp3.artist = response.mp3.artist;
});

LC.events.on('mp3:file', (response: Response_MP3_File) => {
    // console.info('MP3 File', response.mp3.file);
    Lync.mp3.file = response.mp3.file;
});

await LC.send_command(Command.set_echo_mode(true));

await LC.send_command(Command.get_id());

await LC.send_command(Command.get_status_everything());

// await LC.send_command(Command.mp3_action(MP3_Action.Repeat_On));
// await LC.send_command(Command.mp3_action(MP3_Action.Shuffle));
// await LC.send_command(Command.mp3_action(MP3_Action.Stop));
// await LC.send_command(Command.mp3_action(MP3_Action.Play));
// await LC.send_command(Command.set_volume(Zone._10, 18));
// await LC.send_command(Command.set_zone_source(Zone._10, Source._18));
// await LC.send_command(Command.get_id());

// await LC.send_command(Command.set_volume(Zone._10, 15));
// await LC.send_command(Command.set_bass(Zone._10, 0));
// await LC.send_command(Command.set_treble(Zone._10, 0));
// await LC.send_command(Command.set_balance(Zone._10, 0));
// await LC.send_command(Command.set_source(Zone._10, Source._07));

// await LC.send_buffer(Command.add_checksum(Buffer.from([
//         Header,
//         0x00,
//         0x00,
//         0x15,
//         0x00
// ])));


// console.log ('Zones');
// for (let zone = 1; zone <= 12; zone++) {
//         LC.send_command(Command.get_zone_name(zone));
// }
// await LC.send_command(Command.get_status_all_zones());

// const oCommand = Command.set_echo_mode(false);
// console.log('Echo Mode', oCommand);
// await LC.send_command(oCommand);
// await sleep(500);

// await LC.send_command(Command.set_mute(7, false));
// await sleep(500);

// await LC.send_command(Command.set_volume_percent(7, 85));
// await sleep(2000);



//
// await LC.send_buffer(Command.add_checksum(Buffer.from([
//     Header,
//     0x00,
//     0x05,
//     0x04,
//     0x20
// ])))

/*
console.log('Starting Sound');
await LC.send_command(Command.mp3_action(Command.MP3_REPEAT_ON));
await LC.send_command(Command.mp3_action(Command.MP3_PLAY));

*/

// console.log('Turning off Dining Room');
// await LC.send_command(Command.set_power(ZONE_DINING_ROOM, false));
// await LC.send_command(Command.set_input(ZONE_DINING_ROOM, INPUT_LAUREN));
// await LC.send_command(Command.set_volume(ZONE_DINING_ROOM, 25));


// console.log('Starting Sound');
// await LC.send_command(Command.mp3_action(Command.MP3_REPEAT_ON));
// await LC.send_command(Command.mp3_action(Command.MP3_PLAY));
// console.log('Turning on Dining Room and Setting Input');
// await LC.send_command(Command.set_power(ZONE_DINING_ROOM, false));
// await LC.send_command(Command.set_power(ZONE_DINING_ROOM, true));
// await LC.send_command(Command.set_input(ZONE_DINING_ROOM, INPUT_MP3));
// await LC.send_command(Command.set_volume(ZONE_DINING_ROOM, 20));


// console.log('Stopping Sound');
// await LC.send_command(Command.mp3_action(MP3_Action.Repeat_On));
// await LC.send_command(Command.mp3_action(MP3_Action.Stop));
// console.log('Turning on Dining Room and Setting Input');
// await LC.send_command(Command.set_zone_power(ZONE_DINING_ROOM, false));
// await LC.send_command(Command.set_zone_power(ZONE_DINING_ROOM, true));
// await LC.send_command(Command.set_input(ZONE_DINING_ROOM, INPUT_MP3));
// await LC.send_command(Command.set_volume(ZONE_DINING_ROOM, 27));
// await LC.send_command(Command.set_balance(ZONE_DINING_ROOM, 0));
// await LC.send_command(Command.set_bass(ZONE_DINING_ROOM, 0));
// await LC.send_command(Command.set_treble(ZONE_DINING_ROOM, 0));
// await LC.send_command(Command.set_mute(ZONE_DINING_ROOM, false));
// await LC.send_command(Command.dnd(ZONE_DINING_ROOM, false));
// await LC.send_command(Command.get_zone_source_name(ZONE_DINING_ROOM, 2));
// await LC.send_command(Command.set_volume_percent(ZONE_DINING_ROOM, 50)); // FIXME: the pct in the response is not being set
// await LC.send_command(Command.set_zone_power(ZONE_DINING_ROOM, false));
// await LC.send_command(Command.get_zone_name(ZONE_DINING_ROOM));
//


// await LC.send_command(Command.set_balance(ZONE_DINING_ROOM, -5));
// await LC.send_command(Command.set_bass(ZONE_DINING_ROOM, -5));
// await LC.send_command(Command.set_treble(ZONE_DINING_ROOM, -8));

// await LC.send_command(Command.set_mute(Zone._03, false));
// await LC.send_command(Command.set_mute(Zone._06, false));
// await LC.send_command(Command.set_mute(Zone._10, false));
//
//
// await LC.send_command(Command.set_dnd(Zone._03, false));
// await LC.send_command(Command.set_dnd(Zone._06, false));
// await LC.send_command(Command.set_dnd(Zone._10, false));


// await LC.send_command(Command.get_zone_name(Zone._01));
// await LC.send_command(Command.get_zone_name(Zone._02));
// await LC.send_command(Command.get_zone_name(Zone._03));
// await LC.send_command(Command.get_zone_name(Zone._04));
// await LC.send_command(Command.get_zone_name(Zone._05));
// await LC.send_command(Command.get_zone_name(Zone._06));
// await LC.send_command(Command.get_zone_name(Zone._07));
// await LC.send_command(Command.get_zone_name(Zone._08));
// await LC.send_command(Command.get_zone_name(Zone._09));
// await LC.send_command(Command.get_zone_name(Zone._10));
// await LC.send_command(Command.get_zone_name(Zone._11));

// await LC.send_command(Command.get_info_all_zones());
// await LC.send_command(Command.set_treble(Zone._06, 5));
// await LC.send_command(Command.get_status_everything());



// console.log('Starting Sound');
// await LC.send_command(Command.mp3_action(MP3_Action.Repeat_On));
// await LC.send_command(Command.mp3_action(MP3_Action.Play));
// console.log('Turning on Malcolm and Setting Input');
// await LC.send_command(Command.set_zone_power(ZONE_MALCOLM, false));
// await LC.send_command(Command.set_zone_power(ZONE_MALCOLM, 1));
// await LC.send_command(Command.set_input(ZONE_MALCOLM, INPUT_MP3));
// await LC.send_command(Command.set_volume(ZONE_MALCOLM, 40));

// console.log('Done');


// console.log ('Zones');
// for (let zone = 1; zone <= 12; zone++) {
//     await LC.send_command(Command.get_zone_name(zone));
//     await sleep(100);
//
// }

// await LC.send_command(Command.get_status());

// console.log ('Sources');
// for (let src = 1; src <= 18; src++) {
//     await LC.send_command(Command.get_source_name(src, 1));
//     await sleep(100);
// }

console.log('waiting 2 seconds..');
await sleep(2000);
await LC.client.destroy();

console.dir(Lync);