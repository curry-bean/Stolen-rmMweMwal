/*
** Animate scene function
*/

function animScene()
{
    // Get current frame

    requestAnimationFrame(animScene);

    // Change cylinder shadow geometry using the euler rotation matrix

    var euler = new THREE.Euler(cylinder.rotation.x, cylinder.rotation.y, cylinder.rotation.z);
    var eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    cylinderShadow.geometry.applyMatrix(eulerMatrix);

    // Render the scene

    renderer.render(scene, camera);

    // Reset shadows geometry using the euler rotation inverse matrix

    cylinderShadow.geometry.applyMatrix(new THREE.Matrix4().getInverse(eulerMatrix));
}
