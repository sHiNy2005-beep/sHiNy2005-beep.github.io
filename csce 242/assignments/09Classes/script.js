class Painting {
  constructor({ title, artist, imageSrc, framed = false }) {
    this.title = title;
    this.artist = artist;
    this.imageSrc = imageSrc;
    this.framed = framed;
  }

  getSection() {
    const card = document.createElement('div');
    card.className = 'painting';

    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = this.title;

    const img = document.createElement('img');
    img.src = this.imageSrc;
    img.alt = this.title;
    img.loading = 'lazy';

    card.appendChild(caption);
    card.appendChild(img);

    card.addEventListener('click', () => openModal(this));

    return card;
  }
}

const paintings = [
  new Painting({ title: 'The Lillies', artist: 'Claude Monet', imageSrc: 'images/painting1.png', framed: true }),
  new Painting({ title: 'The Roses', artist: 'Mary Cassatt', imageSrc: 'images/painting2.png', framed: false }),
  new Painting({ title: 'Lillies', artist: "Georgia O'Keeffe", imageSrc: 'images/painting3.png'}),
  new Painting({ title: 'Painted Lillies', artist: 'Pierre-Auguste Renoir', imageSrc: 'images/painting4.png', framed: true }),
  new Painting({ title: 'Garden Study', artist: 'Frida Kahlo', imageSrc: 'images/painting5.png', framed: false })
];

const gallery = document.getElementById('gallery');
paintings.forEach(p => gallery.appendChild(p.getSection()));

const modal = document.getElementById('imgModal');
const modalImg = document.getElementById('modalImg');
const modalTitle = document.getElementById('modalTitle');
const modalArtist = document.getElementById('modalArtist');
const closeModalBtn = document.getElementById('closeModal');

function openModal(painting) {
  modalTitle.textContent = painting.title;
  modalArtist.textContent = `by ${painting.artist}`;
  modalImg.src = painting.imageSrc;
  modalImg.alt = painting.title;

  modalImg.classList.remove('framed', 'unframed');

  if (painting.framed) {
    modalImg.classList.add('framed');
  } else {
    modalImg.classList.add('unframed');
  }

  modal.style.display = 'block';
}

function closeModal() {
  modal.style.display = 'none';
}

closeModalBtn.addEventListener('click', closeModal);
window.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
window.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
