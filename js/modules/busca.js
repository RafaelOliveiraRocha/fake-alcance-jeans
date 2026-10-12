export default function iniciaBusca() {
  const formulario = document.querySelector('.menu-pesquisa');
  const campo = formulario?.querySelector('input');
  const limpar = formulario?.querySelector('.limpar-busca');
  const status = document.querySelector('#busca-status');
  const vazio = document.querySelector('#sem-resultados');
  const pecas = [...document.querySelectorAll('.peca')];
  if (!formulario || !campo || !limpar || !status || !vazio) return;

  const normalizar = texto => texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('pt-BR');
  function filtrar() {
    const termos = normalizar(campo.value.trim()).split(/\s+/).filter(Boolean);
    let encontradas = 0;
    pecas.forEach(peca => {
      const texto = normalizar(peca.querySelector('.peca-descricao').textContent);
      peca.hidden = !termos.every(termo => texto.includes(termo));
      if (!peca.hidden) encontradas += 1;
    });
    limpar.hidden = campo.value.length === 0;
    vazio.hidden = encontradas !== 0;
    status.textContent = `${encontradas} ${encontradas === 1 ? 'peça encontrada' : 'peças encontradas'}${termos.length ? ' na busca' : ' no estudo'}`;
  }
  formulario.addEventListener('submit', event => { event.preventDefault(); filtrar(); });
  campo.addEventListener('input', filtrar);
  limpar.addEventListener('click', () => { campo.value = ''; filtrar(); campo.focus(); });
}
