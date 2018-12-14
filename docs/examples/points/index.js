var main = function() {
  var count = 0;

  var wrapper = document.getElementById('wrapper');

  // レンダラー
  var renderer = new SHREE.Renderer({
    antialias: false,
  });
  renderer.pixelRatio = 1;
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  renderer.clearColor = [0.3, 0.3, 0.3, 1.0];
  wrapper.appendChild(renderer.domElement);

  // カメラ
  var camera = new SHREE.Camera();
  camera.position.z = 5;
  camera.position.y = 2;
  camera.rotation.x = -0.3;

  // シーン
  var scene = new SHREE.Scene();

  // グループ
  var group = new SHREE.Object3D();
  scene.add(group);

  // マテリアル
  var material = new SHREE.Material({
    vertexShader: document.getElementById('vs').text,
    fragmentShader: document.getElementById('fs').text,
  });

  // 八面体ジオメトリ
  var geometry1 = new SHREE.Geometry();
  geometry1.addAttribute('position', 3, [
     0.0,  1.5,  0.0,
     1.0,  0.0,  1.0,
     1.0,  0.0, -1.0,
    -1.0,  0.0, -1.0,
    -1.0,  0.0,  1.0,
     0.0, -1.5,  0.0,
  ]);
  geometry1.addAttribute('color', 4, [
    1.0, 0.0, 0.0, 1.0,
    0.0, 1.0, 0.0, 1.0,
    0.0, 0.0, 1.0, 1.0,
    1.0, 1.0, 0.0, 1.0,
    1.0, 0.0, 1.0, 1.0,
    0.0, 1.0, 1.0, 1.0,
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

  // 八面体ポイント
  var point = new SHREE.Points(geometry1, material);
  point.position.x = 2;
  group.add(point);

  // 八面体メッシュ
  var mesh = new SHREE.Mesh(geometry1, material);
  mesh.position.x = -2;
  group.add(mesh);

  // 描画を始める
  var render = function() {
    count += 0.5;
    var rad = (count % 360) * Math.PI / 180;
    point.rotation.x = -rad;
    point.rotation.y = -rad;
    mesh.rotation.x = -rad;
    mesh.rotation.y = -rad;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}
main();
