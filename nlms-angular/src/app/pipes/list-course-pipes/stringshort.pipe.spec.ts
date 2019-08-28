import { StringShortPipe } from './stringshort.pipe';

describe('StringshorteningPipe', () => {
  it('create an instance', () => {
    const pipe = new StringShortPipe();
    expect(pipe).toBeTruthy();
  });
});
