import * as THREE from 'three';
export function createCamera(gameWindow) {
    const LEFT_MOUSE_BUTTON = 0;
    const RIGHT_MOUSE_BUTTON = 1;
    const MIDDLE_MOUSE_BUTTON = 2;
    const MIN_CAMERA_RADIUS = 2
    const MAX_CAMERA_RADIUS = 10

    const camera = new THREE.PerspectiveCamera(75, gameWindow.clientWidth / gameWindow.offsetHeight, 0.1, 1000);
    let cameraRadius = 5
    let cameraAzimuth = 0
    let cameraElevation = 0
    let isLeftMouseDown = false
    let isRightMouseDown = false
    let isMiddleMouseDown = false
    // let isMouseUp = false
    // let isMouseDown = false
    let prevMouseX = 0
    let prevMouseY = 0

    camera.position.z = 5

    function onMouseDown(event) {
        console.log('mouse down')
        // isMouseDown = true
        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = true
            console.log('left mouse down')
        }
        if (event.button === MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = true
            console.log('middle mouse down')
        }
        if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = true
            console.log('right mouse down')
        }

    }
    function onMouseUp(event) {
        console.log('mouse up')
        // isMouseUp = false
        if (event.button === LEFT_MOUSE_BUTTON) {
            isLeftMouseDown = false
            console.log('left mouse up')
        }
        if (event.button === MIDDLE_MOUSE_BUTTON) {
            isMiddleMouseDown = false
            console.log('middle mouse up')
        }
         if (event.button === RIGHT_MOUSE_BUTTON) {
            isRightMouseDown = false
            console.log('right mouse up')
        }
    }
    function onMouseMove(e) {
        console.log('mouse move')
        const deltaX = (e.clientX - prevMouseX)
        const deltaY = (e.clientY - prevMouseY)
        // handles rotation of the camera
        if (isLeftMouseDown) {
            cameraAzimuth += -(deltaX * .5)
            cameraElevation += (deltaY * .5)
            cameraElevation = Math.min(90, Math.max(0, cameraElevation))
            updateCameraPosition()
        }
        // 18:30
        // handles the panning of the camera
        if (isRightMouseDown) {
            camera.position.z += deltaY * .05
            cameraRadius += ((e.clientY - prevMouseY) * .02)
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius))
            updateCameraPosition()
        }
        // handles the zoom of the camera
        if (isMiddleMouseDown) {
            camera.position.x += -(e.clientX - prevMouseX) * .05
            camera.position.y += (e.clientY - prevMouseY) * .05
            updateCameraPosition()
        }
        prevMouseX = e.clientX
        prevMouseY = e.clientY
    }

    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180)
        camera.position.y = cameraRadius * Math.sin(cameraElevation * Math.PI / 180)
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * Math.PI / 180) * Math.cos(cameraElevation * Math.PI / 180)
        camera.lookAt(0, 0, 0)
        camera.updateMatrix()
    }
    function resetCamera() {
        cameraAzimuth = 0
        cameraElevation = 0
        console.log('camera reset')
    }



    return {
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        resetCamera
    }
}