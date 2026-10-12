export default function iniciaFuncionamento() {
  const elemento = document.querySelector('[data-semana]');
  if (!elemento) return;
  const dias = elemento.dataset.semana.split(',').map(Number);
  const horario = elemento.dataset.horario.split(',').map(Number);
  const agora = new Date();
  const dentro = dias.includes(agora.getDay()) && agora.getHours() >= horario[0] && agora.getHours() < horario[1];
  elemento.classList.toggle('aberto', dentro);
  const estado = elemento.querySelector('[data-status-horario]');
  if (estado) estado.textContent = dentro ? 'Dentro do horário ilustrativo' : 'Fora do horário ilustrativo';
}
