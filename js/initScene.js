/*
**
*/

var spotRadius, spotDistance;
var wallDistance;

var spotLight, spotOutlines;
var skyBox;

var cylinder;
var cylinderShadow;

var raycaster = new THREE.Raycaster();
var hiddenPlane, target;

var mouse = new THREE.Vector2();
var normalizedMouse = new THREE.Vector2();

/*
**
*/

function initScene()
{
    //

    camera.position.set(400, 400, 400);
    camera.rotation.set(- halfPI / 2, - Math.atan(- 1 / Math.sqrt(2)), halfPI / 3);
    camera.zoom = 2;

    camera.updateProjectionMatrix();
    scene.add(camera);

    //

    spotRadius = 200;
    spotDistance = 800;
    wallDistance = -160;
    target = new THREE.Vector3();

    //

    initLights();
    initCylinder();
    initWall();
    initEvents();

    return ;
}