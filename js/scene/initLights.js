/*
** Declare global variables
*/

var spotLight, spotOutlines;
var skyBox;

/*
** Initialize lights function
*/

function initLights()
{
    // Initialize a spot light

    spotLight = initSpotLight();
    scene.add(spotLight);

    // Initialize the spot light outlines

    spotOutlines = initSpotOutlines();
    scene.add(spotOutlines);

    // Initialize a sky box

    skyBox = initSkyBox();

    return ;
}

/*
** Initialize spot light function
*/

function initSpotLight()
{
    // Create a spot light

    var light = new THREE.SpotLight(0xF6F6F6, 1.0);

    // Set light position, orientation and projection

    light.position.set(0, 0, 2400);
    light.angle = halfPI / 18;
    light.penumbra = 1.0;
    light.decay = 0.6;
    light.distance = 3600;

    return (light);
}

/*
** Initialize spot light outlines function
*/

function initSpotOutlines()
{
    // Create spot light impact circle

    var material = new THREE.MeshBasicMaterial({color: 0x7A7A7A});
    var geometry = new THREE.TorusGeometry(spotRadius, 0.4, 8, 96);
    var spotCircle = new THREE.Mesh(geometry, material);
    spotCircle.position.z = -160;

    // Create spot light horizontal projection lines

    spotLines = [];
    material = new THREE.LineBasicMaterial({color: 0x7A7A7A});

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-spotRadius, 0, wallDistance));
    geometry.vertices.push(new THREE.Vector3( 0, 0, spotDistance) );
    geometry.vertices.push(new THREE.Vector3(spotRadius, 0, wallDistance));
    spotLines.push(new THREE.Line(geometry, material));

    // Create spot light vertical projection lines

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, -spotRadius, wallDistance));
    geometry.vertices.push(new THREE.Vector3(0, 0, spotDistance));
    geometry.vertices.push(new THREE.Vector3(0, spotRadius, wallDistance));
    spotLines.push(new THREE.Line(geometry, material));

    // Create spot light central projection line

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, wallDistance));
    geometry.vertices.push(new THREE.Vector3(0, 0, spotDistance));
    spotLines.push(new THREE.Line(geometry, material));

    // Add all outlines to a group

    var group = new THREE.Group();
    group.add(spotLines[0], spotLines[1], spotLines[2], spotCircle);

    return (group); 
}

/*
**
*/

function initSkyBox()
{
    var path = "textures/skybox/";
    var format = ".jpg";
    var skyBoxUrls = [
        path + "px" + format, path + "nx" + format,
        path + "py" + format, path + "ny" + format,
        path + "pz" + format, path + "nz" + format
    ];

    var box = new THREE.CubeTextureLoader().load(skyBoxUrls);
    box.format = THREE.RGBFormat;

    return (box);
}
