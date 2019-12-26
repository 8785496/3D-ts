import Scanner from '../src/scanner';
import { Polygon } from '../src/graphics';

it('scan polygon', () => {
  const polygon: Polygon = {
    p1: { x: 1, y: 1, z: 0 },
    p2: { x: 3, y: 1, z: 0 },
    p3: { x: 3, y: 3, z: 0 },
    p4: { x: 1, y: 3, z: 0 },
  }
  const result = Scanner.scanPolygon(polygon);
  expect(result).toEqual([
    { x: 1, y: 1, z: 0 }, { x: 2, y: 1, z: 0 }, { x: 3, y: 1, z: 0 },
    { x: 1, y: 2, z: 0 }, { x: 2, y: 2, z: 0 }, { x: 3, y: 2, z: 0 },
    { x: 1, y: 3, z: 0 }, { x: 2, y: 3, z: 0 }, { x: 3, y: 3, z: 0 },
  ]);
});

it('draw line 1', () => {
  const result = Scanner.drawLine({ x: 1, y: 1 }, { x: 2, y: 4 });
  expect(result).toEqual([{ x: 1, y: 1 }, { x: 1, y: 2 }, { x: 2, y: 3 }, { x: 2, y: 4 }]);
})

it('draw line 2', () => {
  const result = Scanner.drawLine({ x: 1, y: 1 }, { x: 4, y: 2 });
  expect(result).toEqual([{ x: 1, y: 1 }, { x: 2, y: 1 }, { x: 3, y: 2 }, { x: 4, y: 2 }]);
})
