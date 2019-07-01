/*
** Declare global variables
*/

// Declare window size variables

var halfWidth = window.innerWidth / 2;
var width = window.innerWidth;
var halfHeight = window.innerHeight / 2;
var height = window.innerHeight;

/*
** TODO
*/

document.addEventListener("DOMContentLoaded", function() {
    // Init HTML interactions

    interact();
    translate();

    // Declare container element

    container = document.getElementById("container");

    // Declare scene essential variables

    camera = new THREE.OrthographicCamera(- halfWidth, halfWidth, halfHeight, - halfHeight, -800, 2400);
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFF0000);

    // Declare renderer variable

    renderer = new THREE.WebGLRenderer({antialias: true});

    // Check WebGL, then initialize and animate scenes

    if (WEBGL.isWebGLAvailable())
    {
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);

        renderer.gammaInput = true;
        renderer.gammaOutput = true;

        // Declare scene container element

        container.appendChild(renderer.domElement);

        // Initialize and animate scenes

        initScene(camera, scene);
        animScene();
    }
    else
    {
        container.appendChild(WEBGL.getWebGLErrorMessage());
    }
})

// document.addEventListener("DOMContentLoaded", runScene)