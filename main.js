const slides = document.querySelectorAll('.slide');
const slidesContainer = document.querySelector('.slides');
const indicatorsContainer = document.getElementById('indicators');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const pauseBtn = document.getElementById('pause');
const sliderElement = document.querySelector('.slider');

let currentIndex = 0;
let intervalId = null;
let isPaused = false;


slides.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('indicator');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(i));
  indicatorsContainer.appendChild(dot);
});

const indicators = document.querySelectorAll('.indicator');

function updateSlider() {
  slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
  indicators.forEach(dot => dot.classList.remove('active'));
  indicators[currentIndex].classList.add('active');
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSlider();
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlider();
}

function goToSlide(index) {
  currentIndex = index;
  updateSlider();
}

function togglePause() {
  if (isPaused) {
    startAutoSlide();
    pauseBtn.textContent = '⏸️';
  } else {
    clearInterval(intervalId);
    pauseBtn.textContent = '▶️';
  }
  isPaused = !isPaused;
}

function startAutoSlide() {
  intervalId = setInterval(nextSlide, 3000);
}


prevBtn.addEventListener('click', prevSlide);
nextBtn.addEventListener('click', nextSlide);
pauseBtn.addEventListener('click', togglePause);


document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});


let touchStartX = 0;
sliderElement.addEventListener('touchstart', e => {
  touchStartX = e.touches[0].clientX;
});
sliderElement.addEventListener('touchend', e => {
  const touchEndX = e.changedTouches[0].clientX;
  if (touchEndX < touchStartX - 50) nextSlide();
  if (touchEndX > touchStartX + 50) prevSlide();
});


let dragStartX = 0;
sliderElement.addEventListener('mousedown', e => {
  dragStartX = e.clientX;
});
sliderElement.addEventListener('mouseup', e => {
  const dragEndX = e.clientX;
  if (dragEndX < dragStartX - 50) nextSlide();
  if (dragEndX > dragStartX + 50) prevSlide();
});

startAutoSlide();