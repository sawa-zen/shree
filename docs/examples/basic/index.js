var img = new Image();
img.onload = function(event) {
  main();
}
img.src = './uv_checker.png';

var main = function() {
  var wrapper = document.getElementById('wrapper');
  var renderer = new SHREE.Renderer({
    antialias: false,
  });
  renderer.pixelRatio = 1 / 2;
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  renderer.clearColor = [0.3, 0.3, 0.3, 1.0];
  wrapper.appendChild(renderer.domElement);

  var scene = new SHREE.Scene();

  var group = new SHREE.Object3D();
  scene.add(group);

  var geometry1 = new SHREE.Geometry();
  geometry1.addAttribute('position', 3, [
     0.0,  1.5,  0.0,
     1.0,  0.0,  1.0,
     1.0,  0.0, -1.0,
    -1.0,  0.0, -1.0,
    -1.0,  0.0,  1.0,
     0.0, -1.5,  0.0,
  ]);
  geometry1.addAttribute('textureCode', 2, [
    1.0, 0.0,
    0.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
    0.0, 1.0,
    1.0, 0.0,
  ]);
  geometry1.index = [
    0, 1, 2,
    0, 2, 3,
    0, 3, 4,
    0, 4, 1,
    5, 2, 1,
    5, 3, 2,
    5, 4, 3,
    5, 1, 4,
  ];

  var material1 = new SHREE.Material({
    vertexShader: document.getElementById('vs').text,
    fragmentShader: document.getElementById('fs').text,
    uniforms: {
      texture: { type: 't', value: img }
    }
  });
  var octahedral = new SHREE.Mesh(geometry1, material1);
  group.add(octahedral);

  var geometry2 = new SHREE.Geometry();
  geometry2.addAttribute('position', 3, [
     -25.0, -1.5, -25.0,
      25.0, -1.5, -25.0,
     -25.0, -1.5,  25.0,
      25.0, -1.5,  25.0,
  ]);
  geometry2.addAttribute('textureCode', 2, [
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
  ]);
  geometry2.index = [
    2, 1, 0,
    3, 1, 2,
  ];
  var material2 = new SHREE.Material({
    vertexShader: document.getElementById('vs').text,
    fragmentShader: document.getElementById('fs').text,
    uniforms: {
      texture: { type: 't', value: img }
    }
  });
  var panel = new SHREE.Mesh(geometry2, material2);
  group.add(panel);

  var camera = new SHREE.Camera();

  var count = 0;
  var render = function() {
    count += 0.5;
    var rad = (count % 360) * Math.PI / 180;
    octahedral.rotation.y = -rad * 8;
    octahedral.position.x = Math.sin(rad * 2) * 5;
    octahedral.position.z = Math.cos(rad * 2) * 5;
    camera.rotation.y = -rad;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();
}
