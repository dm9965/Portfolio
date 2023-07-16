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
camera.position.setZ(0);

const geometry = new THREE.TorusGeometry( 10, 3, 16, 100 );
const material = new THREE.MeshStandardMaterial({color: 0xffffff,
    metalness: 1, roughness: 0.3});

const torusRing = new THREE.Mesh(geometry, material);
scene.add(torusRing);

const lighting = new THREE.PointLight(0xffffff);
lighting.position.set(10,10,10);

const bottomlighting = new THREE.PointLight(0xffffff);
bottomlighting.position.set(100,50,100);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(lighting, ambientLight, bottomlighting);

const headshot = new THREE.TextureLoader().load("headshot.jpeg");
const profileCube = new THREE.Mesh(new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: headshot, metalness: 1, roughness: 0.5}));
scene.add(profileCube);

const deathStarTexture = new THREE.TextureLoader().load('deathstar.jpg');
const deathStar = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshStandardMaterial({
        map: deathStarTexture,
        metalness: 1, roughness: 0.5
    })
);

const planetTexture = new THREE.TextureLoader().load('8k_moon.jpg');
const redPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xBC544D,
        map: planetTexture,
        roughness: .75
    })
);

const greenPlanet = new THREE.Mesh(
    new THREE.SphereGeometry(6, 32, 32),
    new THREE.MeshStandardMaterial({
        color: 0xB2D3C2,
        map: planetTexture,
        roughness: .75
    })
);


redPlanet.position.z = -50;
redPlanet.position.x = 50;
redPlanet.position.y = 50;
scene.add(redPlanet);

greenPlanet.position.z = 15;
greenPlanet.position.x = 50;
greenPlanet.position.y = -20;
scene.add(greenPlanet);

deathStar.position.z = 10;
deathStar.position.x = -30;
scene.add(deathStar);

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

const spaceBackground = new THREE.TextureLoader().load("space2.jpeg");
scene.background = spaceBackground;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;

    profileCube.rotation.y += 0.01;
    profileCube.rotation.z += 0.01;

    camera.position.x = t* -0.0002;
    camera.position.y = t* -0.0002;
    camera.position.z = t * -0.01;
}
document.body.onscroll = moveCamera;

function animate() {
    requestAnimationFrame( animate );

    torusRing.rotation.x += 0.01;
    torusRing.rotation.y += 0.005;
    torusRing.rotation.z += 0.01;

    redPlanet.rotation.z += 0.005;
    redPlanet.rotation.y += 0.005;

    greenPlanet.rotation.z += 0.005;
    greenPlanet.rotation.y += 0.005;

    deathStar.rotation.y += -0.0025;

    controls.update();

    renderer.render(scene, camera );
}


animate();