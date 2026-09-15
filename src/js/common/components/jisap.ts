import { getMesh, getBoxScaleForWidth, getBoxPositionX, getBoxPositionY, rotation } from './box';
import { getBurstMaterial } from './cornerpix';

declare const gsap: any;
declare const ScrollTrigger: any;

const isSP = window.innerWidth <= 980;
const isSPl = window.innerWidth <= 767;

const jisapanim = () => {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.normalizeScroll(true);

  const mesh = getMesh();
  const cornerMaterial = getBurstMaterial();

  // --- MV ---
  const an1 = gsap.timeline({
    scrollTrigger: {
      trigger: '.js-mv',
      start: 'top top',
      end: isSP ? '+=1111' : '+=3000',
      scrub: isSP ? true : 1.7,
      pin: '.js-mv',
    }
  });

  an1.to('.js-spaces', { width: '170%', height: '170%', duration: 0.3 }, 0)
    .to('.js-main-img', { scale: 0.7 }, 0)
    .to('.js-start', { opacity: 1, filter: 'blur(0px)', duration: 0.47 }, 0)
    .to('.js-start', { scale: 1, duration: 0.127 }, 0)
    .to('.js-main-i', { left: '-200vw', ease: 'power1.inOut', duration: 0.9 }, 0.01)
    .to(['.js-header', '.js-logo'], { opacity: 1, filter: 'blur(0px)', pointerEvents: 'auto', duration: 0.1 }, 0.5);

  if (mesh) {
    const targetScale = getBoxScaleForWidth(isSP ? 70 : 37);
    const targetX = getBoxPositionX(isSPl ? 0 : -37);
    const targetY = getBoxPositionY(isSPl ? 0 : isSP ? 11 : 15);

    an1.to(mesh.rotation, { y: isSPl ? -0.37 : -2.5 }, 0)
      .to(mesh.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 0.7 }, 0)
      .to(mesh.position, { x: targetX, y: targetY }, 0.4)
      .to(mesh.rotation, { y:  isSPl ? -0.05 : isSP ? -3.39 : -3.2 }, 0.5);
  }

  if (cornerMaterial) {
    an1.to(cornerMaterial.uniforms.uBurst, { value: isSPl ? 1.9 : 1.6 }, 0.7)
       .to(cornerMaterial.uniforms.uBurstRadius, { value: isSPl ? 0.27 : isSP ? 0.2 : 0.15 }, 0.7);
  }

  // --- About ---
  const an2 = gsap.timeline({
    scrollTrigger: {
      trigger: '.js-about',
      start: 'top bottom',
      endTrigger: '.js-works',
      end: 'top top',
      scrub: true,
    }
  });

  an2.to('.js-main-i', { y: '37vh', zIndex: -4, duration: 1 }, 0)
    .to('.js-emph', { y: isSP ? '7px' : '20px', x: '-11px', letterSpacing: '0.47em', filter: 'blur(0.7px)', duration: 0.77 }, 0)
    .to('.js-about-txts', { y: '1.7vh', x: '-0.27%', duration: 0.7 }, 0);

  // --- Emph Letters ---
  const emph = document.querySelector('.js-emph-last');
  if (emph) {
    const text = emph.textContent || '';
    emph.innerHTML = text.split('').map((char) =>
      char === ' ' ? '<span class="letter">&nbsp;</span>' : `<span class="letter">${char}</span>`
    ).join('');

    const letters = emph.querySelectorAll('.letter');
    gsap.set(letters, { display: 'inline-block', y: '100%' });

    gsap.timeline({
      scrollTrigger: { trigger: '.js-emph-last', start: 'top 80%', scrub: false }
    }).to(letters, { y: 0, stagger: 0.03, ease: 'power2.out' });
  }

  // --- About Box ---
  const an3 = gsap.timeline({
    scrollTrigger: {
      trigger: '.js-about',
      start: 'top top',
      endTrigger: '.js-works',
      end: 'bottom bottom',
      scrub: true,
    }
  });

  an3.to(rotation, { speed: 0.00031 }, 0);

  if (mesh) {
    const targetScale = getBoxScaleForWidth(isSP ? 97 : 37.7);
    an3.to(mesh.rotation, { x: 3 }, 0)
      .to(mesh.scale, { x: targetScale, y: targetScale, z: targetScale, duration: 0.7 }, 0)
      .to(mesh.position, { x: getBoxPositionX(0), y: getBoxPositionY(0), duration: 0.57 }, 0);
  }

  // --- Works Images ---
  setTimeout(() => {
    document.querySelectorAll('.js-works-img2').forEach((img) => {
      gsap.to(img, {
        '--ty': '11vh',
        scrollTrigger: {
          trigger: '.js-slider-2',
          start: 'top bottom',
          endTrigger: '.js-works',
          end: 'bottom top',
          scrub: true,
        }
      });
    });
  }, 500);

  // --- Outro ---
  const an4 = gsap.timeline({
    scrollTrigger: {
      trigger: '.js-outro',
      start: 'top 50%',
      end: 'bottom bottom',
      scrub: 0.5,
    }
  });

  an4.to(rotation, { speed: 0.004 }, 0);

  if (mesh) {
    const targetScale = getBoxScaleForWidth(isSP ? 37 : 17);
    an4.to(mesh.rotation, { x: 3, y: 0 }, 0)
       .to(mesh.scale, { x: targetScale, y: targetScale, z: targetScale }, 0)
       .to(mesh.position, { y: getBoxPositionY(21) }, 0);
  }

  // --- Footer ---
  ScrollTrigger.create({
    trigger: '.js-outro',
    start: 'top 50%',
    end: '+=1',
    scrub: 0.01,
    onEnter: () => gsap.set('.js-footer', { y: 0 }),
    onLeaveBack: () => gsap.set('.js-footer', { y: '100vh' }), // ← whatever the original hidden value is
  });
};

export default jisapanim;