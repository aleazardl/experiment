import box from './components/box';
import distortion from './components/distort';
import corner from './components/cornerpix';
import jisap from './components/jisap';
import smoothy from './components/smoothscrol';
import hedmenu from './components/hedmenu';
import splide from './components/splide';

document.addEventListener(
  'DOMContentLoaded',
  () => {
    box();
    distortion();
    corner();
    jisap();
    smoothy();
    hedmenu();
    splide();
  },
  false
);
