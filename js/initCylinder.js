/*
**
*/

function initCylinder()
{
    //

    var textureLoader = new THREE.TextureLoader();
    var normalMap = textureLoader.load( "models/cylinder/cylinder_normal_map.jpg" );
    var displacementMap = textureLoader.load( "models/cylinder_displacement_map.jpg" );

    //

    var material = new THREE.MeshPhysicalMaterial(
    {
        color: 0xF6F6F6,
        envMap: skyBox,

        metalness: 0.7,
        roughness: 0.3,
        reflectivity: 0.4,

        normalMap: normalMap,
		normalScale: new THREE.Vector2(1, - 1),
      
        displacementMap: displacementMap,
		displacementScale: 0.4
    });

    //

    var objLoader = new THREE.OBJLoader();

    objLoader.setPath("models/cylinder/");
    objLoader.load("cylinder.obj", function ( object ) {
        cylinder = object.children[0];
        cylinder.material = material;
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;

        scene.add(cylinder);
    });

    cylinderShadow = initCylinderShadow();
    scene.add(cylinderShadow);

    return ;
}

/*
**
*/

function initCylinderShadow()
{
    // Create cylinder shadows

    var geometry = new THREE.CylinderGeometry(36, 36, 80, 32);
    var material = new THREE.MeshBasicMaterial({color: 0x7A7A7A});
        
    var shadow = new THREE.Mesh(geometry, material);
        
    // Flatten shadows geometry and change their position
        
    var euler = new THREE.Euler(halfPI, 3 *halfPI / 2, 0);
    var eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    shadow.geometry.applyMatrix(eulerMatrix);
        
    shadow.position.set(0, 0, wallDistance + 1);
    shadow.scale.set(1, 1, 0);

    return (shadow);
}