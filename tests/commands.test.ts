
import { expect, test } from 'vitest'
import Command, {Func, Header, IsVolume, Mode, Zone} from "../src/Command";



test('Generates Commands Properly', async () => {
    const command = Command.get_info_all_zones();
    const buffer  = command.get_command();
    console.log(buffer);

    expect(buffer[0]).toBe(Header);
    expect(buffer[1]).toBe(IsVolume.No);
    expect(buffer[2]).toBe(Zone.None);
    expect(buffer[3]).toBe(Mode.Info_Zones);
    expect(buffer[4]).toBe(Func.Off);
})