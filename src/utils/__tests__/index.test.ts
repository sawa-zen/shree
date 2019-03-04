import { getContext } from '../index';

describe('getContext', () => {
  test('is not undefined', () => {
    const canvas = document.createElement('canvas');
    expect(getContext(canvas)).not.toBeUndefined();
  });
});
