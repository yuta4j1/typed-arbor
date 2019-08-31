export class Point {
  x: number;
  y: number;
  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  random(radius: number): Point {
    radius = radius || 5;
    return new Point(
      2 * radius * (Math.random() - 0.5),
      2 * radius * (Math.random() - 0.5)
    );
  }

  exploded(): boolean {
    return isNaN(this.x) || isNaN(this.y);
  }
  add(p: Point): Point {
    return new Point(this.x + p.x, this.y + p.y);
  }
  subtract(p: Point): Point {
    return new Point(this.x - p.x, this.y - p.y);
  }
  multiply(n: number): Point {
    return new Point(this.x * n, this.y * n);
  }
  divide(n: number): Point {
    return new Point(this.x / n, this.y / n);
  }
  magnitude(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  normal(): Point {
    return new Point(-this.y, this.x);
  }
  normalize(): Point {
    return this.divide(this.magnitude());
  }
}

let _nextNodeId = 1;
const Node = (data: any) => {
  this._id = _nextNodeId++;
  this.data = data || {};
  this._mass = data.mass || 1;
  this._fixed = data.fixed;
  this._p = new Point(data.x, data.y);
};

export class Particle {
  p: Point;
  m: number;
  v: Point;
  f: Point;
  constructor(position: Point, mass: number) {
    this.p = position;
    this.m = mass;
    this.v = new Point(0, 0);
    this.f = new Point(0, 0);
  }
  applyForce(force: Point) {
    this.f = this.f.add(force.divide(this.m));
  }
}

export class Spring {
  point1: Particle;
  point2: Particle;
  length: number;
  k: any;
  constructor(point1: Particle, point2: Particle, length: number, k: any) {
    this.point1 = point1;
    this.point2 = point2;
    this.length = length;
    this.k = k;
  }
  distanceToParticle(point: Particle) {
    const n = this.point2.p
      .subtract(this.point1.p)
      .normalize()
      .normal();
    const ac = point.p.subtract(this.point1.p);
    return Math.abs(ac.x * n.x + ac.y * n.y);
  }
}
