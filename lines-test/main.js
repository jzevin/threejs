import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { randFloat } from 'three/src/math/MathUtils';
// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

let isPaused = false;

class Building {
  constructor(x, y, z, width, height, depth, color) {
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.geometry = new THREE.BoxGeometry(this.width, this.height, this.depth);
    this.material = new THREE.MeshLambertMaterial({ color: this.color });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.set(this.x, this.height / 2, this.z);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;
    this.upY = randFloat(0.005, 0.5);
    this.isReady = true;
  }
  move() {
    if (this.isReady) {
      this.mesh.position.y += this.upY;
      if (this.mesh.position.y > 20) {
        this.upY = this.upY * -1;
      }
    } else {
      if (randFloat(0, 1) > 0.999) {
        this.isReady = true;
      }
    }
    // this.mesh.position.x += getRandomReal(-0.01, 0.01);
    // this.mesh.position.z += getRandomReal(-0.01, 0.01);
    if (this.mesh.position.y < this.height * 0.5) {
      this.mesh.position.y = this.height * 0.5;
      this.isReady = false;
      this.upY = this.upY * -1;
    }
  }
}

function initControls(camera, renderer) {
  return new OrbitControls(camera, renderer.domElement);
}

function initRenderer() {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
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
  camera.position.set(0, 15, -2);
  // camera.rotation.set(3, 1, 0);
  return camera;
}

function initScene() {
  const scene = new THREE.Scene();
  return scene;
}

function initLights() {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  const directionalLight = new THREE.PointLight(0xffdddd, 1);
  directionalLight.castShadow = true;
  directionalLight.position.set(10, 10, 10);

  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  // directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.blurSamples = 16;
  return [ambientLight, directionalLight];
}

function addGround(groundSize = 10) {
  const geometry = new THREE.PlaneGeometry(groundSize, groundSize, 1, 1);
  const material = new THREE.MeshPhongMaterial({
    color: 0x333333,
    // side: THREE.DoubleSide,
    // wireframe: true,
  });
  const ground = new THREE.Mesh(geometry, material);
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  return ground;
}

function addBuildings(amount = 10) {
  const buildings = [];
  for (let i = 0; i < amount; i++) {
    const building = new Building(
      randFloat(-4.0, 4.0),
      0,
      randFloat(-4.0, 4.0),
      randFloat(0.05, 0.15),
      randFloat(0.05, 5.75),
      randFloat(0.05, 0.15),
      new THREE.Color().setHSL(randFloat(0.0, 1.0), 0.9, 0.5)
    );
    buildings.push(building);
  }
  return buildings;
}

function getConnectingLines(buildings) {
  const points = [];
  for (let i = 0; i < buildings.length; i++) {
    const building = buildings[i];
    points.push(building.mesh.position);
  }
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color: 0xc927c5 })
  );
}

function updateLines() {
  const positions = lines.geometry.attributes.position.array;
  for (let i = 0; i < positions.length / 3; i++) {
    const bPosy = buildings[i].mesh.position.y;
    positions[i * 3 + 1] = bPosy;
  }
  lines.geometry.attributes.position.needsUpdate = true;
}

function initHTML() {
  document.body.style.margin = 0;
  document.body.style.backgroundColor = '#333';
}

function render() {
  renderer.render(scene, camera);
}

function loop() {
  requestAnimationFrame(loop);
  controls.update();
  if (!isPaused) {
    for (let i = 0; i < buildings.length; i++) {
      const building = buildings[i];
      building.move();
    }
    scene.rotation.set(0, scene.rotation.y + 0.00125, 0);
  }
  updateLines();
  render();
}

const renderer = initRenderer(),
  camera = initCamera(),
  controls = initControls(camera, renderer),
  scene = initScene(),
  lights = initLights(),
  ground = addGround(240),
  gridHelper = new THREE.GridHelper(100, 100),
  buildings = addBuildings(90),
  lines = getConnectingLines(buildings);

initHTML();
scene.add(
  ...lights,
  ground,
  gridHelper,
  ...buildings.map((cube) => cube.mesh),
  lines
);
loop();
console.log(buildings[0]);
gridHelper.visible = false;
// scene.add(new THREE.CameraHelper(lights[1].shadow.camera));
// controls.addEventListener('change', (event) => {
//   console.log(controls.object.position);
//   console.log(lights[1].shadow);
// });

renderer.domElement.addEventListener('click', (event) => {
  isPaused = !isPaused;
});

console.log(lines);
