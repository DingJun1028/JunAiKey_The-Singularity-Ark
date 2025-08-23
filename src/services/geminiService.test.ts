import { describe, it, expect } from 'vitest';

// We have to use a relative path here because this is a test file
// and we are importing a non-exported function.
// @ts-ignore - allow testing of non-exported function
import { parseJsonFromText } from './geminiService';

describe('geminiService - parseJsonFromText', () => {

  it('should parse a valid JSON string', () => {
    const jsonString = '{"key": "value", "number": 123}';
    const expected = { key: 'value', number: 123 };
    expect(parseJsonFromText(jsonString)).toEqual(expected);
  });

  it('should parse a JSON string with leading/trailing whitespace', () => {
    const jsonString = '  \n {"key": "value"} \t ';
    const expected = { key: 'value' };
    expect(parseJsonFromText(jsonString)).toEqual(expected);
  });

  it('should extract and parse JSON from a markdown code fence with "json" identifier', () => {
    const text = 'Here is the JSON:\n```json\n{"theme": "dark"}\n```';
    const expected = { theme: 'dark' };
    expect(parseJsonFromText(text)).toEqual(expected);
  });

  it('should extract and parse JSON from a markdown code fence without an identifier', () => {
    const text = '```\n{"user": "test"}\n```';
    const expected = { user: 'test' };
    expect(parseJsonFromText(text)).toEqual(expected);
  });
  
  it('should extract and parse JSON from a one-line markdown code fence', () => {
    const text = '```{"user": "oneline"}```';
    const expected = { user: 'oneline' };
    expect(parseJsonFromText(text)).toEqual(expected);
  });

  it('should throw an error for malformed JSON', () => {
    const malformedJson = '{"key": "value",}'; // Extra comma
    expect(() => parseJsonFromText(malformedJson)).toThrow('Invalid JSON response from AI');
  });
  
  it('should throw an error for a non-JSON string', () => {
    const nonJson = 'this is just a regular string';
    expect(() => parseJsonFromText(nonJson)).toThrow('Invalid JSON response from AI');
  });

});
