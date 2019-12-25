import Scanner from "../src/scanner-flatten";
import { Polygon } from "../src/graphics";

it('scan polygon', () => {
  const polygon: Polygon = {
    p1: { x: 1, y: 1, z: 0 },
    p2: { x: 3, y: 1, z: 0 },
    p3: { x: 2, y: 3, z: 0 },
    p4: { x: 1, y: 3, z: 0 },
  }
  const result = Scanner.scanPolygon(polygon);
  console.log(result);
});