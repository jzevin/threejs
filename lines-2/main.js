import './style.css';
import * as THREE from 'https://cdn.skypack.dev/three';
let rate = 0.0005,
  cMat;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  1,
  10000
);
camera.lookAt(0, 0, 0);

const scene = new THREE.Scene();

//create a blue LineBasicMaterial
const material = new THREE.LineBasicMaterial({
  color: Math.random() * 0xffffff,
  linewidth: 0.1,
});

const points = [],
  numPoints = 2500;

for (let i = 0; i < numPoints; i++) {
  const fii = i - numPoints / 2;
  const pos = {
    x: Math.random() * fii,
    y: Math.random() * fii,
    z: Math.random() * fii,
  };
  points.push(new THREE.Vector3(pos.x, pos.y, pos.z));
  const cSize = 10;
  const cGeom = new THREE.BoxBufferGeometry(cSize, cSize, cSize);
  cMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const cube = new THREE.Mesh(cGeom, cMat);
  cube.position.set(pos.x, pos.y, pos.z);
  scene.add(cube);
}

camera.position.set(0, 0, numPoints);

const geometry = new THREE.BufferGeometry().setFromPoints(points);

const line = new THREE.Line(geometry, material);

scene.add(line);
renderer.render(scene, camera);

function animate() {
  requestAnimationFrame(animate);

  scene.rotation.x += rate;
  scene.rotation.y += rate;
  if (Math.random() > 0.95) {
    rate = Math.random() * 0.05;
  }
  if (Math.random() < 0.005) {
    material.color.setHex(Math.random() * 0xffffff);
    cMat.color.setHex(Math.random() * 0xffffff);
  }

  renderer.render(scene, camera);
}

animate();
