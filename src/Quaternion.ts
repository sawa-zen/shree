class Quaternion {
  public _x = 0;
  get x() {
    return this._x;
  }
  set x(value) {
    this._x = value;
  }

  public _y = 0;
  get y() {
    return this._y;
  }
  set y(value) {
    this._y = value;
  }

  public _z = 0;
  get z() {
    return this._z;
  }
  set z(value) {
    this._z = value;
  }

  public _w = 0;
  get w() {
    return this._w;
  }
  set w(value) {
    this._w = value;
  }

  constructor(x: number = 0, y: number = 0, z: number = 0, w: number = 0) {
    this._x = x;
    this._y = y;
    this._z = z;
    this._w = w;
  }
}

export default Quaternion;
