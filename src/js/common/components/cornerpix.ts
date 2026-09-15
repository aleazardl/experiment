declare var THREE: any;

let burstMaterial: any = null;

export const getBurstMaterial = () => burstMaterial;

const corner = () => {
  const canvas = document.querySelector(
    '.js-corner'
  ) as HTMLCanvasElement | null;

  if (!canvas) return;

  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: false,
  });

  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const uniforms = {
    uBurst: {
      value: 0,
    },
    uBurstRadius: {
      value: 0.05,
    },
    uPixelSize: {
      value: 0.04,
    },
  };

  const vertexShader = `
    varying vec2 vUv;

    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float uBurst;
    uniform float uBurstRadius;
    uniform float uPixelSize;

    varying vec2 vUv;

    float rand(vec2 co) {
      return fract(
        sin(dot(co.xy, vec2(12.9898, 78.233))) * 43758.5453
      );
    }

    void main() {
      // ===================================================
      // Pixelate
      // ===================================================

      vec2 pixelUv = floor(vUv / uPixelSize) * uPixelSize;
      vec2 pixelCenter = pixelUv + uPixelSize * 0.5;
      float pixelRand = rand(pixelCenter);

      // ===================================================
      // TOP RIGHT CORNER
      // ===================================================

      vec2 burstCenter = vec2(1.0, 1.0);
      float burstDistance = distance(pixelCenter, burstCenter);

      // ===================================================
      // Radius
      // ===================================================

      float burstArea =
        1.0 - smoothstep(uBurstRadius * 0.3, uBurstRadius, burstDistance);

      // ===================================================
      // Pixel pattern
      // ===================================================

      float burstPixel = step(0.001, pixelRand) * burstArea * uBurst;

      // ===================================================
      // Discard
      // ===================================================

      float discardThreshold = 0.05 + pixelRand * 0.2;

      if (burstPixel <= discardThreshold) {
        discard;
      }

      // ===================================================
      // Output
      // ===================================================

      gl_FragColor = vec4(1.0, 1.0, 1.0, burstPixel * 0.8);
    }
  `;

  burstMaterial = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    // ONLY the corner burst is additive
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    depthTest: false,
  });

  const geometry = new THREE.PlaneGeometry(2, 2);
  const mesh = new THREE.Mesh(geometry, burstMaterial);
  scene.add(mesh);

  const animate = () => {
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  };

  animate();

  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
};

export default corner;