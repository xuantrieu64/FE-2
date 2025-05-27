import * as THREE from 'three';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.160.0/examples/jsm/controls/OrbitControls.js';

const canvas = document.getElementById('canvas');

//1. Create th scene
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

//2. Add the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;


//3. Create and add a cube object
const geometry = new THREE.DodecahedronGeometry();
const material = new THREE.MeshBasicMaterial({ color: '#468585' });
const dodecahedron = new THREE.Mesh(geometry, material);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshBasicMaterial({ color: '#B4B4B3', emissive: '#B4B4B3' });

const box = new THREE.Mesh(boxGeometry, material);
box.position.y = -1.5;

scene.add(dodecahedron);
scene.add(box);

//4. Add lighting
const light = new THREE.DirectionalLight(0x006769, 100);
light.position.set(1, 1, 1);
scene.add(light);
//5. Set up the renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);

//6. Add OrbitControll
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// 7. Animation the scene
function animation() {
    requestAnimationFrame(animation);

    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;

    box.rotation.y += 0.005;
    controls.update();

    renderer.render(scene, camera);
}
animation();