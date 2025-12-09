
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