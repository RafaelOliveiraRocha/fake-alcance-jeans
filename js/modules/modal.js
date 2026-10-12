export default function iniciaModal() {
  const container = document.querySelector('[data-modal="container"]');
  const modal = container?.querySelector('.modal');
  const fechar = container?.querySelector('[data-modal="fechar"]');
  if (!container || !modal || !fechar) return;

  const titulo = document.querySelector('#modal-titulo');
  const imagem = document.querySelector('#modal-imagem');
  const descricao = document.querySelector('#modal-descricao');
  let origem;
  let overflowAnterior = '';
  let elementosInertes = [];

  function fecharModal() {
    if (container.hidden) return;
    container.hidden = true;
    container.classList.remove('ativo');
    document.body.style.overflow = overflowAnterior;
    elementosInertes.forEach(([elemento, anterior]) => { elemento.inert = anterior; });
    elementosInertes = [];
    if (origem?.isConnected) origem.focus();
  }

  function abrirModal(event) {
    const peca = document.getElementById(event.currentTarget.dataset.peca);
    if (!peca) return;
    const foto = peca.querySelector('img');
    const detalhes = peca.querySelector('.peca-descricao');
    titulo.textContent = detalhes.querySelector('h3').textContent;
    imagem.src = foto.src;
    imagem.alt = foto.alt;
    descricao.replaceChildren(...[...detalhes.children]
      .filter(elemento => elemento.tagName !== 'H3')
      .map(elemento => elemento.cloneNode(true)));
    origem = event.currentTarget;
    overflowAnterior = document.body.style.overflow;
    elementosInertes = [...document.body.children]
      .filter(elemento => elemento !== container && elemento.tagName !== 'SCRIPT')
      .map(elemento => [elemento, elemento.inert]);
    elementosInertes.forEach(([elemento]) => { elemento.inert = true; });
    container.hidden = false;
    container.classList.add('ativo');
    document.body.style.overflow = 'hidden';
    fechar.focus();
  }

  document.querySelectorAll('[data-modal="abrir"]').forEach(botao => {
    botao.addEventListener('click', abrirModal);
  });
  fechar.addEventListener('click', fecharModal);
  container.addEventListener('click', event => {
    if (event.target === container) fecharModal();
  });
  document.addEventListener('keydown', event => {
    if (container.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      fecharModal();
    } else if (event.key === 'Tab') {
      const controles = [...modal.querySelectorAll('button, a[href], input, select, textarea, [tabindex="0"]')]
        .filter(elemento => !elemento.disabled && elemento.getClientRects().length);
      const primeiro = controles[0];
      const ultimo = controles.at(-1);
      if (!primeiro) { event.preventDefault(); modal.focus(); return; }
      if (event.shiftKey && (document.activeElement === primeiro || document.activeElement === modal)) {
        event.preventDefault(); ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault(); primeiro.focus();
      }
    }
  });
  document.addEventListener('focusin', event => {
    if (!container.hidden && !modal.contains(event.target)) fechar.focus();
  });
}
