/*
** Declare global variables
*/

// Declare window size variables

var halfWidth = window.innerWidth / 2;
var width = window.innerWidth;
var halfHeight = window.innerHeight / 2;
var height = window.innerHeight;

//

var french = false;
var demoreelButton = document.getElementById("demoreel-button-en");
var resumeButton = document.getElementById("resume-button-en");

var flagEn = document.getElementById("flag-en");
var flagFr = document.getElementById("flag-fr");

var frenchClasses = document.querySelectorAll('.fr');
var englishClasses = document.querySelectorAll('.en');

flagFr.addEventListener("click", function() {
    french = true;
    
    var i = -1;
    while (++i < frenchClasses.length)
    {
        englishClasses[i].style.display = "none";
        frenchClasses[i].style.display = "initial";
    }
});
flagEn.addEventListener("click", function() {
    french = false;
    
    var i = -1;
    while (++i < englishClasses.length)
    {
        frenchClasses[i].style.display = "none";
        englishClasses[i].style.display = "initial";
    }
});

var demoreel = document.getElementById("reel");
var resume = document.getElementById("resume");
var closeButton = document.getElementById("close-button");
var opacityFilter = document.getElementById("opacity-filter");

resumeButton.addEventListener("click", onResumeButtonClick);
demoreelButton.addEventListener("click", onDemoreelButtonClick);
closeButton.addEventListener("click", onCloseButtonClick);
opacityFilter.addEventListener("click", onCloseButtonClick);

function onResumeButtonClick()
{
    resume.style.transform = "translateX(0%)";
    resume.style.boxShadow = "0rem 0rem 2.4rem 0rem var(--shadow-color)";
    closeButton.style.pointerEvents = "initial";
    closeButton.style.opacity = "1";
    closeButton.style.lineHeight = "2.125rem";
    opacityFilter.style.pointerEvents = "initial";
    opacityFilter.style.opacity = "1";

    return ;
}

function onDemoreelButtonClick()
{
    demoreel.style.transform = "translateY(0%)";
    closeButton.style.pointerEvents = "initial";
    closeButton.style.opacity = "1";
    closeButton.style.lineHeight = "2.125rem";
    opacityFilter.style.pointerEvents = "initial";
    opacityFilter.style.opacity = "1";

    return ;
}

function onCloseButtonClick()
{
    resume.style.transform = "translateX(100%)";
    resume.style.boxShadow = "0rem 0rem 0rem 0rem var(--shadow-color)";
    demoreel.style.transform = "translateY(100%)";
    closeButton.style.pointerEvents = "none";
    closeButton.style.opacity = "0";
    closeButton.style.lineHeight = "5.25rem";
    opacityFilter.style.pointerEvents = "none";
    opacityFilter.style.opacity = "0";
}

// Declare container element

var container = document.getElementById("container");

// Declare scene essential variables

var camera = new THREE.OrthographicCamera(- halfWidth, halfWidth, halfHeight, - halfHeight, -800, 2400);
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xFF0000);

// Declare renderer variable

var renderer = new THREE.WebGLRenderer({antialias: true});

/*
** Check WebGL, then initialize and animate scenes
*/

/*
if (WEBGL.isWebGLAvailable())
{
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
*/


