export default function iniciaAnimacaoScroll() {

    const sectionContato = document.querySelector('[data-scroll]')
    const numSeguidores = document.querySelectorAll('[data-numero]');

    const windowPorcento = window.innerHeight * 0.3


    function handleScroll() {
        numSeguidores.forEach((li) => {
            const sectionTop = sectionContato.getBoundingClientRect().top;
            const isSectionVisible = (sectionTop - windowPorcento) < 200.4;
            if(isSectionVisible) {
                li.classList.add('ativo')
            } else if(li.classList.contains('ativo')){
                li.classList.remove('ativo')
            }
        });
    };
    window.addEventListener('scroll', handleScroll);
};