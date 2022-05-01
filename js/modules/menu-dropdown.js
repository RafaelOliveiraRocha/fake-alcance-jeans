import outsideClick from './outsideclick.js';

export default function iniciaMenuDropDown() {

    const dropdownMenus = document.querySelectorAll('[data-dropdown-rev]');

    dropdownMenus.forEach((menu) => {
        ['touchstart', 'click'].forEach((userEvent) => {
            menu.addEventListener(userEvent, handleClick)
        });
    })

    function handleClick(event) {
        console.log(this)
        event.preventDefault();
        const dropdownMenuu = document.querySelector('[data-dropdown]')
        dropdownMenuu.classList.add('ativo')
        outsideClick(this, ['touchstart', 'click'], () => {
            dropdownMenuu.classList.remove('ativo')
        });
    }
};













// };

// const dropdownMenus = document.querySelectorAll('[data-dropdown-rev]');

// dropdownMenus.forEach((menu) => {
//     menu.addEventListener('click', handleClick)
// })

// function handleClick(event) {
//     event.preventDefault();
//     console.log(event)
// }
