import { describe, expect, it } from 'vitest';
import parseCSV from '../src/lib/parse-csv';

describe('parseCSV', () => {
  it('parses simple CSV rows', () => {
    const input = 'a,b,c\nd,e,f';
    const result = parseCSV(input);
    expect(result).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ]);
  });

  it('handles quoted fields with escaped quotes', () => {
    const input = '"a","b""c","d"';
    const result = parseCSV(input);
    expect(result).toEqual([
      ['a', 'b"c', 'd'],
    ]);
  });

  it('supports CRLF and LF line endings', () => {
    const inputCRLF = 'a,b\r\nc,d';
    const inputLF = 'a,b\nc,d';
    expect(parseCSV(inputCRLF)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
    expect(parseCSV(inputLF)).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
});
