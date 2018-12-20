var main = function() {
  var count = 0;

  var wrapper = document.getElementById('background');

  // レンダラー
  var renderer = new SHREE.Renderer({ antialias: true });
  renderer.pixelRatio = 1;
  renderer.clearColor = [1.0, 1.0, 1.0, 1.0];
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  wrapper.appendChild(renderer.domElement);

  // カメラ
  var camera = new SHREE.Camera();
  camera.position.y = 10;
  camera.position.z = 40;
  camera.rotation.x = -1;

  // シーン
  var scene = new SHREE.Scene();

  var material = new SHREE.Material({
    vertexShader: document.getElementById('vs').text,
    fragmentShader: document.getElementById('fs').text,
    uniforms: {
      time: {
        type: 'f',
        value: 0,
      }
    },
    transparent: true
  });

  var geometry = new SHREE.Geometry();
  var position = [];
  var seed = [];
  var absolute = 90;
  for (var z = -absolute; z < absolute; z++) {
    for (var x = -absolute; x < absolute; x++) {
      position.push(x); // x
      position.push(0); // y
      position.push(z); // z
      seed.push(z + x);
    }
  }
  geometry.addAttribute('position', 3, position);
  geometry.addAttribute('seed', 1, seed);

  var points = new SHREE.Points(geometry, material);
  scene.add(points);

  // 描画を始める
  var render = function() {
    points.rotation.y += 0.003;
    material.uniforms.time.value += 0.5;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}
main();
