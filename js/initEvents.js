/*
**
*/

function initEvents()
{
    // Create a hidden plane facing to the camera

    var geometry = new THREE.PlaneGeometry(3200, 3200, 32, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xFF0000, visible: false});
    hiddenPlane = new THREE.Mesh(geometry, material);
    
    hiddenPlane.position.set(180, 180, 180);
    hiddenPlane.rotation.set(- halfPI / 2, - Math.atan(- 1 / Math.sqrt(2)), halfPI / 3);
    scene.add(hiddenPlane);

    //

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onMouseMove, false);

    return ;
}

/*
**
*/

function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

/*
**
*/

function onMouseMove(e)
{
    // Get mouse position values

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Clamp mouse position values between -1 and 1

    normalizedMouse.x = mouse.x / width * 2 - 1;
    normalizedMouse.y = - mouse.y / height * 2 + 1;

    raycaster.setFromCamera(normalizedMouse, camera);
    var intersects = raycaster.intersectObject(hiddenPlane);
    if (intersects.length > 0)
    {
        // Set target position to its intersection coordinates

        target = intersects[0].point;
        cylinder.lookAt(target);
    }

    return ;
}
