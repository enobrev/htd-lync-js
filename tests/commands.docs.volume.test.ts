
import {describe, expect, test} from 'vitest'
import Protocol from "../src/Protocol";

describe.concurrent('Zone Volume', () => {
    test.concurrent.each([
        [ 0,   1, [0x02,0x01,0x01,0x15,0xC4,0xDD]],
        [ 0,   2, [0x02,0x01,0x02,0x15,0xC4,0xDE]],
        [ 0,   3, [0x02,0x01,0x03,0x15,0xC4,0xDF]],
        [ 0,   4, [0x02,0x01,0x04,0x15,0xC4,0xE0]],
        [ 0,   5, [0x02,0x01,0x05,0x15,0xC4,0xE1]],
        [ 0,   6, [0x02,0x01,0x06,0x15,0xC4,0xE2]],
        [ 0,   7, [0x02,0x01,0x07,0x15,0xC4,0xE3]],
        [ 0,   8, [0x02,0x01,0x08,0x15,0xC4,0xE4]],
        [ 0,   9, [0x02,0x01,0x09,0x15,0xC4,0xE5]],
        [ 0,  10, [0x02,0x01,0x0A,0x15,0xC4,0xE6]],
        [ 0,  11, [0x02,0x01,0x0B,0x15,0xC4,0xE7]],
        [ 0,  12, [0x02,0x01,0x0C,0x15,0xC4,0xE8]],
        [ 1,   1, [0x02,0x01,0x01,0x15,0xC5,0xDE]],
        [ 1,   2, [0x02,0x01,0x02,0x15,0xC5,0xDF]],
        [ 1,   3, [0x02,0x01,0x03,0x15,0xC5,0xE0]],
        [ 1,   4, [0x02,0x01,0x04,0x15,0xC5,0xE1]],
        [ 1,   5, [0x02,0x01,0x05,0x15,0xC5,0xE2]],
        [ 1,   6, [0x02,0x01,0x06,0x15,0xC5,0xE3]],
        [ 1,   7, [0x02,0x01,0x07,0x15,0xC5,0xE4]],
        [ 1,   8, [0x02,0x01,0x08,0x15,0xC5,0xE5]],
        [ 1,   9, [0x02,0x01,0x09,0x15,0xC5,0xE6]],
        [ 1,  10, [0x02,0x01,0x0A,0x15,0xC5,0xE7]],
        [ 1,  11, [0x02,0x01,0x0B,0x15,0xC5,0xE8]],
        [ 1,  12, [0x02,0x01,0x0C,0x15,0xC5,0xE9]],
        [ 2,   1, [0x02,0x01,0x01,0x15,0xC6,0xDF]],
        [ 2,   2, [0x02,0x01,0x02,0x15,0xC6,0xE0]],
        [ 2,   3, [0x02,0x01,0x03,0x15,0xC6,0xE1]],
        [ 2,   4, [0x02,0x01,0x04,0x15,0xC6,0xE2]],
        [ 2,   5, [0x02,0x01,0x05,0x15,0xC6,0xE3]],
        [ 2,   6, [0x02,0x01,0x06,0x15,0xC6,0xE4]],
        [ 2,   7, [0x02,0x01,0x07,0x15,0xC6,0xE5]],
        [ 2,   8, [0x02,0x01,0x08,0x15,0xC6,0xE6]],
        [ 2,   9, [0x02,0x01,0x09,0x15,0xC6,0xE7]],
        [ 2,  10, [0x02,0x01,0x0A,0x15,0xC6,0xE8]],
        [ 2,  11, [0x02,0x01,0x0B,0x15,0xC6,0xE9]],
        [ 2,  12, [0x02,0x01,0x0C,0x15,0xC6,0xEA]],
        [ 3,   1, [0x02,0x01,0x01,0x15,0xC7,0xE0]],
        [ 3,   2, [0x02,0x01,0x02,0x15,0xC7,0xE1]],
        [ 3,   3, [0x02,0x01,0x03,0x15,0xC7,0xE2]],
        [ 3,   4, [0x02,0x01,0x04,0x15,0xC7,0xE3]],
        [ 3,   5, [0x02,0x01,0x05,0x15,0xC7,0xE4]],
        [ 3,   6, [0x02,0x01,0x06,0x15,0xC7,0xE5]],
        [ 3,   7, [0x02,0x01,0x07,0x15,0xC7,0xE6]],
        [ 3,   8, [0x02,0x01,0x08,0x15,0xC7,0xE7]],
        [ 3,   9, [0x02,0x01,0x09,0x15,0xC7,0xE8]],
        [ 3,  10, [0x02,0x01,0x0A,0x15,0xC7,0xE9]],
        [ 3,  11, [0x02,0x01,0x0B,0x15,0xC7,0xEA]],
        [ 3,  12, [0x02,0x01,0x0C,0x15,0xC7,0xEB]],
        [ 4,   1, [0x02,0x01,0x01,0x15,0xC8,0xE1]],
        [ 4,   2, [0x02,0x01,0x02,0x15,0xC8,0xE2]],
        [ 4,   3, [0x02,0x01,0x03,0x15,0xC8,0xE3]],
        [ 4,   4, [0x02,0x01,0x04,0x15,0xC8,0xE4]],
        [ 4,   5, [0x02,0x01,0x05,0x15,0xC8,0xE5]],
        [ 4,   6, [0x02,0x01,0x06,0x15,0xC8,0xE6]],
        [ 4,   7, [0x02,0x01,0x07,0x15,0xC8,0xE7]],
        [ 4,   8, [0x02,0x01,0x08,0x15,0xC8,0xE8]],
        [ 4,   9, [0x02,0x01,0x09,0x15,0xC8,0xE9]], // Undocumented
        [ 4,  10, [0x02,0x01,0x0A,0x15,0xC8,0xEA]],
        [ 4,  11, [0x02,0x01,0x0B,0x15,0xC8,0xEB]],
        [ 4,  12, [0x02,0x01,0x0C,0x15,0xC8,0xEC]],
        [ 5,   1, [0x02,0x01,0x01,0x15,0xC9,0xE2]],
        [ 5,   2, [0x02,0x01,0x02,0x15,0xC9,0xE3]],
        [ 5,   3, [0x02,0x01,0x03,0x15,0xC9,0xE4]],
        [ 5,   4, [0x02,0x01,0x04,0x15,0xC9,0xE5]],
        [ 5,   5, [0x02,0x01,0x05,0x15,0xC9,0xE6]],
        [ 5,   6, [0x02,0x01,0x06,0x15,0xC9,0xE7]],
        [ 5,   7, [0x02,0x01,0x07,0x15,0xC9,0xE8]],
        [ 5,   8, [0x02,0x01,0x08,0x15,0xC9,0xE9]],
        [ 5,   9, [0x02,0x01,0x09,0x15,0xC9,0xEA]], // Undocumented
        [ 5,  10, [0x02,0x01,0x0A,0x15,0xC9,0xEB]],
        [ 5,  11, [0x02,0x01,0x0B,0x15,0xC9,0xEC]],
        [ 5,  12, [0x02,0x01,0x0C,0x15,0xC9,0xED]],
        [ 6,   1, [0x02,0x01,0x01,0x15,0xCA,0xE3]],
        [ 6,   2, [0x02,0x01,0x02,0x15,0xCA,0xE4]],
        [ 6,   3, [0x02,0x01,0x03,0x15,0xCA,0xE5]],
        [ 6,   4, [0x02,0x01,0x04,0x15,0xCA,0xE6]],
        [ 6,   5, [0x02,0x01,0x05,0x15,0xCA,0xE7]],
        [ 6,   6, [0x02,0x01,0x06,0x15,0xCA,0xE8]],
        [ 6,   7, [0x02,0x01,0x07,0x15,0xCA,0xE9]],
        [ 6,   8, [0x02,0x01,0x08,0x15,0xCA,0xEA]],
        [ 6,   9, [0x02,0x01,0x09,0x15,0xCA,0xEB]], // Undocumented
        [ 6,  10, [0x02,0x01,0x0A,0x15,0xCA,0xEC]],
        [ 6,  11, [0x02,0x01,0x0B,0x15,0xCA,0xED]],
        [ 6,  12, [0x02,0x01,0x0C,0x15,0xCA,0xEE]],
        [ 7,   1, [0x02,0x01,0x01,0x15,0xCB,0xE4]],
        [ 7,   2, [0x02,0x01,0x02,0x15,0xCB,0xE5]],
        [ 7,   3, [0x02,0x01,0x03,0x15,0xCB,0xE6]],
        [ 7,   4, [0x02,0x01,0x04,0x15,0xCB,0xE7]],
        [ 7,   5, [0x02,0x01,0x05,0x15,0xCB,0xE8]],
        [ 7,   6, [0x02,0x01,0x06,0x15,0xCB,0xE9]],
        [ 7,   7, [0x02,0x01,0x07,0x15,0xCB,0xEA]],
        [ 7,   8, [0x02,0x01,0x08,0x15,0xCB,0xEB]],
        [ 7,   9, [0x02,0x01,0x09,0x15,0xCB,0xEC]], // Undocumented
        [ 7,  10, [0x02,0x01,0x0A,0x15,0xCB,0xED]],
        [ 7,  11, [0x02,0x01,0x0B,0x15,0xCB,0xEE]],
        [ 7,  12, [0x02,0x01,0x0C,0x15,0xCB,0xEF]],
        [ 8,   1, [0x02,0x01,0x01,0x15,0xCC,0xE5]],
        [ 8,   2, [0x02,0x01,0x02,0x15,0xCC,0xE6]],
        [ 8,   3, [0x02,0x01,0x03,0x15,0xCC,0xE7]],
        [ 8,   4, [0x02,0x01,0x04,0x15,0xCC,0xE8]],
        [ 8,   5, [0x02,0x01,0x05,0x15,0xCC,0xE9]],
        [ 8,   6, [0x02,0x01,0x06,0x15,0xCC,0xEA]],
        [ 8,   7, [0x02,0x01,0x07,0x15,0xCC,0xEB]],
        [ 8,   8, [0x02,0x01,0x08,0x15,0xCC,0xEC]],
        [ 8,   9, [0x02,0x01,0x09,0x15,0xCC,0xED]], // Undocumented
        [ 8,  10, [0x02,0x01,0x0A,0x15,0xCC,0xEE]],
        [ 8,  11, [0x02,0x01,0x0B,0x15,0xCC,0xEF]],
        [ 8,  12, [0x02,0x01,0x0C,0x15,0xCC,0xF0]],
        [ 9,   1, [0x02,0x01,0x01,0x15,0xCD,0xE6]],
        [ 9,   2, [0x02,0x01,0x02,0x15,0xCD,0xE7]],
        [ 9,   3, [0x02,0x01,0x03,0x15,0xCD,0xE8]],
        [ 9,   4, [0x02,0x01,0x04,0x15,0xCD,0xE9]],
        [ 9,   5, [0x02,0x01,0x05,0x15,0xCD,0xEA]],
        [ 9,   6, [0x02,0x01,0x06,0x15,0xCD,0xEB]],
        [ 9,   7, [0x02,0x01,0x07,0x15,0xCD,0xEC]],
        [ 9,   8, [0x02,0x01,0x08,0x15,0xCD,0xED]],
        [ 9,   9, [0x02,0x01,0x09,0x15,0xCD,0xEE]], // Undocumented
        [ 9,  10, [0x02,0x01,0x0A,0x15,0xCD,0xEF]],
        [ 9,  11, [0x02,0x01,0x0B,0x15,0xCD,0xF0]],
        [ 9,  12, [0x02,0x01,0x0C,0x15,0xCD,0xF1]],
        [10,   1, [0x02,0x01,0x01,0x15,0xCE,0xE7]],
        [10,   2, [0x02,0x01,0x02,0x15,0xCE,0xE8]],
        [10,   3, [0x02,0x01,0x03,0x15,0xCE,0xE9]],
        [10,   4, [0x02,0x01,0x04,0x15,0xCE,0xEA]],
        [10,   5, [0x02,0x01,0x05,0x15,0xCE,0xEB]],
        [10,   6, [0x02,0x01,0x06,0x15,0xCE,0xEC]],
        [10,   7, [0x02,0x01,0x07,0x15,0xCE,0xED]],
        [10,   8, [0x02,0x01,0x08,0x15,0xCE,0xEE]],
        [10,   9, [0x02,0x01,0x09,0x15,0xCE,0xEF]],
        [10,  10, [0x02,0x01,0x0A,0x15,0xCE,0xF0]],
        [10,  11, [0x02,0x01,0x0B,0x15,0xCE,0xF1]],
        [10,  12, [0x02,0x01,0x0C,0x15,0xCE,0xF2]],
        [11,   1, [0x02,0x01,0x01,0x15,0xCF,0xE8]],
        [11,   2, [0x02,0x01,0x02,0x15,0xCF,0xE9]],
        [11,   3, [0x02,0x01,0x03,0x15,0xCF,0xEA]],
        [11,   4, [0x02,0x01,0x04,0x15,0xCF,0xEB]],
        [11,   5, [0x02,0x01,0x05,0x15,0xCF,0xEC]],
        [11,   6, [0x02,0x01,0x06,0x15,0xCF,0xED]],
        [11,   7, [0x02,0x01,0x07,0x15,0xCF,0xEE]],
        [11,   8, [0x02,0x01,0x08,0x15,0xCF,0xEF]],
        [11,   9, [0x02,0x01,0x09,0x15,0xCF,0xF0]],
        [11,  10, [0x02,0x01,0x0A,0x15,0xCF,0xF1]],
        [11,  11, [0x02,0x01,0x0B,0x15,0xCF,0xF2]],
        [11,  12, [0x02,0x01,0x0C,0x15,0xCF,0xF3]],
        [12,   1, [0x02,0x01,0x01,0x15,0xD0,0xE9]],
        [12,   2, [0x02,0x01,0x02,0x15,0xD0,0xEA]],
        [12,   3, [0x02,0x01,0x03,0x15,0xD0,0xEB]],
        [12,   4, [0x02,0x01,0x04,0x15,0xD0,0xEC]],
        [12,   5, [0x02,0x01,0x05,0x15,0xD0,0xED]],
        [12,   6, [0x02,0x01,0x06,0x15,0xD0,0xEE]],
        [12,   7, [0x02,0x01,0x07,0x15,0xD0,0xEF]],
        [12,   8, [0x02,0x01,0x08,0x15,0xD0,0xF0]],
        [12,   9, [0x02,0x01,0x09,0x15,0xD0,0xF1]],
        [12,  10, [0x02,0x01,0x0A,0x15,0xD0,0xF2]],
        [12,  11, [0x02,0x01,0x0B,0x15,0xD0,0xF3]],
        [12,  12, [0x02,0x01,0x0C,0x15,0xD0,0xF4]],
        [13,   1, [0x02,0x01,0x01,0x15,0xD1,0xEA]],
        [13,   2, [0x02,0x01,0x02,0x15,0xD1,0xEB]],
        [13,   3, [0x02,0x01,0x03,0x15,0xD1,0xEC]],
        [13,   4, [0x02,0x01,0x04,0x15,0xD1,0xED]],
        [13,   5, [0x02,0x01,0x05,0x15,0xD1,0xEE]],
        [13,   6, [0x02,0x01,0x06,0x15,0xD1,0xEF]],
        [13,   7, [0x02,0x01,0x07,0x15,0xD1,0xF0]],
        [13,   8, [0x02,0x01,0x08,0x15,0xD1,0xF1]],
        [13,   9, [0x02,0x01,0x09,0x15,0xD1,0xF2]],
        [13,  10, [0x02,0x01,0x0A,0x15,0xD1,0xF3]],
        [13,  11, [0x02,0x01,0x0B,0x15,0xD1,0xF4]],
        [13,  12, [0x02,0x01,0x0C,0x15,0xD1,0xF5]],
        [14,   1, [0x02,0x01,0x01,0x15,0xD2,0xEB]],
        [14,   2, [0x02,0x01,0x02,0x15,0xD2,0xEC]],
        [14,   3, [0x02,0x01,0x03,0x15,0xD2,0xED]],
        [14,   4, [0x02,0x01,0x04,0x15,0xD2,0xEE]],
        [14,   5, [0x02,0x01,0x05,0x15,0xD2,0xEF]],
        [14,   6, [0x02,0x01,0x06,0x15,0xD2,0xF0]],
        [14,   7, [0x02,0x01,0x07,0x15,0xD2,0xF1]],
        [14,   8, [0x02,0x01,0x08,0x15,0xD2,0xF2]],
        [14,   9, [0x02,0x01,0x09,0x15,0xD2,0xF3]],
        [14,  10, [0x02,0x01,0x0A,0x15,0xD2,0xF4]],
        [14,  11, [0x02,0x01,0x0B,0x15,0xD2,0xF5]],
        [14,  12, [0x02,0x01,0x0C,0x15,0xD2,0xF6]],
        [15,   1, [0x02,0x01,0x01,0x15,0xD3,0xEC]],
        [15,   2, [0x02,0x01,0x02,0x15,0xD3,0xED]],
        [15,   3, [0x02,0x01,0x03,0x15,0xD3,0xEE]],
        [15,   4, [0x02,0x01,0x04,0x15,0xD3,0xEF]],
        [15,   5, [0x02,0x01,0x05,0x15,0xD3,0xF0]],
        [15,   6, [0x02,0x01,0x06,0x15,0xD3,0xF1]],
        [15,   7, [0x02,0x01,0x07,0x15,0xD3,0xF2]],
        [15,   8, [0x02,0x01,0x08,0x15,0xD3,0xF3]],
        [15,   9, [0x02,0x01,0x09,0x15,0xD3,0xF4]],
        [15,  10, [0x02,0x01,0x0A,0x15,0xD3,0xF5]],
        [15,  11, [0x02,0x01,0x0B,0x15,0xD3,0xF6]],
        [15,  12, [0x02,0x01,0x0C,0x15,0xD3,0xF7]],
        [16,   1, [0x02,0x01,0x01,0x15,0xD4,0xED]],
        [16,   2, [0x02,0x01,0x02,0x15,0xD4,0xEE]],
        [16,   3, [0x02,0x01,0x03,0x15,0xD4,0xEF]],
        [16,   4, [0x02,0x01,0x04,0x15,0xD4,0xF0]],
        [16,   5, [0x02,0x01,0x05,0x15,0xD4,0xF1]],
        [16,   6, [0x02,0x01,0x06,0x15,0xD4,0xF2]],
        [16,   7, [0x02,0x01,0x07,0x15,0xD4,0xF3]],
        [16,   8, [0x02,0x01,0x08,0x15,0xD4,0xF4]],
        [16,   9, [0x02,0x01,0x09,0x15,0xD4,0xF5]],
        [16,  10, [0x02,0x01,0x0A,0x15,0xD4,0xF6]],
        [16,  11, [0x02,0x01,0x0B,0x15,0xD4,0xF7]],
        [16,  12, [0x02,0x01,0x0C,0x15,0xD4,0xF8]],
        [17,   1, [0x02,0x01,0x01,0x15,0xD5,0xEE]],
        [17,   2, [0x02,0x01,0x02,0x15,0xD5,0xEF]],
        [17,   3, [0x02,0x01,0x03,0x15,0xD5,0xF0]],
        [17,   4, [0x02,0x01,0x04,0x15,0xD5,0xF1]],
        [17,   5, [0x02,0x01,0x05,0x15,0xD5,0xF2]],
        [17,   6, [0x02,0x01,0x06,0x15,0xD5,0xF3]],
        [17,   7, [0x02,0x01,0x07,0x15,0xD5,0xF4]],
        [17,   8, [0x02,0x01,0x08,0x15,0xD5,0xF5]],
        [17,   9, [0x02,0x01,0x09,0x15,0xD5,0xF6]],
        [17,  10, [0x02,0x01,0x0A,0x15,0xD5,0xF7]],
        [17,  11, [0x02,0x01,0x0B,0x15,0xD5,0xF8]],
        [17,  12, [0x02,0x01,0x0C,0x15,0xD5,0xF9]],
        [18,   1, [0x02,0x01,0x01,0x15,0xD6,0xEF]],
        [18,   2, [0x02,0x01,0x02,0x15,0xD6,0xF0]],
        [18,   3, [0x02,0x01,0x03,0x15,0xD6,0xF1]],
        [18,   4, [0x02,0x01,0x04,0x15,0xD6,0xF2]],
        [18,   5, [0x02,0x01,0x05,0x15,0xD6,0xF3]],
        [18,   6, [0x02,0x01,0x06,0x15,0xD6,0xF4]],
        [18,   7, [0x02,0x01,0x07,0x15,0xD6,0xF5]],
        [18,   8, [0x02,0x01,0x08,0x15,0xD6,0xF6]],
        [18,   9, [0x02,0x01,0x09,0x15,0xD6,0xF7]],
        [18,  10, [0x02,0x01,0x0A,0x15,0xD6,0xF8]],
        [18,  11, [0x02,0x01,0x0B,0x15,0xD6,0xF9]],
        [18,  12, [0x02,0x01,0x0C,0x15,0xD6,0xFA]],
        [19,   1, [0x02,0x01,0x01,0x15,0xD7,0xF0]],
        [19,   2, [0x02,0x01,0x02,0x15,0xD7,0xF1]],
        [19,   3, [0x02,0x01,0x03,0x15,0xD7,0xF2]],
        [19,   4, [0x02,0x01,0x04,0x15,0xD7,0xF3]],
        [19,   5, [0x02,0x01,0x05,0x15,0xD7,0xF4]],
        [19,   6, [0x02,0x01,0x06,0x15,0xD7,0xF5]],
        [19,   7, [0x02,0x01,0x07,0x15,0xD7,0xF6]],
        [19,   8, [0x02,0x01,0x08,0x15,0xD7,0xF7]],
        [19,   9, [0x02,0x01,0x09,0x15,0xD7,0xF8]],
        [19,  10, [0x02,0x01,0x0A,0x15,0xD7,0xF9]],
        [19,  11, [0x02,0x01,0x0B,0x15,0xD7,0xFA]],
        [19,  12, [0x02,0x01,0x0C,0x15,0xD7,0xFB]],
        [20,   1, [0x02,0x01,0x01,0x15,0xD8,0xF1]],
        [20,   2, [0x02,0x01,0x02,0x15,0xD8,0xF2]],
        [20,   3, [0x02,0x01,0x03,0x15,0xD8,0xF3]],
        [20,   4, [0x02,0x01,0x04,0x15,0xD8,0xF4]],
        [20,   5, [0x02,0x01,0x05,0x15,0xD8,0xF5]],
        [20,   6, [0x02,0x01,0x06,0x15,0xD8,0xF6]],
        [20,   7, [0x02,0x01,0x07,0x15,0xD8,0xF7]],
        [20,   8, [0x02,0x01,0x08,0x15,0xD8,0xF8]],
        [20,   9, [0x02,0x01,0x09,0x15,0xD8,0xF9]],
        [20,  10, [0x02,0x01,0x0A,0x15,0xD8,0xFA]],
        [20,  11, [0x02,0x01,0x0B,0x15,0xD8,0xFB]],
        [20,  12, [0x02,0x01,0x0C,0x15,0xD8,0xFC]],
        [21,   1, [0x02,0x01,0x01,0x15,0xD9,0xF2]],
        [21,   2, [0x02,0x01,0x02,0x15,0xD9,0xF3]],
        [21,   3, [0x02,0x01,0x03,0x15,0xD9,0xF4]],
        [21,   4, [0x02,0x01,0x04,0x15,0xD9,0xF5]],
        [21,   5, [0x02,0x01,0x05,0x15,0xD9,0xF6]],
        [21,   6, [0x02,0x01,0x06,0x15,0xD9,0xF7]],
        [21,   7, [0x02,0x01,0x07,0x15,0xD9,0xF8]],
        [21,   8, [0x02,0x01,0x08,0x15,0xD9,0xF9]],
        [21,   9, [0x02,0x01,0x09,0x15,0xD9,0xFA]],
        [21,  10, [0x02,0x01,0x0A,0x15,0xD9,0xFB]],
        [21,  11, [0x02,0x01,0x0B,0x15,0xD9,0xFC]],
        [21,  12, [0x02,0x01,0x0C,0x15,0xD9,0xFD]],
        [22,   1, [0x02,0x01,0x01,0x15,0xDA,0xF3]],
        [22,   2, [0x02,0x01,0x02,0x15,0xDA,0xF4]],
        [22,   3, [0x02,0x01,0x03,0x15,0xDA,0xF5]],
        [22,   4, [0x02,0x01,0x04,0x15,0xDA,0xF6]],
        [22,   5, [0x02,0x01,0x05,0x15,0xDA,0xF7]],
        [22,   6, [0x02,0x01,0x06,0x15,0xDA,0xF8]],
        [22,   7, [0x02,0x01,0x07,0x15,0xDA,0xF9]],
        [22,   8, [0x02,0x01,0x08,0x15,0xDA,0xFA]],
        [22,   9, [0x02,0x01,0x09,0x15,0xDA,0xFB]],
        [22,  10, [0x02,0x01,0x0A,0x15,0xDA,0xFC]],
        [22,  11, [0x02,0x01,0x0B,0x15,0xDA,0xFD]],
        [22,  12, [0x02,0x01,0x0C,0x15,0xDA,0xFE]],
        [23,   1, [0x02,0x01,0x01,0x15,0xDB,0xF4]],
        [23,   2, [0x02,0x01,0x02,0x15,0xDB,0xF5]],
        [23,   3, [0x02,0x01,0x03,0x15,0xDB,0xF6]],
        [23,   4, [0x02,0x01,0x04,0x15,0xDB,0xF7]],
        [23,   5, [0x02,0x01,0x05,0x15,0xDB,0xF8]],
        [23,   6, [0x02,0x01,0x06,0x15,0xDB,0xF9]],
        [23,   7, [0x02,0x01,0x07,0x15,0xDB,0xFA]],
        [23,   8, [0x02,0x01,0x08,0x15,0xDB,0xFB]],
        [23,   9, [0x02,0x01,0x09,0x15,0xDB,0xFC]],
        [23,  10, [0x02,0x01,0x0A,0x15,0xDB,0xFD]],
        [23,  11, [0x02,0x01,0x0B,0x15,0xDB,0xFE]],
        [23,  12, [0x02,0x01,0x0C,0x15,0xDB,0xFF]],
        [24,   1, [0x02,0x01,0x01,0x15,0xDC,0xF5]],
        [24,   2, [0x02,0x01,0x02,0x15,0xDC,0xF6]],
        [24,   3, [0x02,0x01,0x03,0x15,0xDC,0xF7]],
        [24,   4, [0x02,0x01,0x04,0x15,0xDC,0xF8]],
        [24,   5, [0x02,0x01,0x05,0x15,0xDC,0xF9]],
        [24,   6, [0x02,0x01,0x06,0x15,0xDC,0xFA]],
        [24,   7, [0x02,0x01,0x07,0x15,0xDC,0xFB]],
        [24,   8, [0x02,0x01,0x08,0x15,0xDC,0xFC]],
        [24,   9, [0x02,0x01,0x09,0x15,0xDC,0xFD]],
        [24,  10, [0x02,0x01,0x0A,0x15,0xDC,0xFE]],
        [24,  11, [0x02,0x01,0x0B,0x15,0xDC,0xFF]],
        [24,  12, [0x02,0x01,0x0C,0x15,0xDC,0x00]],
        [25,   1, [0x02,0x01,0x01,0x15,0xDD,0xF6]],
        [25,   2, [0x02,0x01,0x02,0x15,0xDD,0xF7]],
        [25,   3, [0x02,0x01,0x03,0x15,0xDD,0xF8]],
        [25,   4, [0x02,0x01,0x04,0x15,0xDD,0xF9]],
        [25,   5, [0x02,0x01,0x05,0x15,0xDD,0xFA]],
        [25,   6, [0x02,0x01,0x06,0x15,0xDD,0xFB]],
        [25,   7, [0x02,0x01,0x07,0x15,0xDD,0xFC]],
        [25,   8, [0x02,0x01,0x08,0x15,0xDD,0xFD]],
        [25,   9, [0x02,0x01,0x09,0x15,0xDD,0xFE]],
        [25,  10, [0x02,0x01,0x0A,0x15,0xDD,0xFF]],
        [25,  11, [0x02,0x01,0x0B,0x15,0xDD,0x00]],
        [25,  12, [0x02,0x01,0x0C,0x15,0xDD,0x01]],
        [26,   1, [0x02,0x01,0x01,0x15,0xDE,0xF7]],
        [26,   2, [0x02,0x01,0x02,0x15,0xDE,0xF8]],
        [26,   3, [0x02,0x01,0x03,0x15,0xDE,0xF9]],
        [26,   4, [0x02,0x01,0x04,0x15,0xDE,0xFA]],
        [26,   5, [0x02,0x01,0x05,0x15,0xDE,0xFB]],
        [26,   6, [0x02,0x01,0x06,0x15,0xDE,0xFC]],
        [26,   7, [0x02,0x01,0x07,0x15,0xDE,0xFD]],
        [26,   8, [0x02,0x01,0x08,0x15,0xDE,0xFE]],
        [26,   9, [0x02,0x01,0x09,0x15,0xDE,0xFF]],
        [26,  10, [0x02,0x01,0x0A,0x15,0xDE,0x00]],
        [26,  11, [0x02,0x01,0x0B,0x15,0xDE,0x01]],
        [26,  12, [0x02,0x01,0x0C,0x15,0xDE,0x02]],
        [27,   1, [0x02,0x01,0x01,0x15,0xDF,0xF8]],
        [27,   2, [0x02,0x01,0x02,0x15,0xDF,0xF9]],
        [27,   3, [0x02,0x01,0x03,0x15,0xDF,0xFA]],
        [27,   4, [0x02,0x01,0x04,0x15,0xDF,0xFB]],
        [27,   5, [0x02,0x01,0x05,0x15,0xDF,0xFC]],
        [27,   6, [0x02,0x01,0x06,0x15,0xDF,0xFD]],
        [27,   7, [0x02,0x01,0x07,0x15,0xDF,0xFE]],
        [27,   8, [0x02,0x01,0x08,0x15,0xDF,0xFF]],
        [27,   9, [0x02,0x01,0x09,0x15,0xDF,0x00]],
        [27,  10, [0x02,0x01,0x0A,0x15,0xDF,0x01]],
        [27,  11, [0x02,0x01,0x0B,0x15,0xDF,0x02]],
        [27,  12, [0x02,0x01,0x0C,0x15,0xDF,0x03]],
        [28,   1, [0x02,0x01,0x01,0x15,0xE0,0xF9]],
        [28,   2, [0x02,0x01,0x02,0x15,0xE0,0xFA]],
        [28,   3, [0x02,0x01,0x03,0x15,0xE0,0xFB]],
        [28,   4, [0x02,0x01,0x04,0x15,0xE0,0xFC]],
        [28,   5, [0x02,0x01,0x05,0x15,0xE0,0xFD]],
        [28,   6, [0x02,0x01,0x06,0x15,0xE0,0xFE]],
        [28,   7, [0x02,0x01,0x07,0x15,0xE0,0xFF]],
        [28,   8, [0x02,0x01,0x08,0x15,0xE0,0x00]],
        [28,   9, [0x02,0x01,0x09,0x15,0xE0,0x01]],
        [28,  10, [0x02,0x01,0x0A,0x15,0xE0,0x02]],
        [28,  11, [0x02,0x01,0x0B,0x15,0xE0,0x03]],
        [28,  12, [0x02,0x01,0x0C,0x15,0xE0,0x04]],
        [29,   1, [0x02,0x01,0x01,0x15,0xE1,0xFA]],
        [29,   2, [0x02,0x01,0x02,0x15,0xE1,0xFB]],
        [29,   3, [0x02,0x01,0x03,0x15,0xE1,0xFC]],
        [29,   4, [0x02,0x01,0x04,0x15,0xE1,0xFD]],
        [29,   5, [0x02,0x01,0x05,0x15,0xE1,0xFE]],
        [29,   6, [0x02,0x01,0x06,0x15,0xE1,0xFF]],
        [29,   7, [0x02,0x01,0x07,0x15,0xE1,0x00]],
        [29,   8, [0x02,0x01,0x08,0x15,0xE1,0x01]],
        [29,   9, [0x02,0x01,0x09,0x15,0xE1,0x02]],
        [29,  10, [0x02,0x01,0x0A,0x15,0xE1,0x03]],
        [29,  11, [0x02,0x01,0x0B,0x15,0xE1,0x04]],
        [29,  12, [0x02,0x01,0x0C,0x15,0xE1,0x05]],
        [30,   1, [0x02,0x01,0x01,0x15,0xE2,0xFB]],
        [30,   2, [0x02,0x01,0x02,0x15,0xE2,0xFC]],
        [30,   3, [0x02,0x01,0x03,0x15,0xE2,0xFD]],
        [30,   4, [0x02,0x01,0x04,0x15,0xE2,0xFE]],
        [30,   5, [0x02,0x01,0x05,0x15,0xE2,0xFF]],
        [30,   6, [0x02,0x01,0x06,0x15,0xE2,0x00]],
        [30,   7, [0x02,0x01,0x07,0x15,0xE2,0x01]],
        [30,   8, [0x02,0x01,0x08,0x15,0xE2,0x02]],
        [30,   9, [0x02,0x01,0x09,0x15,0xE2,0x03]],
        [30,  10, [0x02,0x01,0x0A,0x15,0xE2,0x04]],
        [30,  11, [0x02,0x01,0x0B,0x15,0xE2,0x05]],
        [30,  12, [0x02,0x01,0x0C,0x15,0xE2,0x06]],
        [31,   1, [0x02,0x01,0x01,0x15,0xE3,0xFC]],
        [31,   2, [0x02,0x01,0x02,0x15,0xE3,0xFD]],
        [31,   3, [0x02,0x01,0x03,0x15,0xE3,0xFE]],
        [31,   4, [0x02,0x01,0x04,0x15,0xE3,0xFF]],
        [31,   5, [0x02,0x01,0x05,0x15,0xE3,0x00]],
        [31,   6, [0x02,0x01,0x06,0x15,0xE3,0x01]],
        [31,   7, [0x02,0x01,0x07,0x15,0xE3,0x02]],
        [31,   8, [0x02,0x01,0x08,0x15,0xE3,0x03]],
        [31,   9, [0x02,0x01,0x09,0x15,0xE3,0x04]],
        [31,  10, [0x02,0x01,0x0A,0x15,0xE3,0x05]],
        [31,  11, [0x02,0x01,0x0B,0x15,0xE3,0x06]],
        [31,  12, [0x02,0x01,0x0C,0x15,0xE3,0x07]],
        [32,   1, [0x02,0x01,0x01,0x15,0xE4,0xFD]],
        [32,   2, [0x02,0x01,0x02,0x15,0xE4,0xFE]],
        [32,   3, [0x02,0x01,0x03,0x15,0xE4,0xFF]],
        [32,   4, [0x02,0x01,0x04,0x15,0xE4,0x00]],
        [32,   5, [0x02,0x01,0x05,0x15,0xE4,0x01]],
        [32,   6, [0x02,0x01,0x06,0x15,0xE4,0x02]],
        [32,   7, [0x02,0x01,0x07,0x15,0xE4,0x03]],
        [32,   8, [0x02,0x01,0x08,0x15,0xE4,0x04]],
        [32,   9, [0x02,0x01,0x09,0x15,0xE4,0x05]],
        [32,  10, [0x02,0x01,0x0A,0x15,0xE4,0x06]],
        [32,  11, [0x02,0x01,0x0B,0x15,0xE4,0x07]],
        [32,  12, [0x02,0x01,0x0C,0x15,0xE4,0x08]],
        [33,   1, [0x02,0x01,0x01,0x15,0xE5,0xFE]],
        [33,   2, [0x02,0x01,0x02,0x15,0xE5,0xFF]],
        [33,   3, [0x02,0x01,0x03,0x15,0xE5,0x00]],
        [33,   4, [0x02,0x01,0x04,0x15,0xE5,0x01]],
        [33,   5, [0x02,0x01,0x05,0x15,0xE5,0x02]],
        [33,   6, [0x02,0x01,0x06,0x15,0xE5,0x03]],
        [33,   7, [0x02,0x01,0x07,0x15,0xE5,0x04]],
        [33,   8, [0x02,0x01,0x08,0x15,0xE5,0x05]],
        [33,   9, [0x02,0x01,0x09,0x15,0xE5,0x06]],
        [33,  10, [0x02,0x01,0x0A,0x15,0xE5,0x07]],
        [33,  11, [0x02,0x01,0x0B,0x15,0xE5,0x08]],
        [33,  12, [0x02,0x01,0x0C,0x15,0xE5,0x09]],
        [34,   1, [0x02,0x01,0x01,0x15,0xE6,0xFF]],
        [34,   2, [0x02,0x01,0x02,0x15,0xE6,0x00]],
        [34,   3, [0x02,0x01,0x03,0x15,0xE6,0x01]],
        [34,   4, [0x02,0x01,0x04,0x15,0xE6,0x02]],
        [34,   5, [0x02,0x01,0x05,0x15,0xE6,0x03]],
        [34,   6, [0x02,0x01,0x06,0x15,0xE6,0x04]],
        [34,   7, [0x02,0x01,0x07,0x15,0xE6,0x05]],
        [34,   8, [0x02,0x01,0x08,0x15,0xE6,0x06]],
        [34,   9, [0x02,0x01,0x09,0x15,0xE6,0x07]],
        [34,  10, [0x02,0x01,0x0A,0x15,0xE6,0x08]],
        [34,  11, [0x02,0x01,0x0B,0x15,0xE6,0x09]],
        [34,  12, [0x02,0x01,0x0C,0x15,0xE6,0x0A]],
        [35,   1, [0x02,0x01,0x01,0x15,0xE7,0x00]],
        [35,   2, [0x02,0x01,0x02,0x15,0xE7,0x01]],
        [35,   3, [0x02,0x01,0x03,0x15,0xE7,0x02]],
        [35,   4, [0x02,0x01,0x04,0x15,0xE7,0x03]],
        [35,   5, [0x02,0x01,0x05,0x15,0xE7,0x04]],
        [35,   6, [0x02,0x01,0x06,0x15,0xE7,0x05]],
        [35,   7, [0x02,0x01,0x07,0x15,0xE7,0x06]],
        [35,   8, [0x02,0x01,0x08,0x15,0xE7,0x07]],
        [35,   9, [0x02,0x01,0x09,0x15,0xE7,0x08]],
        [35,  10, [0x02,0x01,0x0A,0x15,0xE7,0x09]],
        [35,  11, [0x02,0x01,0x0B,0x15,0xE7,0x0A]],
        [35,  12, [0x02,0x01,0x0C,0x15,0xE7,0x0B]],
        [36,   1, [0x02,0x01,0x01,0x15,0xE8,0x01]],
        [36,   2, [0x02,0x01,0x02,0x15,0xE8,0x02]],
        [36,   3, [0x02,0x01,0x03,0x15,0xE8,0x03]],
        [36,   4, [0x02,0x01,0x04,0x15,0xE8,0x04]],
        [36,   5, [0x02,0x01,0x05,0x15,0xE8,0x05]],
        [36,   6, [0x02,0x01,0x06,0x15,0xE8,0x06]],
        [36,   7, [0x02,0x01,0x07,0x15,0xE8,0x07]],
        [36,   8, [0x02,0x01,0x08,0x15,0xE8,0x08]],
        [36,   9, [0x02,0x01,0x09,0x15,0xE8,0x09]],
        [36,  10, [0x02,0x01,0x0A,0x15,0xE8,0x0A]],
        [36,  11, [0x02,0x01,0x0B,0x15,0xE8,0x0B]],
        [36,  12, [0x02,0x01,0x0C,0x15,0xE8,0x0C]],
        [37,   1, [0x02,0x01,0x01,0x15,0xE9,0x02]],
        [37,   2, [0x02,0x01,0x02,0x15,0xE9,0x03]],
        [37,   3, [0x02,0x01,0x03,0x15,0xE9,0x04]],
        [37,   4, [0x02,0x01,0x04,0x15,0xE9,0x05]],
        [37,   5, [0x02,0x01,0x05,0x15,0xE9,0x06]],
        [37,   6, [0x02,0x01,0x06,0x15,0xE9,0x07]],
        [37,   7, [0x02,0x01,0x07,0x15,0xE9,0x08]],
        [37,   8, [0x02,0x01,0x08,0x15,0xE9,0x09]],
        [37,   9, [0x02,0x01,0x09,0x15,0xE9,0x0A]],
        [37,  10, [0x02,0x01,0x0A,0x15,0xE9,0x0B]],
        [37,  11, [0x02,0x01,0x0B,0x15,0xE9,0x0C]],
        [37,  12, [0x02,0x01,0x0C,0x15,0xE9,0x0D]],
        [38,   1, [0x02,0x01,0x01,0x15,0xEA,0x03]],
        [38,   2, [0x02,0x01,0x02,0x15,0xEA,0x04]],
        [38,   3, [0x02,0x01,0x03,0x15,0xEA,0x05]],
        [38,   4, [0x02,0x01,0x04,0x15,0xEA,0x06]],
        [38,   5, [0x02,0x01,0x05,0x15,0xEA,0x07]],
        [38,   6, [0x02,0x01,0x06,0x15,0xEA,0x08]],
        [38,   7, [0x02,0x01,0x07,0x15,0xEA,0x09]],
        [38,   8, [0x02,0x01,0x08,0x15,0xEA,0x0A]],
        [38,   9, [0x02,0x01,0x09,0x15,0xEA,0x0B]],
        [38,  10, [0x02,0x01,0x0A,0x15,0xEA,0x0C]],
        [38,  11, [0x02,0x01,0x0B,0x15,0xEA,0x0D]],
        [38,  12, [0x02,0x01,0x0C,0x15,0xEA,0x0E]],
        [39,   1, [0x02,0x01,0x01,0x15,0xEB,0x04]],
        [39,   2, [0x02,0x01,0x02,0x15,0xEB,0x05]],
        [39,   3, [0x02,0x01,0x03,0x15,0xEB,0x06]],
        [39,   4, [0x02,0x01,0x04,0x15,0xEB,0x07]],
        [39,   5, [0x02,0x01,0x05,0x15,0xEB,0x08]],
        [39,   6, [0x02,0x01,0x06,0x15,0xEB,0x09]],
        [39,   7, [0x02,0x01,0x07,0x15,0xEB,0x0A]],
        [39,   8, [0x02,0x01,0x08,0x15,0xEB,0x0B]],
        [39,   9, [0x02,0x01,0x09,0x15,0xEB,0x0C]],
        [39,  10, [0x02,0x01,0x0A,0x15,0xEB,0x0D]],
        [39,  11, [0x02,0x01,0x0B,0x15,0xEB,0x0E]],
        [39,  12, [0x02,0x01,0x0C,0x15,0xEB,0x0F]],
        [40,   1, [0x02,0x01,0x01,0x15,0xEC,0x05]],
        [40,   2, [0x02,0x01,0x02,0x15,0xEC,0x06]],
        [40,   3, [0x02,0x01,0x03,0x15,0xEC,0x07]],
        [40,   4, [0x02,0x01,0x04,0x15,0xEC,0x08]],
        [40,   5, [0x02,0x01,0x05,0x15,0xEC,0x09]],
        [40,   6, [0x02,0x01,0x06,0x15,0xEC,0x0A]],
        [40,   7, [0x02,0x01,0x07,0x15,0xEC,0x0B]],
        [40,   8, [0x02,0x01,0x08,0x15,0xEC,0x0C]],
        [40,   9, [0x02,0x01,0x09,0x15,0xEC,0x0D]], // Undocumented
        [40,  10, [0x02,0x01,0x0A,0x15,0xEC,0x0E]],
        [40,  11, [0x02,0x01,0x0B,0x15,0xEC,0x0F]],
        [40,  12, [0x02,0x01,0x0C,0x15,0xEC,0x10]],
        [41,   1, [0x02,0x01,0x01,0x15,0xED,0x06]],
        [41,   2, [0x02,0x01,0x02,0x15,0xED,0x07]],
        [41,   3, [0x02,0x01,0x03,0x15,0xED,0x08]],
        [41,   4, [0x02,0x01,0x04,0x15,0xED,0x09]],
        [41,   5, [0x02,0x01,0x05,0x15,0xED,0x0A]],
        [41,   6, [0x02,0x01,0x06,0x15,0xED,0x0B]],
        [41,   7, [0x02,0x01,0x07,0x15,0xED,0x0C]],
        [41,   8, [0x02,0x01,0x08,0x15,0xED,0x0D]],
        [41,   9, [0x02,0x01,0x09,0x15,0xED,0x0E]], // Undocumented
        [41,  10, [0x02,0x01,0x0A,0x15,0xED,0x0F]],
        [41,  11, [0x02,0x01,0x0B,0x15,0xED,0x10]],
        [41,  12, [0x02,0x01,0x0C,0x15,0xED,0x11]],
        [42,   1, [0x02,0x01,0x01,0x15,0xEE,0x07]],
        [42,   2, [0x02,0x01,0x02,0x15,0xEE,0x08]],
        [42,   3, [0x02,0x01,0x03,0x15,0xEE,0x09]],
        [42,   4, [0x02,0x01,0x04,0x15,0xEE,0x0A]],
        [42,   5, [0x02,0x01,0x05,0x15,0xEE,0x0B]],
        [42,   6, [0x02,0x01,0x06,0x15,0xEE,0x0C]],
        [42,   7, [0x02,0x01,0x07,0x15,0xEE,0x0D]],
        [42,   8, [0x02,0x01,0x08,0x15,0xEE,0x0E]],
        [42,   9, [0x02,0x01,0x09,0x15,0xEE,0x0F]], // Undocumented
        [42,  10, [0x02,0x01,0x0A,0x15,0xEE,0x10]],
        [42,  11, [0x02,0x01,0x0B,0x15,0xEE,0x11]],
        [42,  12, [0x02,0x01,0x0C,0x15,0xEE,0x12]],
        [43,   1, [0x02,0x01,0x01,0x15,0xEF,0x08]],
        [43,   2, [0x02,0x01,0x02,0x15,0xEF,0x09]],
        [43,   3, [0x02,0x01,0x03,0x15,0xEF,0x0A]],
        [43,   4, [0x02,0x01,0x04,0x15,0xEF,0x0B]],
        [43,   5, [0x02,0x01,0x05,0x15,0xEF,0x0C]],
        [43,   6, [0x02,0x01,0x06,0x15,0xEF,0x0D]],
        [43,   7, [0x02,0x01,0x07,0x15,0xEF,0x0E]],
        [43,   8, [0x02,0x01,0x08,0x15,0xEF,0x0F]],
        [43,   9, [0x02,0x01,0x09,0x15,0xEF,0x10]], // Undocumented
        [43,  10, [0x02,0x01,0x0A,0x15,0xEF,0x11]],
        [43,  11, [0x02,0x01,0x0B,0x15,0xEF,0x12]],
        [43,  12, [0x02,0x01,0x0C,0x15,0xEF,0x13]],
        [44,   1, [0x02,0x01,0x01,0x15,0xF0,0x09]],
        [44,   2, [0x02,0x01,0x02,0x15,0xF0,0x0A]],
        [44,   3, [0x02,0x01,0x03,0x15,0xF0,0x0B]],
        [44,   4, [0x02,0x01,0x04,0x15,0xF0,0x0C]],
        [44,   5, [0x02,0x01,0x05,0x15,0xF0,0x0D]],
        [44,   6, [0x02,0x01,0x06,0x15,0xF0,0x0E]],
        [44,   7, [0x02,0x01,0x07,0x15,0xF0,0x0F]],
        [44,   8, [0x02,0x01,0x08,0x15,0xF0,0x10]],
        [44,   9, [0x02,0x01,0x09,0x15,0xF0,0x11]], // Undocumented
        [44,  10, [0x02,0x01,0x0A,0x15,0xF0,0x12]],
        [44,  11, [0x02,0x01,0x0B,0x15,0xF0,0x13]],
        [44,  12, [0x02,0x01,0x0C,0x15,0xF0,0x14]],
        [45,   1, [0x02,0x01,0x01,0x15,0xF1,0x0A]],
        [45,   2, [0x02,0x01,0x02,0x15,0xF1,0x0B]],
        [45,   3, [0x02,0x01,0x03,0x15,0xF1,0x0C]],
        [45,   4, [0x02,0x01,0x04,0x15,0xF1,0x0D]],
        [45,   5, [0x02,0x01,0x05,0x15,0xF1,0x0E]],
        [45,   6, [0x02,0x01,0x06,0x15,0xF1,0x0F]],
        [45,   7, [0x02,0x01,0x07,0x15,0xF1,0x10]],
        [45,   8, [0x02,0x01,0x08,0x15,0xF1,0x11]],
        [45,   9, [0x02,0x01,0x09,0x15,0xF1,0x12]], // Undocumented
        [45,  10, [0x02,0x01,0x0A,0x15,0xF1,0x13]],
        [45,  11, [0x02,0x01,0x0B,0x15,0xF1,0x14]],
        [45,  12, [0x02,0x01,0x0C,0x15,0xF1,0x15]],
        [46,   1, [0x02,0x01,0x01,0x15,0xF2,0x0B]],
        [46,   2, [0x02,0x01,0x02,0x15,0xF2,0x0C]],
        [46,   3, [0x02,0x01,0x03,0x15,0xF2,0x0D]],
        [46,   4, [0x02,0x01,0x04,0x15,0xF2,0x0E]],
        [46,   5, [0x02,0x01,0x05,0x15,0xF2,0x0F]],
        [46,   6, [0x02,0x01,0x06,0x15,0xF2,0x10]],
        [46,   7, [0x02,0x01,0x07,0x15,0xF2,0x11]],
        [46,   8, [0x02,0x01,0x08,0x15,0xF2,0x12]],
        [46,   9, [0x02,0x01,0x09,0x15,0xF2,0x13]], // Undocumented
        [46,  10, [0x02,0x01,0x0A,0x15,0xF2,0x14]],
        [46,  11, [0x02,0x01,0x0B,0x15,0xF2,0x15]],
        [46,  12, [0x02,0x01,0x0C,0x15,0xF2,0x16]],
        [47,   1, [0x02,0x01,0x01,0x15,0xF3,0x0C]],
        [47,   2, [0x02,0x01,0x02,0x15,0xF3,0x0D]],
        [47,   3, [0x02,0x01,0x03,0x15,0xF3,0x0E]],
        [47,   4, [0x02,0x01,0x04,0x15,0xF3,0x0F]],
        [47,   5, [0x02,0x01,0x05,0x15,0xF3,0x10]],
        [47,   6, [0x02,0x01,0x06,0x15,0xF3,0x11]],
        [47,   7, [0x02,0x01,0x07,0x15,0xF3,0x12]],
        [47,   8, [0x02,0x01,0x08,0x15,0xF3,0x13]],
        [47,   9, [0x02,0x01,0x09,0x15,0xF3,0x14]], // Undocumented
        [47,  10, [0x02,0x01,0x0A,0x15,0xF3,0x15]],
        [47,  11, [0x02,0x01,0x0B,0x15,0xF3,0x16]],
        [47,  12, [0x02,0x01,0x0C,0x15,0xF3,0x17]],
        [48,   1, [0x02,0x01,0x01,0x15,0xF4,0x0D]],
        [48,   2, [0x02,0x01,0x02,0x15,0xF4,0x0E]],
        [48,   3, [0x02,0x01,0x03,0x15,0xF4,0x0F]],
        [48,   4, [0x02,0x01,0x04,0x15,0xF4,0x10]],
        [48,   5, [0x02,0x01,0x05,0x15,0xF4,0x11]],
        [48,   6, [0x02,0x01,0x06,0x15,0xF4,0x12]],
        [48,   7, [0x02,0x01,0x07,0x15,0xF4,0x13]],
        [48,   8, [0x02,0x01,0x08,0x15,0xF4,0x14]],
        [48,   9, [0x02,0x01,0x09,0x15,0xF4,0x15]], // Undocumented
        [48,  10, [0x02,0x01,0x0A,0x15,0xF4,0x16]],
        [48,  11, [0x02,0x01,0x0B,0x15,0xF4,0x17]],
        [48,  12, [0x02,0x01,0x0C,0x15,0xF4,0x18]],
        [49,   1, [0x02,0x01,0x01,0x15,0xF5,0x0E]],
        [49,   2, [0x02,0x01,0x02,0x15,0xF5,0x0F]],
        [49,   3, [0x02,0x01,0x03,0x15,0xF5,0x10]],
        [49,   4, [0x02,0x01,0x04,0x15,0xF5,0x11]],
        [49,   5, [0x02,0x01,0x05,0x15,0xF5,0x12]],
        [49,   6, [0x02,0x01,0x06,0x15,0xF5,0x13]],
        [49,   7, [0x02,0x01,0x07,0x15,0xF5,0x14]],
        [49,   8, [0x02,0x01,0x08,0x15,0xF5,0x15]],
        [49,   9, [0x02,0x01,0x09,0x15,0xF5,0x16]], // Undocumented
        [49,  10, [0x02,0x01,0x0A,0x15,0xF5,0x17]],
        [49,  11, [0x02,0x01,0x0B,0x15,0xF5,0x18]],
        [49,  12, [0x02,0x01,0x0C,0x15,0xF5,0x19]],
        [50,   1, [0x02,0x01,0x01,0x15,0xF6,0x0F]],
        [50,   2, [0x02,0x01,0x02,0x15,0xF6,0x10]],
        [50,   3, [0x02,0x01,0x03,0x15,0xF6,0x11]],
        [50,   4, [0x02,0x01,0x04,0x15,0xF6,0x12]],
        [50,   5, [0x02,0x01,0x05,0x15,0xF6,0x13]],
        [50,   6, [0x02,0x01,0x06,0x15,0xF6,0x14]],
        [50,   7, [0x02,0x01,0x07,0x15,0xF6,0x15]],
        [50,   8, [0x02,0x01,0x08,0x15,0xF6,0x16]],
        [50,   9, [0x02,0x01,0x09,0x15,0xF6,0x17]], // Undocumented
        [50,  10, [0x02,0x01,0x0A,0x15,0xF6,0x18]],
        [50,  11, [0x02,0x01,0x0B,0x15,0xF6,0x19]],
        [50,  12, [0x02,0x01,0x0C,0x15,0xF6,0x1A]],
        [51,   1, [0x02,0x01,0x01,0x15,0xF7,0x10]],
        [51,   2, [0x02,0x01,0x02,0x15,0xF7,0x11]],
        [51,   3, [0x02,0x01,0x03,0x15,0xF7,0x12]],
        [51,   4, [0x02,0x01,0x04,0x15,0xF7,0x13]],
        [51,   5, [0x02,0x01,0x05,0x15,0xF7,0x14]],
        [51,   6, [0x02,0x01,0x06,0x15,0xF7,0x15]],
        [51,   7, [0x02,0x01,0x07,0x15,0xF7,0x16]],
        [51,   8, [0x02,0x01,0x08,0x15,0xF7,0x17]],
        [51,   9, [0x02,0x01,0x09,0x15,0xF7,0x18]], // Undocumented
        [51,  10, [0x02,0x01,0x0A,0x15,0xF7,0x19]],
        [51,  11, [0x02,0x01,0x0B,0x15,0xF7,0x1A]],
        [51,  12, [0x02,0x01,0x0C,0x15,0xF7,0x1B]],
        [52,   1, [0x02,0x01,0x01,0x15,0xF8,0x11]],
        [52,   2, [0x02,0x01,0x02,0x15,0xF8,0x12]],
        [52,   3, [0x02,0x01,0x03,0x15,0xF8,0x13]],
        [52,   4, [0x02,0x01,0x04,0x15,0xF8,0x14]],
        [52,   5, [0x02,0x01,0x05,0x15,0xF8,0x15]],
        [52,   6, [0x02,0x01,0x06,0x15,0xF8,0x16]],
        [52,   7, [0x02,0x01,0x07,0x15,0xF8,0x17]],
        [52,   8, [0x02,0x01,0x08,0x15,0xF8,0x18]],
        [52,   9, [0x02,0x01,0x09,0x15,0xF8,0x19]], // Undocumented
        [52,  10, [0x02,0x01,0x0A,0x15,0xF8,0x1A]],
        [52,  11, [0x02,0x01,0x0B,0x15,0xF8,0x1B]],
        [52,  12, [0x02,0x01,0x0C,0x15,0xF8,0x1C]],
        [53,   1, [0x02,0x01,0x01,0x15,0xF9,0x12]],
        [53,   2, [0x02,0x01,0x02,0x15,0xF9,0x13]],
        [53,   3, [0x02,0x01,0x03,0x15,0xF9,0x14]],
        [53,   4, [0x02,0x01,0x04,0x15,0xF9,0x15]],
        [53,   5, [0x02,0x01,0x05,0x15,0xF9,0x16]],
        [53,   6, [0x02,0x01,0x06,0x15,0xF9,0x17]],
        [53,   7, [0x02,0x01,0x07,0x15,0xF9,0x18]],
        [53,   8, [0x02,0x01,0x08,0x15,0xF9,0x19]],
        [53,   9, [0x02,0x01,0x09,0x15,0xF9,0x1A]], // Undocumented
        [53,  10, [0x02,0x01,0x0A,0x15,0xF9,0x1B]],
        [53,  11, [0x02,0x01,0x0B,0x15,0xF9,0x1C]],
        [53,  12, [0x02,0x01,0x0C,0x15,0xF9,0x1D]],
        [54,   1, [0x02,0x01,0x01,0x15,0xFA,0x13]],
        [54,   2, [0x02,0x01,0x02,0x15,0xFA,0x14]],
        [54,   3, [0x02,0x01,0x03,0x15,0xFA,0x15]],
        [54,   4, [0x02,0x01,0x04,0x15,0xFA,0x16]],
        [54,   5, [0x02,0x01,0x05,0x15,0xFA,0x17]],
        [54,   6, [0x02,0x01,0x06,0x15,0xFA,0x18]],
        [54,   7, [0x02,0x01,0x07,0x15,0xFA,0x19]],
        [54,   8, [0x02,0x01,0x08,0x15,0xFA,0x1A]],
        [54,   9, [0x02,0x01,0x09,0x15,0xFA,0x1B]], // Undocumented
        [54,  10, [0x02,0x01,0x0A,0x15,0xFA,0x1C]],
        [54,  11, [0x02,0x01,0x0B,0x15,0xFA,0x1D]],
        [54,  12, [0x02,0x01,0x0C,0x15,0xFA,0x1E]],
        [55,   1, [0x02,0x01,0x01,0x15,0xFB,0x14]],
        [55,   2, [0x02,0x01,0x02,0x15,0xFB,0x15]],
        [55,   3, [0x02,0x01,0x03,0x15,0xFB,0x16]],
        [55,   4, [0x02,0x01,0x04,0x15,0xFB,0x17]],
        [55,   5, [0x02,0x01,0x05,0x15,0xFB,0x18]],
        [55,   6, [0x02,0x01,0x06,0x15,0xFB,0x19]],
        [55,   7, [0x02,0x01,0x07,0x15,0xFB,0x1A]],
        [55,   8, [0x02,0x01,0x08,0x15,0xFB,0x1B]],
        [55,   9, [0x02,0x01,0x09,0x15,0xFB,0x1C]], // Undocumented
        [55,  10, [0x02,0x01,0x0A,0x15,0xFB,0x1D]],
        [55,  11, [0x02,0x01,0x0B,0x15,0xFB,0x1E]],
        [55,  12, [0x02,0x01,0x0C,0x15,0xFB,0x1F]],
        [56,   1, [0x02,0x01,0x01,0x15,0xFC,0x15]],
        [56,   2, [0x02,0x01,0x02,0x15,0xFC,0x16]],
        [56,   3, [0x02,0x01,0x03,0x15,0xFC,0x17]],
        [56,   4, [0x02,0x01,0x04,0x15,0xFC,0x18]],
        [56,   5, [0x02,0x01,0x05,0x15,0xFC,0x19]],
        [56,   6, [0x02,0x01,0x06,0x15,0xFC,0x1A]],
        [56,   7, [0x02,0x01,0x07,0x15,0xFC,0x1B]],
        [56,   8, [0x02,0x01,0x08,0x15,0xFC,0x1C]],
        [56,   9, [0x02,0x01,0x09,0x15,0xFC,0x1D]], // Undocumented
        [56,  10, [0x02,0x01,0x0A,0x15,0xFC,0x1E]],
        [56,  11, [0x02,0x01,0x0B,0x15,0xFC,0x1F]],
        [56,  12, [0x02,0x01,0x0C,0x15,0xFC,0x20]],
        [57,   1, [0x02,0x01,0x01,0x15,0xFD,0x16]],
        [57,   2, [0x02,0x01,0x02,0x15,0xFD,0x17]],
        [57,   3, [0x02,0x01,0x03,0x15,0xFD,0x18]],
        [57,   4, [0x02,0x01,0x04,0x15,0xFD,0x19]],
        [57,   5, [0x02,0x01,0x05,0x15,0xFD,0x1A]],
        [57,   6, [0x02,0x01,0x06,0x15,0xFD,0x1B]],
        [57,   7, [0x02,0x01,0x07,0x15,0xFD,0x1C]],
        [57,   8, [0x02,0x01,0x08,0x15,0xFD,0x1D]],
        [57,   9, [0x02,0x01,0x09,0x15,0xFD,0x1E]], // Undocumented
        [57,  10, [0x02,0x01,0x0A,0x15,0xFD,0x1F]],
        [57,  11, [0x02,0x01,0x0B,0x15,0xFD,0x20]],
        [57,  12, [0x02,0x01,0x0C,0x15,0xFD,0x21]],
        [58,   1, [0x02,0x01,0x01,0x15,0xFE,0x17]],
        [58,   2, [0x02,0x01,0x02,0x15,0xFE,0x18]],
        [58,   3, [0x02,0x01,0x03,0x15,0xFE,0x19]],
        [58,   4, [0x02,0x01,0x04,0x15,0xFE,0x1A]],
        [58,   5, [0x02,0x01,0x05,0x15,0xFE,0x1B]],
        [58,   6, [0x02,0x01,0x06,0x15,0xFE,0x1C]],
        [58,   7, [0x02,0x01,0x07,0x15,0xFE,0x1D]],
        [58,   8, [0x02,0x01,0x08,0x15,0xFE,0x1E]],
        [58,   9, [0x02,0x01,0x09,0x15,0xFE,0x1F]], // Undocumented
        [58,  10, [0x02,0x01,0x0A,0x15,0xFE,0x20]],
        [58,  11, [0x02,0x01,0x0B,0x15,0xFE,0x21]],
        [58,  12, [0x02,0x01,0x0C,0x15,0xFE,0x22]],
        [59,   1, [0x02,0x01,0x01,0x15,0xFF,0x18]],
        [59,   2, [0x02,0x01,0x02,0x15,0xFF,0x19]],
        [59,   3, [0x02,0x01,0x03,0x15,0xFF,0x1A]],
        [59,   4, [0x02,0x01,0x04,0x15,0xFF,0x1B]],
        [59,   5, [0x02,0x01,0x05,0x15,0xFF,0x1C]],
        [59,   6, [0x02,0x01,0x06,0x15,0xFF,0x1D]],
        [59,   7, [0x02,0x01,0x07,0x15,0xFF,0x1E]],
        [59,   8, [0x02,0x01,0x08,0x15,0xFF,0x1F]],
        [59,   9, [0x02,0x01,0x09,0x15,0xFF,0x20]], // Undocumented
        [59,  10, [0x02,0x01,0x0A,0x15,0xFF,0x21]],
        [59,  11, [0x02,0x01,0x0B,0x15,0xFF,0x22]],
        [59,  12, [0x02,0x01,0x0C,0x15,0xFF,0x23]],
        [60,   1, [0x02,0x01,0x01,0x15,0x00,0x19]],
        [60,   2, [0x02,0x01,0x02,0x15,0x00,0x1A]],
        [60,   3, [0x02,0x01,0x03,0x15,0x00,0x1B]],
        [60,   4, [0x02,0x01,0x04,0x15,0x00,0x1C]],
        [60,   5, [0x02,0x01,0x05,0x15,0x00,0x1D]],
        [60,   6, [0x02,0x01,0x06,0x15,0x00,0x1E]],
        [60,   7, [0x02,0x01,0x07,0x15,0x00,0x1F]],
        [60,   8, [0x02,0x01,0x08,0x15,0x00,0x20]],
        [60,   9, [0x02,0x01,0x09,0x15,0x00,0x21]], // Undocumented
        [60,  10, [0x02,0x01,0x0A,0x15,0x00,0x22]],
        [60,  11, [0x02,0x01,0x0B,0x15,0x00,0x23]],
        [60,  12, [0x02,0x01,0x0C,0x15,0x00,0x24]],
    ])('Command.set_volume(%i, %i) -> %o', (volume, zone, expected) => {
        expect(Protocol.set_volume(zone, volume).get_command()).toEqual(Buffer.from(expected));
    })
});

