$( () => {

const $openBtn = $('#openModal');
const $modal = $('#modal');
const $closeBtn = $('#close');


const openModal = () => {
  $modal.css('display', 'block');
}

const closeModal = () => {
  $modal.css('display', 'none');
}


$openBtn.on('click', openModal);

$closeBtn.on('click', closeModal);
setTimeout(openModal, 100);
});
