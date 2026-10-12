export default function iniciaAnimacaoScroll() {
  const section = document.querySelector('[data-scroll]');
  const numeros = document.querySelectorAll('[data-numero]');
  if (!section || !numeros.length) return;
  function atualizar() {
    if (section.getBoundingClientRect().top < window.innerHeight * .8) {
      numeros.forEach(numero => numero.classList.add('ativo'));
      window.removeEventListener('scroll', atualizar);
      window.removeEventListener('resize', atualizar);
    }
  }
  window.addEventListener('scroll', atualizar, { passive: true });
  window.addEventListener('resize', atualizar);
  atualizar();
}
