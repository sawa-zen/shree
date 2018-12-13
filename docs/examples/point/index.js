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

  // 八面体メッシュ
  var octahedral = new SHREE.Point(geometry1, material);
  group.add(octahedral);

  // 描画を始める
  var render = function() {
    count += 0.5;
    var rad = (count % 360) * Math.PI / 180;
    octahedral.rotation.y = -rad * 8;
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
}
main();
