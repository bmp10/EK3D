import * as THREE from 'https://unpkg.com/three/build/three.module.js';

import {OrbitControls} from 'https://unpkg.com/three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'https://unpkg.com/three/examples/jsm/loaders/GLTFLoader.js';

const bg = document.getElementById("bg")

export const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({
    canvas: bg,
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(1000, 1000);
camera.position.setZ(10);

renderer.render(scene, camera)


const loader = new GLTFLoader();
loader.load('Model1.glb', function(gltf) {
    console.log(gltf)
    for (let i = 0; i < 5; i ++) {
        gltf.scene.children.forEach(function(mesh, index, array) {
            scene.add(mesh)
        })
    }
    console.log(scene.children)
}, undefined, function (error) {
    console.error(error)
})

const ambientlight = new THREE.AmbientLight(0xffffff);
scene.add(ambientlight)

console.log(scene.children)

const controls = new OrbitControls(camera, renderer.domElement)

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    renderer.render(scene, camera);
}

animate()