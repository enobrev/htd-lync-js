import Connector from "../dist/Connector";
import Command from "../dist/Command";
import {
    Input,
    MP3_Action,
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
    Response_Zone_Name
} from "../src";


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

type LyncStatus = {
    id: string
    sources: Map<number, string>
    zones: Map<number, Zone>
    mp3: {
        repeat: boolean
        on: null | boolean
        file: string
        artist: string
    }
}

const Lync: LyncStatus = {
    id: '',
    sources: new Map<number, string>,
    zones,
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

await LC.send_command(Command.set_echo_mode(true));

await LC.send_command(Command.get_id());

await LC.send_command(Command.get_status_everything());

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
