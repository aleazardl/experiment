declare var THREE: any;

let glassMaterial: any = null;

export const getGlassMaterial = () => glassMaterial;

const distortion = () => {
  const isMobile = window.innerWidth <= 980;
  if (isMobile) return;

  const canvas = document.querySelector('.js-glass') as HTMLCanvasElement | null;
  if (!canvas) return;

  // --- Scene ---
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  // --- Renderer ---
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Mouse ---
  let mouseX = 0;
  let mouseY = 0;
  let lastMouseX = 0;
  let lastMouseY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX / window.innerWidth;
    mouseY = 1 - e.clientY / window.innerHeight;
  }, { passive: true });

  // --- Trail ---
  const TRAIL_LENGTH = 30;
  const trailPositions = Array.from({ length: TRAIL_LENGTH }, () => new THREE.Vector2(0.5, 0.5));
  const trailLife = new Float32Array(TRAIL_LENGTH);

  // --- Uniforms ---
  const uniforms = {
    uTrailPositions: { value: trailPositions },
    uTrailLife: { value: trailLife },
    uRadius: { value: 0.045 },
    uPixelSize: { value: 0.04 },
    uAspect: { value: window.innerWidth / window.innerHeight },
  };

  // --- Vertex Shader ---
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  // --- Fragment Shader ---
  const fragmentShader = `
    uniform vec2 uTrailPositions[30];
    uniform float uTrailLife[30];
    uniform float uRadius;
    uniform float uPixelSize;
    uniform float uAspect;
    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 pixelUv = floor(vUv / uPixelSize) * uPixelSize;
      vec2 pixelCenter = pixelUv + uPixelSize * 0.5;
      float pixelRand = rand(pixelCenter);
      float trailActivation = 0.0;

      for (int i = 0; i < 30; i++) {
        float life = uTrailLife[i];
        if (life <= 0.0) continue;

        vec2 diff = pixelCenter - uTrailPositions[i];
        diff.x *= uAspect;

        float activation = smoothstep(uRadius, uRadius * 0.25, length(diff));
        activation *= life * (0.5 + pixelRand * 0.8);
        trailActivation = max(trailActivation, activation);
      }

      float discardThreshold = 0.05 + pixelRand * 0.2;
      if (trailActivation <= discardThreshold) discard;

      gl_FragColor = vec4(1.0, 1.0, 1.0, trailActivation * 0.8);
    }
  `;

  // --- Material ---
  glassMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    blending: THREE.NormalBlending,
    depthWrite: false,
  });

  // --- Mesh ---
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), glassMaterial);
  scene.add(mesh);

  // --- Animate ---
  const animate = () => {
    const dx = mouseX - lastMouseX;
    const dy = mouseY - lastMouseY;

    if (Math.sqrt(dx * dx + dy * dy) > 0.005) {
      for (let i = TRAIL_LENGTH - 1; i > 0; i--) {
        trailPositions[i].copy(trailPositions[i - 1]);
        trailLife[i] = trailLife[i - 1] * 0.98;
      }
      trailPositions[0].set(mouseX, mouseY);
      trailLife[0] = 1;
      lastMouseX = mouseX;
      lastMouseY = mouseY;
    }

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      trailLife[i] *= 0.98;
    }

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  // --- Resize ---
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    glassMaterial.uniforms.uAspect.value = window.innerWidth / window.innerHeight;
  });
};

export default distortion;