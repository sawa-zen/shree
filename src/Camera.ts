import Object3D from './Object3D';
import Matrix4 from './Matrix4';

class Camera extends Object3D {
  private _matrixWorldInverse: Matrix4 = new Matrix4();
  get matrixWorldInverse() {
    return this._matrixWorldInverse;
  }

  public updateMatrixWorld() {
    super.updateMatrixWorld();
    this.matrixWorldInverse.getInverse(this.matrixWorld);
  }
}

export default Camera;
