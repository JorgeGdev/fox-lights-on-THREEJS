import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import shadingVertexShader from './shaders/shading/vertex.glsl'
import shadingFragmentShader from './shaders/shading/fragment.glsl'
import { color } from 'three/examples/jsm/nodes/Nodes.js'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Loaders
const gltfLoader = new GLTFLoader()

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: Math.min(window.devicePixelRatio, 2)
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    sizes.pixelRatio = Math.min(window.devicePixelRatio, 2)

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(sizes.pixelRatio)
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(25, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 7
camera.position.y = 7
camera.position.z = 7
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
// renderer.toneMapping = THREE.ACESFilmicToneMapping
// renderer.toneMappingExposure = 3
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(sizes.pixelRatio)

/**
 * Material
 */
const materialParameters = {}
materialParameters.color = '#ffffff'

const material = new THREE.ShaderMaterial({
    vertexShader: shadingVertexShader,
    fragmentShader: shadingFragmentShader,
    uniforms:
    {
        uColor: new THREE.Uniform(new THREE.Color(materialParameters.color)),
    }
})

gui
    .addColor(materialParameters, 'color')
    .onChange(() =>
    {
        material.uniforms.uColor.value.set(materialParameters.color)
    })

// Suzanne
let suzanne = null
gltfLoader.load(
    './cute_fox.glb',
    (gltf) =>
    {
        suzanne = gltf.scene
        suzanne.traverse((child) =>
        {
            if(child.isMesh)
                child.material = material
                scene.add(gltf.scene)
        })
        //suzanne.scale.set(0.10, 0.10, 0.10)
        scene.add(suzanne)
    }
)


//HELPERS 





//DIRECTIONAL LIGHT
const directionalLightHelper = new THREE.Mesh(
    new THREE.PlaneGeometry(0.5, 0.5),
    new THREE.MeshBasicMaterial()
)


directionalLightHelper.material.color.setRGB(0.1, 0.1, 1.0)
directionalLightHelper.material.side = THREE.DoubleSide
directionalLightHelper.position.set(-1, 0, 4)

scene.add(directionalLightHelper)


//DIRECTIONAL LIGHT2
const directionalLightHelper2 = new THREE.Mesh(
    new THREE.PlaneGeometry(0.3, 0.3),
    new THREE.MeshBasicMaterial()
)

scene.add(directionalLightHelper2)


directionalLightHelper2.material.color.setRGB(1.0, 1.0, 1.0)
directionalLightHelper2.material.side = THREE.DoubleSide
directionalLightHelper2.position.set(1, 0, 2.5)

scene.add(directionalLightHelper)



//POINT LIGHT
const pointLightHelper = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 2),
    new THREE.MeshBasicMaterial()
)
pointLightHelper.material.color.setRGB(1.0, 0.1, 0.1)
pointLightHelper.position.set(-2, 1.5, 0)
scene.add(pointLightHelper)


//POINT LIGHT 2
const pointLightHelper2 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 2),
    new THREE.MeshBasicMaterial()
)
pointLightHelper2.material.color.setRGB(0.1, 1.0, 0.5)
pointLightHelper2.position.set(3, 0.5, 2)
scene.add(pointLightHelper2)


//POINT LIGHT 3
const pointLightHelper3 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.05, 2),
    new THREE.MeshBasicMaterial()
)
pointLightHelper3.material.color.setRGB(1.0, 1.0, 0.1)
pointLightHelper3.position.set(-3, 0.5, 2)
scene.add(pointLightHelper3)


//POINT LIGHT 4
const pointLightHelper4 = new THREE.Mesh(
    new THREE.IcosahedronGeometry(0.1, 2),
    new THREE.MeshBasicMaterial()
)
pointLightHelper4.material.color.setRGB(1.0, 0.1, 1.0)
pointLightHelper4.position.set(3, 0.5, 2)
scene.add(pointLightHelper4)


const orbitRadius = 3; // Radio de la órbita
const orbitSpeed = 0.5; // Velocidad de la órbita




/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Rotate objects
    if(suzanne)
    {
        //suzanne.rotation.x = - elapsedTime * 0.1
        suzanne.rotation.y = elapsedTime * 0.05


         // Orbital motion for pointLightHelper2 around suzanne
        pointLightHelper2.position.x = suzanne.position.x + orbitRadius * Math.cos(elapsedTime * orbitSpeed)
        pointLightHelper2.position.z = suzanne.position.z + orbitRadius * Math.sin(elapsedTime * orbitSpeed)

          // Orbital motion for pointLightHelper2 around suzanne
          pointLightHelper.position.x = suzanne.position.x + orbitRadius * Math.cos( - (elapsedTime * orbitSpeed)*2)
          pointLightHelper.position.z = suzanne.position.z + orbitRadius * Math.sin( - (elapsedTime * orbitSpeed)*2)

          // Orbital motion for pointLightHelper2 around suzanne
          pointLightHelper3.position.x = suzanne.position.x + orbitRadius * Math.cos( (elapsedTime * orbitSpeed)*2) / 0.5
          pointLightHelper3.position.z = suzanne.position.z + orbitRadius * Math.sin( (elapsedTime * orbitSpeed)*2) / 0.5


          // Orbital motion for pointLightHelper2 around suzanne
          pointLightHelper4.position.y = suzanne.position.y + orbitRadius * Math.cos( - (elapsedTime * orbitSpeed)*2) / 1.5
          pointLightHelper4.position.z = suzanne.position.z + orbitRadius * Math.sin( - (elapsedTime * orbitSpeed)*2) / 1.5





           // Orbital motion for pointLightHelper2 around suzanne
           directionalLightHelper.position.z = suzanne.position.z + orbitRadius * Math.cos( - (elapsedTime * orbitSpeed)*2)
           directionalLightHelper.position.y = suzanne.position.y + orbitRadius * Math.sin( - (elapsedTime * orbitSpeed)*2)


           
           // Orbital motion for pointLightHelper2 around suzanne
           directionalLightHelper2.position.z = suzanne.position.z + orbitRadius * Math.cos( (elapsedTime * orbitSpeed))
           directionalLightHelper2.position.y = suzanne.position.y + orbitRadius * Math.sin( (elapsedTime * orbitSpeed))

          



    }



   






    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()