import { Polygon } from "../src/graphics"
import Scanner from "../src/scanner"

it('scan polygon', () => {
  const polygon: Polygon = {
    p1: { x: 0, y: 0, z: 0 },
    p2: { x: 0, y: 10, z: 0 },
    p3: { x: 10, y: 10, z: 0 },
    p4: { x: 10, y: 0, z: 0 },
  }
  const result = Scanner.scanPolygon(polygon);
  console.log(result);
})