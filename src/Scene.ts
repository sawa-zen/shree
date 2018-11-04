import Object3D from './Object3D';

class Scene extends Object3D {
  _needsUpdate = true;
  get needsUpdate() {
    return this._needsUpdate;
  }
  set needsUpdate(flag: boolean) {
    this._needsUpdate = flag;
  }

  constructor() {
    super();
  }
}

export default Scene;
