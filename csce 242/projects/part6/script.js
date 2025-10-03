const toggle = document.querySelector('.toggle');
const navMenu = document.querySelector('.main-nav ul');

toggle.addEventListener('click', () => {
  navMenu.classList.toggle('active');
});
