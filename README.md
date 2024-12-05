# Three.js Demo
This demo renders a simple scene demonstrating the multi-colored shadow effect seen in photography.

![Preview image of demo](./assets/preview.jpg "Preview of Demo")

## Three.js Overview
ThreeJS is an open source JavaScript library that uses the WebGL API to make 3d, animated renderings. This gives developers the opportunity to create 3d renderings in the browser, while simplifying the complexities of WebGL making it more accessible. Since ThreeJS is built on top of the WebGL API, ThreeJS is simpler to use and often times more performant because of the inherent complexities of WebGL. ThreeJS can run on any device with a modern browser making it a powerful tool that can be used.

### Use Cases
ThreeJS can be used for a wide variety of applications. People have used it for data visualization, virtual reality, and some even have used it as a game engine. ThreeJS gives developers easy access to making simple 3d shapes to complex scenes.

For example, NASA has used ThreeJS to create a 1-1 scale of the solar system and have the live position of the planets, as well as being able to move forwards and backwards through time. NASA also used ThreeJS to create a 3D simulation of the Mars 2020 rover landing procedure.

### Starting a Project
- Create basic files (`index.html`, `main.js`)
- `npm install three`
- In the JavaScript file add the import: `import * as THREE from 'three'`;
- Set Up Camera, Scene, and Renderer
- Add Renderer to the DOM
- Create your 3D object/scene
- Animate object/scene in render loop

## Installation
Clone this project locally:  
`git clone https://github.com/ethan-logue/threejs-demo.git`

In project directory:  
`npm i`

Then run:  
`npx vite`
