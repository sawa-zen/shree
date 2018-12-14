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
