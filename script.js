const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
});
document.querySelectorAll('.nav a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
}));
document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('signup-form').addEventListener('submit', event => {
  event.preventDefault();
  const email = document.getElementById('email');
  document.getElementById('form-message').textContent =
    `Merci ! L'inscription de ${email.value} est simulée : connecte un service de newsletter pour collecter les adresses.`;
  email.value = '';
});
