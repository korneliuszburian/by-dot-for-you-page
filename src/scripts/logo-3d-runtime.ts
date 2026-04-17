import {
  AmbientLight,
  AnimationMixer,
  Box3,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PointLight,
  Scene,
  Timer,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const CONFIG = {
  pixelIdle: 4.0,
  pixelHover: 1.5,
  rotSpeedIdle: 0.3,
  rotSpeedHover: 0.8,
  glowColor: 0xff6600,
  glowIntensityIdle: 0.0,
  glowIntensityHover: 1.5,
} as const;

const createDitheringShader = () => ({
  uniforms: {
    tDiffuse: { value: null },
    resolution: { value: new Vector2() },
    pixelSize: { value: 1.0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D tDiffuse;
    uniform vec2 resolution;
    uniform float pixelSize;
    varying vec2 vUv;

    float dither4x4(vec2 position, float brightness) {
      int x = int(mod(position.x, 4.0));
      int y = int(mod(position.y, 4.0));
      int index = x + y * 4;
      float limit = 0.0;
      if (x < 8) {
        if (index == 0) limit = 0.0625; if (index == 1) limit = 0.5625;
        if (index == 2) limit = 0.1875; if (index == 3) limit = 0.6875;
        if (index == 4) limit = 0.8125; if (index == 5) limit = 0.3125;
        if (index == 6) limit = 0.9375; if (index == 7) limit = 0.4375;
        if (index == 8) limit = 0.25;   if (index == 9) limit = 0.75;
        if (index == 10) limit = 0.125; if (index == 11) limit = 0.625;
        if (index == 12) limit = 1.0;   if (index == 13) limit = 0.5;
        if (index == 14) limit = 0.875; if (index == 15) limit = 0.375;
      }
      return brightness < limit ? 0.0 : 1.0;
    }

    void main() {
      vec2 dxy = pixelSize / resolution;
      vec2 coord = dxy * floor(vUv / dxy);
      vec4 texel = texture2D(tDiffuse, coord);
      if (texel.a < 0.1) discard;

      vec3 color = texel.rgb;
      float lum = dot(color, vec3(0.299, 0.587, 0.114));
      vec2 screenPos = gl_FragCoord.xy / (pixelSize * 0.7);
      float dither = dither4x4(screenPos, lum);
      vec3 shadowColor = vec3(0.02, 0.02, 0.03);
      float glowFactor = max(color.r, max(color.g, color.b));
      vec3 finalColor = mix(shadowColor, color, dither);

      if (glowFactor > 0.6) {
        finalColor = color;
      }

      gl_FragColor = vec4(finalColor, texel.a);
    }
  `,
});

export const initLogo3DArtifact = (container: HTMLElement) => {
  if (container.dataset.logo3dInitialized === "true") return;

  const canvas = container.querySelector("[data-logo-3d-canvas]") as HTMLCanvasElement | null;
  const loaderEl = container.querySelector("[data-logo-3d-loader]");

  if (!canvas) return;

  container.dataset.logo3dInitialized = "true";

  let isHovered = false;
  let currentPixelSize = CONFIG.pixelIdle;
  let currentRotSpeed = CONFIG.rotSpeedIdle;
  let currentGlow = CONFIG.glowIntensityIdle;
  let animationFrameId = 0;
  let disposed = false;

  const scene = new Scene();
  const camera = new PerspectiveCamera(
    35,
    container.clientWidth / container.clientHeight,
    0.1,
    100,
  );
  camera.position.set(0, 0, 7);

  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(1);

  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));

  const shaderPass = new ShaderPass(createDitheringShader());
  shaderPass.uniforms.resolution.value.set(
    container.clientWidth,
    container.clientHeight,
  );
  shaderPass.uniforms.pixelSize.value = CONFIG.pixelIdle;
  composer.addPass(shaderPass);

  scene.add(new AmbientLight(0x223344, 0.5));

  const moonLight = new DirectionalLight(0x6688ff, 2.0);
  moonLight.position.set(-3, 5, -5);
  scene.add(moonLight);

  const fireLight = new PointLight(CONFIG.glowColor, 0, 10);
  fireLight.position.set(2, 2, 2);
  scene.add(fireLight);

  const loader = new GLTFLoader();
  let model: Group | null = null;
  let mixer: AnimationMixer | null = null;
  let material: MeshStandardMaterial | null = null;

  loader.load(
    "/logo-3d.glb",
    (gltf) => {
      if (disposed) return;

      model = gltf.scene;

      const box = new Box3().setFromObject(model);
      const center = box.getCenter(new Vector3());
      model.position.sub(center);

      const modelSize = box.getSize(new Vector3());
      const maxDim = Math.max(modelSize.x, modelSize.y);
      const scale = 3.2 / maxDim;
      model.scale.set(scale, scale, scale);

      model.traverse((child) => {
        if ((child as Mesh).isMesh) {
          const mesh = child as Mesh;
          material = new MeshStandardMaterial({
            color: 0x222222,
            metalness: 0.9,
            roughness: 0.6,
            emissive: CONFIG.glowColor,
            emissiveIntensity: 0,
          });
          mesh.material = material;
        }
      });

      scene.add(model);

      if (gltf.animations.length > 0) {
        mixer = new AnimationMixer(model);
        gltf.animations.forEach((clip) => mixer?.clipAction(clip).play());
      }

      if (loaderEl instanceof HTMLElement) {
        loaderEl.style.opacity = "0";
      }
    },
    undefined,
    () => {
      container.dataset.logo3dInitialized = "false";
      if (loaderEl instanceof HTMLElement) {
        loaderEl.textContent = "Failed to summon";
      }
    },
  );

  const updateSize = () => {
    const width = container.clientWidth;
    const height = container.clientHeight;

    if (!width || !height) return;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    composer.setSize(width, height);
    shaderPass.uniforms.resolution.value.set(width, height);
  };

  const handleMouseEnter = () => {
    isHovered = true;
  };

  const handleMouseLeave = () => {
    isHovered = false;
  };

  container.addEventListener("mouseenter", handleMouseEnter);
  container.addEventListener("mouseleave", handleMouseLeave);

  const resizeObserver =
    "ResizeObserver" in window ? new ResizeObserver(() => updateSize()) : null;

  if (resizeObserver) {
    resizeObserver.observe(container);
  } else {
    window.addEventListener("resize", updateSize);
  }

  const timer = new Timer();

  const cleanup = () => {
    if (disposed) return;
    disposed = true;

    cancelAnimationFrame(animationFrameId);
    container.removeEventListener("mouseenter", handleMouseEnter);
    container.removeEventListener("mouseleave", handleMouseLeave);

    if (resizeObserver) {
      resizeObserver.disconnect();
    } else {
      window.removeEventListener("resize", updateSize);
    }

    composer.dispose();
    renderer.dispose();
  };

  const animate = (timestamp?: number) => {
    if (disposed || !container.isConnected) {
      cleanup();
      return;
    }

    animationFrameId = requestAnimationFrame(animate);

    timer.update(timestamp);
    const delta = timer.getDelta();
    const time = timer.getElapsed();
    const targetPixel = isHovered ? CONFIG.pixelHover : CONFIG.pixelIdle;
    const targetRotSpeed = isHovered ? CONFIG.rotSpeedHover : CONFIG.rotSpeedIdle;
    const targetGlow = isHovered
      ? CONFIG.glowIntensityHover
      : CONFIG.glowIntensityIdle;
    const lerpFactor = delta * 5.0;

    currentPixelSize += (targetPixel - currentPixelSize) * lerpFactor;
    currentRotSpeed += (targetRotSpeed - currentRotSpeed) * lerpFactor;
    currentGlow += (targetGlow - currentGlow) * lerpFactor;

    shaderPass.uniforms.pixelSize.value = currentPixelSize;

    if (model) {
      model.rotation.y += currentRotSpeed * delta;
      model.position.y = Math.sin(time * 1.5) * 0.1;
    }

    if (material) {
      material.emissiveIntensity = currentGlow;
      const baseColor = isHovered ? new Color(0x331111) : new Color(0x222222);
      material.color.lerp(baseColor, lerpFactor);
    }

    fireLight.intensity = currentGlow * 2.0;

    if (mixer) {
      mixer.update(delta);
    }

    composer.render();
  };

  updateSize();
  animate();
};
