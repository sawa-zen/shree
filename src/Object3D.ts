import { getUniqueStr } from './utils';
import Matrix4 from './Matrix4';
import Vector3 from './Vector3';

/**
 * Object3D
 */
class Object3D {
  private _id: string = getUniqueStr();
  get id() {
    return this._id;
  }

  private _position: Vector3 = new Vector3();
  get position() {
    return this._position;
  }

  private _up: Vector3 = new Vector3(0, 1, 0);
  get up() {
    return this._up;
  }

  private _rotation: Vector3 = new Vector3();
  get rotation() {
    return this._rotation;
  }

  private _parent: Object3D | null = null;
  get parent(): Object3D | null {
    return this._parent;
  }
  set parent(obj: Object3D | null) {
    this._parent = obj;
  }

  private _children: Object3D[] = [];
  get children() {
    return this._children;
  }

  private _matrix: Matrix4 = new Matrix4();
  get matrix() {
    return this._matrix;
  }

  private _matrixWorld: Matrix4 = new Matrix4();
  get matrixWorld() {
    return this._matrixWorld;
  }

  public add(obj: Object3D) {
    this._children.push(obj);
    obj.parent = this;
  }

  public updateMatrix() {
    this._matrix.identity();
    this._matrix.rotate(this.rotation.x, [1, 0, 0]);
    this._matrix.rotate(this.rotation.y, [0, 1, 0]);
    this._matrix.rotate(this.rotation.z, [0, 0, 1]);
    this._matrix.translate([this.position.x, this.position.y, this.position.z]);
  }

  public updateMatrixWorld() {
    this.updateMatrix();

    if (this._parent) {
      this._matrixWorld.multiplyMatrices(
        this._parent.matrixWorld,
        this._matrix
      );
    } else {
      this._matrixWorld.copy(this.matrix);
    }

    // update children
    const children = this._children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].updateMatrixWorld();
    }
  }
}

export default Object3D;
