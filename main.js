import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RectAreaLightHelper } from 'three/addons/helpers/RectAreaLightHelper.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); // field of view, aspect ratio, near clipping plane, far clipping plane
camera.position.set(0, 12, -10); // Better perspective
camera.lookAt(10, 12, 0); // Point camera at the cube and stage

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
controls.minDistance = 2;
controls.maxDistance = 10;
controls.maxPolarAngle = Math.PI / 2;
controls.target.set( 0, 1, 0 );
controls.update();

// MeshKnot
const geoKnot = new THREE.TorusKnotGeometry( 1.5, 0.5, 200, 16 );
const matKnot = new THREE.MeshPhysicalMaterial( { color: 0xffffff, roughness: 0, metalness: 0 } );
const meshKnot = new THREE.Mesh( geoKnot, matKnot );
meshKnot.position.set( 0, 5, 0 );
scene.add( meshKnot );

// Stage
const stageGeometry = new THREE.PlaneGeometry(20, 20);
const stageMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
const stage = new THREE.Mesh(stageGeometry, stageMaterial);
stage.rotation.x = -Math.PI / 2;
stage.receiveShadow = true;
scene.add(stage);

// Spotlights
const lights = [
    { color: 0xff0000, position: [-6, 5, 6], width: 5, height: 10 },  // Red
    { color: 0x00ff00, position: [0, 5, 9], width: 5, height: 10 },  // Green
    { color: 0x0000ff, position: [6, 5, 6], width: 5, height: 10 },   // Blue
];

lights.forEach(({ color, position, width, height }) => {
    const rectLight = new THREE.RectAreaLight(color, 10, width, height); // Brightness of 10
    rectLight.position.set(...position);
    rectLight.lookAt(0, 5, 0); // Aim towards the center
    scene.add(rectLight);

    const rectLightHelper = new RectAreaLightHelper( rectLight );
    rectLight.add( rectLightHelper );
});

const ambientLight = new THREE.AmbientLight(0x404040); // Soft white light
scene.add(ambientLight);

function animate() {
    meshKnot.rotation.y += 0.01;
	renderer.render( scene, camera );
}
renderer.setAnimationLoop( animate );







// function createCustomShape(vertices) {
//     const shapeGeometry = new THREE.CircleGeometry(1, vertices);
//     const material = new THREE.MeshPhongMaterial({
//         color: Math.random() * 0xffffff,
//         flatShading: true,
//     });
//     const shape = new THREE.Mesh(shapeGeometry, material);

//     shape.position.set(
//         Math.random() * 10 - 5,
//         Math.random() * 2 + 1,
//         Math.random() * 10 - 5
//     );
//     shape.userData.floatSpeed = Math.random() * 0.02 + 0.01;
//     return shape;
// }

// // Add event listener for "Add Shape"
// document.getElementById('addShape').addEventListener('click', () => {
//     const vertices = parseInt(document.getElementById('vertices').value, 10);
//     if (vertices >= 3 && vertices <= 20) {
//         const shape = createCustomShape(vertices);
//         scene.add(shape);
//     } else {
//         alert('Vertices must be between 3 and 20.');
//     }
// });

// function animateFloatingShapes() {
//     scene.children.forEach((child) => {
//         if (child.isMesh) {
//             child.position.y += Math.sin(Date.now() * child.userData.floatSpeed) * 0.005;
//         }
//     });
// }

// const raycaster = new THREE.Raycaster();
// const mouse = new THREE.Vector2();
// let selectedObject = null;

// window.addEventListener('mousedown', (event) => {
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//     raycaster.setFromCamera(mouse, camera);
//     const intersects = raycaster.intersectObjects(scene.children);

//     if (intersects.length > 0) {
//         selectedObject = intersects[0].object;
//     }
// });

// window.addEventListener('mousemove', (event) => {
//     if (selectedObject) {
//         mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//         mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

//         raycaster.setFromCamera(mouse, camera);
//         const planeIntersect = raycaster.intersectObject(stage)[0];

//         if (planeIntersect) {
//             selectedObject.position.copy(planeIntersect.point);
//         }
//     }
// });

// window.addEventListener('mouseup', () => {
//     selectedObject = null;
// });

// function animate() {
//     requestAnimationFrame(animate);
//     animateFloatingShapes();
//     renderer.render(scene, camera);
// }
// animate();
