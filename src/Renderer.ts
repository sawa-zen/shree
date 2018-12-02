import Matrix4 from './Matrix4';
import Scene from './Scene';
import Mesh from './Mesh';
import Object3D from './Object3D';
import Camera from './Camera';
import {
  getContext,
  createProgram,
  createVbo,
  createTexture,
  enabledDepthTest,
  switchBlending,
  switchCulling,
  drawFace,
  clearColor
} from './utils';

interface AttributesInfo {
  [name: string]: {
    vbo: WebGLBuffer;
    attrLoc: GLint;
    stride: number;
  };
}

interface UniformsInfo {
  [name: string]: WebGLUniformLocation;
}

interface Texture {
  slot: number;
  image: HTMLImageElement;
  webglTexture: WebGLTexture;
}

interface RenderItem {
  obj: Mesh;
  program: WebGLProgram;
  attributes: AttributesInfo;
  uniforms: UniformsInfo;
}

class Renderer {
  private _gl: WebGLRenderingContext;
  private _renderList: RenderItem[] = [];
  private _pMatrix = new Matrix4();
  private _textures: Texture[] = [];

  private _domElement: HTMLCanvasElement = document.createElement('canvas');
  get domElement() {
    return this._domElement;
  }

  constructor() {
    // gl
    this._gl = getContext(this._domElement);
  }

  public setSize(w: number, h: number) {
    this._domElement!.width = w;
    this._domElement!.height = h;
    this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
    this._pMatrix.perspective(90, w / h, 0.1, 100);
  }

  public render(scene: Scene, camera: Camera) {
    // canvasをクリア
    clearColor(this._gl);

    scene.updateMatrixWorld();
    camera.updateMatrixWorld();

    if (scene.needsUpdate) {
      this._renderList = [];
      this._projectObject(scene);
      scene.needsUpdate = false;
    }

    // オブジェクトを描画する
    this._renderList.forEach(renderItem => {
      this._renderObj(renderItem, camera);
    });

    // コンテキストの再描画
    this._gl.flush();
  }

  private _projectObject(obj: Object3D | Mesh) {
    if (obj instanceof Mesh) {
      // プログラムオブジェクトの生成とリンク
      const program = createProgram(
        this._gl,
        obj.material.vertexShader,
        obj.material.fragmentShader
      );

      // アトリビュートを登録
      const attributes: AttributesInfo = {};
      Object.keys(obj.geometry.attributes).forEach(name => {
        const attribute = obj.geometry.attributes[name];
        const attributeInfo = {
          vbo: createVbo(this._gl, attribute.verticies),
          attrLoc: this._gl.getAttribLocation(program, name),
          stride: attribute.stride
        };
        attributes[name] = attributeInfo;
      });

      // ユニフォームを登録
      const uniforms: UniformsInfo = {};
      Object.keys(obj.material.uniforms).forEach(name => {
        const originUniform = obj.material.uniforms[name];
        uniforms[name] = this._gl.getUniformLocation(program, name)!;

        // uniformでtのタイプのときはテクスチャを登録する
        if (originUniform.type === 't') {
          const slot = this._gl.TEXTURE0;
          const image: HTMLImageElement = originUniform.value!;
          const webglTexture = createTexture(this._gl, image, slot);
          this._textures.push({ slot, image, webglTexture });
        }
      });

      const renderItem: RenderItem = {
        obj,
        program,
        attributes,
        uniforms
      };

      this._renderList.push(renderItem);
    }

    obj.children.forEach(child => {
      this._projectObject(child);
    });
  }

  private _renderObj(renderItem: RenderItem, camera: Camera) {
    const obj = renderItem.obj;
    const prg = renderItem.program;
    const attributes = renderItem.attributes;
    const uniforms = renderItem.uniforms;
    const geometry = obj.geometry;
    const material = obj.material;

    obj.modelViewMatrix.multiplyMatrices(
      camera.matrixWorldInverse,
      obj.matrixWorld
    );

    Object.keys(attributes).forEach(name => {
      const attribute = attributes[name];
      // アトリビュートを許可
      this._gl.bindBuffer(this._gl.ARRAY_BUFFER, attribute.vbo);
      this._gl.enableVertexAttribArray(attribute.attrLoc);
      this._gl.vertexAttribPointer(
        attribute.attrLoc,
        attribute.stride,
        this._gl.FLOAT,
        false,
        0,
        0
      );
      // バッファを開放
      this._gl.bindBuffer(this._gl.ARRAY_BUFFER, null);
    });

    // 使用するプログラムを指定
    this._gl.useProgram(prg);

    // uniformの値を反映
    material.uniforms.mMatrix.value = obj.matrix;
    material.uniforms.vMatrix.value = camera.matrixWorldInverse;
    material.uniforms.pMatrix.value = this._pMatrix;
    material.uniforms.mvMatrix.value = obj.modelViewMatrix;
    Object.keys(uniforms).forEach(name => {
      const uniformLoc = uniforms[name];
      const uniform = material.uniforms[name];
      switch (uniform.type) {
        case 'v4':
          this._gl.uniformMatrix4fv(uniformLoc, false, uniform.value.el);
          break;
        case 't':
          const texture = this._textures.find(t => {
            return t.image.src === uniform.value.src;
          });
          if (texture) {
            this._gl.activeTexture(this._gl.TEXTURE0);
            this._gl.bindTexture(this._gl.TEXTURE_2D, texture.webglTexture);
            this._gl.uniform1i(uniformLoc, 0);
          }
          break;
      }
    });

    // 深度テストを有効
    enabledDepthTest(this._gl);

    // ブレンディングを切り替え
    switchBlending(this._gl, material.transparent);

    // カリングを切り替える
    switchCulling(this._gl, material.side);

    // 面を描画
    drawFace(this._gl, geometry.index);
  }
}

export default Renderer;
