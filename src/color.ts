export interface Color {
  r: number;
  g: number;
  b: number;
}

export class ColorUtil {
  static intToColor(value: number): Color {
    return {
      r: (value >> 16) & 255,
      g: (value >> 8) & 255,
      b: value & 255
    }
  }

  static colorToInt(color: Color): number {
    return (color.r << 16) + (color.g << 8) + color.b;
  }
}