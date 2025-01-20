<template>
  <section id="portfolio" class="dark-section">
    <div class="container-fluid">
      <h1 class="section-headers">{{ heading }}</h1>

      <!-- Project Filters -->
      <div class="filters">
        <ul class="list-inline mx-auto" data-aos="fade-right" data-aos-duration="1000">
          <li class="list-inline-item filter">
            <a class="nav-item" 
               :class="{ active: currentFilter === 'all' }"
               @click="setFilter('all')">All Projects</a>
          </li>
          <li class="list-inline-item filter">
            <a class="nav-item" 
               :class="{ active: currentFilter === 'software' }"
               @click="setFilter('software')">Software</a>
          </li>
          <li class="list-inline-item filter">
            <a class="nav-item" 
               :class="{ active: currentFilter === 'embedded' }"
               @click="setFilter('embedded')">Embedded</a>
          </li>
        </ul>
      </div>

      <!-- Projects Grid -->
      <div class="projects-grid">
        <div v-for="project in filteredProjects" 
             :key="project.title" 
             class="project-card"
             data-aos="fade-up"
             data-aos-duration="1000">
          <div class="project-image">
            <img :src="project.image" :alt="project.title"/>
            <div class="project-overlay">
              <div class="overlay-content">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
                <div class="project-links">
                  <div v-if="project.filter === 'embedded'" class="demo-buttons">
                    <button v-for="(demo, index) in project.demos" 
                            :key="index"
                            @click="showDemo(project, index)"
                            class="btn btn-demo">
                      <i class="fas fa-play-circle"></i> Demo {{ index + 1 }}
                    </button>
                  </div>
                  <a v-else :href="project.source" 
                     target="_blank" 
                     class="btn btn-demo">
                    <i class="fas fa-external-link-alt"></i> View Code
                  </a>
                  <a :href="project.source" 
                     target="_blank" 
                     class="btn btn-source">
                    <i class="fab fa-github"></i> Source Code
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Demo Modal -->
      <div v-if="selectedProject" class="demo-modal" :class="{ 'show': showModal }">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-title">
  <h3>{{ selectedProject.title }}</h3>
  <p class="demo-label">{{ selectedProject.demos[selectedDemoIndex].title }}</p>
</div>
            <button class="close-btn" @click="closeModal">
              <i class="fas fa-times"></i>
            </button>
          </div>
          <div class="modal-body">
            <video v-if="selectedDemo" 
       controls 
       class="demo-video">
  <source :src="selectedDemo.path" type="video/mp4">
  Your browser does not support the video tag.
</video>
            <div class="demo-navigation" v-if="selectedProject.demos?.length > 1">
              <button @click="previousDemo" 
                      :disabled="selectedDemoIndex === 0"
                      class="nav-btn">
                <i class="fas fa-chevron-left"></i>
              </button>
              <div class="demo-indicators">
                <span v-for="(demo, index) in selectedProject.demos" 
                      :key="index"
                      :class="{ active: index === selectedDemoIndex }"
                      @click="selectedDemoIndex = index"
                      class="indicator"></span>
              </div>
              <button @click="nextDemo" 
                      :disabled="selectedDemoIndex === selectedProject.demos.length - 1"
                      class="nav-btn">
                <i class="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Arrow />
  </section>
</template>
<script>
import data from "../../data/data.json";
import Arrow from "../components/Arrow.vue";

// Import project images
import propertyManagement from '../../assets/images/projects/mini-property-management.jpeg';
import resortManagement from '../../assets/images/projects/resort-management-system.png';
import libraryManagement from '../../assets/images/projects/library-management-system.png';
import circuitBreaker from '../../assets/images/projects/low-voltage-circuit-breaker.png';

// Import demo videos
import circuitBreakerDemo2 from '../../assets/videos/circuit-breaker-demo1.mp4';
import circuitBreakerDemo1 from '../../assets/videos/circuit-breaker-demo2.mp4';

export default {
  name: "Projects",
  components: {
    Arrow,
  },
  data() {
    return {
      projects: data.portfolio.projects.map(project => ({
        ...project,
        image: this.getProjectImage(project.title),
        ...(project.filter === 'embedded' && project.title.includes('Circuit Breaker') ? {
          demos: [
            {
              path: circuitBreakerDemo1,
              title: project.demoVideos.demo1.title
            },
            {
              path: circuitBreakerDemo2,
              title: project.demoVideos.demo2.title
            }
          ]
        } : {})
      })),
      heading: data.main.headings.portfolio,
      currentFilter: 'all',
      showModal: false,
      selectedProject: null,
      selectedDemoIndex: 0
    };
  },
  computed: {
    filteredProjects() {
      if (this.currentFilter === 'all') {
        return this.projects;
      }
      return this.projects.filter(project => project.filter === this.currentFilter);
    },
    selectedDemo() {
      return this.selectedProject?.demos?.[this.selectedDemoIndex];
    }
  },
  methods: {
    setFilter(filter) {
      this.currentFilter = filter;
    },
    getProjectImage(title) {
      const imageMap = {
        'Mini-Property Management System': propertyManagement,
        'Resort Management System (RMS)': resortManagement,
        'Library Management System': libraryManagement,
        'Low Voltage Circuit Breaker Remote Closing System Using GSM': circuitBreaker
      };
      return imageMap[title];
    },
    showDemo(project, index) {
      this.selectedProject = project;
      this.selectedDemoIndex = index;
      this.showModal = true;
      document.body.style.overflow = 'hidden';
    },
    closeModal() {
      this.showModal = false;
      this.selectedProject = null;
      this.selectedDemoIndex = 0;
      document.body.style.overflow = '';
    },
    previousDemo() {
      if (this.selectedDemoIndex > 0) {
        this.selectedDemoIndex--;
      }
    },
    nextDemo() {
      if (this.selectedDemoIndex < this.selectedProject.demos.length - 1) {
        this.selectedDemoIndex++;
      }
    }
  }
};
</script>

<style lang="scss">
#portfolio {
 background-color: #0d0e1a;
 min-height: 100vh;
 padding: 4rem 0;

 .container-fluid {
   width: 90%;
   max-width: 1400px;
   margin: 0 auto;
   padding: 2rem;
 }

 .section-headers {
   font-size: 2.5rem;
   color: #f6f3f7;
   text-transform: uppercase;
   text-align: center;
   margin-bottom: 3rem;
   font-weight: 600;
   letter-spacing: 1px;
   position: relative;
   text-decoration: underline;
  text-decoration-color: #ed2024;
  text-decoration-thickness: 0.375rem;
   
   &::after {
     content: '';
     position: absolute;
     bottom: -10px;
     left: 50%;
     transform: translateX(-50%);
     width: 100px;
     height: 3px;
     background-color: #0e0114;
   }
 }

 .filters {
   margin-bottom: 3rem;
   
   ul {
     display: flex;
     justify-content: center;
     gap: 1rem;
     padding: 0;
     margin: 0;
   }

   .filter {
     list-style: none;
     
     a {
       display: inline-block;
       padding: 0.75rem 1.5rem;
       background-color: #1a1b2e;
       color: #fff;
       border-radius: 0.5rem;
       cursor: pointer;
       transition: all 0.3s ease;
       
       
       &:hover {
         background-color: #2d1b69;
         transform: translateY(-2px);
       }
       
       &.active {
         background-color: #ed2024;
       }
     }
   }
 }

 .projects-grid {
   display: grid;
   grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
   gap: 2rem;
   padding: 1rem;
 }

 .project-card {
   position: relative;
   border-radius: 1rem;
   overflow: hidden;
   box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
   background-color: #1a1b2e;
   transition: transform 0.3s ease;
   
   &:hover {
     transform: translateY(-5px);

     .project-overlay {
       opacity: 1;
     }
   }
   
   .project-image {
     position: relative;
     width: 100%;
     padding-top: 66.67%; // 3:2 aspect ratio
     
     img {
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       object-fit: cover;
     }
   }

   .project-overlay {
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     background: rgba(26, 27, 46, 0.95);
     display: flex;
     align-items: flex-start;
     justify-content: center;
     opacity: 0;
     transition: all 0.3s ease;
     overflow-y: auto;

     .overlay-content {
       padding: 2rem;
       color: #fff;
       text-align: center;
       display: flex;
       flex-direction: column;
       min-height: 100%;
       
       h3 {
         color: #fff;
         font-size: 1.3rem;
         margin-bottom: 1rem;
         font-weight: 600;
         line-height: 1.4;
       }

       p {
         color: #ddd6fe;
         font-size: 0.9rem;
         margin-bottom: 1.5rem;
         line-height: 1.6;
         flex-grow: 1;
         overflow-y: auto;
       }

       .project-links {
         margin-top: auto;
         display: flex;
         flex-direction: column;
         gap: 1rem;
         align-items: center;
         padding-top: 1rem;

         .demo-buttons {
           display: flex;
           gap: 0.5rem;
           flex-wrap: wrap;
           justify-content: center;
         }

         .btn {
           padding: 0.75rem 1.5rem;
           border-radius: 0.5rem;
           font-size: 0.9rem;
           transition: all 0.3s ease;
           border: none;
           cursor: pointer;
           min-width: 140px;
           
           i {
             margin-right: 0.5rem;
           }

           &:hover {
             transform: translateY(-2px);
           }
         }

         .btn-demo {
           background-color: #ed2024;
           color: white;
           
           &:hover {
             background-color: darken(#ed2024, 10%);
           }
         }

         .btn-source {
           background-color: #1a1b2e;
           color: white;
           border: 1px solid rgba(255, 255, 255, 0.2);
           
           &:hover {
             background-color: #2d1b69;
           }
         }
       }
     }
   }
 }

 .demo-modal {
   position: fixed;
   top: 0;
   left: 0;
   width: 100%;
   height: 100%;
   background: rgba(0, 0, 0, 0.9);
   display: flex;
   align-items: center;
   justify-content: center;
   z-index: 1000;
   opacity: 0;
   visibility: hidden;
   transition: all 0.3s ease;
   padding: 1rem;

   &.show {
     opacity: 1;
     visibility: visible;
   }

   .modal-content {
     background: #1a1b2e;
     width: 90%;
     max-width: 900px;
     border-radius: 1rem;
     overflow: hidden;
     box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
     
     .modal-header {
       padding: 1.5rem 2rem;
       display: flex;
       justify-content: space-between;
       align-items: center;
       border-bottom: 1px solid rgba(147, 112, 219, 0.2);
       background-color: #232442;

       .modal-title {
         h3 {
           color: #fff;
           margin: 0;
           font-size: 1.5rem;
           margin-bottom: 0.25rem;
         }

         .demo-label {
           color: #9ca3af;
           margin: 0;
           font-size: 0.9rem;
         }
       }

       .close-btn {
         background: none;
         border: none;
         color: #9ca3af;
         font-size: 1.5rem;
         cursor: pointer;
         padding: 0.5rem;
         transition: all 0.3s ease;

         &:hover {
           color: #fff;
           transform: rotate(90deg);
         }
       }
     }

     .modal-body {
       padding: 2rem;

       .demo-video {
         width: 100%;
         border-radius: 0.5rem;
         background: #0d0e1a;
         max-height: 70vh;
         object-fit: contain;
       }

       .demo-navigation {
         display: flex;
         align-items: center;
         justify-content: center;
         gap: 2rem;
         margin-top: 2rem;
         padding: 1rem 0;

         .nav-btn {
           background: none;
           border: none;
           color: #9ca3af;
           font-size: 1.2rem;
           cursor: pointer;
           padding: 0.5rem;
           transition: all 0.3s ease;

           &:disabled {
             opacity: 0.5;
             cursor: not-allowed;
           }

           &:not(:disabled):hover {
             color: #fff;
             transform: scale(1.2);
           }
         }

         .demo-indicators {
           display: flex;
           gap: 0.75rem;

           .indicator {
             width: 10px;
             height: 10px;
             border-radius: 50%;
             background: rgba(156, 163, 175, 0.3);
             cursor: pointer;
             transition: all 0.3s ease;

             &.active {
               background: #ed2024;
               transform: scale(1.2);
             }

             &:hover:not(.active) {
               background: rgba(156, 163, 175, 0.6);
             }
           }
         }
       }
     }
   }
 }

 @media (max-width: 768px) {
   .container-fluid {
     width: 95%;
     padding: 1rem;
   }

   .projects-grid {
     grid-template-columns: 1fr;
     gap: 1.5rem;
   }

   .filters ul {
     flex-wrap: wrap;
     gap: 0.5rem;

     .filter a {
       padding: 0.5rem 1rem;
       font-size: 0.9rem;
     }
   }

   .project-card {
     .project-overlay {
       .overlay-content {
         padding: 1.5rem;

         h3 {
           font-size: 1.2rem;
         }

         p {
           font-size: 0.85rem;
         }

         .project-links .btn {
           padding: 0.6rem 1.2rem;
           font-size: 0.85rem;
           min-width: 120px;
         }
       }
     }
   }

   .demo-modal {
     padding: 0.5rem;

     .modal-content {
       .modal-header {
         padding: 1rem;

         .modal-title h3 {
           font-size: 1.2rem;
         }
       }

       .modal-body {
         padding: 1rem;
       }
     }
   }
 }
}
</style>