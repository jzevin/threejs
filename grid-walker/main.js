import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

let target = new THREE.Vector3(4.5, 0, 3.5);

function initRenderer() {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
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
  camera.position.set(0, 3, 10);
  return camera;
}

function initScene() {
  const scene = new THREE.Scene();
  return scene;
}

function initGround() {
  const geometry = new THREE.PlaneGeometry(10, 10, 10, 10),
    material = new THREE.MeshBasicMaterial({
      color: 0x333333,
      side: THREE.DoubleSide,
      wireframe: true,
    });
  const plane = new THREE.Mesh(geometry, material);
  plane.rotateX(Math.PI / 2);
  return plane;
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  walkers.forEach((w) => w.update());
  render();
}

class Walker {
  constructor() {
    this.size = THREE.MathUtils.randFloat(0.1, 0.75);
    const geometry = new THREE.BoxGeometry(this.size, this.size, this.size);
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(Math.random(), 0.75, 0.5),
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.set(0, this.size / 2, 0);
    this.speedX = this.getSpeed();
    this.dirX = this.getDir();
    this.speedZ = this.getSpeed();
    this.dirZ = this.getDir();
  }
  getSpeed() {
    return THREE.MathUtils.randFloat(0.0125, 0.0625);
  }
  getDir() {
    // return THREE.MathUtils.randInt(-1, 1);
    return Math.random() <= 0.5 ? 1 : -1;
  }
  update() {
    this.mesh.position.x += this.speedX * this.dirX;
    this.mesh.position.z += this.speedZ * this.dirZ;
    if (this.mesh.position.x >= 4.5) {
      this.mesh.position.x = 4.5;
    }
    if (this.mesh.position.z >= 4.5) {
      this.mesh.position.z = 4.5;
    }
    if (this.mesh.position.x <= -4.5) {
      this.mesh.position.x = -4.5;
    }
    if (this.mesh.position.z <= -4.5) {
      this.mesh.position.z = -4.5;
    }
    if (Math.random() < 0.1) {
      this.dirX = this.getDir();
      this.speedX = this.getSpeed();
    }
    if (Math.random() < 0.1) {
      this.dirZ = this.getDir();
      this.speedZ = this.getSpeed();
    }
  }
}

const renderer = initRenderer(),
  camera = initCamera(),
  scene = initScene(),
  plane = initGround(),
  controls = new OrbitControls(camera, renderer.domElement),
  ambientLight = new THREE.AmbientLight(0xffffff, 0.25),
  point1 = new THREE.PointLight(0xaa3300, 2),
  walkers = Array(150)
    .fill(null)
    .map((_) => new Walker());

point1.position.set(10, 10, -5);

scene.add(ambientLight, point1, plane, ...walkers.map((w) => w.mesh));

animate();
