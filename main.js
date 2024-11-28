import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // field of view, aspect ratio, near clipping plane, far clipping plane
camera.position.set(0, 8, 14);

window.addEventListener( 'resize', onWindowResize );

// AxesHelper
// const axesHelper = new THREE.AxesHelper(10);
// scene.add( axesHelper );

// Renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

// OrbitControls
const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 2;
controls.maxDistance = 20;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set( 0, 1, 0 );
controls.update();

// MeshKnot
const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff } );
const meshKnot = new THREE.Mesh( geoKnot, matKnot );
meshKnot.position.set( 0, 5, 0 );
meshKnot.castShadow = true;
scene.add( meshKnot );

// Stage
const stageGeometry = new THREE.PlaneGeometry(22, 15);

// Texture for the stage
const texture = new THREE.TextureLoader().load('./textures/wood.png');
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(4, 4);
const stageMaterial = new THREE.MeshStandardMaterial({ map: texture });

const stage = new THREE.Mesh(stageGeometry, stageMaterial);
stage.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
stage.position.z = 3;
stage.receiveShadow = true;
scene.add(stage);

// Wall
const wallGeometry = new THREE.BoxGeometry(22, 14, 2);
const wallMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
const wall = new THREE.Mesh(wallGeometry, wallMaterial);
wall.position.set(0, 7, -5);
wall.receiveShadow = true;
scene.add(wall);

// Spotlights
const lights = [
    { color: 0xff0000, position: [-2, 5, 10] },  // Red
    { color: 0x00ff00, position: [0, 5, 10] },  // Green
    { color: 0x0000ff, position: [2, 5, 10] },   // Blue
];

lights.forEach(({ color, position }) => {
    const spotlight = new THREE.SpotLight(color, 20); // Color, intensity
    spotlight.position.set(...position); // x, y, z from array
    spotlight.distance = 20; // How far the spotlight shines
    spotlight.angle = Math.PI / 6; // Width of the spotlight beam
    spotlight.penumbra = 0.05; // Softness of the spotlight edge
    spotlight.decay = 1; // Intensity decay over distance
    spotlight.castShadow = true; // Enable shadow casting
    // spotlight.target = meshKnot; // Point the light at the knot

    // Set spotlight's target to a point directly in front of it
    const spotlightTarget = new THREE.Object3D();
    spotlightTarget.position.set(position[0], position[1], position[2] - 1); // Forward along -Z
    scene.add(spotlightTarget);
    spotlight.target = spotlightTarget;

    scene.add(spotlight);

    // Create a light model and light cone for each spotlight
    createLightModel(color, position);
    createLightCone(spotlight, position);

    // SpotlightHelper
    // const spotlightHelper = new THREE.SpotLightHelper( spotlight );
    // scene.add( spotlightHelper );
});

// AmbientLight
const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

// Animation
function animate() {
    meshKnot.rotation.x += 0.01;
    meshKnot.rotation.y += 0.01;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );

// Handler for window resize
function onWindowResize() {
    renderer.setSize( window.innerWidth, window.innerHeight );
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

// Helper function to create a light model
function createLightModel(color, position) {
    const loader = new GLTFLoader();

    loader.load('./models/spotlight.glb', function (gltf) {
        const lightModel = gltf.scene;
        lightModel.position.set(...position);
        lightModel.scale.set(2, 2, 2);
        lightModel.rotation.y = Math.PI;
        lightModel.position.y = position[1] - 1;

        // Traverse the model to find the correct mesh and change its color
        lightModel.traverse((child) => {
            if (child.isMesh && child.name === 'Beam_spotlight_3') {
                child.material = new THREE.MeshStandardMaterial({ color: color, emissive: color });
            }
        });

        scene.add(lightModel);
    });

    // Stand for light to sit on
    // Platform
    const boxGeometry = new THREE.BoxGeometry(1, 0.125, 1);
    const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    box.position.set(...position);
    box.position.y = position[1] - 1;
    scene.add(box);

    // Pole
    const cylinderGeometry = new THREE.CylinderGeometry(0.125, 0.125, position[1] - 1);
    const cylinderMaterial = new THREE.MeshStandardMaterial({ color: 0x404040 });
    const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
    cylinder.position.set(...position);
    cylinder.position.y = (position[1] - 1) / 2;
    scene.add(cylinder);
}

// Helper function to create the light cone
function createLightCone (spotlight, position) {
    const coneHeight = spotlight.distance - 5; // Use spotlight's distance for cone height
    const coneRadius = coneHeight * Math.tan(spotlight.angle); // Calculate radius using angle
    const coneGeometry = new THREE.ConeGeometry(coneRadius, coneHeight, 32);
    const coneMaterial = new THREE.MeshStandardMaterial({
        color: spotlight.color,
        emissive: spotlight.color,
        emissiveIntensity: 1.5,
        transparent: true,
        opacity: 0.05,
        depthWrite: false, // Prevent writing to the depth buffer for better blending
    });

    const cone = new THREE.Mesh(coneGeometry, coneMaterial);
    cone.position.set(position[0], position[1], position[2] - coneHeight / 2); // Move the cone to be at the end of the spotlight
    cone.rotation.x = -Math.PI / 2; // Rotate the cone to face sideways
    cone.rotation.z = Math.PI; // Rotate the cone to face the wall
    scene.add(cone);
}