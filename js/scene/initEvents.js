/*
** Declare global variables
*/

// Declare 2d vectors to get mouse positions

var mouse = new THREE.Vector2();
var normalizedMouse = new THREE.Vector2();

// Declare mouse raycasting variables

var raycaster = new THREE.Raycaster();
var target = new THREE.Vector3();
var raycastedPlan;

/*
** Initialize events function
*/

function initEvents()
{
    // Create an hidden plane facing to the camera

    var geometry = new THREE.PlaneGeometry(3200, 3200, 32, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xFF0000, visible: false});
    raycastedPlan = new THREE.Mesh(geometry, material);
    
    raycastedPlan.position.copy(camera.position.multiplyScalar(0.3));
    raycastedPlan.rotation.set(- halfPI / 2, - Math.atan(- 1 / Math.sqrt(2)), halfPI / 3);
    scene.add(raycastedPlan);

    // Add window resize and mouse move event listeners

    window.addEventListener("resize", onWindowResize);
    document.addEventListener("mousemove", onMouseMove);

    return ;
}

/*
** On window resize function
*/

function onWindowResize()
{
    // Update window size variables

    halfWidth = window.innerWidth / 2;
    width = window.innerWidth;
    halfHeight = window.innerHeight / 2;
    height = window.innerHeight;

    // Update orthographic camera ratio

    camera.left = - halfWidth;
    camera.right = halfWidth;
    camera.top = halfHeight;
    camera.bottom = - halfHeight;
    camera.updateProjectionMatrix();

    // Update renderer size

    renderer.setSize(width, height);

    return ;
}

/*
** On mouse move event function
*/

function onMouseMove(e)
{
    // Get mouse position values

    mouse.x = e.clientX;
    mouse.y = e.clientY;

    // Clamp mouse position values between -1 and 1

    normalizedMouse.x = mouse.x / width * 2 - 1;
    normalizedMouse.y = - mouse.y / height * 2 + 1;

    // Cast a ray from mouse origin to the plane

    raycaster.setFromCamera(normalizedMouse, camera);
    var intersects = raycaster.intersectObject(raycastedPlan);

    // If ray intersects the plane

    if (intersects.length > 0)
    {
        // Set target position to its intersection coordinates

        target = intersects[0].point;
    }

    return ;
}
