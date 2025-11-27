import * as THREE from 'three';
export function createCamera(gameWindow) {

    const DEG2RAD = Math.PI /180

    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;

    const MIN_CAMERA_RADIUS = 10
    const MAX_CAMERA_RADIUS = 20
    const ROTATION_SENSITIFITY = .5
    const ZOOM_SENSITIFITY = .02
    const PAN_SENSITIFITY = -.01
    const MIN_CAMERA_ELEVATION = 30
    const MAX_CAMERA_ELEVATION = 90

    const Y_AXIS = new THREE.Vector3(0,1,0)

    const camera = new THREE.PerspectiveCamera(75, gameWindow.clientWidth / gameWindow.offsetHeight, 0.1, 1000);
    let cameraOrigin = new THREE.Vector3()
    let cameraRadius = (MIN_CAMERA_RADIUS + MAX_CAMERA_RADIUS) /2
    let cameraAzimuth = 135
    let cameraElevation = 45
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
            cameraAzimuth += -(deltaX * ROTATION_SENSITIFITY)
            cameraElevation += (deltaY * ROTATION_SENSITIFITY)
            cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation))
            updateCameraPosition()
        }
        // handles the zoom of the camera
        if (isRightMouseDown) {
            camera.position.z += deltaY * ZOOM_SENSITIFITY
            cameraRadius += ((e.clientY - prevMouseY) * .02)
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius))
            updateCameraPosition()
        }
        // 18:30
        // handles the panning of the camera
        if (isMiddleMouseDown) {
            console.log('middle mouse move');
            
            const forward = new THREE.Vector3(0,0,1).applyAxisAngle(Y_AXIS, cameraAzimuth * Math.PI /180)
            const left = new THREE.Vector3(1,0,0).applyAxisAngle(Y_AXIS, cameraAzimuth * Math.PI /180)
            cameraOrigin.add(forward.multiplyScalar(-deltaY * PAN_SENSITIFITY))
            cameraOrigin.add(left.multiplyScalar(-deltaX * PAN_SENSITIFITY))
            updateCameraPosition()
        }

        prevMouseX = e.clientX
        prevMouseY = e.clientY
    }

    function updateCameraPosition() {
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * Math.PI / 180)
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD)
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * Math.PI / 180)
        camera.position.add(cameraOrigin)
        camera.lookAt(cameraOrigin)
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