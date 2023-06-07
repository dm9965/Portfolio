import './style.css'
import * as THREE from 'three';
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene;

const camera = new THREE.PerspectiveCamera(
                                            75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({color: 0xC0C0C0});
const torusRing = new THREE.Mesh(geometry, material);
scene.add(torusRing);

const lighting = new THREE.PointLight(0xffffff);
lighting.position.set(10,10,10);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(lighting,ambientLight);

const lightHelper = new THREE.PointLightHelper(lighting);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper);

const headshot = new THREE.TextureLoader().load("headshot.jpeg");
const profileCube = new THREE.Mesh(new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: headshot}));
scene.add(profileCube);

const controls = new OrbitControls(camera, renderer.domElement);

function addStars() {
    const geometry = new THREE.SphereGeometry(0.1, 24,24);
    const starmaterial = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry,starmaterial);

    const [x, y, z] = Array(3).fill().map(() =>
                    THREE.MathUtils.randFloatSpread ( 100 ));
    star.position.set(x,y,z);
    scene.add(star)
}
Array(400).fill().forEach(addStars);

const spaceBackground = new THREE.TextureLoader().load("space4.jpg");
scene.background = spaceBackground;

function animate() {
    requestAnimationFrame( animate );

    torusRing.rotation.x += 0.02;
    torusRing.rotation.y += 0.005;
    torusRing.rotation.z += 0.01

    controls.update();

    renderer.render(scene, camera );
}

animate();