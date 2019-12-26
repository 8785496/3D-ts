import { ColorUtil } from '../src/color';

it('int to color', () => {
  const color = ColorUtil.intToColor(0xDDDDDD);
  expect(color).toEqual({ r: 221, g: 221, b: 221 });
})

it('color to int', () => {
  const result = ColorUtil.colorToInt({ r: 221, g: 221, b: 221 });
  expect(result).toBe(0xDDDDDD);
})