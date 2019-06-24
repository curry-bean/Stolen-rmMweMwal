if ( WEBGL.isWebGLAvailable() === false ) {
    document.body.appendChild( WEBGL.getWebGLErrorMessage() );
}

var width = window.innerWidth;
var halfWidth = width / 2;
var height = window.innerHeight;
var halfHeight = height / 2;

var halfPI = Math.PI / 2;
var PI = Math.PI;
var TAU = Math.PI * 2;

var container, stats;
var camera, scene, renderer;
var objCylinder = [];

var gizmoSize;
var raycaster = new THREE.Raycaster();
var shadowXY, shadowYZ;
var euler, eulerMatrix;
var hiddenPlane, target;

var mouse = new THREE.Vector2();
var normalizedMouse = new THREE.Vector2();

init();
animate();

function init()
{
    container = document.getElementById("container");
    document.body.appendChild(container);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xF6F6F6);

    camera = new THREE.OrthographicCamera(- halfWidth, halfWidth, halfHeight, - halfHeight, -3600, 3600);
    camera.position.set(400, 400, 400);
    camera.rotation.set(- halfPI / 2, - Math.atan(- 1 / Math.sqrt(2)), halfPI / 3);
    camera.zoom = 2;
    camera.updateProjectionMatrix();
    scene.add(camera);

    gizmoSize = 200;
    target = new THREE.Vector3();

    var spotLight = new THREE.SpotLight(0xF6F6F6, 1.0);
    spotLight.position.set(0, 0, 2400);
    spotLight.angle = halfPI / 18;
    spotLight.penumbra = 1.0;
    spotLight.decay = 0.6;
    spotLight.distance = 3600;

    spotLight.castShadow = true;
	spotLight.shadow.mapSize.width = 2048;
    spotLight.shadow.mapSize.height = 2048;
    spotLight.shadow.camera.near = 10;
    spotLight.shadow.camera.far = 200;
    scene.add(spotLight);

    var spotLightHelper = new THREE.SpotLight(0x7A7A7A, 0.0);
    spotLightHelper.position.set(0, 0, 800);
    spotLightHelper.angle = halfPI / 7;
    spotLightHelper.distance = 800 + 160 - 1;

    var lightHelper = new THREE.SpotLightHelper(spotLightHelper);
    scene.add( lightHelper );

    var path = "textures/cube/Studio/";
    var format = ".jpg";
    var urls = [
        path + "px" + format, path + "nx" + format,
        path + "py" + format, path + "ny" + format,
        path + "pz" + format, path + "nz" + format
    ];

    var reflectionCube = new THREE.CubeTextureLoader().load(urls);
    reflectionCube.format = THREE.RGBFormat;

    var refractionCube = new THREE.CubeTextureLoader().load(urls);
    refractionCube.mapping = THREE.CubeRefractionMapping;
    refractionCube.format = THREE.RGBFormat;

    var textureLoader = new THREE.TextureLoader();
    var normalMap = textureLoader.load( "models/obj/ninja/normal_3.jpg" );
    var displacementMap = textureLoader.load( "models/obj/ninja/displacement_3.jpg" );

    var geometry = new THREE.CylinderGeometry(60, 60, 140, 64);

    var objMaterial = new THREE.MeshPhysicalMaterial(
    {
        color: 0xF6F6F6,
        envMap: reflectionCube,

        metalness: 0.7,
        roughness: 0.3,
        reflectivity: 0.4,

        normalMap: normalMap,
		normalScale: new THREE.Vector2(1, - 1),
      
        displacementMap: displacementMap,
		displacementScale: 0.4
    });

    //models
    var objLoader = new THREE.OBJLoader();

    objLoader.setPath("models/");
    objLoader.load("cylinder.obj", function ( object ) {
        objCylinder[0] = object.children[0];
        objCylinder[0].material = objMaterial;
        objCylinder[0].castShadow = true;
        objCylinder[0].receiveShadow = true;

        scene.add(objCylinder[0]);
    });

    //

    geometry = new THREE.PlaneGeometry(3200, 3200, 32, 32);
    var matWall = new THREE.MeshPhongMaterial({emissive: 0xFFFFFF, emissiveIntensity: 0.86});

    var plane = new THREE.Mesh(geometry, matWall);
    plane.rotation.set(0, 0, 0);
    
    plane.position.set(0, 0, -160);
    scene.add(plane);


    // Create a hidden plane facing to the camera

    geometry = new THREE.PlaneGeometry(3200, 3200, 32, 32);
    var material = new THREE.MeshBasicMaterial({color: 0xFF0000, visible: false});
    hiddenPlane = new THREE.Mesh(geometry, material);
    
    hiddenPlane.position.set(180, 180, 180);
    hiddenPlane.rotation.set(- halfPI / 2, - Math.atan(- 1 / Math.sqrt(2)), halfPI / 3);
    scene.add(hiddenPlane);

    // Create cylinder shadows

    geometry = new THREE.CylinderGeometry(36, 36, 74, 32);
    material = new THREE.MeshBasicMaterial({color: 0x7A7A7A});

    shadowYZ = new THREE.Mesh(geometry, material);

    // Flatten shadows geometry and change their position

    euler = new THREE.Euler(halfPI, 3 *halfPI / 2, 0);
    eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    shadowYZ.geometry.applyMatrix(eulerMatrix);

    shadowYZ.position.set(0, 0, - 160 + 1);
    shadowYZ.scale.set(1, 1, 0);

    scene.add(shadowYZ);

    /**/

    renderer = new THREE.WebGLRenderer({antialias: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    stats = new Stats();
    container.appendChild(stats.dom);

    window.addEventListener("resize", onWindowResize, false);
    document.addEventListener("mousemove", onMouseMove, false);
}


function onWindowResize()
{
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

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
        objCylinder[0].lookAt(target);
    }


    return ;
}

function animate()
{
    requestAnimationFrame(animate);

    // Change shadows geometry through the euler rotation matrix

    var euler = new THREE.Euler(objCylinder[0].rotation.x, objCylinder[0].rotation.y, objCylinder[0].rotation.z);
    var eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    shadowYZ.geometry.applyMatrix(eulerMatrix);

    // Write stats in console

    console.log(
        "angle = [" + Math.round(objCylinder[0].rotation.x / PI * 180) + "°, " + Math.round(objCylinder[0].rotation.y / PI * 180) + "°, " + Math.round(objCylinder[0].rotation.z / PI * 180) + "°];"
    );


    render();

    // Reset shadows geometry through the euler rotation inverse matrix

    shadowYZ.geometry.applyMatrix(new THREE.Matrix4().getInverse(eulerMatrix));
    
}

function render()
{
    renderer.render(scene, camera);
    stats.update();
}