import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function renderImages(images) {
  const gallery = document.querySelector('.gallery');
  images.forEach(image => {
    const card = createImageCard(image);
    gallery.appendChild(card);
  });

  const lightbox = new SimpleLightbox('.gallery a', {});
  lightbox.refresh();
}

function createImageCard(image) {
  const card = document.createElement('div');
  card.classList.add('card');

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  const link = document.createElement('a');
  link.href = image.largeImageURL;
  link.appendChild(img);
  
  card.appendChild(link);

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card-info');
  cardInfo.innerHTML = `
    <p>Likes: ${image.likes}</p>
    <p>Views: ${image.views}</p>
    <p>Comments: ${image.comments}</p>
    <p>Downloads: ${image.downloads}</p>
  `;
  card.appendChild(cardInfo);

  return card;
};