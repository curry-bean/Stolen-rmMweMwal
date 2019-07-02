/*
** Animate scene function
*/

function animScene()
{
    // Get current frame

    requestAnimationFrame(animScene);
    
    if (navigator.userAgent.match(/(android|iphone|ipad|blackberry|symbian|symbianos|symbos|netfront|model-orange|javaplatform|iemobile|windows phone|samsung|htc|opera mobile|opera mobi|opera mini|presto|huawei|blazer|bolt|doris|fennec|gobrowser|iris|maemo browser|mib|cldc|minimo|semc-browser|skyfire|teashark|teleca|uzard|uzardweb|meego|nokia|bb10|playbook)/gi))
    {
        cylinder.rotation.x = 0;
        cylinder.rotation.y += 0.00872;
        cylinder.rotation.z = 0;
    } 
    else
    {
        // Orient cylinder to look at target coordinates

        cylinder.lookAt(target);
    }


    // Change cylinder shadow geometry using the euler rotation matrix

    var euler = new THREE.Euler(cylinder.rotation.x, cylinder.rotation.y, cylinder.rotation.z);
    var eulerMatrix = new THREE.Matrix4().makeRotationFromEuler(euler);
    cylinderShadow.geometry.applyMatrix(eulerMatrix);

    // Render the scene

    renderer.render(scene, camera);

    // Reset shadows geometry using the euler rotation inverse matrix

    cylinderShadow.geometry.applyMatrix(new THREE.Matrix4().getInverse(eulerMatrix));
}
