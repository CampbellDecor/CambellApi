import add from '../src/index';

describe('testing index file', () => {
  test('empty string should result in zero', () => {
    expect(add(1,4)).toBe(5);
  });
});