/*
**
*/

function initWall()
{
    var geometry = new THREE.PlaneGeometry(2400, 2400, 32, 32);
    var material = new THREE.MeshPhongMaterial({emissive: 0xFFFFFF, emissiveIntensity: 0.86});

    var wall = new THREE.Mesh(geometry, material);
    wall.rotation.set(0, 0, 0);
    
    wall.position.set(0, 0, wallDistance);
    scene.add(wall);

    return ;
}
