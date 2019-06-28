/*
** Declare global variables
*/

// Declare window size variables

var halfWidth = window.innerWidth / 2;
var width = window.innerWidth;
var halfHeight = window.innerHeight / 2;
var height = window.innerHeight;

//

var resume = document.getElementById("resume");
var resumeButton = document.getElementById("resume-button");
var resumeActive = false;
resumeButton.addEventListener("click", onResumeButtonClick);

function onResumeButtonClick()
{
    if (!resumeActive)
    {
        resumeActive = true;
        resumeButton.innerHTML = "✕";
        resume.style.right = "0";
        return ;
    }

    resumeActive = false;
    resumeButton.innerHTML = "CV";
    resume.style.right = "-100vh";
}

// Declare container element

var container = document.getElementById("container");

/*
** Check WebGL, then initialize and animate scenes
*/

if (WEBGL.isWebGLAvailable())
{
    // Declare scene essential variables

    var camera = new THREE.OrthographicCamera(- halfWidth, halfWidth, halfHeight, - halfHeight, -800, 2400);
    var scene = new THREE.Scene();

    // Declare renderer variable

    var renderer = new THREE.WebGLRenderer({antialias: true});

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    renderer.gammaInput = true;
    renderer.gammaOutput = true;

    // Declare scene container element

    container.appendChild(renderer.domElement);

    // Initialize and animate scenes

    initScene();
    animScene();
}
else
{
    container.appendChild(WEBGL.getWebGLErrorMessage());
}

