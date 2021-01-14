import * as THREE from "three";

// import { GLTFLoader } from 'three-gltf-loader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as POSTPROCESSING from "postprocessing";
// import { TweenMax as TM } from "gsap";
import { Interaction } from 'three.interaction';
// import { Text } from 'three.text';
import { Text } from 'troika-three-text'

import vertexShader from "./libs/glsl/vertex.glsl";
import fragmentShader from "./libs/glsl/fragment.glsl";
import fragmentShaderVertical from "./libs/glsl/fragmentVertical.glsl";

import displacement from "../assets/img/displaces/displace.jpg";
import displacement1 from "../assets/img/displaces/displace.png";
import displacement2 from "../assets/img/displaces/displace2.png"; // Pour le panneau
import displacement3 from "../assets/img/displaces/displace3.png";
import displacement4 from "../assets/img/displaces/displace4.png"; // Pour les planes
import displacement5 from "../assets/img/displaces/displace5.jpg";
import displacement6 from "../assets/img/displaces/displace6.jpg";
import displacement7 from "../assets/img/displaces/displace7.jpg";
import displacement8 from "../assets/img/displaces/displace8.jpg";
import displacement9 from "../assets/img/displaces/displace9.png";

// import atelier1Default from "../assets/img/ateliers/atelier1Default.png"; // Site Web / crédit
// import atelier2Default from "../assets/img/ateliers/atelier2Default.png"; // FTM
import atelier3Default from "../assets/img/ateliers/atelier3Default.png"; // VR
import atelier4Default from "../assets/img/ateliers/atelier4Default.png"; // init dev web
import atelier5Default from "../assets/img/ateliers/atelier5Default.png"; // cube musicale
import atelier6Default from "../assets/img/ateliers/atelier6Default.png"; // ia art gen
import atelier7Default from "../assets/img/ateliers/atelier7Default.png"; // musée mmi
import atelier8Default from "../assets/img/ateliers/atelier8Default.png"; // suite adobe
import atelier9Default from "../assets/img/ateliers/atelier9Default.png"; // fmv
import atelier10Default from "../assets/img/ateliers/atelier10Default.png"; // webradio
import atelier11Default from "../assets/img/ateliers/atelier11Default.png"; // ptv
import atelier12Default from "../assets/img/ateliers/atelier12Default.png"; // fond vert
import atelier13Default from "../assets/img/ateliers/atelier13Default.png"; // mapping
import atelier14Default from "../assets/img/ateliers/atelier14Default.png"; // audiovisuel

// import atelier1Hover from "../assets/img/ateliers/atelier1Hover.png"; // Site Web / crédit
// import atelier2Hover from "../assets/img/ateliers/atelier2Hover.png"; // FTM
import atelier3Hover from "../assets/img/ateliers/atelier3Hover.png"; // VR
import atelier4Hover from "../assets/img/ateliers/atelier4Hover.png"; // init dev web
import atelier5Hover from "../assets/img/ateliers/atelier5Hover.png"; // cube musicale
import atelier6Hover from "../assets/img/ateliers/atelier6Hover.png"; // ia art gen
import atelier7Hover from "../assets/img/ateliers/atelier7Hover.png"; // musée mmi
import atelier8Hover from "../assets/img/ateliers/atelier8Hover.png"; // suite adobe
import atelier9Hover from "../assets/img/ateliers/atelier9Hover.png"; // fmv
import atelier10Hover from "../assets/img/ateliers/atelier10Hover.png"; // webradio
import atelier11Hover from "../assets/img/ateliers/atelier11Hover.png"; // ptv
import atelier12Hover from "../assets/img/ateliers/atelier12Hover.png"; // fond vert
import atelier13Hover from "../assets/img/ateliers/atelier13Hover.png"; // mapping
import atelier14Hover from "../assets/img/ateliers/atelier14Hover.png"; // audiovisuel

import templateTexture from "../assets/img/ateliers/Site_web.png";

import socleModel from "../assets/model/socle.gltf";
import logoModel from "../assets/model/logo.glb";
import homeModel from "../assets/model/home.gltf";
import streetModel from "../assets/model/street.gltf";
import rightDoorModel from "../assets/model/rightDoor.gltf";
import leftDoorModel from "../assets/model/leftDoor.gltf";

import pyloneModel from "../assets/model/navigation/pylone.gltf";
import pylone2Model from "../assets/model/navigation/pylone2.gltf";
import pylone3Model from "../assets/model/navigation/pylone3.gltf";
import pylone4Model from "../assets/model/navigation/pylone4.gltf";
import pylone5Model from "../assets/model/navigation/pylone5.gltf";
import gridModel from "../assets/model/navigation/grid.gltf";
import grid2Model from "../assets/model/navigation/grid2.gltf";
import grid3Model from "../assets/model/navigation/grid3.gltf";
import grid4Model from "../assets/model/navigation/grid4.gltf";
import grid5Model from "../assets/model/navigation/grid5.gltf";
import tableModel from "../assets/model/navigation/table.gltf";
import poutreModel from "../assets/model/navigation/poutre.gltf";
import leftWallModel from "../assets/model/navigation/leftWall.gltf";
import rightWallModel from "../assets/model/navigation/rightWall.gltf";
import fieldModel from "../assets/model/navigation/field.gltf";
import signModel from "../assets/model/navigation/sign.gltf";

// import greenScreenModel from "../assets/model/fondVert/greenScreen.gltf";
// import tvModel from "../assets/model/fondVert/tv.gltf";
// import tv2Model from "../assets/model/fondVert/tv2.gltf";
// import tvLineModel from "../assets/model/fondVert/tvLine.gltf";


import particle from "../assets/img/particle.png";

////////// SCENE //////////
var scene = new THREE.Scene();

////////// CAMERA //////////
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

/////// CLOCK ///////
var clock = new THREE.Clock();

if (window.matchMedia("(max-width: 600px)").matches) {
    camera.position.set(0, 0, 11.3);
} else {
    camera.position.set(0, 0, 10);
}

// var textMesh = new Text ({
//     key: 'my-text',
//     text: 'Hello world!',
//     fontSize: 0.2,
//     color: 0x9966FF,
// });

// let textMesh = new Text({
//     key: 'my-text',
//     text: 'Hello world!',
//     fontSize: 0.2,
//     color: 0x9966FF,
// });

// console.log(textMesh)
// scene.add(textMesh)
// textMesh.position.set(0, 2, 0)


/////// MAIN RENDERER ///////
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
document.body.appendChild(renderer.domElement);


/////// RESIZE EVENT ///////
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

/////// MESH INTERACTION ///////
const interaction = new Interaction(renderer, scene, camera);

/////// POSTPROCESSING ///////
let composer = new POSTPROCESSING.EffectComposer(renderer);

composer.addPass(new POSTPROCESSING.RenderPass(scene, camera));

const effectPass = new POSTPROCESSING.EffectPass(
    camera,
    new POSTPROCESSING.RealisticBokehEffect()
);
effectPass.renderToScreen = true;

composer.addPass(effectPass);

//POUR LES SHADERS
let customPass = new POSTPROCESSING.ShaderPass({ vertexShader, fragmentShader });
customPass.renderToScreen = true;
composer.addPass(customPass);

let rotateZ = -.2; // PLANES ROTATION

/////// LIGHTS ///////
var targetLogo = new THREE.Object3D();
targetLogo.position.set(0, 0, 0)
scene.add(targetLogo);

let light1 = new THREE.PointLight(0x4cc9f0, .3);
light1.position.set(-2000, 1000, -2000);
scene.add(light1);
let light2 = new THREE.PointLight(0x4cc9f0, .3);
light2.position.set(2000, 0, 0);
scene.add(light2);
let light3 = new THREE.PointLight(0x4cc9f0, .3);
light3.position.set(-2000, 0, 0);
scene.add(light3);
let light4 = new THREE.PointLight(0x4cc9f0, .3);
light4.position.set(2000, 1000, -2000);
scene.add(light4);

let lightCenter = new THREE.DirectionalLight(0x000000, 10);
lightCenter.position.set(0, -1.5, 0)
lightCenter.target = targetLogo;
scene.add(lightCenter);

let lightCenterSocle = new THREE.PointLight(0x000000, 150, .6);
lightCenterSocle.position.set(0, -1.5, 0)
scene.add(lightCenterSocle);

const cyanColor = new THREE.Color(0x4cc9f0);
const cyanColorReset = new THREE.Color(0x000000);

let ambientLight = new THREE.AmbientLight(0x09021e, 8);
ambientLight.position.set(0, -1000, 0)
scene.add(ambientLight);

/////// 3D MODEL ///////

//HOME MODEL
var home;

var loaderHome = new GLTFLoader();
loaderHome.crossOrigin = true

loaderHome.load(homeModel, function(addHome) {
    home = addHome.scene;
    scene.add(home);
    home.position.set(-1.45, -10, 0)
    home.scale.set(100, 100, 100);
    home.rotation.y = -.35;
});

// SOCLE MODEL
var socle;

var loaderSocle = new GLTFLoader;
loaderSocle.crossOrigin = true

loaderSocle.load(socleModel, function(addSocle) {
    socle = addSocle.scene;
    scene.add(socle);
    socle.position.set(0, -10.7, 0)
    socle.scale.set(.7, .7, .7)
    socle.rotation.y = 0;
});

// LOGO MODEL
var logo;

var loaderLogo = new GLTFLoader;
loaderLogo.crossOrigin = true;
loaderLogo.transparent = true;
loaderLogo.opacity = 0.1;

loaderLogo.load(logoModel, function(addLogo) {
    logo = addLogo.scene;
    scene.add(logo);
    logo.position.set(0, -9.8, 0)
    logo.rotation.z = -.725;
    logo.scale.set(0.0001, 0.0001, 0.0001)
});

// FIELD MODEL
var field;

var loaderField = new GLTFLoader;
loaderField.crossOrigin = true;

loaderField.load(fieldModel, function(addField) {
    field = addField.scene;
    scene.add(field);
    field.position.set(-1.2, -53, -48)
    field.rotation.y = -.5 * Math.PI
    field.scale.set(0.0001, 0.0001, 0.0001)
})

// LEFT WALL MODEL
var leftWall;

var loaderleftWall = new GLTFLoader;
loaderleftWall.crossOrigin = true;

loaderleftWall.load(leftWallModel, function(addleftWall) {
    leftWall = addleftWall.scene;
    scene.add(leftWall);
    leftWall.position.set(-51.2, -4.8, -48)
    leftWall.rotation.y = -.5 * Math.PI
    leftWall.scale.set(0.0001, 0.0001, 0.0001)
})

// RIGHT WALL MODEL
var rightWall;

var loaderRightWall = new GLTFLoader;
loaderRightWall.crossOrigin = true;

loaderRightWall.load(rightWallModel, function(addRightWall) {
    rightWall = addRightWall.scene;
    scene.add(rightWall);
    rightWall.position.set(58.8, -4.8, -48)
    rightWall.rotation.y = -.5 * Math.PI
    rightWall.scale.set(0.0001, 0.0001, 0.0001)
})

// TABLE MODEL
var table;

var loaderTable = new GLTFLoader;
loaderTable.crossOrigin = true;

loaderTable.load(tableModel, function(addTable) {
    table = addTable.scene;
    scene.add(table);
    table.position.set(-8, -4.9, -8.5)
    table.rotation.y = -.5 * Math.PI
    table.scale.set(110, 0.0001, 0.0001)
})

// PYLONE MODEL
var pylone;

var loaderPylone = new GLTFLoader;
loaderPylone.crossOrigin = true;

loaderPylone.load(pyloneModel, function(addPylone) {
    pylone = addPylone.scene;
    scene.add(pylone);
    pylone.position.set(-8.5, -1.5, -5)
    pylone.rotation.y = -.5 * Math.PI
    pylone.scale.set(110, 0.0001, 0.0001)
})

// PYLONE2 MODEL
var pylone2;

var loaderPylone2 = new GLTFLoader;
loaderPylone2.crossOrigin = true;

loaderPylone2.load(pylone2Model, function(addPylone2) {
    pylone2 = addPylone2.scene;
    scene.add(pylone2);
    pylone2.position.set(-8.5, -1.5, -6.5)
    pylone2.rotation.y = -.5 * Math.PI
    pylone2.scale.set(110, 0.0001, 0.0001)
})

// PYLONE3 MODEL
var pylone3;

var loaderPylone3 = new GLTFLoader;
loaderPylone3.crossOrigin = true;

loaderPylone3.load(pylone3Model, function(addPylone3) {
    pylone3 = addPylone3.scene;
    scene.add(pylone3);
    pylone3.position.set(-8.5, -1.5, -8)
    pylone3.rotation.y = -.5 * Math.PI
    pylone3.scale.set(110, 0.0001, 0.0001)
})

// PYLONE4 MODEL
var pylone4;

var loaderPylone4 = new GLTFLoader;
loaderPylone4.crossOrigin = true;

loaderPylone.load(pylone4Model, function(addPylone4) {
    pylone4 = addPylone4.scene;
    scene.add(pylone4);
    pylone4.position.set(-8.5, -1.5, -9.5)
    pylone4.rotation.y = -.5 * Math.PI
    pylone4.scale.set(110, 0.0001, 0.0001)
})

// PYLONE5 MODEL
var pylone5;

var loaderPylone5 = new GLTFLoader;
loaderPylone5.crossOrigin = true;

loaderPylone.load(pylone5Model, function(addPylone5) {
    pylone5 = addPylone5.scene;
    scene.add(pylone5);
    pylone5.position.set(-8.5, -1.5, -11)
    pylone5.rotation.y = -.5 * Math.PI
    pylone5.scale.set(110, 0.0001, 0.0001)
})

// GRID MODEL
var grid;

var loaderGrid = new GLTFLoader;
loaderGrid.crossOrigin = true;

loaderGrid.load(gridModel, function(addGrid) {
    grid = addGrid.scene;
    scene.add(grid);
    grid.position.set(-7.5, -3.8, -7.5)
    grid.rotation.y = -.5 * Math.PI
    grid.scale.set(0.0001, 110, 0.0001)
})

// GRID2 MODEL
var grid2;

var loaderGrid2 = new GLTFLoader;
loaderGrid2.crossOrigin = true;

loaderGrid2.load(grid2Model, function(addGrid2) {
    grid2 = addGrid2.scene;
    scene.add(grid2);
    grid2.position.set(-7.5, -3.2, -7.5)
    grid2.rotation.y = -.5 * Math.PI
    grid2.scale.set(0.0001, 110, 0.0001)
})

// GRID3 MODEL
var grid3;

var loaderGrid3 = new GLTFLoader;
loaderGrid3.crossOrigin = true;

loaderGrid3.load(grid3Model, function(addGrid3) {
    grid3 = addGrid3.scene;
    scene.add(grid3);
    grid3.position.set(-7.5, -2.6, -7.5)
    grid3.rotation.y = -.5 * Math.PI
    grid3.scale.set(0.0001, 110, 0.0001)
})

// GRID4 MODEL
var grid4;

var loaderGrid4 = new GLTFLoader;
loaderGrid4.crossOrigin = true;

loaderGrid4.load(grid4Model, function(addGrid4) {
    grid4 = addGrid4.scene;
    scene.add(grid4);
    grid4.position.set(-7.5, -2, -7.5)
    grid4.rotation.y = -.5 * Math.PI
    grid4.scale.set(0.0001, 110, 0.0001)
})

// GRID5 MODEL
var grid5;

var loaderGrid5 = new GLTFLoader;
loaderGrid5.crossOrigin = true;

loaderGrid5.load(grid5Model, function(addGrid5) {
    grid5 = addGrid5.scene;
    scene.add(grid5);
    grid5.position.set(-7.5, -1.4, -7.5)
    grid5.rotation.y = -.5 * Math.PI
    grid5.scale.set(0.0001, 110, 0.0001)
})

// POUTRE MODEL
var poutre;

var loaderPoutre = new GLTFLoader;
loaderPoutre.crossOrigin = true;

loaderPoutre.load(poutreModel, function(addPoutre) {
    poutre = addPoutre.scene;
    scene.add(poutre);
    poutre.position.set(-9, 4, -9)
    poutre.rotation.y = -.5 * Math.PI
    poutre.scale.set(0.0001, 100, 0.0001)
})

// SIGN MODEL
var sign;

var loaderSign = new GLTFLoader;
loaderSign.crossOrigin = true;

loaderSign.load(signModel, function(addSign) {
    sign = addSign.scene;
    scene.add(sign);
    sign.position.set(7.8, -3.05, -4)
    sign.rotation.y = -.5 * Math.PI
    sign.scale.set(0.0001, 0.0001, 0.0001)
});

// RIGHT DOOR MODEL
var rightDoor;

var loaderRightDoor = new GLTFLoader;
loaderRightDoor.crossOrigin = true;

loaderRightDoor.load(rightDoorModel, function(addRightDoor) {
    rightDoor = addRightDoor.scene;
    scene.add(rightDoor);
    rightDoor.position.set(.35, -55.8, -48)
    rightDoor.rotation.y = -.5 * Math.PI
    rightDoor.scale.set(0.0001, 0.0001, 0.0001)
});

// LEFT DOOR MODEL
var leftDoor;

var loaderLeftDoor = new GLTFLoader;
loaderLeftDoor.crossOrigin = true;

loaderLeftDoor.load(leftDoorModel, function(addLeftDoor) {
    leftDoor = addLeftDoor.scene;
    scene.add(leftDoor);
    leftDoor.position.set(.35, -55.8, -48)
    leftDoor.rotation.y = -.5 * Math.PI
    leftDoor.scale.set(0.0001, 0.0001, 0.0001)
});

// STREET MODEL
var street;

var loaderStreet = new GLTFLoader;
loaderStreet.crossOrigin = true;

loaderStreet.load(streetModel, function(addStreet) {
    street = addStreet.scene;
    scene.add(street);
    street.position.set(.5, -5.83, -48.75)
    street.rotation.y = -.5 * Math.PI
    street.scale.set(0.0001, 0.0001, 0.0001)
});

/////// PLANES ///////
var plane = new THREE.PlaneGeometry(1.6/1.2, 0.9/1.2, 30, 30); //WorkShops
// var planeTrombi = new THREE.PlaneGeometry(1.6/1.2, 0.9/1.2, 30, 30); //Trombi ateliers


/////// INITIATION DES TEXTURES ///////

let texture1Default = new THREE.TextureLoader().load(templateTexture) // atelier1Default
let texture1Hover = new THREE.TextureLoader().load(templateTexture) // atelier1Hover

let texture2Default = new THREE.TextureLoader().load(templateTexture) // atelier2Default
let texture2Hover = new THREE.TextureLoader().load(templateTexture) // atelier2Hover

let texture3Default = new THREE.TextureLoader().load(atelier3Default)
let texture3Hover = new THREE.TextureLoader().load(atelier3Hover)

let texture4Default = new THREE.TextureLoader().load(atelier4Default)
let texture4Hover = new THREE.TextureLoader().load(atelier4Hover)

let texture5Default = new THREE.TextureLoader().load(atelier5Default)
let texture5Hover = new THREE.TextureLoader().load(atelier5Hover)

let texture6Default = new THREE.TextureLoader().load(atelier6Default)
let texture6Hover = new THREE.TextureLoader().load(atelier6Hover)

let texture7Default = new THREE.TextureLoader().load(atelier7Default)
let texture7Hover = new THREE.TextureLoader().load(atelier7Hover)

let texture8Default = new THREE.TextureLoader().load(atelier8Default)
let texture8Hover = new THREE.TextureLoader().load(atelier8Hover)

let texture9Default = new THREE.TextureLoader().load(atelier9Default)
let texture9Hover = new THREE.TextureLoader().load(atelier9Hover)

let texture10Default = new THREE.TextureLoader().load(atelier10Default)
let texture10Hover = new THREE.TextureLoader().load(atelier10Hover)

let texture11Default = new THREE.TextureLoader().load(atelier11Default)
let texture11Hover = new THREE.TextureLoader().load(atelier11Hover)

let texture12Default = new THREE.TextureLoader().load(atelier12Default)
let texture12Hover = new THREE.TextureLoader().load(atelier12Hover)

let texture13Default = new THREE.TextureLoader().load(atelier13Default)
let texture13Hover = new THREE.TextureLoader().load(atelier13Hover)

let texture14Default = new THREE.TextureLoader().load(atelier14Default)
let texture14Hover = new THREE.TextureLoader().load(atelier14Hover)


/////// PLANES MATERIALS ///////
let planeOpacityDefault = 0.925;

var materialPlane1 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture1Default },
        imagergb: { type: "t", value: texture1Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane2 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture2Default },
        imagergb: { type: "t", value: texture2Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane3 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture3Default },
        imagergb: { type: "t", value: texture3Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane4 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture4Default },
        imagergb: { type: "t", value: texture4Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane5 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture5Default },
        imagergb: { type: "t", value: texture5Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane6 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture6Default },
        imagergb: { type: "t", value: texture6Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane7 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture7Default },
        imagergb: { type: "t", value: texture7Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane8 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture8Default },
        imagergb: { type: "t", value: texture8Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane9 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture9Default },
        imagergb: { type: "t", value: texture9Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane10 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture10Default },
        imagergb: { type: "t", value: texture10Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane11 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture11Default },
        imagergb: { type: "t", value: texture11Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane12 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture12Default },
        imagergb: { type: "t", value: texture12Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane13 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture13Default },
        imagergb: { type: "t", value: texture13Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});
var materialPlane14 = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: planeOpacityDefault },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture14Default },
        imagergb: { type: "t", value: texture14Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement4) },
        dispFactor: { type: "f", value: 0.0 },
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});

// Panneau
var materialPlanePanneau = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader : fragmentShaderVertical,
    uniforms: {
        time: { type: "f", value: 0.0 },
        alpha: { value: 1.0 },
        displaceHover: { type: "f", value: 0.0 },
        
        imagebw: { type: "t", value: texture1Hover },
        imagergb: { type: "t", value: texture2Hover },
        displacement: { type: "t", value: new THREE.TextureLoader().load(displacement2) },
        dispFactor: { type: "f", value: 0.0 }, //transition
        effectFactor: { type: "f", value: 1 }, //intensity
    },
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 1.0
});


/////// PLANE AXES ///////
var planeAxe = new THREE.Object3D();
planeAxe.position.set(0, -26.5, 0);
scene.add(planeAxe);


/////// PLANES PIVOTS ///////
var pivot1 = new THREE.Object3D();
var pivot2 = new THREE.Object3D();
var pivot3 = new THREE.Object3D();
var pivot4 = new THREE.Object3D();
var pivot5 = new THREE.Object3D();
var pivot6 = new THREE.Object3D();
var pivot7 = new THREE.Object3D();
var pivot8 = new THREE.Object3D();
var pivot9 = new THREE.Object3D();
var pivot10 = new THREE.Object3D();
var pivot11 = new THREE.Object3D();
var pivot12 = new THREE.Object3D();
var pivot13 = new THREE.Object3D();
var pivot14 = new THREE.Object3D();

pivot1.position.z = 2.25;
pivot2.position.x = -2.25;
pivot3.position.z = -2.25;
pivot4.position.x = 2.25;
pivot5.position.z = 2.25;
pivot6.position.x = -2.25;
pivot7.position.z = -2.25;
pivot8.position.x = 2.25;
pivot9.position.z = 2.25;
pivot10.position.x = -2.25;
pivot11.position.z = -2.25;
pivot12.position.x = 2.25;
pivot13.position.z = 2.25;
pivot14.position.x = -2.25;

planeAxe.add(pivot1, pivot2, pivot3, pivot4, pivot5, pivot6, pivot7, pivot8, pivot9, pivot10, pivot11, pivot12, pivot13, pivot14);

/////// PLANES MESHS ///////
var planeMesh1 = new THREE.Mesh(plane, materialPlane1);
var planeMesh2 = new THREE.Mesh(plane, materialPlane2);
var planeMesh3 = new THREE.Mesh(plane, materialPlane3);
var planeMesh4 = new THREE.Mesh(plane, materialPlane4);
var planeMesh5 = new THREE.Mesh(plane, materialPlane5);
var planeMesh6 = new THREE.Mesh(plane, materialPlane6);
var planeMesh7 = new THREE.Mesh(plane, materialPlane7);
var planeMesh8 = new THREE.Mesh(plane, materialPlane8);
var planeMesh9 = new THREE.Mesh(plane, materialPlane9);
var planeMesh10 = new THREE.Mesh(plane, materialPlane10);
var planeMesh11 = new THREE.Mesh(plane, materialPlane11);
var planeMesh12 = new THREE.Mesh(plane, materialPlane12);
var planeMesh13 = new THREE.Mesh(plane, materialPlane13);
var planeMesh14 = new THREE.Mesh(plane, materialPlane14);

var planeMeshPanneau = new THREE.Mesh(plane, materialPlanePanneau);

planeMesh1.position.y = 4;
planeMesh2.position.y = 5;
planeMesh3.position.y = 6;
planeMesh4.position.y = 7;
planeMesh5.position.y = 8;
planeMesh6.position.y = 9;
planeMesh7.position.y = 10;
planeMesh8.position.y = 11;
planeMesh9.position.y = 12;
planeMesh10.position.y = 13;
planeMesh11.position.y = 14;
planeMesh12.position.y = 15;
planeMesh13.position.y = 16;
planeMesh14.position.y = 17;

scene.add(planeMeshPanneau)
planeMeshPanneau.position.set(0, 2, 0)

planeMesh2.rotation.y = -Math.PI / 2;
planeMesh3.rotation.y = -Math.PI;
planeMesh4.rotation.y = Math.PI / 2;
planeMesh6.rotation.y = -Math.PI / 2;
planeMesh7.rotation.y = -Math.PI;
planeMesh8.rotation.y = Math.PI / 2;
planeMesh10.rotation.y = -Math.PI / 2;
planeMesh11.rotation.y = -Math.PI;
planeMesh12.rotation.y = Math.PI / 2;
planeMesh14.rotation.y = -Math.PI / 2;

/////// ROTATION AROUND AXIS ///////
pivot1.add(planeMesh1);
pivot2.add(planeMesh2);
pivot3.add(planeMesh3);
pivot4.add(planeMesh4);
pivot5.add(planeMesh5);
pivot6.add(planeMesh6);
pivot7.add(planeMesh7);
pivot8.add(planeMesh8);
pivot9.add(planeMesh9);
pivot10.add(planeMesh10);
pivot11.add(planeMesh11);
pivot12.add(planeMesh12);
pivot13.add(planeMesh13);
pivot14.add(planeMesh14);


/////// GRID ///////
var screenWidth = (window.innerWidth);
var ScreenHeigth = (window.innerHeight);

let colContainer = document.querySelector('.colContainer')
let rowContainer = document.querySelector('.rowContainer')

for (let col = 0; col < screenWidth; col++) {
    let drawCol = document.createElement("div");
    colContainer.appendChild(drawCol).classList.add("col");
    drawCol.classList.add(col);
};
for (let row = 0; row < ScreenHeigth; row++) {
    let drawRaw = document.createElement("div");
    rowContainer.appendChild(drawRaw).className = "row";
    drawRaw.classList.add(row);
};

/////// PARTICLES ///////
let particleGeo = new THREE.Geometry();
for (let i = 0; i < 800; i++) {
    let particle = new THREE.Vector3(
            Math.random() * 50 - 40,
            Math.random() * 50 - 40,
            Math.random() * 3.4 - 1.7) //20-10
    particleGeo.vertices.push(particle);
}

let particleMaterial = new THREE.PointsMaterial({
    size: 0.08, //0.018
    map: new THREE.TextureLoader().load(particle),
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: .35
});

let particleMesh = new THREE.Points(particleGeo, particleMaterial);
particleMesh.name = 'ParticleObjects';
scene.add(particleMesh);


/////// VARIABLES EVENTS ///////
let homeContainer = document.querySelector('.homeContainer');
let titleSvg = document.querySelector('.title');
let titleSvgPath = document.querySelectorAll('.title path');
let titleSvgLine = document.querySelector('.title line');
let littleTitleSvg = document.querySelector('.littleTitle');
let littleTitleSvgPath = document.querySelectorAll('.littleTitle path');
let littleTitleSvgLine = document.querySelector('.littleTitle line');
let buttons = document.querySelectorAll('button');
let btnStart = document.querySelector('.btn__start');
let spanContainerStartMouseOver = document.querySelector('.spanContainerStartMouseover')
let spanContainerStartMouseOut = document.querySelector('.spanContainerStartMouseout')
let btnBackHome = document.querySelector('.btn__backHome');
let spanContainerBackMouseOver = document.querySelector('.spanContainerBackMouseover')
let spanContainerBackMouseOut = document.querySelector('.spanContainerBackMouseout')
let canvas = document.querySelector('canvas');
let sm = document.querySelectorAll('.sm');
let sm1 = document.querySelector('.sm__1');
let sm2 = document.querySelector('.sm__2');
let sm3 = document.querySelector('.sm__3');
let musicBtn = document.querySelector('.musicBtn');
let bgCol = document.querySelectorAll('.colContainer .col');
let bgRow = document.querySelectorAll('.rowContainer .row');
let cursor = document.querySelector('.cursor');
let cursorShapeIn = document.querySelector('.cursor-shape_in');
let cursorShapeOut = document.querySelector('.cursor-shape_out');
let containerTimeline = document.querySelector('.containerTimeline');
let workShopButton = document.querySelectorAll('.workShopButton');
let workShopButtonMask = document.querySelectorAll('.mask');
let timelineIndication = document.querySelector('.indication');
let workShopButton1 = document.querySelector('.workShopButton__1');
let workShopButton2 = document.querySelector('.workShopButton__2');
let workShopButton3 = document.querySelector('.workShopButton__3');
let workShopButton4 = document.querySelector('.workShopButton__4');
let workShopButton5 = document.querySelector('.workShopButton__5');
let workShopButton6 = document.querySelector('.workShopButton__6');
let workShopButton7 = document.querySelector('.workShopButton__7');
let workShopButton8 = document.querySelector('.workShopButton__8');
let workShopButton9 = document.querySelector('.workShopButton__9');
let workShopButton10 = document.querySelector('.workShopButton__10');
let workShopButton11 = document.querySelector('.workShopButton__11');
let workShopButton12 = document.querySelector('.workShopButton__12');
let workShopButton13 = document.querySelector('.workShopButton__13');
let workShopButton14 = document.querySelector('.workShopButton__14');
let indicClickOnPlane = document.querySelector('.indicClickOnPlane');

window.addEventListener('load', function() {
    TweenMax.to(bgCol, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.02 });
    TweenMax.to(bgCol, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.02 });
    TweenMax.to(bgRow, { duration: 1, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .325, stagger: 0.0355555 });
    TweenMax.to(bgRow, { duration: .5, background: '#0d0437', opacity: .65, stagger: 0.0355555 });
    TweenMax.to(bgCol, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.02, repeat: -1, yoyo: true, delay: 2 });
    TweenMax.to(bgRow, { duration: .5, background: '#f72585', opacity: .05, stagger: 0.0355555, repeat: -1, yoyo: true, delay: 2 });
    canvas.classList.add('hologramActive')

    const _cursorIn = new Cursor(cursorShapeIn);
    updateCursor();
    indicClickOnPlane.style.opacity = 0;
    // indicClickOnPlane.style.letterSpacing = 0;
})

let workshopActive = false;


/////// PLANE HOVER SHADERS EFFECT ///////

let colorCursorHover = "#f72585";
let colorCursorDefault = "#4cc9f0";

planeMesh1.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -4 && planeAxe.position.y >= -4.5 || planeAxe.position.y <= -3.5 && planeAxe.position.y >= -4)) {
        gsap.to(materialPlane1.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane1.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh1.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane1.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane1.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh2.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -5 && planeAxe.position.y >= -5.5 || planeAxe.position.y <= -4.5 && planeAxe.position.y >= -5)) {
        console.log(ev)
        gsap.to(materialPlane2.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane2.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh2.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane2.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane2.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh3.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -6 && planeAxe.position.y >= -6.5 || planeAxe.position.y <= -5.5 && planeAxe.position.y >= -6)) {
        console.log(ev)
        gsap.to(materialPlane3.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane3.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh3.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane3.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane3.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh4.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -7 && planeAxe.position.y >= -7.5 || planeAxe.position.y <= -6.5 && planeAxe.position.y >= -7)) {
        console.log(ev)
        gsap.to(materialPlane4.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane4.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh4.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane4.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane4.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh5.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -8 && planeAxe.position.y >= -8.5 || planeAxe.position.y <= -7.5 && planeAxe.position.y >= -8)) {
        console.log(ev)
        gsap.to(materialPlane5.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane5.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh5.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane5.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane5.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh6.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -9 && planeAxe.position.y >= -9.5 || planeAxe.position.y <= -8.5 && planeAxe.position.y >= -9)) {
        console.log(ev)
        gsap.to(materialPlane6.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane6.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh6.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane6.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane6.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh7.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -10 && planeAxe.position.y >= -10.5 || planeAxe.position.y <= -9.5 && planeAxe.position.y >= -10)) {
        console.log(ev)
        gsap.to(materialPlane7.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane7.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh7.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane7.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane7.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh8.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -11 && planeAxe.position.y >= -11.5 || planeAxe.position.y <= -10.5 && planeAxe.position.y >= -11)) {
        console.log(ev)
        gsap.to(materialPlane8.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane8.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh8.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane8.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane8.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh9.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -12 && planeAxe.position.y >= -12.5 || planeAxe.position.y <= -11.5 && planeAxe.position.y >= -12)) {
        console.log(ev)
        gsap.to(materialPlane9.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane9.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh9.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane9.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane9.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }   
});

planeMesh10.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -13 && planeAxe.position.y >= -13.5 || planeAxe.position.y <= -12.5 && planeAxe.position.y >= -13)) {
        console.log(ev)
        gsap.to(materialPlane10.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane10.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh10.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane10.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane10.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh11.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -14 && planeAxe.position.y >= -14.5 || planeAxe.position.y <= -13.5 && planeAxe.position.y >= -14)) {
        console.log(ev)
        gsap.to(materialPlane11.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane11.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh11.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane11.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane11.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh12.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -15 && planeAxe.position.y >= -15.5 || planeAxe.position.y <= -14.5 && planeAxe.position.y >= -15)) {
        console.log(ev)
        gsap.to(materialPlane12.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane12.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh12.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane12.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane12.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh13.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -16 && planeAxe.position.y >= -16.5 || planeAxe.position.y <= -15.5 && planeAxe.position.y >= -16)) {
        console.log(ev)
        gsap.to(materialPlane13.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane13.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});
planeMesh13.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane13.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane13.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});

planeMesh14.on('mouseover', function(ev) {
    if (ev && workshopActive == false && (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.5 || planeAxe.position.y <= -16.5 && planeAxe.position.y >= -17)) {
        console.log(ev)
        gsap.to(materialPlane14.uniforms.alpha, 1, { value: 1.0, ease: Power2.easeOut })
        gsap.to(materialPlane14.uniforms.dispFactor, .9, { value: 1.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorHover, padding: 50, left: -50, top: -50, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.50, { opacity: 0, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 1, ease: Power2.easeOut})
        indicClickOnPlane.classList.add("planeHover")
    }
});

planeMesh14.on('mouseout', function(ev) {
    if (ev && workshopActive == false) {
        gsap.to(materialPlane14.uniforms.alpha, 1, { value: planeOpacityDefault, ease: Power2.easeOut })
        gsap.to(materialPlane14.uniforms.dispFactor, .9, { value: 0.0, ease: Power3.easeOut });
        gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
        gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
        gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
        indicClickOnPlane.classList.remove("planeHover")
    }
});



///// PLANES CLICK /////
planeMesh14.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane14.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh14.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
    gsap.to(cursorShapeIn, 0.75, { background: colorCursorDefault, padding: 0, left: -10, top: -10, ease: Power3.easeOut})
    gsap.to(cursorShapeOut, 0.25, { opacity: 1,  delay: 0.25, ease: Power3.easeOut})
    gsap.to(indicClickOnPlane, 0.50, { opacity: 0, ease: Power2.easeOut})
    indicClickOnPlane.classList.remove("planeHover")
})

planeMesh13.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane13.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh13.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh12.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane12.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh12.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh11.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane11.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh11.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh10.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane10.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh10.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh9.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane9.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh9.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh8.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane8.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh8.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh7.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane7.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh7.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh6.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane6.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh6.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh5.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane5.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh5.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh4.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane4.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh4.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh3.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane3.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh3.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh2.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane2.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh2.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

planeMesh1.on('click', function() {
    gsap.to(camera.position, 3, { z: -20, ease: "power3.inOut", delay: .75 })
    gsap.to(leftDoor.position, 1.5, { x: -15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(rightDoor.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(logo.rotation, 1.5, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { z: -15, y: .35, ease: "power3.inOut" })
    gsap.to(logo.position, 1.5, { x: 15, ease: "power3.inOut", delay: 1.5 })
    gsap.to(materialPlane1.uniforms.alpha, 0.75, { value: 0.0, ease: "power3.inOut" });
    gsap.to(planeMesh1.scale, 0.75, { x: 1.2, y: 1.2, ease: "power3.inOut" });
})

/////// BACKHOME BUTTON EVENTS ///////
function functionBtnBackHome() {
    // Rajout des particules
    scene.add(particleMesh);

    canvas.classList.remove('hologramDefault')
    canvas.classList.add('hologramActive')
    btnBackHome.disabled = true;
    btnStart.disabled = false;
    if (planeAxe.position.y <= -11) {
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: -26.5, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: 0, ease: "power3.inOut" })
    }
    if (planeAxe.position.y > -11) {
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: 7, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: -13.5 * Math.PI, ease: "power3.inOut" })
            //RESET AXES POSITION 
        gsap.to(planeAxe.position, 0, { y: -26.5, delay: 3 })
        gsap.to(planeAxe.rotation, 0, { y: 0, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 2 })
        gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1, delay: 3.1 })
    }
    //CAMERA ANIM
    if (window.matchMedia("(max-width: 600px)").matches) {
        gsap.to(camera.position, 2.95, { z: 11.3, ease: "power3.inOut" })
    } else {
        gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
    }
    //HTML ELEMENTS ANIM
    titleSvgPath.forEach(e => {
        e.classList.add("pathTitleIn")
        e.classList.remove("pathTitleOut")
    });
    titleSvgLine.classList.add("pathLineIn")
    titleSvgLine.classList.remove("pathLineOut")

    littleTitleSvgPath.forEach(e => {
        e.classList.remove("pathTitleIn")
        e.classList.add("pathTitleOut")
    });
    littleTitleSvgLine.classList.remove("pathLineIn")
    littleTitleSvgLine.classList.add("pathLineOut")
    TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
    TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
        //PLANE ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        //MODELS ANIM
    gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
    gsap.to(logo.scale, 2.25, { z: 0.0001, x: 0.0001, y: 0.0001, ease: "power3.inOut", })
    gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
    gsap.to(home.position, 2.95, { z: 0, x: -1.45, ease: "power3.inOut" })
    gsap.to(home.rotation, 2.95, { y: -.35, z: 0, ease: "power3.inOut" })
    gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
    gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
    gsap.to(field.scale, 2.25, { y: 0.0001, x: 0.0001, z: 0.0001, ease: "power3.inOut" })
    gsap.to(field.position, 2.25, { y: -53, ease: "power3.inOut" })
    gsap.to(leftWall.position, 2.25, { x: -51.2, ease: "power3.inOut" })
    gsap.to(leftWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
    gsap.to(rightWall.position, 2.25, { x: 58.8, ease: "power3.inOut" })
    gsap.to(rightWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
    gsap.to(leftDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
    gsap.to(rightDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
    gsap.to(leftDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
    gsap.to(rightDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
    gsap.to(sign.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
    gsap.to(table.scale, 2.25, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut" })
    gsap.to(pylone5.scale, 2.25, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
    gsap.to(pylone4.scale, 2.1, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
    gsap.to(pylone3.scale, 1.95, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
    gsap.to(pylone2.scale, 1.8, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
    gsap.to(pylone.scale, 1.65, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
    gsap.to(grid.scale, 2.25, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut" })
    gsap.to(grid2.scale, 2.1, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .15 })
    gsap.to(grid3.scale, 1.95, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .3 })
    gsap.to(grid4.scale, 1.8, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .45 })
    gsap.to(grid5.scale, 1.65, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .6 })
    gsap.to(poutre.scale, 2.25, { x: 0.0001, y: 100, z: 0.0001, ease: "power3.inOut" })
        //LIGHTS ANIM
    TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
    //SWITCH ELEMENTS ON CLICK
    homeContainer.classList.add('close');
    homeContainer.classList.remove('open');
    btnBackHome.classList.add('close');
    btnBackHome.classList.remove('open');
    canvas.style.zIndex = -1;
}

///// START BUTTON EVENTS /////
function functionBtnStart() {
    // Supression des particules
    scene.remove(scene.getObjectByName("ParticleObjects"));

    //HTML ELEMENTS ANIM
    titleSvgPath.forEach(e => {
        e.classList.remove("pathTitleIn")
        e.classList.add("pathTitleOut")
    });
    titleSvgLine.classList.remove("pathLineIn")
    titleSvgLine.classList.add("pathLineOut")

    littleTitleSvgPath.forEach(e => {
        e.classList.add("pathTitleIn")
        e.classList.remove("pathTitleOut")
    });
    littleTitleSvgLine.classList.add("pathLineIn")
    littleTitleSvgLine.classList.remove("pathLineOut")
    canvas.classList.add('hologramDefault')
    canvas.classList.remove('hologramActive')
    btnBackHome.disabled = false;
    btnStart.disabled = true;

    setTimeout(function() {
        //AXES ANIM
        gsap.to(planeAxe.position, 1.5, { y: -17, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeAxe.rotation, 1.5, { y: -3.5 * Math.PI, ease: "power3.inOut", delay: 1.25 })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 3, { z: 4.5, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 3, { z: 3.7, ease: "power3.inOut" })
        }
        TweenMax.to(btnStart, 1, { opacity: 0, clipPath: "inset(0% 0% 0% 100%)", ease: "power3.inOut" })
        TweenMax.to(btnBackHome, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
            //PLANE ROTATION Z ANIM
        gsap.to(planeMesh1.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh2.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh3.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh4.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh5.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh6.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh7.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh8.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh9.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh10.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh11.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh12.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh13.rotation, 1.5, { z: rotateZ, ease: "power3.inOut", delay: 1.25 })
        gsap.to(planeMesh14.rotation, 1.5, { z: 0, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 3, { y: 0, ease: "power3.inOut" })
        gsap.to(logo.scale, 3, { z: .95, x: .95, y: .95, ease: "power3.inOut", delay: .25 })
        gsap.to(logo.rotation, 3, { z: 0.25, ease: "power3.inOut" })
        gsap.to(home.position, 3, { z: 105, x: 20, ease: "power3.inOut" })
        gsap.to(home.rotation, 3, { y: -Math.PI, z: Math.PI, ease: "power3.inOut" })
        gsap.to(socle.position, 3, { y: -2.5, ease: "power3.inOut" })
        gsap.to(socle.rotation, 3, { y: -Math.PI, ease: "power3.inOut" })
        gsap.to(field.scale, 3, { y: 110, x: 110, z: 110, ease: "power3.inOut" })
        gsap.to(field.position, 3, { y: -5.1, ease: "power3.inOut" })
        gsap.to(leftWall.position, 3, { x: -1.2, ease: "power3.inOut" })
        gsap.to(leftWall.scale, 3, { y: 140, x: 110, z: 110, ease: "power3.inOut" })
        gsap.to(rightWall.position, 3, { x: -1.2, ease: "power3.inOut" })
        gsap.to(rightWall.scale, 3, { y: 140, x: 110, z: 110, ease: "power3.inOut" })
        gsap.to(leftDoor.position, 3, { y: -5.8, ease: "power3.inOut" })
        gsap.to(rightDoor.position, 3, { y: -5.8, ease: "power3.inOut" })
        gsap.to(leftDoor.scale, 3, { x: 110, y: 110, z: 110, ease: "power3.inOut" })
        gsap.to(rightDoor.scale, 3, { x: 110, y: 110, z: 110, ease: "power3.inOut" })
        gsap.to(sign.scale, 3, { x: 100, y: 100, z: 100, ease: "power3.inOut" })
        gsap.to(table.scale, 3, { x: 110, y: 110, z: 110, ease: "power3.inOut" })
        gsap.to(pylone.scale, 3, { x: 110, y: 80, z: 110, ease: "power3.inOut" })
        gsap.to(pylone2.scale, 2.85, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .15 })
        gsap.to(pylone3.scale, 2.7, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .3 })
        gsap.to(pylone4.scale, 2.55, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .45 })
        gsap.to(pylone5.scale, 2.4, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .6 })
        gsap.to(grid5.scale, 3, { x: 110, y: 80, z: 110, ease: "power3.inOut" })
        gsap.to(grid4.scale, 2.85, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .15 })
        gsap.to(grid3.scale, 2.7, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .3 })
        gsap.to(grid2.scale, 2.55, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .45 })
        gsap.to(grid.scale, 2.4, { x: 110, y: 80, z: 110, ease: "power3.inOut", delay: .6 })
        gsap.to(poutre.scale, 3, { x: 90, y: 100, z: 100, ease: "power3.inOut" })
        gsap.to(street.scale, 0, { x: 110, y: 110, z: 110, delay: 3.1 })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColor.r, g: cyanColor.g, b: cyanColor.b, delay: 1 });
        //SWITCH ELEMENTS ON CLICK  
        setTimeout(function() {
            btnBackHome.classList.add('open');
            btnBackHome.classList.remove('close');
            homeContainer.classList.add('open');
            homeContainer.classList.remove('close');
            canvas.style.zIndex = 1;
        }, 1500)
    }, 1000)
}

btnStart.addEventListener('click', function() {
    functionBtnStart();
    setTimeout(function() {
        spanContainerStartMouseOut.classList.remove('neonText');
    }, 750)
})

btnStart.addEventListener('mouseenter', function() {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: -40, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    spanContainerStartMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
})

btnStart.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerStartMouseover span", { duration: .5, translateY: 0, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    TweenMax.to(".spanContainerStartMouseout span", { duration: .5, translateY: 40, stagger: { each: 0.01, from: "center" }, ease: "power2.inOut" });
    spanContainerStartMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
})

btnBackHome.addEventListener('click', function() {
    functionBtnBackHome();
    setTimeout(function() {
        spanContainerBackMouseOut.classList.remove('neonText');
    }, 750)
})

btnBackHome.addEventListener('mouseenter', function() {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: -40, stagger: .027, ease: "power2.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 0, stagger: .027, ease: "power2.inOut" });
    spanContainerBackMouseOut.classList.add('neonText');
    cursorShapeIn.classList.add('mouseover');
})

btnBackHome.addEventListener('mouseleave', function() {
    TweenMax.to(".spanContainerBackMouseover span", { duration: .5, translateY: 0, stagger: .027, ease: "power2.inOut" });
    TweenMax.to(".spanContainerBackMouseout span", { duration: .5, translateY: 40, stagger: .027, ease: "power2.inOut" });
    spanContainerBackMouseOut.classList.remove('neonText');
    cursorShapeIn.classList.remove('mouseover');
})

///// BUTTON START HOVER /////
let btnStartText = "Découvrir les ateliers"
let charsTextBtnStart = btnStartText.split('')

charsTextBtnStart.forEach(letter => {
    let btnStartchar = document.createElement('span')
    btnStartchar.innerHTML = letter
    spanContainerStartMouseOver.append(btnStartchar)
});

charsTextBtnStart.forEach(letter => {
    let btnStartchar = document.createElement('span')
    btnStartchar.innerHTML = letter
    spanContainerStartMouseOut.append(btnStartchar)
});

///// BUTTON BACK HOVER /////
let btnBackText = "Retour"
let charsTextBtnBack = btnBackText.split('')

charsTextBtnBack.forEach(letter => {
    let btnBackchar = document.createElement('span')
    btnBackchar.innerHTML = letter
    spanContainerBackMouseOver.append(btnBackchar)
});

charsTextBtnBack.forEach(letter => {
    let btnBackchar = document.createElement('span')
    btnBackchar.innerHTML = letter
    spanContainerBackMouseOut.append(btnBackchar)
});


///// WORKSHOP TIMELINE /////
containerTimeline.addEventListener('mouseenter', function() {
    TweenMax.to(workShopButton, { duration: .25, clipPath: "inset(0% 0% 0% 0%)", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "100%", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "2px", stagger: 0.02, ease: "power3.inOut", delay: .5 });
    TweenMax.to(containerTimeline, { duration: 0, clipPath: "inset(0% 0% 0% 0%)", ease: "power3.inOut" });
    timelineIndication.classList.add('switch');
})

containerTimeline.addEventListener('mouseleave', function() {
    TweenMax.to(workShopButton, { duration: .25, clipPath: "inset(0% 0% 0% 99%)", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "100%", stagger: 0.02, ease: "power3.inOut" });
    TweenMax.to(workShopButtonMask, { duration: .25, width: "2px", stagger: 0.02, ease: "power3.inOut", delay: .5 });
    TweenMax.to(containerTimeline, { duration: .25, clipPath: "inset(0% 0% 0% 70%)", ease: "power3.inOut" });
    setTimeout(function() {
        timelineIndication.classList.remove('switch');
    }, 500)

})


/////// TIMELINE BUTTONS HOVER ///////
workShopButton14.addEventListener('mouseleave', function() {
    workShopButton14.classList.add('mouseout')
    workShopButton14.classList.remove('mouseover')
})


/////// SM HOVER ///////
sm1.classList.add('mouseout')
sm2.classList.add('mouseout')
sm3.classList.add('mouseout')

sm1.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 6
    sm1.classList.add('mouseover')
    sm1.classList.remove('mouseout')
    sm1.classList.add('neonText')
})

sm1.addEventListener('mouseleave', function() {
    sm1.classList.add('mouseout')
    sm1.classList.remove('mouseover')
    sm1.classList.remove('neonText')
})

sm1.addEventListener('click', function() {
    window.open('https://www.facebook.com/mmi.tarbes.jpo', '_blank');

})

sm2.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 2
    sm2.classList.add('mouseover')
    sm2.classList.remove('mouseout')
    sm2.classList.add('neonText')
})

sm2.addEventListener('mouseleave', function() {
    sm2.classList.add('mouseout')
    sm2.classList.remove('mouseover')
    sm2.classList.remove('neonText')
})

sm2.addEventListener('click', function() {
    window.open('https://www.instagram.com/immersions_digitales_tarbes/', '_blank');

})

sm3.addEventListener('mouseenter', function() { // POINTER SOCIAL MEDIA 3
    sm3.classList.add('mouseover')
    sm3.classList.remove('mouseout')
    sm3.classList.add('neonText')
})

sm3.addEventListener('mouseleave', function() {
    sm3.classList.add('mouseout')
    sm3.classList.remove('mouseover')
    sm3.classList.remove('neonText')
})

sm3.addEventListener('click', function() {
    window.open('https://www.linkedin.com/in/immersions-digitales/', '_blank');
})

///// CUSTOM CURSOR /////
const pixelRatio = window.devicePixelRatio;

Math.dist = (dx, dy) => {
    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2))
}

class Cursor {
    constructor(cursor) {
        // this.container = window["cursor"];
        this.shape = cursor;
        this.translation = {
            x: 1,
            y: 1
        };
        this.mouse = {
            x: window.innerWidth / 2,
            y: window.innerHeight / 2
        };
        this.precision = 2;
        this.scale = 1;
        this.rotation = 1;
        this.friction = .500;
        this.animate();
        this.events();
    }
    
    events() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX * pixelRatio;
            this.mouse.y = e.clientY * pixelRatio;
        }, false);
    }
    
    animate() {
        requestAnimationFrame(this.animate.bind(this));
        this.render();
    }
    
    speed_morph() {
        const dist = Math.dist(this.dx, this.dy);
        const min = 1;
        const max_distance = 200;
        const total = dist / max_distance;
        return Number(Math.min(total, min).toFixed(2));
    }
    
    update() {
        const speed_morph = this.speed_morph(this.dx, this.dy);
        this.scale += (speed_morph - this.scale) * this.friction;
        
        this.translation.x += this.dx * this.friction;
        this.translation.y += this.dy * this.friction;
        
        this.rotation = Math.atan2(this.dy, this.dx) * 180 / Math.PI;
        
    }
    
    render() {
        this.update();
        // this.container.style.transform = 'translate3d(' + this.translation.x.toFixed(this.precision) + 'px ,' + this.translation.y.toFixed(this.precision) + 'px, 0)';
        this.shape.style.transform = 'rotate(' + this.rotation.toFixed(this.precision) + 'deg) ' + 'scale(' + (1 + this.scale) + ', ' + (1 - this.scale) + ')';
    }

    get dx() {
        return this.mouse.x - this.translation.x;
    }

    get dy() {
        return this.mouse.y - this.translation.y;
    }
}

document.addEventListener('mousemove', e => {
    indicClickOnPlane.style.top = e.pageY - 10 +"px"
    indicClickOnPlane.style.left = e.pageX - 10 +"px"
})

let isStuck = false;
let mouse = {
    x: -100,
    y: -100,
};

// Just in case you need to scroll
let scrollHeight = 0;
window.addEventListener('scroll', function(e) {
    scrollHeight = window.scrollY
})

let cursorOuterOriginalState = {
    width: cursorShapeOut.getBoundingClientRect().width,
    height: cursorShapeOut.getBoundingClientRect().height,
};

buttons.forEach(button => {
    button.addEventListener("pointerenter", handleMouseEnter);
    button.addEventListener("pointerleave", handleMouseLeave);
});

sm.forEach(media => {
    media.addEventListener("pointerenter", handleMouseEnter);
    media.addEventListener("pointerleave", handleMouseLeave);
});

workShopButton.forEach(button => {
    button.addEventListener("pointerenter", handleMouseEnter);
    button.addEventListener("pointerleave", handleMouseLeave);
})

document.body.addEventListener("pointermove", updateCursorPosition);

function updateCursorPosition(e) {
    mouse.x = e.pageX;
    mouse.y = e.pageY;
}

function updateCursor() {
    gsap.set(cursor, {
        x: mouse.x,
        y: mouse.y,
    });

    if (!isStuck) {
        gsap.to(cursorShapeOut, {
            duration: 0.15,
            x: mouse.x - cursorOuterOriginalState.width / 2,
            y: mouse.y - cursorOuterOriginalState.height / 2,
        });
    }

    requestAnimationFrame(updateCursor);
}

function handleMouseEnter(e) {
    isStuck = true;
    const targetBox = e.currentTarget.getBoundingClientRect();
    console.log(targetBox)
    gsap.to(cursorShapeOut, 0.2, {
        x: targetBox.left,
        y: targetBox.top + scrollHeight,
        width: targetBox.width,
        height: targetBox.height,
        borderRadius: 0,
        backgroundColor: "transparent",
    });
    cursorShapeIn.classList.add('mouseover');
}

function handleMouseLeave(e) {
    isStuck = false;
    // updateCursor();
    gsap.to(cursorShapeOut, 0.2, {
        width: cursorOuterOriginalState.width,
        height: cursorOuterOriginalState.height,
        borderRadius: "50px",
        backgroundColor: "transparent",
    });
    cursorShapeIn.classList.remove('mouseover');
}


/////// TIMELINE REDIRECTION ///////
workShopButton1.addEventListener('click', function() { // WORKSHOP 1
    scrollPlane1();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture14Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture14Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton2.addEventListener('click', function() { // WORKSHOP 2
    scrollPlane2();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture13Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture13Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton3.addEventListener('click', function() { // WORKSHOP 3
    scrollPlane3();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture12Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture12Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton4.addEventListener('click', function() { // WORKSHOP 4
    scrollPlane4();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture11Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture11Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton5.addEventListener('click', function() { // WORKSHOP 5
    scrollPlane5();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture10Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture10Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton6.addEventListener('click', function() { // WORKSHOP 6
    scrollPlane6();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture9Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture9Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton7.addEventListener('click', function() { // WORKSHOP 7
    scrollPlane7();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture8Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture8Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton8.addEventListener('click', function() { // WORKSHOP 8
    scrollPlane8();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture7Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture7Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton9.addEventListener('click', function() { // WORKSHOP 9
    scrollPlane9();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture6Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture6Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton10.addEventListener('click', function() { // WORKSHOP 10
    scrollPlane10();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture5Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture5Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton11.addEventListener('click', function() { // WORKSHOP 11
    scrollPlane11();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture4Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture4Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton12.addEventListener('click', function() { // WORKSHOP 12
    scrollPlane12();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture3Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture3Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton13.addEventListener('click', function() { // WORKSHOP 13
    scrollPlane13();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture2Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture2Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

workShopButton14.addEventListener('click', function() { // WORKSHOP 14
    scrollPlane14();
    if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
        materialPlanePanneau.uniforms.imagergb.value = texture1Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
    } else {
        materialPlanePanneau.uniforms.imagebw.value = texture1Hover
        gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
    }
})

function scrollPlane14() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -17, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -3.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: 0, ease: "power3.inOut" })
}

function scrollPlane13() {
    // if (planeAxe.position.y <= -16.01 && planeAxe.position.y >= -17) {
        //AXES ANIM
        gsap.to(planeAxe.position, .75, { y: -16, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, .75, { y: -4 * Math.PI, ease: "power3.inOut" })
            //PLANE ROTATION Z ANIM
        gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh13.rotation, .75, { z: 0, ease: "power3.inOut" })
        gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    // }
}

function scrollPlane12() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -15, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -4.5 * Math.PI, ease: "power3.inOut" })
        //PLANE ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane11() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -14, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })    
}

function scrollPlane10() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -13, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -5.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane9() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -12, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -6 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane8() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -11, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -6.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane7() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -10, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -7 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane6() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -9, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -7.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane5() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -8, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -8 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane4() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -7, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -8.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane3() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -6, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -9 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane2() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -5, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -9.5 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

function scrollPlane1() {
    //AXES ANIM
    gsap.to(planeAxe.position, .75, { y: -4, ease: "power3.inOut" })
    gsap.to(planeAxe.rotation, .75, { y: -10 * Math.PI, ease: "power3.inOut" })
        //PLANES ROTATION Z ANIM
    gsap.to(planeMesh1.rotation, .75, { z: 0, ease: "power3.inOut" })
    gsap.to(planeMesh2.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh3.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh4.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh5.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh6.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh7.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh8.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh9.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh10.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh11.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh12.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh13.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
    gsap.to(planeMesh14.rotation, .75, { z: rotateZ, ease: "power3.inOut" })
}

///// SCROLL FUNCTIONS /////
function scrollUp() {
    console.log(materialPlanePanneau.uniforms.dispFactor.value)
    // camera.position.z += 1;
    if (planeAxe.position.y <= -17 && planeAxe.position.y >= -17.1) {
        scene.add(particleMesh);
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: -26.5, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: 0, ease: "power3.inOut" })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 2.95, { z: 11.3, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        }
        //HTML ELEMENTS ANIM
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
        btnStart.disabled = false;
        titleSvgPath.forEach(e => {
            e.classList.add("pathTitleIn")
            e.classList.remove("pathTitleOut")
        });
        titleSvgLine.classList.add("pathLineIn")
        titleSvgLine.classList.remove("pathLineOut")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgLine.classList.remove("pathLineIn")
        littleTitleSvgLine.classList.add("pathLineOut")
        TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
            //PLANE ROTATION Z ANIM
        gsap.to(planeMesh1.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh2.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh3.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh4.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh5.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh6.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh7.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh8.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh9.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh10.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh11.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh12.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh13.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh14.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
        gsap.to(logo.scale, 2.25, { z: 0, x: 0, y: 0, ease: "power3.inOut", })
        gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(home.position, 2.95, { z: 0, x: -1.45, ease: "power3.inOut" })
        gsap.to(home.rotation, 2.95, { y: -.35, z: 0, ease: "power3.inOut" })
        gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
        gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
        gsap.to(field.scale, 2.25, { y: 0.0001, x: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(field.position, 2.25, { y: -53, ease: "power3.inOut" })
        gsap.to(leftWall.position, 2.25, { x: -51.2, ease: "power3.inOut" })
        gsap.to(leftWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightWall.position, 2.25, { x: 58.8, ease: "power3.inOut" })
        gsap.to(rightWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(leftDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(rightDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(leftDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(sign.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(table.scale, 2.25, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone5.scale, 2.25, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone4.scale, 2.1, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(pylone3.scale, 1.95, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(pylone2.scale, 1.8, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(pylone.scale, 1.65, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(grid.scale, 2.25, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut" })
        gsap.to(grid2.scale, 2.1, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(grid3.scale, 1.95, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(grid4.scale, 1.8, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(grid5.scale, 1.65, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(poutre.scale, 2.25, { x: 0.0001, y: 100, z: 0.0001, ease: "power3.inOut" })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        homeContainer.classList.add('close');
        homeContainer.classList.remove('open');
        btnBackHome.classList.add('close');
        btnBackHome.classList.remove('open');
        canvas.style.zIndex = -1;
    } else if (planeAxe.position.y <= -16 && planeAxe.position.y >= -17.1) {
        scrollPlane14();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture1Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture1Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -15 && planeAxe.position.y >= -16.1) {
        scrollPlane13();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -14 && planeAxe.position.y >= -15.1) {
        scrollPlane12();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -13 && planeAxe.position.y >= -14.1) {
        scrollPlane11();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -12 && planeAxe.position.y >= -13.1) {
        scrollPlane10();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -11 && planeAxe.position.y >= -12.1) {
        scrollPlane9();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -10 && planeAxe.position.y >= -11.1) {
        scrollPlane8();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -9 && planeAxe.position.y >= -10.1) {
        scrollPlane7();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -8 && planeAxe.position.y >= -9.1) {
        scrollPlane6();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -7 && planeAxe.position.y >= -8.1) {
        scrollPlane5();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -6 && planeAxe.position.y >= -7.1) {
        scrollPlane4();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -5 && planeAxe.position.y >= -6.1) {
        scrollPlane3();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -4 && planeAxe.position.y >= -5.1) {
        scrollPlane2();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    }
}

function scrollDown() {
    console.log(materialPlanePanneau.uniforms.dispFactor.value)
    // camera.position.z -= 1;
    if (planeAxe.position.y <= -16.01 && planeAxe.position.y >= -17) {
        scrollPlane13();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture2Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -15.01 && planeAxe.position.y >= -16) {
        scrollPlane12();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture3Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -14.01 && planeAxe.position.y >= -15) {
        scrollPlane11();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture4Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -13.01 && planeAxe.position.y >= -14) {
        scrollPlane10();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture5Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -12.01 && planeAxe.position.y >= -13) {
        scrollPlane9();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture6Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -11.01 && planeAxe.position.y >= -12) {
        scrollPlane8();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture7Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -10.01 && planeAxe.position.y >= -11) {
        scrollPlane7();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture8Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -9.01 && planeAxe.position.y >= -10) {
        scrollPlane6();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture9Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -8.01 && planeAxe.position.y >= -9) {
        scrollPlane5();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture10Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -7.01 && planeAxe.position.y >= -8) {
        scrollPlane4();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture11Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -6.01 && planeAxe.position.y >= -7) {
        scrollPlane3();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture12Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -5.01 && planeAxe.position.y >= -6) {
        scrollPlane2();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture13Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y <= -4.01 && planeAxe.position.y >= -5) {
        scrollPlane1();
        if (materialPlanePanneau.uniforms.dispFactor.value >= .0 && materialPlanePanneau.uniforms.dispFactor.value <= .2) {
            materialPlanePanneau.uniforms.imagergb.value = texture14Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: 1.0, ease: Power3.easeOut });
        } else {
            materialPlanePanneau.uniforms.imagebw.value = texture14Hover
            gsap.to(materialPlanePanneau.uniforms.dispFactor, 1.5, { value: .0, ease: Power3.easeOut });
        }
    } else if (planeAxe.position.y == -4) {
        scene.add(particleMesh);
        //AXES ANIM
        gsap.to(planeAxe.position, 2.25, { y: 4.2, ease: "power3.inOut" })
        gsap.to(planeAxe.rotation, 2.25, { y: -13.5 * Math.PI, ease: "power3.inOut" })
            //CAMERA ANIM
        if (window.matchMedia("(max-width: 600px)").matches) {
            gsap.to(camera.position, 2.95, { z: 11.3, ease: "power3.inOut" })
        } else {
            gsap.to(camera.position, 2.95, { z: 10, ease: "power3.inOut" })
        }
        //HTML ELEMENTS ANIM
        canvas.classList.remove('hologramDefault')
        canvas.classList.add('hologramActive')
        btnBackHome.disabled = true;
        btnStart.disabled = false;
        titleSvgPath.forEach(e => {
            e.classList.add("pathTitleIn")
            e.classList.remove("pathTitleOut")
        });
        titleSvgLine.classList.add("pathLineIn")
        titleSvgLine.classList.remove("pathLineOut")

        littleTitleSvgPath.forEach(e => {
            e.classList.remove("pathTitleIn")
            e.classList.add("pathTitleOut")
        });
        littleTitleSvgLine.classList.remove("pathLineIn")
        littleTitleSvgLine.classList.add("pathLineOut")
        TweenMax.to(btnStart, .75, { opacity: 1, clipPath: "inset(0% 0% 0% 0%)", delay: .75, ease: "power3.inOut" })
        TweenMax.to(btnBackHome, 1, { opacity: 0, clipPath: "inset(0% 100% 0% 0%)", ease: "power3.inOut" })
            //PLANE ROTATION Z ANIM
        gsap.to(planeMesh1.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh2.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh3.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh4.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh5.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh6.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh7.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh8.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh9.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh10.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh11.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh12.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh13.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
        gsap.to(planeMesh14.rotation, 2.25, { z: rotateZ, ease: "power3.inOut" })
            //MODELS ANIM
        gsap.to(logo.position, 2.25, { y: -9.8, ease: "power3.inOut" })
        gsap.to(logo.scale, 2.25, { z: 0.0001, x: 0.0001, y: 0.0001, ease: "power3.inOut", })
        gsap.to(logo.rotation, 2.25, { z: -.725, y: 0, ease: "power3.inOut" })
        gsap.to(home.position, 2.95, { z: 0, x: -1.45, ease: "power3.inOut" })
        gsap.to(home.rotation, 2.95, { y: -.35, z: 0, ease: "power3.inOut" })
        gsap.to(socle.position, 2.25, { y: -10.7, ease: "power3.inOut" })
        gsap.to(socle.rotation, 2.25, { y: 0, ease: "power3.inOut" })
        gsap.to(field.scale, 2.25, { y: 0.0001, x: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(field.position, 2.25, { y: -53, ease: "power3.inOut" })
        gsap.to(leftWall.position, 2.25, { x: -51.2, ease: "power3.inOut" })
        gsap.to(leftWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightWall.position, 2.25, { x: 58.8, ease: "power3.inOut" })
        gsap.to(rightWall.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(leftDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(rightDoor.position, 2.25, { y: -55.8, ease: "power3.inOut" })
        gsap.to(leftDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(rightDoor.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(sign.scale, 2.25, { x: 0.0001, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(table.scale, 2.25, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone5.scale, 2.25, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut" })
        gsap.to(pylone4.scale, 2.1, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(pylone3.scale, 1.95, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(pylone2.scale, 1.8, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(pylone.scale, 1.65, { x: 110, y: 0.0001, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(grid.scale, 2.25, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut" })
        gsap.to(grid2.scale, 2.1, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .15 })
        gsap.to(grid3.scale, 1.95, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .3 })
        gsap.to(grid4.scale, 1.8, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .45 })
        gsap.to(grid5.scale, 1.65, { x: 0.0001, y: 110, z: 0.0001, ease: "power3.inOut", delay: .6 })
        gsap.to(poutre.scale, 2.25, { x: 0.0001, y: 100, z: 0.0001, ease: "power3.inOut" })
            //LIGHTS ANIM
        TweenMax.to(lightCenterSocle.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        TweenMax.to(lightCenter.color, .75, { r: cyanColorReset.r, g: cyanColorReset.g, b: cyanColorReset.b, delay: .75 });
        //SWITCH ELEMENTS ON CLICK
        homeContainer.classList.add('close');
        homeContainer.classList.remove('open');
        btnBackHome.classList.add('close');
        btnBackHome.classList.remove('open');
        canvas.style.zIndex = -1;
        //RESET AXES POSITION 
        gsap.to(planeAxe.position, 0, { y: -26.5, delay: 3 })
        gsap.to(planeAxe.rotation, 0, { y: 0, delay: 3 })
        gsap.to(planeAxe.scale, 0, { y: 0.0001, x: 0.0001, z: 0.0001, delay: 2 })
        gsap.to(planeAxe.scale, 0, { y: 1, x: 1, z: 1, delay: 3.1 })
    }
}
///// MOUSE SCROLL /////
document.body.addEventListener('wheel', scrollPlane);

function scrollPlane(event) {
    if (checkScrollDirectionIsUp(event)) { // SCROLL UP
        scrollUp();
        console.log("up:" + planeAxe.position.y)
    } else { // SCROLL DOWN
        scrollDown();
        console.log("down:" + planeAxe.position.y)
    }
}

function checkScrollDirectionIsUp(event) { //REVERSE SCROLL
    if (event.wheelDeltaY) {
        return event.wheelDeltaY > 0;
    }
    return event.deltaY < 0;
}

///// ARROWS SCROLL + KEY ECHAP ///////
document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            console.log('left');
            break;
        case 38: // SCROLL UP
            console.log('up');
            scrollUp();
            break;
        case 39:
            console.log('right');
            break;
        case 40: // SCROLL DOWN
            console.log('down');
            scrollDown();
            break;
        case 27:
            if (camera.position.z == 3.7) {
                functionBtnBackHome();
                console.log("echap")
            }
            break;
        case 13:
            if (camera.position.z == 10) {
                functionBtnStart();
                console.log("enter")
            }
            break;
    }
};


// /////// DRAG EVENT ///////
// let isDown = false;
// var last_position = {};

// document.body.addEventListener('mousedown', () => {
//     isDown = true;

// });
// document.body.addEventListener('mouseleave', () => {
//     isDown = false;
// });
// document.body.addEventListener('mouseup', () => {
//     isDown = false;

// });


// /////// DRAG EVENT COMPUTER ///////
// document.body.addEventListener('mousemove', function(event) {
//     if (typeof(last_position.x) != 'undefined') {
//         var deltaX = last_position.x - event.offsetX,
//             deltaY = last_position.y - event.offsetY;
//         if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) { // MOUSEMOVE LEFT

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) { // MOUSEMOVE RIGHT

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) { // MOUSEMOVE UP

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) { // MOUSEMOVE DOWN

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED

//         }
//     }
//     last_position = {
//         x: event.offsetX,
//         y: event.offsetY
//     }
// })

// /////// DRAG EVENT MOBILE ///////
// document.body.addEventListener('touchmove', function(event) {
//     if (typeof(last_position.x) != 'undefined') {
//         var deltaX = last_position.x - event.offsetX,
//             deltaY = last_position.y - event.offsetY;
//         if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX > 0) { // TOUCHMOVE LEFT

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED

//         } else if (Math.abs(deltaX) > Math.abs(deltaY) && deltaX < 0) { // TOUCHMOVE RIGHT

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED


//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY > 0) { // TOUCHMOVE UP

//             if (!isDown) return;

//             mesh.rotation.y -= 0.1;

//             planeAxe.rotation.y += 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y -= 1 / 20; // POSITION SPEED

//         } else if (Math.abs(deltaY) > Math.abs(deltaX) && deltaY < 0) { // TOUCHMOVE DOWN

//             if (!isDown) return;

//             mesh.rotation.y += 0.1;

//             planeAxe.rotation.y -= 1 / 2 * Math.PI / 20; // ROTATION SPEED
//             planeAxe.position.y += 1 / 20; // POSITION SPEED
//         }
//     }
//     last_position = {
//         x: event.offsetX,
//         y: event.offsetY
//     }
// })

let variation = 0;
let variationShaders = 0;

var render = function() {

    composer.render();

    requestAnimationFrame(render);

    if (camera.position.z < 6 && materialPlane1.uniforms.alpha.value > 0.0) {
        logo.rotation.y += .01
        if (logo.rotation.y > Math.PI) {
            logo.rotation.y -= Math.PI * 2
        }
    }


    particleGeo.vertices.forEach(p => { //PARTICLES ANIMATION
        p.y += 0.0025;
        variation += 0.000005;
        p.x += Math.sin(variation) / 1000
        if (p.y > 9) {
            p.y = -9;
        }
    });

    particleGeo.verticesNeedUpdate = true;

    // window.onmousemove = function(e) { //PARTICLES MOUSE EVENT

    //     // var resetCenterX = window.innerWidth / 2;
    //     // var resetCenterY = window.innerHeight / 2;

    //     if (camera.position.z > 9.9) {
    //         var cameraRotationYTolerance = .02;
    //         var cameraRotationXTolerance = .01;

    //         var rotX = window.innerWidth * .5;
    //         var rotY = window.innerHeight * .5;

    //         camera.rotation.y = (e.clientX - rotX) / rotX * cameraRotationYTolerance;
    //         camera.rotation.x = (e.clientY - rotY) / rotY * cameraRotationXTolerance;
    //     }

    // };

    renderer.render(scene, camera);

    materialPlane1.uniforms.time.value = clock.getElapsedTime();
    materialPlane2.uniforms.time.value = clock.getElapsedTime();
    materialPlane3.uniforms.time.value = clock.getElapsedTime();
    materialPlane4.uniforms.time.value = clock.getElapsedTime();
    materialPlane5.uniforms.time.value = clock.getElapsedTime();
    materialPlane6.uniforms.time.value = clock.getElapsedTime();
    materialPlane7.uniforms.time.value = clock.getElapsedTime();
    materialPlane8.uniforms.time.value = clock.getElapsedTime();
    materialPlane9.uniforms.time.value = clock.getElapsedTime();
    materialPlane10.uniforms.time.value = clock.getElapsedTime();
    materialPlane11.uniforms.time.value = clock.getElapsedTime();
    materialPlane12.uniforms.time.value = clock.getElapsedTime();
    materialPlane13.uniforms.time.value = clock.getElapsedTime();
    materialPlane14.uniforms.time.value = clock.getElapsedTime();
};

render();