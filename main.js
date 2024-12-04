import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const RED = 0xff0000;
const GREEN = 0x00ff00;
const BLUE = 0x0000ff;

// Scene
const scene = new THREE.Scene();


// AxesHelper
const axesHelper = new THREE.AxesHelper(10); // Red: x, Green: y, Blue: z
scene.add( axesHelper );

// Renderer


// OrbitControls


// Knot


// Stage
const stageGeometry = new THREE.PlaneGeometry(22, 15);
const stageMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const stage = new THREE.Mesh(stageGeometry, stageMaterial);
scene.add(stage);

// Wall


// Spotlights
const lights = [

];

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
    
}

// Helper function to create a light model
function createLightModel(color, position) {
    return;
}

// Helper function to create the light cone
function createLightCone (spotlight, position) {
    return;
}