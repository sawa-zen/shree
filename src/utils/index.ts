export enum Side {
  FRONT = 'SIDE_FRONT',
  BACK = 'SIDE_BACK',
  DOUBLE = 'DOUBLE'
}

export const getContext = (
  canvas: HTMLCanvasElement,
  attributes: WebGLContextAttributes = {}
): WebGLRenderingContext => {
  const gl: WebGLRenderingContext =
    canvas.getContext('webgl', attributes)! ||
    canvas.getContext('experimental-webgl', attributes)!;

  return gl;
};

export const createShader = (
  gl: WebGLRenderingContext,
  shaderSource: string,
  shaderType: number
) => {
  // scriptタグのtype属性をチェック
  const shader = gl.createShader(shaderType)!;

  // 生成されたシェーダにソースを割り当てる
  gl.shaderSource(shader, shaderSource);

  // シェーダをコンパイルする
  gl.compileShader(shader);

  // シェーダが正しくコンパイルされたかチェック
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (!success) {
    // コンパイル中に問題があった場合、エラーを取得する。
    throw new Error(`could not compile shader:${gl.getShaderInfoLog(shader)}`);
  }

  return shader;
};

export const createProgram = (
  gl: WebGLRenderingContext,
  vertexSource: string,
  fragmentSource: string
) => {
  const vertexShader = createShader(gl, vertexSource, gl.VERTEX_SHADER);
  const fragmentShader = createShader(gl, fragmentSource, gl.FRAGMENT_SHADER);

  // プログラムを生成する。
  const program = gl.createProgram()!;

  // シェーダーをアタッチする。
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);

  // プログラムをリンクする。
  gl.linkProgram(program);

  // リンクが成功したか確認する。
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) {
    // 成功していたらプログラムオブジェクトを有効にする
    gl.useProgram(program);
  } else {
    // リンク中に問題があった場合、エラーを取得する。
    throw new Error(`program filed to link:${gl.getProgramInfoLog(program)}`);
  }

  return program;
};

/**
 * VBOを生成する
 */
export const createVbo = (
  gl: WebGLRenderingContext,
  verticies: number[]
): WebGLBuffer => {
  // バッファオブジェクトの生成
  const vbo: WebGLBuffer = gl.createBuffer()!;

  // バッファをバインドする
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);

  // バッファにデータをセット
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(verticies), gl.STATIC_DRAW);

  // バッファのバインドを無効化
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
};

/**
 * IBOを生成する
 */
export const createIbo = (
  gl: WebGLRenderingContext,
  index: number[]
): WebGLBuffer => {
  // バッファオブジェクトの生成
  const ibo = gl.createBuffer()!;

  // バッファをバインドする
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);

  // バッファにデータをセット
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Int16Array(index), gl.STATIC_DRAW);

  // バッファのバインドを無効化
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  return ibo;
};

/**
 * テクスチャを作成する
 */
export const createTexture = (
  gl: WebGLRenderingContext,
  image: HTMLImageElement,
  textureNumber: number
): WebGLTexture => {
  // テクスチャオブジェクトの生成
  const tex = gl.createTexture()!;
  // 有効にするテクスチャユニットを指定
  gl.activeTexture(textureNumber);
  // テクスチャをバインドする
  gl.bindTexture(gl.TEXTURE_2D, tex);
  // テクスチャへイメージを適用
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  // ミップマップを生成
  gl.generateMipmap(gl.TEXTURE_2D);
  // テクスチャのバインドを無効化
  gl.bindTexture(gl.TEXTURE_2D, null);

  return tex;
};

/**
 * 深度テストを有効にする
 */
export const enabledDepthTest = (gl: WebGLRenderingContext) => {
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
};

/**
 * カリングの切り替え
 */
export const switchCulling = (gl: WebGLRenderingContext, side: Side) => {
  switch (side) {
    case Side.DOUBLE:
      gl.disable(gl.CULL_FACE);
      break;
    case Side.BACK:
      gl.enable(gl.CULL_FACE);
      gl.frontFace(gl.CW);
      break;
    case Side.FRONT:
    default:
      gl.enable(gl.CULL_FACE);
      gl.frontFace(gl.CCW);
      break;
  }
};

/**
 * ブレンディングの切り替え
 */
export const switchBlending = (
  gl: WebGLRenderingContext,
  transparent: boolean
) => {
  if (transparent) {
    // ブレンディングを有効
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  } else {
    gl.disable(gl.BLEND);
  }
};

/**
 * 面を描画
 */
export const drawFace = (gl: WebGLRenderingContext, index: number[]) => {
  const ibo = createIbo(gl, index);
  // IBOをバインドして登録する
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibo);
  // モデルの描画
  gl.drawElements(gl.TRIANGLES, index.length, gl.UNSIGNED_SHORT, 0);
};

/**
 * ポイントを描画
 */
export const drawPoint = (gl: WebGLRenderingContext, verticies: number[]) => {
  gl.drawArrays(gl.POINTS, 0, verticies.length / 3);
};

/**
 * 描画をクリア
 */
export const clearColor = (
  gl: WebGLRenderingContext,
  color = [0.0, 0.0, 0.0, 1.0],
  depth = 1.0
) => {
  // canvasを単色でクリア(初期化)
  gl.clearColor(color[0], color[1], color[2], color[3]);
  // canvasを初期化する際の深度を設定する
  gl.clearDepth(depth);
  // canvasを初期化
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
};

/**
 * ユニークな文字列を作成
 */
export const getUniqueStr = (strong: number = 1000): string => {
  return (
    new Date().getTime().toString(16) +
    Math.floor(strong * Math.random()).toString(16)
  );
};
