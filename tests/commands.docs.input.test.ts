
import {describe, expect, test} from 'vitest'
import Protocol, {Source, Zone} from "../src/Protocol";

describe.concurrent('Zone Input', () => {
    test.concurrent.each([
        [Source._01,   Zone._01, [0x02,0x00,0x01,0x04,0x10,0x17]],
        [Source._01,   Zone._02, [0x02,0x00,0x02,0x04,0x10,0x18]],
        [Source._01,   Zone._03, [0x02,0x00,0x03,0x04,0x10,0x19]],
        [Source._01,   Zone._04, [0x02,0x00,0x04,0x04,0x10,0x1A]],
        [Source._01,   Zone._05, [0x02,0x00,0x05,0x04,0x10,0x1B]],
        [Source._01,   Zone._06, [0x02,0x00,0x06,0x04,0x10,0x1C]],
        [Source._01,   Zone._07, [0x02,0x00,0x07,0x04,0x10,0x1D]],
        [Source._01,   Zone._08, [0x02,0x00,0x08,0x04,0x10,0x1E]],
        [Source._01,   Zone._09, [0x02,0x00,0x09,0x04,0x10,0x1F]],
        [Source._01,   Zone._10, [0x02,0x00,0x0A,0x04,0x10,0x20]],
        [Source._01,   Zone._11, [0x02,0x00,0x0B,0x04,0x10,0x21]],
        [Source._01,   Zone._12, [0x02,0x00,0x0C,0x04,0x10,0x22]],
        [Source._02,   Zone._01, [0x02,0x00,0x01,0x04,0x11,0x18]],
        [Source._02,   Zone._02, [0x02,0x00,0x02,0x04,0x11,0x19]],
        [Source._02,   Zone._03, [0x02,0x00,0x03,0x04,0x11,0x1A]],
        [Source._02,   Zone._04, [0x02,0x00,0x04,0x04,0x11,0x1B]],
        [Source._02,   Zone._05, [0x02,0x00,0x05,0x04,0x11,0x1C]],
        [Source._02,   Zone._06, [0x02,0x00,0x06,0x04,0x11,0x1D]],
        [Source._02,   Zone._07, [0x02,0x00,0x07,0x04,0x11,0x1E]],
        [Source._02,   Zone._08, [0x02,0x00,0x08,0x04,0x11,0x1F]],
        [Source._02,   Zone._09, [0x02,0x00,0x09,0x04,0x11,0x20]],
        [Source._02,   Zone._10, [0x02,0x00,0x0A,0x04,0x11,0x21]],
        [Source._02,   Zone._11, [0x02,0x00,0x0B,0x04,0x11,0x22]],
        [Source._02,   Zone._12, [0x02,0x00,0x0C,0x04,0x11,0x23]],
        [Source._03,   Zone._01, [0x02,0x00,0x01,0x04,0x12,0x19]],
        [Source._03,   Zone._02, [0x02,0x00,0x02,0x04,0x12,0x1A]],
        [Source._03,   Zone._03, [0x02,0x00,0x03,0x04,0x12,0x1B]],
        [Source._03,   Zone._04, [0x02,0x00,0x04,0x04,0x12,0x1C]],
        [Source._03,   Zone._05, [0x02,0x00,0x05,0x04,0x12,0x1D]],
        [Source._03,   Zone._06, [0x02,0x00,0x06,0x04,0x12,0x1E]],
        [Source._03,   Zone._07, [0x02,0x00,0x07,0x04,0x12,0x1F]],
        [Source._03,   Zone._08, [0x02,0x00,0x08,0x04,0x12,0x20]],
        [Source._03,   Zone._09, [0x02,0x00,0x09,0x04,0x12,0x21]],
        [Source._03,   Zone._10, [0x02,0x00,0x0A,0x04,0x12,0x22]],
        [Source._03,   Zone._11, [0x02,0x00,0x0B,0x04,0x12,0x23]],
        [Source._03,   Zone._12, [0x02,0x00,0x0C,0x04,0x12,0x24]],
        [Source._04,   Zone._01, [0x02,0x00,0x01,0x04,0x13,0x1A]],
        [Source._04,   Zone._02, [0x02,0x00,0x02,0x04,0x13,0x1B]],
        [Source._04,   Zone._03, [0x02,0x00,0x03,0x04,0x13,0x1C]],
        [Source._04,   Zone._04, [0x02,0x00,0x04,0x04,0x13,0x1D]],
        [Source._04,   Zone._05, [0x02,0x00,0x05,0x04,0x13,0x1E]],
        [Source._04,   Zone._06, [0x02,0x00,0x06,0x04,0x13,0x1F]],
        [Source._04,   Zone._07, [0x02,0x00,0x07,0x04,0x13,0x20]],
        [Source._04,   Zone._08, [0x02,0x00,0x08,0x04,0x13,0x21]],
        [Source._04,   Zone._09, [0x02,0x00,0x09,0x04,0x13,0x22]],
        [Source._04,   Zone._10, [0x02,0x00,0x0A,0x04,0x13,0x23]],
        [Source._04,   Zone._11, [0x02,0x00,0x0B,0x04,0x13,0x24]],
        [Source._04,   Zone._12, [0x02,0x00,0x0C,0x04,0x13,0x25]],
        [Source._05,   Zone._01, [0x02,0x00,0x01,0x04,0x14,0x1B]],
        [Source._05,   Zone._02, [0x02,0x00,0x02,0x04,0x14,0x1C]],
        [Source._05,   Zone._03, [0x02,0x00,0x03,0x04,0x14,0x1D]],
        [Source._05,   Zone._04, [0x02,0x00,0x04,0x04,0x14,0x1E]],
        [Source._05,   Zone._05, [0x02,0x00,0x05,0x04,0x14,0x1F]],
        [Source._05,   Zone._06, [0x02,0x00,0x06,0x04,0x14,0x20]],
        [Source._05,   Zone._07, [0x02,0x00,0x07,0x04,0x14,0x21]],
        [Source._05,   Zone._08, [0x02,0x00,0x08,0x04,0x14,0x22]],
        [Source._05,   Zone._09, [0x02,0x00,0x09,0x04,0x14,0x23]],
        [Source._05,   Zone._10, [0x02,0x00,0x0A,0x04,0x14,0x24]],
        [Source._05,   Zone._11, [0x02,0x00,0x0B,0x04,0x14,0x25]],
        [Source._05,   Zone._12, [0x02,0x00,0x0C,0x04,0x14,0x26]],
        [Source._06,   Zone._01, [0x02,0x00,0x01,0x04,0x15,0x1C]],
        [Source._06,   Zone._02, [0x02,0x00,0x02,0x04,0x15,0x1D]],
        [Source._06,   Zone._03, [0x02,0x00,0x03,0x04,0x15,0x1E]],
        [Source._06,   Zone._04, [0x02,0x00,0x04,0x04,0x15,0x1F]],
        [Source._06,   Zone._05, [0x02,0x00,0x05,0x04,0x15,0x20]],
        [Source._06,   Zone._06, [0x02,0x00,0x06,0x04,0x15,0x21]],
        [Source._06,   Zone._07, [0x02,0x00,0x07,0x04,0x15,0x22]],
        [Source._06,   Zone._08, [0x02,0x00,0x08,0x04,0x15,0x23]],
        [Source._06,   Zone._09, [0x02,0x00,0x09,0x04,0x15,0x24]],
        [Source._06,   Zone._10, [0x02,0x00,0x0A,0x04,0x15,0x25]],
        [Source._06,   Zone._11, [0x02,0x00,0x0B,0x04,0x15,0x26]],
        [Source._06,   Zone._12, [0x02,0x00,0x0C,0x04,0x15,0x27]],
        [Source._07,   Zone._01, [0x02,0x00,0x01,0x04,0x16,0x1D]],
        [Source._07,   Zone._02, [0x02,0x00,0x02,0x04,0x16,0x1E]],
        [Source._07,   Zone._03, [0x02,0x00,0x03,0x04,0x16,0x1F]],
        [Source._07,   Zone._04, [0x02,0x00,0x04,0x04,0x16,0x20]],
        [Source._07,   Zone._05, [0x02,0x00,0x05,0x04,0x16,0x21]],
        [Source._07,   Zone._06, [0x02,0x00,0x06,0x04,0x16,0x22]],
        [Source._07,   Zone._07, [0x02,0x00,0x07,0x04,0x16,0x23]],
        [Source._07,   Zone._08, [0x02,0x00,0x08,0x04,0x16,0x24]],
        [Source._07,   Zone._09, [0x02,0x00,0x09,0x04,0x16,0x25]],
        [Source._07,   Zone._10, [0x02,0x00,0x0A,0x04,0x16,0x26]],
        [Source._07,   Zone._11, [0x02,0x00,0x0B,0x04,0x16,0x27]],
        [Source._07,   Zone._12, [0x02,0x00,0x0C,0x04,0x16,0x28]],
        [Source._08,   Zone._01, [0x02,0x00,0x01,0x04,0x17,0x1E]],
        [Source._08,   Zone._02, [0x02,0x00,0x02,0x04,0x17,0x1F]],
        [Source._08,   Zone._03, [0x02,0x00,0x03,0x04,0x17,0x20]],
        [Source._08,   Zone._04, [0x02,0x00,0x04,0x04,0x17,0x21]],
        [Source._08,   Zone._05, [0x02,0x00,0x05,0x04,0x17,0x22]],
        [Source._08,   Zone._06, [0x02,0x00,0x06,0x04,0x17,0x23]],
        [Source._08,   Zone._07, [0x02,0x00,0x07,0x04,0x17,0x24]],
        [Source._08,   Zone._08, [0x02,0x00,0x08,0x04,0x17,0x25]],
        [Source._08,   Zone._09, [0x02,0x00,0x09,0x04,0x17,0x26]],
        [Source._08,   Zone._10, [0x02,0x00,0x0A,0x04,0x17,0x27]],
        [Source._08,   Zone._11, [0x02,0x00,0x0B,0x04,0x17,0x28]],
        [Source._08,   Zone._12, [0x02,0x00,0x0C,0x04,0x17,0x29]],
        [Source._09,   Zone._01, [0x02,0x00,0x01,0x04,0x18,0x1F]],
        [Source._09,   Zone._02, [0x02,0x00,0x02,0x04,0x18,0x20]],
        [Source._09,   Zone._03, [0x02,0x00,0x03,0x04,0x18,0x21]],
        [Source._09,   Zone._04, [0x02,0x00,0x04,0x04,0x18,0x22]],
        [Source._09,   Zone._05, [0x02,0x00,0x05,0x04,0x18,0x23]],
        [Source._09,   Zone._06, [0x02,0x00,0x06,0x04,0x18,0x24]],
        [Source._09,   Zone._07, [0x02,0x00,0x07,0x04,0x18,0x25]],
        [Source._09,   Zone._08, [0x02,0x00,0x08,0x04,0x18,0x26]],
        [Source._09,   Zone._09, [0x02,0x00,0x09,0x04,0x18,0x27]],
        [Source._09,   Zone._10, [0x02,0x00,0x0A,0x04,0x18,0x28]],
        [Source._09,   Zone._11, [0x02,0x00,0x0B,0x04,0x18,0x29]],
        [Source._09,   Zone._12, [0x02,0x00,0x0C,0x04,0x18,0x2A]],
        [Source._10,   Zone._01, [0x02,0x00,0x01,0x04,0x19,0x20]],
        [Source._10,   Zone._02, [0x02,0x00,0x02,0x04,0x19,0x21]],
        [Source._10,   Zone._03, [0x02,0x00,0x03,0x04,0x19,0x22]],
        [Source._10,   Zone._04, [0x02,0x00,0x04,0x04,0x19,0x23]],
        [Source._10,   Zone._05, [0x02,0x00,0x05,0x04,0x19,0x24]],
        [Source._10,   Zone._06, [0x02,0x00,0x06,0x04,0x19,0x25]],
        [Source._10,   Zone._07, [0x02,0x00,0x07,0x04,0x19,0x26]],
        [Source._10,   Zone._08, [0x02,0x00,0x08,0x04,0x19,0x27]],
        [Source._10,   Zone._09, [0x02,0x00,0x09,0x04,0x19,0x28]],
        [Source._10,   Zone._10, [0x02,0x00,0x0A,0x04,0x19,0x29]],
        [Source._10,   Zone._11, [0x02,0x00,0x0B,0x04,0x19,0x2A]],
        [Source._10,   Zone._12, [0x02,0x00,0x0C,0x04,0x19,0x2B]],
        [Source._11,   Zone._01, [0x02,0x00,0x01,0x04,0x1A,0x21]],
        [Source._11,   Zone._02, [0x02,0x00,0x02,0x04,0x1A,0x22]],
        [Source._11,   Zone._03, [0x02,0x00,0x03,0x04,0x1A,0x23]],
        [Source._11,   Zone._04, [0x02,0x00,0x04,0x04,0x1A,0x24]],
        [Source._11,   Zone._05, [0x02,0x00,0x05,0x04,0x1A,0x25]],
        [Source._11,   Zone._06, [0x02,0x00,0x06,0x04,0x1A,0x26]],
        [Source._11,   Zone._07, [0x02,0x00,0x07,0x04,0x1A,0x27]],
        [Source._11,   Zone._08, [0x02,0x00,0x08,0x04,0x1A,0x28]],
        [Source._11,   Zone._09, [0x02,0x00,0x09,0x04,0x1A,0x29]],
        [Source._11,   Zone._10, [0x02,0x00,0x0A,0x04,0x1A,0x2A]],
        [Source._11,   Zone._11, [0x02,0x00,0x0B,0x04,0x1A,0x2B]],
        [Source._11,   Zone._12, [0x02,0x00,0x0C,0x04,0x1A,0x2C]],
        [Source._12,   Zone._01, [0x02,0x00,0x01,0x04,0x1B,0x22]],
        [Source._12,   Zone._02, [0x02,0x00,0x02,0x04,0x1B,0x23]],
        [Source._12,   Zone._03, [0x02,0x00,0x03,0x04,0x1B,0x24]],
        [Source._12,   Zone._04, [0x02,0x00,0x04,0x04,0x1B,0x25]],
        [Source._12,   Zone._05, [0x02,0x00,0x05,0x04,0x1B,0x26]],
        [Source._12,   Zone._06, [0x02,0x00,0x06,0x04,0x1B,0x27]],
        [Source._12,   Zone._07, [0x02,0x00,0x07,0x04,0x1B,0x28]],
        [Source._12,   Zone._08, [0x02,0x00,0x08,0x04,0x1B,0x29]],
        [Source._12,   Zone._09, [0x02,0x00,0x09,0x04,0x1B,0x2A]],
        [Source._12,   Zone._10, [0x02,0x00,0x0A,0x04,0x1B,0x2B]],
        [Source._12,   Zone._11, [0x02,0x00,0x0B,0x04,0x1B,0x2C]],
        [Source._12,   Zone._12, [0x02,0x00,0x0C,0x04,0x1B,0x2D]],
        [Source._13,   Zone._01, [0x02,0x00,0x01,0x04,0x63,0x6A]],
        [Source._13,   Zone._02, [0x02,0x00,0x02,0x04,0x63,0x6B]],
        [Source._13,   Zone._03, [0x02,0x00,0x03,0x04,0x63,0x6C]],
        [Source._13,   Zone._04, [0x02,0x00,0x04,0x04,0x63,0x6D]],
        [Source._13,   Zone._05, [0x02,0x00,0x05,0x04,0x63,0x6E]],
        [Source._13,   Zone._06, [0x02,0x00,0x06,0x04,0x63,0x6F]],
        [Source._13,   Zone._07, [0x02,0x00,0x07,0x04,0x63,0x70]],
        [Source._13,   Zone._08, [0x02,0x00,0x08,0x04,0x63,0x71]],
        [Source._13,   Zone._09, [0x02,0x00,0x09,0x04,0x63,0x72]],
        [Source._13,   Zone._10, [0x02,0x00,0x0A,0x04,0x63,0x73]],
        [Source._13,   Zone._11, [0x02,0x00,0x0B,0x04,0x63,0x74]],
        [Source._13,   Zone._12, [0x02,0x00,0x0C,0x04,0x63,0x75]],
        [Source._14,   Zone._01, [0x02,0x00,0x01,0x04,0x64,0x6B]],
        [Source._14,   Zone._02, [0x02,0x00,0x02,0x04,0x64,0x6C]],
        [Source._14,   Zone._03, [0x02,0x00,0x03,0x04,0x64,0x6D]],
        [Source._14,   Zone._04, [0x02,0x00,0x04,0x04,0x64,0x6E]],
        [Source._14,   Zone._05, [0x02,0x00,0x05,0x04,0x64,0x6F]],
        [Source._14,   Zone._06, [0x02,0x00,0x06,0x04,0x64,0x70]],
        [Source._14,   Zone._07, [0x02,0x00,0x07,0x04,0x64,0x71]],
        [Source._14,   Zone._08, [0x02,0x00,0x08,0x04,0x64,0x72]],
        [Source._14,   Zone._09, [0x02,0x00,0x09,0x04,0x64,0x73]],
        [Source._14,   Zone._10, [0x02,0x00,0x0A,0x04,0x64,0x74]],
        [Source._14,   Zone._11, [0x02,0x00,0x0B,0x04,0x64,0x75]],
        [Source._14,   Zone._12, [0x02,0x00,0x0C,0x04,0x64,0x76]],
        [Source._15,   Zone._01, [0x02,0x00,0x01,0x04,0x65,0x6C]],
        [Source._15,   Zone._02, [0x02,0x00,0x02,0x04,0x65,0x6D]],
        [Source._15,   Zone._03, [0x02,0x00,0x03,0x04,0x65,0x6E]],
        [Source._15,   Zone._04, [0x02,0x00,0x04,0x04,0x65,0x6F]],
        [Source._15,   Zone._05, [0x02,0x00,0x05,0x04,0x65,0x70]],
        [Source._15,   Zone._06, [0x02,0x00,0x06,0x04,0x65,0x71]],
        [Source._15,   Zone._07, [0x02,0x00,0x07,0x04,0x65,0x72]],
        [Source._15,   Zone._08, [0x02,0x00,0x08,0x04,0x65,0x73]],
        [Source._15,   Zone._09, [0x02,0x00,0x09,0x04,0x65,0x74]],
        [Source._15,   Zone._10, [0x02,0x00,0x0A,0x04,0x65,0x75]],
        [Source._15,   Zone._11, [0x02,0x00,0x0B,0x04,0x65,0x76]],
        [Source._15,   Zone._12, [0x02,0x00,0x0C,0x04,0x65,0x77]],
        [Source._16,   Zone._01, [0x02,0x00,0x01,0x04,0x66,0x6D]],
        [Source._16,   Zone._02, [0x02,0x00,0x02,0x04,0x66,0x6E]],
        [Source._16,   Zone._03, [0x02,0x00,0x03,0x04,0x66,0x6F]],
        [Source._16,   Zone._04, [0x02,0x00,0x04,0x04,0x66,0x70]],
        [Source._16,   Zone._05, [0x02,0x00,0x05,0x04,0x66,0x71]],
        [Source._16,   Zone._06, [0x02,0x00,0x06,0x04,0x66,0x72]],
        [Source._16,   Zone._07, [0x02,0x00,0x07,0x04,0x66,0x73]],
        [Source._16,   Zone._08, [0x02,0x00,0x08,0x04,0x66,0x74]],
        [Source._16,   Zone._09, [0x02,0x00,0x09,0x04,0x66,0x75]],
        [Source._16,   Zone._10, [0x02,0x00,0x0A,0x04,0x66,0x76]],
        [Source._16,   Zone._11, [0x02,0x00,0x0B,0x04,0x66,0x77]],
        [Source._16,   Zone._12, [0x02,0x00,0x0C,0x04,0x66,0x78]],
        [Source._17,   Zone._01, [0x02,0x00,0x01,0x04,0x67,0x6E]],
        [Source._17,   Zone._02, [0x02,0x00,0x02,0x04,0x67,0x6F]],
        [Source._17,   Zone._03, [0x02,0x00,0x03,0x04,0x67,0x70]],
        [Source._17,   Zone._04, [0x02,0x00,0x04,0x04,0x67,0x71]],
        [Source._17,   Zone._05, [0x02,0x00,0x05,0x04,0x67,0x72]],
        [Source._17,   Zone._06, [0x02,0x00,0x06,0x04,0x67,0x73]],
        [Source._17,   Zone._07, [0x02,0x00,0x07,0x04,0x67,0x74]],
        [Source._17,   Zone._08, [0x02,0x00,0x08,0x04,0x67,0x75]],
        [Source._17,   Zone._09, [0x02,0x00,0x09,0x04,0x67,0x76]],
        [Source._17,   Zone._10, [0x02,0x00,0x0A,0x04,0x67,0x77]],
        [Source._17,   Zone._11, [0x02,0x00,0x0B,0x04,0x67,0x78]],
        [Source._17,   Zone._12, [0x02,0x00,0x0C,0x04,0x67,0x79]],
        [Source._18,   Zone._01, [0x02,0x00,0x01,0x04,0x68,0x6F]],
        [Source._18,   Zone._02, [0x02,0x00,0x02,0x04,0x68,0x70]],
        [Source._18,   Zone._03, [0x02,0x00,0x03,0x04,0x68,0x71]],
        [Source._18,   Zone._04, [0x02,0x00,0x04,0x04,0x68,0x72]],
        [Source._18,   Zone._05, [0x02,0x00,0x05,0x04,0x68,0x73]],
        [Source._18,   Zone._06, [0x02,0x00,0x06,0x04,0x68,0x74]],
        [Source._18,   Zone._07, [0x02,0x00,0x07,0x04,0x68,0x75]],
        [Source._18,   Zone._08, [0x02,0x00,0x08,0x04,0x68,0x76]],
        [Source._18,   Zone._09, [0x02,0x00,0x09,0x04,0x68,0x77]],
        [Source._18,   Zone._10, [0x02,0x00,0x0A,0x04,0x68,0x78]],
        [Source._18,   Zone._11, [0x02,0x00,0x0B,0x04,0x68,0x79]],
        [Source._18,   Zone._12, [0x02,0x00,0x0C,0x04,0x68,0x7A]],
    ])('Command.set_input(%i, %i) -> %o', (input: Source, zone, expected) => {
        expect(Protocol.set_source(zone, input).get_command()).toEqual(Buffer.from(expected));
    });
});