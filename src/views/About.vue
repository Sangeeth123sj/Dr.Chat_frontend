<template>
  <div>
    <h2 class="">About</h2>
    <div class="features">
      <h3>Medical Summaries Simplified</h3>
      <p>Our AI-powered platform makes it easy to quickly generate medical summaries that highlight the most important information from a patient's medical history. No more sifting through pages of notes or struggling to distill complex medical terminology.</p>
      <img ref="img1" src="/src/assets/report.jpg" alt="Medical Summary Example" class="animate-pop-in right" />

      <h3>Easily Accessible History of Medical Summaries</h3>
      <p>Our platform keeps track of all generated summaries, making it easy for medical professionals to quickly review a patient's medical history and get up to speed on their current condition. No more digging through old files or trying to decipher messy handwriting.</p>
      <img ref="img2" src="/src/assets/access.jpg" alt="Medical History Example" class="animate-pop-in left" />

      <h3>Makes Medical Summary Creation Faster</h3>
      <p>Our AI-powered platform drastically reduces the time and effort required to generate medical summaries, freeing up medical professionals to focus on what they do best: providing top-quality care to their patients. No more spending hours manually compiling and formatting reports.</p>
      <img ref="img3" src="/src/assets/summary.jpg" alt="Medical Summary Creation Example" class="animate-pop-in right" />
    </div>
     <button><router-link to="/" class="route-white">Try It Now</router-link></button>
  </div>
</template>

<script>
export default {
  name: "About",
  mounted() {
    // Set up the intersection observer
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(
      (entries) => {
        // Check if the element is in view and add the animation class if it is
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      options
    );

    // Observe each of the images
    const images = [this.$refs.img1, this.$refs.img2, this.$refs.img3];
    images.forEach((image) => {
      observer.observe(image);
    });
  },
};
</script>

<style scoped>
.features {
  display: flex;
  flex-direction: column;
  align-items: left;
  gap: 2rem;
  margin-bottom: 2rem;
}

.features h3 {
  margin-top: 4rem;
  text-align: left;
}

.features p {
  /* max-width: 800px; */
  text-align: left;
}

.features img {
  max-width: 800px;
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
}

.features img.in-view {
  opacity: 1;
  animation-name: animate-pop-in;
  animation-duration: 0.3s;
  animation-fill-mode: both;
}

@keyframes animate-pop-in {
  0% {
    transform: translateX(-100%);
    opacity: 0;
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>
