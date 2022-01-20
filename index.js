var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff, 1);
document.body.appendChild( renderer.domElement );

// PIRAMIDES
//geometria
var geometryPiramide = new THREE.CylinderGeometry( 0, 2, 2, 4 );//(radius top, radius bottom, height, radial segments) See more parameters in docu
//material
const materialPiramide = new THREE.MeshBasicMaterial( {color: 0xCDAA6D} );

//piramides
const piramide1 = new THREE.Mesh( geometryPiramide, materialPiramide );
const piramide2 = new THREE.Mesh( geometryPiramide, materialPiramide );
const piramide3 = new THREE.Mesh( geometryPiramide, materialPiramide );

//agregar a escena
scene.add( piramide1 );
piramide1.position.set(0,0,0);
scene.add( piramide2 );
piramide2.position.set(4,0,0);
scene.add( piramide3 );
piramide3.position.set(-4,0,0);

camera.position.z = 5;

//Render the scene
var animate = function () {
	requestAnimationFrame( animate );

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;

	renderer.render( scene, camera );
};

animate();