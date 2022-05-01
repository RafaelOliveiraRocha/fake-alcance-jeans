export default function iniciaAnimarNumeros() {

    function animaNumeros() {
            const numeros = document.querySelectorAll('[data-numero]');

            numeros.forEach((numero) => {
                const seguidoresTotal = +numero.innerText;
                const incremento = Math.floor(seguidoresTotal / 1000);

                let comeco = 0;
                const tempo = setInterval(() => {
                    comeco = comeco + incremento;
                    numero.innerText = comeco;
                    if(comeco > seguidoresTotal) {
                        numero.innerText = seguidoresTotal
                        clearInterval(tempo)
                    }
                }, 5 * Math.random())
            });
    }
        function handleMutation(mutation) {
            if(mutation[0].target.classList.contains('ativo')) {
                observador.disconnect()
                animaNumeros()
            }
        }

        const observerTarget = document.querySelector('[data-numero]')
        const observador = new MutationObserver(handleMutation);

        observador.observe(observerTarget, {attributes: true})
};
