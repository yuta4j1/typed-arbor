export type FigureStyle = {
  stroke: string;
  fill: string;
  width?: number;
  alpha?: number;
};

export type OvalStyle = FigureStyle;

export type RectStyle = FigureStyle;

export type PathStyle = FigureStyle & {
  closed?: boolean;
};

export type RGB = {
  r: number;
  g: number;
  b: number;
  alpha: number;
};

export type DrawStyle = {
  background: string | RGB;
  fill: string | RGB;
  stroke: string | RGB;
  width: number;
};

export type FontStyle = {
  font: string;
  size: number;
  align: string;
  color: RGB;
  alpha: number;
  baseline: string;
};

// TODO FontStyleと統合できない？
export type TextStyle = {
  x: number;
  y: number;
  font: string;
  size: number;
  align: string;
  color: RGB;
  alpha: number;
  baseline: string;
};
