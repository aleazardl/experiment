declare var Lenis: any;
declare const gsap: any;
declare const ScrollTrigger: any;

const smoothy = (): void => {

  const lenis = new Lenis({
    duration: 0.65,
    easing: (t: number) => 1 - Math.pow(1 - t, 3),
    smoothWheel: true,
    smoothTouch: false,
  });

  // Let GSAP control Lenis timing
  gsap.ticker.add((time: number) => {
    lenis.raf(time * 1000);
  });

  // Tell ScrollTrigger whenever Lenis scrolls
  lenis.on('scroll', ScrollTrigger.update);

  // Prevent GSAP from trying to compensate for lag
  gsap.ticker.lagSmoothing(0);

};

export default smoothy;