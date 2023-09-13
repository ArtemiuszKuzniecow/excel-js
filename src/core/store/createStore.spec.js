import {Store} from './createStore';

describe('Test', () => {
  test('test', () => {
    const store = new Store(console.log, {});
    expect(store).toBeDefined();
  });
});
