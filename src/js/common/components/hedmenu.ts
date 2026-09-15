const hedmenu = () => {
  const hamburgir = document.querySelector('.js-hamburgir');
  const navg = document.querySelector('.js-nav');

  if (hamburgir && navg) {
    hamburgir.addEventListener('click', () => {
      hamburgir.classList.toggle('active');
      navg.classList.toggle('active');
    });
  }
};

export default hedmenu;