export default function iniciaTooltip() {
  document.querySelectorAll('[data-tooltip]').forEach((elemento, indice) => {
    let caixa;
    function posicionar(event) {
      if (!caixa) return;
      const rect = elemento.getBoundingClientRect();
      const largura = document.documentElement.clientWidth;
      const x = event?.clientX ?? rect.left;
      const y = event?.clientY ?? rect.bottom;
      caixa.style.left = `${Math.max(12, Math.min(x + 12, largura - caixa.offsetWidth - 12)) + window.scrollX}px`;
      caixa.style.top = `${Math.max(12, Math.min(y + 12, window.innerHeight - caixa.offsetHeight - 12)) + window.scrollY}px`;
    }
    function mostrar(event) {
      if (!caixa) {
        caixa = document.createElement('div');
        caixa.id = `tooltip-estudo-${indice}`;
        caixa.className = 'tooltip';
        caixa.setAttribute('role', 'tooltip');
        caixa.textContent = elemento.dataset.tooltipText;
        document.body.appendChild(caixa);
        elemento.setAttribute('aria-describedby', caixa.id);
      }
      posicionar(event?.type === 'mousemove' || event?.type === 'mouseenter' ? event : null);
    }
    function esconder() {
      caixa?.remove();
      caixa = null;
      elemento.removeAttribute('aria-describedby');
    }
    elemento.addEventListener('mouseenter', mostrar);
    elemento.addEventListener('mousemove', posicionar);
    elemento.addEventListener('mouseleave', () => { if (document.activeElement !== elemento) esconder(); });
    elemento.addEventListener('focus', mostrar);
    elemento.addEventListener('blur', esconder);
    elemento.addEventListener('click', mostrar);
    elemento.addEventListener('keydown', event => { if (event.key === 'Escape') esconder(); });
    window.addEventListener('resize', esconder);
  });
}
