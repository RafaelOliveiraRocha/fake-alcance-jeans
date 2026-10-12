export default function iniciaAnimarNumeros() {
  const numeros = [...document.querySelectorAll('[data-numero]')];
  if (!numeros.length) return;
  function animar() {
    const reduzirMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    numeros.forEach(numero => {
      const total = Number(numero.textContent);
      if (!Number.isFinite(total) || total < 0 || reduzirMovimento) return;
      const inicio = performance.now();
      function atualizar(agora) {
        const progresso = Math.min((agora - inicio) / 800, 1);
        numero.textContent = String(Math.round(total * progresso));
        if (progresso < 1) requestAnimationFrame(atualizar);
      }
      requestAnimationFrame(atualizar);
    });
  }
  const observador = new MutationObserver(() => {
    if (numeros[0].classList.contains('ativo')) { observador.disconnect(); animar(); }
  });
  observador.observe(numeros[0], { attributes: true, attributeFilter: ['class'] });
  if (numeros[0].classList.contains('ativo')) { observador.disconnect(); animar(); }
}
