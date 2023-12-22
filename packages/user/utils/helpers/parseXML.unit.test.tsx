import {describe, it, expect} from 'vitest';
import {parseXML} from './parseXML';

describe('Parse XML', () => {
  it('Converts XML to JSON if the string is valid', () => {
    const result = parseXML('<root><messages>Hello</messages></root>');

    expect(result).toStrictEqual({
      root: {
        messages: ['Hello'],
      },
    });
  });
});
