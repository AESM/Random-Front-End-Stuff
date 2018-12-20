// modals.js

function modalEvent(button) {
  button.addEventListener('click', () => {
    const modalIgnition = button.getAttribute('data-modal-ignition');
    const modal = document.querySelector(`[data-modal=${modalIgnition}]`);
    const modalContainer = modal.querySelector('.modal-wrapper');
    const modalClose = modal.querySelector('.modal-close');

    /// Open modal when user clicks the modal button
    modal.classList.toggle('open');

    /// Prevents excess propagation of the opening event
    modalContainer.addEventListener('click', (element) => {
      element.stopPropagation()
    });

    /// Close modal when user clicks the "X" close button
    modalClose.addEventListener('click', () => {
      modal.classList.remove('open')
    });

    /// Close modal when user clicks anywhere on the modal (UNCOMMENT FOR USE)
    // modal.addEventListener('click', () => {
    //   modal.classList.remove('open')
    // });
  });
}

const buttons = document.querySelectorAll(`button[data-modal-ignition]`);

for (let button of buttons) {
  modalEvent(button);
}
