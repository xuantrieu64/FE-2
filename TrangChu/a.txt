import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const canvas = document.getElementById('canvas');

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color('#F0F0F0');

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(2, 5, 5);
scene.add(directionalLight);

// Animation setup
let mixer;
let avatar;

const loader = new GLTFLoader();

// Load avatar
loader.load(
  'https://models.readyplayer.me/682356583c5ab94b9e4bf2f4.glb',
  function (gltf) {
    avatar = gltf.scene;
    avatar.scale.set(1.5, 1.5, 1.5);
    avatar.position.set(0, -1.5, 0);
    scene.add(avatar);

    mixer = new THREE.AnimationMixer(avatar);

    // Sau khi avatar load xong, mới load animation
    loader.load(
      'Walking.glb', // đường dẫn tới file animation bạn đã chuyển
      function (animGltf) {
        const clip = animGltf.animations[0];
        const action = mixer.clipAction(clip);
        action.play();
      },
      undefined,
      function (err) {
        console.error('Lỗi khi tải Walking.glb:', err);
      }
    );
  },
  undefined,
  function (error) {
    console.error('Lỗi khi tải avatar:', error);
  }
);

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();
  if (mixer) mixer.update(delta);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// Handle resizing
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
