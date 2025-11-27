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


    const renderer = new THREE.WebGLRenderer({antialias: true})
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
    let meshes = []

    function initialize(city) {
        scene.clear()
        meshes = []
        for (let x = 0; x < city.size; x++) {
            const column = []
            for (let y = 0; y < city.size; y++) {
                // 1. load the mesh/3D object corresponding to the city at (x,y)
                // 2. add that mesh to the scene
                // 3. add that mesh to the meshes array

                // Grass Geometry
                const geometry = new THREE.BoxGeometry(1, 1, 1)
                const material = new THREE.MeshLambertMaterial({ color: 0x00ff00 })
                const mesh = new THREE.Mesh(geometry, material)
                mesh.position.set(x, -.5, y)
                scene.add(mesh)
                column.push(mesh)
                
                // Building Geometry
                const tile = city.data[x][y]
                if(tile.building === 'building'){
                    const buildingGeometry = new THREE.BoxGeometry(1, 1, 1)
                    const buildingMaterial = new THREE.MeshLambertMaterial({ color: 0x777777 })
                    const buildingMesh = new THREE.Mesh(buildingGeometry, buildingMaterial)
                    buildingMesh.position.set(x, .5, y)
                    scene.add(buildingMesh)
                    column.push(buildingMesh)
                }
            }
            meshes.push(column)
        }
        setupLights()
    }
    function setupLights() {
        const lights = [
            new THREE.AmbientLight(0xffffff, .2), // soft white light
            new THREE.DirectionalLight(0xffffff, .3),
            new THREE.DirectionalLight(0xffffff, .3),
            new THREE.DirectionalLight(0xffffff, .3),
        ]
        lights[1].position.set(0, 1, 0)
        lights[2].position.set(1, 1, 0)
        lights[3].position.set(0, 1, 1)
        scene.add(...lights)
    }
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
        initialize,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove

    }
}