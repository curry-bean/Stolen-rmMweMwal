/*
**
*/

function animate()
{
    requestAnimationFrame(animate);

    // Change shadows geometry through the euler rotation matrix

    var euler = new THREE.Euler(cylinder.rotation.x, cylinder.rotation.y, cylinder.rotation.z);
    var eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    cylinderShadow.geometry.applyMatrix(eulerMatrix);

    // Write stats in console

    console.log(
        "angle = [" + Math.round(cylinder.rotation.x / PI * 180) + "°, " + Math.round(cylinder.rotation.y / PI * 180) + "°, " + Math.round(cylinder.rotation.z / PI * 180) + "°];"
    );

    renderer.render(scene, camera);
    stats.update();

    // Reset shadows geometry through the euler rotation inverse matrix

    cylinderShadow.geometry.applyMatrix(new THREE.Matrix4().getInverse(eulerMatrix));
}