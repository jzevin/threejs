import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import bactImg from './sprites/bact.png';
import circ1Img from './sprites/Circ001.png';

const { randFloat, randInt } = THREE.MathUtils;

function initRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setClearColor(0xb00a76, 1);
  document.body.append(renderer.domElement);
  return renderer;
}

function initCamera() {
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 10, 0);
  return camera;
}

function initScene() {
  const scene = new THREE.Scene();
  return scene;
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  // walkers.forEach((w) => w.update());
  circles.forEach((c) => {
    c.position.z += randFloat(-0.025, 0.025);
  });
  bacts.forEach((b) => {
    b.position.z += randFloat(-0.025, 0.025);
  });
  render();
}

const renderer = initRenderer(),
  camera = initCamera(),
  scene = initScene(),
  controls = new OrbitControls(camera, renderer.domElement),
  ambientLight = new THREE.AmbientLight(0xffffff, 0.25),
  point1 = new THREE.PointLight(0xaa3300, 2);

point1.position.set(10, 20, 5);

scene.add(ambientLight, point1);

const maps = {
  circ1: new THREE.TextureLoader().load(circ1Img),
  bact: new THREE.TextureLoader().load(bactImg),
};

const spriteMats = {
  circ1: new THREE.SpriteMaterial({ map: maps.circ1 }),
  bact: new THREE.SpriteMaterial({ map: maps.bact }),
};
const circles = [];
for (let i = 0; i < 200; i++) {
  const c = new THREE.Sprite(spriteMats.circ1);
  c.position.set(randFloat(-10, 10), randFloat(-1, 1), randFloat(-10, 10));
  const scale = randFloat(0.5, 4.0);
  c.scale.set(scale, scale, scale);
  circles.push(c);
}
scene.add(...circles);

const gridHelper = new THREE.GridHelper(10, 10);
scene.add(gridHelper);

const bacts = [];
for (let i = 0; i < 50; i++) {
  const b = new THREE.Sprite(spriteMats.bact);
  b.position.set(randFloat(-10, 10), randFloat(0, 2), randFloat(-10, 10));
  const scale = randFloat(0.5, 4.0);
  b.scale.set(scale, scale, scale);
  bacts.push(b);
}
scene.add(...bacts);

animate();
