import { Polygon } from '../src/graphics';
import VectorUtil from '../src/vector';

it('get normal', () => {
  const polygon: Polygon = {
    p1: { x: 0, y: 0, z: 0 },
    p2: { x: 2, y: 0, z: 0 },
    p3: { x: 1, y: 1, z: 0 },
    p4: { x: 0, y: 1, z: 0 },
  }
  const result = VectorUtil.getNormal(polygon);
  expect(result).toEqual({ x: 0, y: 0, z: 1 });
})

it('get theta', () => {
  const v1 = { x: 1, y: 0, z: 0 };
  const v2 = { x: 0, y: 1, z: 0 };
  const cos = VectorUtil.cosTheta(v1, v2);
  expect(cos).toBe(0);
})