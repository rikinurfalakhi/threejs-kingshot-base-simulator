import * as THREE from 'three';
import { createCamera } from './camera.js';


export function createScene() {
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);
    const camera = createCamera(gameWindow)
    const resetCamera = createCamera(gameWindow)
    
    let cameraRadius = 5
    let cameraAzimuth = 0
    let cameraElevation = 0
   

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);


    // camera.position.z = 5

    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
    const mesh = new THREE.Mesh(geometry, material)

    //membuat garistepi seperti border
    const edges = new THREE.EdgesGeometry(geometry)
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
    const line = new THREE.LineSegments(edges, lineMaterial)
    mesh.add(line)
    scene.add(mesh)

    function draw() {
        // mesh.rotation.x += .01
        // mesh.rotation.y += .01
        // mesh.rotation.z += .01
        renderer.render(scene, camera.camera)
    }
    function start() {
        renderer.setAnimationLoop(draw)
    }
    function stop() {
        renderer.setAnimationLoop(null)
    }
    function onMouseDown(event) {
        console.log('mouse down')
        camera.onMouseDown(event)
        console.log(event.button)

    }
    function onMouseUp(event) {
        console.log('mouse up')
        camera.onMouseUp(event)
    }
    function onMouseMove(event) {
        camera.onMouseMove(event)
    }
    // function updateCameraPosition() {
    //     camera.position.x = cameraRadius * Math.sin(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180)
    //     camera.position.y = cameraRadius * Math.sin(cameraElevation * Math.PI / 180)
    //     camera.position.z = cameraRadius * Math.cos(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180)
    //     camera.lookAt(0, 0, 0)
    //     camera.updateMatrix()
    // }



    return {
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
        
    }
}