import outsideClick from './outsideclick.js';

export default function iniciaMenuDropDown() {
  document.querySelectorAll('[data-dropdown]').forEach(menu => {
    const botao = menu.querySelector('[data-dropdown-rev]');
    if (!botao) return;
    let removerFora;
    function definirAberto(aberto) {
      menu.classList.toggle('ativo', aberto);
      botao.setAttribute('aria-expanded', String(aberto));
      removerFora?.();
      removerFora = aberto ? outsideClick(menu, ['click'], () => definirAberto(false)) : null;
    }
    botao.addEventListener('click', () => definirAberto(botao.getAttribute('aria-expanded') !== 'true'));
    menu.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        definirAberto(false);
        botao.focus();
      }
    });
    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => definirAberto(false)));
    menu.addEventListener('focusout', event => {
      if (!menu.contains(event.relatedTarget)) definirAberto(false);
    });
  });
}
