export default class Lookup {
    static ranged_number(number, min, max) {
        if (number < min) {
            return min;
        }
        if (number > max) {
            return max;
        }
        return number;
    }
    static signed_dec_to_hex(dec) {
        if (dec >= 0) {
            return dec;
        }
        const bitWidth = 8;
        const maxValue = Math.pow(2, bitWidth);
        return (maxValue + dec);
    }
    static hex_to_signed_dec(hex) {
        const bitWidth = 8;
        const maxValue = Math.pow(2, bitWidth);
        const halfMax = maxValue / 2;
        return hex >= halfMax ? hex - maxValue : hex;
    }
    static valid_tone(b) {
        return Lookup.ranged_number(b, -10, 10);
    }
    static valid_balance(b) {
        return Lookup.ranged_number(b, -18, 18);
    }
    static valid_zone(z) {
        return Lookup.ranged_number(z, 1, 12);
    }
    static valid_volume(v) {
        return Lookup.ranged_number(v, 0, 60);
    }
    static get_string_name(a) {
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
