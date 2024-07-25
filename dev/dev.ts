import { promisify } from 'util';
import Connector from "../dist/Connector";
import Command, {Header, Input, Mode, MP3_Action, Source, Zone} from "../dist/Command";
import {LyncResponse} from "../dist/";
import {PartyInput} from "../src";

const ZONE_MALCOLM = 4;
const ZONE_DINING_ROOM = Zone._06;
const INPUT_MP3 = Input._18;
const INPUT_MARK = Input._13;
const INPUT_LAUREN = Input._14;

const sleep = promisify(setTimeout);

const LC = new Connector('10.0.0.25', 10006);
LC.events.on('data', (response: LyncResponse) => {
console.log('- - - - - DATA - - - - - -');
console.dir(response, { depth: null })
});

await LC.send_command(Command.set_echo_mode(true));

await LC.send_command(Command.get_id());
await LC.send_command(Command.set_party_mode(Zone.None, PartyInput._13));
// await LC.send_command(Command.get_status_everything());
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

console.log('waiting 3 seconds..');
await sleep(3000);
await LC.client.destroy();