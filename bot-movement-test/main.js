import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let bot;

function initControls(camera, renderer) {
  return new OrbitControls(camera, renderer.domElement);
}

function initRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    physicallyCorrectLights: true,
  });

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0x000000, 1);

  document.body.append(renderer.domElement);
  return renderer;
}

function initCamera() {
  const camera = new THREE.PerspectiveCamera(
    36,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.lookAt(0, 0, 0);
  camera.position.set(5, 15, 15);
  return camera;
}

function initScene() {
  const scene = new THREE.Scene();
  return scene;
}

function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5),
    pointLight1 = new THREE.PointLight(0xffffff, 2.0),
    pointLight2 = new THREE.PointLight(0xffffff, 2.0),
    pointLight3 = new THREE.PointLight(0xffffff, 2.0);
  pointLight1.position.set(10, 10, -20);
  pointLight1.position.set(-20, 10, 0);
  pointLight3.position.set(10, 10, 20);
  pointLight1.castShadow = true;
  // pointLight1.shadow.camera.left = -10;
  // pointLight1.shadow.camera.right = 10;
  // pointLight1.shadow.camera.top = 10;
  // pointLight1.shadow.camera.bottom = -10;
  // pointLight1.shadow.camera.near = 10;
  // pointLight1.shadow.camera.far = 400;
  // pointLight1.shadow.mapSize.width = 1024;
  // pointLight1.shadow.mapSize.height = 1024;
  // pointLight2.castShadow = true;
  // pointLight3.castShadow = true;
  return [ambientLight, pointLight1, pointLight2, pointLight3];
}

function render() {
  controls.update();
  renderer.render(scene, camera);
}

function createCubes(numCubes, sizeFunc) {
  console.log('createCubes');
  const cubes = [];
  for (let i = 0; i < numCubes; i++) {
    const size = sizeFunc();
    const geometry = new THREE.BoxGeometry(size, size, size);
    const material = new THREE.MeshStandardMaterial({ color: 0x222222 });
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
      Math.random() * 20 - 10,
      size / 2, // Math.random() * 10 - 5,
      Math.random() * 20 - 10
    );
    cube.castShadow = true;
    cubes.push(cube);
  }
  return cubes;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  moveEm();
  render();
}

function moveEm() {
  for (let i = 0; i < cubes.length; i++) {
    const cube = cubes[i],
      newX = Math.random() * 0.02 - 0.01,
      newZ = Math.random() * 0.02 - 0.01;
    cube.position.set(
      cube.position.x + newX,
      cube.position.y,
      cube.position.z + newZ
    );
  }
}

const renderer = initRenderer(),
  camera = initCamera(),
  scene = initScene(),
  [ambientLight, pointLight1, pointLight2, pointLight3] = initLights(),
  loader = new GLTFLoader(),
  controls = initControls(camera, renderer),
  cubes = createCubes(100, () => Math.random() * 2.5 + 0.025);

loader.load('./bot-n-grnd-test-001.gltf', (gltf) => {
  console.log(gltf.scene);
  bot = gltf.scene.children[0];
  gltf.scene.children[0].children.forEach((child) => (child.castShadow = true));
  gltf.scene.children[1].receiveShadow = true;
  gltf.scene.children[0].position.set(0, 0.2, 0);
  scene.castShadow = true;
  scene.add(gltf.scene);
  scene.add(ambientLight, pointLight1, pointLight2, pointLight3, ...cubes);
  animate();
});

var xSpeed = 0.5;
var ySpeed = 0.75;

document.addEventListener('keydown', onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
  console.log(event.which);
  var keyCode = event.which;
  if (keyCode == 38) {
    bot.position.y += ySpeed;
  } else if (keyCode == 40) {
    bot.position.y -= ySpeed;
    if (bot.position.y < 0.2) {
      bot.position.y = 0.2;
    }
  } else if (keyCode == 37) {
    bot.position.x -= xSpeed;
  } else if (keyCode == 39) {
    bot.position.x += xSpeed;
  } else if (keyCode == 32) {
    bot.position.set(0, 0.2, 0);
  }
}
