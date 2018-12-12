import EventEmitter from 'eventemitter3';
import { getUniqueStr } from './utils';
import Matrix4 from './Matrix4';
import Vector3 from './Vector3';
import Quaternion from './Quaternion';

/**
 * Object3D
 */
class Object3D extends EventEmitter {
  get id() {
    return this._id;
  }
  get position() {
    return this._position;
  }
  get up() {
    return this._up;
  }
  get scale() {
    return this._scale;
  }
  get rotation() {
    return this._rotation;
  }
  get quaternion() {
    return this._quaternion;
  }
  get parent(): Object3D | null {
    return this._parent;
  }
  set parent(obj: Object3D | null) {
    this._parent = obj;
  }
  get children() {
    return this._children;
  }
  get matrix() {
    return this._matrix;
  }
  get matrixWorld() {
    return this._matrixWorld;
  }
  get modelViewMatrix() {
    return this._modelViewMatrix;
  }
  private _id: string = getUniqueStr();

  private _position: Vector3 = new Vector3();

  private _up: Vector3 = new Vector3(0, 1, 0);

  private _scale: Vector3 = new Vector3(1, 1, 1);

  private _rotation: Vector3 = new Vector3();

  private _quaternion: Quaternion = new Quaternion();

  private _parent: Object3D | null = null;

  private _children: Object3D[] = [];

  private _matrix: Matrix4 = new Matrix4();

  private _matrixWorld: Matrix4 = new Matrix4();

  private _modelViewMatrix: Matrix4 = new Matrix4();

  private _matrixWorldNeedsUpdate: boolean = false;

  constructor() {
    super();

    this.rotation.on('change', this._onChangeRotation);
  }

  /**
   * 要素を追加する
   */
  public add(obj: Object3D) {
    this._children.push(obj);
    obj.parent = this;
  }

  /**
   * ローカル変換行列を更新する
   */
  public updateMatrix() {
    this._matrix.compose(
      this._position,
      this._quaternion,
      this._scale
    );
    this._matrixWorldNeedsUpdate = true;
  }

  /**
   * ワールド座標を更新する
   */
  public updateMatrixWorld() {
    this.updateMatrix();

    if (this._matrixWorldNeedsUpdate) {
      if (this._parent) {
        this._matrixWorld.multiplyMatrices(
          this._parent.matrixWorld,
          this._matrix
        );
      } else {
        this._matrixWorld.copy(this.matrix);
      }

      this._matrixWorldNeedsUpdate = false;
    }

    // update children
    const children = this._children;
    for (let i = 0, l = children.length; i < l; i++) {
      children[i].updateMatrixWorld();
    }
  }

  private _onChangeRotation = () => {
    this._quaternion.setFromEuler(this._rotation);
  };
}

export default Object3D;
