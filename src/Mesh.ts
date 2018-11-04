import Object3D from './Object3D';
import Geometry from './Geometry';
import Material from './Material';

/**
 * Mesh
 */
class Mesh extends Object3D {
  _type = 'Mesh';

  _geometry: Geometry;
  get geometry() {
    return this._geometry;
  }

  _material: Material;
  get material() {
    return this._material;
  }

  constructor(geometry: Geometry, material: Material) {
    super();

    this._geometry = geometry;
    this._material = material;
  }
}

export default Mesh;
