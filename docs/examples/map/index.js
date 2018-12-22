var img = new Image();
img.onload = function(event) {
  main();
}
img.src = './uv_checker.png';

var main = function() {
  var count = 0;

  var wrapper = document.getElementById('wrapper');

  // レンダラー
  var renderer = new SHREE.Renderer({
    antialias: false,
  });
  renderer.pixelRatio = 1 / 2;
  renderer.setSize(wrapper.clientWidth, wrapper.clientHeight);
  renderer.clearColor = [0.3, 0.3, 0.3, 1.0];
  wrapper.appendChild(renderer.domElement);

  // カメラ
  var camera = new SHREE.Camera();

  // シーン
  var scene = new SHREE.Scene();

  // グループ
  var group = new SHREE.Object3D();
  scene.add(group);

  // マテリアル
  var material = new SHREE.Material({
    vertexShader: document.getElementById('vs').text,
    fragmentShader: document.getElementById('fs').text,
    uniforms: { texture: { type: 't', value: img } }
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
  geometry1.addAttribute('textureCoord', 2, [
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

  // 八面体メッシュ
  var octahedral = new SHREE.Mesh(geometry1, material);
  group.add(octahedral);

  // パネルジオメトリ
  var geometry2 = new SHREE.Geometry();
  geometry2.addAttribute('position', 3, [
     -25.0, -1.5, -25.0,
      25.0, -1.5, -25.0,
     -25.0, -1.5,  25.0,
      25.0, -1.5,  25.0,
  ]);
  geometry2.addAttribute('textureCoord', 2, [
    0.0, 0.0,
    1.0, 0.0,
    0.0, 1.0,
    1.0, 1.0,
  ]);
  geometry2.index = [
    2, 1, 0,
    3, 1, 2,
  ];

  // パネルメッシュ
  var panel = new SHREE.Mesh(geometry2, material);
  group.add(panel);

  // 描画を始める
  var render = function() {
    count++;
    var rad = (count % 360) * Math.PI / 180;
    var rad2 = (count / 2 % 360) * Math.PI / 180;
    octahedral.rotation.y = -rad * 4;
    octahedral.position.x = Math.sin(rad) * 5;
    octahedral.position.z = Math.cos(rad) * 5;
    camera.rotation.y = -rad2;

    if (count % 2) {
      renderer.render(scene, camera);
    }
    requestAnimationFrame(render);
  }
  render();
}
