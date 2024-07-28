import {describe, expect, test} from "vitest";
import Protocol, {Zone} from "../src/Protocol";


describe.concurrent('Undocumented Functionality', async () => {
    test('get_firmware()', async () => {
        expect(Protocol.get_firmware().get_command()).toEqual(Buffer.from([0x02,0x00,0x00,0xF,0x00,0x11]));
    });

    test('get_status_zones()', async () => {
        expect(Protocol.get_status_zones().get_command()).toEqual(Buffer.from([0x02,0x00,0x00,0x11,0x00,0x13]));
    });

    test('get_zone_name(1)', async () => {
        expect(Protocol.get_zone_name(1).get_command()).toEqual(Buffer.from([0x02,0x00,0x01,0x0D,0x00,0x10]));
    });

    test('get_zone_input_name(1, 1)', async () => {
        expect(Protocol.get_source_name(1, 1).get_command()).toEqual(Buffer.from([0x02,0x00,0x01,0x0E,0x01,0x12]));
    });
});
