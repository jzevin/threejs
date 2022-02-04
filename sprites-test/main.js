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
    30
  );
  camera.lookAt(0, 0, 0);
  camera.position.set(0, 10, 0);
  return camera;
}

function initScene() {
  const scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xb00a76, 0.1, 25);
  return scene;
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  for (let i = 0; i < circles.length; i++) {
    const c = circles[i],
      b = bacts[i];
    // c.position.z += randFloat(-0.025, 0.025);
    c.position.y -= 0.05;
    if (c.position.y < -15) c.position.y = randInt(10, 30);
    if (b) {
      //b.position.z += randFloat(-0.025, 0.025);
      b.position.y -= 0.05;
      if (b.position.y < -15) b.position.y = randInt(10, 20);
    }
  }
  scene.rotation.y += 0.003;
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
  c.position.set(randFloat(-10, 10), randFloat(-5, 5), randFloat(-10, 10));
  const scale = randFloat(0.5, 4.0);
  c.scale.set(scale, scale, scale);
  circles.push(c);
}
scene.add(...circles);

// const gridHelper = new THREE.GridHelper(10, 10);
// scene.add(gridHelper);

const bacts = [];
for (let i = 0; i < 150; i++) {
  const b = new THREE.Sprite(spriteMats.bact);
  b.position.set(randFloat(-10, 10), randFloat(8, 30), randFloat(-10, 10));
  const scale = randFloat(0.5, 4.0);
  b.scale.set(scale, scale, scale);
  bacts.push(b);
}
scene.add(...bacts);

animate();
