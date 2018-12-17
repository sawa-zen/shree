import Matrix4 from './Matrix4';
import { Side } from './utils';

interface V4Uniform {
  type: 'v4';
  value: Matrix4;
}

interface TUniform {
  type: 't';
  value: HTMLImageElement;
}

interface Uniforms {
  [name: string]: V4Uniform | TUniform;
}

enum Blending {
  NO = 'BLENDING_NO'
}

interface Props {
  uniforms?: Uniforms;
  vertexShader: string;
  fragmentShader: string;
  transparent?: boolean;
  side: Side;
  blending: Blending;
}

class Material {
  private _uniforms: Uniforms = {
    mMatrix: {
      type: 'v4',
      value: new Matrix4()
    },
    vMatrix: {
      type: 'v4',
      value: new Matrix4()
    },
    pMatrix: {
      type: 'v4',
      value: new Matrix4()
    },
    mvMatrix: {
      type: 'v4',
      value: new Matrix4()
    }
  };
  get uniforms() {
    return this._uniforms;
  }

  private _vertexShader: string;
  get vertexShader() {
    return this._vertexShader;
  }

  private _fragmentShader: string;
  get fragmentShader() {
    return this._fragmentShader;
  }

  private _transparent: boolean = false;
  get transparent() {
    return this._transparent;
  }

  private _side: Side = Side.FRONT;
  get side() {
    return this._side;
  }

  private _blending: Blending = Blending.NO;
  get blending() {
    return this._blending;
  }

  constructor(props: Props) {
    this._uniforms = {
      ...this._uniforms,
      ...props.uniforms
    };
    this._vertexShader = props.vertexShader;
    this._fragmentShader = props.fragmentShader;
    this._transparent = props.transparent || false;
    this._side = props.side || this._side;
    this._blending = props.blending || 'BLENDING_NO';
  }
}

export default Material;
