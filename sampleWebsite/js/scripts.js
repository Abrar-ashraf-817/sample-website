
const obs = new IntersectionObserver(
  function (entries) {
    const ent = entries[0];

    console.log(ent);
    console.log(ent.target.className);

    if (ent.isIntersecting === false && ent.target.className === "who-we-are bg-dark-blue") {
      const movingtext = document.querySelector(".movingtext");
      movingtext.style.transform = `translate3d(0px, 0px, 0px)`;
      //window.removeEventListener("scroll", moveText());
    } else if (
      ent.isIntersecting === true &&
      ent.target.className === "who-we-are bg-dark-blue"
    ) {
      console.log(`${ent.target.className} intersecting`);
      window.addEventListener("scroll", moveText());
    }
  },
  {
    root: null,
    threshold: 0,
    rootMargin: "-80px",
  }
);

function moveText(){
        const movingtext = document.querySelector(".movingtext");
        const scrolled = window.pageYOffset - 1670;
        // Adjust the multiplier (* 3) to control the speed of the movement relative to the scroll
        const left = scrolled * 0.3;
        console.log(movingtext);
        // Apply the translation
        movingtext.style.transform = `translate3d(${left}px, 0px, 0px)`;
        // Using translate3d can sometimes leverage hardware acceleration for smoother performance.
      }


obs.observe(document.querySelector(".who-we-are"));


const slides = document.querySelectorAll('.slide');
const buttons = document.querySelectorAll('.slide-button');

function showSlide(index) {
  slides.forEach((s, i) => {
    s.classList.toggle('active', i === index);
    const vid = s.querySelector('video');
    if (vid) {
      if (i === index) {
        vid.currentTime = 0;
        vid.play();
        // start listening for progress
        vid.addEventListener('timeupdate', updateProgressForActive, false);
      } else {
        // pause and reset listener for non-active videos
        vid.pause();
        vid.removeEventListener('timeupdate', updateProgressForActive, false);
        // also reset its progress bar
        const pb = buttons[i].querySelector('.progress');
        if (pb) pb.style.width = '0%';
      }
    }
  });
  buttons.forEach((btn, i) => btn.classList.toggle('active', i === index));
}

// This function will only handle progress of the active video
function updateProgressForActive(event) {
  const vid = event.target;
  const slide = vid.closest('.slide');
  const index = Array.from(slides).indexOf(slide);
  if (index < 0) return;
  const progressBar = buttons[index].querySelector('.progress');
  if (!progressBar) return;
  const percent = (vid.currentTime / vid.duration) * 100;
  progressBar.style.width = percent + '%';
}

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    const t = parseInt(btn.getAttribute('data-target'), 10);
    showSlide(t);
  });
});

// initialize first slide
showSlide(0);
