import {describe, expect, test} from "vitest";
import Command, {Zone} from "../src/Command";


describe.concurrent('Undocumented Functionality', async () => {
    test('get_id()', async () => {
        expect(Command.get_id().get_command()).toEqual(Buffer.from([0x02,0x00,0x00,0x08,0x00,0x0A]));
    });

    test('get_firmware()', async () => {
        expect(Command.get_firmware().get_command()).toEqual(Buffer.from([0x02,0x00,0x00,0xF,0x00,0x11]));
    });

    test('get_status_everything()', async () => {
        expect(Command.get_status_everything().get_command()).toEqual(Buffer.from([0x02,0x00,0x00,0x0C,0x00,0x0E]));
    });

    test('get_info_all_zones()', async () => {
        expect(Command.get_info_all_zones().get_command()).toEqual(Buffer.from([0x02,0x00,0x00,0x11,0x00,0x13]));
    });

    test('get_zone_name(1)', async () => {
        expect(Command.get_zone_name(1).get_command()).toEqual(Buffer.from([0x02,0x00,0x01,0x0D,0x00,0x10]));
    });

    test('get_zone_input_name(1, 1)', async () => {
        expect(Command.get_zone_input_name(1, 1).get_command()).toEqual(Buffer.from([0x02,0x00,0x01,0x0E,0x01,0x12]));
    });
});

describe.concurrent('Undocumented Functionality: Balance', async () => {
    test.concurrent.each([
        [Zone._01, -25, [0x02,0x00,0x01,0x16,0xEE,0x07], 'below minimum'],
        [Zone._01, -18, [0x02,0x00,0x01,0x16,0xEE,0x07], 'minimum'],
        [Zone._01,  -5, [0x02,0x00,0x01,0x16,0xFB,0x14], 'left'],
        [Zone._01,   0, [0x02,0x00,0x01,0x16,0x00,0x19], 'center'],
        [Zone._01,   5, [0x02,0x00,0x01,0x16,0x05,0x1E], 'right'],
        [Zone._01,  18, [0x02,0x00,0x01,0x16,0x12,0x2B], 'maximum'],
        [Zone._01,  25, [0x02,0x00,0x01,0x16,0x12,0x2B], 'above maximum'],
    ])('Command.set_balance(%i, %i) -> %o - %s', async (zone, balance, expected) => {
        expect(Command.set_balance(zone, balance).get_command()).toEqual(Buffer.from(expected));
    });
});

describe.concurrent('Undocumented Functionality: Treble', async () => {
    test.concurrent.each([
        [Zone._01, -15, [0x02,0x00,0x01,0x17,0xF6,0x10], 'below minimum'],
        [Zone._01, -10, [0x02,0x00,0x01,0x17,0xF6,0x10], 'minimum'],
        [Zone._01,  -5, [0x02,0x00,0x01,0x17,0xFB,0x15], 'low'],
        [Zone._01,   0, [0x02,0x00,0x01,0x17,0x00,0x1A], 'none'],
        [Zone._01,   5, [0x02,0x00,0x01,0x17,0x05,0x1F], 'high'],
        [Zone._01,  10, [0x02,0x00,0x01,0x17,0x0A,0x24], 'maximum'],
        [Zone._01,  15, [0x02,0x00,0x01,0x17,0x0A,0x24], 'above maximum'],
    ])('Command.set_treble(%i, %i) -> %o - %s', async (zone, treble, expected) => {
        expect(Command.set_treble(zone, treble).get_command()).toEqual(Buffer.from(expected));
    });
});

describe.concurrent('Undocumented Functionality: Bass', async () => {
    test.concurrent.each([
        [Zone._01, -15, [0x02,0x00,0x01,0x18,0xF6,0x11], 'below minimum'],
        [Zone._01, -10, [0x02,0x00,0x01,0x18,0xF6,0x11], 'minimum'],
        [Zone._01,  -5, [0x02,0x00,0x01,0x18,0xFB,0x16], 'low'],
        [Zone._01,   0, [0x02,0x00,0x01,0x18,0x00,0x1B], 'none'],
        [Zone._01,   5, [0x02,0x00,0x01,0x18,0x05,0x20], 'high'],
        [Zone._01,  10, [0x02,0x00,0x01,0x18,0x0A,0x25], 'maximum'],
        [Zone._01,  15, [0x02,0x00,0x01,0x18,0x0A,0x25], 'above maximum'],
    ])('Command.set_bass(%i, %i) -> %o - %s', async (zone, treble, expected) => {
        expect(Command.set_bass(zone, treble).get_command()).toEqual(Buffer.from(expected));
    });
});
