
document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // Smooth Scroll for Anchor Links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');

    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Video Control (Optional)
    const videoElement = document.querySelector('video');

    if (videoElement) {
        videoElement.addEventListener('click', () => {
            if (videoElement.paused) {
                videoElement.play();
            } else {
                videoElement.pause();
            }
        });
    }

    // Adjust video container to match design
    const videoContainer = document.querySelector('.hero-video');
    if (videoContainer) {
        videoContainer.style.padding = '20px';
        videoContainer.style.borderRadius = '15px';
        videoContainer.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
        videoContainer.style.backgroundColor = '#fff';
    }

    // Update logo size and placement to match design
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.style.width = '80px';
        logo.style.height = 'auto';
    }

    // Close the menu when clicking outside of it
    document.addEventListener('click', (e) => {
        if (!menuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });

    // Initialize Swiper
    var swiper = new Swiper(".swiper", {
        effect: "cube",
        grabCursor: true,
        loop: true,
        speed: 1000,
        cubeEffect: {
            shadow: false,
            slideShadows: true,
            shadowOffset: 10,
            shadowScale: 0.94,
        },
        autoplay: {
            delay: 2600,
            pauseOnMouseEnter: true,
        },
    });

    // Load Particles
    tsParticles.load("tsparticles", {
        fpsLimit: 60,
        backgroundMode: {
            enable: true,
            zIndex: -1,
        },
        particles: {
            number: {
                value: 30,
                density: {
                    enable: true,
                    area: 800,
                },
            },
            color: {
                value: [
                    "#3998D0",
                    "#2EB6AF",
                    "#A9BD33",
                    "#FEC73B",
                    "#F89930",
                    "#F45623",
                    "#D62E32",
                ],
            },
            destroy: {
                mode: "split",
                split: {
                    count: 1,
                    factor: {
                        value: 5,
                        random: {
                            enable: true,
                            minimumValue: 4,
                        },
                    },
                    rate: {
                        value: 10,
                        random: {
                            enable: true,
                            minimumValue: 5,
                        },
                    },
                    particles: {
                        collisions: {
                            enable: false,
                        },
                        destroy: {
                            mode: "none",
                        },
                        life: {
                            count: 1,
                            duration: {
                                value: 1,
                            },
                        },
                    },
                },
            },
            shape: {
                type: "circle",
                stroke: {
                    width: 0,
                    color: "#000000",
                },
                polygon: {
                    sides: 5,
                },
            },
            opacity: {
                value: 1,
                random: false,
                animation: {
                    enable: false,
                    speed: 1,
                    minimumValue: 0.1,
                    sync: false,
                },
            },
            size: {
                value: 8,
                random: {
                    enable: true,
                    minimumValue: 4,
                },
                animation: {
                    enable: false,
                    speed: 40,
                    minimumValue: 0.1,
                    sync: false,
                },
            },
            collisions: {
                enable: true,
                mode: "destroy",
            },
            move: {
                enable: true,
                speed: 7,
                direction: "none",
                random: false,
                straight: false,
                out_mode: "out",
                attract: {
                    enable: false,
                    rotateX: 600,
                    rotateY: 1200,
                },
            },
        },
        detectRetina: true,
    });
});


//testimenios o servicios 

const sliderGG = document.querySelector('.sliderGG');

function activateGG(e) {
  const itemsGG = document.querySelectorAll('.itemGG');
  e.target.matches('.nextGG') && sliderGG.append(itemsGG[0]);
  e.target.matches('.prevGG') && sliderGG.prepend(itemsGG[itemsGG.length-1]);
}

document.addEventListener('click', activateGG, false);






//

//MVV
Vue.config.devtools = true;

Vue.component('card', {
  template: `
    <div class="card-wrap"
      @mousemove="handleMouseMove"
      @mouseenter="handleMouseEnter"
      @mouseleave="handleMouseLeave"
      ref="card">
      <div class="card"
        :style="cardStyle">
        <div class="card-bg" :style="[cardBgTransform, cardBgImage]"></div>
        <div class="card-info">
          <slot name="header"></slot>
          <slot name="content"></slot>
        </div>
      </div>
    </div>`,
  mounted() {
    this.width = this.$refs.card.offsetWidth;
    this.height = this.$refs.card.offsetHeight;
  },
  props: ['dataImage'],
  data: () => ({
    width: 0,
    height: 0,
    mouseX: 0,
    mouseY: 0,
    mouseLeaveDelay: null
  }),
  computed: {
    mousePX() {
      return this.mouseX / this.width;
    },
    mousePY() {
      return this.mouseY / this.height;
    },
    cardStyle() {
      const rX = this.mousePX * 30;
      const rY = this.mousePY * -30;
      return {
        transform: `rotateY(${rX}deg) rotateX(${rY}deg)`
      };
    },
    cardBgTransform() {
      const tX = this.mousePX * -40;
      const tY = this.mousePY * -40;
      return {
        transform: `translateX(${tX}px) translateY(${tY}px)`
      }
    },
    cardBgImage() {
      return {
        backgroundImage: `url(${this.dataImage})`
      }
    }
  },
  methods: {
    handleMouseMove(e) {
      this.mouseX = e.pageX - this.$refs.card.offsetLeft - this.width/2;
      this.mouseY = e.pageY - this.$refs.card.offsetTop - this.height/2;
    },
    handleMouseEnter() {
      clearTimeout(this.mouseLeaveDelay);
    },
    handleMouseLeave() {
      this.mouseLeaveDelay = setTimeout(()=>{
        this.mouseX = 0;
        this.mouseY = 0;
      }, 1000);
    }
  }
});

const app = new Vue({
  el: '#app'
}); //MMV