/*
** Animate scene function
*/

function animScene()
{
    // Get current frame

    requestAnimationFrame(animScene);

    // Orient cylinder to look at target coordinates

    cylinder.lookAt(target);

    // Change cylinder shadow geometry using the euler rotation matrix

    var euler = new THREE.Euler(cylinder.rotation.x, cylinder.rotation.y, cylinder.rotation.z);
    var eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    cylinderShadow.geometry.applyMatrix(eulerMatrix);

    // Log cylinder orientation in console

    console.log(
        "angle = [" + Math.round(cylinder.rotation.x / PI * 180) + "°, " + Math.round(cylinder.rotation.y / PI * 180) + "°, " + Math.round(cylinder.rotation.z / PI * 180) + "°];"
    );

    // Render the scene

    renderer.render(scene, camera);

    // Reset shadows geometry using the euler rotation inverse matrix

    cylinderShadow.geometry.applyMatrix(new THREE.Matrix4().getInverse(eulerMatrix));
}
