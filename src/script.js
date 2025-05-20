import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */
const canvas = document.querySelector('canvas.webgl')
const scene = new THREE.Scene()

/**
 * Particles
 */
const particlesGeometry = new THREE.SphereGeometry(2.5, 32, 32) // Más partículas y radio más pequeño
const particlesMaterial = new THREE.PointsMaterial({
    size: 0.02,
    sizeAttenuation: true
})
const particles = new THREE.Points(particlesGeometry, particlesMaterial)
scene.add(particles)

/**
 * Central Sphere (color dinámico)
 */
const sphereMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color("hsl(0, 100%, 50%)") })
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(1, 32, 32),
    sphereMaterial
)
scene.add(sphere)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 7
scene.add(camera)

/**
 * Controls
 */
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Orbiting particles
    particles.rotation.y = elapsedTime * 0.5

    // Dynamic color changing sphere
    const hue = (elapsedTime * 40) % 360 // Speed of hue change
    sphere.material.color.setHSL(hue / 360, 1, 0.5)

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Next frame
    window.requestAnimationFrame(tick)
}

tick()
