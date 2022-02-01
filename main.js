import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Camera –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//locate camera
camera.position.setX(-55);
camera.position.setY(15);
camera.position.setZ(60);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

//controls
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
renderer.shadowMap.enabled = true;

// //torus
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus)

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Lights –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//point light
const pointLigth = new THREE.PointLight(0xffffff, 1, 100);
pointLigth.position.set(0, 15, 0);

//Directional Light
// const directionalLight = new THREE.DirectionalLight(0xff0000, 1);
// directionalLight.position.set(0, 30, 10);
// directionalLight.rotateOnAxis(new THREE.Vector3(1, 0, 0), 1);
// directionalLight.castShadow = true;
// directionalLight.shadow.mapSize.width = 2048;
// directionalLight.shadow.mapSize.height = 2048;
// directionalLight.shadow.camera.near = 0.5;
// directionalLight.shadow.camera.far = 500;

// scene.add(directionalLight);

//ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Helpers –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//light helper
// const lightHelper = new THREE.PointLightHelper(pointLigth);

//direcionalight helper
// const directHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
// scene.add(directHelper);

//grid helper
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);
// scene.add(lightHelper, gridHelper);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Sky –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//load sky background
const loaderBackgroud = new THREE.TextureLoader();
loaderBackgroud.load(
  // resource URL
  "texturas/cielo.jpg",

  // onLoad callback
  function (texture) {
    // in this example we create the material when the texture is loaded
    scene.background = texture;
    {
      map: texture;
    }
  },
  // onError callback
  function (err) {
    console.error("An error happened.");
  }
);

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––Piso–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//floor geometry
const geometryPiso = new THREE.BoxGeometry(200, 0.005, 200);

//floor material
const loaderSandTexture = new THREE.TextureLoader();
var sandtexture = loaderSandTexture.load(
  // resource URL
  "texturas/sandtexture.jpg",

  // onLoad callback
  function (sandtexture) {
    //Repetir textura sobre el polígono

    sandtexture.wrapS = sandtexture.wrapT = THREE.RepeatWrapping;
    sandtexture.offset.set(0, 0);
    sandtexture.repeat.set(50, 40);
  },
  // onError callback
  function (err) {
    console.error("An error happened.");
  }
);

const materialPiso = new THREE.MeshStandardMaterial({ map: sandtexture });
const piso = new THREE.Mesh(geometryPiso, materialPiso);
piso.position.set(0, -1, 0);
piso.receiveShadow = true;
scene.add(piso);

//–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––Pyramids–––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//Create pyramids

// pyramids geometry
var geometryPiramide2 = new THREE.CylinderGeometry(0, 25, 25, 4); //(radius top, radius bottom, height, radial segments) See more parameters in docu
var geometryPiramide = new THREE.CylinderGeometry(0, 14, 14, 4); //(radius top, radius bottom, height, radial segments) See more parameters in docu
var geometryPiramide3 = new THREE.CylinderGeometry(0, 16, 16, 4); //(radius top, radius bottom, height, radial segments) See more parameters in docu

//load pyramid texture
const loaderPyramidTexture = new THREE.TextureLoader();
var pyramidtexture = loaderPyramidTexture.load(
  // resource URL
  "texturas/pyramidtexture.jpg",

  // onLoad callback
  function (pyramidtexture) {
    //Repetir textura sobre el polígono

    pyramidtexture.wrapS = pyramidtexture.wrapT = THREE.RepeatWrapping;
    pyramidtexture.offset.set(0, 0);
    pyramidtexture.repeat.set(20, 7);
  },
  // onError callback
  function (err) {
    console.error("An error happened.");
  }
);

//Material for pyramid
const materialPiramide = new THREE.MeshBasicMaterial({ map: pyramidtexture });

//Create pyramids
const piramide1 = new THREE.Mesh(geometryPiramide2, materialPiramide);
const piramide2 = new THREE.Mesh(geometryPiramide, materialPiramide);
const piramide3 = new THREE.Mesh(geometryPiramide3, materialPiramide);

//Add pyramids to scene
scene.add(piramide1);
piramide1.position.set(0, 12.5, -15);
scene.add(piramide2);
piramide2.position.set(35, 7, -23);
scene.add(piramide3);
piramide3.position.set(-30, 7, 0);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Nubes –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load cloud texture
const loaderCloudTexture = new THREE.TextureLoader();
var cloudTexture = loaderCloudTexture.load(
  // resource URL
  "texturas/nube.jpg",

  // onLoad callback
  function (cloudTexture) {
    //Repetir textura sobre el polígono

    cloudTexture.wrapS = cloudTexture.wrapT = THREE.RepeatWrapping;
    cloudTexture.offset.set(0, 0);
    cloudTexture.repeat.set(20, 7);
  },
  // onError callback
  function (err) {
    console.error("An error happened.");
  }
);

//load cloud model
var loaderCloud = new GLTFLoader();

//generate clouds
var cloud1 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud);
var cloud2 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud2);
var cloud3 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud3);
var cloud4 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud4);
var cloud5 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud5);
var cloud6 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud6);
var cloud7 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud7);
var cloud8 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud8);
var cloud9 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud9);
var cloud10 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud10);
var cloud11 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud11);
var cloud12 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud12);
var cloud13 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud13);
var cloud14 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud14);
var cloud15 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud15);
var cloud16 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud16);
var cloud17 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud17);
var cloud18 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud18);
var cloud19 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud19);
var cloud20 = loaderCloud.load("./models/cloud1.glb", handel_loadCloud20);

//Import clouds

function handel_loadCloud(gltf) {
  cloud1 = gltf.scene;
  // console.log(cloud1.children[0]);
  cloud1.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud1.castShadow = true;
  scene.add(cloud1);

  cloud1.position.set(-100, 25, -25);
  cloud1.scale.set(3, 3, 3);
  cloud1.rotation.set(0, 0, 0);
}

function handel_loadCloud2(gltf) {
  cloud2 = gltf.scene;
  // console.log(cloud2.children[0]);
  cloud2.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud2.castShadow = true;
  scene.add(cloud2);

  cloud2.position.set(-80, 35, -35);
  cloud2.scale.set(3, 3, 3);
  cloud2.rotation.set(0, 0, 0);
}

function handel_loadCloud3(gltf) {
  cloud3 = gltf.scene;
  // console.log(cloud3.children[0]);
  cloud3.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud3.castShadow = true;
  scene.add(cloud3);

  cloud3.position.set(-120, 45, -80);
  cloud3.scale.set(3, 3, 3);
  cloud3.rotation.set(0, 0, 0);
}

function handel_loadCloud4(gltf) {
  cloud4 = gltf.scene;
  // console.log(cloud4.children[0]);
  cloud4.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud4.castShadow = true;
  scene.add(cloud4);

  cloud4.position.set(-90, 15, 20);
  cloud4.scale.set(3, 3, 3);
  cloud4.rotation.set(0, 0, 0);
}

function handel_loadCloud5(gltf) {
  cloud5 = gltf.scene;
  // console.log(cloud5.children[0]);
  cloud5.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud5.castShadow = true;
  scene.add(cloud5);

  cloud5.position.set(-120, 20, -75);
  cloud5.scale.set(3, 3, 3);
  cloud5.rotation.set(0, 0, 0);
}

function handel_loadCloud6(gltf) {
  cloud6 = gltf.scene;
  // console.log(cloud6.children[0]);
  cloud6.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud6.castShadow = true;
  scene.add(cloud6);

  cloud6.position.set(-95, 15, -55);
  cloud6.scale.set(3, 3, 3);
  cloud6.rotation.set(0, 0, 0);
}

function handel_loadCloud7(gltf) {
  cloud7 = gltf.scene;
  // console.log(cloud7.children[0]);
  cloud7.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud7.castShadow = true;
  scene.add(cloud7);

  cloud7.position.set(-110, 30, -15);
  cloud7.scale.set(3, 3, 3);
  cloud7.rotation.set(0, 0, 0);
}

function handel_loadCloud8(gltf) {
  cloud8 = gltf.scene;
  // console.log(cloud8.children[0]);
  cloud8.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud8.castShadow = true;
  scene.add(cloud8);

  cloud8.position.set(-130, 25, -60);
  cloud8.scale.set(3, 3, 3);
  cloud8.rotation.set(0, 0, 0);
}

function handel_loadCloud9(gltf) {
  cloud9 = gltf.scene;
  // console.log(cloud9.children[0]);
  cloud9.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud9.castShadow = true;
  scene.add(cloud9);

  cloud9.position.set(-120, 20, -25);
  cloud9.scale.set(3, 3, 3);
  cloud9.rotation.set(0, 0, 0);
}

function handel_loadCloud10(gltf) {
  cloud10 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud10.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud10.castShadow = true;
  scene.add(cloud10);

  cloud10.position.set(-130, 30, -40);
  cloud10.scale.set(3, 3, 3);
  cloud10.rotation.set(0, 0, 0);
}

function handel_loadCloud11(gltf) {
  cloud11 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud11.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud11.castShadow = true;
  scene.add(cloud11);

  cloud11.position.set(0, 30, -40);
  cloud11.scale.set(3, 3, 3);
  cloud11.rotation.set(0, 0, 0);
}

function handel_loadCloud12(gltf) {
  cloud12 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud12.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud12.castShadow = true;
  scene.add(cloud12);

  cloud12.position.set(-40, 30, -40);
  cloud12.scale.set(3, 3, 3);
  cloud12.rotation.set(0, 0, 0);
}

function handel_loadCloud13(gltf) {
  cloud13 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud13.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud13.castShadow = true;
  scene.add(cloud13);

  cloud13.position.set(-20, 30, -70);
  cloud13.scale.set(3, 3, 3);
  cloud13.rotation.set(0, 0, 0);
}

function handel_loadCloud14(gltf) {
  cloud14 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud14.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud14.castShadow = true;
  scene.add(cloud14);

  cloud14.position.set(20, 50, -40);
  cloud14.scale.set(3, 3, 3);
  cloud14.rotation.set(0, 0, 0);
}

function handel_loadCloud15(gltf) {
  cloud15 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud15.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud15.castShadow = true;
  scene.add(cloud15);

  cloud15.position.set(20, 30, 10);
  cloud15.scale.set(3, 3, 3);
  cloud15.rotation.set(0, 0, 0);
}

function handel_loadCloud16(gltf) {
  cloud16 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud16.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud16.castShadow = true;
  scene.add(cloud16);

  cloud16.position.set(-10, 15, 20);
  cloud16.scale.set(3, 3, 3);
  cloud16.rotation.set(0, 0, 0);
}

function handel_loadCloud17(gltf) {
  cloud17 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud17.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud17.castShadow = true;
  scene.add(cloud17);

  cloud17.position.set(30, 40, -40);
  cloud17.scale.set(3, 3, 3);
  cloud17.rotation.set(0, 0, 0);
}

function handel_loadCloud18(gltf) {
  cloud18 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud18.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud18.castShadow = true;
  scene.add(cloud18);

  cloud18.position.set(60, 30, 20);
  cloud18.scale.set(3, 3, 3);
  cloud18.rotation.set(0, 0, 0);
}

function handel_loadCloud19(gltf) {
  cloud19 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud19.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud19.castShadow = true;
  scene.add(cloud19);

  cloud19.position.set(-40, 20, 10);
  cloud19.scale.set(3, 3, 3);
  cloud19.rotation.set(0, 0, 0);
}

function handel_loadCloud20(gltf) {
  cloud20 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud20.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });
  cloud20.castShadow = true;
  scene.add(cloud20);

  cloud20.position.set(20, 20, -40);
  cloud20.scale.set(3, 3, 3);
  cloud20.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Camello –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load model
const loaderCamello = new GLTFLoader();
var camel;
loaderCamello.load("./models/camel.glb", handel_load);

function handel_load(gltf) {
  camel = gltf.scene;
  console.log(camel.children[0]);
  camel.children[0].material = new THREE.MeshBasicMaterial({});

  scene.add(camel);
  camel.castShadow = true;

  camel.position.set(-20, 0, 30);
  //Camel resize
  camel.scale.set(0.5, 0.5, 0.5);
  //Camel rotation
  camel.rotation.set(0, 0.5, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Esfinge –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load model
const loaderSphinx = new GLTFLoader();
var esfinge;
loaderSphinx.load("./models/scene.gltf", handel_loadSphinx);
function handel_loadSphinx(gltf) {
  esfinge = gltf.scene;
  console.log(esfinge.children[0]);
  esfinge.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });

  scene.add(esfinge);
  gltf.scene.scale.set(0.8, 0.8, 0.8);

  esfinge.position.set(-4, 5, 30);
  //Camel resize
  //   camel.scale.set(0.1, 0.1, 0.1);
  //Camel rotation
  esfinge.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Oasis –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load oasis model
const loaderOasis = new GLTFLoader();
var oasis;
loaderOasis.load("./models/egyptian_oasis/oasis.gltf", handel_loadOasis);

function handel_loadOasis(gltf) {
  oasis = gltf.scene;
  // console.log(oasis.children[0]);
  oasis.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });

  scene.add(oasis);
  gltf.scene.scale.set(0.007, 0.007, 0.007);

  oasis.position.set(-50, 0, 30);
  //Camel resize
  //   camel.scale.set(0.1, 0.1, 0.1);
  //Camel rotation
  oasis.rotation.set(0, 5, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Astronomer –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load astronomer model
const loaderAstronomer = new GLTFLoader();
var astronomer;
loaderAstronomer.load("./models/egyptian_astronomer/scene.gltf", handel_loadAstronomer);

function handel_loadAstronomer(gltf) {
  astronomer = gltf.scene;
  // console.log(astronomer.children[0]);
  astronomer.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });

  scene.add(astronomer);
  gltf.scene.scale.set(.1, .1, .1);

  astronomer.position.set(80, 0, 0);
  //Camel resize
  //   camel.scale.set(0.1, 0.1, 0.1);
  //Camel rotation
  astronomer.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Temples –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load astronomer model
const loaderTemples = new GLTFLoader();
var temples;
loaderTemples.load("./models/egyptian_temples/scene.gltf", handel_loadTemples);

function handel_loadTemples(gltf) {
  temples = gltf.scene;
  // console.log(astronomer.children[0]);
  temples.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });

  scene.add(temples);
  gltf.scene.scale.set(.015, .015, .015);

  temples.position.set(0, 0, -70);
  //Camel resize
  //   camel.scale.set(0.1, 0.1, 0.1);
  //Camel rotation
  temples.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Portal –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load astronomer model
const loaderPortal = new GLTFLoader();
var portal;
loaderPortal.load("./models/egyptian_portal/scene.gltf", handel_loadPorta);

function handel_loadPorta(gltf) {
  portal = gltf.scene;
  // console.log(astronomer.children[0]);
  portal.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });

  scene.add(portal);
  gltf.scene.scale.set(.015, .015, .015);

  portal.position.set(-59, 0, 35);
  //Camel resize
  //   camel.scale.set(0.1, 0.1, 0.1);
  //Camel rotation
  portal.rotation.set(0, 3.5, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Village –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load astronomer model
const loaderVillage = new GLTFLoader();
var village;
loaderVillage.load("./models/dae_villages__ancient_egyptian_scroll_maker/scene.gltf", handel_loadVillage);

function handel_loadVillage(gltf) {
  village = gltf.scene;
  // console.log(astronomer.children[0]);
  village.children[0].material = new THREE.MeshBasicMaterial({
    map: cloudTexture,
  });

  scene.add(village);
  gltf.scene.scale.set(.008, .008, .008);

  village.position.set(80, 0, 20);
  //Camel resize
  //   camel.scale.set(0.1, 0.1, 0.1);
  //Camel rotation
  village.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Rendering –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//Render Animation
function animate() {
  requestAnimationFrame(animate);
  // torus.rotation.x += 0.01;
  // torus.rotation.y += 0.005;
  // torus.rotation.z += 0.01;
  render();
}
//animate
animate();

//render scene
render();
//funciton to render scene
function render() {
  // requestAnimationFrame(renderer);
  controls.update();

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Clouds Rendering –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

  if (cloud1) {
    //relocate clouds
    //randomize cloud position between -150 and -100 if it is above of 120
    if (cloud1.position.x > 120) {
      cloud1.position.x = -110;
    }
    cloud1.position.x += 0.05;
  }
  if (cloud2) {
    if (cloud2.position.x > 120) {
      cloud2.position.x = -110;
    }
    cloud2.position.x += 0.08;
  }
  if (cloud3) {
    if (cloud3.position.x > 120) {
      cloud3.position.x = -110;
    }
    cloud3.position.x += 0.09;
  }
  if (cloud4) {
    if (cloud4.position.x > 120) {
      cloud4.position.x = -110;
    }
    cloud4.position.x += 0.06;
  }
  if (cloud5) {
    if (cloud5.position.x > 120) {
      cloud5.position.x = -110;
    }
    cloud5.position.x += 0.05;
  }
  if (cloud6) {
    if (cloud6.position.x > 120) {
      cloud6.position.x = -110;
    }
    cloud6.position.x += 0.04;
  }
  if (cloud7) {
    if (cloud7.position.x > 120) {
      cloud7.position.x = -110;
    }
    cloud7.position.x += 0.08;
  }
  if (cloud8) {
    if (cloud8.position.x > 120) {
      cloud8.position.x = -110;
    }
    cloud8.position.x += 0.1;
  }
  if (cloud9) {
    if (cloud9.position.x > 120) {
      cloud9.position.x = -110;
    }
    cloud9.position.x += 0.05;
  }
  if (cloud10) {
    if (cloud10.position.x > 120) {
      cloud10.position.x = -110;
    }
    cloud10.position.x += 0.06;
  }
  if (cloud11) {
    if (cloud11.position.x > 120) {
      cloud11.position.x = -110;
    }
    cloud11.position.x += 0.1;
  }
  if (cloud12) {
    if (cloud12.position.x > 120) {
      cloud12.position.x = -110;
    }
    cloud12.position.x += 0.04;
  }
  if (cloud13) {
    if (cloud13.position.x > 120) {
      cloud13.position.x = -110;
    }
    cloud13.position.x += 0.08;
  }
  if (cloud14) {
    if (cloud14.position.x > 120) {
      cloud14.position.x = -110;
    }
    cloud14.position.x += 0.1;
  }
  if (cloud15) {
    if (cloud15.position.x > 120) {
      cloud15.position.x = -110;
    }
    cloud15.position.x += 0.02;
  }
  if (cloud16) {
    if (cloud16.position.x > 120) {
      cloud16.position.x = -110;
    }
    cloud16.position.x += 0.08;
  }
  if (cloud17) {
    if (cloud17.position.x > 120) {
      cloud17.position.x = -110;
    }
    cloud17.position.x += 0.02;
  }
  if (cloud18) {
    if (cloud18.position.x > 120) {
      cloud18.position.x = -110;
    }
    cloud18.position.x += 0.1;
  }
  if (cloud19) {
    if (cloud19.position.x > 120) {
      cloud19.position.x = -110;
    }
    cloud19.position.x += 0.05;
  }
  if (cloud20) {
    if (cloud20.position.x > 120) {
      cloud20.position.x = -110;
    }
    cloud20.position.x += 0.06;
  }

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Clouds Rendering –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
  if (camel) {
    // camel.rotation.y += 0.02;
  }

  renderer.render(scene, camera);
}
