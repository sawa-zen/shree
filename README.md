# Shree.js

[![CircleCI](https://circleci.com/gh/sawa-zen/shree/tree/master.svg?style=svg)](https://circleci.com/gh/sawa-zen/shree/tree/master)

lite three.js

[docs](https://sawa-zen.github.io/shree/)

## Install

```
$ npm install --save shree
```

or

```html
<script src="https://unpkg.com/shree/dist/shree.js"></script>
```

## Usage

<img src="https://sawa-zen.github.io/shree/images/thumbnail_basic.png" width="300" />

```c
// vertex shader

attribute vec3 position;
attribute vec4 color;
uniform mat4 pMatrix;
uniform mat4 mvMatrix;
varying vec4 vColor;

void main(void){
  vColor = color;
  gl_Position = pMatrix * mvMatrix * vec4(position, 1.0);
}
```

```c
// fragment shader

precision mediump float;
varying vec4 vColor;

void main(void){
  gl_FragColor = vColor;
}
```

```javascript
// sample.js

var wrapper = document.getElementById('wrapper');

var renderer = new SHREE.Renderer();
renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
wrapper.appendChild(renderer.domElement);

var camera = new SHREE.Camera();
camera.position.z = 2;

var scene = new SHREE.Scene();

var material = new SHREE.Material({
  vertexShader: document.getElementById('vs').text,
  fragmentShader: document.getElementById('fs').text,
});

var geometry = new SHREE.Geometry();
geometry.addAttribute('position', 3, [
   0.0,  0.5,  0.0,
  -1.0, -0.5,  0.0,
   1.0, -0.5,  0.0,
]);
geometry.addAttribute('color', 4, [
  1.0, 0.0, 0.0, 1.0,
  0.0, 1.0, 0.0, 1.0,
  0.0, 0.0, 1.0, 1.0,
]);
geometry.index = [0, 1, 2];

var mesh = new SHREE.Mesh(geometry, material);
scene.add(mesh);

renderer.render(scene, camera);
```

## Licence

[MIT](https://github.com/sawa-zen/shree/blob/master/LICENSE)

## Author

[sawa-zen](https://github.com/sawa-zen)
