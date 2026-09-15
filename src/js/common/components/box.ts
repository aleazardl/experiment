declare var THREE: any;

export let boxRenderer: any = null;
export let boxScene: any = null;
export let boxCamera: any = null;
export const rotation = { speed: 0.004 };

let mesh: any = null;

export const getMesh = () => mesh;

// =========================================================
// Get Box Scale From Viewport Width
// =========================================================
// getBoxScaleForWidth(35) = approximately 35vw wide
// =========================================================

export const getBoxScaleForWidth = (vw: number) => {
  if (!boxCamera || !mesh) return 1;

  const distance = boxCamera.position.z - mesh.position.z;
  const vFov = (boxCamera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
  const visibleWidth = visibleHeight * boxCamera.aspect;
  const targetWidth = visibleWidth * (vw / 100);
  const boxWidth = 3;

  return targetWidth / boxWidth;
};

// =========================================================
// Get Box X Position From Viewport Percentage
// =========================================================
//  0   = center
//  20  = 20% right
// -20  = 20% left
// =========================================================

export const getBoxPositionX = (percent: number) => {
  if (!boxCamera || !mesh) return 0;

  const distance = boxCamera.position.z - mesh.position.z;
  const vFov = (boxCamera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance;
  const visibleWidth = visibleHeight * boxCamera.aspect;

  return visibleWidth * (percent / 100);
};

// =========================================================
// Get Box Y Position From Viewport Percentage
// =========================================================
//  0   = center
//  20  = 20% UP
// -20  = 20% DOWN
// =========================================================

export const getBoxPositionY = (percent: number) => {
  if (!boxCamera || !mesh) return 0;

  const distance = boxCamera.position.z - mesh.position.z;
  const vFov = (boxCamera.fov * Math.PI) / 180;
  const visibleHeight = 2 * Math.tan(vFov / 2) * distance;

  return visibleHeight * (percent / 100);
};

// =========================================================
// Box
// =========================================================

const box = () => {
  const canvas = document.querySelector('.js-3d') as HTMLCanvasElement | null;
  if (!canvas) return;

  // --- Scene ---
  boxScene = new THREE.Scene();

  // --- Camera ---
  boxCamera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    100
  );
  boxCamera.position.z = 25;

  // --- Renderer ---
  boxRenderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  boxRenderer.setSize(window.innerWidth, window.innerHeight);
  boxRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // --- Frame Material ---
  const frameMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    roughness: 1,
    metalness: 0.85,
  });

  // --- Frame Settings ---
  const frameThickness = 0.4;
  const frameDepth = 1.1;
  const size = 3;

  // --- Frame Pieces ---
  const top = new THREE.Mesh(new THREE.BoxGeometry(size, frameThickness, frameDepth), frameMaterial);
  const bottom = new THREE.Mesh(new THREE.BoxGeometry(size, frameThickness, frameDepth), frameMaterial);
  const left = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, size, frameDepth), frameMaterial);
  const right = new THREE.Mesh(new THREE.BoxGeometry(frameThickness, size, frameDepth), frameMaterial);

  // --- Cylinder Material ---
  const cylinderMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4d4d4,
    roughness: 1,
    metalness: 0.85,
  });

  // --- Cylinder Geometry ---
  const cylinderGeometry = new THREE.CylinderGeometry(0.35, 0.35, 2, 32);
  const positions = cylinderGeometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const y = positions.getY(i);
    const x = positions.getX(i);
    if (y > 0.9) positions.setY(i, y + x * -1);
    else if (y < -0.9) positions.setY(i, y - x * -1);
  }

  positions.needsUpdate = true;
  cylinderGeometry.computeVertexNormals();

  // --- Cylinders ---
  const cylinder1 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
  const cylinder2 = new THREE.Mesh(cylinderGeometry, cylinderMaterial);

  cylinder1.rotation.z = Math.PI / 4;
  cylinder2.rotation.z = Math.PI / 0.8;
  cylinder1.position.x = 0.5;
  cylinder1.position.y = 0.5;
  cylinder2.position.x = -0.5;
  cylinder2.position.y = -0.5;

  // --- Frame Positions ---
  top.position.y = size / 2.3;
  bottom.position.y = -size / 2.3;
  left.position.x = -size / 2.3;
  right.position.x = size / 2.3;

  // --- Frame Group ---
  const frame = new THREE.Group();
  frame.add(top, bottom, left, right, cylinder1, cylinder2);
  frame.rotation.y = 2.8;
  boxScene.add(frame);

  // --- Lighting ---
  const ambientLight = new THREE.AmbientLight(0xd4d4d4, 2.5);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
  directionalLight.position.set(2, 3, 5);
  boxScene.add(ambientLight, directionalLight);

  // --- Store Mesh ---
  mesh = frame;
  

  // --- Render Loop ---
  // Keep the rotation/render loop HERE.
  // Do not create another render loop in jisapanim.ts.
  const animate = () => {
    frame.rotation.z += rotation.speed;
    boxRenderer.render(boxScene, boxCamera);
    requestAnimationFrame(animate);
  };

  animate();

  // --- Resize ---
  window.addEventListener('resize', () => {
    boxCamera.aspect = window.innerWidth / window.innerHeight;
    boxCamera.updateProjectionMatrix();
    boxRenderer.setSize(window.innerWidth, window.innerHeight);
    boxRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });
};

export default box;