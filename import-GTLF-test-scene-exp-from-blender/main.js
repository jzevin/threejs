import './style.css';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function initControls(camera, renderer) {
  return new OrbitControls(camera, renderer.domElement);
}

function initRenderer(fullscreen = true) {
  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    physicallyCorrectLights: true,
  });
  renderer.shadowMap.enabled = true;
  // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  if (fullscreen) renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  return renderer;
}

function initCamera() {
  const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    100
  );
  camera.lookAt(0, 0, 0);
  camera.position.set(-1, 2, 5);
  camera.rotation.set(-0.2, -0.2, 0);
  return camera;
}

function render() {
  renderer.render(scene, camera);
}

function createCube(size = 1) {
  console.log('createCube');
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshBasicMaterial({ color: 0xaaffff });
  const cube = new THREE.Mesh(geometry, material);
  return cube;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

const renderer = initRenderer(),
  camera = initCamera(),
  scene = new THREE.Scene(),
  controls = initControls(camera, renderer),
  loader = new GLTFLoader(),
  ambientLight = new THREE.AmbientLight(0xcccccc, 0.01),
  pointLights = [
    new THREE.PointLight(0xffaa33, 0.95),
    new THREE.PointLight(0x3333ff, 0.75),
    new THREE.PointLight(0xffaa33, 0.25),
  ];

pointLights[0].position.set(15, 5, -5);
pointLights[1].position.set(-15, 10, 5);
pointLights[2].position.set(-5, 10, 5);
pointLights.forEach((light) => (light.castShadow = true));
scene.add(ambientLight, ...pointLights);
// scene.background = new THREE.Color(0x111123);

loader.load(
  './test-no-lights-001.gltf',
  (gltf) => {
    gltf.scene.children[1].receiveShadow = true;
    gltf.scene.children[0].castShadow = true;
    gltf.scene.children[2].castShadow = true;

    for (let i = 0; i < 50; i++) {
      const clone = gltf.scene.children[0].clone();
      clone.position.set(
        Math.random() * 20 - 10,
        0.25,
        Math.random() * 20 - 10
      );
      clone.rotation.set(0, Math.random() * Math.PI, 0);
      scene.add(clone);
    }
    scene.add(gltf.scene);

    console.log('done', gltf);

    render();
  },
  (gltf) => {
    console.log('loading...');
  },
  undefined
);

render();

animate();
