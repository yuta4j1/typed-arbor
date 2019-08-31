import { Particle } from './atoms';

class BarnesHutTree {
  _branches: any = [];
  _branchCtr: number = 0;
  _root: any = null;
  _theta: number = 0.5;

  init(topLeft, bottomRight, theta) {
    this._theta = theta;
    this._branchCtr = 0;
  }

  insert(newParticle: Particle) {
    const node = this._root;
    const queue = [newParticle];

    while (queue.length > 0) {
      const particle = queue.shift();
      const p_mass = particle.m;
    }
  }
}
