/*
** Declare global variables
*/

var cylinder;
var cylinderShadow;

/*
** Add cylinder function
*/

function addCylinder()
{
    // Load cylinder normal map

    var textureLoader = new THREE.TextureLoader();
    var normalMap = textureLoader.load( "models/cylinder/cylinder_normal_map.jpg" );

    // Create cylinder metal material

    var material = new THREE.MeshPhysicalMaterial(
    {
        color: 0xF6F6F6,
        envMap: skyBox,
        metalness: 0.7,
        roughness: 0.3,
        normalMap: normalMap,
		normalScale: new THREE.Vector2(1, - 1),
    });

    // Load cylinder mesh from its obj file

    var objLoader = new THREE.OBJLoader();

    objLoader.setPath("models/cylinder/");
    objLoader.load("cylinder.obj", function ( object ) {
        cylinder = object.children[0];
        cylinder.material = material;
        cylinder.castShadow = true;
        cylinder.receiveShadow = true;
        scene.add(cylinder);
    });

    // Initialize a fake cylinder shadow

    cylinderShadow = addCylinderShadow();
    scene.add(cylinderShadow);

    return ;
}

/*
** Initialize cylinder shadow function
*/

function addCylinderShadow()
{
    // Create a cylinder shadow

    var geometry = new THREE.CylinderGeometry(36, 36, 80, 32);
    var material = new THREE.MeshBasicMaterial({color: 0x7A7A7A});    
    var shadow = new THREE.Mesh(geometry, material);
        
    // Flatten shadow geometry
        
    var euler = new THREE.Euler(halfPI, 3 *halfPI / 2, 0);
    var eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    shadow.geometry.applyMatrix(eulerMatrix);
    shadow.scale.set(1, 1, 0);

    // Set shadow position
        
    shadow.position.set(0, 0, wallDistance + 1);

    return (shadow);
}
