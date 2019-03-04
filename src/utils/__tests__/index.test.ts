import { getContext } from '../index';

describe('getContext', () => {
  test('is Hoge', () => {
    const canvas = document.createElement('canvas');
    expect(getContext(canvas)).toBe(getContext(canvas));
  });
});
