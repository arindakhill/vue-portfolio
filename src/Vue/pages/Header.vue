<template>
  <header id="home" class="bg">
    <nav class="navbar navbar-expand-lg fixed-top dark-bg">
      <a class="navbar-brand" href="#">
        <div v-if="main.logo">
          <img src="../../assets/images/logo.png" alt="logo" id="Logo" />
        </div>
        <div v-if="!main.logo">
          <span id="FirstName">{{ main.name.first }}</span>
          <span id="LastName">{{ main.name.last }}</span>
        </div>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon">
          <i class="fas fa-bars" style="color:#fff; font-size:28px;"></i>
        </span>
      </button>
      <div id="navbarNavAltMarkup" class="collapse navbar-collapse">
        <ul id="navbar-nav" class="navbar-nav">
          <li class="active-nav">
            <a class="nav-item nav-link" href="#home" @click="closeNavbar">Home</a>
          </li>
          <li><a class="nav-item nav-link" href="#about" @click="closeNavbar">About</a></li>
          <li><a class="nav-item nav-link" href="#education" @click="closeNavbar">Education</a></li>
          <li><a class="nav-item nav-link" href="#work" @click="closeNavbar">Work</a></li>
          <li><a class="nav-item nav-link" href="#skills" @click="closeNavbar">Skills</a></li>
          <li><a class="nav-item nav-link" href="#portfolio" @click="closeNavbar">Projects</a></li>
          <li><a class="nav-item nav-link" href="#blog" @click="closeNavbar">Blog</a></li>
          <li><a class="nav-item nav-link" href="#contact" @click="closeNavbar">Contact</a></li>
         
        </ul>
      </div>
    </nav>
    <Banner />
    <Arrow />
  </header>
</template>



<script>
import Arrow from "../components/Arrow.vue";
import data from "../../data/data.json";
import Banner from "../components/Banner.vue";

export default {
  name: "Header",
  components: {
    Banner,
    Arrow,
  },
  props: {},
  data() {
    return {
      main: data.main,
    };
  },
 
methods: {
  closeNavbar() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    if (navbarCollapse.classList.contains('show')) {
      navbarToggler.click();
    }
  }
}
};
</script>

<style lang="scss">
header#home {
  .navbar {
    padding: 1rem 2rem;
    transition: all 0.3s ease;
    display: flex;
    align-items: center;
    
    &.dark-bg {
      background-color: #0d0e1a;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    }
  }

  .navbar-brand {
  padding: 0;
  margin-left: 7rem;
  transform: scale(1.5);
  &:hover {
      transform: scale(2); 
    }
  
  @media (max-width: 768px) {
    margin-left: 1rem;
    transform: scale(1.2); // Smaller on mobile
    
    &:hover {
      transform: scale(1.3); // Smaller hover effect on mobile
    }
  }
}

  #navbarNavAltMarkup {
    flex-grow: 1; // Take remaining space
    
    .navbar-nav {
      display: flex;
      gap: 2rem;
      align-items: center;
      justify-content: center; // Center the menu items
      margin-left: auto; // Push menu to center-right
      padding-right: 2rem;
      
      li {
        list-style: none;
        
        a.nav-link {
          color: #fff;
          font-size: 1rem;
          font-weight: 500;
          padding: 0.5rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 1px;
          
          &:hover {
            color: #ed2024;
          }
        }
        
        &.active-nav a {
          color: #ed2024;
        }
      }
    }
  }

  // Mobile responsive
  @media (max-width: 992px) {
    .navbar-brand {
      margin-left: 0;
    }

    #navbarNavAltMarkup {
      background-color: #0d0e1a;
      padding: 1rem;
      
      .navbar-nav {
        flex-direction: column;
        gap: 1rem;
        align-items: flex-start;
      }
    }
  }
}
</style>