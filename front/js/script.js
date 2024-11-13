let modal = document.getElementById('minha-modal');

let abrirModal = document.getElementById('abrir-modal');

abrirModal.addEventListener('click', () => {
    modal.showModal();
})

let fecharModal = document.getElementById('fechar-modal');

fecharModal.addEventListener('click', () => {
    modal.close();
});