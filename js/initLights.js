/*
**
*/

function initLights()
{
    spotLight = initSpotLight();
    scene.add(spotLight);

    spotOutlines = initSpotOutlines();
    scene.add(spotOutlines);

    skyBox = initSkyBox();

    return ;
}

/*
**
*/

function initSpotLight()
{
    var light = new THREE.SpotLight(0xF6F6F6, 1.0);

    light.position.set(0, 0, 2400);
    light.angle = halfPI / 18;
    light.penumbra = 1.0;
    light.decay = 0.6;
    light.distance = 3600;

    light.castShadow = true;
	light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 10;
    light.shadow.camera.far = 200;

    return (light);
}

/*
**
*/

function initSpotOutlines()
{
    var group = new THREE.Group();

    //

    var material = new THREE.MeshBasicMaterial({color: 0x7A7A7A});
    var geometry = new THREE.TorusGeometry(spotRadius, 0.4, 8, 96);
    var spotCircle = new THREE.Mesh(geometry, material);
    spotCircle.position.z = -160;
    group.add(spotCircle);

    //

    spotLines = [];
    material = new THREE.LineBasicMaterial({color: 0x7A7A7A});

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(-spotRadius, 0, wallDistance));
    geometry.vertices.push(new THREE.Vector3( 0, 0, spotDistance) );
    geometry.vertices.push(new THREE.Vector3(spotRadius, 0, wallDistance));
    spotLines.push(new THREE.Line(geometry, material));

    //

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, -spotRadius, wallDistance));
    geometry.vertices.push(new THREE.Vector3(0, 0, spotDistance));
    geometry.vertices.push(new THREE.Vector3(0, spotRadius, wallDistance));
    spotLines.push(new THREE.Line(geometry, material));

    //

    geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(0, 0, wallDistance));
    geometry.vertices.push(new THREE.Vector3(0, 0, spotDistance));
    spotLines.push(new THREE.Line(geometry, material));

    group.add(spotLines[0], spotLines[1], spotLines[2]);

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
