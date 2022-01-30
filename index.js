// import * as THREE from './node_modules/three/build/three.module.js';
// import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/GLTFLoader.js";
// import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js";

var renderer, scene, camera, controls, canvas;
canvas = document.getElementById("myCanvas");

renderer = new THREE.WebGLRenderer({ canvas: myCanvas, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);

camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
scene = new THREE.Scene();
//scene.background = new THREE.Color(0xece2c6);
const loader2 = new THREE.TextureLoader();

// load a resource
loader2.load(
	// resource URL
	'texturas/cielo.jpg',

	// onLoad callback
	function ( texture ) {
		// in this example we create the material when the texture is loaded
		scene.background = texture;{
			map: texture
		 };
	},
	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);


// PIRAMIDES
//geometria
var geometryPiramide = new THREE.CylinderGeometry(0, 1, 1.25, 4); //(radius top, radius bottom, height, radial segments) See more parameters in docu
//PIRAMIDE CENTRAL load brick texture
const loader4 = new THREE.TextureLoader();
var pyramidtexture = loader4.load(
	// resource URL
  'texturas/pyramidtexture.jpg',

	// onLoad callback
	function ( pyramidtexture ) {
		//Repetir textura sobre el polígono

      pyramidtexture.wrapS = pyramidtexture.wrapT = THREE.RepeatWrapping;
      pyramidtexture.offset.set( 0, 0 );
      pyramidtexture.repeat.set( 15, 5 );
		 
	},
	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);
//material
const materialPiramide = new THREE.MeshBasicMaterial({ map: pyramidtexture });

//piramides
const piramide1 = new THREE.Mesh(geometryPiramide, materialPiramide);//centro - Kefren
const piramide2 = new THREE.Mesh(geometryPiramide, materialPiramide);//derecha - Keops
const piramide3 = new THREE.Mesh(geometryPiramide, materialPiramide);//izquierda - Micerinos

//agregar a escena
scene.add(piramide1);
piramide1.position.set(0, 0, 0);
piramide1.scale.set(2.333, 2, 2);
scene.add(piramide2);
piramide2.position.set(4, 0, 0);
piramide2.scale.set(2, 2, 2);
scene.add(piramide3);
piramide3.scale.set(0.4, 0.4, 0.4);
piramide3.position.set(-1, 0, 3.5);


//PISO
//geometria
var geometryPiso = new THREE.BoxGeometry( 40, 0.005, 50 );

// load sand texture
const loader3 = new THREE.TextureLoader();
var sandtexture = loader3.load(
	// resource URL
  'texturas/sandtexture.jpg',

	// onLoad callback
	function ( sandtexture ) {
		//Repetir textura sobre el polígono

      sandtexture.wrapS = sandtexture.wrapT = THREE.RepeatWrapping;
      sandtexture.offset.set( 0, 0 );
      sandtexture.repeat.set( 50, 40 );
		 
	},
	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);
//material
const materialPiso = new THREE.MeshBasicMaterial({ map: sandtexture});
//cubo
const piso = new THREE.Mesh(geometryPiso, materialPiso);
//agregar a escena
scene.add(piso);
piso.position.set(0, -2, 1);

//posicionar camara
camera.position.z = 5;

// //load model
var loader = new THREE.GLTFLoader();
var camel;
loader.load("./camel.glb", handel_load);

function handel_load(gltf) {
  camel = gltf.scene;
  console.log(camel.children[0]);
  camel.children[0].material = new THREE.MeshNormalMaterial();

  scene.add(camel);

  camel.position.set(2, -2, 1);
  //Camel resize
  camel.scale.set(0.1, 0.1, 0.1);
  //Camel rotation
  camel.rotation.set(0, -1.3, 0);
}

// Animate the cube
// var animate = function () {
//   requestAnimationFrame(animate);

//   //   camel.rotation.x += 0.01;
//   //   camel.rotation.y += 0.01;

//   //   renderer.render(scene, camera);
// };

//render the scene
render();



function render() {
	//animacion de giro camello
	if(camel) {
		camel.rotation.y += 0.01;
	}

  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
