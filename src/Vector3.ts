import EventEmitter from 'eventemitter3';

class Vector3 extends EventEmitter {
  private _x = 0;
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
    this.emit('change');
  }

  private _y = 0;
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
    this.emit('change');
  }

  private _z = 0;
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
    this.emit('change');
  }

  constructor(x: number = 0, y: number = 0, z: number = 0) {
    super();

    this._x = x;
    this._y = y;
    this._z = z;
  }
}

export default Vector3;
