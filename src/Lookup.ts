export default class Lookup {
    static ranged_number(number: number, min: number, max: number): number {
        if (number < min) {
            return min;
        }

        if (number > max) {
            return max;
        }

        return number;
    }

    static signed_dec_to_hex(dec: number): number {
        if (dec >= 0) {
            return dec;
        }

        const bitWidth = 8;
        const maxValue = Math.pow(2, bitWidth);
        return (maxValue + dec);
    }

    static hex_to_signed_dec(hex: number): number {
        const bitWidth = 8;
        const maxValue = Math.pow(2, bitWidth);
        const halfMax  = maxValue / 2;

        return hex >= halfMax ? hex - maxValue : hex;
    }

    static valid_tone(b: number): number {
        return Lookup.ranged_number(b, -10, 10);
    }

    static valid_balance(b: number): number {
        return Lookup.ranged_number(b, -18, 18);
    }

    static valid_zone(z: number): number {
        return Lookup.ranged_number(z, 1, 12);
    }

    static valid_volume(v: number): number {
        return Lookup.ranged_number(v, 0, 60);
    }

    static get_string_name(a: Buffer): string {
        let name = [];
        for (const value of a) {
            if (value === 0x00) {
                break;
            }

            name.push(parseInt(value.toString(), 10));
        }

        return Buffer.from(name).toString('ascii');
    }
}