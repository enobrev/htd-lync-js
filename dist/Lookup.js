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
    static valid_tone(tone) {
        return Lookup.ranged_number(tone, -10, 10);
    }
    static valid_balance(balance) {
        return Lookup.ranged_number(balance, -18, 18);
    }
    static valid_volume(volume) {
        return Lookup.ranged_number(volume, 0, 60);
    }
}
