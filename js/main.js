/*
** Declare global variables
*/

// Declare trigonometric variables

var halfPI = Math.PI / 2;
var PI = Math.PI;
var TAU = 2 * Math.PI;

// Declare window size variables

var halfWidth = window.innerWidth / 2;
var width = window.innerWidth;
var halfHeight = window.innerHeight / 2;
var height = window.innerHeight;

/*
** Declare three.js essential variables
*/

var camera = new THREE.OrthographicCamera(- halfWidth, halfWidth, halfHeight, - halfHeight, 0, 2400);
var scene = new THREE.Scene();

// Declare renderer variable

var renderer = new THREE.WebGLRenderer({antialias: true});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.gammaInput = true;
renderer.gammaOutput = true;

//

/*
var renderPass = new THREE.RenderPass(scene, camera);

var composer = new THREE.EffectComposer(renderer);
composer.setSize(width, height);
composer.addPass(renderPass);
*/

//

var container = document.getElementById("container");
container.appendChild(renderer.domElement);

//

var stats = new Stats();
container.appendChild(stats.dom);

//

initScene();
animate();
