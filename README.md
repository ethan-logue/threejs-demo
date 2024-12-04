# Three.js Demo
This demo renders a simple scene demonstrating the multi-colored shadow effect seen in photography.

![Preview image of demo](./assets/preview.jpg "Preview of Demo")

## Three.js Overview
ThreeJS is a JavaScript library / API that uses WebGL to make 3d, animated renderings. This gives developers the opportunity to create 3d renderings in the browser, while simplifying the complexities of WebGL making it more accessible for developers.

### Use Cases
Some use cases for ThreeJS can be anywhere from being able to display some type of a model, maybe a rendering of a map on a game, to even using ThreeJS as a prototype to a game engine.

### Starting a Project
- Create basic files (index.html, main.js), These are included
- `npm install three`
- In the JavaScript file add the import: `import * as THREE from three`;
- Set Up Camera, Scene, and Renderer
- Add Renderer to the DOM
- Create your 3D object
- Animate object in render loop

## Installation
Clone this project locally:  
`git clone https://github.com/ethan-logue/threejs-demo.git`

In project directory:  
`npm i`

Then run:  
`npx vite`