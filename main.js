// import css
import "./style.css";
//import three functions
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";
import { AmbientLight } from "three";
// import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';

//build the scene
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

//conguration of the renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffffff, 1);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;

// //torus
// const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus)

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Lights –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//point light
const pointLigth = new THREE.PointLight(0xff0000, 1, 100);
pointLigth.position.set(0, 30, 0);
scene.add(pointLigth);

//ambient light
const ambientLight = new THREE.AmbientLight(0x121291, 4);

//hemispherial light
const hemispheriallight = new THREE.HemisphereLight(0xfb9062, 0xfad6a5, 3);
scene.add(hemispheriallight);

//Spotlight - SUN
const spotLight = new THREE.SpotLight(0xf4e99b, 3);
//Add shadows to the objects
spotLight.castShadow = true;
spotLight.shadow.bias = -0.0001;
spotLight.shadow.mapSize.width = 1024 * 4;
spotLight.shadow.mapSize.height = 1024 * 4;
scene.add(spotLight);
spotLight.position.set(0, 100, 0);

//Build Gui
class ColorGUIHelper {
  constructor(object, prop) {
    this.object = object;
    this.prop = prop;
  }
  get value() {
    return `#${this.object[this.prop].getHexString()}`;
  }
  set value(hexString) {
    this.object[this.prop].set(hexString);
  }
}

const color = 0xffffff;
const intensity = 1;
const gui = new GUI();
gui.addColor(new ColorGUIHelper(spotLight, "color"), "value").name("color");
gui.add(spotLight, "intensity", 0, 20, 0.01);

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Helpers –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//light helper
// const lightHelper = new THREE.PointLightHelper(pointLigth);

// direcionalight helper
// const directHelper = new THREE.SpotLightHelper(spotLight, 5);
// scene.add(directHelper);

//grid helper
// const gridHelper = new THREE.GridHelper(200, 10);
// scene.add(gridHelper);
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
const geometryPiso = new THREE.BoxGeometry(105, 0.005, 125);

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
// build floor with configuration
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
const materialPiramide = new THREE.MeshPhongMaterial({ map: pyramidtexture });

//Create pyramids
const piramide1 = new THREE.Mesh(geometryPiramide2, materialPiramide);
const piramide2 = new THREE.Mesh(geometryPiramide, materialPiramide);
const piramide3 = new THREE.Mesh(geometryPiramide3, materialPiramide);

//Shadows
piramide1.receiveShadow = true;
piramide1.castShadow = true;
piramide2.receiveShadow = true;
piramide2.castShadow = true;
piramide3.receiveShadow = true;
piramide3.castShadow = true;

//Add pyramids to scene
scene.add(piramide1);
piramide1.position.set(0, 12.5, -5);
scene.add(piramide2);
piramide2.position.set(35, 7, -13);
scene.add(piramide3);
piramide3.position.set(-30, 7, 10);

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
  cloud1.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud1.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud1);

  cloud1.position.set(-100, 25, -25);
  cloud1.scale.set(3, 3, 3);
  cloud1.rotation.set(0, 0, 0);
}

function handel_loadCloud2(gltf) {
  cloud2 = gltf.scene;
  // console.log(cloud2.children[0]);
  cloud2.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud2.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud2);

  cloud2.position.set(-80, 35, -35);
  cloud2.scale.set(3, 3, 3);
  cloud2.rotation.set(0, 0, 0);
}

function handel_loadCloud3(gltf) {
  cloud3 = gltf.scene;
  // console.log(cloud3.children[0]);
  cloud3.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud3.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud3);

  cloud3.position.set(-120, 45, -80);
  cloud3.scale.set(3, 3, 3);
  cloud3.rotation.set(0, 0, 0);
}

function handel_loadCloud4(gltf) {
  cloud4 = gltf.scene;
  // console.log(cloud4.children[0]);
  cloud4.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud4.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud4);

  cloud4.position.set(-90, 15, 20);
  cloud4.scale.set(3, 3, 3);
  cloud4.rotation.set(0, 0, 0);
}

function handel_loadCloud5(gltf) {
  cloud5 = gltf.scene;
  // console.log(cloud5.children[0]);
  cloud5.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud5.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud5);

  cloud5.position.set(-120, 20, -75);
  cloud5.scale.set(3, 3, 3);
  cloud5.rotation.set(0, 0, 0);
}

function handel_loadCloud6(gltf) {
  cloud6 = gltf.scene;
  // console.log(cloud6.children[0]);
  cloud6.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud6.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud6);

  cloud6.position.set(-95, 15, -55);
  cloud6.scale.set(3, 3, 3);
  cloud6.rotation.set(0, 0, 0);
}

function handel_loadCloud7(gltf) {
  cloud7 = gltf.scene;
  // console.log(cloud7.children[0]);
  cloud7.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud7.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud7);

  cloud7.position.set(-110, 30, -15);
  cloud7.scale.set(3, 3, 3);
  cloud7.rotation.set(0, 0, 0);
}

function handel_loadCloud8(gltf) {
  cloud8 = gltf.scene;
  // console.log(cloud8.children[0]);
  cloud8.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud8.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud8);

  cloud8.position.set(-130, 25, -60);
  cloud8.scale.set(3, 3, 3);
  cloud8.rotation.set(0, 0, 0);
}

function handel_loadCloud9(gltf) {
  cloud9 = gltf.scene;
  // console.log(cloud9.children[0]);
  cloud9.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud9.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud9);

  cloud9.position.set(-120, 20, -25);
  cloud9.scale.set(3, 3, 3);
  cloud9.rotation.set(0, 0, 0);
}

function handel_loadCloud10(gltf) {
  cloud10 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud10.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud10.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud10);

  cloud10.position.set(-130, 30, -40);
  cloud10.scale.set(3, 3, 3);
  cloud10.rotation.set(0, 0, 0);
}

function handel_loadCloud11(gltf) {
  cloud11 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud11.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud11.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud11);

  cloud11.position.set(0, 30, -40);
  cloud11.scale.set(3, 3, 3);
  cloud11.rotation.set(0, 0, 0);
}

function handel_loadCloud12(gltf) {
  cloud12 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud12.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud12.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud12);

  cloud12.position.set(-40, 30, -40);
  cloud12.scale.set(3, 3, 3);
  cloud12.rotation.set(0, 0, 0);
}

function handel_loadCloud13(gltf) {
  cloud13 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud13.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud13.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud13);

  cloud13.position.set(-20, 30, -70);
  cloud13.scale.set(3, 3, 3);
  cloud13.rotation.set(0, 0, 0);
}

function handel_loadCloud14(gltf) {
  cloud14 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud14.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud14.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud14);

  cloud14.position.set(20, 50, -40);
  cloud14.scale.set(3, 3, 3);
  cloud14.rotation.set(0, 0, 0);
}

function handel_loadCloud15(gltf) {
  cloud15 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud15.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud15.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud15);

  cloud15.position.set(20, 30, 10);
  cloud15.scale.set(3, 3, 3);
  cloud15.rotation.set(0, 0, 0);
}

function handel_loadCloud16(gltf) {
  cloud16 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud16.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud16.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud16);

  cloud16.position.set(-10, 15, 20);
  cloud16.scale.set(3, 3, 3);
  cloud16.rotation.set(0, 0, 0);
}

function handel_loadCloud17(gltf) {
  cloud17 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud17.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud17.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud17);

  cloud17.position.set(30, 40, -40);
  cloud17.scale.set(3, 3, 3);
  cloud17.rotation.set(0, 0, 0);
}

function handel_loadCloud18(gltf) {
  cloud18 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud18.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud18.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud18);

  cloud18.position.set(60, 30, 20);
  cloud18.scale.set(3, 3, 3);
  cloud18.rotation.set(0, 0, 0);
}

function handel_loadCloud19(gltf) {
  cloud19 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud19.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud19.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud19);

  cloud19.position.set(-40, 20, 10);
  cloud19.scale.set(3, 3, 3);
  cloud19.rotation.set(0, 0, 0);
}

function handel_loadCloud20(gltf) {
  cloud20 = gltf.scene;
  // console.log(cloud10.children[0]);
  cloud20.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  cloud20.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(cloud20);

  cloud20.position.set(20, 20, -40);
  cloud20.scale.set(3, 3, 3);
  cloud20.rotation.set(0, 0, 0);
}
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Esfinge –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load model sphynx
const loaderSphinx = new GLTFLoader();
var esfinge;
loaderSphinx.load("./models/scene.gltf", handel_loadSphinx);
function handel_loadSphinx(gltf) {
  esfinge = gltf.scene;
  console.log(esfinge.children[0]);
  esfinge.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  esfinge.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  // Add sphyx to scene
  scene.add(esfinge);
  //Sphynx configuration
  gltf.scene.scale.set(0.5, 0.5, 0.5);
  esfinge.position.set(-3, 2, 30);
  esfinge.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Oasis –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//Construcción a la izquierda de las pirámides
//load oasis model
const loaderOasis = new GLTFLoader();
var oasis;
loaderOasis.load("./models/egyptian_oasis/oasis.gltf", handel_loadOasis);

function handel_loadOasis(gltf) {
  oasis = gltf.scene;
  // console.log(oasis.children[0]);
  oasis.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  oasis.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(oasis);
  gltf.scene.scale.set(0.005, 0.005, 0.005);

  oasis.position.set(-40, 0, 30);
  oasis.rotation.set(0, 5, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Astronomer –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load astronomer model
const loaderAstronomer = new GLTFLoader();
var astronomer;
loaderAstronomer.load(
  "./models/egyptian_astronomer/scene.gltf",
  handel_loadAstronomer
);

function handel_loadAstronomer(gltf) {
  astronomer = gltf.scene;
  // console.log(astronomer.children[0]);
  astronomer.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  astronomer.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add astronomer to scene with configuration
  scene.add(astronomer);
  gltf.scene.scale.set(0.09, 0.09, 0.09);
  astronomer.position.set(40, 0, 10);
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
  temples.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  temples.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add astronomer to scene with configuration
  scene.add(temples);
  gltf.scene.scale.set(0.015, 0.015, 0.015);
  temples.position.set(0, 0, -45);
  temples.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Portal –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load portal model
const loaderPortal = new GLTFLoader();
var portal;
loaderPortal.load("./models/egyptian_portal/scene.gltf", handel_loadPorta);

function handel_loadPorta(gltf) {
  portal = gltf.scene;
  // console.log(portal.children[0]);
  portal.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  portal.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add portal to scene with configuration
  scene.add(portal);
  gltf.scene.scale.set(0.01, 0.01, 0.01);
  portal.position.set(-45, 0, 35);
  portal.rotation.set(0, 3.5, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Village –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//

//load village model
const loaderVillage = new GLTFLoader();
var village;
loaderVillage.load(
  "./models/dae_villages__ancient_egyptian_scroll_maker/scene.gltf",
  handel_loadVillage
);

function handel_loadVillage(gltf) {
  village = gltf.scene;
  // console.log(village.children[0]);
  village.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  village.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add village to scene with configuration
  scene.add(village);
  gltf.scene.scale.set(0.007, 0.007, 0.007);
  village.position.set(40, 0, 30);
  village.rotation.set(0, 0, 0);
}

//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Palms –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//load palm model
const loaderPalm = new GLTFLoader();
var palm1 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm);
var palm2 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm2);
var palm3 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm3);
var palm4 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm4);
var palm5 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm5);
var palm6 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm6);
var palm7 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm7);
var palm8 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm8);
var palm9 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm9);
var palm10 = loaderPalm.load("./models/palm/scene.gltf", handel_loadPalm10);

function handel_loadPalm(gltf) {
  palm1 = gltf.scene;
  // console.log(palm1.children[0]);
  palm1.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  palm1.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(palm1);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm1.position.set(-48, 0, 40);
  palm1.rotation.set(0, 0, 0);
}

function handel_loadPalm2(gltf) {
  palm2 = gltf.scene;
  // console.log(astronomer.children[0]);
  palm2.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  palm2.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm2);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm2.position.set(-49, 0, 45);
  palm2.rotation.set(0, 0, 0);
}

function handel_loadPalm3(gltf) {
  palm3 = gltf.scene;
  palm3.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  palm3.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  scene.add(palm3);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm3.position.set(45, 0, 15);
  palm3.rotation.set(0, 0, 0);
}

function handel_loadPalm4(gltf) {
  palm4 = gltf.scene;
  palm4.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  palm4.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm4);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm4.position.set(45, 0, 20);
  palm4.rotation.set(0, 0, 0);
}

function handel_loadPalm5(gltf) {
  palm5 = gltf.scene;
  palm5.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });
  palm5.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm5);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm5.position.set(45, 0, 25);
  palm5.rotation.set(0, 0, 0);
}

function handel_loadPalm6(gltf) {
  palm6 = gltf.scene;
  palm6.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });

  palm6.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm6);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm6.position.set(-50, 0, -55);
  palm6.rotation.set(0, 0, 0);
}

function handel_loadPalm7(gltf) {
  palm7 = gltf.scene;
  palm7.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });

  palm7.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm7);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm7.position.set(-49, 0, -50);
  palm7.rotation.set(0, 0, 0);
}

function handel_loadPalm8(gltf) {
  palm8 = gltf.scene;
  palm8.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });

  palm8.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm8);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm8.position.set(-49, 0, -41);
  palm8.rotation.set(0, 0, 0);
}

function handel_loadPalm9(gltf) {
  palm9 = gltf.scene;
  palm9.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });

  palm9.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm9);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm9.position.set(-45, 0, -55);
  palm9.rotation.set(0, 0, 0);
}

function handel_loadPalm10(gltf) {
  palm10 = gltf.scene;
  palm10.children[0].material = new THREE.MeshPhongMaterial({
    map: cloudTexture,
  });

  palm10.traverse((n) => {
    if (n.isMesh) {
      n.castShadow = true;
      n.receiveShadow = true;
      if (n.material.map) n.material.map.anisotropy = 16;
    }
  });
  //Add palm to scene with configuration
  scene.add(palm10);
  gltf.scene.scale.set(0.02, 0.02, 0.02);
  palm10.position.set(-40, 0, -55);
  palm10.rotation.set(0, 0, 0);
}
//––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Rendering –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
//Render Animation
function animate() {
  requestAnimationFrame(animate);
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
  //relocate clouds
  //randomize cloud position between -150 and -100 if it is above of 120
  if (cloud1) {
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

  //––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––– Light Scenes –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––//
  if (gui) {
    //Add listener to the light scene
    document.addEventListener("keydown", onDocumentKeyDown, false);
    function onDocumentKeyDown(event) {
      var keyCode = event.which;
      //if A key is pressed
      if (keyCode == 65) {
        //Position spotlight to the left and change the color
        //Sunrise
        spotLight.color = new THREE.Color(0xff0000);
        spotLight.intensity = 50;
        spotLight.position.set(-150, 30, -0);
        scene.remove(ambientLight);
      }
      //if S key is pressed
      else if (keyCode == 83) {
        //Position spotlight to the the center and change the color
        //Mid Day
        spotLight.color = new THREE.Color(0xf4e94b);
        spotLight.position.set(0, 100, -0);
        spotLight.intensity = 2;
        scene.remove(ambientLight);
      }
      //if D key is pressed
      else if (keyCode == 68) {
        //Position spotlight to the right and change the color
        //Sunset
        spotLight.color = new THREE.Color(0xff0000);
        spotLight.position.set(150, 30, 0);
        spotLight.intensity = 20;
        ambientLight.intensity = 2;
        scene.add(ambientLight);
        scene.remove(pointLigth);
      }
      //if arrow up key is pressed
      else if (keyCode == 38) {
        //move the spotlight to the back
        spotLight.position.z -= 0.005;
      }
      //if arrow down key is pressed
      else if (keyCode == 40) {
        //move the spotlight to the front
        spotLight.position.z += 0.005;
      }
      //if arrow left key is pressed
      else if (keyCode == 37) {
        //move the spotlight to the left
        spotLight.position.x -= 0.01;
      }
      //if arrow right key is pressed
      else if (keyCode == 39) {
        //move the spotlight to the right
        spotLight.position.x += 0.01;
      }
      //if J key is pressed
      else if (keyCode == 74) {
        //move the spotlight up
        spotLight.position.y += 0.01;
      }
      //if M key is pressed
      else if (keyCode == 77) {
        //move the spotlight down
        spotLight.position.y -= 0.01;
      }
    }
  }
  renderer.render(scene, camera);
}
