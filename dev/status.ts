import { promisify } from 'util';
import Connector from "../dist/Connector";
import Protocol from "../dist/Protocol";
import {
    Source,
    MP3,
    Response_Exist,
    Response_Id,
    Response_MP3_Artist,
    Response_MP3_End,
    Response_MP3_File,
    Response_MP3_Off,
    Response_MP3_On,
    Response_MP3_Repeat,
    Response_Source_Name,
    Response_Status,
    Response_Zone_Name, Zone, Response_System
} from "../src";


interface StatusZone {
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
    sources: Map<number, string>
}

const sleep = promisify(setTimeout);

const zones = new Map<number, StatusZone>();
zones.set(1,  {number: 1,  name: "Zone 1",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(2,  {number: 2,  name: "Zone 2",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(3,  {number: 3,  name: "Zone 3",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(4,  {number: 4,  name: "Zone 4",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(5,  {number: 5,  name: "Zone 5",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(6,  {number: 6,  name: "Zone 6",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(7,  {number: 7,  name: "Zone 7",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(8,  {number: 8,  name: "Zone 8",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(9,  {number: 9,  name: "Zone 9",  power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(10, {number: 10, name: "Zone 10", power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(11, {number: 11, name: "Zone 11", power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});
zones.set(12, {number: 12, name: "Zone 12", power: false, mute: false, dnd: false, source: 1, volume: 0, treble: 0, bass: 0, balance: 0, sources: new Map()});

type LyncStatus = {
    id: string
    all_on:      boolean
    all_off:     boolean
    party_mode:  boolean
    mp3: {
        repeat: boolean
        on: null | boolean
        file: string
        artist: string
    }
    sources: Map<number, string>
    zones: Map<number, StatusZone>
}

const Lync: LyncStatus = {
    id: '',
    sources: new Map<number, string>,
    zones,
    all_on: false,
    all_off: false,
    party_mode: false,
    mp3: {
        repeat: false,
        on: null,
        file: '',
        artist: ''
    }
}

const LC = new Connector('10.0.0.25', 10006);

const bye = () => {
    LC.client.destroy();
    console.log('\nBye!');
    process.exit(0);
};

LC.events.on('socket:connected', () => {
    console.info('Socket Connected');
});

LC.events.on('socket:error', (error) => {
    console.error('Socket Error', error);
});

LC.events.on('error', (error) => {
    console.error('Lync Error', error);
});

LC.events.on('system', (response: Response_System) => {
    Lync.all_on     = response.system.all_on;
    Lync.all_off    = response.system.all_off;
    Lync.party_mode = response.system.party_mode;
});

LC.events.on('status', (response: Response_Status) => {
    // console.log('- - - - - STATUS - - - - - -');
    // console.dir(response, { depth: null });

    const zone = Lync.zones.get(response.zone.number);
    if (zone) {
        const update: StatusZone = {
            ...zone,
            ...response.zone,

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

    if (response.source.zone === 1) {
        Lync.sources.set(response.source.number, response.source.name);
    }

    Lync.zones.get(response.source.zone)?.sources.set(response.source.number, response.source.name);
});

LC.events.on('zone_name', (response: Response_Zone_Name) => {
    // console.info('StatusZone Name', response.zone.number, response.zone.name);

    const zone = Lync.zones.get(response.zone.number);
    if (zone) {
        const update: StatusZone = {
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

LC.events.on('mp3:repeat', (response: Response_MP3_Repeat) => {
    // console.info('MP3 Repeat', response.mp3.repeat);
    Lync.mp3.repeat = response.mp3.repeat;
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

await LC.send_command(Protocol.set_echo_mode(true));
await LC.send_command(Protocol.set_zone_source_name(12, Source._03, 'Source 3'));

await sleep(2000);

await LC.send_command(Protocol.get_status_all());


process.on('SIGINT', () => bye);

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

console.log('Press s for status, and q to quit')

// on any data into stdin
stdin.on( 'data', function( key ){
    if ( key.toString() === '\u0003' ) {
        bye();
    }

    switch (key.toString()) {
        case 's':
            console.dir(Lync, {depth: null});
            break;

        case 'q':
            bye();
            break;
    }

    // write the key to stdout all normal like
    // process.stdout.write( `WRITE ${key}` );
});
