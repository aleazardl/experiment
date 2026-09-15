declare var Splide: any;
declare global { interface Window { splide: { Extensions: any; }; } }

const splide = (): void => {
  const slider = document.querySelector('.js-slider');
  const slider2 = document.querySelector('.js-slider-2');

  // --- Auto Scroll Slider ---
  if (slider) {
    const splideInstance = new Splide(slider, {
      type: 'loop',
      autoWidth: true,
      gap: '27px',
      arrows: false,
      pagination: false,
      drag: false,
      autoScroll: {
        speed: -0.5,
        pauseOnHover: false,
        pauseOnFocus: false,
        autoStart: false,
      },
      breakpoints: {
        980: { gap: '15px' },
      },
    }).mount(window.splide.Extensions);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          splideInstance.Components.AutoScroll.play();
          observer.disconnect();
        }
      });
    });

    observer.observe(slider as HTMLElement);
  }

  // --- Focus Slider ---
  if (slider2) {
    const splideInstance2 = new Splide(slider2, {
      type: 'loop',
      gap: '3vw',
      perPage: 1,
      focus: 'center',
      arrows: false,
      pagination: false,
      drag: true,
      updateOnMove: true,
      speed: 1700,
      breakpoints: {
        980: { gap: '15px' },
      },
    }).mount();

    const updateSlideScale = (): void => {
      const track = slider2.querySelector<HTMLElement>('.splide__track');
      if (!track) return;

      const trackRect = track.getBoundingClientRect();
      const centerX = trackRect.left + trackRect.width / 2;
      const slides = slider2.querySelectorAll<HTMLElement>('.splide__slide');

      slides.forEach((slide) => {
        const img = slide.querySelector<HTMLElement>('.me-works__img2');
        if (!img) return;

        const slideRect = slide.getBoundingClientRect();
        const slideCenter = slideRect.left + slideRect.width / 2;

        if (slideRect.right < 0 || slideRect.left > window.innerWidth) return;
        const distance = Math.abs(centerX - slideCenter);
        const maxDistance = window.innerWidth;
        const progress = Math.min(distance / maxDistance, 1);
        const direction = slideCenter < centerX ? 1 : -1;
        const translateX = direction * progress * 270; // max shift

        img.style.setProperty('--tx', `${translateX}px`);
      });
    };

    splideInstance2.on('dragging', updateSlideScale);
    splideInstance2.on('move', updateSlideScale);

    const update = (): void => {
      updateSlideScale();
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);
  }
};

export default splide;