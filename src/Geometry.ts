interface Attribute {
  stride: number;
  verticies: number[];
}

interface Attributes {
  [name: string]: Attribute;
}

class Geometry {
  _attributes: Attributes = {};
  get attributes() {
    return this._attributes;
  }

  _index: number[] = [];
  get index() {
    return this._index;
  }
  set index(index: number[]) {
    this._index = index;
  }

  addAttribute(name: string, stride: number, verticies: number[]) {
    this._attributes[name] = { stride, verticies };
  }
}

export default Geometry;
