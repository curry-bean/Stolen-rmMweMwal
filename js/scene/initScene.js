/*
** Declare global variables
*/

// Declare trigonometric variables

var halfPI = Math.PI / 2;
var PI = Math.PI;
var TAU = 2 * Math.PI;

// Set scene distances variables

var spotRadius, spotDistance;
var wallDistance;

/*
** Initialize scene function
*/

function initScene()
{
    // Set an isometric camera

    camera.position.set(400, 480, 400);

    camera.rotation.set(- halfPI / 2, - Math.atan(- 1 / Math.sqrt(2)), halfPI / 3);
    camera.zoom = 2;

    camera.updateProjectionMatrix();
    scene.add(camera);

    // Set global scene distances

    spotRadius = 200;
    spotDistance = 800;
    wallDistance = -160;

    // Initialize lights, cylinder and assets

    initLights();
    addCylinder();
    addWall();

    // Initialize mouse move event listener

    initEvents();

    return ;
}
