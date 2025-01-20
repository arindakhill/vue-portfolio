<template>
  <section id="about" class="dark-section">
    <div class="container-fluid">
      <!-- Section Header -->
      <h1 class="section-header">{{ heading }}</h1>

      <!-- Tagline -->
      <h2 class="tagline" v-if="about.tagline !== ''">{{ about.tagline }}</h2>

      <div class="row">
        <!-- Profile Image Section -->
        <div
          class="col-sm-12 col-md-4 flex-col"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <img
            class="profile-pic"
            src="../../assets/images/profile-pic.png" 
            alt="profile picture"
          />
        </div>

        <!-- Bio Section -->
        <div
          class="col-sm-12 col-md-4 flex-col"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <p id="about-content">
            <span id="greeting" class="greeting-text">Hi, I'm {{ name }}!</span>
            <span id="bio" v-html="about.bio" class="bio-text"></span>
          </p>
        </div>

        <!-- Facts Section (with icons and left alignment) -->
        <div
          class="col-sm-12 col-md-4 flex-col"
          data-aos="fade-right"
          data-aos-duration="1000"
        >
          <ul class="list-group list-group-flush">
            <li v-for="item in facts" :key="item.name" class="list-group-item">
              <i :class="item.iconClass"></i> <!-- Add icon next to each fact -->
              <h3 class="d-inline">{{ item.name }}: </h3>
              <br class="d-md-none" />{{ item.value }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Social Links Section -->
      <div class="social-links">
        <a :href="about.socialLinks.linkedin" target="_blank" class="btn btn-linkedin" margin-right="10px" padding-right="10px">
          LinkedIn
        </a>
        <a :href="about.socialLinks.github" target="_blank" class="btn btn-github">
          GitHub
        </a>
      </div>
    </div>

    <Arrow />
  </section>
</template>

<script>
import data from "../../data/data.json";
import Arrow from "../components/Arrow.vue";

export default {
  name: "About",
  components: {
    Arrow,
  },
  data() {
    return {
      about: data.about,
      name: data.main.name.first,
      facts: data.about.facts,
      heading: data.main.headings.about,
    };
  },
};
</script>

<style lang="scss">
#about {
 background-color: #0d0e1a;
 min-height: 100vh;
 padding: 4rem 0;

 .container-fluid {
   width: 90%;
   max-width: 1400px;
   margin: 0 auto;
   padding: 2rem;
   position: relative;
   min-height: 80vh;
   display: flex;
   flex-direction: column;
 }

 .section-header {
   font-size: 2.5rem;
   color: #fff;
   text-transform: uppercase;
   text-align: center;
   margin-bottom: 2.5rem;
   font-weight: 600;
   letter-spacing: 1px;
 }

 .tagline {
   font-size: 1.8rem;
   color: #ddd6fe;
   margin-bottom: 2rem;
   text-align: center;
   font-weight: 500;
   letter-spacing: 0.5px;
 }

 .row {
   margin-bottom: 1.5rem; // Add space between content and social links
 }

 .profile-pic {
   max-width: 100%;
   max-height: 300px;
   border-radius: 50%;
   border: 4px solid rgba(147, 112, 219, 0.3);
   box-shadow: 0 0 25px rgba(124, 58, 237, 0.2);
   transition: all 0.5s ease;
   filter: brightness(1.05);
   
   &:hover {
     transform: scale(1.05) rotate(2deg);
     border-color: rgba(147, 112, 219, 0.6);
     box-shadow: 0 0 30px rgba(124, 58, 237, 0.3);
   }
 }

 #about-content {
   text-align: justify;
   font-size: 1.1rem;
   color: #e2e8f0;
   line-height: 1.8;

   .bio-text {
     font-size: 1.2rem;
     display: block;
     margin-top: 1rem;
   }

   .greeting-text {
     color: #a78bfa;
     font-weight: bold;
     font-size: 1.4rem;
     display: block;
     margin-bottom: 1rem;
   }
 }

 .list-group {
   margin-bottom: 1rem;

   .list-group-item {
     background-color: #1a1b2e;
     border: 1px solid rgba(147, 112, 219, 0.15);
     color: #fff;
     padding: 1rem 1.5rem;
     margin-bottom: 0.5rem;
     border-radius: 0.5rem;
     transition: all 0.3s ease;

     &:hover {
       transform: translateX(5px);
       background-color: #232442;
     }

     i {
       color: #9ca3af;
       margin-right: 1rem;
       font-size: 1.2rem;
     }

     h3 {
       color: #ddd6fe;
       font-size: 1.1rem;
       font-weight: 500;
       margin: 0;
       display: inline;
     }
   }
 }

 .social-links {
   margin-top: auto; // Push to bottom of flex container
   margin-bottom: 1rem;
   display: flex;
   gap: 1.5rem;
   justify-content: center;
   padding: 1rem 0;

   .btn {
     padding: 0.8rem 2rem;
     font-size: 1.1rem;
     border-radius: 2rem;
     text-decoration: none;
     text-align: center;
     width: 180px;
     transition: all 0.3s ease;
     position: relative;
     overflow: hidden;
     
     &::before {
       content: '';
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       background: rgba(255, 255, 255, 0.1);
       transform: translateX(-100%);
       transition: transform 0.3s ease;
     }

     &:hover::before {
       transform: translateX(0);
     }
   }

   .btn-linkedin {
     background-color: #0077b5;
     color: white;
     border: none;
     
     &:hover {
       background-color: #0066a1;
       transform: translateY(-2px);
       box-shadow: 0 5px 15px rgba(0, 119, 181, 0.4);
     }
   }

   .btn-github {
     background-color: #24292e;
     color: white;
     border: none;
     
     &:hover {
       background-color: #1a1f24;
       transform: translateY(-2px);
       box-shadow: 0 5px 15px rgba(0, 0, 0, 0.4);
     }
   }
 }

 // Responsive adjustments
 @media (max-width: 768px) {
   .container-fluid {
     width: 95%;
     padding: 1.5rem;
   }

   .profile-pic {
     margin: 0 auto 1.5rem;
     max-height: 250px;
     display: block;
   }

   .flex-col {
     margin-bottom: 1.5rem;
   }

   .tagline {
     font-size: 1.5rem;
   }

   .social-links {
     flex-direction: column;
     align-items: center;
     margin-top: 1rem;
     
     .btn {
       width: 200px;
     }
   }

   #about-content {
     text-align: center;
   }

   .list-group-item {
     text-align: center;
     
     h3, span {
       display: block;
       margin-bottom: 0.5rem;
     }
   }
 }
}
</style>
