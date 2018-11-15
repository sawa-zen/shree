import Quaternion from './Quaternion';
import Vector3 from './Vector3';

/**
 * Matrix4
 */
class Matrix4 {
  public _el: Float32Array = new Float32Array(16);
  get el() {
    return this._el;
  }

  constructor() {
    this.identity();
  }

  public identity() {
    this._el[0] = 1;
    this._el[1] = 0;
    this._el[2] = 0;
    this._el[3] = 0;

    this._el[4] = 0;
    this._el[5] = 1;
    this._el[6] = 0;
    this._el[7] = 0;

    this._el[8] = 0;
    this._el[9] = 0;
    this._el[10] = 1;
    this._el[11] = 0;

    this._el[12] = 0;
    this._el[13] = 0;
    this._el[14] = 0;
    this._el[15] = 1;

    return this;
  }

  public multiply(mat: Matrix4): Matrix4 {
    this.multiplyMatrices(this, mat);
    return this;
  }

  public multiplyMatrices(aMat: Matrix4, bMat: Matrix4): Matrix4 {
    const aEl = aMat.el;
    const bEl = bMat.el;

    const a = aEl[0],
      b = aEl[1],
      c = aEl[2],
      d = aEl[3],
      e = aEl[4],
      f = aEl[5],
      g = aEl[6],
      h = aEl[7],
      i = aEl[8],
      j = aEl[9],
      k = aEl[10],
      l = aEl[11],
      m = aEl[12],
      n = aEl[13],
      o = aEl[14],
      p = aEl[15];

    const A = bEl[0],
      B = bEl[1],
      C = bEl[2],
      D = bEl[3],
      E = bEl[4],
      F = bEl[5],
      G = bEl[6],
      H = bEl[7],
      I = bEl[8],
      J = bEl[9],
      K = bEl[10],
      L = bEl[11],
      M = bEl[12],
      N = bEl[13],
      O = bEl[14],
      P = bEl[15];

    this._el[0] = A * a + B * e + C * i + D * m;
    this._el[1] = A * b + B * f + C * j + D * n;
    this._el[2] = A * c + B * g + C * k + D * o;
    this._el[3] = A * d + B * h + C * l + D * p;

    this._el[4] = E * a + F * e + G * i + H * m;
    this._el[5] = E * b + F * f + G * j + H * n;
    this._el[6] = E * c + F * g + G * k + H * o;
    this._el[7] = E * d + F * h + G * l + H * p;

    this._el[8] = I * a + J * e + K * i + L * m;
    this._el[9] = I * b + J * f + K * j + L * n;
    this._el[10] = I * c + J * g + K * k + L * o;
    this._el[11] = I * d + J * h + K * l + L * p;

    this._el[12] = M * a + N * e + O * i + P * m;
    this._el[13] = M * b + N * f + O * j + P * n;
    this._el[14] = M * c + N * g + O * k + P * o;
    this._el[15] = M * d + N * h + O * l + P * p;

    return this;
  }

  /**
   * 渡されたベクトル分拡大縮小する
   */
  public scale(vec: number[]) {
    this._el[0] = this._el[0] * vec[0];
    this._el[1] = this._el[1] * vec[0];
    this._el[2] = this._el[2] * vec[0];
    this._el[3] = this._el[3] * vec[0];

    this._el[4] = this._el[4] * vec[1];
    this._el[5] = this._el[5] * vec[1];
    this._el[6] = this._el[6] * vec[1];
    this._el[7] = this._el[7] * vec[1];

    this._el[8] = this._el[8] * vec[2];
    this._el[9] = this._el[9] * vec[2];
    this._el[10] = this._el[10] * vec[2];
    this._el[11] = this._el[11] * vec[2];

    return this;
  }

  public translate(vec3: number[]) {
    this._el[12] =
      this._el[0] * vec3[0] +
      this._el[4] * vec3[1] +
      this._el[8] * vec3[2] +
      this._el[12];
    this._el[13] =
      this._el[1] * vec3[0] +
      this._el[5] * vec3[1] +
      this._el[9] * vec3[2] +
      this._el[13];
    this._el[14] =
      this._el[2] * vec3[0] +
      this._el[6] * vec3[1] +
      this._el[10] * vec3[2] +
      this._el[14];
    this._el[15] =
      this._el[3] * vec3[0] +
      this._el[7] * vec3[1] +
      this._el[11] * vec3[2] +
      this._el[15];

    return this;
  }

  public rotate(angle: number, axis: number[]) {
    let sq = Math.sqrt(
      axis[0] * axis[0] + axis[1] * axis[1] + axis[2] * axis[2]
    );

    if (!sq) {
      return;
    }

    let a = axis[0],
      b = axis[1],
      c = axis[2];

    if (sq !== 1) {
      sq = 1 / sq;
      a *= sq;
      b *= sq;
      c *= sq;
    }

    const d = Math.sin(angle),
      e = Math.cos(angle),
      f = 1 - e,
      g = this._el[0],
      h = this._el[1],
      i = this._el[2],
      j = this._el[3],
      k = this._el[4],
      l = this._el[5],
      m = this._el[6],
      n = this._el[7],
      o = this._el[8],
      p = this._el[9],
      q = this._el[10],
      r = this._el[11],
      s = a * a * f + e,
      t = b * a * f + c * d,
      u = c * a * f - b * d,
      v = a * b * f - c * d,
      w = b * b * f + e,
      x = c * b * f + a * d,
      y = a * c * f + b * d,
      z = b * c * f - a * d,
      A = c * c * f + e;

    this._el[0] = g * s + k * t + o * u;
    this._el[1] = h * s + l * t + p * u;
    this._el[2] = i * s + m * t + q * u;
    this._el[3] = j * s + n * t + r * u;

    this._el[4] = g * v + k * w + o * x;
    this._el[5] = h * v + l * w + p * x;
    this._el[6] = i * v + m * w + q * x;
    this._el[7] = j * v + n * w + r * x;

    this._el[8] = g * y + k * z + o * A;
    this._el[9] = h * y + l * z + p * A;
    this._el[10] = i * y + m * z + q * A;
    this._el[11] = j * y + n * z + r * A;

    return this;
  }

  /**
   * ビュー変換行列を生成する
   */
  public lookAt(eye: Vector3, center: Vector3, up: Vector3) {
    const eyeX = eye.x,
      eyeY = eye.y,
      eyeZ = eye.z,
      upX = up.x,
      upY = up.y,
      upZ = up.z,
      centerX = center.x,
      centerY = center.y,
      centerZ = center.z;

    if (eyeX === centerX && eyeY === centerY && eyeZ === centerZ) {
      this.identity();
      return;
    }

    let x0, x1, x2, y0, y1, y2, z0, z1, z2, l;
    z0 = eyeX - center.x;
    z1 = eyeY - center.y;
    z2 = eyeZ - center.z;
    l = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= l;
    z1 *= l;
    z2 *= l;
    x0 = upY * z2 - upZ * z1;
    x1 = upZ * z0 - upX * z2;
    x2 = upX * z1 - upY * z0;
    l = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);

    if (!l) {
      x0 = 0;
      x1 = 0;
      x2 = 0;
    } else {
      l = 1 / l;
      x0 *= l;
      x1 *= l;
      x2 *= l;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;
    l = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);

    if (!l) {
      y0 = 0;
      y1 = 0;
      y2 = 0;
    } else {
      l = 1 / l;
      y0 *= l;
      y1 *= l;
      y2 *= l;
    }

    this._el[0] = x0;
    this._el[1] = y0;
    this._el[2] = z0;
    this._el[3] = 0;

    this._el[4] = x1;
    this._el[5] = y1;
    this._el[6] = z1;
    this._el[7] = 0;

    this._el[8] = x2;
    this._el[9] = y2;
    this._el[10] = z2;
    this._el[11] = 0;

    this._el[12] = -(x0 * eyeX + x1 * eyeY + x2 * eyeZ);
    this._el[13] = -(y0 * eyeX + y1 * eyeY + y2 * eyeZ);
    this._el[14] = -(z0 * eyeX + z1 * eyeY + z2 * eyeZ);
    this._el[15] = 1;

    return this;
  }

  /**
   * プロジェクション変換行列を生成する
   */
  public perspective(fovy: number, aspect: number, near: number, far: number) {
    const t = near * Math.tan((fovy * Math.PI) / 360);
    const r = t * aspect;
    const a = r * 2,
      b = t * 2,
      c = far - near;

    this._el[0] = (near * 2) / a;
    this._el[1] = 0;
    this._el[2] = 0;
    this._el[3] = 0;

    this._el[4] = 0;
    this._el[5] = (near * 2) / b;
    this._el[6] = 0;
    this._el[7] = 0;

    this._el[8] = 0;
    this._el[9] = 0;
    this._el[10] = -(far + near) / c;
    this._el[11] = -1;

    this._el[12] = 0;
    this._el[13] = 0;
    this._el[14] = -(far * near * 2) / c;
    this._el[15] = 0;

    return this;
  }

  /**
   * 行列を転置する
   */
  public transpose() {
    const a = this._el[0],
      b = this._el[1],
      c = this._el[2],
      d = this._el[3],
      e = this._el[4],
      f = this._el[5],
      g = this._el[6],
      h = this._el[7],
      i = this._el[8],
      j = this._el[9],
      k = this._el[10],
      l = this._el[11],
      m = this._el[12],
      n = this._el[13],
      o = this._el[14],
      p = this._el[15];

    this._el[0] = a;
    this._el[1] = e;
    this._el[2] = i;
    this._el[3] = m;

    this._el[4] = b;
    this._el[5] = f;
    this._el[6] = j;
    this._el[7] = n;

    this._el[8] = c;
    this._el[9] = g;
    this._el[10] = k;
    this._el[11] = o;

    this._el[12] = d;
    this._el[13] = h;
    this._el[14] = l;
    this._el[15] = p;

    return this;
  }

  /**
   * 逆行列を生成する
   */
  public inverse() {
    const a = this._el[0],
      b = this._el[1],
      c = this._el[2],
      d = this._el[3],
      e = this._el[4],
      f = this._el[5],
      g = this._el[6],
      h = this._el[7],
      i = this._el[8],
      j = this._el[9],
      k = this._el[10],
      l = this._el[11],
      m = this._el[12],
      n = this._el[13],
      o = this._el[14],
      p = this._el[15];

    const q = a * f - b * e,
      r = a * g - c * e,
      s = a * h - d * e,
      t = b * g - c * f,
      u = b * h - d * f,
      v = c * h - d * g,
      w = i * n - j * m,
      x = i * o - k * m,
      y = i * p - l * m,
      z = j * o - k * n,
      A = j * p - l * n,
      B = k * p - l * o,
      ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);

    this._el[0] = (f * B - g * A + h * z) * ivd;
    this._el[1] = (-b * B + c * A - d * z) * ivd;
    this._el[2] = (n * v - o * u + p * t) * ivd;
    this._el[3] = (-j * v + k * u - l * t) * ivd;

    this._el[4] = (-e * B + g * y - h * x) * ivd;
    this._el[5] = (a * B - c * y + d * x) * ivd;
    this._el[6] = (-m * v + o * s - p * r) * ivd;
    this._el[7] = (i * v - k * s + l * r) * ivd;

    this._el[8] = (e * A - f * y + h * w) * ivd;
    this._el[9] = (-a * A + b * y - d * w) * ivd;
    this._el[10] = (m * u - n * s + p * q) * ivd;
    this._el[11] = (-i * u + j * s - l * q) * ivd;

    this._el[12] = (-e * z + f * x - g * w) * ivd;
    this._el[13] = (a * z - b * x + c * w) * ivd;
    this._el[14] = (-m * t + n * r - o * q) * ivd;
    this._el[15] = (i * t - j * r + k * q) * ivd;

    return this;
  }

  /**
   * 複製する
   */
  public clone() {
    const newMat = new Matrix4();
    const a = this._el[0],
      b = this._el[1],
      c = this._el[2],
      d = this._el[3],
      e = this._el[4],
      f = this._el[5],
      g = this._el[6],
      h = this._el[7],
      i = this._el[8],
      j = this._el[9],
      k = this._el[10],
      l = this._el[11],
      m = this._el[12],
      n = this._el[13],
      o = this._el[14],
      p = this._el[15];

    newMat.el[0] = a;
    newMat.el[1] = b;
    newMat.el[2] = c;
    newMat.el[3] = d;

    newMat.el[4] = e;
    newMat.el[5] = f;
    newMat.el[6] = g;
    newMat.el[7] = h;

    newMat.el[8] = i;
    newMat.el[9] = j;
    newMat.el[10] = k;
    newMat.el[11] = l;

    newMat.el[12] = m;
    newMat.el[13] = n;
    newMat.el[14] = o;
    newMat.el[15] = p;

    return newMat;
  }

  /**
   * 渡されたMatrix4の値を自分へコピーする
   */
  public copy(mat: Matrix4) {
    this._el[0] = mat.el[0];
    this._el[1] = mat.el[1];
    this._el[2] = mat.el[2];
    this._el[3] = mat.el[3];

    this._el[4] = mat.el[4];
    this._el[5] = mat.el[5];
    this._el[6] = mat.el[6];
    this._el[7] = mat.el[7];

    this._el[8] = mat.el[8];
    this._el[9] = mat.el[9];
    this._el[10] = mat.el[10];
    this._el[11] = mat.el[11];

    this._el[12] = mat.el[12];
    this._el[13] = mat.el[13];
    this._el[14] = mat.el[14];
    this._el[15] = mat.el[15];

    return this;
  }

  public compose(position: Vector3, quaternion: Quaternion, scale: Vector3) {
    const x = quaternion.x,
      y = quaternion.y,
      z = quaternion.z,
      w = quaternion.w;
    const x2 = x + x,
      y2 = y + y,
      z2 = z + z;
    const xx = x * x2,
      xy = x * y2,
      xz = x * z2;
    const yy = y * y2,
      yz = y * z2,
      zz = z * z2;
    const wx = w * x2,
      wy = w * y2,
      wz = w * z2;

    const sx = scale.x,
      sy = scale.y,
      sz = scale.z;

    this._el[0] = (1 - (yy + zz)) * sx;
    this._el[1] = (xy + wz) * sx;
    this._el[2] = (xz - wy) * sx;
    this._el[3] = 0;

    this._el[4] = (xy - wz) * sy;
    this._el[5] = (1 - (xx + zz)) * sy;
    this._el[6] = (yz + wx) * sy;
    this._el[7] = 0;

    this._el[8] = (xz + wy) * sz;
    this._el[9] = (yz - wx) * sz;
    this._el[10] = (1 - (xx + yy)) * sz;
    this._el[11] = 0;

    this._el[12] = position.x;
    this._el[13] = position.y;
    this._el[14] = position.z;
    this._el[15] = 1;

    return this;
  }

  public getInverse(mat: Matrix4) {
    const a = mat.el[0],
      b = mat.el[1],
      c = mat.el[2],
      d = mat.el[3],
      e = mat.el[4],
      f = mat.el[5],
      g = mat.el[6],
      h = mat.el[7],
      i = mat.el[8],
      j = mat.el[9],
      k = mat.el[10],
      l = mat.el[11],
      m = mat.el[12],
      n = mat.el[13],
      o = mat.el[14],
      p = mat.el[15],
      q = a * f - b * e,
      r = a * g - c * e,
      s = a * h - d * e,
      t = b * g - c * f,
      u = b * h - d * f,
      v = c * h - d * g,
      w = i * n - j * m,
      x = i * o - k * m,
      y = i * p - l * m,
      z = j * o - k * n,
      A = j * p - l * n,
      B = k * p - l * o,
      ivd = 1 / (q * B - r * A + s * z + t * y - u * x + v * w);
    this._el[0] = (f * B - g * A + h * z) * ivd;
    this._el[1] = (-b * B + c * A - d * z) * ivd;
    this._el[2] = (n * v - o * u + p * t) * ivd;
    this._el[3] = (-j * v + k * u - l * t) * ivd;
    this._el[4] = (-e * B + g * y - h * x) * ivd;
    this._el[5] = (a * B - c * y + d * x) * ivd;
    this._el[6] = (-m * v + o * s - p * r) * ivd;
    this._el[7] = (i * v - k * s + l * r) * ivd;
    this._el[8] = (e * A - f * y + h * w) * ivd;
    this._el[9] = (-a * A + b * y - d * w) * ivd;
    this._el[10] = (m * u - n * s + p * q) * ivd;
    this._el[11] = (-i * u + j * s - l * q) * ivd;
    this._el[12] = (-e * z + f * x - g * w) * ivd;
    this._el[13] = (a * z - b * x + c * w) * ivd;
    this._el[14] = (-m * t + n * r - o * q) * ivd;
    this._el[15] = (i * t - j * r + k * q) * ivd;

    return this;
  }
}

export default Matrix4;
