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
const axesHelper = new THREE.AxesHelper(10); // Red: x, Green: y, Blue: z
scene.add( axesHelper );

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true }); // Enable antialiasing
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// OrbitControls


// Knot
const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
const matKnot = new THREE.MeshStandardMaterial( { color: 0xffffff } );
const knot = new THREE.Mesh( geoKnot, matKnot );
knot.position.set( 0, 5, 0 );
scene.add( knot );

// Stage
const stageGeometry = new THREE.PlaneGeometry(22, 15);
const stageMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const stage = new THREE.Mesh(stageGeometry, stageMaterial);
stage.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
scene.add(stage);

// Wall


// Spotlights
const lights = [
    { color: 0xff0000, position: [-2, 5, 10] },  // Red
    { color: 0x00ff00, position: [0, 5, 10] },  // Green
    { color: 0x0000ff, position: [2, 5, 10] },   // Blue
];

lights.forEach(({ color, position }) => {
    const spotlight = new THREE.SpotLight(color, 20); // Color, intensity
    spotlight.position.set(...position); // x, y, z from array
    

    scene.add(spotlight);

    // SpotlightHelper
});

// Ambient lighting
const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Animation loop
function animate() {
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
    return;
}

// Helper function to create the light cone
function createLightCone (spotlight, position) {
    return;
}