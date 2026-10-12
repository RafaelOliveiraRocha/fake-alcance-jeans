export default function outsideClick(elemento, eventos, callback) {
  function remover() {
    eventos.forEach(evento => document.removeEventListener(evento, aoClicarFora));
  }
  function aoClicarFora(event) {
    if (!elemento.contains(event.target)) {
      remover();
      callback();
    }
  }
  eventos.forEach(evento => document.addEventListener(evento, aoClicarFora));
  return remover;
}
